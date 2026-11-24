<script setup lang="ts">
import { computed } from 'vue';
import {
    ArrowUpRight,
    Facebook,
    Github,
    Linkedin,
    Mail,
} from 'lucide-vue-next';
import { useScrollStage, useSectionSlide } from '@/composables/useScrollStage';
import { siteNavigation } from '@/data/navigation';
import type { PersonalInfo } from '@/types/portfolio';

const props = defineProps<{ personal: PersonalInfo }>();

const stage = useScrollStage();
const { isActiveSection } = useSectionSlide('footer');
const currentYear = new Date().getFullYear();

const socialLinks = computed(() =>
    [
        { label: 'GitHub', href: props.personal.github, icon: Github },
        { label: 'LinkedIn', href: props.personal.linkedin, icon: Linkedin },
        { label: 'Facebook', href: props.personal.facebook, icon: Facebook },
    ].filter((link) => Boolean(link.href)),
);

function goToTop() {
    if (stage.state.sections.length === 0) {
        console.error('[Footer] No page section was found.');
        return;
    }

    stage.goToSection(0);
    console.info('[Footer] Returned to the top of the current page.');
}
</script>

<template>
    <footer
        id="footer"
        class="stage-section site-footer"
        :class="{ 'is-active': isActiveSection }"
    >
        <div class="footer-inner" data-stage-scroll>
            <div class="footer-lead">
                <div>
                    <p class="footer-kicker">Have a project in mind?</p>
                    <h2>Let&rsquo;s turn the idea into working software.</h2>
                </div>
                <a class="email-link" :href="`mailto:${personal.email}`">
                    <Mail :size="20" aria-hidden="true" />
                    <span>{{ personal.email }}</span>
                    <ArrowUpRight :size="19" aria-hidden="true" />
                </a>
            </div>

            <div class="footer-directory">
                <div class="footer-column contact-column">
                    <h3>My contact</h3>
                    <a :href="`mailto:${personal.email}`">{{ personal.email }}</a>
                    <a
                        v-if="personal.phone"
                        :href="`tel:${personal.phone.replace(/\s/g, '')}`"
                    >
                        {{ personal.phone }}
                    </a>
                    <p>{{ personal.location }}</p>
                </div>

                <div class="footer-column">
                    <h3>Navigation</h3>
                    <a
                        v-for="item in siteNavigation"
                        :key="item.path"
                        :href="item.path"
                    >
                        {{ item.label }}
                    </a>
                </div>

                <div class="footer-column">
                    <h3>Social media</h3>
                    <a
                        v-for="link in socialLinks"
                        :key="link.label"
                        :href="link.href"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <component :is="link.icon" :size="16" aria-hidden="true" />
                        <span>{{ link.label }}</span>
                    </a>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; {{ currentYear }} {{ personal.name }}. All rights reserved.</p>
                <button type="button" @click="goToTop">Back to top</button>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.site-footer {
    display: flex;
    align-items: center;
    background:
        linear-gradient(135deg, rgb(108 123 255 / 0.08), transparent 42%),
        var(--ink);
}

.footer-inner {
    width: min(100%, 1300px);
    max-height: 100%;
    margin-inline: auto;
    padding: clamp(6rem, 11vh, 8rem) clamp(1.25rem, 8vw, 7rem) 2rem;
    overflow-y: auto;
    overscroll-behavior: contain;
}

.footer-lead {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 2rem;
    padding-bottom: clamp(2rem, 5vh, 3.5rem);
    border-bottom: 1px solid var(--line);
}

.footer-kicker,
.footer-column h3 {
    color: var(--signal);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.08em;
}

.footer-lead h2 {
    max-width: 16ch;
    margin-top: 0.85rem;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 4.25rem);
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 1;
}

.email-link {
    display: inline-flex;
    max-width: 100%;
    align-items: center;
    gap: 0.65rem;
    padding: 0.85rem 1rem;
    border: 1px solid var(--signal-dim);
    border-radius: 0.65rem;
    color: var(--paper);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    text-decoration: none;
    transition:
        border-color 180ms ease,
        background-color 180ms ease,
        transform 180ms ease;
}

.email-link:hover {
    border-color: var(--signal);
    background: rgb(245 166 35 / 0.08);
    transform: translateY(-2px);
}

.footer-directory {
    display: grid;
    grid-template-columns: minmax(14rem, 1.5fr) 1fr 1fr;
    gap: clamp(2rem, 7vw, 6rem);
    padding-block: clamp(2rem, 5vh, 3.25rem);
}

.footer-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.7rem;
}

.footer-column h3 {
    margin-bottom: 0.45rem;
}

.footer-column a,
.footer-column p {
    color: var(--muted);
    font-size: 0.88rem;
    line-height: 1.5;
    text-decoration: none;
}

.footer-column a {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    transition: color 180ms ease;
}

.footer-column a:hover {
    color: var(--paper);
}

.contact-column a {
    overflow-wrap: anywhere;
}

.footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 1.35rem;
    border-top: 1px solid var(--line);
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 0.68rem;
}

.footer-bottom button {
    border: 0;
    background: none;
    color: var(--paper);
    font: inherit;
    cursor: pointer;
}

.footer-bottom button:hover {
    color: var(--signal);
}

@media (max-width: 760px) {
    .site-footer {
        align-items: stretch;
    }

    .footer-inner {
        padding: 5.75rem 1.25rem 4.5rem;
    }

    .footer-lead {
        grid-template-columns: 1fr;
        align-items: start;
        gap: 1.4rem;
    }

    .footer-lead h2 {
        font-size: clamp(2.15rem, 11vw, 3.2rem);
    }

    .email-link {
        width: 100%;
        justify-content: space-between;
    }

    .email-link span {
        min-width: 0;
        overflow-wrap: anywhere;
    }

    .footer-directory {
        grid-template-columns: 1fr 1fr;
        gap: 2rem 1.5rem;
    }

    .contact-column {
        grid-column: 1 / -1;
    }
}

@media (max-width: 420px) {
    .footer-directory {
        grid-template-columns: 1fr;
    }

    .contact-column {
        grid-column: auto;
    }

    .footer-bottom {
        align-items: flex-start;
        flex-direction: column;
    }
}

@media (prefers-reduced-motion: reduce) {
    .email-link,
    .footer-column a {
        transition: none;
    }
}
</style>
