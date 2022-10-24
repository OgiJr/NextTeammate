import { withIronSessionApiRoute } from "iron-session/next";
import User from "../../models/User";
import WorkData from "../../models/WorkData";
import { isAdmin, isLoggedIn, isSupportedMethod } from "../../lib/validation";
import { dbConnect, isDbUserWorking } from "../../lib/db";
import { authCookie } from "../../lib/cookies";

export default withIronSessionApiRoute(async function workRoute(req, res) {
  try {
    isSupportedMethod(req, res, ["POST"]);
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
    if (!user || user.is_admin) {
      res.status(401).json({ message: "No such user!" });
      return;
    }

    if (await isDbUserWorking(user)) {
      res.status(401).json({ message: "Cannot change the data on a user that is currently working!" });
      return;
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }

  const changable = ["expected_hours_weekly", "current_price_per_hour", "currency"];
  const changes = {};
  let counter = 0;
  for (const i of changable) {
    const item = req.body[i];

    if (item === undefined || item === null || item === "") {
      continue;
    }

    changes[i] = item;
    counter++;
  }

  if (!counter) {
    res.status(401).json({ message: "You must change something!" });
    return;
  }

  try {
    await dbConnect();

    let wd = await WorkData.findOne({ worker: user._id });
    if (!wd) {
      if (counter != 3) {
        res.status(401).json({ message: "Please provide all the necessary fields!" });
        return;
      }
      wd = await WorkData.create({ worker: user._id, ...changes });
    } else {
      wd = await WorkData.findOneAndUpdate({ worker: user._id }, { $set: changes }, { upsert: true, new: true });
    }

    await User.findOneAndUpdate(
      { email },
      {
        $set: {
          work_data: wd._id,
        },
      }
    );

    res.status(200).json({});
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}, authCookie);
