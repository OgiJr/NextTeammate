import { withIronSessionApiRoute } from "iron-session/next";
import { isLoggedIn, isSupportedMethod } from "../../lib/validation";
import { authCookie } from "../../lib/cookies";
import { v4 as uuidv4 } from "uuid";
import { readFileSync } from "fs";
import { generate } from "../../lib/jwt";

export default withIronSessionApiRoute(async function workRoute(req, res) {
  try {
    isSupportedMethod(req, res, ["POST"]);
    await isLoggedIn(req, res);
  } catch (e) {
    return;
  }

  const pk = readFileSync("keys/jitsi.pk");

  const token = generate(pk, {
    id: uuidv4(),
    name: `${req.session.user.first_name} ${req.session.user.last_name}`,
    email: req.session.user.email,
    avatar: `${process.env.URI}/${req.session.user.picture}`,
    appId: process.env.NEXT_PUBLIC_JITSI_APP_ID,
    kid: process.env.JITSI_KID,
  });

  res.status(200).json({ token });
}, authCookie);
