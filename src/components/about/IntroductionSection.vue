<script setup lang="ts">
import { onMounted } from 'vue';
import { Braces, Lightbulb, UsersRound } from 'lucide-vue-next';
import type { PersonalInfo } from '@/types/portfolio';

defineProps<{
    personal: PersonalInfo;
}>();

const principles = [
    {
        title: 'Understand first',
        description: 'I begin with the people, constraints, and problem behind the screen.',
        icon: Lightbulb,
    },
    {
        title: 'Build the whole flow',
        description: 'I connect interface, backend logic, and data into one dependable experience.',
        icon: Braces,
    },
    {
        title: 'Keep it human',
        description: 'I make technical decisions with clarity, accessibility, and real use in mind.',
        icon: UsersRound,
    },
];

onMounted(() => {
    console.info('[IntroductionSection] About introduction is ready.');
});
</script>

<template>
    <section
        id="about-content"
        class="stage-section introduction"
        aria-labelledby="introduction-title"
    >
        <div class="section-inner introduction-grid">
            <div class="introduction-heading">
                <h2 id="introduction-title">
                    A developer who sees software as a practical way to help people
                </h2>
            </div>

            <div class="introduction-copy">
                <p class="lead">
                    I&rsquo;m {{ personal.name }}, a full-stack web and mobile developer
                    from {{ personal.location }}. I enjoy turning complicated ideas into
                    products that feel clear, useful, and dependable from the first tap
                    to the final result.
                </p>
                <p>
                    My work moves comfortably between interface design, application
                    logic, databases, testing, and deployment. That range helps me think
                    beyond individual features and shape complete experiences that work
                    well for both users and the teams maintaining them.
                </p>
            </div>

            <ul class="principles" aria-label="How I approach product development">
                <li v-for="principle in principles" :key="principle.title">
                    <component :is="principle.icon" :size="21" aria-hidden="true" />
                    <div>
                        <h3>{{ principle.title }}</h3>
                        <p>{{ principle.description }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
.introduction {
    padding-block: clamp(4.5rem, 10vw, 8rem);
    background-image:
        linear-gradient(115deg, rgb(245 166 35 / 0.07), transparent 34%),
        linear-gradient(rgb(237 233 226 / 0.025) 1px, transparent 1px);
    background-size: auto, 100% 4rem;
}

.section-inner {
    width: min(100%, 82rem);
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 7vw, 6rem);
}

.introduction-grid {
    display: grid;
    gap: clamp(2rem, 5vw, 4.5rem);
}

.section-kicker {
    margin: 0 0 1rem;
    color: var(--signal);
    font-family: var(--font-mono);
    font-size: 0.76rem;
    letter-spacing: 0.08em;
}

h2 {
    max-width: 14ch;
    margin: 0;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: var(--section-heading-size);
    font-weight: 650;
    letter-spacing: -0.055em;
    line-height: 0.98;
    text-wrap: balance;
}

.introduction-copy {
    max-width: 43rem;
}

.introduction-copy p {
    margin: 0;
    color: var(--muted);
    font-size: clamp(0.95rem, 1.3vw, 1.06rem);
    line-height: 1.8;
}

.introduction-copy .lead {
    margin-bottom: 1.15rem;
    color: color-mix(in srgb, var(--paper) 90%, transparent);
    font-size: clamp(1.08rem, 1.8vw, 1.35rem);
    line-height: 1.65;
}

.principles {
    display: grid;
    gap: clamp(1.5rem, 3vw, 3rem);
    margin: 0;
    padding: 0;
    list-style: none;
}

.principles li {
    position: relative;
    display: grid;
    grid-template-columns: 2.75rem minmax(0, 1fr);
    gap: 0.85rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--line);
}

.principles li::before {
    position: absolute;
    top: -1px;
    left: 0;
    width: 2.75rem;
    height: 2px;
    background: var(--signal);
    content: '';
}

.principles svg {
    box-sizing: content-box;
    width: 1.15rem;
    height: 1.15rem;
    padding: 0.58rem;
    border: 1px solid rgb(245 166 35 / 0.35);
    border-radius: 50%;
    background: rgb(245 166 35 / 0.06);
    color: var(--signal);
}

.principles h3 {
    margin: 0;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: 1rem;
}

.principles p {
    max-width: 34rem;
    margin: 0.4rem 0 0;
    color: var(--muted);
    font-size: 0.88rem;
    line-height: 1.6;
}

@media (min-width: 820px) {
    .introduction-grid {
        grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
        align-items: start;
    }

    .principles {
        grid-column: 1 / -1;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        margin-top: clamp(0.5rem, 1.5vw, 1.25rem);
        border-top: 1px solid var(--line);
    }

    .principles li {
        border-top: 0;
    }
}
</style>
