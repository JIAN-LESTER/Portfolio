<script setup lang="ts">
import ServicesSection from '@/components/portfolio/ServicesSection.vue';
import Footer from '@/components/ui/Footer.vue';
import { portfolioData } from '@/data/portfolio';
</script>

<template>
    <ServicesSection :services="portfolioData.services" />
    <Footer :personal="portfolioData.personal" />
</template>
