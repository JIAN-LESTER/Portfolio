<script setup lang="ts">
import { CalendarRange, Clock3, ImageOff } from 'lucide-vue-next';
import { computed, onMounted } from 'vue';
import type { ProjectItem } from '@/types/portfolio';

const props = defineProps<{
    projects: ProjectItem[];
}>();

const builtProjects = computed(() =>
    props.projects.filter((project) => project.status !== 'upcoming'),
);
const upcomingProjects = computed(() =>
    props.projects.filter((project) => project.status === 'upcoming'),
);

function isOngoing(project: ProjectItem) {
    return project.endDate.trim().toLowerCase() === 'present';
}

function reportImageError(project: ProjectItem) {
    console.error(
        `[AllProjectsSection] Preview image for "${project.title}" failed to load.`,
    );
}

onMounted(() => {
    if (!props.projects.length) {
        console.error('[AllProjectsSection] No projects are available to display.');
        return;
    }

    console.info(
        `[AllProjectsSection] Displayed ${builtProjects.value.length} built projects and ${upcomingProjects.value.length} upcoming projects.`,
    );
});
</script>

<template>
    <section
        id="projects"
        class="stage-section all-projects"
        aria-labelledby="built-projects-title"
    >
        <div class="projects-inner">
            <section class="project-group" aria-labelledby="built-projects-title">
                <header class="group-heading">
                    <div>
                        <h2 id="built-projects-title">My projects</h2>
                    </div>
              
                </header>

                <div class="project-list">
                    <section
                        v-for="(project, index) in builtProjects"
                        :key="project.title"
                        class="project-section"
                        :class="{ 'is-reversed': index % 2 !== 0 }"
                        :aria-labelledby="`project-title-${index}`"
                    >
                        <div class="project-preview">
                            <img
                                v-if="project.image"
                                :src="project.image"
                                :alt="project.imageAlt ?? `${project.title} preview`"
                                loading="lazy"
                                @error="reportImageError(project)"
                            />
                            <div v-else class="preview-fallback" aria-hidden="true">
                                <ImageOff :size="22" />
                            </div>
                        </div>

                        <div class="project-content">
                            <div class="project-identity">
                                <p class="project-tag">{{ project.tag }}</p>
                                <div class="project-title-line">
                                    <h3 :id="`project-title-${index}`">
                                        {{ project.title }}
                                    </h3>
                                    <span v-if="isOngoing(project)" class="status-badge">
                                        <Clock3 :size="13" aria-hidden="true" />
                                        Ongoing
                                    </span>
                                </div>
                                <div class="project-date">
                                    <CalendarRange :size="15" aria-hidden="true" />
                                    <span>{{ project.startDate }} - {{ project.endDate }}</span>
                                </div>
                            </div>

                            <div class="project-details">
                                <p class="project-summary">{{ project.summary }}</p>
                                <p>{{ project.description }}</p>
                                <div class="stack-block">
                                    <span>Technology stack</span>
                                    <ul
                                        class="stack-list"
                                        :aria-label="`${project.title} technology stack`"
                                    >
                                        <li
                                            v-for="technology in project.stack"
                                            :key="technology"
                                        >
                                            {{ technology }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            <section class="project-group upcoming-group" aria-labelledby="upcoming-projects-title">
                <header class="group-heading">
                    <div>
                        <h2 id="upcoming-projects-title">Coming soon</h2>
                    
                    </div>
                  
                </header>

                <div class="upcoming-list">
                    <section
                        v-for="(project, index) in upcomingProjects"
                        :key="project.title"
                        class="upcoming-project"
                        :aria-labelledby="`upcoming-title-${index}`"
                    >
                        <div class="upcoming-content">
                            <div>
                                <h3 :id="`upcoming-title-${index}`">
                                    {{ project.title }}
                                </h3>
                                <p class="upcoming-summary">{{ project.summary }}</p>
                            </div>
                            <div>
                                <p class="upcoming-description">{{ project.description }}</p>
                                <div class="planned-stack">
                                    <span>Planned stack</span>
                                    <ul :aria-label="`${project.title} planned technology stack`">
                                        <li
                                            v-for="technology in project.stack"
                                            :key="technology"
                                        >
                                            {{ technology }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    </section>
</template>

<style scoped>
.all-projects {
    background-image:
        linear-gradient(90deg, color-mix(in srgb, var(--paper) 2.5%, transparent) 1px, transparent 1px),
        radial-gradient(circle at 84% 18%, rgb(245 166 35 / 0.08), transparent 25%);
    background-size: 5rem 100%, auto;
}

.projects-inner {
    width: min(100%, 94rem);
    margin-inline: auto;
    padding: clamp(4rem, 8vw, 7rem) clamp(1rem, 5vw, 5rem);
}

.project-group + .project-group {
    margin-top: clamp(5rem, 10vw, 8rem);
}

.group-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: clamp(1.75rem, 4vw, 3rem);
}

.group-heading h2 {
    margin: 0;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: clamp(2.35rem, 5vw, 4.5rem);
    font-weight: 700;
    letter-spacing: -0.06em;
    line-height: 0.95;
}

.group-heading p {
    max-width: 39rem;
    margin: 0.9rem 0 0;
    color: var(--muted);
    font-size: 0.94rem;
    line-height: 1.65;
}

.project-count {
    flex: 0 0 auto;
    padding-bottom: 0.2rem;
    color: var(--depth);
    font-family: var(--font-mono);
    font-size: 0.7rem;
}

.project-list {
    border-top: 1px solid var(--line);
}

.project-section {
    position: relative;
    display: grid;
    min-height: clamp(31rem, 62vh, 42rem);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(2rem, 4.5vw, 4.5rem);
    align-items: center;
    padding-block: clamp(3rem, 6vw, 5.5rem);
    border-bottom: 1px solid var(--line);
    isolation: isolate;
}

.project-section::before {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
        linear-gradient(90deg, transparent, rgb(245 166 35 / 0.2) 18%, rgb(245 166 35 / 0.2) 82%, transparent) top / 100% 1px no-repeat,
        linear-gradient(90deg, transparent, rgb(245 166 35 / 0.2) 18%, rgb(245 166 35 / 0.2) 82%, transparent) bottom / 100% 1px no-repeat,
        radial-gradient(circle at 50% 50%, rgb(245 166 35 / 0.065), transparent 68%),
        linear-gradient(90deg, transparent, color-mix(in srgb, var(--paper) 1.8%, transparent) 28%, color-mix(in srgb, var(--paper) 1.8%, transparent) 72%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent);
    content: '';
    opacity: 0;
    transition: opacity 260ms ease;
}

.project-section:hover::before,
.project-section:focus-within::before {
    opacity: 1;
}

.project-section.is-reversed .project-preview {
    grid-column: 2;
}

.project-section.is-reversed .project-content {
    grid-row: 1;
    grid-column: 1;
}

.project-preview {
    aspect-ratio: 16 / 10;
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--paper) 12%, transparent);
    border-radius: 0.65rem;
    background: var(--panel-2);
}

