import { withIronSessionSsr } from "iron-session/next";
import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";
import { authCookie } from "../lib/cookies";
import PageTitleBanner from "../src/components/PageTitleBanner";
import Layout from "../src/layout/Layout";
import { dbConnect, dbUserToIronUser } from "../lib/db";
import User from "../models/User";

const DashboardUser = ({ user }) => {
  return (
    <Layout>
      <PageTitleBanner pageName="User Panel" />

      <section className="section-padding team_details">
        <div className="container rounded-[16px] bg-gradient-to-r from-white via-slate-100 to-blue-500">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="flex flex-row justify-center">
                <img
                  src={`/uploads/${user.picture}`}
                  alt="img"
                  className="image-fit wow fadeInLeft rounded-[12px] max-w-[40%]"
                />
              </div>
            </div>
            <div className="col-lg-6 my-4">
              <div className="team_text pl-0 pl-xl-5 pl-lg-3 ">
                <h3 className="name wow fadeInDown">{user.first_name + " " + user.last_name}</h3>
                <p className="desi thm-color-two wow fadeInUp">{user.bio}</p>
                <ul className="info wow fadeInDown">
                  <li>
                    <i className="icon fal fa-clock bg-thm-color-three" />
                    <div className="text">
                      <h6 className="mb-0">Expected hours per week:</h6>
                      <p className="mb-0">30 hours</p>
                    </div>
                  </li>
                  <li>
                    <i className="icon fal fa-lightbulb-on" />
                    <div className="text">
                      <h6 className="mb-0">Work hours this week:</h6>
                      <p className="mb-0">27.9 hours</p>
                    </div>
                  </li>
                  <li>
                    <i className="icon fal fa-calendar-week" />
                    <div className="text">
                      <h6 className="mb-0">Average hours per week:</h6>
                      <p className="mb-0">31.2 hours</p>
                    </div>
                  </li>
                  <li>
                    <i className="icon fal fa-calendar" />
                    <div className="text">
                      <h6 className="mb-0">Work hours this month:</h6>
                      <p className="mb-0">122 hours</p>
                    </div>
                  </li>
                  <li>
                    <i className="icon fal fa-dollar-sign" />
                    <div className="text">
                      <h6 className="mb-0">Projected Salary:</h6>
                      <p className="mb-0">$2133.35</p>
                    </div>
                  </li>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center justify-center">
                      <Button variant="success" className="px-4 text-2xl">
                        Clock In
                      </Button>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-4">
                      <Link href="/edit-user">
                        <Button variant="primary" className="px-4">
                          Edit Account
                        </Button>
                      </Link>
                      <Link href="/set-picture">
                        <Button variant="primary" className="px-4">
                          Change Picture
                        </Button>
                      </Link>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
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
    try {
      dbConnect();

      const newUser = await User.findOne({ email: user.email });
      req.session.user = dbUserToIronUser(newUser);
      await req.session.save();

      return {
        props: {
          user: req.session.user,
        },
      };
    } catch (e) {
      return {
        props: { user },
      };
    }
  }
}, authCookie);

export default DashboardUser;
