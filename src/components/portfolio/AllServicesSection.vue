<script setup lang="ts">
import { onMounted, type Component } from 'vue';
import {
    AppWindow,
    Bot,
    Boxes,
    Braces,
    LayoutTemplate,
    MonitorSmartphone,
    PenTool,
    Smartphone,
} from 'lucide-vue-next';
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
    MOBILE: Smartphone,
    AI: Bot,
    SAAS: AppWindow,
    PROTOTYPE: Boxes,
    WIREFRAME: LayoutTemplate,
};

onMounted(() => {
    console.info(`[AllServicesSection] Displayed ${props.services.length} services.`);
});
</script>

<template>
<section
    id="services"
    class="stage-section all-services is-active"
    aria-labelledby="all-services-title"
>
        <div class="all-services-inner" data-stage-scroll>
            <header class="all-services-header">
                <h1 id="all-services-title">Services for every product stage</h1>
                <p>
                    From an early wireframe to a production-ready web, mobile, AI,
                    or SaaS product, each service can stand alone or connect into
                    one complete build.
                </p>
            </header>

            <div class="all-services-grid">
                <ServiceCard
                    v-for="(service, index) in services"
                    :key="service.code"
                    :service="service"
                    :icon="serviceIcons[service.code]"
                    :reveal-delay="`${120 + index * 80}ms`"
                />
            </div>
        </div>
    </section>
</template>

<style scoped>
.all-services {
    display: flex;
    align-items: flex-start;
    background-image:
        linear-gradient(90deg, rgb(245 166 35 / 0.035) 1px, transparent 1px),
        linear-gradient(rgb(245 166 35 / 0.035) 1px, transparent 1px),
        radial-gradient(circle at 50% 105%, rgb(245 166 35 / 0.09), transparent 32%);
    background-size: 4.5rem 4.5rem, 4.5rem 4.5rem, auto;
}

.all-services-inner {
    width: min(100%, 92rem);
    margin-inline: auto;
    padding: clamp(7.5rem, 13vh, 9rem) clamp(1.25rem, 7vw, 6rem) clamp(4rem, 8vh, 6rem);
}

.all-services-header {
    margin-bottom: clamp(2rem, 5vh, 3.4rem);
    opacity: 0;
    transform: translateY(1rem);
    transition: opacity 600ms ease, transform 600ms ease;
}

.is-active .all-services-header {
    opacity: 1;
    transform: translateY(0);
}

.all-services-header h1 {
    max-width: 16ch;
    margin: 0;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 5vw, 4.6rem);
    font-weight: 700;
    letter-spacing: -0.06em;
    line-height: 0.98;
    text-wrap: balance;
}

.all-services-header p {
    max-width: 46rem;
    margin: 1.25rem 0 0;
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.7;
}

.all-services-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(1rem, 2vw, 1.45rem);
}

@media (max-width: 1100px) {
    .all-services-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 600px) {
    .all-services-inner {
        padding-inline: 1rem;
    }

    .all-services-header h1 {
        font-size: clamp(2.35rem, 12vw, 3.6rem);
    }

    .all-services-grid {
        grid-template-columns: 1fr;
    }
}

@media (prefers-reduced-motion: reduce) {
    .all-services-header {
        opacity: 1;
        transform: none;
        transition: none;
    }
}
</style>
