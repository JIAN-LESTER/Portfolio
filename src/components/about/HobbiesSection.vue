<script setup lang="ts">
import { onMounted, ref } from 'vue';


type Hobby = {
    id: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    tags?: string[];
};

const hobbies: Hobby[] = [
    {
        id: 'video-games',
        title: 'Video games',
        description:
            'I enjoy the teamwork, strategy, and quick decision-making of competitive games.',
        image: '/images/hobbies/dota-2-steam.jpg',
        imageAlt: 'Dota 2 gameplay showing a competitive team fight',
        tags: ['Dota 2', 'MLBB', 'Valorant', 'Clash of Clans'],
    },
    {
        id: 'gym',
        title: 'Gym',
        description:
            'Training keeps me disciplined, consistent, and ready to keep improving one session at a time.',
        image: '/images/hobbies/gym.png',
        imageAlt: 'Athlete preparing to lift a barbell in a modern gym',
    },
    {
        id: 'swimming',
        title: 'Swimming',
        description:
            'Time in the water clears my head and gives me a full reset for both focus and energy.',
        image: '/images/hobbies/swimming.png',
        imageAlt: 'Swimmer moving through a lap pool at water level',
    },
    {
        id: 'badminton',
        title: 'Badminton',
        description:
            'Fast rallies bring together movement, quick reactions, and the fun of friendly competition.',
        image: '/images/hobbies/badminton.png',
        imageAlt: 'Badminton racket striking a shuttlecock during a rally',
    },
    {
        id: 'music',
        title: 'Music',
        description:
            'Music is the background to deep work, quiet thinking, and the slower moments between projects.',
        image: '/images/hobbies/music.png',
        imageAlt: 'Headphones resting on a dark desk in warm light',  
    },
];

const featuredHobby = ref<Hobby>(hobbies[0]);
const otherHobbies = ref<Hobby[]>(hobbies.slice(1));

const selectHobby = (index: number) => {
    const selectedHobby = otherHobbies.value[index];

    if (!selectedHobby) {
        console.error('[HobbiesSection] Unable to select hobby.', { index });

        return;
    }

    const previousFeaturedHobby = featuredHobby.value;
    featuredHobby.value = selectedHobby;
    otherHobbies.value.splice(index, 1, previousFeaturedHobby);

    console.info(`[HobbiesSection] Featured hobby changed to ${selectedHobby.title}.`);
};

const handleImageError = (event: Event, hobby: Hobby) => {
    const image = event.currentTarget as HTMLImageElement;
    image.hidden = true;
    console.error(`[HobbiesSection] Failed to load the image for ${hobby.title}.`);
};

onMounted(() => {
    console.info('[HobbiesSection] Interactive personal interests are ready.');
});
</script>

<template>
    <section id="hobbies" class="stage-section hobbies" aria-labelledby="hobbies-title">
        <div class="section-inner">
            <header class="section-heading">
                
                <h2 id="hobbies-title">My life outside programming</h2>
            </header>

            <div class="hobbies-layout">
                <article class="hobby-feature" aria-live="polite">
                    <Transition name="hobby-swap" mode="out-in">
                        <div :key="featuredHobby.id" class="feature-visual">
                            <img
                                :src="featuredHobby.image"
                                :alt="featuredHobby.imageAlt"
                                @error="handleImageError($event, featuredHobby)"
                            />
                            <div class="feature-shade" aria-hidden="true"></div>
                            <div class="feature-content">
                       
                             
                                <h3>{{ featuredHobby.title }}</h3>
                                <p class="feature-description">{{ featuredHobby.description }}</p>
                                <ul
                                    v-if="featuredHobby.tags?.length"
                                    :aria-label="`${featuredHobby.title} highlights`"
                                >
                                    <li v-for="tag in featuredHobby.tags" :key="tag">{{ tag }}</li>
                                </ul>
                            </div>
                        </div>
                    </Transition>
                </article>

                <ul class="hobby-list" aria-label="Choose another hobby">
                    <li v-for="(hobby, index) in otherHobbies" :key="hobby.id">
                        <button type="button" @click="selectHobby(index)">
                            <span class="hobby-thumbnail">
                                <img
                                    :src="hobby.image"
                                    :alt="hobby.imageAlt"
                                    @error="handleImageError($event, hobby)"
                                />
                            </span>
                            <span class="hobby-copy">
                                <span class="hobby-title">
                               
                                    <span>{{ hobby.title }}</span>
                                </span>
                                <span>{{ hobby.description }}</span>
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<style scoped>
.hobbies {
    padding-block: clamp(4.5rem, 10vw, 8rem);
    background:
        radial-gradient(circle at 15% 85%, rgb(245 166 35 / 0.11), transparent 25%),
        var(--ink);
}

