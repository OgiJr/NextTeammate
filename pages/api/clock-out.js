import { withIronSessionApiRoute } from "iron-session/next";
import User from "../../models/User";
import WorkData from "../../models/WorkData";
import WorkUnit from "../../models/WorkUnit";
import { isLoggedIn } from "../../lib/validation";
import { dbConnect, dbUserToIronUser, isIronUserWorking } from "../../lib/db";
import { authCookie } from "../../lib/cookies";

export default withIronSessionApiRoute(async function workRoute(req, res) {
  try {
    isLoggedIn(req, res);
  } catch (e) {
    return;
  }

  let ironUser = req.session.user;
  let user;
  try {
    await dbConnect();

    user = await User.findOne({ email: ironUser.email });
    if (!user || user.is_admin) {
      res.status(401).json({ message: "No such user!" });
      return;
    }

    ironUser = await dbUserToIronUser(user);

    if (!isIronUserWorking(ironUser)) {
      res.status(401).json({ message: "Can't clock out, if you're haven't clocked in!" });
      return;
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }

  const wd = await WorkData.findOne({ worker: ironUser._id });

  await WorkUnit.updateOne(
    { _id: wd.work[wd.work.length - 1] },
    {
      end_time: new Date(Date.now()),
    }
  );

  res.status(200).json({});
}, authCookie);
