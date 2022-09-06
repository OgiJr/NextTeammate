import dbConnect from "../../lib/dbConnect";
import { withIronSessionApiRoute } from "iron-session/next";
import User from "../../models/User";
import * as bcrypt from "bcryptjs";
import validatePassword from "../../lib/validatePassword";
import validateEmail from "../../lib/validateEmail";
import isPresent from "../../lib/isPresent";

const post = async (req, res) => {
  const { first_name, last_name, email, password, is_admin } = req.body;

  if (
    !isPresent(first_name) ||
    !isPresent(last_name) ||
    !isPresent(email) ||
    !isPresent(password) ||
    !isPresent(password)
  ) {
    res.status(400).json({ message: "Missing fields!" });
    return;
  }

  if (!validateEmail(email)) {
    res.status(400).json({ message: "Invalid email!" });
    return;
  }

  if (!validatePassword(password)) {
    res.status(400).json({
      message:
        "The password must be at least 8 characters, contain a lowercase letter, an uppercase letter, and at least one digit!",
    });
    return;
  }

  var salt = bcrypt.genSaltSync(10);
  var password_hash = bcrypt.hashSync(password, salt);

  try {
    await dbConnect();

    const user = await User.create({
      first_name,
      last_name,
      email,
      password_hash,
      is_admin,
    });

    req.session.user = {
      _id: user._id.toString(),
      first_name,
      last_name,
      email,
      is_admin,
      employees: null,
    };
    await req.session.save();
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
  if (!req.session.user) {
    res.status(400).json({ message: "No authenticated user present on this session!" });
    return;
  }

  res.status(200).json(req.session.user);
};

export default withIronSessionApiRoute(
  async function userRoute(req, res) {
    switch (req.method) {
      case "POST":
        await post(req, res);
        break;
      case "GET":
        await get(req, res);
        break;
      default:
        res.status(405).json({ message: "Unsupported request type!" });
        break;
    }
  },
  {
    cookieName: "nextteammate_auth",
    password: process.env.COOKIE_PASS,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
