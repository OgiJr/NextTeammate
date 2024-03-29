import { withIronSessionApiRoute } from "iron-session/next";
import { isLoggedIn, isSupportedMethod, reqBodyParse } from "../../lib/validation";
import { authCookie } from "../../lib/cookies";
import User from "../../models/User";
import { dbConnect } from "../../lib/db";
import { sendInvite } from "../../lib/email";

export default withIronSessionApiRoute(async function workRoute(req, res) {
  let reqBody;
  try {
    isSupportedMethod(req, res, ["POST"]);
    reqBody = reqBodyParse(req, res, ["targets", "link"]);
    await isLoggedIn(req, res);
  } catch (e) {
    return;
  }

  const { targets, link } = reqBody;
  if (!targets.length) {
    res.status(400).json({ message: "Please provide targets!" });
    return;
  }

  for (let i = 0; i < targets.length; i++) {
    try {
      await dbConnect();

      const target_db = User.findOne({ email: targets[i] });
      if (!target_db) {
        res.status(400).json({ message: "Invalid target" });
        return;
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  await sendInvite(targets, req.session.user.first_name + " " + req.session.user.last_name, link);

  res.status(200).json({});
}, authCookie);
