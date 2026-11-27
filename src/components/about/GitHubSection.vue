<script setup lang="ts">
import { computed, ref } from 'vue';
import { ArrowUpRight, Github } from 'lucide-vue-next';

const props = defineProps<{
    githubUrl?: string;
}>();

const imageAvailable = ref(true);
const username = computed(() => props.githubUrl?.split('/').filter(Boolean).at(-1));

function handleImageLoad() {
    console.info('[GitHubSection] GitHub contribution image loaded successfully.');
}

function handleImageError() {
    imageAvailable.value = false;
    console.error('[GitHubSection] GitHub contribution image could not be loaded.');
}
</script>

<template>
    <section id="github" class="stage-section github" aria-labelledby="github-title">
        <div class="section-inner">
            <div class="github-heading">
                <div class="github-mark" aria-hidden="true">
                    <Github :size="28" />
                </div>
                <div>
                    
                    <h2 id="github-title">My GitHub activity</h2>
                </div>
            </div>

            <div class="contribution-panel">
                <div class="panel-topline">
               
                    <span v-if="username">@{{ username }}</span>
                </div>

                <div class="chart-viewport">
                    <img
                        v-if="imageAvailable"
                        src="/github.webp"
                        :alt="`${username ?? 'My'} GitHub contribution activity for the past year`"
                        loading="lazy"
                        @load="handleImageLoad"
                        @error="handleImageError"
                    />
                    <p v-else class="chart-fallback">
                        The contribution image is temporarily unavailable. Visit my GitHub
                        profile to view the latest activity.
                    </p>
                </div>

                <a
                    v-if="githubUrl"
                    :href="githubUrl"
                    target="_blank"
                    rel="noreferrer"
                    class="github-link"
                >
                    Visit my GitHub
                    <ArrowUpRight :size="18" aria-hidden="true" />
                </a>
            </div>
        </div>
    </section>
</template>

<style scoped>
.github {
    padding-block: clamp(4.5rem, 9vw, 7.5rem);
    background-image:
        linear-gradient(90deg, rgb(237 233 226 / 0.025) 1px, transparent 1px),
        linear-gradient(rgb(237 233 226 / 0.025) 1px, transparent 1px);
    background-size: 4rem 4rem;
}

.section-inner {
    width: min(100%, 82rem);
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 7vw, 6rem);
}

.github-heading {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: 1rem;
}

.github-mark {
    display: grid;
    width: 3.5rem;
    aspect-ratio: 1;
    place-items: center;
    border: 1px solid var(--line);
    border-radius: 50%;
    color: var(--signal);
}

.section-kicker {
    margin: 0 0 0.7rem;
    color: var(--signal);
    font-family: var(--font-mono);
    font-size: 0.74rem;
}

h2 {
    max-width: 16ch;
    margin: 0;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: var(--section-heading-size);
    font-weight: 650;
    letter-spacing: -0.05em;
    line-height: 1;
    text-wrap: balance;
}

.contribution-panel {
    margin-top: clamp(2.5rem, 6vw, 4.5rem);
    padding: clamp(1rem, 3vw, 1.75rem);
    border: 1px solid var(--line);
    border-radius: 0.85rem;
    background: color-mix(in srgb, var(--panel) 90%, transparent);
    box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 0.2);
}

.panel-topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--line);
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 0.72rem;
}

.panel-topline p {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin: 0;
}

.status-dot {
    width: 0.55rem;
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--signal);
    box-shadow: 0 0 0 0.3rem rgb(245 166 35 / 0.1);
}

.chart-viewport {
    min-height: 8.5rem;
    margin-top: 1.25rem;
    overflow-x: auto;
    scrollbar-color: var(--signal-dim) transparent;
}

.chart-viewport img {
    display: block;
    min-width: 46rem;
    width: 100%;
    filter: saturate(0.9) contrast(1.08);
}

.chart-fallback {
    display: grid;
    min-height: 8.5rem;
    place-items: center;
    margin: 0;
    color: var(--muted);
    font-size: 0.9rem;
    line-height: 1.6;
    text-align: center;
}

.github-link {
    display: inline-flex;
    min-height: 3rem;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    margin-top: 1.25rem;
    padding: 0.75rem 1.05rem;
    border: 1px solid var(--signal);
    border-radius: 0.45rem;
    background: var(--signal);
    color: var(--on-signal);
    font-family: var(--font-mono);
    font-size: 0.76rem;
    font-weight: 650;
    text-decoration: none;
    transition:
        background-color 180ms ease,
        color 180ms ease,
        transform 180ms ease;
}

.github-link:hover {
    background: transparent;
    color: var(--signal);
    transform: translateY(-2px);
}

@media (max-width: 520px) {
    .github-heading {
        grid-template-columns: 1fr;
    }

    .panel-topline {
        align-items: flex-start;
        flex-direction: column;
    }

    .github-link {
        width: 100%;
    }
}

@media (prefers-reduced-motion: reduce) {
    .github-link {
        transition: none;
    }
}
</style>