.section-inner {
    width: min(100%, 82rem);
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 7vw, 6rem);
}

.section-kicker,
.feature-label {
    color: var(--signal);
    font-family: var(--font-mono);
    font-size: 0.74rem;
    letter-spacing: 0.08em;
}

.section-kicker {
    margin: 0 0 1rem;
}

.section-heading h2 {
    max-width: 17ch;
    margin: 0;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: clamp(2.25rem, 5vw, 4.5rem);
    font-weight: 650;
    letter-spacing: -0.055em;
    line-height: 0.98;
    text-wrap: balance;
}

.hobbies-layout {
    display: grid;
    gap: 1.5rem;
    margin-top: clamp(2.5rem, 6vw, 4.5rem);
}

.hobby-feature {
    min-width: 0;
    min-height: 29rem;
    overflow: hidden;
    border: 1px solid rgb(245 166 35 / 0.36);
    border-radius: 0.85rem;
    background: var(--panel);
    box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 0.24);
}

.feature-visual {
    position: relative;
    min-height: 29rem;
    isolation: isolate;
}

.feature-visual > img {
    position: absolute;
    inset: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.feature-shade {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
        linear-gradient(180deg, rgb(7 10 9 / 0.06) 12%, rgb(7 10 9 / 0.9) 72%),
        linear-gradient(90deg, rgb(7 10 9 / 0.62), transparent 75%);
}

.feature-content {
    display: flex;
    min-height: 29rem;
    flex-direction: column;
    justify-content: end;
    padding: clamp(1.5rem, 4vw, 2.5rem);
}

.feature-icon {
    margin-bottom: 0.75rem;
    color: var(--signal);
}

.feature-label {
    margin: 0 0 0.65rem;
}

.feature-content h3 {
    margin: 0;
    color: var(--overlay-paper);
    font-family: var(--font-display);
    font-size: clamp(2.25rem, 5vw, 3.75rem);
    letter-spacing: -0.045em;
    line-height: 1;
}

.feature-description {
    max-width: 38rem;
    margin: 0.9rem 0 0;
    color: var(--overlay-muted);
    line-height: 1.65;
}

.feature-content ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin: 1.25rem 0 0;
    padding: 0;
    list-style: none;
}

.feature-content li {
    padding: 0.45rem 0.75rem;
    border: 1px solid rgb(237 233 226 / 0.24);
    border-radius: 999px;
    background: rgb(7 10 9 / 0.48);
    color: var(--overlay-paper);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    backdrop-filter: blur(0.35rem);
}

.hobby-list {
    display: grid;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--line);
    list-style: none;
}

.hobby-list li {
    border-bottom: 1px solid var(--line);
}

.hobby-list button {
    display: grid;
    width: 100%;
    grid-template-columns: 5.25rem minmax(0, 1fr);
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 0.25rem;
    border: 0;
    border-radius: 0.65rem;
    background: transparent;
    color: inherit;
    text-align: left;
    cursor: pointer;
    transition: background-color 180ms ease, transform 180ms ease;
}

.hobby-list button:hover {
    background: color-mix(in srgb, var(--paper) 4.5%, transparent);
    transform: translateX(0.3rem);
}

.hobby-list button:focus-visible {
    outline: 2px solid var(--signal);
    outline-offset: 0.2rem;
}

.hobby-thumbnail {
    height: 4.5rem;
    overflow: hidden;
    border: 1px solid rgb(237 233 226 / 0.12);
    border-radius: 0.5rem;
    background: var(--panel);
}

.hobby-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hobby-copy,
.hobby-title {
    display: flex;
}

.hobby-copy {
    min-width: 0;
    flex-direction: column;
}

.hobby-title {
    align-items: center;
    gap: 0.6rem;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: 1.02rem;
    font-weight: 650;
}

.hobby-title svg {
    flex: 0 0 auto;
    color: var(--signal);
}

.hobby-copy > span:last-child {
    display: -webkit-box;
    margin-top: 0.35rem;
    overflow: hidden;
    color: var(--muted);
    font-size: 0.82rem;
    line-height: 1.45;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.hobby-swap-enter-active,
.hobby-swap-leave-active {
    transition: opacity 180ms ease, transform 180ms ease;
}

.hobby-swap-enter-from {
    opacity: 0;
    transform: scale(1.015);
}

.hobby-swap-leave-to {
    opacity: 0;
    transform: scale(0.99);
}

@media (min-width: 780px) {
    .hobbies-layout {
        grid-template-columns: minmax(0, 1.3fr) minmax(20rem, 0.7fr);
        align-items: stretch;
    }
}

@media (prefers-reduced-motion: reduce) {
    .hobby-list button,
    .hobby-swap-enter-active,
    .hobby-swap-leave-active {
        transition: none;
    }
}
</style>
