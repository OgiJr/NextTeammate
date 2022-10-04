import React from "react";

const WorkAbout = () => {
  return (
    <section className="section-padding pt-0 about mt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-7 col-lg-6">
            <div className="image_box wow fadeInLeft">
              <img
                src="assets/images/about/working-team.png"
                alt="img"
                className="image-fit image_1 rounded-circle"
              />
              <img
                src="assets/images/about/analytics.png"
                alt="img"
                className="image-fit image_2 rounded-circle"
              />
            </div>
          </div>
          <div className="col-xl-5 col-lg-6">
            <div className="section-title left-align wow fadeInUp">
              <p className="subtitle">
                <i className="fal fa-book" />
                What We Provide
              </p>
              <h3 className="title">Benefits:</h3>
            </div>
            <ul className="about_list">
              <li className=" wow fadeInDown">
                <div className="icon">
                  <img
                    src="assets/images/icons/medal-dynamic-gradient copy.png"
                    alt="img"
                    className="image-fit"
                  />
                </div>
                <div className="text">
                  <h6 className="mb-2">Why work from home</h6>
                  <p className="mb-0">
                    There are a few key benefits of working from home (WFH).
                    Employees who WFH often have a better work-life-balance and
                    often are more because they don&#39;t spend time commuting
                    into the office and can get their work done quicker in a
                    focused environment. Plus, WFH provides environmental
                    benefits.
                  </p>
                </div>
              </li>
              <li className=" wow fadeInDown">
                <div className="icon">
                  <img
                    src="assets/images/icons/target-dynamic-gradient copy.png"
                    alt="img"
                    className="image-fit"
                  />
                </div>
                <div className="text">
                  <h6 className="mb-2">Connections</h6>
                  <p className="mb-0">
                    You will have the opportunity to connect with big American
                    companies and establish yourself on the international
                    market.
                  </p>
                </div>
              </li>
              <li className=" wow fadeInDown">
                <div className="icon">
                  <img
                    src="assets/images/icons/wallet-dynamic-gradient copy.png"
                    alt="img"
                    className="image-fit"
                  />
                </div>
                <div className="text">
                  <h6 className="mb-2">Meet the American Standarts</h6>
                  <p className="mb-0">
                    We provide a salary according to American standards.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkAbout;
