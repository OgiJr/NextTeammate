import { withIronSessionApiRoute } from "iron-session/next";
import User from "../../models/User";
import { isAdmin, isLoggedIn, isSupportedMethod, reqBodyParse } from "../../lib/validation";
import { dbConnect, isDbUserWorking } from "../../lib/db";
import { authCookie } from "../../lib/cookies";
import Company from "../../models/Company";

export default withIronSessionApiRoute(async function workRoute(req, res) {
  try {
    isSupportedMethod(req, res, ["POST"]);
    reqBodyParse(req, res, ["company", "email"]);
    isLoggedIn(req, res);
    isAdmin(req, res);
  } catch (e) {
    return;
  }

  const email = req.body.email;
  let user;

  try {
    await dbConnect();

    user = await User.findOne({ email });
    if (!user || user.is_admin || user.is_employer) {
      res.status(401).json({ message: "No such user!" });
      return;
    }

    if (await isDbUserWorking(user)) {
      res.status(401).json({ message: "Cannot change the data on a user that is currently working!" });
      return;
    }

    if (req.body.company !== "0") {
      const company_id = await Company.find({ _id: req.body.company });
      if (!company_id) {
        res.status(400).json({ message: "No such company exists!" });
        return;
      }

      await User.findOneAndUpdate({ _id: user._id }, { company: req.body.company });
      res.status(200).json({});
      return;
    }

    await User.findOneAndUpdate({ _id: user._id }, { $unset: { company: 1 } });
    res.status(200).json({});
    return;
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }
}, authCookie);
