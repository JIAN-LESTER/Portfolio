
<script setup lang="ts">
import { ArrowDown } from 'lucide-vue-next';
import { computed } from 'vue';
import { portfolioData } from '@/data/portfolio';

type HeroVariant = 'about' | 'projects' | 'services';

interface PageHeroContent {
    title: string;
    highlight: string[];
    description: string;
}

const props = defineProps<{
    variant: HeroVariant;
}>();

const heroContent: Record<HeroVariant, PageHeroContent> = {
    about: {
        title: 'About me',
        highlight: ['Get to know', 'me better'],
        description:
            'Know who am I, what I do, and how I can help you. Explore my journey, skills, and experiences that shape my approach to creating impactful digital solutions.',
    },
    projects: {
        title: 'Projects',
        highlight: ['See what', 'I have built'],
        description:
            'Explore a collection of projects that reflect my passion for building functional, scalable, and meaningful digital experiences.',
    },
    services: {
        title: 'Services',
        highlight: ['What I can', 'do for you'],
        description:
            "Let's transform your ideas into modern, reliable, and scalable digital solutions tailored to your business needs.",
    },
};

const content = computed(() => heroContent[props.variant]);
const projectPreviews = portfolioData.projects
    .filter((project) => project.image)
    .slice(0, 3);
const servicePreviews = portfolioData.services.slice(0, 3);

const handlePreviewLoad = (label: string) => {
    console.info(`[PageHero] Loaded the ${label} hero preview.`);
};

const handlePreviewError = (label: string) => {
    console.error(`[PageHero] Failed to load the ${label} hero preview.`);
};
</script>

