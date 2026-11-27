<script setup lang="ts">
import {
    Facebook,
    Github,
    Linkedin,
    Mail,
    Quote,
    Star,
} from 'lucide-vue-next';
import { useSectionSlide } from '@/composables/useScrollStage';
import type { PersonalInfo } from '@/types/portfolio';

defineProps<{ personal: PersonalInfo }>();

const { isActiveSection } = useSectionSlide('hero');

const serviceHighlights = [
    'Custom software development',
    'SaaS',
    'Web application',
    'Mobile application',
    'Prototyping',
    'Wireframing',
    'Dashboard',
    'Website design',
];

function handleImageLoad() {
    console.info('[HeroSection] Transparent profile image loaded successfully.');
}

function handleImageError() {
    console.error('[HeroSection] Transparent profile image could not be loaded.');
}
</script>

<template>
    <section
        id="hero"
        v-cloak
        class="stage-section hero"
        :class="{ 'is-active': isActiveSection }"
    >
        <div class="hero-inner" data-stage-scroll>
            <header class="hero-heading">
                <p class="hero-greeting">Hello there</p>

                <h1>
                    I&rsquo;m {{ personal.name.split(' ')[0] }} {{ personal.name.split(' ')[1] }}
                    <span>{{ personal.name.split(' ')[2] }}</span>
                </h1>
                <p class="hero-role">{{ personal.role }}</p>
                <p class="hero-location">
                    <span>Based in</span>
                    <strong>the Philippines</strong>
                </p>
            </header>

            <div class="availability-seal" aria-label="Open to work">
                <span>Open to</span>
                <strong>Work</strong>
                <i aria-hidden="true"></i>
            </div>

            <aside class="side-detail side-detail-left" aria-label="Social links and experience">
                <div class="social-block">
                    <p>Follow me on</p>
                    <div class="social-links">
                        <a
                            v-if="personal.github"
                            :href="personal.github"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="View GitHub profile"
                        >
                            <Github :size="16" aria-hidden="true" />
                        </a>
                        <a
                            v-if="personal.linkedin"
                            :href="personal.linkedin"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="View LinkedIn profile"
                        >
                            <Linkedin :size="16" aria-hidden="true" />
                        </a>
                        <a
                            v-if="personal.facebook"
                            :href="personal.facebook"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="View Facebook profile"
                        >
                            <Facebook :size="16" aria-hidden="true" />
                        </a>
                        <a :href="`mailto:${personal.email}`" aria-label="Send an email">
                            <Mail :size="16" aria-hidden="true" />
                        </a>
                    </div>
                </div>

                <div class="experience-block">
                    <div class="stars" aria-label="Experienced software developer">
                        <Star
                            v-for="star in 5"
                            :key="star"
                            :size="13"
                            aria-hidden="true"
                        />
                    </div>
                    <p class="experience-duration">
                        <strong>3+ years</strong> of hands-on experience
                    </p>
                    <p class="experience-context">
                        Project-based, academic, and internship work
                    </p>
                    <span class="experience-domains">
                        Web, mobile, AI, and database systems
                    </span>
                </div>
            </aside>

            <figure v-if="personal.image" class="portrait-wrap">
                <span class="portrait-orbits" aria-hidden="true">
                    <i class="orbit orbit-large"></i>
                    <i class="orbit orbit-medium"></i>
                    <i class="orbit orbit-small"></i>
                    <i class="orbit orbit-dot"></i>
                </span>
                <img
                    class="portrait"
                    :src="personal.image"
                    :alt="`${personal.name}, ${personal.role}`"
                    @load="handleImageLoad"
                    @error="handleImageError"
                />
                <figcaption class="sr-only">Portrait of {{ personal.name }}</figcaption>
            </figure>

            <aside class="side-detail side-detail-right" aria-label="Professional summary">
                <div class="quote-block">
                    <Quote :size="25" aria-hidden="true" />
                    <p>{{ personal.tagline }}</p>
                </div>

                <div class="expertise-block">
                    <p>Expertise</p>
                    <ul>
                        <li>Frontend</li>
                        <li class="highlight">Backend</li>
                        <li>Mobile</li>
                        <li class="highlight">AI</li>
                        <li>Web Design</li>
                    </ul>
                </div>
            </aside>

            <div class="hero-actions" aria-label="Portfolio actions">
                <a class="btn btn-primary" href="/projects">
                    View my works
                    <span aria-hidden="true">●</span>
                </a>
                <a class="btn btn-secondary" href="/#contact">
                    Contact me
                </a>
            </div>
        </div>

        <div class="service-marquee" aria-label="Services offered">
            <div class="service-marquee-track">
                <ul class="service-marquee-group">
                    <li v-for="service in serviceHighlights" :key="service">
                        {{ service }}
                    </li>
                </ul>
                <ul class="service-marquee-group" aria-hidden="true">
                    <li v-for="service in serviceHighlights" :key="`duplicate-${service}`">
                        {{ service }}
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<style scoped>
.hero {
    isolation: isolate;
    background:
        radial-gradient(circle at 50% 105%, rgb(245 166 35 / 0.1), transparent 31%),
        var(--ink);
}

