import { withIronSessionApiRoute } from "iron-session/next";
import { authCookie } from "../../lib/cookies";

export default withIronSessionApiRoute(async function logoutRoute(req, res) {
  req.session.destroy();
  res.status(200).json({});
}, authCookie);
