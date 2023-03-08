import { withIronSessionApiRoute } from "iron-session/next";
import User from "../../models/User";
import WorkData from "../../models/WorkData";
import { isAdmin, isLoggedIn, isSupportedMethod } from "../../lib/validation";
import { dbConnect, isDbUserWorking } from "../../lib/db";
import { authCookie } from "../../lib/cookies";
import Company from "../../models/Company";
import Categories from "../../lib/categories";

export default withIronSessionApiRoute(async function workRoute(req, res) {
  try {
    isSupportedMethod(req, res, ["POST"]);
    await isLoggedIn(req, res);
    isAdmin(req, res);
  } catch (e) {
    return;
  }

  const email = req.body.email;
  const categories = req.body.categories;
  if (categories && !Array.isArray(categories)) {
    res.status(400).json({ message: "Categories must be an array!" });
    return;
  }
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
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }

  const changable = ["expected_hours_weekly", "current_price_per_hour", "currency", "autoClockOutHours"];
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

  if (req.body.company !== "0") {
    const company_id = await Company.find({ _id: req.body.company });
    if (!company_id) {
      res.status(400).json({ message: "No such company exists!" });
      return;
    }

    await User.findOneAndUpdate({ _id: user._id }, { company: req.body.company });
  }

  if (!counter && req.body.company !== 0) {
    res.status(401).json({ message: "You must change something!" });
    return;
  }

  try {
    await dbConnect();

    let wd = await WorkData.findOne({ worker: user._id });
    if (!wd) {
      if (counter != 4) {
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

    if (categories) {
      for (const category of categories) {
        if (Categories.indexOf(category) === -1) {
          res.status(400).json({ message: "Invalid category: " + category });
          return;
        }
      }

      await User.findOneAndUpdate(
        {
          email,
        },
        {
          $set: {
            categories,
          },
        }
      );
    }

    res.status(200).json({});
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}, authCookie);