.hero::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    height: 1px;
    background: color-mix(in srgb, var(--paper) 15%, transparent);
    content: '';
}

.hero-inner {
    position: relative;
    z-index: 1;
    width: min(100%, 112rem);
    min-height: 100vh;
    min-height: 100svh;
    box-sizing: border-box;
    margin-inline: auto;
    padding: clamp(5.6rem, 10vh, 6.7rem) clamp(1.25rem, 5.5vw, 5.5rem) 5rem;
}

.hero-heading {
    position: relative;
    z-index: 4;
    max-width: 72rem;
    margin-inline: auto;
    text-align: center;
    opacity: 0;
    transform: translateY(0.75rem);
}

.is-active .hero-heading {
    animation: reveal 600ms ease-out 80ms forwards;
}

.hero-greeting {
    color: var(--signal);
    font-family: var(--font-display);
    font-size: clamp(1.35rem, 1.85vw, 1.75rem);
    font-weight: 600;
    letter-spacing: -0.02em;
}

.hero-heading h1 {
    margin-top: 0.55rem;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: clamp(3.15rem, 5.6vw, 5.4rem);
    font-weight: 700;
    letter-spacing: -0.07em;
    line-height: 0.95;
}

.hero-heading h1 span {
    color: var(--signal);
}

.hero-role {
    margin-top: 0.75rem;
    color: color-mix(in srgb, var(--paper) 76%, transparent);
    font-size: clamp(0.9rem, 1.15vw, 1.05rem);
    font-weight: 500;
}

.hero-location {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.55rem;
    margin-top: 0.5rem;
}

.hero-location span {
    color: color-mix(in srgb, var(--paper) 45%, transparent);
    font-family: var(--font-mono);
    font-size: clamp(0.62rem, 0.68vw, 0.72rem);
}

.hero-location strong {
    color: var(--signal);
    font-family: var(--font-display);
    font-size: clamp(1rem, 1.3vw, 1.25rem);
    font-style: italic;
    font-weight: 600;
    letter-spacing: -0.04em;
}

.availability-seal {
    position: absolute;
    top: clamp(7rem, 15vh, 9.2rem);
    right: clamp(1.5rem, 8vw, 8rem);
    z-index: 5;
    width: 5.15rem;
    height: 5.15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(237 233 226 / 0.14);
    border-radius: 50%;
    color: color-mix(in srgb, var(--paper) 50%, transparent);
    font-family: var(--font-mono);
    font-size: 0.58rem;
    line-height: 1.2;
    opacity: 0;
    transform: rotate(8deg) scale(0.9);
}

.is-active .availability-seal {
    animation: seal-reveal 600ms ease-out 420ms forwards;
}

.availability-seal::before,
.availability-seal::after {
    position: absolute;
    border-radius: inherit;
    content: '';
}

.availability-seal::before {
    inset: 0.38rem;
    border: 1px dashed rgb(237 233 226 / 0.13);
}

.availability-seal::after {
    inset: 50%;
    width: 0.34rem;
    height: 0.34rem;
    background: var(--signal);
    box-shadow: 0 0 0 0.22rem rgb(245 166 35 / 0.1);
    transform: translate(-50%, 1.1rem);
}

