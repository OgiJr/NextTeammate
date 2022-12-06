import Link from "next/link";
import React from "react";
import { NextSeo } from "next-seo";

const IndexBanner = () => {
  return (
    <div
      className="bg-banner relative z-1"
      style={{
        backgroundImage: "url(assets/images/banner/index-banner.jpg)",
      }}
      alt="people"
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-10 relative z-1">
            <div className="banner_text">
              <h1 className="title thm-color-white wow fadeInDown" data-wow-delay=".20ms">
                <NextSeo
                  title="Find your NextTeammate with the click of a button"
                  description="This example uses more of the available config options."
                  nextteammate="https://nextteammate.com/"
                  openGraph={{
                    url: "https://nextteammate.com/",
                    title: "NextTeammate",
                    description: "Outsorcing company",
                    images: [
                      {
                        url: "https://nextteammate.com/assets/images/banner/index-banner.jpg)",
                        width: 5744,
                        height: 3829,
                        alt: "Og Image Alt",
                        type: "image/jpg",
                      },
                      {
                        url: "https://nextteammate.com/assets/images/banner/index-banner.jpg",
                        width: 360,
                        height: 360,
                        alt: "Og Image Alt Second",
                        type: "image/jpeg",
                      },
                    ],
                    siteName: "HomePage",
                  }}
                  twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                  }}
                />
                Find your NextTeammate with the click of a button.
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
