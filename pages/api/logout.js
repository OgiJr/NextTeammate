import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function logoutRoute(req, res) {
    req.session.destroy();
    res.status(200).send("ok");
  },
  {
    cookieName: "nextteammate_auth",
    password: process.env.COOKIE_PASS,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