.availability-seal strong {
    color: var(--paper);
    font-size: 0.78rem;
    font-weight: 600;
}

.availability-seal i {
    display: none;
}

.portrait-wrap {
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 2;
    width: min(48vw, 46rem);
    min-width: 30rem;
    height: min(66vh, 44rem);
    margin: 0;
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, 1.5rem);
}

.is-active .portrait-wrap {
    animation: portrait-reveal 800ms cubic-bezier(0.2, 0.75, 0.25, 1) 180ms forwards;
}

.portrait-wrap::before {
    position: absolute;
    right: 7%;
    bottom: -2rem;
    left: 7%;
    z-index: -1;
    height: 38%;
    border-radius: 50%;
    background: rgb(245 166 35 / 0.1);
    filter: blur(4.5rem);
    content: '';
}

.portrait-orbits {
    position: absolute;
    inset: 5% -9% 3%;
    z-index: 0;
}

.orbit {
    position: absolute;
    display: block;
    border: 1px solid color-mix(in srgb, var(--paper) 12%, transparent);
    border-radius: 50%;
    box-shadow: inset 0 0 3rem rgb(255 255 255 / 0.025);
}

.orbit-large {
    top: 4%;
    left: 11%;
    width: 78%;
    aspect-ratio: 1;
    border-color: color-mix(in srgb, var(--paper) 8%, transparent);
    background:
        radial-gradient(circle at 50% 38%, var(--panel-2), var(--panel) 76%);
    box-shadow:
        inset 0 0 4rem rgb(0 0 0 / 0.3),
        0 2rem 5rem rgb(0 0 0 / 0.32);
}

.orbit-medium {
    top: 0;
    left: 2%;
    width: 96%;
    aspect-ratio: 1;
    border-color: color-mix(in srgb, var(--paper) 9%, transparent);
}

.orbit-small {
    top: 24%;
    right: 1%;
    width: 25%;
    aspect-ratio: 1;
    border-style: dashed;
    border-color: rgb(245 166 35 / 0.55);
}

.orbit-dot {
    top: 13%;
    right: 12%;
    width: 6%;
    aspect-ratio: 1;
    border: 0;
    background: var(--signal);
    box-shadow: 0 0 0 0.65rem rgb(245 166 35 / 0.12);
}

.portrait {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    object-position: center bottom;
    filter: drop-shadow(0 1.5rem 2rem rgb(0 0 0 / 0.28));
}

.side-detail {
    position: absolute;
    top: 48%;
    z-index: 4;
    width: min(23vw, 20rem);
    opacity: 0;
    transform: translateY(0.8rem);
}

.is-active .side-detail {
    animation: reveal 600ms ease-out 340ms forwards;
}

.side-detail-left {
    left: clamp(1.5rem, 4.5vw, 5rem);
}

.side-detail-right {
    right: clamp(1.5rem, 4.5vw, 5rem);
    text-align: right;
}

.social-block > p,
.expertise-block > p {
    margin-bottom: 0.85rem;
    color: color-mix(in srgb, var(--paper) 65%, transparent);
    font-size: clamp(0.95rem, 1.05vw, 1.08rem);
    font-weight: 500;
}

.social-links {
    display: flex;
    gap: 0.6rem;
}

.social-links a {
    width: 3rem;
    height: 3rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid color-mix(in srgb, var(--paper) 14%, transparent);
    border-radius: 50%;
    background: color-mix(in srgb, var(--panel) 66%, transparent);
    color: color-mix(in srgb, var(--paper) 75%, transparent);
    transition:
        border-color 180ms ease,
        color 180ms ease,
        transform 180ms ease;
}

.social-links a :deep(svg) {
    width: 1.2rem;
    height: 1.2rem;
}

.social-links a:hover {
    border-color: var(--signal);
    color: var(--signal);
    transform: translateY(-2px);
}

.experience-block {
    margin-top: clamp(3.5rem, 10vh, 6rem);
}

.stars {
    display: flex;
    gap: 0.18rem;
    color: var(--signal);
}

.stars :deep(svg) {
    width: 1.05rem;
    height: 1.05rem;
    fill: currentColor;
}

.experience-duration {
    margin-top: 0.55rem;
    color: var(--paper);
    font-size: clamp(1rem, 1.15vw, 1.18rem);
    line-height: 1.4;
}

