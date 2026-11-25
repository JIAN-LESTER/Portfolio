<script setup lang="ts">
import AboutSection from '@/components/portfolio/AboutSection.vue';
import ContactSection from '@/components/portfolio/ContactSection.vue';
import HeroSection from '@/components/portfolio/HeroSection.vue';
import ProjectsSection from '@/components/portfolio/ProjectsSection.vue';
import ServicesSection from '@/components/portfolio/ServicesSection.vue';
import SkillsSection from '@/components/portfolio/SkillsSection.vue';
import Footer from '@/components/ui/Footer.vue';
import { portfolioData } from '@/data/portfolio';
</script>

<template>
    <HeroSection :personal="portfolioData.personal" />
    <ServicesSection :services="portfolioData.services" />
    <AboutSection
        :personal="portfolioData.personal"
        :education="portfolioData.education"
        :experience="portfolioData.experience"
        show-journey-summary
    />
    <SkillsSection :skills="portfolioData.skills" />
    <ProjectsSection :projects="portfolioData.projects" />
    <ContactSection :personal="portfolioData.personal" />
    <Footer :personal="portfolioData.personal" />
</template>
