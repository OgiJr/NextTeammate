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

export async function sendContactForm(email, subject, message, name, phone, company, website) {
  await transporter.sendMail({
    from: `NextTeamMate Contact Form <${process.env.EMAIL_ACCOUNT}>`,
    to: "contact@nextteammate.com",
    subject: "NextTeamMate Contact Form",
    html: `Contact Form:<br/>Name: ${name}<br/>Email: ${email}<br/>Phone: ${phone}<br/>Subject: ${subject}<br/>Message: ${message} <br/> Company: ${company} <br/> Website: ${website}`,
  });
}

export async function sendInvite(targets, inviter_name, link) {
  for (let i = 0; i < targets.length; i++) {
    const m = {
      from: `NextTeamMate Meeting Invite <${process.env.EMAIL_ACCOUNT}>`,
      to: targets[i],
      subject: `NextTeammate: ${inviter_name} has invited you to a meeting!`,
      html: `${inviter_name} has invited you to a meeting! You can join it here: ${link}.`,
    };
    await transporter.sendMail(m);
  }
}
