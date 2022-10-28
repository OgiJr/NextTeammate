import { withIronSessionApiRoute } from "iron-session/next";
import User from "../../models/User";
import Chat from "../../models/Chat";
import {
  isLoggedIn,
  isSupportedMethod,
  reqBodyParse,
} from "../../lib/validation";
import { dbChatToChat, dbConnect } from "../../lib/db";
import { authCookie } from "../../lib/cookies";
import rateLimit from "../../lib/rateLimit";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 1000,
});

export default withIronSessionApiRoute(async function sendMessage(req, res) {
  let reqQuery;
  try {
    isSupportedMethod(req, res, ["GET"]);
    isLoggedIn(req, res);
    reqQuery = reqBodyParse(req, res, ["sender", "receiver"]);
  } catch (e) {
    return;
  }

  const { sender, receiver } = reqQuery;
  if (req.session.user._id !== sender) {
    res.status(401).json({ message: "Can't get messages from someone else!" });
    return;
  }

  if (sender === receiver) {
    res.status(401).json({ message: "Can't get message to self!" });
    return;
  }

  try {
    await limiter.check(res, 100, sender);
  } catch {
    res.status(429).json({ message: "Too many attempts. Don't spam!" });
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

    const { from } = req.query;
    if (!from) {
      const { to } = req.query;
      if (!to) {
        const chats1 = await Chat.find({ sender, receiver });
        const chats2 = await Chat.find({ sender: receiver, receiver: sender });
        const chats = [...chats1, ...chats2];
        chats.sort(function (x, y) {
          return x.timestamp - y.timestamp;
        });
        res.status(200).json({
          chats: await Promise.all(chats.map((c) => dbChatToChat(c))),
        });
        return;
      }

      const chats = await Chat.find({ timestamp: { $lte: new Date(to) } });
      res
        .status(200)
        .json({ chats: await Promise.all(chats.map((c) => dbChatToChat(c))) });
      return;
    } else {
      const { to } = req.query;
      if (!to) {
        const chats = await Chat.find({ timestamp: { $gte: new Date(from) } });
        res.status(200).json({
          chats: await Promise.all(chats.map((c) => dbChatToChat(c))),
        });
        return;
      }

      const chats = await Chat.find({
        timestamp: { $gte: new Date(from), $lte: new Date(to) },
      });
      res
        .status(200)
        .json({ chats: await Promise.all(chats.map((c) => dbChatToChat(c))) });
      return;
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }
}, authCookie);
