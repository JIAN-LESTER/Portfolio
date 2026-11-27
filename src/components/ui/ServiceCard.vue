<script setup lang="ts">

import { Braces } from 'lucide-vue-next';
import type { Component } from 'vue';
import { RouterLink } from 'vue-router';
import type { ServiceItem } from '@/types/portfolio';

defineProps<{
    service: ServiceItem;
    icon?: Component;
    primary?: boolean;
    raised?: boolean;
    revealDelay: string;
}>();

function handleImageError(service: ServiceItem) {
    console.error(
        `[ServiceCard] Failed to load the image for "${service.title}".`,
    );
}
</script>

<template>
    <article
        class="service-card"
        :class="{
            'service-card--primary': primary,
            'service-card--raised': raised,
        }"
        :style="{ '--reveal-delay': revealDelay }"
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
                    :is="icon ?? Braces"
                    :size="22"
                    :stroke-width="1.7"
                />
            </span>
        </div>

        <div class="service-content">
            <p class="service-code">{{ service.code }}</p>
            <h3>{{ service.title }}</h3>
            <p class="service-description">{{ service.paragraphs[0] }}</p>

            <RouterLink class="service-link" to="/#contact">
                <span>Discuss this service</span>
                <span class="service-link-icon" aria-hidden="true">
                    <ArrowRight :size="16" />
                </span>
            </RouterLink>
        </div>
    </article>
</template>

<style scoped>
.service-card {
    --curve-offset: 0rem;

    overflow: hidden;
    min-width: 0;
    border: 1px solid var(--line);
    border-radius: 1.15rem;

    background: linear-gradient(155deg, var(--panel-2), var(--panel));

    box-shadow: 0 1.4rem 3.5rem rgb(0 0 0 / 0.22);

    opacity: 1;
    transform: translateY(var(--curve-offset));

    animation: service-reveal 620ms ease
        var(--reveal-delay, 0ms) both;

    transition:
        border-color 220ms ease,
        box-shadow 220ms ease;
}

@keyframes service-reveal {
    from {
        opacity: 0;
        transform: translateY(calc(var(--curve-offset) + 1.25rem));
    }

    to {
        opacity: 1;
        transform: translateY(var(--curve-offset));
    }
}

.service-card--primary {
    z-index: 1;
    border-color: rgb(245 166 35 / 0.55);
    box-shadow: 0 1.8rem 4.5rem rgb(0 0 0 / 0.34), 0 0 0 1px rgb(245 166 35 / 0.08);
}

.service-card--raised {
    --curve-offset: 2.1rem;
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
    display: inline-flex;
    width: fit-content;
    min-height: 2.4rem;
    align-items: center;
    gap: 0.45rem;
    margin-top: auto;
    padding: 0.22rem 0.25rem 0.22rem 0.85rem;
    border: 1px solid rgb(245 166 35 / 0.46);
    border-radius: 999px;
    background: #15251f;
    color: #ede9e2;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-decoration: none;
    transition: border-color 180ms ease, transform 180ms ease;
}

.service-link-icon {
    display: grid;
    width: 1.85rem;
    height: 1.85rem;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    background: var(--signal);
    color: var(--on-signal);
    transition: transform 180ms ease;
}

.service-link:hover {
    border-color: var(--signal);
    transform: translateY(-2px);
}

.service-link:hover .service-link-icon {
    transform: rotate(-35deg);
}

@media (max-width: 600px) {
    .service-content {
        min-height: 15.5rem;
    }
}

@media (max-width: 820px) {
    .service-card--raised {
        --curve-offset: 0rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .service-card {
        animation: none;
        opacity: 1;
        transform: translateY(var(--curve-offset));
        transition: none;
    }
}
</style>
