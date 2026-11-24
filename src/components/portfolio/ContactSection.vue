<script setup lang="ts">
import { reactive } from 'vue';
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

const form = reactive({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    processing: false,
    wasSuccessful: false,
    error: '',
});

function submitBuildRequest() {
    form.processing = true;
    form.wasSuccessful = false;
    form.error = '';

    try {
        const subject = encodeURIComponent(`Project inquiry: ${form.projectType}`);
        const body = encodeURIComponent(
            [
                `Name: ${form.name}`,
                `Email: ${form.email}`,
                `Phone: ${form.phone || 'Not provided'}`,
                `Project type: ${form.projectType}`,
                `Budget: ${form.budget || 'Not specified'}`,
                `Timeline: ${form.timeline || 'Not specified'}`,
                '',
                form.message,
            ].join('\n'),
        );

        window.location.href = `mailto:${props.personal.email}?subject=${subject}&body=${body}`;
        form.wasSuccessful = true;
        console.info('Contact request opened in the visitor email client.');
    } catch (error) {
        form.error = 'The email app could not be opened. Please email me directly instead.';
        console.error('Failed to open the contact request.', error);
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
                    <p class="contact-kicker"><span></span> Contact me</p>
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
                            <label for="project-budget">Budget range</label>
                            <select id="project-budget" v-model="form.budget">
                                <option value="">Select a range</option>
                                <option>Under $500</option>
                                <option>$500 – $1,500</option>
                                <option>$1,500 – $3,000</option>
                                <option>$3,000+</option>
                                <option>Let&rsquo;s discuss</option>
                            </select>
                        </div>
                        <div class="field-group">
                            <label for="project-timeline">Preferred timeline</label>
                            <select id="project-timeline" v-model="form.timeline">
                                <option value="">Select a timeline</option>
                                <option>As soon as possible</option>
                                <option>Within 1 month</option>
                                <option>1–3 months</option>
                                <option>3+ months</option>
                                <option>Flexible</option>
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
                        Your email app is ready with the project details.
                    </p>

                    <button type="submit" :disabled="form.processing">
                        <span>{{ form.processing ? 'Opening…' : 'Send inquiry' }}</span>
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
    padding: clamp(1.5rem, 4vw, 3.5rem);
    grid-template-columns: minmax(250px, 0.78fr) minmax(0, 1.35fr);
    gap: clamp(2rem, 6vw, 5rem);
    border: 1px solid rgb(103 232 249 / 0.16);
    border-radius: 28px;
    background:
        radial-gradient(circle at 0 0, rgb(34 211 238 / 0.09), transparent 34%),
        rgb(3 15 29 / 0.92);
    box-shadow: 0 28px 70px rgb(2 8 23 / 0.28);
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
    color: #a5f3fc;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
}

.contact-kicker span {
    width: 1.25rem;
    height: 2px;
    border-radius: 99px;
    background: #22d3ee;
}

.contact-copy h2 {
    margin-top: 1rem;
    color: #f8fafc;
    font-size: clamp(2.1rem, 4vw, 3.35rem);
    font-weight: 650;
    line-height: 1.04;
    letter-spacing: -0.045em;
}

.contact-copy h2 span {
    color: #67e8f9;
}

.contact-intro {
    max-width: 32rem;
    margin-top: 1.2rem;
    color: #94a3b8;
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
    color: #e2e8f0;
    font-size: 0.82rem;
    line-height: 1.25;
    text-decoration: none;
}

.contact-details a {
    transition: color 180ms ease;
}

.contact-details a:hover {
    color: #67e8f9;
}

.contact-details small {
    display: block;
    margin-bottom: 0.22rem;
    color: #64748b;
    font-size: 0.68rem;
}

.detail-icon {
    display: grid;
    width: 2.35rem;
    height: 2.35rem;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid rgb(103 232 249 / 0.22);
    border-radius: 50%;
    color: #67e8f9;
    background: rgb(8 145 178 / 0.12);
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
    color: #94a3b8;
    transition: color 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.social-links a:hover {
    border-color: rgb(103 232 249 / 0.55);
    color: #67e8f9;
    transform: translateY(-2px);
}

.contact-form {
    min-width: 0;
    animation: contact-rise 620ms 100ms ease-out both;
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
    color: #cbd5e1;
    font-size: 0.73rem;
    font-weight: 600;
}

.field-group input,
.field-group select,
.field-group textarea {
    width: 100%;
    min-height: 2.8rem;
    border: 1px solid rgb(148 163 184 / 0.12);
    border-radius: 10px;
    outline: none;
    background: rgb(15 35 54 / 0.88);
    color: #f1f5f9;
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
    color: #64748b;
}

.field-group select:invalid,
.field-group select option[value=''] {
    color: #64748b;
}

.field-group select option {
    color: #e2e8f0;
    background: #102336;
}

.field-group input:hover,
.field-group select:hover,
.field-group textarea:hover {
    border-color: rgb(103 232 249 / 0.28);
}

.field-group input:focus,
.field-group select:focus,
.field-group textarea:focus {
    border-color: #22d3ee;
    background: rgb(15 35 54);
    box-shadow: 0 0 0 3px rgb(34 211 238 / 0.12);
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
    color: #a5f3fc;
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
    border: 1px solid rgb(103 232 249 / 0.28);
    border-radius: 999px;
    color: #082f49;
    background: #67e8f9;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
}

.contact-form button:hover:not(:disabled) {
    background: #a5f3fc;
    box-shadow: 0 14px 30px rgb(34 211 238 / 0.18);
    transform: translateY(-2px);
}

.contact-form button:focus-visible,
.social-links a:focus-visible,
.contact-details a:focus-visible {
    outline: 2px solid #67e8f9;
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
    color: #ecfeff;
    background: #0e7490;
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
    .contact-panel {
        padding: 1.35rem;
        border-radius: 20px;
    }

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
