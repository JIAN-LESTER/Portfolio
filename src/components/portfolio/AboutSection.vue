<script setup lang="ts">
import { useSectionSlide } from '@/composables/useScrollStage';
import type { PersonalInfo } from '@/types/portfolio';

defineProps<{ personal: PersonalInfo }>();

const { isActiveSection } = useSectionSlide('about');

function handlePortraitLoad() {
    console.info('[AboutSection] Profile image loaded successfully.');
}

function handlePortraitError() {
    console.error('[AboutSection] Profile image could not be loaded.');
}
</script>

<template>
    <section
        id="about"
        class="stage-section group flex items-center bg-[radial-gradient(circle_at_22%_52%,rgb(245_166_35_/_0.08),transparent_27%),rgb(11_14_18_/_0.35)] max-[780px]:items-stretch max-[780px]:overflow-y-auto"
        :class="{ 'is-active': isActiveSection }"
    >
        <div
            class="mx-auto grid max-h-full w-[min(100%,82rem)] grid-cols-[minmax(17rem,0.82fr)_minmax(0,1.18fr)] items-center gap-[clamp(3rem,8vw,7.5rem)] overflow-hidden px-[clamp(1.25rem,7vw,6rem)] pt-[clamp(5.5rem,10vh,7rem)] pb-12 overscroll-contain max-[780px]:min-h-full max-[780px]:max-h-none max-[780px]:grid-cols-1 max-[780px]:gap-[2.2rem] max-[780px]:overflow-visible max-[780px]:px-[clamp(1.2rem,6vw,2.25rem)] max-[780px]:pt-[5.5rem] max-[780px]:pb-10 max-[480px]:gap-[1.8rem] max-[480px]:pt-20"
            data-stage-scroll
        >
            <figure
                v-if="personal.image"
                class="order-1 mx-auto w-[min(100%,27rem)] -translate-x-5 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.75,0.25,1)] group-[.is-active]:translate-x-0 group-[.is-active]:opacity-100 group-[.is-active]:delay-[80ms] motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none max-[780px]:w-[min(66vw,19rem)] max-[480px]:w-[min(62vw,15.5rem)]"
            >
                <div
                    class="relative isolate grid aspect-square items-end justify-items-center rounded-full bg-[var(--signal)] before:absolute before:inset-[7%] before:-z-10 before:rounded-[inherit] before:border before:border-[rgb(11_14_18_/_0.2)] before:content-[''] after:absolute after:right-[-8%] after:bottom-[11%] after:z-20 after:aspect-square after:w-[31%] after:rounded-full after:border after:border-[rgb(237_233_226_/_0.18)] after:bg-[rgb(21_26_33_/_0.88)] after:shadow-[0_1rem_2.5rem_rgb(0_0_0_/_0.28)] after:content-[''] max-[480px]:after:right-[-5%]"
                >
                    <span
                        class="absolute -inset-[4%] -z-20 -rotate-12 rounded-full border border-dashed border-[rgb(245_166_35_/_0.26)]"
                        aria-hidden="true"
                    ></span>
                    <img
                        class="block h-[112%] w-[112%] rounded-b-[50%] object-contain object-bottom drop-shadow-[0_1.4rem_1.5rem_rgb(0_0_0_/_0.24)]"
                        :src="personal.image"
                        :alt="`Portrait of ${personal.name}`"
                        @load="handlePortraitLoad"
                        @error="handlePortraitError"
                    />
                </div>
                <figcaption
                    class="relative z-30 mx-auto -mt-[1.4rem] w-max max-w-[85%] rounded-full border border-[rgb(237_233_226_/_0.14)] bg-[var(--panel)] px-[1.05rem] py-[0.7rem] text-center font-[var(--font-mono)] text-[clamp(0.62rem,1vw,0.75rem)] text-[var(--paper)]"
                >
                    {{ personal.role }}
                </figcaption>
            </figure>

            <div
                class="order-2 max-w-[43rem] translate-y-4 opacity-0 transition-[opacity,transform] duration-[680ms] ease-out group-[.is-active]:translate-y-0 group-[.is-active]:opacity-100 group-[.is-active]:delay-200 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none max-[780px]:mx-auto max-[780px]:max-w-[38rem]"
            >
                <p
                    class="mb-[0.7rem] flex items-center gap-[0.65rem] font-[var(--font-mono)] text-xs text-[var(--signal)] before:h-px before:w-6 before:bg-current before:content-['']"
                >
                    About me
                </p>
                <h2
                    class="font-[var(--font-display)] text-[clamp(2.35rem,5vw,4.5rem)] leading-[0.98] font-bold tracking-[-0.06em] text-[var(--paper)] [text-wrap:balance] max-[780px]:text-[clamp(2.15rem,10vw,3.4rem)]"
                >
                    Who is {{ personal.name }}?
                </h2>
                <p
                    class="mt-[clamp(1.25rem,2.8vh,2rem)] max-w-[67ch] text-[clamp(0.92rem,1.25vw,1.04rem)] leading-[1.75] text-[var(--muted)] max-[480px]:text-[0.9rem] max-[480px]:leading-[1.65]"
                >
                    {{ personal.bio }}
                </p>

                <dl
                    class="mt-[clamp(1.4rem,3vh,2rem)] grid grid-cols-2 gap-6 border-t border-[var(--line)] pt-[1.3rem] max-[480px]:grid-cols-1 max-[480px]:gap-4"
                >
                    <div class="min-w-0">
                        <dt
                            class="mb-[0.35rem] font-[var(--font-mono)] text-[0.68rem] text-[var(--muted)]"
                        >
                            Based in
                        </dt>
                        <dd
                            class="m-0 text-[0.88rem] leading-[1.45] text-[var(--paper)]"
                        >
                            {{ personal.location }}
                        </dd>
                    </div>
                    <div v-if="personal.availability" class="min-w-0">
                        <dt
                            class="mb-[0.35rem] font-[var(--font-mono)] text-[0.68rem] text-[var(--muted)]"
                        >
                            Currently
                        </dt>
                        <dd
                            class="m-0 text-[0.88rem] leading-[1.45] text-[var(--signal)]"
                        >
                            {{ personal.availability }}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </section>
</template>
