<script setup lang="ts">
import ContactSection from '@/components/portfolio/ContactSection.vue';
import Footer from '@/components/ui/Footer.vue';
import { portfolioData } from '@/data/portfolio';
</script>

<template>
    <ContactSection :personal="portfolioData.personal" />
    <Footer :personal="portfolioData.personal" />
</template>
