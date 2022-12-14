import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import { authCookie } from "../lib/cookies";
import { isUserEmailInDb } from "../lib/db";

const Dashboard = () => {
  return <></>;
};

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req }) {
  const user = req.session.user;

  // if not logged in
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  if (!(await isUserEmailInDb(user.email))) {
    req.session.destroy();
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  // if admin
  if (user.is_admin) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard-admin",
      },
      props: {},
    };
  }

  // if employer or employee and no picture
  if (!user.has_picture) {
    return {
      redirect: {
        permanent: false,
        destination: "/set-picture",
      },
      props: {},
    };
  }

  // if employer
  if (user.is_employer) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard-employer",
      },
    };
  }

  // if user
  return {
    redirect: {
      permanent: false,
      destination: "/dashboard-user",
    },
    props: {},
  };
}, authCookie);

export default Dashboard;
