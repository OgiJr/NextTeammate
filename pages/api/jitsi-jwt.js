import { withIronSessionApiRoute } from "iron-session/next";
import { isLoggedIn, isSupportedMethod } from "../../lib/validation";
import { authCookie } from "../../lib/cookies";
import jsonwebtoken from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { readFileSync } from "fs";

const generate = (privateKey, { id, name, email, avatar, appId, kid }) => {
  const now = new Date();
  const jwt = jsonwebtoken.sign(
    {
      aud: "jitsi",
      context: {
        user: {
          id,
          name,
          avatar,
          email: email,
          moderator: "true",
        },
        features: {
          livestreaming: "true",
          recording: "true",
          transcription: "true",
          "outbound-call": "true",
        },
      },
      iss: "chat",
      room: "*",
      sub: appId,
      exp: Math.round(now.setHours(now.getHours() + 3) / 1000),
      nbf: Math.round(new Date().getTime() / 1000) - 10,
    },
    privateKey,
    { algorithm: "RS256", header: { kid } }
  );
  return jwt;
};

export default withIronSessionApiRoute(async function workRoute(req, res) {
  try {
    isSupportedMethod(req, res, ["POST"]);
    isLoggedIn(req, res);
  } catch (e) {
    return;
  }

  const pk = readFileSync("keys/jitsi.pk");

  const token = generate(pk, {
    id: uuidv4(),
    name: `${req.session.user.first_name} ${req.session.user.last_name}`,
    email: req.session.user.email,
    avatar: `${process.env.URI}/${req.session.user.picture}`,
    appId: process.env.JITSI_APP_ID,
    kid: process.env.JITSI_KID,
  });

  res.status(200).json({ token });
}, authCookie);
