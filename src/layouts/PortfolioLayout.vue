<script setup lang="ts">
import { onMounted } from 'vue';
import BackgroundField from '@/components/portfolio/BackgroundField.vue';
import Navbar from '@/components/ui/Navbar.vue';
import { provideScrollStage } from '@/composables/useScrollStage';
import type { StageSection } from '@/composables/useScrollStage';

const props = defineProps<{
    sections: StageSection[];
}>();

const stage = provideScrollStage(props.sections);

onMounted(() => {
    const requestedSection = window.location.hash.replace('#', '');

    if (!requestedSection) {
        return;
    }

    const sectionIndex = props.sections.findIndex(
        (section) => section.id === requestedSection,
    );

    if (sectionIndex < 0) {
        console.error(
            `[PortfolioLayout] Section "${requestedSection}" was not found on this page.`,
        );
        return;
    }

    stage.goToSection(sectionIndex);
    console.info(
        `[PortfolioLayout] Opened section "${requestedSection}" on the current page.`,
    );
});
</script>

<template>
    <div
        class="relative min-h-screen overflow-x-clip bg-[var(--ink)] font-[var(--font-body)] text-[var(--paper)] [&_*:focus-visible]:outline-2 [&_*:focus-visible]:outline-offset-[3px] [&_*:focus-visible]:outline-[var(--signal)] [&_.hero]:h-svh [&_.hero]:min-h-svh [&_.hero]:overflow-hidden [&_.stage-section:not(.hero):not(.about):not(.services):not(.site-footer)]:py-[clamp(4rem,8vh,6rem)] [&_.stage-section]:relative [&_.stage-section]:z-[1] [&_.stage-section]:h-auto [&_.stage-section]:min-h-0 [&_.stage-section]:w-full [&_.stage-section]:scroll-mt-20 [&_.stage-section]:overflow-visible [&_.stage-section]:opacity-100 [&_.stage-section]:[backface-visibility:hidden] [&_.stage-section]:[transform:translateZ(0)] [&_[data-stage-scroll]]:max-h-none [&_[data-stage-scroll]]:overflow-y-visible [&_[data-stage-scroll]]:overscroll-auto [&_[v-cloak]]:hidden motion-reduce:[&_.stage-section]:transition-none max-[780px]:[&_.hero]:h-auto max-[780px]:[&_.hero]:min-h-svh max-[780px]:[&_.hero]:overflow-visible"
    >
        <BackgroundField />
        <Navbar />

        <main class="relative">
            <slot />
        </main>
    </div>
</template>
