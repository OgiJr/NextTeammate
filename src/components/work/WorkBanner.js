import Link from "next/link";
import { useState } from "react";
import VideoPopup from "../VideoPopup";

import React from "react";

const WorkBanner = () => {
  const [video, setVideo] = useState(false);

  return (
    <div
      className="banner relative z-1"
      style={{ zIndex: video ? "999" : "1" }}
    >
      {video && (
        <VideoPopup close={() => setVideo(false)} videoID="TKnufs85hXk" />
      )}
      <img
        src="assets/images/banner/element_1.png"
        className="element_1"
        alt="Element"
      />
      <img
        src="assets/images/banner/work-banner.JPG"
        className="element_line"
        alt="Element Line"
      />
      {/* Texts */}
      <div className="transform-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="text_box">
                <h1
                  className="title wow fadeInUp text-white"
                  data-wow-delay=".30ms"
                >
                  <span>Join our</span> awesome team!
                </h1>
                <p className="wow fadeInUp text-white" data-wow-delay=".40ms">
                  Do you want to join a professional team of innovators,
                  creators, and free thinkers?
                </p>
                <Link href="/contact">
                  <a
                    className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
                    data-wow-delay=".50ms"
                  >
                    Contact Us
                    <i className="fal fa-chevron-right ml-2" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-6"></div>
          </div>
        </div>
      </div>
      {/* Bottom Line */}
      <div className="bottom-line container" />
    </div>
  );
};

export default WorkBanner;
