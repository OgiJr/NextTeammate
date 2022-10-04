import Counter from "../Counter";
import React from "react";

const IndexSkills = () => {
  return (
    <section className="skills-sec relative z-1">
      <div className="container-fluid p-0 h-100">
        <div className="row no-gutters h-100">
          <div className="col-lg-6">
            <div
              className="section-bg bg-thm-color-one h-100"
              // style={{ backgroundImage: "url(assets/images/bg/dsico2.png)" }}
            />
          </div>
          <div className="col-lg-6">
            <img src="assets/images/hui.png" className="image-fit" alt="img" />
          </div>
        </div>
      </div>
      <div className="transform-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title left-align white wow fadeInUp">
                <p className="subtitle">
                  <i className="fal fa-book" />
                  Our Company
                </p>
                <h3 className="title">
                  We&apos;re An Award Winning Outsourcing Company
                </h3>
                <p className="thm-color-white">
                  We believe that the future holds remote work and a financial
                  system without borders. In our modern era a vicinity
                  constraint is absolutely pointless and only slows us down.
                  We&apos;re building tools to accelerate this transition to
                  remote work and help your business grow.
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-center flex-wrap gap-4">
              <div className="row justify-content-center ">
                <div className="col-md-4 col-sm-6 flex flex-row justify-center flex-wrap gap-4 ">
                  <div
                    className="progress_box grid wow fadeInDown lg:min-h-full"
                    data-wow-delay=".20ms"
                  >
                    <div
                      className="circle_bar"
                      data-percent={97}
                      data-track-color="#ecf2ff"
                      data-bar-color="#4b83fb"
                      data-size={80}
                    >
                      <div className="counter transform-center text-center ">
                        <Counter end={100} />
                      </div>
                    </div>
                    <div className="text">
                      <h5 className="mb-0 ">
                        Happy
                        <br />
                        Customers
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div
                    className="progress_box grid wow fadeInUp lg:min-h-full"
                    data-wow-delay=".30ms"
                  >
                    <div
                      className="circle_bar"
                      data-percent={97}
                      data-track-color="#ecf2ff"
                      data-bar-color="#65cfa9"
                      data-size={80}
                    >
                      <div className="counter transform-center text-center">
                        <Counter end={100} />
                      </div>
                    </div>
                    <div className="text">
                      <h5 className="mb-0">
                        Happy
                        <br />
                        Customers
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div
                    className="progress_box grid fadeInDown lg:min-h-full"
                    data-wow-delay=".40ms"
                  >
                    <div
                      className="circle_bar"
                      data-percent={97}
                      data-track-color="#ecf2ff"
                      data-bar-color="#ffbd3f"
                      data-size={80}
                    >
                      <div className="counter transform-center text-center">
                        <Counter end={100} />
                      </div>
                    </div>
                    <div className="text">
                      <h5 className="mb-0">
                        Happy
                        <br />
                        Customers
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexSkills;
