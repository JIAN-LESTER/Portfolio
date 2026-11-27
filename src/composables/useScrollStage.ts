import {
    computed,
    inject,
    onBeforeUnmount,
    onMounted,
    provide,
    reactive,
    readonly,
} from 'vue';

export interface StageSection {
    id: string;
    label: string;
    slides: number;
}

interface StageState {
    sections: StageSection[];
    activeSection: number;
    activeSlide: number[];
    revealedSections: boolean[];
    isAnimating: boolean;
}

const STAGE_KEY = Symbol('portfolio-scroll-stage');
const STAGE_TRANSITION_MS = 900;
const SCROLL_REVEAL_ATTRIBUTE = 'data-scroll-reveal';
const SCROLL_REVEALED_CLASS = 'is-scroll-revealed';

/**
 * Tracks the section currently visible in the browser's native scroll area and
 * owns the horizontal slide state within each section. Call this once from the
 * top-level layout component.
 */
export function provideScrollStage(sections: StageSection[]) {
    const state = reactive<StageState>({
        sections,
        activeSection: 0,
        activeSlide: sections.map(() => 0),
        revealedSections: sections.map(() => false),
        isAnimating: false,
    });

    const reducedMotion =
        typeof window !== 'undefined' && window.matchMedia
            ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
            : false;

    let unlockTimer: number | undefined;
    let sectionObserver: IntersectionObserver | undefined;

    function revealSectionElement(section: HTMLElement) {
        section.classList.add(SCROLL_REVEALED_CLASS);
    }

    function lock(duration = reducedMotion ? 50 : STAGE_TRANSITION_MS) {
        state.isAnimating = true;
        window.clearTimeout(unlockTimer);
        unlockTimer = window.setTimeout(() => {
            state.isAnimating = false;
        }, duration);
    }

    function navigate(dir: 1 | -1) {
        if (state.isAnimating) {
            return;
        }

        const secIndex = state.activeSection;
        const sec = state.sections[secIndex];
        const curSlide = state.activeSlide[secIndex];

        if (dir === 1) {
            if (curSlide < sec.slides - 1) {
                state.activeSlide[secIndex] = curSlide + 1;
                lock();

                return;
            }

            if (secIndex < state.sections.length - 1) {
                goToSection(secIndex + 1);
            }

            return;
        }

        if (curSlide > 0) {
            state.activeSlide[secIndex] = curSlide - 1;
            lock();

            return;
        }

        if (secIndex > 0) {
            state.activeSlide[secIndex - 1] =
                state.sections[secIndex - 1].slides - 1;
            goToSection(secIndex - 1);
        }
    }

    function navigateSlide(dir: 1 | -1) {
        if (state.isAnimating) {
            return;
        }

        const secIndex = state.activeSection;
        const sec = state.sections[secIndex];
        const next = state.activeSlide[secIndex] + dir;

        if (next < 0 || next > sec.slides - 1) {
            return;
        }

        state.activeSlide[secIndex] = next;
        lock();
    }

    function goToSection(index: number) {
        if (index < 0 || index >= state.sections.length) {
            console.error(`[ScrollStage] Section index ${index} is out of range.`);
            return;
        }

        const section = document.getElementById(state.sections[index].id);

        if (!section) {
            console.error(
                `[ScrollStage] Section "${state.sections[index].id}" was not found.`,
            );
            return;
        }

        state.activeSection = index;
        state.revealedSections[index] = true;
        revealSectionElement(section);
        section.scrollIntoView({ behavior: 'auto', block: 'start' });
        console.info(`[ScrollStage] Scrolled to section "${state.sections[index].id}".`);
    }

    function goToSlide(index: number) {
        if (state.isAnimating) {
            return;
        }

        const sec = state.sections[state.activeSection];

        if (index < 0 || index >= sec.slides) {
            return;
        }

        state.activeSlide[state.activeSection] = index;
        lock();
    }

    onMounted(() => {
        const sectionElements = state.sections
            .map((section) => document.getElementById(section.id))
            .filter((section): section is HTMLElement => section !== null);

        if (sectionElements.length !== state.sections.length) {
            console.error('[ScrollStage] One or more page sections could not be observed.');
        }

        sectionElements.forEach((section) => {
            const excludesScrollReveal =
                section.classList.contains('hero') ||
                section.classList.contains('page-hero') ||
                section.classList.contains('site-footer');

            if (excludesScrollReveal || reducedMotion) {
                revealSectionElement(section);
                return;
            }

            section.setAttribute(SCROLL_REVEAL_ATTRIBUTE, '');
        });

        if (!('IntersectionObserver' in window)) {
            sectionElements.forEach(revealSectionElement);
            console.error(
                '[ScrollStage] IntersectionObserver is unavailable; scroll animations were skipped.',
            );
            return;
        }

        const visibility = new Map<Element, number>();
        sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    visibility.set(entry.target, entry.intersectionRatio);

                    if (entry.isIntersecting) {
                        revealSectionElement(entry.target as HTMLElement);
                    }
                });

                const mostVisible = [...visibility.entries()].sort(
                    (a, b) => b[1] - a[1],
                )[0];

                if (!mostVisible || mostVisible[1] === 0) {
                    return;
                }

                const nextIndex = state.sections.findIndex(
                    (section) => section.id === mostVisible[0].id,
                );

                if (nextIndex >= 0) {
                    state.activeSection = nextIndex;
                    state.revealedSections[nextIndex] = true;
                }
            },
            {
                rootMargin: '0px 0px -12% 0px',
                threshold: [0, 0.15, 0.25, 0.5, 0.75, 1],
            },
        );

        sectionElements.forEach((section) => sectionObserver?.observe(section));
        console.info('[ScrollStage] Native page scrolling initialized.');
    });

    onBeforeUnmount(() => {
        sectionObserver?.disconnect();
        window.clearTimeout(unlockTimer);
    });

    const api = {
        state: readonly(state) as StageState,
        navigate,
        navigateSlide,
        goToSection,
        goToSlide,
        reducedMotion,
    };

    provide(STAGE_KEY, api);

    return api;
}

export function useScrollStage() {
    const stage = inject<ReturnType<typeof provideScrollStage>>(STAGE_KEY);

    if (!stage) {
        throw new Error(
            'useScrollStage() must be called inside a tree wrapped by provideScrollStage()',
        );
    }

    return stage;
}

/**
 * Convenience hook for an individual section component. Looks itself up in
 * the stage by id and exposes just what a section needs: whether it's the
 * active (visible) section, which of its own slides is active, and controls
 * to move between its slides.
 */
export function useSectionSlide(id: string) {
    const stage = useScrollStage();
    const index = computed(() =>
        stage.state.sections.findIndex((s) => s.id === id),
    );
    const active = computed(() => stage.state.activeSlide[index.value] ?? 0);
    const count = computed(
        () => stage.state.sections[index.value]?.slides ?? 1,
    );
    const isCurrentSection = computed(
        () => stage.state.activeSection === index.value,
    );
    const isActiveSection = computed(
        () =>
            isCurrentSection.value ||
            (stage.state.revealedSections[index.value] ?? false),
    );

    function next() {
        if (isCurrentSection.value) {
            stage.navigateSlide(1);
        }
    }
    function prev() {
        if (isCurrentSection.value) {
            stage.navigateSlide(-1);
        }
    }
    function goTo(i: number) {
        if (isCurrentSection.value) {
            stage.goToSlide(i);
        }
    }

    return { active, count, isActiveSection, next, prev, goTo };
}
