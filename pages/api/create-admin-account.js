import { dbConnect, dbUserToIronUser } from "../../lib/db";
import { withIronSessionApiRoute } from "iron-session/next";
import User from "../../models/User";
import * as bcrypt from "bcryptjs";
import { validatePassword, validateEmail, isDev, isSupportedMethod, reqBodyParse } from "../../lib/validation";
import { authCookie } from "../../lib/cookies";

export default withIronSessionApiRoute(async function handler(req, res) {
  let reqBody;
  try {
    isDev(res);
    isSupportedMethod(req, res, ["POST"]);
    reqBody = reqBodyParse(req, res, ["first_name", "last_name", "email", "password"]);
    validateEmail(reqBody.email, res);
    validatePassword(reqBody.password, res);
  } catch {
    return;
  }

  const { first_name, last_name, email, password } = reqBody;

  var salt = bcrypt.genSaltSync(10);
  var password_hash = bcrypt.hashSync(password, salt);

  try {
    await dbConnect();

    const user = await User.create({
      first_name,
      last_name,
      email,
      password_hash,
      is_admin: true,
      has_password: true,
    });

    req.session.user = dbUserToIronUser(user);
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
}, authCookie);
