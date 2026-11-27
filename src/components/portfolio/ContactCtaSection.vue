<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

function logContactNavigation() {
    console.info('[ContactCtaSection] Opening the homepage contact form.');
}
</script>

<template>
    <section class="contact-cta" aria-labelledby="contact-cta-title">
        <div class="contact-cta-inner">
            <div>
                <h2 id="contact-cta-title">Have a project in mind?</h2>
                <p>
                    Tell me what you want to build, and I&rsquo;ll help you identify
                    the right service and next step.
                </p>
            </div>

            <RouterLink
                to="/#contact"
                class="contact-cta-link"
                @click="logContactNavigation"
            >
                <span>Contact me</span>
                <span class="contact-cta-icon" aria-hidden="true">
                    <ArrowRight :size="18" />
                </span>
            </RouterLink>
        </div>
    </section>
</template>

<style scoped>
.contact-cta {
    position: relative;
    z-index: 1;
    padding: clamp(2rem, 4vw, 3.5rem) clamp(1rem, 5vw, 5rem)
        clamp(4rem, 8vh, 6rem);
    background: var(--ink);
}

.contact-cta-inner {
    display: flex;
    width: min(100%, 92rem);
    align-items: center;
    justify-content: space-between;
    gap: clamp(2rem, 8vw, 7rem);
    margin-inline: auto;
    padding-top: clamp(2rem, 4vw, 3.5rem);
    border-top: 1px solid rgb(245 166 35 / 0.38);
}

.contact-cta h2 {
    margin: 0;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: clamp(1.65rem, 3.5vw, 2.8rem);
    font-weight: 650;
    letter-spacing: -0.045em;
    line-height: 1.05;
}

.contact-cta p {
    max-width: 44rem;
    margin: 0.85rem 0 0;
    color: var(--muted);
    font-size: 0.9rem;
    line-height: 1.65;
}

.contact-cta-link {
    display: inline-flex;
    width: fit-content;
    max-width: 100%;
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

.contact-cta-icon {
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

.contact-cta-link:hover {
    border-color: var(--signal);
    transform: translateY(-2px);
}

.contact-cta-link:hover .contact-cta-icon {
    transform: rotate(-35deg);
}

@media (max-width: 680px) {
    .contact-cta-inner {
        align-items: flex-start;
        flex-direction: column;
    }
}

@media (prefers-reduced-motion: reduce) {
    .contact-cta-link,
    .contact-cta-icon {
        transition: none;
    }
}
</style>
