import { withIronSessionApiRoute } from "iron-session/next";
import { authCookie } from "../../lib/cookies";
import { isSupportedMethod, reqBodyParse, validatePassword } from "../../lib/validation";
import { dbConnect, dbUserToIronUser } from "../../lib/db";
import User from "../../models/User";
import * as bcrypt from "bcryptjs";

export default withIronSessionApiRoute(async function setPasswordRoute(req, res) {
  let reqBody;
  try {
    isSupportedMethod(req, res, ["POST"]);
    reqBody = reqBodyParse(req, res, ["email", "password", "password_generation_key"]);
    validatePassword(reqBody.password, res);
  } catch {
    return;
  }

  const { email, password, password_generation_key } = reqBody;

  try {
    await dbConnect();

    const result = await User.findOne({ email });

    if (!result || result.has_password) {
      res.status(401).json({ message: "Invalid email!" });
      return;
    }

    if (!result.password_generation_key || result.password_generation_key !== password_generation_key) {
      res.status(401).json({ message: "Wrong password generation key!" });
      return;
    }

    var salt = bcrypt.genSaltSync(10);
    var password_hash = bcrypt.hashSync(password, salt);

    const newUser = await User.findOneAndUpdate(
      { email },
      {
        $set: { password_hash },
        $unset: { password_generation_key },
      },
      { new: true }
    );
    req.session.user = dbUserToIronUser(newUser);
    await req.session.save();

    res.status(200).json({});
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}, authCookie);
