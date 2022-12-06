import WorkAbout from "../src/components/work/WorkAboutBg";
import WorkBanner from "../src/components/work/WorkBannerBg";
import WorkTeam from "../src/components/work/WorkTeamBg";
import Layout from "../src/layout/Layout";
import React from "react";
import { dbConnect, dbUserToIronUser } from "../lib/db";
import User from "../models/User";
import Footer from "../src/layout/FooterBg";

export const getServerSideProps = async () => {
  await dbConnect();

  const users = await User.find({ is_admin: false });
  const ironUsers = [...(await Promise.all(users.map(async (u) => await dbUserToIronUser(u))))];

  return {
    props: { users: ironUsers },
  };
};

const IWantToWork = ({ users }) => {
  return (
    <Layout language={"bg"}>
      <WorkBanner />
      <WorkAbout />
      <WorkTeam users={users} />
      <Footer />
    </Layout>
  );
};

export default IWantToWork;
