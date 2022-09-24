import Link from "next/link";

import React from "react";

const HireBanner = () => {
  return (
    <div className="single_banner bg-thm-color-two-gradient relative z-1 min-h-screen">
      <img
        src="assets/images/elements/element_8.png"
        alt="element"
        className="element_1"
      />
      <div className="transform-center banne_text">
        <div className="container relative z-1">
          <div className="row">
            <div className="col-xl-6 col-lg-7 relative z-1">
              <div className="banner_text">
                <span
                  className="tag_badge style_2 bg-thm-color-white thm-color-two wow fadeInUp"
                  data-wow-delay=".40ms"
                >
                  I want to hire
                </span>
                <h1 className="title wow fadeInDown" data-wow-delay=".50ms">
                  Hire a professional
                </h1>
                <p className="wow fadeInUp" data-wow-delay=".60ms">
                  Our main priority is to make your life easier so you can focus
                  on your business.
                </p>
                <Link href="/contact">
                  <a
                    className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rounded mr-2 mb-2 wow afdeInLeft"
                    data-wow-delay=".70ms"
                  >
                    Hire <i className="fal fa-chevron-right ml-10 " />
                  </a>
                </Link>
              </div>
              <img
                src="assets/images/elements/circle3.png"
                className="element_4 rotate_elem"
                alt="img"
              />
              <img
                src="assets/images/elements/circle3.png"
                className="element_5 rotate_elem"
                alt="img"
              />
            </div>
          </div>
          <img
            src="assets/images/elements/circle3.png"
            className="element_2 slideRightTwo"
            alt="img"
          />
          <img
            src="assets/images/elements/circle3.png"
            className="element_3 zoom-fade"
            alt="img"
          />
        </div>
      </div>
      <div className="shape_img relative flex flex-col justify-center">
        <img
          src="assets/images/banner/women.png"
          className="wow fadeInDown"
          alt="img"
        />
      </div>
    </div>
  );
};

export default HireBanner;