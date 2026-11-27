
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
        highlight: ['Get to know', 'me better.'],
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
               bg-[#0b0d0d] px-5 pb-20 pt-32
               text-[var(--paper)] sm:px-8 lg:px-16"
    >
        <!-- Decorative background -->
        <div
            class="pointer-events-none absolute inset-0 -z-10
                   overflow-hidden"
            aria-hidden="true"
        >
            <!-- Radial glow -->
            <div
                class="absolute left-1/2 top-1/2
                       h-[36rem] w-[36rem]
                       -translate-x-1/2 -translate-y-1/2
                       rounded-full bg-[#f5a623]/[0.06]
                       blur-[120px]"
            />

            <div class="page-backdrop absolute inset-0">
                <div class="page-backdrop-veil" />
            </div>
        </div>

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

            <figure
                v-else-if="variant === 'about' && portfolioData.personal.image"
                class="hero-showcase about-showcase hero-reveal"
                style="--delay: 300ms"
            >
                <img
                    :src="portfolioData.personal.image"
                    :alt="`${portfolioData.personal.name}, ${portfolioData.personal.role}`"
                    @load="handlePreviewLoad('about portrait')"
                    @error="handlePreviewError('about portrait')"
                />
            </figure>
        </div>

        <!-- Bottom scroll indicator -->
        <a
            :href="`#${variant}-content`"
            aria-label="Scroll to page content"
            class="absolute bottom-6 left-1/2 flex
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
            class="absolute bottom-0 left-1/2 h-px w-1/2
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

.page-backdrop::before {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgb(237 233 226 / 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgb(237 233 226 / 0.035) 1px, transparent 1px);
    background-size: 4.5rem 4.5rem;
    content: '';
}

.hero-showcase {
    display: none;
}

.project-preview {
    position: absolute;
    overflow: hidden;
    border: 1px solid rgb(237 233 226 / 0.16);
    border-radius: 0.8rem;
    background: #111414;
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
    color: rgb(237 233 226 / 0.48);
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
    background: #111414;
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
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center bottom;
    filter: grayscale(0.12) contrast(0.96);
}

.page-backdrop-veil {
    position: absolute;
    inset: 0;
    background:
        linear-gradient(90deg, #0b0d0d 0%, rgb(11 13 13 / 0.95) 33%, rgb(11 13 13 / 0.28) 75%, #0b0d0d 100%),
        linear-gradient(0deg, #0b0d0d 0%, transparent 28%, transparent 76%, rgb(11 13 13 / 0.8) 100%);
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

    .page-backdrop-veil {
        background:
            linear-gradient(90deg, #0b0d0d 0%, rgb(11 13 13 / 0.88) 64%, rgb(11 13 13 / 0.35) 100%),
            linear-gradient(0deg, #0b0d0d 0%, transparent 30%, transparent 72%, rgb(11 13 13 / 0.82) 100%);
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

    .page-hero-content--about .about-showcase {
        right: clamp(1rem, 5vw, 5rem);
        width: clamp(28rem, 42vw, 43rem);
        min-height: clamp(32rem, 48vw, 44rem);
        opacity: 0.82;
        -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgb(0 0 0 / 0.3) 22%,
            black 46%,
            black 100%
        );
        mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgb(0 0 0 / 0.3) 22%,
            black 46%,
            black 100%
        );
    }
}

@media (prefers-reduced-motion: reduce) {
    .hero-reveal,
    .scroll-indicator {
        animation: none;
    }
}
</style>
