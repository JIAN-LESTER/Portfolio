<script setup lang="ts">
import { computed, reactive } from 'vue';
import {
    ArrowUpRight,
    Facebook,
    Github,
    Linkedin,
    Mail,
    MapPin,
    Phone,
} from 'lucide-vue-next';
import { useSectionSlide } from '@/composables/useScrollStage';
import type { PersonalInfo } from '@/types/portfolio';

const props = defineProps<{ personal: PersonalInfo }>();
const { isActiveSection } = useSectionSlide('contact');

const countryOptions = [
    { code: 'PH', name: 'Philippines', currency: 'PHP', locale: 'en-PH', rate: 58 },
    { code: 'US', name: 'United States', currency: 'USD', locale: 'en-US', rate: 1 },
    { code: 'CA', name: 'Canada', currency: 'CAD', locale: 'en-CA', rate: 1.4 },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP', locale: 'en-GB', rate: 0.8 },
    { code: 'AU', name: 'Australia', currency: 'AUD', locale: 'en-AU', rate: 1.55 },
    { code: 'NZ', name: 'New Zealand', currency: 'NZD', locale: 'en-NZ', rate: 1.72 },
    { code: 'SG', name: 'Singapore', currency: 'SGD', locale: 'en-SG', rate: 1.35 },
    { code: 'MY', name: 'Malaysia', currency: 'MYR', locale: 'en-MY', rate: 4.45 },
    { code: 'IN', name: 'India', currency: 'INR', locale: 'en-IN', rate: 88 },
    { code: 'JP', name: 'Japan', currency: 'JPY', locale: 'ja-JP', rate: 155 },
    { code: 'KR', name: 'South Korea', currency: 'KRW', locale: 'ko-KR', rate: 1470 },
    { code: 'AE', name: 'United Arab Emirates', currency: 'AED', locale: 'en-AE', rate: 3.67 },
    { code: 'DE', name: 'Germany', currency: 'EUR', locale: 'de-DE', rate: 0.92 },
    { code: 'FR', name: 'France', currency: 'EUR', locale: 'fr-FR', rate: 0.92 },
] as const;

const form = reactive({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    country: '',
    budget: '',
    message: '',
    website: '',
    processing: false,
    wasSuccessful: false,
    error: '',
});

const selectedCountry = computed(() =>
    countryOptions.find((country) => country.code === form.country),
);

const budgetOptions = computed(() => {
    const country = selectedCountry.value;

    if (!country) {
        return [];
    }

    const formatPrice = (usdAmount: number) =>
        new Intl.NumberFormat(country.locale, {
            style: 'currency',
            currency: country.currency,
            maximumFractionDigits: 0,
        }).format(usdAmount * country.rate);

    const first = formatPrice(500);
    const second = formatPrice(1500);
    const third = formatPrice(3000);

    return [
        `Under ${first}`,
        `${first} – ${second}`,
        `${second} – ${third}`,
        `${third}+`,
        'Let’s discuss',
    ];
});

function handleCountryChange() {
    form.budget = '';
}

async function submitBuildRequest() {
    form.processing = true;
    form.wasSuccessful = false;
    form.error = '';

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: form.name,
                email: form.email,
                phone: form.phone,
                projectType: form.projectType,
                country: selectedCountry.value?.name || '',
                currency: selectedCountry.value?.currency || '',
                budget: form.budget,
                message: form.message,
                website: form.website,
            }),
        });
        const responseText = await response.text();
        let result: { message?: string } = {};
        let hasJsonResponse = false;

        if (responseText) {
            try {
                result = JSON.parse(responseText) as { message?: string };
                hasJsonResponse = true;
            } catch (error) {
                console.error('Contact endpoint returned a non-JSON response.', {
                    status: response.status,
                    contentType: response.headers.get('content-type'),
                    error,
                });
            }
        }

        if (!response.ok) {
            const fallbackMessage =
                response.status === 404
                    ? 'The contact service is unavailable. Use the deployed Vercel site or run it with Vercel Dev.'
                    : `The inquiry could not be sent (HTTP ${response.status}). Please try again.`;

            throw new Error(result.message || fallbackMessage);
        }

        if (!responseText || !hasJsonResponse) {
            throw new Error(
                'The contact service returned an invalid response. Please try again.',
            );
        }

        form.wasSuccessful = true;
        form.name = '';
        form.email = '';
        form.phone = '';
        form.projectType = '';
        form.country = '';
        form.budget = '';
        form.message = '';
        form.website = '';
        console.info('Contact inquiry sent successfully.');
    } catch (error) {
        form.error =
            error instanceof Error
                ? error.message
                : 'The inquiry could not be sent. Please try again.';
        console.error('Failed to send the contact inquiry.', error);
    } finally {
        form.processing = false;
    }
}
</script>

