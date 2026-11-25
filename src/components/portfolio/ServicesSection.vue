<script setup lang="ts">
import { computed, onMounted, type Component } from 'vue';
import {
    AppWindow,
    ArrowRight,
    Bot,
    Boxes,
    Braces,
    LayoutTemplate,
    MonitorSmartphone,
    PenTool,
    Smartphone,
} from 'lucide-vue-next';
import { useSectionSlide } from '@/composables/useScrollStage';
import type { ServiceItem } from '@/types/portfolio';

const props = withDefaults(
    defineProps<{
        services: ServiceItem[];
        showAll?: boolean;
    }>(),
    { showAll: false },
);

const { isActiveSection } = useSectionSlide('services');

const serviceIcons: Record<string, Component> = {
    SOFTWARE: Braces,
    DESIGN: PenTool,
    WEB: MonitorSmartphone,
    MOBILE: Smartphone,
    AI: Bot,
    SAAS: AppWindow,
    PROTOTYPE: Boxes,
    WIREFRAME: LayoutTemplate,
};

const featuredCodes = ['DESIGN', 'SOFTWARE', 'WEB'];
const displayedServices = computed(() => {
    if (props.showAll) {
        return props.services;
    }

    return featuredCodes
        .map((code) => props.services.find((service) => service.code === code))
        .filter((service): service is ServiceItem => Boolean(service));
});

function handleImageError(service: ServiceItem) {
    console.error(
        `[ServicesSection] Failed to load the image for "${service.title}".`,
    );
}

onMounted(() => {
    if (!props.showAll && displayedServices.value.length < featuredCodes.length) {
        console.error(
            '[ServicesSection] One or more featured services could not be found.',
        );
        return;
    }

    console.info(
        `[ServicesSection] Displayed ${displayedServices.value.length} ${props.showAll ? 'services' : 'featured services'}.`,
    );
});
</script>

<template>
    <section
        id="services"
        class="stage-section services"
        :class="{
            'is-active': isActiveSection,
            'services--all': showAll,
        }"
        aria-labelledby="services-title"
    >
        <div class="services-inner" data-stage-scroll>
            <header class="services-header">
                <div class="services-heading">
                 
                    <h2 id="services-title">
                        {{ showAll ? 'Services for every product stage' : 'Services I provide' }}
                    </h2>
                    <p v-if="showAll" class="services-intro">
                        From an early wireframe to a production-ready web, mobile, AI,
                        or SaaS product, each service can stand alone or connect into
                        one complete build.
                    </p>
                </div>

                <a v-if="!showAll" class="split-button" href="/services">
                    <span>View all services</span>
                    <span class="split-button-icon" aria-hidden="true">
                        <ArrowRight :size="18" />
                    </span>
                </a>
            </header>

            <div
                class="service-grid"
                :class="showAll ? 'service-grid--all' : 'service-grid--featured'"
            >
                <article
                    v-for="(service, index) in displayedServices"
                    :key="service.code"
                    class="service-card"
                    :class="{
                        'service-card--primary': !showAll && service.code === 'SOFTWARE',
                    }"
                    :style="{
                        '--reveal-delay': `${120 + index * 80}ms`,
                    }"
                >
                    <div class="service-visual">
                        <img
                            :src="service.image"
                            :alt="service.imageAlt"
                            loading="lazy"
                            @error="handleImageError(service)"
                        />
                        <div class="service-image-shade"></div>
                        <span class="service-icon" aria-hidden="true">
                            <component
                                :is="serviceIcons[service.code] ?? Braces"
                                :size="22"
                                :stroke-width="1.7"
                            />
                        </span>
                    </div>

                    <div class="service-content">
                        <p class="service-code">{{ service.code }}</p>
                        <h3>{{ service.title }}</h3>
                        <p class="service-description">{{ service.paragraphs[0] }}</p>

                        <a class="service-link" href="/#contact">
                            <span>Discuss this service</span>
                            <span class="service-link-icon" aria-hidden="true">
                                <ArrowRight :size="16" />
                            </span>
                        </a>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.services {
    display: flex;
    align-items: center;
    background-image:
        linear-gradient(90deg, rgb(245 166 35 / 0.035) 1px, transparent 1px),
        linear-gradient(rgb(245 166 35 / 0.035) 1px, transparent 1px),
        radial-gradient(circle at 50% 105%, rgb(245 166 35 / 0.09), transparent 32%);
    background-size: 4.5rem 4.5rem, 4.5rem 4.5rem, auto;
}

.services-inner {
    width: min(100%, 92rem);
    margin-inline: auto;
    padding: clamp(6rem, 11vh, 8rem) clamp(1.25rem, 7vw, 6rem) clamp(4rem, 8vh, 6rem);
}

.services-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: clamp(2rem, 5vh, 3.4rem);
    opacity: 0;
    transform: translateY(1rem);
    transition: opacity 600ms ease, transform 600ms ease;
}

.is-active .services-header {
    opacity: 1;
    transform: translateY(0);
}

.section-kicker {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin: 0 0 0.75rem;
    color: var(--signal);
    font-family: var(--font-mono);
    font-size: 0.75rem;
}

.section-kicker::before {
    width: 1.5rem;
    height: 1px;
    background: currentColor;
    content: '';
}

.services-heading h2 {
    max-width: 13ch;
    margin: 0;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 5vw, 4.6rem);
    font-weight: 700;
    letter-spacing: -0.06em;
    line-height: 0.98;
    text-wrap: balance;
}

.services-intro {
    max-width: 46rem;
    margin: 1.25rem 0 0;
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.7;
}

