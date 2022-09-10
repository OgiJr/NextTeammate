export const authCookie = {
  cookieName: "nextteammate_auth",
  password: process.env.COOKIE_PASS,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
