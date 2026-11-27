<script setup lang="ts">
import { onMounted } from 'vue';

const purposePoints = [
    {
        title: 'My goal',
        copy: 'Create products that earn trust through thoughtful details, reliable performance, and a high standard of execution.',
    },
    {
        title: 'My mission',
        copy: 'Turn real problems into convenient digital experiences that remove friction and help people move forward.',
    },
    {
        title: 'My vision',
        copy: 'A future where useful technology is not complicated or exclusive, but accessible to the people who need it.',
    },
];

onMounted(() => {
    console.info('[PurposeSection] Goal, mission, and vision are ready.');
});
</script>

<template>
    <section id="purpose" class="stage-section purpose" aria-labelledby="purpose-title">
        <div class="section-inner">
            <h2 id="purpose-title">
                I build with excellence, convenience, and accessibility in mind
            </h2>
            <p class="purpose-statement">
                I want every product I develop to solve a genuine problem and leave
                users with less effort, more confidence, and a clear path forward.
            </p>

            <div class="purpose-points">
                <article v-for="point in purposePoints" :key="point.title">
                    <h3>{{ point.title }}</h3>
                    <p>{{ point.copy }}</p>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.purpose {
    padding-block: clamp(5rem, 11vw, 9rem);
    background:
        radial-gradient(circle at 88% 20%, rgb(245 166 35 / 0.13), transparent 27%),
        var(--panel);
}

.section-inner {
    width: min(100%, 82rem);
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 7vw, 6rem);
}

.section-kicker {
    margin: 0 0 1.25rem;
    color: var(--signal);
    font-family: var(--font-mono);
    font-size: 0.76rem;
    letter-spacing: 0.08em;
}

h2 {
    max-width: 18ch;
    margin: 0;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 6.5vw, 6rem);
    font-weight: 650;
    letter-spacing: -0.065em;
    line-height: 0.93;
    text-wrap: balance;
}

.purpose-statement {
    max-width: 49rem;
    margin: clamp(1.5rem, 4vw, 2.75rem) 0 0 auto;
    color: var(--depth);
    font-size: clamp(1.05rem, 2vw, 1.4rem);
    line-height: 1.6;
}

.purpose-points {
    display: grid;
    margin-top: clamp(3rem, 7vw, 5.5rem);
    border-top: 1px solid rgb(237 233 226 / 0.18);
}

.purpose-points article {
    padding-block: 1.65rem;
    border-bottom: 1px solid rgb(237 233 226 / 0.18);
}

.purpose-points h3 {
    margin: 0;
    color: var(--signal);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 500;
}

.purpose-points p {
    margin: 0.7rem 0 0;
    color: var(--muted);
    font-size: 0.94rem;
    line-height: 1.7;
}

@media (min-width: 760px) {
    .purpose-points {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .purpose-points article {
        padding: 1.8rem clamp(1.25rem, 3vw, 2.25rem) 0;
        border-right: 1px solid rgb(237 233 226 / 0.18);
        border-bottom: 0;
    }

    .purpose-points article:first-child {
        padding-left: 0;
    }

    .purpose-points article:last-child {
        padding-right: 0;
        border-right: 0;
    }
}
</style>
