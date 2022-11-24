import Layout from "../src/layout/Layout";
import React from "react";
import { withIronSessionSsr } from "iron-session/next";
import { authCookie } from "../lib/cookies";
import Footer from "../src/layout/Footer";
import { dbConnect, isUserEmailInDb } from "../lib/db";
import User from "../models/User";
import { cdnSubpath } from "../lib/cdn";

const SetPicture = ({ video_url, name }) => {
  return (
    <Layout language={"en"}>
      <div className="flex flex-row justify-center min-w-full">
        <div className="flex flex-col justify-center min-w-full items-center justify-items-center">
          <div
            className="bg-gray-100 lg:w-[40vw] w-[80vw] py-8 mb-8 !border-sky-600 px-8"
            style={{ borderWidth: 4, borderStyle: "solid", borderRadius: 20 }}
          >
            <div className="text-center min-w-full text-4xl font-semibold">Video: {name}</div>
            <div className="flex flex-col justify-center items-center">
              <video className="w-[100%]" controls>
                <source src={cdnSubpath() + video_url} />
              </video>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
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

  if (!(await isUserEmailInDb(user.email))) {
    req.session.destroy();
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  if (!query.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  if (!user.is_admin && query.id !== user._id) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  dbConnect();
  const video_user = await User.findOne({ _id: query.id });
  if (!video_user || !video_user.video) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      video_url: video_user.video.split("/").pop(),
      name: video_user.first_name + " " + video_user.last_name,
    },
  };
}, authCookie);

export default SetPicture;
