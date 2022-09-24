import WorkAbout from "../src/components/work/WorkAbout";
import WorkBanner from "../src/components/work/WorkBanner";
import WorkTeam from "../src/components/work/WorkTeam";
import Layout from "../src/layout/Layout";
import React from "react";
import { dbConnect, dbUserToIronUser } from "../lib/db";
import User from "../models/User";

export const getServerSideProps = async () => {
  dbConnect();

  const users = await User.find({ is_admin: false });
  const ironUsers = [...users.map((u) => dbUserToIronUser(u))];

  console.log(ironUsers);

  return {
    props: { users: ironUsers },
  };
};

const IWantToWork = ({ users }) => {
  return (
    <Layout>
      <WorkBanner />
      <WorkAbout />
      <WorkTeam users={users} />
    </Layout>
  );
};

export default IWantToWork;
