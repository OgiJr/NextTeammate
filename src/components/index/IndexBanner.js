import Link from "next/link";
import React from "react";

const IndexBanner = () => {
  return (
    <div
      className="bg-banner relative z-1"
      style={{
        backgroundImage: "url(assets/images/banner/index-banner.jpg)",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-10 relative z-1">
            <div className="banner_text">
              <h1 className="title thm-color-white wow fadeInDown" data-wow-delay=".20ms">
                Hire\Find your NextTeammate with the click of a button.
              </h1>
              <Link href="/about">
                <button className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rectangle ml-0">
                  Learn More
                  <i className="fal fa-chevron-right ml-2" />
                </button>
              </Link>
            </div>
            <img src="assets/images/elements/circle3.png" alt="element" className="element_1 slideRightTwo" />
            <img src="assets/images/elements/circle3.png" alt="element" className="element_2 zoom-fade" />
            <img src="assets/images/elements/circle3big.png" alt="element" className="element_3 rotate_elem" />
            <img src="assets/images/elements/circle3.png" alt="element" className="element_4 rotate_elem" />
          </div>
        </div>
        <div className="think_box wow fadeInDown" data-wow-delay=".50ms"></div>
      </div>
    </div>
  );
};

export default IndexBanner;
