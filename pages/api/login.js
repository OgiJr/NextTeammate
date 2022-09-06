import { withIronSessionApiRoute } from "iron-session/next";
import * as bcrypt from "bcryptjs";
import dbConnect from "../../lib/dbConnect";
import isPresent from "../../lib/isPresent";
import User from "../../models/User";

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    if (req.method !== "POST") {
      res.status(405).json({ message: "Unsupported request type!" });
      return;
    }

    const { email, password } = req.body;

    if (!isPresent(email) || !isPresent(password)) {
      res.status(400).json({ message: "Missing fields!" });
      return;
    }

    try {
      await dbConnect();

      const result = await User.findOne({ email });

      if (!result || !bcrypt.compareSync(password, result.password_hash)) {
        res.status(401).json({ message: "Wrong username or password!" });
        return;
      }

      req.session.user = {
        _id: result._id.toString(),
        first_name: result.first_name,
        last_name: result.last_name,
        is_admin: result.is_admin,
        employees: res.employees ? res.employees.map((_id) => _id.toString()) : null,
      };
      await req.session.save();
      console.log(req.session.user);
      res.status(200).send("ok");
    } catch (e) {
      res.status(400).json({ message: e.message });
      return;
    }
  },
  {
    cookieName: "nextteammate_auth",
    password: process.env.COOKIE_PASS,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
