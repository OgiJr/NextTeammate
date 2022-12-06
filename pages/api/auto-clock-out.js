import { withIronSessionApiRoute } from "iron-session/next";
import { authCookie } from "../../lib/cookies";
import { clockOutUser, userNeedsToBeClockedOut } from "../../lib/db";
import { send } from "../../lib/email";
import { isLoggedIn, isSupportedMethod } from "../../lib/validation";

export default withIronSessionApiRoute(async (req, res) => {
  try {
    await isLoggedIn(req, res);
    isSupportedMethod(req, res, "GET");
  } catch {
    return;
  }

  if (req.session.user.is_admin || req.session.user.is_employer) {
    res.status(200).json({ clockout: false });
    return;
  }

  if (await userNeedsToBeClockedOut(req.session.user._id)) {
    await send(
      req.session.user.email,
      "Automatic Clock Out Notification",
      "You've been automatically clocked out. Please clock back in. If this happens too often, contact your manager."
    );
    clockOutUser(req.session.user._id);
    res.status(200).json({ clockout: true });
    return;
  } else {
    res.status(200).json({ clockout: false });
    return;
  }
}, authCookie);
