import { withIronSessionApiRoute } from "iron-session/next";
import User from "../../models/User";
import Chat from "../../models/Chat";
import { isLoggedIn, isSupportedMethod, reqBodyParse } from "../../lib/validation";
import { dbConnect } from "../../lib/db";
import { authCookie } from "../../lib/cookies";
import rateLimit from "../../lib/rateLimit";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 1000,
});

export default withIronSessionApiRoute(async function sendMessage(req, res) {
  let reqBody;
  try {
    isSupportedMethod(req, res, ["POST"]);
    await isLoggedIn(req, res);
    reqBody = reqBodyParse(req, res, ["sender", "receiver", "type"]);
  } catch (e) {
    return;
  }

  const { sender, receiver, type } = reqBody;
  if (req.session.user._id !== sender) {
    res.status(401).json({ message: "Can't send a message from someone else!" });
    return;
  }

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

  let receiverUser;
  try {
    await dbConnect();

    receiverUser = await User.findOne({ _id: receiver });
    if (!receiverUser) {
      res.status(401).json({ message: "No such recepient!" });
      return;
    }

    if (type === "TEXT") {
      const { text } = req.body;
      if (!text) {
        res.status(400).json({ message: "Empty message!" });
        return;
      }

      await Chat.create({
        sender,
        receiver,
        type,
        text,
        timestamp: new Date(Date.now()),
      });

      res.status(200).json({});
      return;
    } else {
      res.status(400).json({ message: "Unsupported message type" });
      return;
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }
}, authCookie);
