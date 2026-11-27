<script setup lang="ts">
import {
    ArrowRight,
    Braces,
    MonitorSmartphone,
    PenTool,
} from 'lucide-vue-next';
import { computed, onMounted  } from 'vue';
import type {Component} from 'vue';
import ServiceCard from '@/components/ui/ServiceCard.vue';
import { useSectionSlide } from '@/composables/useScrollStage';
import type { ServiceItem } from '@/types/portfolio';

const props = defineProps<{
    services: ServiceItem[];
}>();

const { isActiveSection } = useSectionSlide('services');

const serviceIcons: Record<string, Component> = {
    SOFTWARE: Braces,
    DESIGN: PenTool,
    WEB: MonitorSmartphone,
};

const featuredCodes = ['DESIGN', 'SOFTWARE', 'WEB'];
const featuredServices = computed(() =>
    featuredCodes
        .map((code) => props.services.find((service) => service.code === code))
        .filter((service): service is ServiceItem => Boolean(service)),
);

onMounted(() => {
    if (featuredServices.value.length < featuredCodes.length) {
        console.error(
            '[ServicesSection] One or more featured services could not be found.',
        );

        return;
    }

    console.info(
        `[ServicesSection] Displayed ${featuredServices.value.length} featured services.`,
    );
});
</script>

<template>
    <section
        id="services"
        class="stage-section services"
        :class="{ 'is-active': isActiveSection }"
        aria-labelledby="services-title"
    >
        <div class="services-inner" data-stage-scroll>
            <header class="services-header">
                <h2 id="services-title">Services I provide</h2>

                <a class="split-button" href="/services">
                    <span>View all services</span>
                    <span class="split-button-icon" aria-hidden="true">
                        <ArrowRight :size="18" />
                    </span>
                </a>
            </header>

            <div class="service-grid">
                <ServiceCard
                    v-for="(service, index) in featuredServices"
                    :key="service.code"
                    :service="service"
                    :icon="serviceIcons[service.code]"
                    :primary="service.code === 'SOFTWARE'"
                    :raised="index === 0 || index === featuredServices.length - 1"
                    :reveal-delay="`${120 + index * 80}ms`"
                />
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

.services-header h2 {
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

.split-button {
    display: inline-flex;
    min-height: 3rem;
    flex: 0 0 auto;
    align-items: center;
    gap: 0.45rem;
    padding: 0.28rem 0.3rem 0.28rem 1.15rem;
    border: 1px solid rgb(245 166 35 / 0.46);
    border-radius: 999px;
    background: #15251f;
    color: #ede9e2;
    font-family: var(--font-mono);
    font-size: 0.74rem;
    text-decoration: none;
    transition: border-color 180ms ease, transform 180ms ease;
}

.split-button-icon {
    display: grid;
    width: 2.35rem;
    height: 2.35rem;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    background: var(--signal);
    color: var(--on-signal);
    transition: transform 180ms ease;
}

.split-button:hover {
    border-color: var(--signal);
    transform: translateY(-2px);
}

.split-button:hover .split-button-icon {
    transform: rotate(-35deg);
}

.service-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(1rem, 2vw, 1.45rem);
    padding-top: 1.6rem;
}

@media (max-width: 820px) {
    .services {
        align-items: stretch;
    }

    .services-header {
        align-items: flex-start;
    }

    .service-grid {
        grid-template-columns: 1fr;
        padding-top: 0;
    }

    .service-grid :deep(.service-card--primary) {
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

    .services-header h2 {
        font-size: clamp(2.35rem, 12vw, 3.6rem);
    }
}

@media (prefers-reduced-motion: reduce) {
    .services-header {
        opacity: 1;
        transform: none;
        transition: none;
    }

    .split-button,
    .split-button-icon {
        transition: none;
    }
}
</style>
