import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { withIronSessionSsr } from "iron-session/next";
import { authCookie } from "../lib/cookies";
import { generate } from "../lib/jwt";
import { v4 as uuidv4 } from "uuid";
import { readFileSync } from "fs";
import { isUserEmailInDb } from "../lib/db";

const Zoom = ({ room_name, display_name }) => {
  return (
    <div className="w-[100vw] h-[100vh]">
      <JitsiMeeting
        domain={process.env.NEXT_PUBLIC_JITSI_DOMAIN}
        roomName={room_name}
        displayName={display_name}
        getIFrameRef={(node) => (node.style.height = "100vh")}
      />
    </div>
  );
};

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, query }) {
  const user = req.session.user;

  if (!isUserEmailInDb(user.email)) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  const room_name = query.room_name;

  if (!room_name) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  const pk = readFileSync("keys/jitsi.pk");

  const token = generate(pk, {
    id: uuidv4(),
    name: `${req.session.user.first_name} ${req.session.user.last_name}`,
    email: req.session.user.email,
    avatar: `${process.env.URI}/${req.session.user.picture}`,
    appId: process.env.NEXT_PUBLIC_JITSI_APP_ID,
    kid: process.env.JITSI_KID,
  });
  return {
    props: { room_name, token, display_name: `${req.session.user.first_name} ${req.session.user.last_name}` },
  };
}, authCookie);

export default Zoom;