.project-preview img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.78) brightness(0.82);
}

.preview-fallback {
    display: grid;
    height: 100%;
    place-items: center;
    color: var(--muted);
}

.project-content {
    display: flex;
    min-width: 0;
    flex-direction: column;
    justify-content: center;
}

.project-title-line {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.55rem;
}

.project-identity h3,
.upcoming-project h3 {
    margin: 0;
    color: var(--paper);
    font-family: var(--font-display);
    font-weight: 600;
    letter-spacing: -0.035em;
}

.project-identity h3 {
    max-width: 12ch;
    font-size: clamp(2.2rem, 4.6vw, 4.8rem);
    line-height: 0.96;
}

.project-tag {
    margin: 0 0 1rem;
    color: var(--signal);
    font-family: var(--font-mono);
    font-size: 0.63rem;
}

.project-date {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin-top: 1.25rem;
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 0.66rem;
}

.status-badge,
.coming-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 0.59rem;
}

.status-badge {
    padding: 0.3rem 0.48rem;
    background: rgb(245 166 35 / 0.14);
    color: var(--signal);
}

.project-details {
    max-width: 39rem;
    margin-top: clamp(2rem, 4vw, 3.5rem);
    padding-top: clamp(1.5rem, 3vw, 2.5rem);
    border-top: 1px solid color-mix(in srgb, var(--paper) 13%, transparent);
}

