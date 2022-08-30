import { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import Counter from "../src/components/Counter";
import FooterContact from "../src/components/FooterContact";
import PageTitleBanner from "../src/components/PageTitleBanner";
import VideoPopup from "../src/components/VideoPopup";
import Layout from "../src/layout/Layout";

const TeamDetails = () => {
  const [video, setVideo] = useState(false);
  return (
    <Layout>
      <PageTitleBanner pageName="User Panel" />
      {video && <VideoPopup close={() => setVideo(false)} />}

      <section className="section-padding team_details">
        <div className="container rounded-[16px] bg-gradient-to-r from-white via-slate-100 to-blue-500">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="team_img mb-md-80">
                <img
                  src="assets/images/team/user-panel-photo.jpeg"
                  alt="img"
                  className="image-fit wow fadeInLeft rounded-[12px]"
                />
                <div className="video_warp">
                  <img
                    src="assets/images/team/about-user.jpeg"
                    alt="img"
                    className="image-fit wow fadeInDown rounded-[10px]"
                  />
                  <a
                    onClick={() => setVideo(true)}
                    href="#"
                    className="video_btn popup-youtube transform-center"
                  >
                    <i className="icon fal fa-play video_icon bg-thm-color-three mx-auto" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="team_text pl-0 pl-xl-5 pl-lg-3 ">
                <h3 className="name wow fadeInDown">Collins</h3>
                <p className="desi thm-color-two wow fadeInUp">Elizabeth Collins</p>
                <ul className="social mb-xl-30 wow fadeInDown">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-behance" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-youtube" />
                    </a>
                  </li>
                </ul>
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
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      class="content-center px-10 p-3.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-500 hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Clock In
                    </button>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterContact />
    </Layout>
  );
};

export default TeamDetails;
