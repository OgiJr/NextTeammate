import { withIronSessionApiRoute } from "iron-session/next";
import { isLoggedIn, isSupportedMethod } from "../../lib/validation";
import { dbConnect, userHasUnreadMessageFrom } from "../../lib/db";
import { authCookie } from "../../lib/cookies";
import User from "../../models/User";

export default withIronSessionApiRoute(async function hasUnread(req, res) {
  try {
    isSupportedMethod(req, res, ["GET"]);
    await isLoggedIn(req, res);
  } catch (e) {
    return;
  }

  try {
    await dbConnect();
    const ret = {};
    const all_users = await User.find();
    for (const user of all_users) {
      ret[user.email] = await userHasUnreadMessageFrom(req.session.user._id, user._id);
    }
    res.status(200).json(ret);
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }
}, authCookie);
