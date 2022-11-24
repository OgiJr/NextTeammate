import { withIronSessionApiRoute } from "iron-session/next";
import User from "../../models/User";
import WorkData from "../../models/WorkData";
import WorkUnit from "../../models/WorkUnit";
import { isLoggedIn } from "../../lib/validation";
import { dbConnect, dbUserToIronUser, isIronUserWorking } from "../../lib/db";
import { authCookie } from "../../lib/cookies";

export default withIronSessionApiRoute(async function workRoute(req, res) {
  try {
    await isLoggedIn(req, res);
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

    if (isIronUserWorking(ironUser)) {
      res.status(401).json({ message: "Can't clock in, if you're already clocked in!" });
      return;
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }

  const wd = await WorkData.findOne({ worker: ironUser._id });
  if (!wd) {
    res.status(401).json({ message: "Can't clock in until an administrator has set your hourly wage!" });
    return;
  }

  const work_unit = await WorkUnit.create({
    start_time: new Date(Date.now()).toISOString(),
    worker: user._id,
    price_per_hours: wd.current_price_per_hour,
    currency: wd.currency,
    work: wd._id,
  });

  await WorkData.updateOne(
    { _id: wd._id },
    {
      $push: {
        work: work_unit,
      },
    }
  );

  res.status(200).json({});
}, authCookie);
