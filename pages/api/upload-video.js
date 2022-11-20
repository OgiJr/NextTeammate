import { withIronSessionApiRoute } from "iron-session/next";
import { authCookie } from "../../lib/cookies";
import { isLoggedIn, isSupportedMethod } from "../../lib/validation";
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
    const form = new IncomingForm({ multiples: true, maxFileSize: 1000 * 1024 * 1024 });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export default withIronSessionApiRoute(async function sendPictureRoute(req, res) {
  let reqBody;
  try {
    isLoggedIn(req, res);
    isSupportedMethod(req, res, ["POST"]);
    reqBody = await asyncParse(req);
  } catch (e) {
    return;
  }

  const user = req.session.user;
  const sender = user._id;
  const file = reqBody.files.file;

  try {
    await limiter.check(res, 100, sender);
  } catch {
    res.status(429).json({ message: "Too many messages. Don't spam!" });
    return;
  }

  if (file.size > 1000 * 1024 * 1024) {
    res.status(400).json({ message: "File too big!" });
    return;
  }

  try {
    await dbConnect();

    let userDB = await User.findOne({ _id: sender });
    if (!userDB) {
      res.status(401).json({ message: "No such user!" });
      return;
    }

    const file_id = uuidv4();
    const filedir = `${process.cwd()}/uploads/`;
    const extension = file.originalFilename.split(".").pop();
    const filepath = `${filedir}${file_id}.${extension}`;

    mkdirSync(filedir, { recursive: true });
    copyFileSync(file.filepath, filepath);

    await User.findOneAndUpdate({ _id: sender }, { video: filepath });

    res.status(200).json({});
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }
}, authCookie);
