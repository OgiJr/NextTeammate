import { withIronSessionApiRoute } from "iron-session/next";
import { authCookie } from "../../lib/cookies";
import { isAdmin, isLoggedIn, isSupportedMethod } from "../../lib/validation";
import { dbConnect } from "../../lib/db";
import User from "../../models/User";
import IncomingForm from "formidable/src/Formidable";
import { v4 as uuidv4 } from "uuid";
import { copyFileSync, mkdirSync } from "fs";
import rateLimit from "../../lib/rateLimit";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 1000,
});

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

export default withIronSessionApiRoute(async function setPictureRoute(req, res) {
  try {
    await limiter.check(res, 100, "CHANGE_CV");
  } catch {
    res.status(429).json({ message: "Too many messages. Don't spam!" });
    return;
  }

  let reqBody;
  try {
    await isLoggedIn(req, res);
    isAdmin(req, res);
    isSupportedMethod(req, res, ["POST"]);
    reqBody = await asyncParse(req);
  } catch (e) {
    return;
  }

  const cv = reqBody.files.cv;
  const email = reqBody.fields.email;
  if (!email || !cv) {
    res.status(400).json({ message: "Invalid request!" });
    return;
  }

  const cv_id = `${uuidv4()}.${cv.originalFilename.split(".").pop()}`;

  const filedir = `${process.cwd()}/uploads/`;
  const filepath = `${filedir}${cv_id}`;

  mkdirSync(filedir, { recursive: true });
  copyFileSync(cv.filepath, filepath);
  // renameSync(picture.filepath, filepath);

  try {
    await dbConnect();

    const result = await User.findOne({ email });

    if (!result) {
      res.status(401).json({ message: "Invalid user!" });
      return;
    }

    await User.findOneAndUpdate({ email }, { $set: { cv: cv_id } }, { new: true });

    res.status(200).json({});
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }
}, authCookie);
