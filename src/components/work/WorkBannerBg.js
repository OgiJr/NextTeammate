import Link from "next/link";

import React from "react";

const WorkBanner = () => {
  return (
    <div
      style={{
        backgroundImage: "url('assets/images/banner/work-banner.jpg')",
        backgroundSize: "cover",
      }}
      className="md:bg-transparent banner relative z-1"
    >
      <img
        src="assets/images/banner/banner_i_want_work.png"
        className="element_1"
        alt="Element"
      />
      <img
        src="assets/images/banner/work-banner.jpg"
        className="element_1 max-h-full min-w-full hidden lg:flex"
        alt="Element Line"
      />
      {/* Texts */}
      <div className="transform-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="text_box">
                <h3
                  className="title wow fadeInUp text-white"
                  data-wow-delay=".30ms"
                >
                  <span>Работете в американски компании</span> от комфорта на
                  Вашия дом.
                </h3>
                <p className="wow fadeInUp text-white" data-wow-delay=".40ms">
                  Nextteammate е тук, за да се погрижи за целия процес на
                  наемане на работа - от намирането на подходящ за вас
                  работодател/компания до администрирането на заплатите и
                  здравните осигуровки.
                </p>
                <Link href="/contact-bg">
                  <a
                    className="thm-btn bg-thm-color-three thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
                    data-wow-delay=".50ms"
                  >
                    Присъединете се към нашия отбор{" "}
                    <i className="fal fa-chevron-right ml-2" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="image_box relative wow fadeInRight"
                data-wow-delay=".80ms"
              >
                <img
                  src="assets/images/banner/smart.png"
                  alt="img"
                  className="image-fit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Line */}
      <div className="bottom-line container" />
    </div>
  );
};

export default WorkBanner;
