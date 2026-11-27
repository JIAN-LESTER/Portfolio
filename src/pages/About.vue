<script setup lang="ts">
import GitHubSection from '@/components/about/GitHubSection.vue';
import HobbiesSection from '@/components/about/HobbiesSection.vue';
import IntroductionSection from '@/components/about/IntroductionSection.vue';
import JourneySection from '@/components/about/JourneySection.vue';
import PurposeSection from '@/components/about/PurposeSection.vue';
import ContactCtaSection from '@/components/portfolio/ContactCtaSection.vue';
import Footer from '@/components/ui/Footer.vue';
import PageHero from '@/components/ui/PageHero.vue';
import { portfolioData } from '@/data/portfolio';
</script>

<template>
    <main>
        <PageHero variant="about" />

        <IntroductionSection :personal="portfolioData.personal" />
        <JourneySection
            :education="portfolioData.education"
            :experience="portfolioData.experience"
        />
        <PurposeSection />
        <GitHubSection :github-url="portfolioData.personal.github" />
        <HobbiesSection />
        <ContactCtaSection />
    </main>

    <Footer :personal="portfolioData.personal" />
</template>
