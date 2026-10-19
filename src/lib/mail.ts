import nodemailer from "nodemailer";

function required(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing mail env: ${name}`);
  }
  return value;
}

export function getMailTransporter() {
  return nodemailer.createTransport({
    host: required("SMTP_HOST"),
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: required("SMTP_USER"),
      pass: required("SMTP_PASS"),
    },
  });
}

export async function sendAdminMail(options: {
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const transporter = getMailTransporter();
  const from =
    process.env.MAIL_FROM ||
    "contact@blueheelerforadoption.com";
  const to =
    process.env.ADMIN_EMAIL ||
    "contact@blueheelerforadoption.com";

  await transporter.sendMail({
    from,
    to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
  });
}
