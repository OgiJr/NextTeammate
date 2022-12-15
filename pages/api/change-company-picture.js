import { withIronSessionApiRoute } from "iron-session/next";
import Company from "../../models/Company";
import { isEmployer, isLoggedIn, isSupportedMethod } from "../../lib/validation";
import { v4 as uuidv4 } from "uuid";
import { dbConnect } from "../../lib/db";
import { authCookie } from "../../lib/cookies";
import IncomingForm from "formidable/src/Formidable";
import { mkdirSync, copyFileSync } from "fs";

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
    isEmployer(req, res);
    reqBody = await asyncParse(req);
  } catch (e) {
    return;
  }

  const picture = reqBody.files.logo;

  const picture_id = `${uuidv4()}.${picture.mimetype === "image/png" ? "png" : "jpg"}`;
  if (picture.mimetype !== "image/png" && picture.mimetype !== "image/jpeg") {
    res.status(400).json({ message: "Invalid file type! Upload .png or .jpg files!" });
    return;
  }

  const filedir = `${process.cwd()}/uploads/`;
  const filepath = `${filedir}${picture_id}`;

  mkdirSync(filedir, { recursive: true });
  copyFileSync(picture.filepath, filepath);
  // renameSync(picture.filepath, filepath);

  try {
    await dbConnect();

    console.log(picture_id);
    await Company.findByIdAndUpdate(req.session.user.company._id, {
      picture: picture_id,
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
