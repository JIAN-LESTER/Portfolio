<script setup lang="ts">
import ProjectsSection from '@/components/portfolio/ProjectsSection.vue';
import Footer from '@/components/ui/Footer.vue';
import PageHero from '@/components/ui/PageHero.vue';
import { portfolioData } from '@/data/portfolio';
</script>

<template>

        <main>
        <PageHero variant="projects" />

        <section
            id="projects-content"
            class="scroll-mt-24"
        >
              <ProjectsSection :projects="portfolioData.projects" show-all />
    <Footer :personal="portfolioData.personal" />
        </section>
    </main>

</template>
