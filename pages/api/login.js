import { withIronSessionApiRoute } from "iron-session/next";
import * as bcrypt from "bcryptjs";
import User from "../../models/User";
import { isSupportedMethod, reqBodyParse } from "../../lib/validation";
import { dbConnect, dbUserToIronUser } from "../../lib/db";
import { authCookie } from "../../lib/cookies";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  let reqBody;
  try {
    isSupportedMethod(req, res, ["POST"]);
    reqBody = reqBodyParse(req, res, ["email", "password"]);
  } catch (e) {
    console.log(e.message);
    return;
  }

  const { email, password } = reqBody;

  try {
    await dbConnect();

    const result = await User.findOne({ email });

    if (!result || !bcrypt.compareSync(password, result.password_hash)) {
      res.status(401).json({ message: "Wrong username or password!" });
      return;
    }

    req.session.user = dbUserToIronUser(result);
    await req.session.save();
    res.status(200).json({});
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}, authCookie);
