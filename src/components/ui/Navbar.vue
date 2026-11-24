<script setup lang="ts">
import { ref } from 'vue';
import { Menu, X } from 'lucide-vue-next';
import { normalizePath, siteNavigation } from '@/data/navigation';

const isMenuOpen = ref(false);
const currentPath = normalizePath(window.location.pathname);

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

            <div id="primary-menu" class="nav-links">
                <a
                    v-for="item in siteNavigation"
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
        </nav>
    </header>
</template>

<style scoped>
.site-header {
    position: fixed;
    top: clamp(0.75rem, 2.5vw, 1.4rem);
    left: 50%;
    z-index: 50;
    width: min(calc(100% - 2rem), 1180px);
    transform: translateX(-50%);
}

.navbar {
    display: flex;
    min-height: 3.5rem;
    align-items: center;
    justify-content: space-between;
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
    gap: 0.15rem;
}

.nav-link {
    position: relative;
    padding: 0.7rem 0.8rem;
    border-radius: 0.55rem;
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    text-decoration: none;
    transition:
        color 180ms ease,
        background-color 180ms ease;
}

.nav-link::after {
    position: absolute;
    right: 0.8rem;
    bottom: 0.42rem;
    left: 0.8rem;
    height: 1px;
    background: var(--signal);
    content: '';
    opacity: 0;
    transform: scaleX(0.3);
    transition:
        opacity 180ms ease,
        transform 180ms ease;
}

.nav-link:hover,
.nav-link.is-active {
    color: var(--paper);
    background: rgb(237 233 226 / 0.06);
}

.nav-link.is-active::after {
    opacity: 1;
    transform: scaleX(1);
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
        min-height: 3.4rem;
        padding: 0.45rem 0.5rem 0.45rem 0.65rem;
    }

    .menu-toggle {
        display: inline-flex;
        flex: 0 0 auto;
    }

    .nav-links {
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

    .menu-open .nav-links {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
    }

    .nav-link {
        min-height: 2.75rem;
        display: flex;
        align-items: center;
        padding-inline: 0.85rem;
        font-size: 0.78rem;
    }

    .nav-link::after {
        top: 50%;
        right: 0.75rem;
        bottom: auto;
        left: auto;
        width: 1.5rem;
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
    .nav-links {
        transition: none;
    }
}
</style>
