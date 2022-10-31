import { withIronSessionApiRoute } from "iron-session/next";
import User from "../../models/User";
import { isAdmin, isLoggedIn, isSupportedMethod, reqBodyParse } from "../../lib/validation";
import { dbConnect, dbUserToIronUser, isIronUserAssigned, isIronUserWorking } from "../../lib/db";
import { authCookie } from "../../lib/cookies";

export default withIronSessionApiRoute(async function getRecordsRoute(req, res) {
  let reqBody;
  try {
    isSupportedMethod(req, res, ["GET"]);
    isLoggedIn(req, res);
    isAdmin(req, res);
    reqBody = reqBodyParse(req, res, ["start", "end"]);
  } catch (e) {
    return;
  }

  let start_date = new Date(reqBody.start);
  let end_date = new Date(reqBody.end);

  // let start_date_x = new Date(reqBody.start);
  // let end_date_x = new Date(reqBody.end);

  // let start_date = new Date(start_date_x.getFullYear(), start_date_x.getMonth() + 1, start_date_x.getDate());
  // let end_date = new Date(end_date_x.getFullYear(), end_date_x.getMonth() + 1, end_date_x.getDate());

  if (start_date >= end_date) {
    res.status(400).json({ message: "Invalid range!" });
    return;
  }

  try {
    await dbConnect();

    const allUsers = await User.find({ is_admin: false });
    if (!allUsers || allUsers.lenght == 0) {
      res.status(200).json({});
      return;
    }

    const allIronUsers = [...(await Promise.all(allUsers.map(async (u) => await dbUserToIronUser(u))))];

    const result = allIronUsers.map((u) => {
      if (!isIronUserAssigned(u)) {
        return {
          name: u.first_name + " " + u.last_name,
          email: u.email,
          picture: u.has_picture ? "/uploads/" + u.picture : u.picture,
          is_assigned: false,
        };
      }

      const work_units_in_period = u.work_data.work.filter((w) => {
        let end = w.end_time ? w.end_time : new Date();
        return Date(w.start_time) >= start_date && new Date(end) <= end_date;
      });

      console.log(work_units_in_period);

      const work_data_to_hours = (w) => {
        let end = w.end_time ? w.end_time : new Date();
        return Math.abs(new Date(end) - new Date(w.start_time)) / 36e5;
      };

      console.log(work_data_to_hours);

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
        picture: u.has_picture ? "/uploads/" + u.picture : u.picture,
        is_assigned: true,
        status: isIronUserWorking(u),
        actual_work: actual_work.toFixed(2),
        expected_work: ((u.work_data.expected_hours_weekly / 7) * days).toFixed(2),
        salaries,
      };
    });

    res.status(200).json({ data: result });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}, authCookie);
