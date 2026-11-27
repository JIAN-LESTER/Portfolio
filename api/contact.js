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

function escapeHtml(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function detailRow(label, value, href = '') {
    const safeValue = escapeHtml(value);
    const content = href
        ? `<a href="${escapeHtml(href)}" style="color:#d97706;text-decoration:none;">${safeValue}</a>`
        : safeValue;

    return `
        <tr>
            <td style="width:140px;padding:10px 18px 10px 0;color:#6b7280;font-size:13px;line-height:20px;vertical-align:top;">${escapeHtml(label)}</td>
            <td style="padding:10px 0;color:#171717;font-size:14px;font-weight:600;line-height:20px;vertical-align:top;">${content}</td>
        </tr>`;
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

    const emailHtml = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New portfolio inquiry</title>
</head>
<body style="margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;color:transparent;">New ${escapeHtml(projectType.toLowerCase())} inquiry from ${escapeHtml(name)}.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#f3f4f6;">
        <tr>
            <td align="center" style="padding:32px 16px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;overflow:hidden;border:1px solid #e5e7eb;border-radius:16px;background:#ffffff;">
                    <tr>
                        <td style="padding:28px 32px;background:#171717;">
                            <p style="margin:0 0 8px;color:#f5a623;font-size:13px;font-weight:700;letter-spacing:.04em;">Jian Lester Portfolio</p>
                            <h1 style="margin:0;color:#ffffff;font-size:25px;line-height:32px;">New project inquiry</h1>
                            <p style="margin:8px 0 0;color:#d1d5db;font-size:14px;line-height:21px;">A visitor submitted the contact form on your portfolio.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:28px 32px 12px;">
                            <h2 style="margin:0 0 10px;color:#171717;font-size:16px;line-height:24px;">Contact details</h2>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;">
                                ${detailRow('Name', name)}
                                ${detailRow('Email', email, `mailto:${email}`)}
                                ${detailRow('Phone', phone || 'Not provided', phone ? `tel:${phone}` : '')}
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:12px 32px;">
                            <div style="height:1px;background:#e5e7eb;"></div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:12px 32px 18px;">
                            <h2 style="margin:0 0 10px;color:#171717;font-size:16px;line-height:24px;">Project overview</h2>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;">
                                ${detailRow('Project type', projectType)}
                                ${detailRow('Country', country)}
                                ${detailRow('Currency', currency || 'Not specified')}
                                ${detailRow('Budget', budget || 'Not specified')}
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:0 32px 32px;">
                            <div style="padding:20px;border-left:4px solid #f5a623;border-radius:8px;background:#fffbeb;">
                                <h2 style="margin:0 0 8px;color:#171717;font-size:15px;line-height:22px;">Project details</h2>
                                <p style="margin:0;color:#374151;font-size:14px;line-height:22px;white-space:pre-wrap;">${escapeHtml(message)}</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:18px 32px;border-top:1px solid #e5e7eb;background:#fafafa;color:#6b7280;font-size:12px;line-height:18px;">
                            Reply to this email to respond directly to ${escapeHtml(name)}.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

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
                    name: process.env.CONTACT_FROM_NAME || 'Jian Lester Tabarno',
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
                htmlContent: emailHtml,
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
