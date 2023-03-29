import { withIronSessionApiRoute } from "iron-session/next";
import Company from "../../models/Company";
import { isEmployer, isLoggedIn, isSupportedMethod } from "../../lib/validation";
import { v4 as uuidv4 } from "uuid";
import { dbConnect } from "../../lib/db";
import { authCookie } from "../../lib/cookies";
import IncomingForm from "formidable/src/Formidable";
import { mkdirSync, copyFileSync, readFileSync, writeFileSync } from "fs";
import sharp from "sharp";

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
  const dropbox = reqBody.fields.dropbox;

  if (!picture && !dropbox) {
    res.status(400).json({ message: "Please fill at least one field!" });
    return;
  }

  let picture_id;
  if (picture) {
    picture_id = `${uuidv4()}.${picture.mimetype === "image/png" ? "png" : "jpg"}`;
    if (picture.mimetype !== "image/png" && picture.mimetype !== "image/jpeg") {
      res.status(400).json({ message: "Invalid file type! Upload .png or .jpg files!" });
      return;
    }

    const filedir = `${process.cwd()}/uploads/`;
    const filepath = `${filedir}${picture_id}`;

    mkdirSync(filedir, { recursive: true });
    copyFileSync(picture.filepath, filepath);
    // renameSync(picture.filepath, filepath);

    mkdirSync(filedir, { recursive: true });
    copyFileSync(picture.filepath, filepath);
    // renameSync(picture.filepath, filepath);

    const photo_data = readFileSync(filepath);
    const photo_buffer = await sharp(photo_data).withMetadata().webp().toBuffer();

    picture_id = picture_id.slice(0, -4) + ".webp";
    const new_filepath = `${filedir}${picture_id}`;
    writeFileSync(new_filepath, photo_buffer);
  }

  try {
    await dbConnect();

    if (picture) {
      await Company.findByIdAndUpdate(req.session.user.company._id, {
        picture: picture_id,
      });
    } else {
      await Company.findByIdAndUpdate(req.session.user.company._id, {
        dropbox,
      });
    }

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
