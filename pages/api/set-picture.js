import { withIronSessionApiRoute } from "iron-session/next";
import { authCookie } from "../../lib/cookies";
import { isLoggedIn, isSupportedMethod } from "../../lib/validation";
import { dbConnect, dbUserToIronUser } from "../../lib/db";
import User from "../../models/User";
import IncomingForm from "formidable/src/Formidable";
import { v4 as uuidv4 } from "uuid";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import rateLimit from "../../lib/rateLimit";
import sharp from "sharp";

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
    await limiter.check(res, 100, "CHANGE_PIC");
  } catch {
    res.status(429).json({ message: "Too many messages. Don't spam!" });
    return;
  }

  let reqBody;
  try {
    await isLoggedIn(req, res);
    isSupportedMethod(req, res, ["POST"]);
    reqBody = await asyncParse(req);
  } catch (e) {
    return;
  }

  const user = req.session.user;
  const picture = reqBody.files.picture;
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

  const photo_data = readFileSync(filepath);
  const photo_buffer = await sharp(photo_data).withMetadata().webp().toBuffer();

  const new_picture_id = picture_id.slice(0, -4) + ".webp";
  const new_filepath = `${filedir}${new_picture_id}`;
  writeFileSync(new_filepath, photo_buffer);

  try {
    await dbConnect();

    const result = await User.findOne({ email: user.email });

    if (!result) {
      res.status(401).json({ message: "Invalid user!" });
      return;
    }

    const newUser = await User.findOneAndUpdate(
      { email: user.email },
      { $set: { picture: new_picture_id } },
      { new: true }
    );

    req.session.user = await dbUserToIronUser(newUser);
    await req.session.save();

    res.status(200).json({});
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }
}, authCookie);