<template>
    <section id="contact" class="stage-section contact" :class="{ 'is-active': isActiveSection }">
        <div class="section-inner" data-stage-scroll>
            <div class="contact-panel">
                <div class="contact-copy">
                
                    <h2>Let&rsquo;s talk about<br /><span>your next project.</span></h2>
                    <p class="contact-intro">
                        Have a website, mobile app, or custom system in mind? Share the details
                        and I&rsquo;ll help you shape the next steps.
                    </p>

                    <address class="contact-details">
                        <a :href="`mailto:${personal.email}`">
                            <span class="detail-icon"><Mail :size="18" /></span>
                            <span><small>Email</small>{{ personal.email }}</span>
                        </a>
                        <a v-if="personal.phone" :href="`tel:${personal.phone.replace(/\s/g, '')}`">
                            <span class="detail-icon"><Phone :size="18" /></span>
                            <span><small>Phone</small>{{ personal.phone }}</span>
                        </a>
                        <div v-if="personal.location">
                            <span class="detail-icon"><MapPin :size="18" /></span>
                            <span><small>Location</small>{{ personal.location }}</span>
                        </div>
                    </address>

                    <div class="social-links" aria-label="Social profiles">
                        <a
                            v-if="personal.github"
                            :href="personal.github"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub profile"
                        ><Github :size="18" /></a>
                        <a
                            v-if="personal.linkedin"
                            :href="personal.linkedin"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn profile"
                        ><Linkedin :size="18" /></a>
                        <a
                            v-if="personal.facebook"
                            :href="personal.facebook"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Facebook profile"
                        ><Facebook :size="18" /></a>
                    </div>
                </div>

                <form class="contact-form" @submit.prevent="submitBuildRequest">
                    <div class="honeypot-field" aria-hidden="true">
                        <label for="visitor-website">Website</label>
                        <input
                            id="visitor-website"
                            v-model="form.website"
                            type="text"
                            name="website"
                            tabindex="-1"
                            autocomplete="off"
                        />
                    </div>
                    <div class="form-grid">
                        <div class="field-group">
                            <label for="visitor-name">Your name *</label>
                            <input
                                id="visitor-name"
                                v-model="form.name"
                                type="text"
                                required
                                maxlength="120"
                                placeholder="Juan Dela Cruz"
                            />
                        </div>
                        <div class="field-group">
                            <label for="visitor-email">Email address *</label>
                            <input
                                id="visitor-email"
                                v-model="form.email"
                                type="email"
                                required
                                maxlength="255"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div class="field-group">
                            <label for="visitor-phone">Phone number</label>
                            <input
                                id="visitor-phone"
                                v-model="form.phone"
                                type="tel"
                                maxlength="40"
                                placeholder="+63 900 000 0000"
                            />
                        </div>
                        <div class="field-group">
                            <label for="project-type">Project type *</label>
                            <select id="project-type" v-model="form.projectType" required>
                                <option value="" disabled>Select a service</option>
                                <option>Website development</option>
                                <option>Mobile app development</option>
                                <option>Custom software system</option>
                                <option>UI/UX design</option>
                                <option>AI-powered feature</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div class="field-group">
                            <label for="visitor-country">Country *</label>
                            <select
                                id="visitor-country"
                                v-model="form.country"
                                required
                                @change="handleCountryChange"
                            >
                                <option value="" disabled>Select your country</option>
                                <option
                                    v-for="country in countryOptions"
                                    :key="country.code"
                                    :value="country.code"
                                >
                                    {{ country.name }} ({{ country.currency }})
                                </option>
                            </select>
                        </div>
                        <div class="field-group">
                            <label for="project-budget">
                                Budget range{{ selectedCountry ? ` (${selectedCountry.currency})` : '' }}
                            </label>
                            <select
                                id="project-budget"
                                v-model="form.budget"
                                :disabled="!selectedCountry"
                            >
                                <option value="">
                                    {{ selectedCountry ? 'Select a range' : 'Select a country first' }}
                                </option>
                                <option v-for="budget in budgetOptions" :key="budget" :value="budget">
                                    {{ budget }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="field-group message-field">
                        <label for="build-request">Tell me about your project *</label>
                        <textarea
                            id="build-request"
                            v-model="form.message"
                            rows="5"
                            required
                            minlength="10"
                            maxlength="3000"
                            placeholder="What are you looking to build?"
                        />
                    </div>

                    <p v-if="form.error" class="form-status form-error" role="alert">{{ form.error }}</p>
                    <p
                        v-else-if="form.wasSuccessful"
                        class="form-status form-success"
                        role="status"
                    >
                        Your inquiry was sent successfully. I&rsquo;ll get back to you soon.
                    </p>

                    <button type="submit" :disabled="form.processing">
                        <span>{{ form.processing ? 'Sending…' : 'Send inquiry' }}</span>
                        <span class="button-icon" aria-hidden="true"><ArrowUpRight :size="17" /></span>
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped>
.contact {
    display: flex;
    align-items: center;
}

.section-inner {
    width: 100%;
    max-width: 1600px;
    max-height: 100%;
    margin-inline: auto;
    padding: 0 clamp(15px, 6vw, 96px);
    overflow-y: auto;
    overscroll-behavior: contain;
}

.contact-panel {
    display: grid;
    width: 100%;
    max-width: 1120px;
    margin-inline: auto;
    padding-block: clamp(1.5rem, 4vw, 3.5rem);
    grid-template-columns: minmax(250px, 0.78fr) minmax(0, 1.35fr);
    gap: clamp(2rem, 6vw, 5rem);
    animation: contact-rise 520ms ease-out both;
}

.contact-copy {
    align-self: center;
}

.contact-kicker {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin: 0;
    color: var(--signal);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
}

.contact-kicker span {
    width: 1.25rem;
    height: 2px;
    border-radius: 99px;
    background: var(--signal);
}

.contact-copy h2 {
    margin-top: 1rem;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: clamp(2.1rem, 4vw, 3.35rem);
    font-weight: 650;
    line-height: 1.04;
    letter-spacing: -0.045em;
}

.contact-copy h2 span {
    color: var(--signal);
}

.contact-intro {
    max-width: 32rem;
    margin-top: 1.2rem;
    color: var(--muted);
    font-size: 0.9rem;
    line-height: 1.7;
}

.contact-details {
    display: grid;
    gap: 1rem;
    margin-top: 2rem;
    font-style: normal;
}

.contact-details a,
.contact-details > div {
    display: flex;
    align-items: center;
    min-width: 0;
    gap: 0.8rem;
    color: var(--paper);
    font-size: 0.82rem;
    line-height: 1.25;
    text-decoration: none;
}

.contact-details a {
    transition: color 180ms ease;
}

.contact-details a:hover {
    color: var(--signal);
}

.contact-details small {
    display: block;
    margin-bottom: 0.22rem;
    color: var(--muted);
    font-size: 0.68rem;
}

.detail-icon {
    display: grid;
    width: 2.35rem;
    height: 2.35rem;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid rgb(245 166 35 / 0.24);
    border-radius: 50%;
    color: var(--signal);
    background: rgb(245 166 35 / 0.08);
}

.social-links {
    display: flex;
    gap: 0.6rem;
    margin-top: 1.6rem;
}

.social-links a {
    display: grid;
    width: 2.3rem;
    height: 2.3rem;
    place-items: center;
    border: 1px solid rgb(148 163 184 / 0.2);
    border-radius: 50%;
    color: var(--muted);
    transition: color 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.social-links a:hover {
    border-color: var(--signal);
    color: var(--signal);
    transform: translateY(-2px);
}

.contact-form {
    position: relative;
    min-width: 0;
    animation: contact-rise 620ms 100ms ease-out both;
}

.honeypot-field {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem 0.9rem;
}

.field-group {
    display: grid;
    gap: 0.5rem;
}

.field-group label {
    color: rgb(237 233 226 / 0.78);
    font-family: var(--font-mono);
    font-size: 0.73rem;
    font-weight: 600;
}

.field-group input,
.field-group select,
.field-group textarea {
    width: 100%;
    min-height: 2.8rem;
    border: 1px solid rgb(237 233 226 / 0.12);
    border-radius: 10px;
    outline: none;
    background: rgb(11 13 13 / 0.72);
    color: var(--paper);
    font: inherit;
    font-size: 0.78rem;
    transition: border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
}

.field-group input,
.field-group select {
    padding: 0 0.9rem;
}

.field-group textarea {
    min-height: 7.5rem;
    padding: 0.8rem 0.9rem;
    resize: vertical;
}

.field-group input::placeholder,
.field-group textarea::placeholder {
    color: rgb(237 233 226 / 0.36);
}

.field-group select:invalid,
.field-group select option[value=''] {
    color: rgb(237 233 226 / 0.42);
}

.field-group select option {
    color: var(--paper);
    background: var(--panel);
}

.field-group input:hover,
.field-group select:hover,
.field-group textarea:hover {
    border-color: rgb(245 166 35 / 0.3);
}

.field-group input:focus,
.field-group select:focus,
.field-group textarea:focus {
    border-color: var(--signal);
    background: var(--panel);
    box-shadow: 0 0 0 3px rgb(245 166 35 / 0.12);
}

.field-group select:disabled {
    cursor: not-allowed;
    opacity: 0.58;
}

.message-field {
    margin-top: 1rem;
}

.form-status {
    margin-top: 0.75rem;
    font-size: 0.75rem;
    line-height: 1.5;
}

.form-success {
    color: var(--signal);
}

.form-error {
    color: #fca5a5;
}

.contact-form button {
    display: inline-flex;
    min-height: 2.8rem;
    align-items: center;
    gap: 0.8rem;
    margin-top: 1.15rem;
    padding: 0.3rem 0.35rem 0.3rem 1.15rem;
    border: 1px solid var(--signal);
    border-radius: 999px;
    color: var(--ink);
    background: var(--signal);
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
}

.contact-form button:hover:not(:disabled) {
    background: #ffbd52;
    box-shadow: 0 14px 30px rgb(245 166 35 / 0.18);
    transform: translateY(-2px);
}

.contact-form button:focus-visible,
.social-links a:focus-visible,
.contact-details a:focus-visible {
    outline: 2px solid var(--signal);
    outline-offset: 3px;
}

.contact-form button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
}

.button-icon {
    display: grid;
    width: 2rem;
    height: 2rem;
    place-items: center;
    border-radius: 50%;
    color: var(--signal);
    background: var(--ink);
}

@media (max-width: 800px) {
    .contact {
        align-items: stretch;
    }

    .section-inner {
        padding: 5.5rem clamp(18px, 5vw, 32px) 2rem;
    }

    .contact-panel {
        grid-template-columns: 1fr;
        gap: 2.25rem;
    }

    .contact-copy {
        max-width: 36rem;
    }
}

@media (max-width: 560px) {
    .contact-copy h2 {
        font-size: clamp(2rem, 11vw, 2.65rem);
    }

    .form-grid {
        grid-template-columns: 1fr;
    }

    .contact-details a,
    .contact-details > div {
        overflow-wrap: anywhere;
    }

    .contact-form button {
        width: 100%;
        justify-content: space-between;
    }
}

@media (prefers-reduced-motion: reduce) {
    .contact-panel,
    .contact-form {
        animation: none;
    }

    .social-links a,
    .contact-form button {
        transition: none;
    }
}

@keyframes contact-rise {
    from {
        opacity: 0;
        transform: translateY(16px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
