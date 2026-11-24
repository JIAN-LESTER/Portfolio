<script setup lang="ts">
import { computed, onMounted, type Component } from 'vue';
import {
    ArrowUpRight,
    Braces,
    MonitorSmartphone,
    PenTool,
} from 'lucide-vue-next';
import { useSectionSlide } from '@/composables/useScrollStage';
import type { ServiceItem } from '@/types/portfolio';

const props = defineProps<{ services: ServiceItem[] }>();

const { isActiveSection } = useSectionSlide('services');

const serviceIcons: Record<string, Component> = {
    SOFTWARE: Braces,
    DESIGN: PenTool,
    WEB: MonitorSmartphone,
};

const displayedServices = computed(() => props.services.slice(0, 3));

onMounted(() => {
    if (displayedServices.value.length < 3) {
        console.error(
            '[ServicesSection] Expected three primary services but received fewer.',
        );
        return;
    }

    console.info(
        `[ServicesSection] Displayed ${displayedServices.value.length} primary services.`,
    );
});
</script>

<template>
    <section
        id="services"
        class="stage-section group flex items-center bg-[linear-gradient(90deg,rgb(245_166_35_/_0.035)_1px,transparent_1px),linear-gradient(rgb(245_166_35_/_0.035)_1px,transparent_1px),rgb(11_14_18_/_0.46)] bg-[length:4.5rem_4.5rem] max-[820px]:items-stretch"
        :class="{ 'is-active': isActiveSection }"
        aria-labelledby="services-title"
    >
        <div
            class="mx-auto max-h-full w-[min(100%,92rem)] overflow-y-auto px-[clamp(1.25rem,7vw,6rem)] pt-[clamp(5.75rem,11vh,8rem)] pb-12 overscroll-contain max-[820px]:h-full max-[820px]:max-h-full max-[820px]:pt-[5.5rem]"
            data-stage-scroll
        >
            <header
                class="mb-[clamp(2rem,5vh,3.5rem)] flex translate-y-4 items-end justify-between gap-8 opacity-0 transition-[opacity,transform] duration-600 ease-out group-[.is-active]:translate-y-0 group-[.is-active]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none max-[820px]:items-start max-[560px]:grid max-[560px]:gap-5"
            >
                <div>
                    <p
                        class="mb-3 flex items-center gap-[0.65rem] font-[var(--font-mono)] text-xs text-[var(--signal)] before:h-px before:w-6 before:bg-current before:content-['']"
                    >
                        Services
                    </p>
                    <h2
                        id="services-title"
                        class="m-0 font-[var(--font-display)] text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.06em] text-[var(--paper)] [text-wrap:balance]"
                    >
                        Services I provide
                    </h2>
                </div>

                <a
                    class="inline-flex min-h-[2.8rem] shrink-0 items-center justify-center gap-[0.55rem] rounded-full border border-[var(--signal-dim)] bg-[rgb(245_166_35_/_0.08)] py-[0.72rem] pr-4 pl-[1.2rem] font-[var(--font-mono)] text-[0.72rem] text-[var(--signal)] no-underline transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[var(--signal)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)] max-[560px]:w-fit"
                    href="/services"
                >
                    View all services
                    <ArrowUpRight :size="17" aria-hidden="true" />
                </a>
            </header>

            <div
                class="grid grid-cols-3 gap-[clamp(0.9rem,2vw,1.4rem)] max-[820px]:grid-cols-1"
            >
                <article
                    v-for="(service, index) in displayedServices"
                    :key="service.code"
                    class="group/card flex min-w-0 translate-y-5 flex-col rounded-2xl border border-[var(--line)] bg-[linear-gradient(155deg,rgb(27_34_43_/_0.96),rgb(21_26_33_/_0.96))] p-[clamp(1.35rem,2.7vw,2rem)] opacity-0 shadow-[0_1.25rem_3rem_rgb(0_0_0_/_0.16)] transition-[border-color,opacity,transform] duration-[620ms] ease-out group-[.is-active]:translate-y-0 group-[.is-active]:opacity-100 hover:border-[var(--signal-dim)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none max-[820px]:min-h-56 max-[560px]:min-h-0"
                    :style="{
                        transitionDelay: isActiveSection
                            ? `${120 + index * 90}ms`
                            : '0ms',
                    }"
                >
                    <div
                        class="mb-[clamp(2rem,5vh,3.75rem)] grid size-[3.2rem] place-items-center rounded-[0.8rem] border border-[rgb(245_166_35_/_0.26)] bg-[rgb(245_166_35_/_0.08)] text-[var(--signal)] transition-transform duration-200 group-hover/card:translate-x-[0.2rem] group-hover/card:-translate-y-[0.2rem] max-[820px]:mb-7"
                        aria-hidden="true"
                    >
                        <component
                            :is="serviceIcons[service.code] ?? Braces"
                            :size="28"
                            :stroke-width="1.7"
                        />
                    </div>

                    <p
                        class="mb-[0.65rem] font-[var(--font-mono)] text-[0.64rem] tracking-[0.14em] text-[var(--depth)]"
                    >
                        {{ service.code }}
                    </p>
                    <h3
                        class="m-0 font-[var(--font-display)] text-[clamp(1.3rem,2.2vw,1.75rem)] leading-[1.15] font-semibold tracking-[-0.035em] text-[var(--paper)]"
                    >
                        {{ service.title }}
                    </h3>
                    <p
                        class="mt-4 mb-7 text-[0.92rem] leading-[1.65] text-[var(--muted)]"
                    >
                        {{ service.paragraphs[0] }}
                    </p>

                    <a
                        class="mt-auto inline-flex w-fit items-center justify-center gap-[0.55rem] font-[var(--font-mono)] text-[0.68rem] text-[var(--paper)] no-underline transition-colors duration-200 hover:text-[var(--signal)] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]"
                        href="/contact"
                    >
                        Discuss this service
                        <ArrowUpRight :size="16" aria-hidden="true" />
                    </a>
                </article>
            </div>
        </div>
    </section>
</template>
