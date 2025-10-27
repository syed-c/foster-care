import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

export async function sendContactEmail({ to, from, name, message, agencyName }) {
  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: to,
      subject: `New Inquiry from ${name} - Foster Care Directory UK`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7CE2A7;">New Inquiry for ${agencyName}</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${from}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 8px;">${message}</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This inquiry was sent via Foster Care Directory UK (foster-care.co.uk)</p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

export async function sendGeneralInquiry({ name, email, message }) {
  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: 'info@foster-care.co.uk',
      replyTo: email,
      subject: `General Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7CE2A7;">General Inquiry</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}