import Link from "next/link";
import React from "react";
import { NextSeo } from "next-seo";

import guerillabuzz from "../../../public/assets/images/elements/guerrillabuzz-crypto-pr-T9rKvI3N0NM-unsplash.jpg";
import circle3 from "../../../public/assets/images/elements/circle3.png";
import Image from "next/image";

const HireBanner = () => {
  return (
    <div
      className="single_banner bg-thm-color-two-gradient relative z-1 lg:min-h-screen"
      style={{
        backgroundImage: "url('assets/images/elements/guerrillabuzz-crypto-pr-T9rKvI3N0NM-unsplash.jpg')",
        backgroundSize: "cover",
      }}
    >
      <Image src={guerillabuzz} alt="element" className="element_1" />
      <div className="transform-center banne_text">
        <div className="container relative z-1">
          <div className="row">
            <div className="col-xl-6 col-lg-7 relative z-1">
              <div className="banner_text">
                <NextSeo
                  title="Find a teammate"
                  description="Nextteammate provides end to end employment solutions – from screening the potential candidates, payroll and health insurance benefits to management and built-in scheduling software."
                  nextteammate="https://nextteammate.com"
                  openGraph={{
                    url: "https://nextteammate.com/i-want-to-find-teammate",
                    title: "Find a professional",
                    description: "Professional outsourcing company",
                    images: [
                      {
                        url: "https://nextteammate.com/assets/images/elements/guerrillabuzz-crypto-pr-T9rKvI3N0NM-unsplash.jpg",
                        width: 3840,
                        height: 2160,
                        alt: "Og Image Alt",
                        type: "image/jpeg",
                      },
                      {
                        url: "	https://nextteammate.com/assets/images/adam-nowakowski-D4LDw5eXhgg-unsplash.jpg",
                        width: 390,
                        height: 585,
                        alt: "Og Image Alt Second",
                        type: "image/jpeg",
                      },
                    ],
                    siteName: "NextTeammate",
                  }}
                  twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                  }}
                />

                <span
                  className="tag_badge style_2 bg-thm-color-white thm-color-two wow fadeInUp"
                  data-wow-delay=".40ms"
                >
                  Find a Teammate
                </span>
                <h1 className="title wow fadeInDown text-white" data-wow-delay=".50ms">
                  Find a professional
                </h1>
                <p className="wow fadeInUp text-white font-normal hover:font-bold" data-wow-delay=".60ms">
                  Our main priority is to make your life easier so you can focus on your business.
                </p>
                <Link href="/contact">
                  <a
                    className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rounded mr-2 mb-2 wow afdeInLeft"
                    data-wow-delay=".70ms"
                  >
                    Contact <i className="fal fa-chevron-right ml-10 " />
                  </a>
                </Link>
              </div>
              <Image src={circle3} className="element_4 rotate_elem" alt="img" />
              <Image src={circle3} className="element_5 rotate_elem" alt="img" />
            </div>
          </div>
          <Image src={circle3} className="element_2 slideRightTwo" alt="img" />
          <Image src={circle3} className="element_3 zoom-fade" alt="img" />
        </div>
      </div>
    </div>
  );
};

export default HireBanner;
