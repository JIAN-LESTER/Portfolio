<script setup lang="ts">
import { ref } from 'vue';
import { ArrowRight, Menu, Moon, X } from 'lucide-vue-next';
import { normalizePath, siteNavigation } from '@/data/navigation';

const isMenuOpen = ref(false);
const currentPath = normalizePath(window.location.pathname);
const contactNavigation = siteNavigation.find((item) => item.path === '/#contact');
const primaryNavigation = siteNavigation.filter((item) => item !== contactNavigation);

function handleNavigation(path: string) {
    if (!siteNavigation.some((item) => item.path === path)) {
        console.error(`[Navbar] Page route "${path}" was not found.`);
        return;
    }

    isMenuOpen.value = false;
    console.info(`[Navbar] Opening page "${path}".`);
}
</script>

<template>
    <header class="site-header" :class="{ 'menu-open': isMenuOpen }">
        <nav class="navbar" aria-label="Primary navigation">
            <a
                href="/"
                class="brand"
                aria-label="Jian Lester Tabarno, home"
                @click="handleNavigation('/')"
            >
                <span class="brand-mark">JLT</span>
                <span class="brand-name">Jian Lester Tabarno</span>
            </a>

            <button
                type="button"
                class="menu-toggle"
                :aria-expanded="isMenuOpen"
                aria-controls="primary-menu"
                :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
                @click="isMenuOpen = !isMenuOpen"
            >
                <X v-if="isMenuOpen" :size="20" aria-hidden="true" />
                <Menu v-else :size="20" aria-hidden="true" />
            </button>

            <div id="primary-menu" class="nav-menu">
                <div class="nav-links">
                    <a
                        v-for="item in primaryNavigation"
                        :key="item.path"
                        :href="item.path"
                        class="nav-link"
                        :class="{ 'is-active': currentPath === item.path }"
                        :aria-current="currentPath === item.path ? 'page' : undefined"
                        @click="handleNavigation(item.path)"
                    >
                        {{ item.label }}
                    </a>
                </div>

                <div class="nav-actions">
                    <span class="theme-indicator" role="img" aria-label="Dark mode">
                        <Moon :size="16" aria-hidden="true" />
                    </span>
                    <a
                        v-if="contactNavigation"
                        :href="contactNavigation.path"
                        class="contact-link"
                        @click="handleNavigation(contactNavigation.path)"
                    >
                        <span>{{ contactNavigation.label }}</span>
                        <span class="contact-arrow" aria-hidden="true">
                            <ArrowRight :size="16" />
                        </span>
                    </a>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped>
.site-header {
    position: fixed;
    top: clamp(0.75rem, 2.5vw, 1.4rem);
    left: 50%;
    z-index: 50;
    width: min(calc(100% - 2rem), 1200px);
    transform: translateX(-50%);
}

.navbar {
    display: grid;
    min-height: 3.5rem;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 1.5rem;
    padding: 0.55rem 0.65rem 0.55rem 0.75rem;
    border: 1px solid rgb(237 233 226 / 0.1);
    border-radius: 0.9rem;
    background: rgb(11 14 18 / 0.78);
    box-shadow: 0 18px 50px rgb(0 0 0 / 0.2);
    backdrop-filter: blur(18px);
}

.brand {
    display: inline-flex;
    min-width: 0;
    align-items: center;
    gap: 0.65rem;
    color: inherit;
    text-decoration: none;
}

.brand-mark {
    flex: 0 0 auto;
    padding: 0.3rem 0.52rem;
    border-radius: 0.35rem;
    background: var(--signal);
    color: var(--ink);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
}

.brand-name {
    overflow: hidden;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: 0.88rem;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: clamp(0.8rem, 1.8vw, 1.4rem);
}

.nav-menu {
    display: contents;
}

.nav-actions {
    display: flex;
    align-items: center;
    justify-self: end;
    gap: 0.55rem;
}

