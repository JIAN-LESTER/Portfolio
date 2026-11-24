<script setup lang="ts">
import { computed, onMounted } from 'vue';
import BackgroundField from '@/components/portfolio/BackgroundField.vue';
import Navbar from '@/components/ui/Navbar.vue';
import { provideScrollStage } from '@/composables/useScrollStage';
import type { StageSection } from '@/composables/useScrollStage';

const props = defineProps<{
    sections: StageSection[];
}>();

const stage = provideScrollStage(props.sections);

const trackStyle = computed(() => ({
    transform: `translate3d(0, calc(var(--vh, 1vh) * -100 * ${stage.state.activeSection}), 0)`,
}));

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
    <div class="stage">
        <BackgroundField />
        <Navbar />

        <div class="stage-track" :style="trackStyle">
            <slot />
        </div>
    </div>
</template>

<style>
/* Global tokens — intentionally unscoped so every portfolio section can use them. */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
    --ink: #0b0e12;
    --panel: #151a21;
    --panel-2: #1b222b;
    --line: #262f3a;
    --paper: #ede9e2;
    --muted: #8b93a1;
    --signal: #f5a623;
    --signal-dim: #7a5518;
    --depth: #6c7bff;
    --depth-dim: #2e3468;

    --font-display: 'Space Grotesk', sans-serif;
    --font-body: 'IBM Plex Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
}

html.stage-lock,
html.stage-lock body {
    height: 100%;
    margin: 0;
    overflow: hidden;
    overscroll-behavior: none;
    background: var(--ink);
}

body {
    font-family: var(--font-body);
    color: var(--paper);
}

/* Shared section sizing — each portfolio section component renders its own
   root <section class="stage-section">, sized here so the layout can page
   through them by translating .stage-track. */
.stage-section {
    position: relative;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
    flex-shrink: 0;
    overflow: hidden;
    z-index: 1;
    opacity: 1;
    transform: translateZ(0);
    backface-visibility: hidden;
}

.stage-section.is-active {
    opacity: 1;
}

*:focus-visible {
    outline: 2px solid var(--signal);
    outline-offset: 3px;
}

[v-cloak] {
    display: none;
}

@media (prefers-reduced-motion: reduce) {
    .stage-section {
        transition: none;
    }
}
</style>

<style scoped>
.stage {
    position: fixed;
    inset: 0;
    background: var(--ink);
    overflow: hidden;
}

.stage-track {
    display: flex;
    flex-direction: column;
    transition: transform 0.85s cubic-bezier(0.65, 0, 0.35, 1);
    will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
    .stage-track {
        transition: none;
    }
}
</style>
