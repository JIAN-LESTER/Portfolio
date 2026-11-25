const allowedProjectTypes = new Set([
    'Website development',
    'Mobile app development',
    'Custom software system',
    'UI/UX design',
    'AI-powered feature',
    'Other',
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function textValue(value) {
    return typeof value === 'string' ? value.trim() : '';
}

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        response.setHeader('Allow', 'POST');
        return response.status(405).json({ message: 'Method not allowed.' });
    }

    if (!process.env.BREVO_API_KEY) {
        console.error('Contact email failed: BREVO_API_KEY is not configured.');
        return response.status(503).json({
            message: 'The contact form is temporarily unavailable. Please try again later.',
        });
    }

    let body;

    try {
        body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
    } catch (error) {
        console.error('Contact email rejected: invalid JSON body.', error);
        return response.status(400).json({ message: 'Invalid request.' });
    }

    const name = textValue(body?.name);
    const email = textValue(body?.email);
    const phone = textValue(body?.phone);
    const projectType = textValue(body?.projectType);
    const country = textValue(body?.country);
    const currency = textValue(body?.currency);
    const budget = textValue(body?.budget);
    const message = textValue(body?.message);
    const website = textValue(body?.website);

    // Silently accept bot submissions caught by the honeypot field.
    if (website) {
        console.info('Contact email skipped: honeypot field was completed.');
        return response.status(200).json({ message: 'Your inquiry was sent successfully.' });
    }

    if (
        !name ||
        name.length > 120 ||
        !emailPattern.test(email) ||
        email.length > 255 ||
        !allowedProjectTypes.has(projectType) ||
        !country ||
        country.length > 80 ||
        phone.length > 40 ||
        budget.length > 100 ||
        message.length < 10 ||
        message.length > 3000
    ) {
        console.error('Contact email rejected: invalid form data.');
        return response.status(422).json({
            message: 'Please check the form details and try again.',
        });
    }

    const emailText = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Project type: ${projectType}`,
        `Country: ${country}`,
        `Currency: ${currency || 'Not specified'}`,
        `Budget: ${budget || 'Not specified'}`,
        '',
        'Project details:',
        message,
    ].join('\n');

    try {
        const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: {
                    name: process.env.CONTACT_FROM_NAME || 'Jian Lester Portfolio',
                    email: process.env.CONTACT_FROM_EMAIL || 'tabarno.jian@gmail.com',
                },
                to: [
                    {
                        email: process.env.CONTACT_TO_EMAIL || 'tabarno.jian@gmail.com',
                        name: process.env.CONTACT_TO_NAME || 'Jian Lester Tabarno',
                    },
                ],
                replyTo: { email, name },
                subject: `Portfolio inquiry: ${projectType}`,
                textContent: emailText,
            }),
        });
        const result = await brevoResponse.json();

        if (!brevoResponse.ok) {
            console.error('Contact email failed at Brevo.', {
                status: brevoResponse.status,
                providerMessage: result?.message || result?.code,
            });
            return response.status(502).json({
                message: 'The inquiry could not be sent right now. Please try again.',
            });
        }

        console.info('Contact email sent successfully.', { messageId: result.messageId });
        return response.status(200).json({ message: 'Your inquiry was sent successfully.' });
    } catch (error) {
        console.error('Contact email request failed.', error);
        return response.status(500).json({
            message: 'The inquiry could not be sent right now. Please try again.',
        });
    }
}
