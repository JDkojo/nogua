/**
 * Notification helpers — email (via Nodemailer / SMTP) and
 * WhatsApp (via Twilio or Meta Cloud API).
 *
 * Required env vars:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
 *   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM
 */

import nodemailer from "nodemailer";

// ─── Email ────────────────────────────────────────────────────────────────────

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

/**
 * Send an email.
 * @param {object} opts
 * @param {string|string[]} opts.to
 * @param {string} opts.subject
 * @param {string} opts.html
 * @param {string} [opts.text]
 */
export async function sendEmail({ to, subject, html, text }) {
  const t = getTransporter();
  return t.sendMail({
    from: process.env.SMTP_FROM || "noreply@realestate.com",
    to: Array.isArray(to) ? to.join(", ") : to,
    subject,
    html,
    text: text || html.replace(/<[^>]+>/g, ""),
  });
}

// ─── WhatsApp (Twilio) ────────────────────────────────────────────────────────

/**
 * Send a WhatsApp message via Twilio.
 * @param {string} to      - recipient phone in E.164 format, e.g. "+2348012345678"
 * @param {string} message - plain text message body
 */
export async function sendWhatsApp(to, message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM; // e.g. "whatsapp:+14155238886"

  if (!accountSid || !authToken || !from) {
    console.warn("[WhatsApp] Twilio credentials not configured.");
    return;
  }

  const { default: twilio } = await import("twilio");
  const client = twilio(accountSid, authToken);

  return client.messages.create({
    from,
    to: `whatsapp:${to}`,
    body: message,
  });
}

// ─── Notification templates ───────────────────────────────────────────────────

export const templates = {
  newLead: (lead) => ({
    subject: `New Lead: ${lead.firstName} ${lead.lastName}`,
    html: `<p>A new lead has been submitted.</p>
           <ul>
             <li><strong>Name:</strong> ${lead.firstName} ${lead.lastName}</li>
             <li><strong>Email:</strong> ${lead.email}</li>
             <li><strong>Phone:</strong> ${lead.phone}</li>
             <li><strong>Interest:</strong> ${lead.interest}</li>
           </ul>`,
  }),

  visitBooked: (visit) => ({
    subject: `Site Visit Booked — ${visit.propertyTitle}`,
    html: `<p>A site visit has been booked.</p>
           <ul>
             <li><strong>Property:</strong> ${visit.propertyTitle}</li>
             <li><strong>Date:</strong> ${visit.visitDate}</li>
             <li><strong>Time:</strong> ${visit.visitTime}</li>
             <li><strong>Client:</strong> ${visit.clientName}</li>
           </ul>`,
  }),

  paymentReceived: (payment) => ({
    subject: `Payment Received — ₦${Number(payment.amount).toLocaleString()}`,
    html: `<p>A payment has been recorded.</p>
           <ul>
             <li><strong>Amount:</strong> ₦${Number(payment.amount).toLocaleString()}</li>
             <li><strong>Reference:</strong> ${payment.reference}</li>
             <li><strong>Date:</strong> ${payment.paymentDate}</li>
           </ul>`,
  }),
};
