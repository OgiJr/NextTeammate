import { dbConnect } from "../../lib/db";
import { withIronSessionApiRoute } from "iron-session/next";
import User from "../../models/User";
import Company from "../../models/Company";
import { isLoggedIn, isAdmin } from "../../lib/validation";
import { authCookie } from "../../lib/cookies";

const del = async (req, res) => {
  try {
    await isLoggedIn(req, res);
    isAdmin(req, res);
  } catch {
    return;
  }

  try {
    await dbConnect();

    const _id = req.query._id;

    if (!_id) {
      res.status(400).json({ message: "No user id provided!" });
      return;
    }

    await Company.deleteOne({ _id });
    await User.deleteMany({ is_employer: true, company: _id });
    await User.updateMany({ is_employer: false, company: _id }, { $unset: { company: 1 } });

    res.status(200).json({});
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export default withIronSessionApiRoute(async function handler(req, res) {
  if (req.method === "DELETE") {
    await del(req, res);
  } else {
    res.status(405).json({ message: "Unsupported request type!" });
  }
}, authCookie);