<template>
    <section
        :id="`${variant}-hero`"
        class="page-hero relative isolate flex
               items-center overflow-hidden
               border-b border-[var(--paper)]/10
               px-5 pb-20 pt-32
               text-[var(--paper)] sm:px-8 lg:px-16"
    >
        <!-- Main content -->
        <div
            :key="variant"
            class="page-hero-content relative mx-auto flex w-full
                   flex-col"
            :class="[
                'page-hero-content--showcase',
                `page-hero-content--${variant}`,
            ]"
        >
            <div class="page-hero-copy">
                <!-- Heading -->
                <h1
                    class="hero-reveal font-[family-name:var(--font-display)]
                           font-bold tracking-[-0.07em]"
                    style="--delay: 160ms"
                >
                    <span class="page-hero-title">{{ content.title }}</span>

                    <span class="page-hero-highlight text-[var(--signal)]">
                        <span
                            v-for="line in content.highlight"
                            :key="line"
                            class="page-hero-highlight-line"
                        >
                            {{ line }}
                        </span>
                    </span>
                </h1>

                <!-- Description -->
                <p
                    class="hero-reveal mt-7 max-w-xl
                           text-sm leading-relaxed
                           text-[var(--paper)]/60
                           sm:text-base lg:text-lg"
                    style="--delay: 240ms"
                >
                    {{ content.description }}
                </p>
            </div>

            <div
                v-if="variant === 'projects'"
                class="hero-showcase projects-showcase hero-reveal"
                style="--delay: 300ms"
                aria-label="Featured project previews"
            >
                <figure
                    v-for="(project, index) in projectPreviews"
                    :key="project.title"
                    class="project-preview"
                    :class="`project-preview--${index + 1}`"
                >
                    <div class="project-preview-bar" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </div>

                    <img
                        :src="project.image"
                        :alt="project.imageAlt || `${project.title} interface preview`"
                        @load="handlePreviewLoad(project.title)"
                        @error="handlePreviewError(project.title)"
                    />

                    <figcaption>
                        <span>{{ project.title }}</span>
                        <span>{{ project.tag }}</span>
                    </figcaption>
                </figure>
            </div>

            <div
                v-else-if="variant === 'services'"
                class="hero-showcase services-showcase hero-reveal"
                style="--delay: 300ms"
                aria-label="Service previews"
            >
                <figure
                    v-for="(service, index) in servicePreviews"
                    :key="service.code"
                    class="service-preview"
                    :class="`service-preview--${index + 1}`"
                >
                    <img
                        :src="service.image"
                        :alt="service.imageAlt"
                        @load="handlePreviewLoad(service.title)"
                        @error="handlePreviewError(service.title)"
                    />

                    <figcaption>
                        <span>{{ service.code }}</span>
                        <span>{{ service.title }}</span>
                    </figcaption>
                </figure>
            </div>

        </div>

        <figure
            v-if="variant === 'about'"
            class="hero-showcase about-showcase hero-reveal"
            style="--delay: 300ms"
        >
            <img
                src="/images/about.jpg"
                :alt="`${portfolioData.personal.name}, ${portfolioData.personal.role}`"
                @load="handlePreviewLoad('about hero portrait')"
                @error="handlePreviewError('about hero portrait')"
            />
        </figure>

        <!-- Bottom scroll indicator -->
        <a
            :href="`#${variant}-content`"
            aria-label="Scroll to page content"
            class="absolute bottom-6 left-1/2 z-10 flex
                   -translate-x-1/2 flex-col items-center gap-2
                   text-[var(--paper)]/35 transition-colors
                   hover:text-[var(--signal)]"
        >
            <span
                class="font-[family-name:var(--font-mono)]
                       text-[10px] uppercase tracking-[0.2em]"
            >
                Scroll to explore
            </span>

            <ArrowDown :size="15" class="scroll-indicator" />
        </a>

        <!-- Bottom accent -->
        <div
            class="absolute bottom-0 left-1/2 z-10 h-px w-1/2
                   -translate-x-1/2 bg-gradient-to-r
                   from-transparent via-[#f5a623]/40
                   to-transparent"
        />
    </section>
</template>

<style scoped>
.page-hero {
    min-height: 100svh;
    min-height: 100dvh;
    justify-content: flex-start;
    background:
        radial-gradient(circle at 50% 105%, rgb(245 166 35 / 0.1), transparent 31%),
        var(--ink);
}

.page-hero-content {
    align-items: flex-start;
    max-width: 90rem;
    text-align: left;
}

.page-hero-content h1 {
    max-width: 10ch;
    line-height: 0.88;
}

.page-hero-title,
.page-hero-highlight {
    display: block;
    font-size: clamp(3.5rem, 10vw, 9rem);
    line-height: 0.88;
}

.page-hero-highlight {
    margin-top: 1.5rem;
}

.page-hero-highlight-line {
    display: block;
}

.page-hero-content--showcase h1 {
    width: 100%;
    max-width: none;
}

.page-hero-content--showcase .page-hero-title {
    font-size: clamp(2.25rem, 4vw, 4.5rem);
    line-height: 0.95;
    letter-spacing: -0.055em;
}

.page-hero-content--showcase .page-hero-highlight {
    max-width: none;
    margin-top: clamp(0.8rem, 2vw, 1.5rem);
    font-size: clamp(4rem, 7.5vw, 7.5rem);
    line-height: 0.88;
}

.page-hero-copy {
    width: 100%;
}

.page-hero-content p {
    max-width: 37rem;
    margin-right: auto;
    margin-left: 0;
    font-size: clamp(0.95rem, 1.35vw, 1.2rem);
}

.hero-showcase {
    display: none;
}

.project-preview {
    position: absolute;
    overflow: hidden;
    border: 1px solid rgb(237 233 226 / 0.16);
    border-radius: 0.8rem;
    background: var(--panel);
    box-shadow: 0 1.75rem 5rem rgb(0 0 0 / 0.48);
}

.project-preview--1 {
    top: 0;
    right: 0;
    z-index: 3;
    width: 84%;
}

.project-preview--2 {
    bottom: 0;
    left: 0;
    z-index: 4;
    width: 58%;
}

.project-preview--3 {
    right: 2%;
    bottom: -1rem;
    z-index: 2;
    width: 49%;
    opacity: 0.72;
}

.project-preview-bar {
    display: flex;
    align-items: center;
    gap: 0.32rem;
    height: 1.55rem;
    padding: 0 0.65rem;
    border-bottom: 1px solid rgb(237 233 226 / 0.1);
}

.project-preview-bar span {
    width: 0.35rem;
    height: 0.35rem;
    border-radius: 50%;
    background: rgb(237 233 226 / 0.28);
}

.project-preview img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
}

