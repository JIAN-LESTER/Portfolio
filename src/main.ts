import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/app.css';

const THEME_STORAGE_KEY = 'portfolio-theme';

function initializeTheme() {
    try {
        const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const useDarkTheme = savedTheme ? savedTheme === 'dark' : prefersDark;

        document.documentElement.classList.toggle('dark', useDarkTheme);
        document.documentElement.style.colorScheme = useDarkTheme ? 'dark' : 'light';
        console.info(`[Theme] Initialized ${useDarkTheme ? 'dark' : 'light'} mode.`);
    } catch (error) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
        console.error('[Theme] Could not read the saved theme. Dark mode was used instead.', error);
    }
}

initializeTheme();

const app = createApp(App);
app.use(router);

router
    .isReady()
    .then(() => {
        app.mount('#app');
        console.info('[App] Portfolio mounted after the initial route was resolved.');
    })
    .catch((error) => {
        console.error('[App] Portfolio could not mount because the initial route failed.', error);
    });
