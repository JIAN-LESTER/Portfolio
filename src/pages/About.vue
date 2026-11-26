<script setup lang="ts">
import AboutSection from '@/components/portfolio/AboutSection.vue';
import JourneySection from '@/components/portfolio/JourneySection.vue';
import SkillsSection from '@/components/portfolio/SkillsSection.vue';
import Footer from '@/components/ui/Footer.vue';
import PageHero from '@/components/ui/PageHero.vue';
import { portfolioData } from '@/data/portfolio';
</script>

<template>
           <main>
        <PageHero variant="about" />

        <section
            id="about-content"
            class="scroll-mt-24"
        >
         <AboutSection :personal="portfolioData.personal" />
    <SkillsSection :skills="portfolioData.skills" />
    <JourneySection
        :education="portfolioData.education"
        :experience="portfolioData.experience"
    />    <!-- Personal introduction -->
            <!-- Education -->
            <!-- Work experience -->
            <!-- Technical skills -->
        </section>
    </main>

   
    <Footer :personal="portfolioData.personal" />
</template>
