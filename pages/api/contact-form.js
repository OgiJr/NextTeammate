import { sendContactForm } from "../../lib/email";
import rateLimit from "../../lib/rateLimit";
import { isSupportedMethod, reqBodyParse } from "../../lib/validation";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function contactRoute(req, res) {
  try {
    await limiter.check(res, 10, "CONTACT_FORM"); // 10 requests per minute
  } catch {
    res.status(429).json({ message: "Rate limit exceeded!" });
    return;
  }

  let reqBody;
  try {
    isSupportedMethod(req, res, ["POST"]);
    reqBody = reqBodyParse(req, res, ["email", "subject", "message", "phone", "name", "company", "website"]);
  } catch (e) {
    return;
  }

  const { email, subject, message, phone, name, company, website } = reqBody;

  await sendContactForm(email, subject, message, name, phone, company, website);

  res.status(200).json({});
}
