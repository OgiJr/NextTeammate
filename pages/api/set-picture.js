import { withIronSessionApiRoute } from "iron-session/next";
import { authCookie } from "../../lib/cookies";
import { isLoggedIn, isSupportedMethod } from "../../lib/validation";
import { dbConnect, dbUserToIronUser } from "../../lib/db";
import User from "../../models/User";
import IncomingForm from "formidable/src/Formidable";
import { v4 as uuidv4 } from "uuid";
import { mkdirSync, renameSync, rmSync } from "fs";

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
  let reqBody;
  try {
    isLoggedIn(req, res);
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

  const filedir = `${process.cwd()}/public/uploads/`;
  const filepath = `${filedir}/${picture_id}`;

  mkdirSync(filedir, { recursive: true });
  renameSync(picture.filepath, filepath);

  if (user.has_picture) {
    rmSync(`${filedir}/${user.picture}`);
  }

  try {
    await dbConnect();

    const result = await User.findOne({ email: user.email });

    if (!result) {
      res.status(401).json({ message: "Invalid user!" });
      return;
    }

    const newUser = await User.findOneAndUpdate({ email: user.email }, { $set: { picture: picture_id } });

    req.session.user = dbUserToIronUser(newUser);
    await req.session.save();

    res.status(200).json({});
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }
}, authCookie);
