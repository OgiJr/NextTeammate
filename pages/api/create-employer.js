import { dbConnect } from "../../lib/db";
import { withIronSessionApiRoute } from "iron-session/next";
import User from "../../models/User";
import Company from "../../models/Company";
import { isLoggedIn, reqBodyParse, validateEmail } from "../../lib/validation";
import { v4 as uuidv4 } from "uuid";
import { send } from "../../lib/email";
import { authCookie } from "../../lib/cookies";

const post = async (req, res) => {
  let reqBody;
  try {
    isLoggedIn(req, res);
    reqBody = reqBodyParse(req, res, ["first_name", "last_name", "email", "company"]);
    validateEmail(reqBody.email, res);
  } catch {
    return;
  }

  const { first_name, last_name, email, company } = reqBody;
  const password_generation_key = uuidv4();

  try {
    await dbConnect();

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: "User already exists!" });
      return;
    }

    const company_id = await Company.find({ _id: company });
    if (!company_id) {
      res.status(400).json({ message: "No such company exists!" });
      return;
    }

    await User.create({
      first_name,
      last_name,
      email,
      password_generation_key,
      company: company,
      is_employer: true,
    });

    const link =
      (process.env.NEXT_PUBLIC_IS_DEV === "TRUE"
        ? "http://localhost:3000"
        : "https://" + process.env.NEXT_PUBLIC_DOMAIN) +
      "/set-password?password_generation_key=" +
      password_generation_key +
      "&email=" +
      email;

    send(
      email,
      "NextTeamMate - Set Password",
      `Hi ${first_name},\nYour NextTeamMate account has been created.\nPlease set your password here: ${link}.`,
      `Hi ${first_name},<br/>Your NextTeamMate account has been created.<br/>Please set your password <a href="${link}">here</a>.`
    );
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).json({ message: "Email already used!" });
      return;
    }

    res.status(400).json({ message: e.message });
    return;
  }

  res.status(200).json({});
};

export default withIronSessionApiRoute(async function handler(req, res) {
  if (req.method === "POST") {
    await post(req, res);
  } else {
    res.status(405).json({ message: "Unsupported request type!" });
  }
}, authCookie);
