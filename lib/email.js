import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_ACCOUNT,
  secure: true,
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function send(to, subject, text, html = "") {
  await transporter.sendMail({
    from: `NextTeamMate NoReply <${process.env.EMAIL_ACCOUNT}>`,
    to,
    subject,
    text,
    html,
  });
}

export async function sendContactForm(email, subject, message, name, phone) {
  await transporter.sendMail({
    from: `NextTeamMate Contact Form <${process.env.EMAIL_ACCOUNT}>`,
    to: "nextteammateltd@gmail.com",
    subject: "NextTeamMate Contact Form",
    html: `Contact Form:<br/>Name: ${name}<br/>Email: ${email}<br/>Phone: ${phone}<br/>Subject: ${subject}<br/>Message: ${message}`,
  });
}

export async function sendInvite(targets, inviter_name, room_name) {
  for (let i = 0; i < targets.length; i++) {
    await transporter.sendMail({
      from: `NextTeamMate Meeting Invite <${process.env.EMAIL_ACCOUNT}>`,
      to: targets[i],
      subject: `NextTeamMate: ${inviter_name} has invited you to a meeting!`,
      html: `${inviter_name} has invited you to a meeting! You can join it here: ${
        process.env.NEXT_PUBLIC_IS_DEV === "TRUE"
          ? "http://localhost:3000"
          : "https://" + process.env.NEXT_PUBLIC_DOMAIN
      }/call?room_name=${encodeURIComponent(room_name)}.`,
    });
  }
}
