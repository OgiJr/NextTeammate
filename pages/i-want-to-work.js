import WorkAbout from "../src/components/work/WorkAbout";
import WorkBanner from "../src/components/work/WorkBanner";
import WorkTeam from "../src/components/work/WorkTeam";
import Layout from "../src/layout/Layout";
import React from "react";
import { dbConnect, dbUserToIronUser } from "../lib/db";
import User from "../models/User";
import Footer from "../src/layout/Footer";

export const getServerSideProps = async () => {
  dbConnect();

  const users = await User.find({ is_admin: false });
  const ironUsers = [...(await Promise.all(users.map(async (u) => await dbUserToIronUser(u))))];

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
      <Footer />
    </Layout>
  );
};

export default IWantToWork;
