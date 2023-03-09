import { withIronSessionApiRoute } from "iron-session/next";
import Company from "../../models/Company";
import { isAdmin, isLoggedIn, isSupportedMethod } from "../../lib/validation";
import { dbConnect } from "../../lib/db";
import { authCookie } from "../../lib/cookies";
import IncomingForm from "formidable/src/Formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const asyncParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export default withIronSessionApiRoute(async function createCompany(req, res) {
  let reqBody;
  try {
    isSupportedMethod(req, res, ["POST"]);
    await isLoggedIn(req, res);
    isAdmin(req, res);
    reqBody = await asyncParse(req);
  } catch (e) {
    return;
  }

  const dropbox = reqBody.fields.dropbox;
  const company_id = reqBody.fields.company_id;

  if (!dropbox || !company_id) {
    res.status(400).json({ message: "Please fill at least one field!" });
    return;
  }

  try {
    await dbConnect();

    await Company.findByIdAndUpdate(company_id, {
      dropbox,
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
