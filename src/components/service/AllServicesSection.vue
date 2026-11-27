<script setup lang="ts">
import {
    AppWindow,
    Bot,
    Boxes,
    Braces,
    Check,
    LayoutTemplate,
    MonitorSmartphone,
    PenTool,
    Smartphone,
} from 'lucide-vue-next';
import { computed, nextTick, onMounted, ref, type Component } from 'vue';
import { useSectionSlide } from '@/composables/useScrollStage';
import type { ServiceItem } from '@/types/portfolio';

const props = defineProps<{
    services: ServiceItem[];
}>();

const { isActiveSection } = useSectionSlide('services');
const activeCode = ref(props.services[0]?.code ?? '');
const tabButtons = ref<HTMLButtonElement[]>([]);

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

const activeService = computed(() =>
    props.services.find((service) => service.code === activeCode.value),
);

function selectService(service: ServiceItem) {
    activeCode.value = service.code;
    console.info(`[AllServicesSection] Selected "${service.title}".`);
}

async function moveTabFocus(nextIndex: number) {
    const total = props.services.length;

    if (!total) {
        console.error(
            '[AllServicesSection] Cannot move focus because no services are available.',
        );
        return;
    }

    const normalizedIndex = (nextIndex + total) % total;
    const service = props.services[normalizedIndex];

    if (!service) {
        console.error(
            `[AllServicesSection] Service tab ${normalizedIndex} was not found.`,
        );
        return;
    }

    selectService(service);
    await nextTick();
    tabButtons.value[normalizedIndex]?.focus();
}

function handleTabKeydown(event: KeyboardEvent, index: number) {
    if (['ArrowRight', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
        void moveTabFocus(index + 1);
    } else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) {
        event.preventDefault();
        void moveTabFocus(index - 1);
    } else if (event.key === 'Home') {
        event.preventDefault();
        void moveTabFocus(0);
    } else if (event.key === 'End') {
        event.preventDefault();
        void moveTabFocus(props.services.length - 1);
    }
}

function handleImageError(service: ServiceItem) {
    console.error(
        `[AllServicesSection] Failed to load the image for "${service.title}".`,
    );
}

onMounted(() => {
    if (!activeService.value) {
        console.error(
            '[AllServicesSection] No service is available for the tab panel.',
        );
        return;
    }

    console.info(
        `[AllServicesSection] Loaded ${props.services.length} service tabs.`,
    );
});
</script>

