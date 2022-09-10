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
