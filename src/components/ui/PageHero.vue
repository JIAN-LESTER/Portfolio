
<script setup lang="ts">
import {
    ArrowDown,
    ArrowUpRight,
    UserRound,
    Code2,
    Layers3,
    Sparkles,
} from 'lucide-vue-next';
import { computed } from 'vue';

type HeroVariant = 'about' | 'projects' | 'services';

const props = defineProps<{
    variant: HeroVariant;
}>();

const heroContent = {
    about: {
        index: '01',
        label: 'About me',
        eyebrow: 'Behind the code',
        title: 'More than just',
        highlight: 'a developer.',
        description:
            'A passionate software developer driven by curiosity, technology, and the pursuit of meaningful digital solutions.',
        icon: UserRound,
        tags: [
            'Software Development',
            'Problem Solving',
            'Continuous Learning',
        ],
        primaryAction: {
            label: 'Explore my journey',
            href: '#about-content',
            external: false,
        },
        secondaryAction: {
            label: 'View my works',
            href: '/projects',
        },
    },
    projects: {
        index: '02',
        label: 'Selected works',
        eyebrow: 'From ideas to execution',
        title: 'Built with purpose.',
        highlight: 'Made to work.',
        description:
            'Explore a collection of projects that reflect my passion for building functional, scalable, and meaningful digital experiences.',
        icon: Code2,
        tags: [
            'Web Applications',
            'Mobile Applications',
            'AI Integration',
            'Full-stack',
        ],
        primaryAction: {
            label: 'Explore projects',
            href: '#projects-content',
            external: false,
        },
        secondaryAction: {
            label: 'View services',
            href: '/services',
        },
    },
    services: {
        index: '03',
        label: 'What I do',
        eyebrow: "Let's build something",
        title: 'Your vision.',
        highlight: 'My expertise.',
        description:
            'Transforming your ideas into modern, reliable, and scalable digital solutions tailored to your business needs.',
        icon: Layers3,
        tags: [
            'Web Development',
            'Mobile Development',
            'SaaS',
            'UI/UX Design',
        ],
        primaryAction: {
            label: 'Start a project',
            href: '/#contact',
            external: true,
        },
        secondaryAction: {
            label: 'Explore services',
            href: '#services-content',
        },
    },
};

const content = computed(() => heroContent[props.variant]);
</script>

