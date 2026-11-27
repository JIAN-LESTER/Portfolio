<script setup lang="ts">
import ContactCtaSection from '@/components/portfolio/ContactCtaSection.vue';
import AllServicesSection from '@/components/service/AllServicesSection.vue';
import Footer from '@/components/ui/Footer.vue';
import PageHero from '@/components/ui/PageHero.vue';
import { portfolioData } from '@/data/portfolio';
</script>

<template>
    <main>
        <PageHero variant="services" />

        <section
            id="services-content"
            class="scroll-mt-24"
        >
            <AllServicesSection :services="portfolioData.services" />
            <ContactCtaSection />
        </section>

        <Footer :personal="portfolioData.personal" />
    </main>
</template>