.split-button,
.service-link {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    border: 1px solid rgb(245 166 35 / 0.46);
    border-radius: 999px;
    background: #15251f;
    color: var(--paper);
    font-family: var(--font-mono);
    text-decoration: none;
    transition: border-color 180ms ease, transform 180ms ease;
}

.split-button {
    min-height: 3rem;
    flex: 0 0 auto;
    padding: 0.28rem 0.3rem 0.28rem 1.15rem;
    font-size: 0.74rem;
}

.split-button-icon,
.service-link-icon {
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    background: var(--signal);
    color: var(--ink);
    transition: transform 180ms ease;
}

.split-button-icon {
    width: 2.35rem;
    height: 2.35rem;
}

.split-button:hover,
.service-link:hover {
    border-color: var(--signal);
    transform: translateY(-2px);
}

.split-button:hover .split-button-icon,
.service-link:hover .service-link-icon {
    transform: rotate(-35deg);
}

.service-grid {
    display: grid;
    gap: clamp(1rem, 2vw, 1.45rem);
}

.service-grid--featured {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding-top: 1.6rem;
}

.service-grid--all {
    grid-template-columns: repeat(4, minmax(0, 1fr));
}

.service-card {
    --curve-offset: 0rem;
    overflow: hidden;
    min-width: 0;
    border: 1px solid var(--line);
    border-radius: 1.15rem;
    background: linear-gradient(155deg, rgb(25 30 29 / 0.98), rgb(16 20 19 / 0.98));
    box-shadow: 0 1.4rem 3.5rem rgb(0 0 0 / 0.22);
    opacity: 0;
    transform: translateY(calc(var(--curve-offset) + 1.25rem));
    transition:
        border-color 220ms ease,
        box-shadow 220ms ease,
        opacity 620ms ease var(--reveal-delay),
        transform 620ms ease var(--reveal-delay);
}

.is-active .service-card {
    opacity: 1;
    transform: translateY(var(--curve-offset));
}

.service-grid--featured .service-card:first-child,
.service-grid--featured .service-card:last-child {
    --curve-offset: 2.1rem;
}

.service-card--primary {
    z-index: 1;
    border-color: rgb(245 166 35 / 0.55);
    box-shadow: 0 1.8rem 4.5rem rgb(0 0 0 / 0.34), 0 0 0 1px rgb(245 166 35 / 0.08);
}

.service-card:hover {
    border-color: rgb(245 166 35 / 0.58);
    box-shadow: 0 1.6rem 4rem rgb(0 0 0 / 0.32);
}

.service-visual {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    background: var(--panel-2);
}

.service-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.76) contrast(1.06);
    transform: scale(1.01);
    transition: filter 350ms ease, transform 500ms ease;
}

.service-card:hover .service-visual img {
    filter: saturate(0.98) contrast(1.03);
    transform: scale(1.045);
}

.service-image-shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 42%, rgb(11 13 13 / 0.72));
    pointer-events: none;
}

.service-icon {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    display: grid;
    width: 2.8rem;
    height: 2.8rem;
    place-items: center;
    border: 1px solid rgb(245 166 35 / 0.5);
    border-radius: 50%;
    background: rgb(11 13 13 / 0.82);
    color: var(--signal);
    backdrop-filter: blur(10px);
}

.service-content {
    display: flex;
    min-height: 17rem;
    flex-direction: column;
    padding: clamp(1.2rem, 2.3vw, 1.7rem);
}

.service-code {
    margin: 0 0 0.55rem;
    color: var(--signal);
    font-family: var(--font-mono);
    font-size: 0.62rem;
    letter-spacing: 0.13em;
}

.service-content h3 {
    margin: 0;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: clamp(1.25rem, 2vw, 1.65rem);
    font-weight: 650;
    letter-spacing: -0.035em;
    line-height: 1.14;
}

.service-description {
    margin: 1rem 0 1.5rem;
    color: var(--muted);
    font-size: 0.88rem;
    line-height: 1.65;
}

.service-link {
    width: fit-content;
    min-height: 2.4rem;
    margin-top: auto;
    padding: 0.22rem 0.25rem 0.22rem 0.85rem;
    font-size: 0.65rem;
}

.service-link-icon {
    width: 1.85rem;
    height: 1.85rem;
}

.services--all {
    align-items: flex-start;
}

.services--all .services-inner {
    padding-top: clamp(7.5rem, 13vh, 9rem);
}

.services--all .services-heading h2 {
    max-width: 16ch;
}

@media (max-width: 1100px) {
    .service-grid--all {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 820px) {
    .services {
        align-items: stretch;
    }

    .services-header {
        align-items: flex-start;
    }

    .service-grid--featured {
        grid-template-columns: 1fr;
        padding-top: 0;
    }

    .service-grid--featured .service-card:first-child,
    .service-grid--featured .service-card:last-child {
        --curve-offset: 0rem;
    }

    .service-grid--featured .service-card--primary {
        order: -1;
    }
}

@media (max-width: 600px) {
    .services-inner {
        padding-inline: 1rem;
    }

    .services-header {
        display: grid;
        gap: 1.3rem;
    }

    .services-heading h2 {
        font-size: clamp(2.35rem, 12vw, 3.6rem);
    }

    .service-grid--all {
        grid-template-columns: 1fr;
    }

    .service-content {
        min-height: 15.5rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .services-header,
    .service-card {
        opacity: 1;
        transform: translateY(var(--curve-offset));
        transition: none;
    }

    .service-visual img,
    .split-button,
    .service-link,
    .split-button-icon,
    .service-link-icon {
        transition: none;
    }
}
</style>
