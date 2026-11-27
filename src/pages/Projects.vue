<script setup lang="ts">
import AllProjectsSection from '@/components/project/AllProjectsSection.vue';
import Footer from '@/components/ui/Footer.vue';
import PageHero from '@/components/ui/PageHero.vue';
import { portfolioData } from '@/data/portfolio';
</script>

<template>
    <main>
        <PageHero variant="projects" />

        <section id="projects-content" class="scroll-mt-24">
            <AllProjectsSection :projects="portfolioData.projects" />
            <ContactCtaSection />
            <Footer :personal="portfolioData.personal" />
           
        </section>
    </main>
</template>
