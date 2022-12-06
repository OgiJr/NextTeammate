import React from "react";

const IndexSolutions = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title wow fadeInUp mv-rigj">
              <p className="subtitle">
                <i className="fal fa-book" />
                Our Goal
              </p>
              <h3 className="title">We Provide Professional Business Solutions.</h3>
              <p className="text-bold text-lg">
                Improved technology, low overhead costs, and the 2020 global pandemic have encouraged businesses of all
                sizes and in a variety of fields to create more online collaboration opportunities.
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-center flex-wrap gap-4">
            <div className="lg:!max-w-[25%] ">
              <div className="features_box style_2 wow fadeInDown lg:min-h-full" data-wow-delay=".20ms">
                <div className="icon">
                  <img src="assets/images/icons/bulb-dynamic-color.png" alt="icon" width={80} />
                </div>
                <h5>Goal</h5>
                <p>
                  Our goal is to connect job seekers with employers and to enable the best possible interaction between
                  them, both during the hiring process and throughout their entire collaboration relationship.
                </p>
              </div>
            </div>
            <div className="lg:!max-w-[25%]">
              <div className="features_box style_2 wow fadeInUp lg:min-h-[100%]" data-wow-delay=".30ms">
                <div className="icon">
                  <img src="assets/images/icons/chart-dynamic-gradient.png" alt="icon" width={80} />
                </div>
                <h5>Mission</h5>
                <p>
                  Our mission is to provide an easy and seamless communication system, suitable and accessible for both
                  parties.
                </p>
              </div>
            </div>
            <div className="lg:!max-w-[25%]">
              <div className="features_box style_2 wow fadeInDown lg:min-h-full" data-wow-delay=".40ms">
                <div className="icon">
                  <img src="assets/images/icons/rocket-dynamic-gradient copy.png" alt="icon" width={80} />
                </div>
                <h5>Vision</h5>
                <p>
                  Our vision is to build international connections between employers and employees which lead to high
                  effectiveness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexSolutions;
