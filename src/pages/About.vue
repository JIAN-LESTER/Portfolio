<script setup lang="ts">
import AboutSection from '@/components/portfolio/AboutSection.vue';
import JourneySection from '@/components/portfolio/JourneySection.vue';
import ResumeSection from '@/components/portfolio/ResumeSection.vue';
import SkillsSection from '@/components/portfolio/SkillsSection.vue';
import Footer from '@/components/ui/Footer.vue';
import { portfolioData } from '@/data/portfolio';
</script>

<template>
    <AboutSection :personal="portfolioData.personal" />
    <SkillsSection :skills="portfolioData.skills" />
    <JourneySection
        :education="portfolioData.education"
        :experience="portfolioData.experience"
        :capstone="portfolioData.projects[0]"
    />
    <ResumeSection :personal="portfolioData.personal" />
    <Footer :personal="portfolioData.personal" />
</template>
