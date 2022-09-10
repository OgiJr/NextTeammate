import { dbConnect, getUserFromIron } from "../../lib/db";
import { withIronSessionApiRoute } from "iron-session/next";
import User from "../../models/User";
import { isLoggedIn, reqBodyParse, validateEmail, isAdmin } from "../../lib/validation";
import { v4 as uuidv4 } from "uuid";
import { send } from "../../lib/email";
import { authCookie } from "../../lib/cookies";

const post = async (req, res) => {
  let reqBody;
  try {
    isLoggedIn(req, res);
    isAdmin(req, res);
    reqBody = reqBodyParse(req, res, ["first_name", "last_name", "email"]);
    validateEmail(reqBody.email, res);
  } catch {
    return;
  }

  const { first_name, last_name, email } = reqBody;
  const password_generation_key = uuidv4();
  const link = `${process.env.URI}/set-password/?password_generation_key=${password_generation_key}&email=${email}`;

  try {
    await dbConnect();

    await User.create({
      first_name,
      last_name,
      email,
      password_generation_key,
    });

    send(
      email,
      "NextTeamMate - Set Password",
      `Hi ${first_name},\nYour NextTeamMate account has been created.\nPlease set your password here: ${process.env.URI}/set-password/${password_generation_key}.`,
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

  res.status(200).send("ok");
};

const get = async (req, res) => {
  try {
    isLoggedIn(req, res);
  } catch {
    return;
  }

  res.status(200).json(getUserFromIron(req));
};

export default withIronSessionApiRoute(async function handler(req, res) {
  if (req.method === "POST") {
    await post(req, res);
  } else if (req.method === "GET") {
    await get(req, res);
  } else {
    res.status(405).json({ message: "Unsupported request type!" });
  }
}, authCookie);
