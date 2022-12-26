import { withIronSessionApiRoute } from "iron-session/next";
import User from "../../models/User";
import { isLoggedIn, isSupportedMethod, reqBodyParse } from "../../lib/validation";
import { clockOutAllUsers, dbConnect, dbUserToIronUser, isIronUserAssigned, isIronUserWorking } from "../../lib/db";
import { authCookie } from "../../lib/cookies";
import { cdnSubpath } from "../../lib/cdn";

export default withIronSessionApiRoute(async function getRecordsRoute(req, res) {
  let reqBody;
  try {
    isSupportedMethod(req, res, ["GET"]);
    await isLoggedIn(req, res);
    reqBody = reqBodyParse(req, res, ["start", "end"]);
  } catch (e) {
    return;
  }

  let start_date = new Date(reqBody.start);
  let end_date = new Date(reqBody.end);

  if (start_date >= end_date) {
    res.status(400).json({ message: "Invalid range!" });
    return;
  }

  await dbConnect();

  await clockOutAllUsers();

  let allUsers;

  const user = req.session.user;

  if (user.is_admin) {
    allUsers = await User.find({ is_admin: false, is_employer: false });
  } else if (user.is_employer) {
    allUsers = await User.find({ is_admin: false, is_employer: false, company: user.company._id });
  } else {
    res.status(200).json({});
    return;
  }

  if (!allUsers || allUsers.lenght == 0) {
    res.status(200).json({});
    return;
  }

  const allIronUsers = [...(await Promise.all(allUsers.map(async (u) => await dbUserToIronUser(u))))];

  try {
    let result = allIronUsers.map((u) => {
      if (!isIronUserAssigned(u)) {
        return {
          name: u.first_name + " " + u.last_name,
          email: u.email,
          picture: u.has_picture ? cdnSubpath() + u.picture : u.picture,
          is_assigned: false,
        };
      }

      let work_units_in_period = [];
      u.work_data.work.forEach((w) => {
        if (w.end_date) {
          if (new Date(w.start_time) >= start_date && new Date(w.end_date) <= end_date) {
            work_units_in_period.push(JSON.parse(JSON.stringify(w)));
          }
        } else {
          if (new Date(w.start_time) >= start_date) {
            work_units_in_period.push(JSON.parse(JSON.stringify(w)));
          }
        }
      });

      const work_data_to_hours = (w) => {
        let end = w.end_time ? w.end_time : new Date();
        return Math.abs(new Date(end) - new Date(w.start_time)) / 36e5;
      };

      let actual_work = 0;
      work_units_in_period.forEach((w) => (actual_work += work_data_to_hours(w)));

      let salaries = {};
      const work_data_to_salary = (w) => w.price_per_hours * work_data_to_hours(w);
      work_units_in_period.forEach((w) => {
        if (!salaries[w.currency]) {
          salaries[w.currency] = 0;
        }

        salaries[w.currency] += parseInt(work_data_to_salary(w));
      });

      const days =
        (new Date(end_date.getFullYear(), end_date.getMonth() + 1, end_date.getDate()) -
          new Date(start_date.getFullYear(), start_date.getMonth() + 1, start_date.getDate())) /
        (1000 * 60 * 60 * 24);

      return {
        name: u.first_name + "  " + u.last_name,
        email: u.email,
        picture: u.has_picture ? cdnSubpath() + u.picture : u.picture,
        is_assigned: true,
        status: isIronUserWorking(u),
        actual_work: actual_work.toFixed(2),
        expected_work: ((u.work_data.expected_hours_weekly / 7) * days).toFixed(2),
        salaries,
        company: u.company,
      };
    });

    result = result.filter((x) => x.is_assigned);

    res.status(200).json({ data: result });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
  }
}, authCookie);
