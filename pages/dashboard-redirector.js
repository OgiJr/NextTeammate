import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import { authCookie } from "../lib/cookies";

const Dashboard = () => {
  return <></>;
};

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req }) {
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

  if (user.is_admin) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard-admin",
      },
      props: {},
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard-user",
      },
      props: {},
    };
  }
}, authCookie);

export default Dashboard;
