import { useState } from "react";
import PageTitleBanner from "../src/components/PageTitleBanner";
import VideoPopup from "../src/components/VideoPopup";
import Layout from "../src/layout/Layout";
import React from "react";
import WorkTeam from "../src/components/work/WorkTeam";
import { dbConnect, dbUserToIronUser } from "../lib/db";
import User from "../models/User";
import Footer from "../src/layout/Footer";

export const getServerSideProps = async () => {
  dbConnect();

  const users = await User.find({ is_admin: false });
  const ironUsers = [
    ...(await Promise.all(users.map(async (u) => await dbUserToIronUser(u)))),
  ];

  return {
    props: { users: ironUsers },
  };
};

const About = ({ users }) => {
  const [video, setVideo] = useState(false);
  return (
    <Layout>
      <PageTitleBanner
        pageName="About Us"
        url="assets/images/banner/about-banner.JPG"
      />
      {video && <VideoPopup close={() => setVideo(false)} />}
      <section className="section about_inner">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6">
              <div className="image_box  mb-md-80 wow fadeInLeft ">
                <img
                  src="assets/images/about/peopleanalutics.png"
                  alt="img"
                  className="image-fit"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="section-title left-align wow fadeInDown">
                <p className="subtitle">
                  <i className="fal fa-book" />
                  About Us
                </p>
                <h3 className="title">
                  We will take care of the entire employment process:
                </h3>
                <p>
                  Our main priority is to make your life easier so you can focus
                  on your business.
                </p>
              </div>
              <ul className="about_list row">
                <li className="col-md-6 wow fadeInUp">
                  <div className="icon">
                    <img
                      src="assets/images/icons/money-bag-dynamic-gradient copy.png"
                      alt="img"
                      className="image-fit"
                    />
                  </div>
                  <div className="text">
                    <h6 className="mb-2">Payroll</h6>
                    {/* <p className="mb-0">
                      Quis autem reprehenderit quein voluptate velit esseua
                    </p> */}
                  </div>
                </li>
                <li className="col-md-6 wow fadeInDown">
                  <div className="icon">
                    <img
                      src="assets/images/icons/sheild-dynamic-gradient copy.png"
                      alt="img"
                      className="image-fit"
                    />
                  </div>
                  <div className="text">
                    <h6 className="mb-2">Health insurance benefits</h6>
                    {/* <p className="mb-0">
                      Quis autem reprehenderit quein voluptate velit esseua
                    </p> */}
                  </div>
                </li>
                <li className="col-md-6 wow fadeInUp">
                  <div className="icon">
                    <img
                      src="assets/images/icons/fav-folder-dynamic-gradient copy.png"
                      alt="img"
                      className="image-fit"
                    />
                  </div>
                  <div className="text">
                    <h6 className="mb-2">Management</h6>
                    {/* <p className="mb-0">
                      Quis autem reprehenderit quein voluptate velit esseua
                    </p> */}
                  </div>
                </li>
                <li className="col-md-6 wow fadeInDown">
                  <div className="icon">
                    <img
                      src="assets/images/icons/wifi-dynamic-gradient copy.png"
                      alt="img"
                      className="image-fit"
                    />
                  </div>
                  <div className="text">
                    <h6 className="mb-2">Built in scheduling software</h6>
                    {/* <p className="mb-0">
                      Quis autem reprehenderit quein voluptate velit esseua
                    </p> */}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section-bg about_bg about style_2"
        style={{
          backgroundImage: "url(assets/images/dfqwerrfdddddftgfgfgf.png)",
        }}
      >
        <div className="container">
          <div className="row justify-content-between flex-row-reverse">
            <div className="col-lg-6">
              <div className="image_boxes style_2 relative z-1 h-100">
                <div className="flex">
                  <img src="assets/images/about/workingwomen1.png" alt="img" />
                </div>
                {/* elements */}
                <img
                  src="assets/images/elements/circle3.png"
                  className="element_1"
                  alt="Element"
                />
                <img
                  src="assets/images/elements/circle3.png"
                  className="element_2 rotate_elem"
                  alt="Element"
                />
                <img
                  src="assets/images/elements/circle3.png"
                  className="element_3 rotate_elem"
                  alt="Element"
                />
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 mb-md-80 text-white">
              <div className="section-title left-align wow fadeInUp">
                <p className="subtitle">
                  <i className="fal fa-book text-white" />
                  What to expect
                </p>
                <h3 className="title text-white">
                  Other facilities that we can offer:
                </h3>
                {/* <p className="mb-0">
                  Quis autem vel eum iure reprehenderit qui in ea voluptate esse
                  quam nihil molestiae conseq uaturvel illum qui dolorem eum
                  fugiat quo voluptas nulla pariatur{" "}
                </p> */}
              </div>
              <ul className="about_list style_2 mb-xl-30 wow fadeInDown">
                <li>Online secure conference platform</li>
                <li>Secure and encrypted file sharing platform</li>
                <li>American phone number for the employee</li>
                <li>Laptops computers and various working equipment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* About Us End */}
      {/* Team Start */}
      <WorkTeam users={users} />
      <Footer />
    </Layout>
  );
};

export default About;
