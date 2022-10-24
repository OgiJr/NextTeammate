import { withIronSessionApiRoute } from "iron-session/next";
import Chat from "../../models/Chat";
import { isLoggedIn, isSupportedMethod } from "../../lib/validation";
import { dbConnect } from "../../lib/db";
import { authCookie } from "../../lib/cookies";
import mime from "mime-types";
import { createDecipheriv, createHash } from "crypto";
import { readFileSync } from "fs";
import { gunzipSync } from "zlib";

export default withIronSessionApiRoute(async function sendMessage(req, res) {
  try {
    isSupportedMethod(req, res, ["GET"]);
    isLoggedIn(req, res);
  } catch (e) {
    return;
  }

  const { _id } = req.query;
  const user_id = req.session.user._id;

  try {
    dbConnect();
    const result = await Chat.findOne({ _id });

    if (!result || result.type !== "FILE") {
      res.status(404).json({ message: "No such file!" });
      return;
    }

    if (result.sender.toString() !== user_id && result.receiver.toString() !== user_id) {
      res.status(404).json({ message: "No such file!" });
      return;
    }

    const mime_type = mime.lookup(result.og_filename);

    const key = createHash("sha256").update(String(process.env.ENCRYPTION_PASSWORD)).digest("base64").substring(0, 32);
    const iv = createHash("sha256").update(String(result.og_filename)).digest("base64").substring(0, 16);
    const cipher = createDecipheriv("aes-256-ctr", key, iv);

    let fb = readFileSync(result.file);
    let decryptedData = Buffer.concat([cipher.update(fb), cipher.final()]);

    fb = gunzipSync(decryptedData);

    res.setHeader("Content-Type", mime_type);
    res.setHeader("Content-Disposition", `attachment; filename=${result.og_filename}`);
    res.status(200);
    res.send(fb);
    return;
  } catch (e) {
    console.log();
    res.status(400).json({ message: e.message });
    return;
  }
}, authCookie);
