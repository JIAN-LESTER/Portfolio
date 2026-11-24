<script setup lang="ts">
import ProjectsSection from '@/components/portfolio/ProjectsSection.vue';
import Footer from '@/components/ui/Footer.vue';
import { portfolioData } from '@/data/portfolio';
</script>

<template>
    <ProjectsSection :projects="portfolioData.projects" />
    <Footer :personal="portfolioData.personal" />
</template>