.experience-duration strong {
    color: var(--signal);
    font-weight: 600;
}

.experience-context {
    margin-top: 0.45rem;
    color: color-mix(in srgb, var(--paper) 70%, transparent);
    font-size: clamp(0.88rem, 0.95vw, 1rem);
    line-height: 1.45;
}

.experience-domains {
    display: block;
    margin-top: 0.4rem;
    color: color-mix(in srgb, var(--paper) 40%, transparent);
    font-size: clamp(0.82rem, 0.9vw, 0.95rem);
    line-height: 1.5;
}

.quote-block {
    margin-left: auto;
}

.quote-block svg {
    width: 2.75rem;
    height: 2.75rem;
    color: var(--signal);
    fill: var(--signal);
}

.quote-block p {
    margin-top: 0.65rem;
    margin-left: auto;
    color: color-mix(in srgb, var(--paper) 72%, transparent);
    font-size: clamp(1.05rem, 1.2vw, 1.25rem);
    line-height: 1.55;
}

.expertise-block {
    margin-top: clamp(2.4rem, 6vh, 4rem);
}

.expertise-block ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.55rem;
    margin: 0;
    padding: 0;
    list-style: none;
}

.expertise-block li {
    padding: 0.62rem 1rem;
    border: 1px solid color-mix(in srgb, var(--paper) 12%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, var(--panel) 72%, transparent);
    color: color-mix(in srgb, var(--paper) 70%, transparent);
    font-family: var(--font-mono);
    font-size: clamp(0.8rem, 0.9vw, 0.92rem);
}

.expertise-block li.highlight {
    border-color: var(--signal);
    background: var(--signal);
    color: var(--on-signal);
}

.hero-actions {
    position: absolute;
    bottom: clamp(5rem, 8vh, 5.8rem);
    left: 50%;
    z-index: 6;
    display: flex;
    gap: 0.5rem;
    opacity: 0;
    transform: translate(-50%, 0.8rem);
}

.is-active .hero-actions {
    animation: action-reveal 600ms ease-out 560ms forwards;
}

.btn {
    min-height: 3.15rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.48rem;
    padding: 0.78rem 1.5rem;
    border: 1px solid transparent;
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
    transition:
        transform 180ms ease,
        border-color 180ms ease,
        background-color 180ms ease;
}

.btn:hover {
    transform: translateY(-2px);
}

.btn-primary {
    background: var(--signal);
    color: var(--on-signal);
}

.btn-primary span {
    width: 1rem;
    height: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--on-signal);
    color: var(--signal);
    font-size: 0.4rem;
}

.btn-secondary {
    border-color: color-mix(in srgb, var(--paper) 26%, transparent);
    background: color-mix(in srgb, var(--panel) 84%, transparent);
    color: var(--paper);
    backdrop-filter: blur(10px);
}

.btn-secondary:hover {
    border-color: var(--signal);
}

.service-marquee {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 7;
    overflow: hidden;
    border-block: 1px solid rgb(245 166 35 / 0.28);
    background: color-mix(in srgb, var(--panel) 94%, transparent);
    color: var(--paper);
}

.service-marquee-track {
    width: max-content;
    display: flex;
    animation: marquee-scroll 32s linear infinite;
}

.service-marquee-group {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
}

