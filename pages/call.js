import React from "react";
import { JaaSMeeting } from "@jitsi/react-sdk";
import { withIronSessionSsr } from "iron-session/next";
import { authCookie } from "../lib/cookies";
import { generate } from "../lib/jwt";
import { v4 as uuidv4 } from "uuid";
import { readFileSync } from "fs";

const Zoom = ({ room_name, token }) => {
  return (
    <div className="w-[100vw] h-[100vh]">
      <JaaSMeeting
        style={{ height: "100%" }}
        className="h-full"
        appId={process.env.NEXT_PUBLIC_JITSI_APP_ID}
        roomName={room_name}
        jwt={token}
        configOverwrite={{
          disableThirdPartyRequests: true,
          disableLocalVideoFlip: true,
          backgroundAlpha: 0.5,
        }}
        interfaceConfigOverwrite={{
          VIDEO_LAYOUT_FIT: "nocrop",
          MOBILE_APP_PROMO: false,
          TILE_VIEW_MAX_COLUMNS: 4,
        }}
        invitees={[]}
        getIFrameRef={(node) => ((node.style.height = "100%"), (node.style.width = "100%"))}
      />
    </div>
  );
};

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, query }) {
  const user = req.session.user;

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
    avatar: `${process.env.URI}${req.session.user.picture}`,
    appId: process.env.NEXT_PUBLIC_JITSI_APP_ID,
    kid: process.env.JITSI_KID,
  });

  return {
    props: { room_name, token },
  };
}, authCookie);

export default Zoom;
