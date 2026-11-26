<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import type { ProjectItem } from '@/types/portfolio';

const props = withDefaults(
    defineProps<{
        projects: ProjectItem[];
        showAll?: boolean;
    }>(),
    { showAll: false },
);

const visibleProjects = computed(() =>
    props.showAll ? props.projects : props.projects.slice(0, 5),
);
const centerIndex = computed(() => Math.floor(visibleProjects.value.length / 2));
const exposedIndex = ref(centerIndex.value);

function exposeProject(index: number) {
    exposedIndex.value = index;
    console.info(`[Projects] Exposed project "${visibleProjects.value[index].title}".`);
}

function resetExposure() {
    exposedIndex.value = centerIndex.value;
}

function reportImageError(project: ProjectItem) {
    console.error(`[Projects] Preview image for "${project.title}" failed to load.`);
}

function cardWeight(index: number) {
    const distance = Math.abs(index - exposedIndex.value);

    return [12, 6, 2.5, 1.35, 0.8][distance] ?? 0.8;
}
</script>

<template>
    <section
        id="projects"
        class="stage-section projects"
    >
        <div class="section-inner">
            <header class="section-heading">
                <div>
                    <h2>My Projects</h2>
                </div>

                <a v-if="!showAll" class="projects-button" href="/projects">
                    <span>See all projects</span>
                    <span class="projects-button-icon" aria-hidden="true">
                        <ArrowRight :size="18" />
                    </span>
                </a>
            </header>

            <div
                class="project-carousel"
                aria-label="Selected projects"
                @mouseleave="resetExposure"
            >
                <article
                    v-for="(project, index) in visibleProjects"
                    :key="project.title"
                    class="project-card"
                    :class="{
                        'is-exposed': index === exposedIndex,
                        'is-covered': index !== exposedIndex,
                    }"
                    :style="{ '--card-weight': cardWeight(index) }"
                    tabindex="0"
                    @mouseenter="exposeProject(index)"
                    @focusin="exposeProject(index)"
                >
                    <img
                        class="project-image"
                        :src="project.image"
                        :alt="project.imageAlt"
                        @error="reportImageError(project)"
                    />
                    <div class="project-shade" aria-hidden="true"></div>
                    <div class="project-copy">
                        <h3>{{ project.title }}</h3>
                        <p>{{ project.summary }}</p>
                    </div>
                </article>
            </div>

        </div>
    </section>
</template>

<style scoped>
.projects {
    display: flex;
    align-items: center;
    min-height: min(52rem, 88vh);
}

.section-inner {
    width: 100%;
    max-width: 1600px;
    margin-inline: auto;
    padding-inline: clamp(15px, 5vw, 80px);
}

.section-heading {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: end;
    gap: clamp(1rem, 3vw, 3rem);
    margin-bottom: clamp(1.5rem, 4vw, 2.75rem);
}

.eyebrow {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    color: var(--depth);
}

.section-heading h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2rem, 4.2vw, 4.25rem);
    font-weight: 600;
    line-height: 0.95;
    letter-spacing: -0.045em;
    color: var(--paper);
}

.section-heading p:not(.eyebrow) {
    max-width: 34rem;
    margin: 0.7rem 0 0;
    color: var(--muted);
    line-height: 1.55;
}

.projects-button {
    display: inline-flex;
    min-height: 3rem;
    flex: 0 0 auto;
    align-items: center;
    gap: 0.45rem;
    padding: 0.28rem 0.3rem 0.28rem 1.15rem;
    border: 1px solid rgb(245 166 35 / 0.46);
    border-radius: 999px;
    background: #15251f;
    color: var(--paper);
    font-family: var(--font-mono);
    font-size: 0.74rem;
    text-decoration: none;
    transition: border-color 180ms ease, transform 180ms ease;
}

.projects-button-icon {
    display: grid;
    width: 2.35rem;
    height: 2.35rem;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    background: var(--signal);
    color: var(--ink);
    transition: transform 180ms ease;
}

.projects-button:hover {
    border-color: var(--signal);
    transform: translateY(-2px);
}