.project-details > p {
    margin: 0;
    color: var(--muted);
    font-size: clamp(0.9rem, 1.25vw, 1rem);
    line-height: 1.75;
}

.project-details > .project-summary {
    margin-bottom: 0.9rem;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: clamp(1.05rem, 1.7vw, 1.35rem);
    font-weight: 500;
    line-height: 1.45;
}

.stack-block {
    margin-top: 1.8rem;
}

.stack-block > span,
.planned-stack > span {
    display: block;
    margin-bottom: 0.7rem;
    color: var(--muted);
    font-size: 0.72rem;
}

.stack-list,
.planned-stack ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
    list-style: none;
}

.stack-list {
    margin-top: 1rem;
}

.stack-list li,
.planned-stack li {
    padding: 0.3rem 0.5rem;
    border: 1px solid color-mix(in srgb, var(--paper) 13%, transparent);
    border-radius: 999px;
    color: var(--depth);
    font-family: var(--font-mono);
    font-size: 0.58rem;
}

.upcoming-list {
    border-top: 1px solid var(--line);
}

.upcoming-project {
    min-height: clamp(24rem, 42vw, 34rem);
    padding: clamp(2.5rem, 5vw, 4.5rem) clamp(1rem, 2vw, 2rem);
    border-bottom: 1px solid var(--line);
}

.upcoming-topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 0.62rem;
}

.coming-badge {
    padding: 0.33rem 0.55rem;
    border: 1px solid rgb(245 166 35 / 0.35);
    color: var(--signal);
}

.upcoming-project h3 {
    max-width: 12ch;
    font-size: clamp(2.2rem, 4.7vw, 4.7rem);
    line-height: 0.96;
}

.upcoming-content {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(18rem, 1.05fr);
    gap: clamp(2rem, 7vw, 7rem);
    align-items: start;
    margin-top: clamp(3.5rem, 7vw, 6rem);
}

.upcoming-summary {
    max-width: 32rem;
    margin: 1.25rem 0 0;
    color: var(--depth);
    font-family: var(--font-display);
    font-size: clamp(1rem, 1.7vw, 1.25rem);
    line-height: 1.55;
}

.upcoming-description {
    max-width: 42rem;
    margin: 0;
    color: var(--muted);
    font-size: clamp(0.9rem, 1.25vw, 1rem);
    line-height: 1.75;
}

.planned-stack {
    margin-top: 2rem;
}

@media (max-width: 980px) {
    .project-section {
        min-height: 29rem;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 2rem;
    }
}

@media (max-width: 760px) {
    .group-heading {
        align-items: start;
        flex-direction: column;
        gap: 0.8rem;
    }

    .project-section {
        min-height: 0;
        grid-template-columns: 1fr;
        gap: 2rem;
        padding-block: 3.5rem;
    }

    .project-section.is-reversed .project-preview,
    .project-section.is-reversed .project-content {
        grid-row: auto;
        grid-column: 1;
    }

    .project-preview {
        width: 100%;
    }

    .project-content {
        padding-inline: 0.35rem;
    }

    .upcoming-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        margin-top: 3rem;
    }

    .upcoming-project {
        min-height: 0;
    }
}

@media (max-width: 420px) {
    .projects-inner {
        padding-inline: 0.9rem;
    }

}

@media (prefers-reduced-motion: reduce) {
    .project-section::before {
        transition: none;
    }
}
</style>
