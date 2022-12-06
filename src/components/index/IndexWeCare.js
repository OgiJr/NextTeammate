import Link from "next/link";

import React from "react";

const IndexWeCare = () => {
  return (
    <section
      className="section section-bg about_bg about style_2"
      style={{ backgroundImage: "url(assets/images/bg/gradient.png)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div className="section-title left-align wow fadeInDown">
              <p className="subtitle">
                <i className="fal fa-book" />
                Our goal
              </p>
              <h3 className="title">We Care About Your Business.</h3>
              <p className="mb-0">
                Nextteammate was created to facilitate the employment process for both the company and the employees. We
                provide foreign employment and a new and complete Collaborate from Home (CFH) / (bpo) system which is
                easy, reliable, secure, and most importantly, cost effective.
              </p>
            </div>
            <ul className="about_list style_2 mb-xl-30 wow fadeInUp">
              <li>Collaborate from Home </li>
              <li>Easy, Reliable, Secure</li>
              <li>Cost effective</li>
            </ul>
            <Link href="/i-want-to-find-teammate">
              <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rectangle wow fadeInDown">
                Learn More
                <i className="fal fa-chevron-right ml-2" />
              </a>
            </Link>
          </div>
          <div className="col-lg-5">
            <div className="image_boxes relative z-1 mb-md-10 h-max">
              <img src="assets/images/about/peoplepeople123.png" className="lg:flex wow fadeInDown" alt="img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexWeCare;