<template>
    <section
        id="services"
        class="stage-section services all-services"
        :class="{ 'is-active': isActiveSection }"
        aria-labelledby="all-services-title"
    >
        <div class="all-services-inner" data-stage-scroll>
            <header class="all-services-header">
                <h2 id="all-services-title">My Services</h2>
           
            </header>

            <div v-if="activeService" class="services-browser">
                <div class="service-tabs" role="tablist" aria-label="Services">
                    <button
                        v-for="(service, index) in services"
                        :id="`service-tab-${service.code.toLowerCase()}`"
                        :key="service.code"
                        ref="tabButtons"
                        class="service-tab"
                        :class="{ 'is-selected': service.code === activeCode }"
                        type="button"
                        role="tab"
                        :aria-selected="service.code === activeCode"
                        :aria-controls="`service-panel-${service.code.toLowerCase()}`"
                        :tabindex="service.code === activeCode ? 0 : -1"
                        @click="selectService(service)"
                        @keydown="handleTabKeydown($event, index)"
                    >
                        <span class="service-tab-icon" aria-hidden="true">
                            <component
                                :is="serviceIcons[service.code] ?? Braces"
                                :size="19"
                                :stroke-width="1.8"
                            />
                        </span>
                        <span>{{ service.title }}</span>
                    </button>
                </div>

                <Transition name="service-panel" mode="out-in">
                    <article
                        :id="`service-panel-${activeService.code.toLowerCase()}`"
                        :key="activeService.code"
                        class="service-panel"
                        role="tabpanel"
                        :aria-labelledby="`service-tab-${activeService.code.toLowerCase()}`"
                    >
                        <div class="service-panel-copy">
                            <div class="service-title-row">
                                <span class="service-panel-icon" aria-hidden="true">
                                    <component
                                        :is="serviceIcons[activeService.code] ?? Braces"
                                        :size="25"
                                        :stroke-width="1.7"
                                    />
                                </span>
                                <h2>{{ activeService.title }}</h2>
                            </div>

                            <p class="service-description">
                                {{ activeService.paragraphs[0] }}
                            </p>

                            <div class="service-examples">
                                <h3>Examples</h3>
                                <ul class="example-list">
                                    <li
                                        v-for="example in activeService.examples"
                                        :key="example"
                                    >
                                        <Check :size="16" aria-hidden="true" />
                                        <span>{{ example }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="service-image">
                            <img
                                :src="activeService.image"
                                :alt="activeService.imageAlt"
                                loading="lazy"
                                @error="handleImageError(activeService)"
                            />
                        </div>
                    </article>
                </Transition>
            </div>

            <p v-else class="services-empty" role="status">
                Service details are currently unavailable.
            </p>
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
    padding: clamp(4rem, 8vw, 7rem) clamp(1rem, 5vw, 5rem) clamp(2.5rem, 5vw, 4rem);
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

.all-services-header h2 {
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

.services-browser {
    min-width: 0;
}

.service-tabs {
    display: grid;
    grid-template-columns: repeat(8, minmax(8.75rem, 1fr));
    gap: 0;
    overflow-x: auto;
    padding: 0.32rem;
    border: 1px solid var(--line);
    border-radius: 0.85rem;
    background: var(--panel-2);
    scrollbar-width: thin;
}

.service-tab {
    display: flex;
    width: 100%;
    min-width: 8.75rem;
    min-height: 3rem;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.55rem 0.7rem;
    border: 0;
    border-radius: 0.58rem;
    background: transparent;
    color: var(--muted);
    font-family: var(--font-body);
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1.25;
    text-align: center;
    cursor: pointer;
    transition:
        background-color 180ms ease,
        color 180ms ease,
        box-shadow 180ms ease;
}

.service-tab:hover {
    background: rgb(237 233 226 / 0.07);
    color: var(--paper);
}

.service-tab.is-selected {
    background: var(--paper);
    color: var(--ink);
    box-shadow: 0 0.2rem 0.65rem rgb(0 0 0 / 0.24);
}

.service-tab-icon {
    display: grid;
    width: 1.6rem;
    height: 1.6rem;
    flex: 0 0 auto;
    place-items: center;
    color: var(--muted);
    transition: color 180ms ease;
}

.service-tab.is-selected .service-tab-icon {
    color: var(--ink);
}

.service-panel {
    display: grid;
    min-width: 0;
    grid-template-columns: minmax(0, 1.08fr) minmax(20rem, 0.92fr);
    gap: clamp(2.5rem, 6vw, 6rem);
    align-items: center;
    padding-top: clamp(2.5rem, 5vw, 4.5rem);
}

.service-panel-copy {
    display: flex;
    min-width: 0;
    flex-direction: column;
    padding: 0;
}

.service-title-row {
    display: flex;
    align-items: center;
    gap: 0.9rem;
}

.service-panel-icon {
    display: grid;
    width: 3.25rem;
    height: 3.25rem;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid rgb(245 166 35 / 0.48);
    border-radius: 50%;
    color: var(--signal);
}

.service-title-row h2 {
    margin: 0;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: clamp(1.55rem, 3vw, 2.5rem);
    font-weight: 650;
    letter-spacing: -0.045em;
    line-height: 1.05;
}

.service-description {
    max-width: 46rem;
    margin: 1.35rem 0 0;
    color: #c2c4c0;
    font-size: clamp(0.92rem, 1.3vw, 1rem);
    line-height: 1.75;
}

.service-examples {
    margin-top: auto;
    padding-top: 2rem;
}

.service-examples h3 {
    margin: 0 0 0.85rem;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: 0.92rem;
    font-weight: 600;
}

.example-list {
    margin: 0;
    padding: 0;
    list-style: none;
}

.example-list {
    display: grid;
    gap: 0.65rem;
}

.example-list li {
    display: flex;
    align-items: flex-start;
    gap: 0.55rem;
    color: var(--muted);
    font-size: 0.83rem;
    line-height: 1.5;
}

.example-list svg {
    flex: 0 0 auto;
    margin-top: 0.15rem;
    color: var(--signal);
}

.service-image {
    position: relative;
    min-height: clamp(25rem, 38vw, 34rem);
    overflow: hidden;
    border-radius: 0.35rem;
    background: transparent;
}

.service-image::after {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        90deg,
        rgb(15 19 18 / 0.35),
        transparent 45%
    );
    content: '';
    pointer-events: none;
}

.service-image img {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.72) contrast(1.05);
}

.services-empty {
    padding: 2rem;
    border: 1px solid var(--line);
    border-radius: 1rem;
    color: var(--muted);
}

.service-panel-enter-active,
.service-panel-leave-active {
    transition: opacity 180ms ease, transform 180ms ease;
}

.service-panel-enter-from {
    opacity: 0;
    transform: translateY(0.5rem);
}

.service-panel-leave-to {
    opacity: 0;
    transform: translateY(-0.35rem);
}

@media (max-width: 980px) {
    .service-tabs {
        display: flex;
    }

    .service-tab {
        flex: 0 0 auto;
    }
}

@media (max-width: 760px) {
    .service-panel {
        grid-template-columns: 1fr;
    }

    .service-image {
        min-height: 15rem;
    }

    .service-image::after {
        background: linear-gradient(
            180deg,
            transparent 45%,
            rgb(15 19 18 / 0.42)
        );
    }
}

@media (max-width: 600px) {
    .all-services-inner {
        padding-inline: 1rem;
    }

    .all-services-header h2 {
        font-size: clamp(2.35rem, 12vw, 3.6rem);
    }

}

@media (prefers-reduced-motion: reduce) {
    .all-services-header {
        opacity: 1;
        transform: none;
        transition: none;
    }

    .service-tab,
    .service-panel-enter-active,
    .service-panel-leave-active {
        transition: none;
    }
}
</style>