.projects-button:hover .projects-button-icon {
    transform: rotate(-35deg);
}

.projects-button:focus-visible {
    outline: 2px solid var(--signal);
    outline-offset: 3px;
}

.project-carousel {
    display: flex;
    gap: clamp(0.35rem, 0.75vw, 0.75rem);
    height: clamp(25rem, 52vw, 38rem);
    overflow: hidden;
}

.project-card {
    --card-weight: 1;
    position: relative;
    flex: var(--card-weight) 1 0;
    min-width: 0;
    overflow: hidden;
    border: 1px solid rgb(237 233 226 / 0.13);
    border-radius: 0.65rem;
    background: var(--panel);
    cursor: crosshair;
    isolation: isolate;
    opacity: 1;
    transform: translateY(0);
    transition:
        flex-grow 700ms cubic-bezier(0.22, 1, 0.36, 1),
        border-color 250ms ease,
        transform 600ms ease;
}

.project-card.is-exposed {
    border-color: rgb(245 166 35 / 0.55);
}

.project-image {
    position: absolute;
    inset: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: saturate(0.72) brightness(0.72);
    transform: scale(1.04);
    transition:
        filter 650ms ease,
        transform 850ms cubic-bezier(0.22, 1, 0.36, 1);
}

.project-card.is-exposed .project-image {
    filter: saturate(0.95) brightness(0.88);
    transform: scale(1);
}

.project-shade {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
        linear-gradient(180deg, transparent 28%, rgb(5 7 7 / 0.22) 55%, rgb(5 7 7 / 0.94) 100%),
        linear-gradient(90deg, rgb(5 7 7 / 0.18), transparent 50%);
}

.project-copy {
    position: absolute;
    right: clamp(1.15rem, 2.4vw, 2.25rem);
    bottom: clamp(1.2rem, 2.6vw, 2.4rem);
    left: clamp(1.15rem, 2.4vw, 2.25rem);
    min-width: min(31rem, calc(100vw - 5rem));
}

.project-copy h3 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.45rem, 2.7vw, 2.65rem);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.035em;
    color: var(--paper);
    white-space: nowrap;
}

.project-copy p {
    max-width: 38rem;
    margin: 0.75rem 0 0;
    color: rgb(237 233 226 / 0.78);
    font-size: clamp(0.88rem, 1.25vw, 1rem);
    line-height: 1.6;
    opacity: 0;
    transform: translateY(0.5rem);
    transition:
        opacity 260ms ease 130ms,
        transform 360ms ease 130ms;
}

.project-card.is-exposed .project-copy p {
    opacity: 1;
    transform: translateY(0);
}

.interaction-hint {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin: 1rem 0 0;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    color: var(--muted);
}

.hint-line {
    width: 3rem;
    height: 1px;
    background: var(--line);
}

@media (max-width: 720px) {
    .projects {
        min-height: 0;
    }

    .section-heading {
        grid-template-columns: 1fr;
        align-items: start;
    }

    .section-heading .eyebrow {
        margin-bottom: 0.85rem;
    }

    .projects-button {
        width: 100%;
        justify-content: space-between;
    }

    .project-carousel {
        height: 30rem;
        margin-inline: calc(clamp(15px, 5vw, 80px) * -1);
        padding-inline: clamp(15px, 5vw, 80px);
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
    }

    .project-carousel::-webkit-scrollbar {
        display: none;
    }

    .project-card,
    .project-card.is-exposed,
    .project-card.is-covered {
        flex: 0 0 min(82vw, 27rem);
        scroll-snap-align: center;
    }

    .project-copy {
        min-width: 0;
    }

    .project-copy p,
    .project-card.is-exposed .project-copy p {
        opacity: 1;
        transform: none;
    }

    .interaction-hint span:first-child {
        font-size: 0;
    }

    .interaction-hint span:first-child::after {
        content: 'Swipe through the work';
        font-size: 0.65rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .project-card,
    .project-image,
    .project-copy p,
    .projects-button,
    .projects-button-icon {
        transition: none;
    }

    .project-card {
        opacity: 1;
        transform: none;
    }
}
</style>
