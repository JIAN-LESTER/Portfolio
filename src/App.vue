<script setup lang="ts">
import { computed, type Component } from 'vue';
import PortfolioLayout from '@/layouts/PortfolioLayout.vue';
import type { StageSection } from '@/composables/useScrollStage';
import { normalizePath } from '@/data/navigation';
import { portfolioData } from '@/data/portfolio';
import About from '@/pages/About.vue';
import Contact from '@/pages/Contact.vue';
import Home from '@/pages/Home.vue';
import Projects from '@/pages/Projects.vue';
import Services from '@/pages/Services.vue';

interface PageRoute {
    component: Component;
    title: string;
    sections: StageSection[];
}

const routes: Record<string, PageRoute> = {
    '/': {
        component: Home,
        title: 'Jian Lester Tabarno - Software Engineer',
        sections: [
            { id: 'hero', label: 'Home', slides: 1 },
            {
                id: 'services',
                label: 'What I\nDo',
                slides: 1,
            },
            { id: 'about', label: 'About', slides: 1 },
            { id: 'skills', label: 'Tech\nStack', slides: 1 },
            {
                id: 'projects',
                label: 'Projects',
                slides: portfolioData.projects.length,
            },
            { id: 'journey', label: 'Education\nExperience', slides: 3 },
            { id: 'resume', label: 'Resume', slides: 1 },
            { id: 'contact', label: 'Contact Me', slides: 1 },
            { id: 'footer', label: 'Footer', slides: 1 },
        ],
    },
    '/about': {
        component: About,
        title: 'About - Jian Lester Tabarno',
        sections: [
            { id: 'about', label: 'About', slides: 1 },
            { id: 'skills', label: 'Tech\nStack', slides: 1 },
            { id: 'journey', label: 'Education\nExperience', slides: 3 },
            { id: 'resume', label: 'Resume', slides: 1 },
            { id: 'footer', label: 'Footer', slides: 1 },
        ],
    },
    '/projects': {
        component: Projects,
        title: 'Projects - Jian Lester Tabarno',
        sections: [
            {
                id: 'projects',
                label: 'Projects',
                slides: portfolioData.projects.length,
            },
            { id: 'footer', label: 'Footer', slides: 1 },
        ],
    },
    '/services': {
        component: Services,
        title: 'Services - Jian Lester Tabarno',
        sections: [
            {
                id: 'services',
                label: 'What I\nDo',
                slides: 1,
            },
            { id: 'footer', label: 'Footer', slides: 1 },
        ],
    },
    '/contact': {
        component: Contact,
        title: 'Contact - Jian Lester Tabarno',
        sections: [
            { id: 'contact', label: 'Contact Me', slides: 1 },
            { id: 'footer', label: 'Footer', slides: 1 },
        ],
    },
};

const requestedPath = normalizePath(window.location.pathname);
const activeRoute = computed(() => {
    const route = routes[requestedPath];

    if (!route) {
        console.error(`[App] Page route "${requestedPath}" was not found. Showing Home.`);
        return routes['/'];
    }

    console.info(`[App] Loaded page route "${requestedPath}".`);
    return route;
});

document.title = activeRoute.value.title;
</script>

<template>
    <PortfolioLayout :sections="activeRoute.sections">
        <component :is="activeRoute.component" />
    </PortfolioLayout>
</template>
