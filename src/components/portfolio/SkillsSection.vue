<script setup lang="ts">
import {
    Blocks,
    Brain,
    Braces,
    Check,
    Cloud,
    Code,
    Coffee,
    Container,
    Database,
    FileCode,
    Flame,
    FolderOpen,
    Github,
    GitBranch,
    LayoutTemplate,
    Layers,
    MessageSquareText,
    Network,
    Palette,
    ScanSearch,
    Search,
    Send,
    Smartphone,
    Sparkles,
    SquareTerminal,
    Table2,
    Triangle,
    Wind,
} from 'lucide-vue-next';
import * as si from 'simple-icons/icons';
import { computed  } from 'vue';
import type {Component} from 'vue';
import { useSectionSlide } from '@/composables/useScrollStage';
import type { SkillGroup, SkillItem } from '@/types/portfolio';

const props = defineProps<{ skills: SkillGroup[] }>();
const { isActiveSection } = useSectionSlide('skills');

const brandMap: Record<string, { path: string; hex: string }> = {
    androidstudio: si.siAndroidstudio,
    androidxml: si.siAndroid,
    claude: si.siClaude,
    css: si.siCss,
    dart: si.siDart,
    docker: si.siDocker,
    fastapi: si.siFastapi,
    figma: si.siFigma,
    firebase: si.siFirebase,
    firebasecloudfunctions: si.siFirebase,
    firebasefirestore: si.siFirebase,
    flutter: si.siFlutter,
    gemini: si.siGooglegemini,
    git: si.siGit,
    github: si.siGithub,
    githubactionscicd: si.siGithubactions,
    html: si.siHtml5,
    java: si.siOpenjdk,
    javascript: si.siJavascript,
    jira: si.siJira,
    laravel: si.siLaravel,
    maven: si.siApachemaven,
    mysql: si.siMysql,
    nestjs: si.siNestjs,
    nextjs: si.siNextdotjs,
    nodejs: si.siNodedotjs,
    php: si.siPhp,
    pinecone: si.siPinecone,
    postman: si.siPostman,
    postgresql: si.siPostgresql,
    powershell: si.siPowershell,
    prisma: si.siPrisma,
    python: si.siPython,
    react: si.siReact,
    render: si.siRender,
    springboot: si.siSpringboot,
    tailwindcss: si.siTailwindcss,
    typescript: si.siTypescript,
    vercel: si.siVercel,
    visualbasicnet: si.siDotnet,
    visualstudiocode: si.siVisualstudiocode,
};

function brandKey(value: string) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function getBrand(item: SkillItem) {
    return brandMap[brandKey(item.name)];
}

const iconMap: Record<string, Component> = {
    api: Network,
    blocks: Blocks,
    brain: Brain,
    braces: Braces,
    check: Check,
    cloud: Cloud,
    coffee: Coffee,
    container: Container,
    dart: Code,
    database: Database,
    'file-type': SquareTerminal,
    flame: Flame,
    'folder-open': FolderOpen,
    'git-branch': GitBranch,
    github: Github,
    javascript: Braces,
    laravel: Braces,
    layers: Layers,
    'layout-template': LayoutTemplate,
    'message-square-text': MessageSquareText,
    network: Network,
    nextjs: Triangle,
    palette: Palette,
    'pen-tool': FileCode,
    php: FileCode,
    python: Code,
    react: Code,
    'scan-search': ScanSearch,
    search: Search,
    send: Send,
    smartphone: Smartphone,
    sparkles: Sparkles,
    'table-2': Table2,
    triangle: Triangle,
    typescript: SquareTerminal,
    wind: Wind,
};

function getIcon(item: SkillItem): Component {
    return item.logo ? (iconMap[item.logo] ?? Code) : Code;
}

function animationDuration(itemCount: number) {
    return `${Math.max(20, itemCount * 3.4)}s`;
}

const visibleGroups = computed(() =>
    props.skills.filter((group) => group.items.length > 0),
);

if (visibleGroups.value.length === 0) {
    console.error('[SkillsSection] No technology stack or platform icons are available.');
} else {
    console.info(
        `[SkillsSection] Displaying ${visibleGroups.value.length} skill groups.`,
    );
}
</script>

<template>
    <section
        id="skills"
        class="stage-section skills"
        :class="{ 'is-active': isActiveSection }"
    >
        <div class="section-inner" data-stage-scroll>
            <header class="section-heading">
                <h2>Technology stack &amp; platforms</h2>
            </header>

            <div class="skill-groups">
                <section
                    v-for="(group, groupIndex) in visibleGroups"
                    :key="group.title"
                    class="skill-group"
                    :class="{ 'is-reversed': groupIndex % 2 === 1 }"
                    :aria-labelledby="`skill-group-${brandKey(group.title)}`"
                >
                    <h3 :id="`skill-group-${brandKey(group.title)}`">
                        {{ group.title }}
                    </h3>

                    <div class="skill-viewport">
                        <div
                            class="skill-track"
                            :style="{ '--flow-duration': animationDuration(group.items.length) }"
                        >
                            <ul
                                v-for="copyIndex in 2"
                                :key="copyIndex"
                                class="skill-list"
                                :aria-hidden="copyIndex === 2"
                            >
                                <li
                                    v-for="item in group.items"
                                    :key="`${copyIndex}-${item.name}`"
                                    class="skill-item"
                                >
                                    <svg
                                        v-if="getBrand(item)"
                                        viewBox="0 0 24 24"
                                        class="skill-icon"
                                        :style="{
                                            '--brand-color': `#${getBrand(item)!.hex}`,
                                        }"
                                        aria-hidden="true"
                                    >
                                        <path :d="getBrand(item)!.path" />
                                    </svg>
                                    <component
                                        :is="getIcon(item)"
                                        v-else
                                        class="skill-icon skill-icon--generic"
                                        aria-hidden="true"
                                    />
                                    <span>{{ item.name }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </section>
</template>

<style scoped>
.skills {
    display: flex;
    align-items: center;
    min-height: 100svh;
}

.section-inner {
    width: 100%;
    max-width: 1500px;
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 7vw, 7.5rem);
}

