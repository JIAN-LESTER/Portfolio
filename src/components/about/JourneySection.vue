<script setup lang="ts">
import { onMounted } from 'vue';
import type { EducationItem, ExperienceItem } from '@/types/portfolio';

defineProps<{
    education: EducationItem;
    experience: ExperienceItem;
}>();

onMounted(() => {
    console.info('[Journey] Education and experience cards are ready.');
});
</script>

<template>
    <section id="journey" class="stage-section journey">
        <div class="section-inner">
            <header class="section-heading">
             
                <div>
                    <h2>Background</h2>
                    <p>Academic foundation and hands-on industry experience.</p>
                </div>
            </header>

            <div class="journey-grid">
                <article class="journey-card education-card">
                    <div class="card-topline">
                        <span class="card-type">Education</span>
                        <span class="range">
                            {{ education.start }} &ndash; {{ education.end }}
                        </span>
                    </div>

                    <h3>{{ education.school }}</h3>
                    <p class="role">
                        {{ education.degree }} in {{ education.field }}
                    </p>

                    <span v-if="education.honor" class="honor">
                        {{ education.honor }}
                    </span>
                    <p v-if="education.description" class="description">
                        {{ education.description }}
                    </p>
                </article>

                <article class="journey-card experience-card">
                    <div class="card-topline">
                        <span class="card-type">Experience</span>
                        <span class="range">
                            {{ experience.start }} &ndash; {{ experience.end }}
                        </span>
                    </div>

                    <h3>{{ experience.company }}</h3>
                    <p class="role">{{ experience.role }}</p>
                    <p v-if="experience.location" class="location">
                        {{ experience.location }}
                    </p>

                    <ul class="highlights">
                        <li v-for="highlight in experience.highlights" :key="highlight">
                            {{ highlight }}
                        </li>
                    </ul>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.journey {
    display: flex;
    align-items: center;
}

.section-inner {
    width: 100%;
    max-width: 1600px;
    margin-inline: auto;
    padding-inline: clamp(18px, 6vw, 100px);
}

.section-heading {
    display: grid;
    gap: 1rem;
    margin-bottom: clamp(1.5rem, 4vw, 2.75rem);
}

.eyebrow,
.card-type,
.range,
.location {
    font-family: var(--font-mono);
}

.eyebrow {
    margin: 0;
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    color: var(--depth);
}

.section-heading h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3.8rem);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.045em;
    color: var(--paper);
}

.section-heading > div > p {
    margin: 0.65rem 0 0;
    color: var(--muted);
    line-height: 1.55;
}

.journey-grid {
    display: grid;
    gap: clamp(1rem, 2.5vw, 2rem);
}

.journey-card {
    position: relative;
    min-width: 0;
    height: 100%;
    padding: clamp(1.35rem, 3vw, 2.25rem);
    overflow: hidden;
    border: 1px solid rgb(237 233 226 / 0.18);
    border-radius: 0.75rem;
    background:
        linear-gradient(145deg, rgb(255 255 255 / 0.035), transparent 52%),
        var(--panel);
    box-shadow: 0 1.25rem 3rem rgb(0 0 0 / 0.18);
}

.journey-card::before {
    position: absolute;
    inset: 0 auto 0 0;
    width: 3px;
    background: var(--signal);
    content: '';
}

.experience-card::before {
    background: var(--depth);
}

.journey-card::after {
    position: absolute;
    right: -3rem;
    bottom: -4rem;
    width: 10rem;
    aspect-ratio: 1;
    border: 1px solid rgb(245 166 35 / 0.12);
    border-radius: 50%;
    content: '';
    pointer-events: none;
}

.card-topline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--line);
}

.card-type {
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    color: var(--signal);
}

.range,
.location {
    font-size: 0.72rem;
    color: var(--muted);
}

.journey-card h3 {
    max-width: 22ch;
    margin: clamp(1.35rem, 3vw, 2rem) 0 0;
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 600;
    line-height: 1.08;
    letter-spacing: -0.035em;
    color: var(--paper);
}

.role {
    margin: 0.65rem 0 0;
    color: color-mix(in srgb, var(--paper) 86%, transparent);
    line-height: 1.5;
}

.location {
    margin: 0.45rem 0 0;
    color: var(--depth);
}

.honor {
    display: inline-flex;
    margin-top: 1.15rem;
    padding: 0.35rem 0.7rem;
    border: 1px solid var(--signal-dim);
    border-radius: 999px;
    color: var(--signal);
    font-family: var(--font-mono);
    font-size: 0.7rem;
}

.description {
    max-width: 62ch;
    margin: 1.2rem 0 0;
    color: var(--muted);
    font-size: 0.92rem;
    line-height: 1.7;
}

.highlights {
    display: grid;
    gap: 0.7rem;
    margin: 1.2rem 0 0;
    padding-left: 1.1rem;
}

.highlights li {
    padding-left: 0.2rem;
    color: var(--muted);
    font-size: 0.9rem;
    line-height: 1.6;
}

.highlights li::marker {
    color: var(--signal);
}

@media (min-width: 640px) {
    .journey-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-items: stretch;
    }
}

@media (min-width: 780px) {
    .section-heading {
        grid-template-columns: minmax(9rem, 0.35fr) 1fr;
        align-items: end;
        gap: clamp(1.5rem, 4vw, 4rem);
    }
}
</style>
