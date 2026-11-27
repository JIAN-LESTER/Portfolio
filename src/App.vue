<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import PortfolioLayout from '@/layouts/PortfolioLayout.vue';

const route = useRoute();
const sections = computed(() => route.meta.sections);

watchEffect(() => {
    document.title = route.meta.title;
});
</script>

<template>
    <PortfolioLayout :key="route.fullPath" :sections="sections">
        <RouterView />
    </PortfolioLayout>
</template>