.section-heading {
    padding-bottom: clamp(1.1rem, 2.5vh, 1.75rem);
    border-bottom: 1px solid var(--line);
}

.section-label {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin: 0 0 0.65rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--depth);
}

.section-label span {
    width: 0.45rem;
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--signal);
    box-shadow: 0 0 0 0.35rem rgb(245 166 35 / 0.1);
}

h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(2.3rem, 4.3vw, 4.5rem);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.055em;
    color: var(--paper);
    white-space: nowrap;
}

h2 span {
    color: var(--depth);
}

.skill-groups {
    display: grid;
}

.skill-group {
    display: grid;
    grid-template-columns: minmax(10rem, 0.42fr) minmax(20rem, 1fr);
    gap: clamp(1.5rem, 5vw, 5rem);
    padding-block: clamp(1rem, 2.2vh, 1.5rem);
    border-bottom: 1px solid var(--line);
}

h3 {
    margin: 0.6rem 0 0;
    font-family: var(--font-display);
    font-size: clamp(1.05rem, 1.5vw, 1.35rem);
    font-weight: 500;
    line-height: 1.2;
    color: var(--paper);
}

.skill-viewport {
    min-width: 0;
    overflow: hidden;
    mask-image: linear-gradient(
        90deg,
        transparent,
        black 5%,
        black 95%,
        transparent
    );
}

.skill-track {
    display: flex;
    width: max-content;
    animation: flow-left var(--flow-duration, 32s) linear infinite;
    will-change: transform;
}

.skill-group.is-reversed .skill-track {
    animation-name: flow-right;
}

.skill-viewport:hover .skill-track {
    animation-play-state: paused;
}

.skill-list {
    display: flex;
    flex: none;
    gap: 0.55rem;
    margin: 0;
    padding: 0 0.55rem 0 0;
    list-style: none;
}

.skill-item {
    display: flex;
    width: clamp(6.1rem, 7.5vw, 7.25rem);
    min-height: 4.8rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.55rem 0.35rem;
    border: 1px solid rgb(237 233 226 / 0.1);
    border-radius: 0.65rem;
    background: rgb(237 233 226 / 0.035);
    transition: border-color 180ms ease, background-color 180ms ease,
        transform 180ms ease;
}

.skill-item:hover {
    border-color: rgb(245 166 35 / 0.5);
    background: rgb(237 233 226 / 0.07);
    transform: translateY(-2px);
}

.skill-icon {
    width: 1.5rem;
    height: 1.5rem;
    flex: 0 0 auto;
    fill: var(--brand-color, var(--paper));
}

.skill-icon--generic {
    fill: none;
    color: var(--signal);
    stroke-width: 1.7;
}

.skill-item span {
    max-width: 100%;
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 500;
    line-height: 1.25;
    color: var(--paper);
    text-align: center;
    overflow-wrap: anywhere;
}

@keyframes flow-left {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-50%);
    }
}

@keyframes flow-right {
    from {
        transform: translateX(-50%);
    }

    to {
        transform: translateX(0);
    }
}

@media (max-width: 780px) {
    .skills {
        align-items: stretch;
    }

    .section-inner {
        padding: 6.5rem 1.25rem 3rem;
    }

    .section-heading,
    .skill-group {
        grid-template-columns: 1fr;
        gap: 0.8rem;
    }

    .section-heading {
        align-items: start;
    }

    .section-label {
        margin-bottom: 0;
    }

    h2 {
        font-size: clamp(1.35rem, 6vw, 2.4rem);
    }

    h3 {
        margin-top: 0;
    }
}

@media (max-width: 520px) {
    .skill-viewport {
        margin-inline: -1.25rem;
        mask-image: linear-gradient(
            90deg,
            transparent,
            black 7%,
            black 93%,
            transparent
        );
    }

    .skill-list {
        gap: 0.55rem;
        padding-right: 0.55rem;
    }

    .skill-item {
        width: 5.8rem;
        min-height: 4.6rem;
        padding-inline: 0.25rem;
    }

    .skill-icon {
        width: 1.4rem;
        height: 1.4rem;
    }

    .skill-item span {
        font-size: 0.56rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .skill-viewport {
        overflow: visible;
        mask-image: none;
    }

    .skill-track,
    .skill-item {
        animation: none;
        transition: none;
        transform: none;
    }

    .skill-track {
        width: 100%;
    }

    .skill-list {
        width: 100%;
        flex-wrap: wrap;
        padding-right: 0;
    }

    .skill-list[aria-hidden='true'] {
        display: none;
    }
}
</style>
