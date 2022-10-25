import { withIronSessionApiRoute } from "iron-session/next";
import { authCookie } from "../../lib/cookies";
import { isLoggedIn, isSupportedMethod } from "../../lib/validation";
import { dbConnect } from "../../lib/db";
import User from "../../models/User";
import IncomingForm from "formidable/src/Formidable";
import { v4 as uuidv4 } from "uuid";
import Chat from "../../models/Chat";
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { createCipheriv, createHash } from "crypto";
import rateLimit from "../../lib/rateLimit";
import { gzipSync } from "zlib";

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
  const receiver = reqBody.fields.receiver;
  const og_filename = file.originalFilename;

  if (sender === receiver) {
    res.status(401).json({ message: "Can't send message to self!" });
    return;
  }

  try {
    await limiter.check(res, 100, sender);
  } catch {
    res.status(429).json({ message: "Too many messages. Don't spam!" });
    return;
  }

  if (file.size > 100 * 1024 * 1024) {
    res.status(400).json({ message: "File too big!" });
    return;
  }

  try {
    await dbConnect();

    let receiverUser = await User.findOne({ _id: receiver });
    if (!receiverUser) {
      res.status(401).json({ message: "No such recepient!" });
      return;
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }

  const file_id = uuidv4();
  const filedir = `${process.cwd()}/public/uploads/`;
  const filepath = `${filedir}/${file_id}`;

  mkdirSync(filedir, { recursive: true });
  copyFileSync(file.filepath, filepath);
  rmSync(file.filepath);
  // renameSync(file.filepath, filepath);

  const key = createHash("sha256").update(String(process.env.ENCRYPTION_PASSWORD)).digest("base64").substring(0, 32);
  const iv = createHash("sha256").update(String(og_filename)).digest("base64").substring(0, 16);
  const cipher = createCipheriv("aes-256-ctr", key, iv);

  let fb = readFileSync(filepath);
  fb = gzipSync(fb);
  let encryptedData = Buffer.concat([cipher.update(fb), cipher.final()]);

  writeFileSync(filepath + ".enc", encryptedData);
  rmSync(filepath);

  try {
    await dbConnect();

    await Chat.create({
      sender,
      receiver,
      type: "FILE",
      file: filepath + ".enc",
      og_filename,
      timestamp: new Date(Date.now()),
    });

    res.status(200).json({});
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }
}, authCookie);
