<script setup lang="ts">
import AllServicesSection from '@/components/portfolio/AllServicesSection.vue';
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
    <Footer :personal="portfolioData.personal" />

            <!-- Development services -->
            <!-- Design services -->
            <!-- Development process -->
            <!-- Frequently asked questions -->
        </section>
    </main>
    

</template>