.service-marquee-group li {
    display: flex;
    align-items: center;
    gap: clamp(1.25rem, 2.5vw, 2.75rem);
    padding-block: 0.95rem;
    padding-left: clamp(1.25rem, 2.5vw, 2.75rem);
    font-family: var(--font-display);
    font-size: clamp(1rem, 1.45vw, 1.3rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    white-space: nowrap;
}

.service-marquee-group li::after {
    color: var(--signal);
    content: '+';
    font-size: 1.2em;
    font-weight: 500;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

@keyframes reveal {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes portrait-reveal {
    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}

@keyframes action-reveal {
    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}

@keyframes seal-reveal {
    to {
        opacity: 1;
        transform: rotate(8deg) scale(1);
    }
}

@keyframes marquee-scroll {
    to {
        transform: translateX(-50%);
    }
}

@media (max-width: 900px) {
    .availability-seal {
        right: 2rem;
    }

    .portrait-wrap {
        width: min(57vw, 37rem);
        min-width: 26rem;
    }

    .side-detail {
        width: 13.5rem;
    }

    .side-detail-left {
        left: 2rem;
    }

    .side-detail-right {
        right: 2rem;
    }

    .quote-block p {
        font-size: 1rem;
    }
}

@media (max-width: 700px) {
    .hero {
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: contain;
    }

    .hero-inner {
        height: auto;
        min-height: 100vh;
        min-height: 100svh;
        display: grid;
        grid-template-columns: 1fr;
        padding: 6rem 1.2rem 2rem;
    }

    .hero-heading {
        grid-row: 1;
    }

    .hero-heading h1 {
        font-size: clamp(3rem, 12.5vw, 4rem);
    }

    .hero-role {
        max-width: 23rem;
        margin-inline: auto;
        line-height: 1.45;
    }

    .availability-seal {
        top: 10.75rem;
        right: 1rem;
        width: 3.7rem;
        height: 3.7rem;
    }

    .portrait-wrap {
        position: relative;
        bottom: auto;
        left: auto;
        grid-row: 2;
        width: min(100vw, 34rem);
        min-width: 0;
        height: min(62vh, 34rem);
        margin: 1.5rem auto 0;
        transform: translateY(1.25rem);
    }

    .is-active .portrait-wrap {
        animation-name: mobile-portrait-reveal;
    }

    .hero-actions {
        position: relative;
        bottom: auto;
        left: auto;
        grid-row: 3;
        justify-content: center;
        margin-top: -2.6rem;
        transform: translateY(0.8rem);
    }

    .is-active .hero-actions {
        animation-name: reveal;
    }

    .side-detail {
        position: relative;
        top: auto;
        right: auto;
        left: auto;
        width: 100%;
        max-width: 28rem;
        margin-inline: auto;
        padding-top: 1.4rem;
        border-top: 1px solid color-mix(in srgb, var(--paper) 10%, transparent);
    }

    .side-detail-left {
        grid-row: 4;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-top: 1.8rem;
    }

    .experience-block {
        margin-top: 0;
    }

    .side-detail-right {
        grid-row: 5;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-top: 1.4rem;
        text-align: left;
    }

    .quote-block,
    .quote-block p {
        margin-left: 0;
    }

    .expertise-block {
        margin-top: 0;
    }

    .expertise-block ul {
        justify-content: flex-start;
    }

    .service-marquee {
        position: relative;
    }
}

@media (max-width: 430px) {
    .hero-inner {
        padding-inline: 1rem;
    }

    .hero-greeting {
        font-size: 1.35rem;
    }

    .hero-location strong {
        font-size: 1.05rem;
    }

    .availability-seal {
        display: none;
    }

    .side-detail-left,
    .side-detail-right {
        grid-template-columns: 1fr;
    }

    .hero-actions {
        width: 100%;
    }

    .btn {
        flex: 1 1 0;
    }
}

@keyframes mobile-portrait-reveal {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (prefers-reduced-motion: reduce) {
    .hero-heading,
    .availability-seal,
    .portrait-wrap,
    .side-detail,
    .hero-actions,
    .is-active .hero-heading,
    .is-active .availability-seal,
    .is-active .portrait-wrap,
    .is-active .side-detail,
    .is-active .hero-actions {
        animation: none;
        opacity: 1;
    }

    .portrait-wrap,
    .is-active .portrait-wrap {
        transform: translate(-50%, 0);
    }

    .hero-actions,
    .is-active .hero-actions {
        transform: translate(-50%, 0);
    }

    .social-links a,
    .btn {
        transition: none;
    }

    .service-marquee-track {
        width: 100%;
        animation: none;
    }

    .service-marquee-group {
        flex-wrap: wrap;
        justify-content: center;
    }

    .service-marquee-group[aria-hidden='true'] {
        display: none;
    }

    .service-marquee-group li {
        white-space: normal;
    }
}

@media (max-width: 700px) and (prefers-reduced-motion: reduce) {
    .portrait-wrap,
    .is-active .portrait-wrap,
    .hero-actions,
    .is-active .hero-actions {
        transform: none;
    }
}
</style>
