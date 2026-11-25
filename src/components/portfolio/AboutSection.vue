<script setup lang="ts">
import { useSectionSlide } from '@/composables/useScrollStage';
import type {
    EducationItem,
    ExperienceItem,
    PersonalInfo,
} from '@/types/portfolio';

withDefaults(
    defineProps<{
        personal: PersonalInfo;
        education?: EducationItem;
        experience?: ExperienceItem;
        showJourneySummary?: boolean;
    }>(),
    {
        showJourneySummary: false,
    },
);

const { isActiveSection } = useSectionSlide('about');

const professionalRoles = [
    'Frontend Developer',
    'Backend Developer',
    'AI Engineer',
    'Web Developer',
    'Mobile Application Developer',
];

function handlePortraitLoad() {
    console.info('[AboutSection] Profile image loaded successfully.');
}

function handlePortraitError() {
    console.error('[AboutSection] Profile image could not be loaded.');
}
</script>

<template>
    <section
        id="about"
        class="stage-section group flex items-center bg-[radial-gradient(circle_at_22%_52%,rgb(245_166_35_/_0.08),transparent_27%),rgb(11_14_18_/_0.35)] max-[780px]:items-stretch max-[780px]:overflow-y-auto"
        :class="{ 'is-active': isActiveSection }"
    >
        <div
            class="mx-auto grid max-h-full w-[min(100%,82rem)] grid-cols-[minmax(17rem,0.82fr)_minmax(0,1.18fr)] items-center gap-[clamp(3rem,8vw,7.5rem)] overflow-hidden px-[clamp(1.25rem,7vw,6rem)] pt-[clamp(5.5rem,10vh,7rem)] pb-12 overscroll-contain max-[780px]:min-h-full max-[780px]:max-h-none max-[780px]:grid-cols-1 max-[780px]:gap-[2.2rem] max-[780px]:overflow-visible max-[780px]:px-[clamp(1.2rem,6vw,2.25rem)] max-[780px]:pt-[5.5rem] max-[780px]:pb-10 max-[480px]:gap-[1.8rem] max-[480px]:pt-20"
            data-stage-scroll
        >
            <figure
                v-if="personal.image"
                class="relative order-1 mx-auto w-[min(100%,27rem)] -translate-x-5 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.75,0.25,1)] group-[.is-active]:translate-x-0 group-[.is-active]:opacity-100 group-[.is-active]:delay-[80ms] motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none max-[780px]:w-[min(66vw,19rem)] max-[480px]:w-[min(62vw,15.5rem)]"
            >
                <div
                    class="relative isolate grid aspect-square items-end justify-items-center rounded-full bg-[var(--signal)] before:absolute before:inset-[7%] before:-z-10 before:rounded-[inherit] before:border before:border-[rgb(11_14_18_/_0.2)] before:content-[''] after:absolute after:right-[-8%] after:bottom-[11%] after:z-20 after:aspect-square after:w-[31%] after:rounded-full after:border after:border-[rgb(237_233_226_/_0.18)] after:bg-[rgb(21_26_33_/_0.88)] after:shadow-[0_1rem_2.5rem_rgb(0_0_0_/_0.28)] after:content-[''] max-[480px]:after:right-[-5%]"
                >
                    <span
                        class="absolute -inset-[4%] -z-20 -rotate-12 rounded-full border border-dashed border-[rgb(245_166_35_/_0.26)]"
                        aria-hidden="true"
                    ></span>
                    <img
                        class="block h-[112%] w-[112%] rounded-b-[50%] object-contain object-bottom drop-shadow-[0_1.4rem_1.5rem_rgb(0_0_0_/_0.24)]"
                        :src="personal.image"
                        :alt="`Portrait of ${personal.name}`"
                        @load="handlePortraitLoad"
                        @error="handlePortraitError"
                    />
                </div>

                <ul class="role-badges" aria-label="Professional roles">
                    <li v-for="role in professionalRoles" :key="role">
                        {{ role }}
                    </li>
                </ul>

                <figcaption
                    class="relative z-30 mx-auto -mt-[1.4rem] flex w-max max-w-[92%] items-center gap-2 rounded-full border border-[rgb(245_166_35_/_0.3)] bg-[var(--panel)] px-[1.15rem] py-[0.75rem] text-center font-[var(--font-display)] text-[clamp(0.76rem,1.2vw,0.9rem)] leading-tight font-semibold tracking-[-0.015em] text-[var(--paper)] shadow-[0_0.9rem_2rem_rgb(0_0_0_/_0.24)]"
                >
                    {{ personal.role }}
                </figcaption>
            </figure>

            <div
                class="order-2 max-w-[43rem] translate-y-4 opacity-0 transition-[opacity,transform] duration-[680ms] ease-out group-[.is-active]:translate-y-0 group-[.is-active]:opacity-100 group-[.is-active]:delay-200 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none max-[780px]:mx-auto max-[780px]:max-w-[38rem]"
            >
            
                <h2
                    class="font-[var(--font-display)] text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.06em] text-[var(--paper)] [text-wrap:balance] max-[780px]:text-[clamp(2.35rem,12vw,3.6rem)]"
                >
                    Who is {{ personal.name }}?
                </h2>
                <p
                    class="mt-[clamp(1.25rem,2.8vh,2rem)] max-w-[67ch] text-[clamp(0.92rem,1.25vw,1.04rem)] leading-[1.75] text-[var(--muted)] max-[480px]:text-[0.9rem] max-[480px]:leading-[1.65]"
                >
                    {{ personal.bio }}
                </p>

                <div
                    v-if="showJourneySummary && education && experience"
                    class="mt-[clamp(1.4rem,3vh,2rem)] grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--line)] pt-[1.3rem] max-[540px]:grid-cols-1 max-[540px]:gap-4"
                    aria-label="Education and experience summary"
                >
                    <article class="min-w-0 border-l-2 border-[var(--signal)] pl-4">
                        <p
                            class="m-0 font-[var(--font-mono)] text-[0.68rem] tracking-[0.08em] text-[var(--signal)]"
                        >
                            Education
                        </p>
                        <h3
                            class="mt-2 font-[var(--font-display)] text-[clamp(1rem,1.7vw,1.22rem)] leading-tight font-bold text-[var(--paper)]"
                        >
                            {{ education.degree }} in {{ education.field }}
                        </h3>
                        <p class="mt-1 text-[0.78rem] leading-[1.5] text-[var(--muted)]">
                            {{ education.school }} &middot; {{ education.end }}
                        </p>
                    </article>

                    <article class="min-w-0 border-l-2 border-[var(--depth)] pl-4">
                        <p
                            class="m-0 font-[var(--font-mono)] text-[0.68rem] tracking-[0.08em] text-[var(--depth)]"
                        >
                            Experience
                        </p>
                        <h3
                            class="mt-2 font-[var(--font-display)] text-[clamp(1rem,1.7vw,1.22rem)] leading-tight font-bold text-[var(--paper)]"
                        >
                            {{ experience.role }}
                        </h3>
                        <p class="mt-1 text-[0.78rem] leading-[1.5] text-[var(--muted)]">
                            {{ experience.company }} &middot; {{ experience.start }}&ndash;{{ experience.end }}
                        </p>
                    </article>
                </div>

                <dl
                    class="mt-[clamp(1.4rem,3vh,2rem)] grid grid-cols-3 gap-x-5 gap-y-4 border-t border-[var(--line)] pt-[1.3rem] max-[540px]:grid-cols-1 max-[540px]:gap-3"
                >
                    <div class="min-w-0">
                        <dd
                            class="m-0 font-[var(--font-display)] text-[clamp(1.15rem,2vw,1.45rem)] leading-tight font-bold text-[var(--signal)]"
                        >
                            7+
                        </dd>
                        <dt class="mt-1 text-[0.76rem] leading-[1.4] text-[var(--muted)]">
                            Projects completed
                        </dt>
                    </div>
                    <div class="min-w-0">
                        <dd
                            class="m-0 font-[var(--font-display)] text-[clamp(1.15rem,2vw,1.45rem)] leading-tight font-bold text-[var(--signal)]"
                        >
                            3+
                        </dd>
                        <dt class="mt-1 text-[0.76rem] leading-[1.4] text-[var(--muted)]">
                            Software development experience
                        </dt>
                    </div>
                    <div class="min-w-0">
                        <dd
                            class="m-0 font-[var(--font-display)] text-[clamp(1.15rem,2vw,1.45rem)] leading-tight font-bold text-[var(--signal)]"
                        >
                            4 months
                        </dd>
                        <dt class="mt-1 text-[0.76rem] leading-[1.4] text-[var(--muted)]">
                            Internship
                        </dt>
                    </div>
                </dl>

                <div
                    class="mt-[clamp(1.4rem,3vh,2rem)] flex flex-wrap items-center gap-3 max-[480px]:items-stretch"
                    aria-label="About actions"
                >
                    <a
                        v-if="personal.resumeUrl"
                        class="inline-flex min-h-12 items-center gap-3 rounded-full border border-[var(--signal)] bg-[var(--signal)] py-1 pr-1 pl-5 font-[var(--font-display)] text-sm font-bold text-[var(--ink)] transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:bg-[#ffc04d] hover:border-[#ffc04d] max-[480px]:flex-1 max-[480px]:justify-between"
                        :href="personal.resumeUrl"
                        download
                    >
                        Download CV
                        <span
                            class="grid size-10 place-items-center rounded-full bg-[var(--paper)] text-lg leading-none text-[var(--ink)]"
                            aria-hidden="true"
                            >&darr;</span
                        >
                    </a>
                    <a
                        class="inline-flex min-h-12 items-center gap-3 rounded-full border border-[var(--line)] py-1 pr-1 pl-5 font-[var(--font-display)] text-sm font-bold text-[var(--paper)] transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-[var(--signal)] hover:text-[var(--signal)] max-[480px]:flex-1 max-[480px]:justify-between"
                        href="/about#journey"
                    >
                        Know more
                        <span
                            class="grid size-10 place-items-center rounded-full bg-[var(--panel)] text-lg leading-none"
                            aria-hidden="true"
                            >&rarr;</span
                        >
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.role-badges {
    position: absolute;
    inset: 0;
    z-index: 40;
    margin: 0;
    padding: 0;
    list-style: none;
    pointer-events: none;
}

