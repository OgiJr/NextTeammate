import { withIronSessionApiRoute } from "iron-session/next";
import { isLoggedIn, isSupportedMethod } from "../../lib/validation";
import { dbConnect } from "../../lib/db";
import { authCookie } from "../../lib/cookies";
import Chat from "../../models/Chat";
import ChatTimestamp from "../../models/ChatTimestamp";
import ChatLatestPing from "../../models/ChatLatestPing";
import User from "../../models/User";

export default withIronSessionApiRoute(async function hasUnread(req, res) {
  try {
    isSupportedMethod(req, res, ["GET"]);
    await isLoggedIn(req, res);
  } catch (e) {
    return;
  }

  try {
    await dbConnect();

    let unread = false;
    let ping = false;

    // check for all users
    const allUsers = await User.find();
    for (const u of allUsers) {
      // find last chat message, if not, continue
      const latest_chat_message = (
        await Chat.find({ sender: u._id, receiver: req.session.user._id }).sort({ timestamp: -1 }).limit(1)
      )[0];
      if (!latest_chat_message) continue;

      // find the last seen timestamp and the last notification ping
      const timestamp_marker = (await ChatTimestamp.find({ accessor: req.session.user._id, target: u._id }))[0];

      // if never seen or hasn't seen this message
      if (!timestamp_marker || new Date(timestamp_marker.timestamp) < new Date(latest_chat_message.timestamp)) {
        unread = true;

        // now check if we should ping
        const latest_ping = (await ChatLatestPing.find({ user: req.session.user._id }))[0];
        if (!latest_ping || new Date(latest_ping.timestamp) < new Date(latest_chat_message.timestamp)) {
          ping = true;
          await ChatLatestPing.findOneAndUpdate(
            { user: req.session.user._id },
            { $set: { timestamp: new Date() } },
            { upsert: true }
          );
        }
      }
    }

    res.status(200).json({ unread, ping });
  } catch (e) {
    res.status(400).json({ message: e.message });
    return;
  }
}, authCookie);
