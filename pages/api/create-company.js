import { withIronSessionApiRoute } from "iron-session/next";
import Company from "../../models/Company";
import { isAdmin, isLoggedIn, isSupportedMethod, reqBodyParse } from "../../lib/validation";
import { dbConnect } from "../../lib/db";
import { authCookie } from "../../lib/cookies";

export default withIronSessionApiRoute(async function sendMessage(req, res) {
  let reqBody;
  try {
    isSupportedMethod(req, res, ["POST"]);
    await isLoggedIn(req, res);
    isAdmin(req, res);
    reqBody = reqBodyParse(req, res, ["name"]);
  } catch (e) {
    return;
  }

  const { name } = reqBody;

  try {
    await dbConnect();

    await Company.create({
      name,
    });

    res.status(200).json({});
    return;
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).json({ message: "This company already exists!" });
      return;
    }
    res.status(400).json({ message: e.message });
    return;
  }
}, authCookie);
