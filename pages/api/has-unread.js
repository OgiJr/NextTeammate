import { withIronSessionApiRoute } from "iron-session/next";
import { isLoggedIn, isSupportedMethod } from "../../lib/validation";
import { userHasUnreadMessages } from "../../lib/db";
import { authCookie } from "../../lib/cookies";

export default withIronSessionApiRoute(async function hasUnread(req, res) {
  try {
    isSupportedMethod(req, res, ["GET"]);
    await isLoggedIn(req, res);
  } catch (e) {
    return;
  }

  try {
    res.status(200).json({ unread: await userHasUnreadMessages(req.session.user._id) });
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }
}, authCookie);
