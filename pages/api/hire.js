import { withIronSessionApiRoute } from "iron-session/next";
import { authCookie } from "../../lib/cookies";
import { dbConnect } from "../../lib/db";
import { send } from "../../lib/email";
import rateLimit from "../../lib/rateLimit";
import { isSupportedMethod, reqBodyParse } from "../../lib/validation";
import User from "../../models/User";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default withIronSessionApiRoute(async function contactRoute(req, res) {
  try {
    await limiter.check(res, 10, "HIRE"); // 10 requests per minute
  } catch {
    res.status(429).json({ message: "Rate limit exceeded!" });
    return;
  }

  try {
    isSupportedMethod(req, res, ["GET"]);
    reqBodyParse(req, res, ["_id"]);
  } catch (e) {
    return;
  }

  const _id = req.query._id;
  const user = req.session.user;

  await dbConnect();

  const target = await User.findOne({ _id: _id });

  if (!target) {
    res.status(400).json({ message: "No such user!" });
    return;
  }

  if (target.company) {
    res.status(400).json({ message: "User already hired user!" });
    return;
  }

  send(
    "contact@nextteammate.com",
    "NexTeamMate Hiring Request",
    `You've received a hiring request from ${user.first_name} ${user.last_name}. They would like to find their teammate: ${target.first_name} ${target.last_name} (${target.email}).`
  );

  res.redirect(307, "/dashboard-employer").end();
}, authCookie);