.role-badges li {
    position: absolute;
    width: max-content;
    max-width: 12rem;
    padding: 0.48rem 0.72rem;
    border: 1px solid rgb(237 233 226 / 0.18);
    border-radius: 0.45rem;
    background: rgb(18 22 22 / 0.9);
    box-shadow: 0 0.8rem 1.8rem rgb(0 0 0 / 0.24);
    color: var(--paper);
    font-family: var(--font-mono);
    font-size: clamp(0.58rem, 0.8vw, 0.68rem);
    line-height: 1.2;
    letter-spacing: 0.015em;
    backdrop-filter: blur(0.65rem);
}

.role-badges li:nth-child(1) {
    top: 8%;
    left: -13%;
    transform: rotate(-4deg);
}

.role-badges li:nth-child(2) {
    top: 25%;
    right: -17%;
    transform: rotate(3deg);
}

.role-badges li:nth-child(3) {
    top: 49%;
    left: -18%;
    transform: rotate(2deg);
}

.role-badges li:nth-child(4) {
    right: -13%;
    bottom: 23%;
    transform: rotate(-3deg);
}

.role-badges li:nth-child(5) {
    bottom: 7%;
    left: -8%;
    transform: rotate(3deg);
}

@media (max-width: 780px) {
    .role-badges li:nth-child(1) {
        left: -18%;
    }

    .role-badges li:nth-child(2) {
        right: -24%;
    }

    .role-badges li:nth-child(3) {
        left: -23%;
    }

    .role-badges li:nth-child(4) {
        right: -20%;
    }

    .role-badges li:nth-child(5) {
        left: -13%;
    }
}

@media (max-width: 480px) {
    .role-badges li {
        max-width: 9.5rem;
        padding: 0.4rem 0.55rem;
        font-size: 0.54rem;
    }

    .role-badges li:nth-child(1),
    .role-badges li:nth-child(3),
    .role-badges li:nth-child(5) {
        left: -22%;
    }

    .role-badges li:nth-child(2),
    .role-badges li:nth-child(4) {
        right: -27%;
    }
}
</style>