.project-preview figcaption {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 2.6rem;
    padding: 0.55rem 0.8rem;
    font-family: var(--font-mono);
    font-size: 0.66rem;
    color: color-mix(in srgb, var(--paper) 48%, transparent);
}

.project-preview figcaption span:first-child {
    font-weight: 600;
    color: var(--paper);
}

.service-preview {
    position: absolute;
    overflow: hidden;
    border: 1px solid rgb(237 233 226 / 0.16);
    border-radius: 0.8rem;
    background: var(--panel);
    box-shadow: 0 1.75rem 5rem rgb(0 0 0 / 0.42);
}

.service-preview--1 {
    top: 0;
    right: 0;
    z-index: 3;
    width: 68%;
}

.service-preview--2 {
    bottom: 0;
    left: 4%;
    z-index: 4;
    width: 58%;
}

.service-preview--3 {
    right: 0;
    bottom: 7%;
    z-index: 2;
    width: 45%;
    opacity: 0.66;
}

.service-preview img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
}

.service-preview figcaption {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.65rem 0.8rem;
    font-size: 0.72rem;
    color: var(--paper);
}

.service-preview figcaption span:first-child {
    font-family: var(--font-mono);
    font-size: 0.58rem;
    color: var(--signal);
}

.about-showcase img {
    display: block;
    width: auto;
    max-width: none;
    height: 100%;
    margin-left: auto;
    object-fit: contain;
    object-position: right center;
    filter: contrast(0.96) brightness(0.82);
    -webkit-mask-image: linear-gradient(
        to right,
        transparent 0%,
        rgb(0 0 0 / 0.18) 12%,
        rgb(0 0 0 / 0.58) 28%,
        black 46%,
        black 100%
    );
    mask-image: linear-gradient(
        to right,
        transparent 0%,
        rgb(0 0 0 / 0.18) 12%,
        rgb(0 0 0 / 0.58) 28%,
        black 46%,
        black 100%
    );
}

.hero-reveal {
    animation: reveal 650ms cubic-bezier(0.2, 0.75, 0.25, 1)
        var(--delay, 0ms) both;
}

.scroll-indicator {
    animation: scroll-bounce 2s ease-in-out infinite;
}

@keyframes reveal {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scroll-bounce {
    0%, 100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(5px);
    }
}

@media (max-width: 640px) {
    .page-hero-content h1 {
        max-width: 8ch;
    }

    .page-hero-title,
    .page-hero-highlight {
        font-size: clamp(3.5rem, 17vw, 5.25rem);
    }

    .page-hero-content--showcase .page-hero-title {
        font-size: clamp(2rem, 10vw, 3rem);
    }

    .page-hero-content--showcase .page-hero-highlight {
        font-size: clamp(3.5rem, 16vw, 5.25rem);
    }

    .page-hero-content p {
        max-width: 30rem;
    }

}

@media (min-width: 960px) {
    .page-hero-content--showcase {
        position: relative;
    }

    .page-hero-content--showcase .page-hero-copy {
        position: relative;
        z-index: 5;
    }

    .page-hero-content--showcase .page-hero-highlight {
        font-size: clamp(4.5rem, 8vw, 8rem);
    }

    .page-hero-content--showcase .hero-showcase {
        position: absolute;
        top: 50%;
        right: 0;
        z-index: 1;
        display: block;
        width: clamp(27rem, 43vw, 43rem);
        min-height: clamp(25rem, 39vw, 34rem);
        margin-top: 0;
        translate: 0 -50%;
        mask-image: linear-gradient(to right, transparent 0%, black 34%);
    }

    .page-hero-content--projects .projects-showcase {
        opacity: 0.48;
    }

    .page-hero-content--services .services-showcase {
        opacity: 0.5;
    }

    .page-hero > .about-showcase {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        display: block;
        width: min(59vw, 60rem);
        height: 100%;
        margin: 0;
        opacity: 0.9;
    }
}

@media (prefers-reduced-motion: reduce) {
    .hero-reveal,
    .scroll-indicator {
        animation: none;
    }
}
</style>