<template>
    <section
        :id="`${variant}-hero`"
        class="relative isolate flex min-h-[78svh]
               items-center justify-center overflow-hidden
               border-b border-[var(--paper)]/10
               bg-[#0b0d0d] px-5 pb-20 pt-32
               text-[var(--paper)] sm:px-8 lg:px-16"
    >
        <!-- Decorative background -->
        <div
            class="pointer-events-none absolute inset-0 -z-10
                   overflow-hidden"
            aria-hidden="true"
        >
            <!-- Radial glow -->
            <div
                class="absolute left-1/2 top-1/2
                       h-[36rem] w-[36rem]
                       -translate-x-1/2 -translate-y-1/2
                       rounded-full bg-[#f5a623]/[0.06]
                       blur-[120px]"
            />

            <!-- About: orbital design -->
            <template v-if="variant === 'about'">
                <div
                    class="absolute left-1/2 top-1/2
                           aspect-square w-[32rem]
                           -translate-x-1/2 -translate-y-1/2
                           rounded-full border border-white/[0.06]
                           sm:w-[44rem]"
                />
                <div
                    class="absolute left-1/2 top-1/2
                           aspect-square w-[25rem]
                           -translate-x-1/2 -translate-y-1/2
                           rounded-full border border-white/[0.08]
                           sm:w-[35rem]"
                />
                <div
                    class="absolute right-[15%] top-[25%]
                           size-24 rounded-full border
                           border-dashed border-[var(--signal)]/40"
                />
                <div
                    class="absolute right-[21%] top-[23%]
                           size-3 rounded-full
                           bg-[var(--signal)]
                           shadow-[0_0_0_8px_#f5a62315]"
                />
            </template>

            <!-- Projects: technical grid -->
            <div
                v-else-if="variant === 'projects'"
                class="project-grid absolute inset-0 opacity-60"
            />

            <!-- Services: intersecting orbits -->
            <template v-else>
                <div
                    class="absolute -left-48 top-1/2
                           size-[32rem] -translate-y-1/2
                           rounded-full border border-white/[0.08]"
                />
                <div
                    class="absolute -left-32 top-1/2
                           size-[24rem] -translate-y-1/2
                           rounded-full border border-white/[0.06]"
                />
                <div
                    class="absolute -right-48 top-1/2
                           size-[32rem] -translate-y-1/2
                           rounded-full border border-white/[0.08]"
                />
                <div
                    class="absolute -right-32 top-1/2
                           size-[24rem] -translate-y-1/2
                           rounded-full border border-dashed
                           border-[var(--signal)]/20"
                />
            </template>
        </div>

        <!-- Page indicator -->
        <div
            class="absolute left-5 top-24 flex items-center
                   gap-3 sm:left-8 lg:left-16"
        >
            <span
                class="font-[family-name:var(--font-mono)]
                       text-xs text-[var(--signal)]"
            >
                {{ content.index }}
            </span>

            <span class="h-px w-8 bg-white/20" />

            <span
                class="font-[family-name:var(--font-mono)]
                       text-xs uppercase tracking-widest
                       text-[var(--paper)]/40"
            >
                {{ content.label }}
            </span>
        </div>

        <!-- Decorative page icon -->
        <div
            class="absolute right-16 top-24 hidden size-16
                   items-center justify-center rounded-full
                   border border-white/10 lg:flex"
            aria-hidden="true"
        >
            <component
                :is="content.icon"
                :size="24"
                :stroke-width="1.5"
                class="text-[var(--signal)]"
            />
        </div>

        <!-- Main content -->
        <div
            :key="variant"
            class="relative mx-auto flex w-full max-w-5xl
                   flex-col items-center text-center"
        >
            <!-- Eyebrow -->
            <div
                class="hero-reveal mb-6 flex items-center gap-2
                       font-[family-name:var(--font-mono)]
                       text-xs uppercase tracking-[0.15em]
                       text-[var(--signal)] sm:text-sm"
                style="--delay: 80ms"
            >
                <Sparkles :size="15" />
                {{ content.eyebrow }}
            </div>

            <!-- Heading -->
            <h1
                class="hero-reveal
                       font-[family-name:var(--font-display)]
                       text-[clamp(3rem,7vw,6.5rem)]
                       font-bold leading-[0.98]
                       tracking-[-0.07em]"
                style="--delay: 160ms"
            >
                {{ content.title }}

                <span class="mt-1 block text-[var(--signal)]">
                    {{ content.highlight }}
                </span>
            </h1>

            <!-- Description -->
            <p
                class="hero-reveal mt-7 max-w-xl
                       text-sm leading-relaxed
                       text-[var(--paper)]/60
                       sm:text-base lg:text-lg"
                style="--delay: 240ms"
            >
                {{ content.description }}
            </p>

            <!-- Tags -->
            <ul
                class="hero-reveal mt-7 flex flex-wrap
                       justify-center gap-2"
                style="--delay: 320ms"
            >
                <li
                    v-for="tag in content.tags"
                    :key="tag"
                    class="rounded-full border border-white/10
                           bg-[#111313]/80 px-4 py-2
                           font-[family-name:var(--font-mono)]
                           text-xs text-[var(--paper)]/65
                           transition-colors
                           hover:border-[var(--signal)]/50
                           hover:text-[var(--signal)]"
                >
                    {{ tag }}
                </li>
            </ul>

            <!-- Call to action -->
            <div
                class="hero-reveal mt-9 flex w-full
                       flex-col justify-center gap-3
                       sm:w-auto sm:flex-row"
                style="--delay: 400ms"
            >
                <a
                    :href="content.primaryAction.href"
                    class="group inline-flex min-h-12
                           items-center justify-center gap-3
                           rounded-full bg-[var(--signal)]
                           px-6 py-3
                           font-[family-name:var(--font-mono)]
                           text-sm font-medium text-[var(--ink)]
                           transition-transform hover:-translate-y-1"
                >
                    {{ content.primaryAction.label }}

                    <component
                        :is="content.primaryAction.external
                            ? ArrowUpRight
                            : ArrowDown"
                        :size="17"
                    />
                </a>

                <a
                    :href="content.secondaryAction.href"
                    class="inline-flex min-h-12 items-center
                           justify-center gap-3 rounded-full
                           border border-white/20
                           bg-[#0b0d0d]/80 px-6 py-3
                           font-[family-name:var(--font-mono)]
                           text-sm text-[var(--paper)]
                           transition-all hover:-translate-y-1
                           hover:border-[var(--signal)]"
                >
                    {{ content.secondaryAction.label }}
                </a>
            </div>
        </div>

        <!-- Bottom scroll indicator -->
        <a
            :href="`#${variant}-content`"
            aria-label="Scroll to page content"
            class="absolute bottom-6 left-1/2 flex
                   -translate-x-1/2 flex-col items-center gap-2
                   text-[var(--paper)]/35 transition-colors
                   hover:text-[var(--signal)]"
        >
            <span
                class="font-[family-name:var(--font-mono)]
                       text-[10px] uppercase tracking-[0.2em]"
            >
                Scroll to explore
            </span>

            <ArrowDown :size="15" class="scroll-indicator" />
        </a>

        <!-- Bottom accent -->
        <div
            class="absolute bottom-0 left-1/2 h-px w-1/2
                   -translate-x-1/2 bg-gradient-to-r
                   from-transparent via-[#f5a623]/40
                   to-transparent"
        />
    </section>
</template>

<style scoped>
.project-grid {
    background-image:
        linear-gradient(
            rgb(237 233 226 / 0.045) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgb(237 233 226 / 0.045) 1px,
            transparent 1px
        );
    background-size: 48px 48px;
    mask-image: radial-gradient(
        ellipse at center,
        black 15%,
        transparent 80%
    );
}

.hero-reveal {
    animation: reveal 650ms cubic-bezier(0.2, 0.75, 0.25, 1)
        var(--delay, 0ms) both;
}

.scroll-indicator {
    animation: scroll-bounce 2s ease-in-out infinite;
}

@keyframes reveal {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scroll-bounce {
    0%, 100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(5px);
    }
}

@media (prefers-reduced-motion: reduce) {
    .hero-reveal,
    .scroll-indicator {
        animation: none;
    }
}
</style>
