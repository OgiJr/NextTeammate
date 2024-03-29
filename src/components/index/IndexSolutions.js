import Image from "next/image";
import React from "react";

import bulb from "../../../public/assets/images/icons/bulb-dynamic-color.png";
import chart from "../../../public/assets/images/icons/chart-dynamic-gradient.png";
import rocket from "../../../public/assets/images/icons/rocket-dynamic-gradient copy.png";

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
                  <Image src={bulb} alt="icon" />
                </div>
                <h5>Goal</h5>
                <p>
                  Our goal is to provide a motivated prospective team member to an US Company and to enable the best
                  possible interaction between them, both during the approval process and throughout their entire
                  collaboration relationship.
                </p>
              </div>
            </div>
            <div className="lg:!max-w-[25%]">
              <div className="features_box style_2 wow fadeInUp lg:min-h-[100%]" data-wow-delay=".30ms">
                <div className="icon">
                  <Image src={chart} alt="icon" />
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
                  <Image src={rocket} alt="icon" />
                </div>
                <h5>Vision</h5>
                <p>
                  Our vision is to build a strong connection between the team members and the US company which leads to
                  high effectiveness and at the same time helping both sides.
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
