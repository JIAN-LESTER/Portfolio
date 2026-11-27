import { createRouter, createWebHistory } from 'vue-router';
import type { StageSection } from '@/composables/useScrollStage';
import About from '@/pages/About.vue';
import Home from '@/pages/Home.vue';
import Projects from '@/pages/Projects.vue';
import Services from '@/pages/Services.vue';

declare module 'vue-router' {
    interface RouteMeta {
        title: string;
        sections: StageSection[];
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                title: 'Jian Lester Tabarno - Software Engineer',
                sections: [
                    { id: 'hero', label: 'Home', slides: 1 },
                    { id: 'services', label: 'What I\nDo', slides: 1 },
                    { id: 'about', label: 'About', slides: 1 },
                    { id: 'skills', label: 'Tech\nStack', slides: 1 },
                    { id: 'projects', label: 'Projects', slides: 1 },
                    { id: 'contact', label: 'Contact Me', slides: 1 },
                    { id: 'footer', label: 'Footer', slides: 1 },
                ],
            },
        },
        {
            path: '/about',
            component: About,
            meta: {
                title: 'About - Jian Lester Tabarno',
                sections: [
                    { id: 'about-hero', label: 'About', slides: 1 },
                    { id: 'about-content', label: 'Introduction', slides: 1 },
                    { id: 'journey', label: 'Education\nExperience', slides: 1 },
                    { id: 'purpose', label: 'Purpose', slides: 1 },
                    { id: 'github', label: 'GitHub', slides: 1 },
                    { id: 'hobbies', label: 'Hobbies', slides: 1 },
                    { id: 'footer', label: 'Footer', slides: 1 },
                ],
            },
        },
        {
            path: '/projects',
            component: Projects,
            meta: {
                title: 'Projects - Jian Lester Tabarno',
                sections: [
                    { id: 'projects', label: 'Projects', slides: 1 },
                    { id: 'footer', label: 'Footer', slides: 1 },
                ],
            },
        },
        {
            path: '/services',
            component: Services,
            meta: {
                title: 'Services - Jian Lester Tabarno',
                sections: [
                    { id: 'services', label: 'What I\nDo', slides: 1 },
                    { id: 'footer', label: 'Footer', slides: 1 },
                ],
            },
        },
        {
            path: '/contact',
            redirect: () => {
                console.info('[Router] Redirecting the legacy contact route to the homepage contact section.');
                return { path: '/', hash: '#contact', replace: true };
            },
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: (to) => {
                console.error(`[Router] Page route "${to.fullPath}" was not found. Opening Home.`);
                return { path: '/', replace: true };
            },
        },
    ],
    scrollBehavior(to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }

        if (to.hash) {
            return false;
        }

        return { top: 0 };
    },
});

router.afterEach((to, _from, failure) => {
    if (failure) {
        console.error(`[Router] Could not open page "${to.fullPath}".`, failure);
        return;
    }

    console.info(`[Router] Opened page "${to.fullPath}" without reloading the document.`);
});

router.onError((error, to) => {
    console.error(`[Router] Unexpected error while opening page "${to.fullPath}".`, error);
});

export default router;