.theme-indicator {
    display: inline-flex;
    width: 2.35rem;
    height: 2.35rem;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(237 233 226 / 0.12);
    border-radius: 999px;
    background: rgb(237 233 226 / 0.05);
    color: var(--signal);
}

.contact-link {
    display: inline-flex;
    min-height: 2.65rem;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    padding: 0.25rem 0.3rem 0.25rem 1rem;
    border: 1px solid rgb(245 166 35 / 0.5);
    border-radius: 999px;
    background: #15251f;
    color: var(--paper);
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    text-decoration: none;
    transition:
        background-color 180ms ease,
        border-color 180ms ease,
        color 180ms ease,
        transform 180ms ease;
}

.contact-link:hover,
.contact-link.is-active {
    border-color: var(--signal);
}

.contact-link:hover {
    transform: translateY(-1px);
}

.contact-arrow {
    display: grid;
    width: 2rem;
    height: 2rem;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 50%;
    background: var(--signal);
    color: var(--ink);
    transition: transform 180ms ease;
}

.contact-link:hover .contact-arrow {
    transform: rotate(-35deg);
}

.nav-link {
    position: relative;
    padding: 0.65rem 0.15rem;
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    text-decoration: none;
    transition:
        color 180ms ease;
}

.nav-link::after {
    position: absolute;
    right: 0;
    bottom: 0.3rem;
    left: 0;
    height: 1px;
    background: var(--signal);
    content: '';
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 180ms ease;
}

.nav-link:hover,
.nav-link.is-active {
    color: var(--paper);
}

.nav-link:hover::after,
.nav-link.is-active::after {
    transform: scaleX(1);
    transform-origin: left;
}

.menu-toggle {
    display: none;
    width: 2.6rem;
    height: 2.6rem;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--line);
    border-radius: 0.65rem;
    background: var(--panel);
    color: var(--paper);
    cursor: pointer;
}

@media (max-width: 760px) {
    .site-header {
        width: min(calc(100% - 1.25rem), 36rem);
    }

    .navbar {
        position: relative;
        display: flex;
        min-height: 3.4rem;
        padding: 0.45rem 0.5rem 0.45rem 0.65rem;
    }

    .brand {
        margin-right: auto;
    }

    .menu-toggle {
        display: inline-flex;
        flex: 0 0 auto;
    }

    .nav-menu {
        position: absolute;
        top: calc(100% + 0.5rem);
        right: 0;
        left: 0;
        display: grid;
        gap: 0.2rem;
        padding: 0.55rem;
        border: 1px solid rgb(237 233 226 / 0.1);
        border-radius: 0.9rem;
        background: rgb(11 14 18 / 0.96);
        box-shadow: 0 20px 50px rgb(0 0 0 / 0.35);
        opacity: 0;
        pointer-events: none;
        transform: translateY(-0.5rem);
        transition:
            opacity 180ms ease,
            transform 180ms ease;
        backdrop-filter: blur(18px);
    }

    .menu-open .nav-menu {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
    }

    .nav-links {
        display: grid;
        gap: 0.2rem;
    }

    .nav-actions {
        display: grid;
        grid-template-columns: 2.75rem minmax(0, 1fr);
        justify-self: stretch;
        gap: 0.45rem;
        padding-top: 0.35rem;
        border-top: 1px solid rgb(237 233 226 / 0.08);
    }

    .theme-indicator {
        width: 2.75rem;
        height: 2.75rem;
    }

    .contact-link {
        min-height: 2.75rem;
        justify-content: space-between;
    }

    .nav-link {
        min-height: 2.75rem;
        display: flex;
        align-items: center;
        padding-inline: 0.85rem;
        font-size: 0.82rem;
    }

    .nav-link::after {
        right: 0.85rem;
        bottom: 0.35rem;
        left: 0.85rem;
    }
}

@media (max-width: 390px) {
    .brand-name {
        max-width: 9.5rem;
        font-size: 0.8rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .nav-link,
    .nav-link::after,
    .nav-menu,
    .contact-link {
        transition: none;
    }

    .contact-arrow {
        transition: none;
    }
}
</style>
