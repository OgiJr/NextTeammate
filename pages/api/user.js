import { dbConnect, dbUserToIronUser, getUserFromIron } from "../../lib/db";
import { withIronSessionApiRoute } from "iron-session/next";
import User from "../../models/User";
import { isLoggedIn, reqBodyParse, validateEmail, isAdmin, isDate } from "../../lib/validation";
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
  const link = `${process.env.URI}/set-password?password_generation_key=${password_generation_key}&email=${email}`;

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

  res.status(200).json({});
};

const get = async (req, res) => {
  try {
    isLoggedIn(req, res);
  } catch {
    return;
  }

  res.status(200).json(getUserFromIron(req));
};

const put = async (req, res) => {
  try {
    isLoggedIn(req, res);
    if (req.body.email && req.body.email !== "") {
      validateEmail(req.body.email);
    }
    if (req.body.birthdate && req.body.email !== "") {
      isDate(req.body.birthdate);
    }
  } catch {
    return;
  }

  const changable = ["first_name", "last_name", "bio", "birthdate", "email"];
  const changes = {};
  let counter = 0;
  for (const i of changable) {
    const item = req.body[i];

    if (item === undefined || item === null || item === "") {
      continue;
    }

    changes[i] = item;
    counter++;
  }

  if (!counter) {
    res.status(401).json({ message: "You must change something!" });
    return;
  }

  const user = req.session.user;
  try {
    await dbConnect();

    const result = await User.findOne({ email: user.email });

    if (!result) {
      res.status(401).json({ message: "Invalid user!" });
      return;
    }

    const newUser = await User.findOneAndUpdate({ email: user.email }, { $set: changes });

    req.session.user = dbUserToIronUser(newUser);
    await req.session.save();

    res.status(200).json({});
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export default withIronSessionApiRoute(async function handler(req, res) {
  if (req.method === "POST") {
    await post(req, res);
  } else if (req.method === "GET") {
    await get(req, res);
  } else if (req.method === "PUT") {
    await put(req, res);
  } else {
    res.status(405).json({ message: "Unsupported request type!" });
  }
}, authCookie);
