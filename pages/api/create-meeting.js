import { withIronSessionApiRoute } from "iron-session/next";
import { isLoggedIn, isSupportedMethod, reqBodyParse } from "../../lib/validation";
import { authCookie } from "../../lib/cookies";
import { google } from "googleapis";
import { v4 as uuidv4 } from "uuid";
import google_service_account from "../../google_service_account.json";

export default withIronSessionApiRoute(async function workRoute(req, res) {
  try {
    isSupportedMethod(req, res, ["POST"]);
    await isLoggedIn(req, res);
    reqBodyParse(req, res, ["room_name", "attendees"]);
  } catch (e) {
    return;
  }

  const room_name = req.body.room_name;
  const attendees = req.body.attendees;

  const auth = new google.auth.JWT({
    email: google_service_account.client_email,
    key: google_service_account.private_key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
    subject: "admin@poped.app",
  });

  const calendar = google.calendar({ version: "v3", auth });

  const event = {
    summary: room_name,
    location: "Online",
    description: "Meeting with your teammate",
    colorId: 1,
    conferenceData: {
      createRequest: {
        requestId: room_name + uuidv4(),
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
    start: {
      dateTime: new Date(Date.now()).toISOString(),
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
      timeZone: "America/Los_Angeles",
    },
    attendees: attendees.map((attendee) => {
      return { email: attendee };
    }),
  };

  const link = await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    resource: event,
  });

  res.status(200).json({ link: link.data.hangoutLink });
}, authCookie);
