import Image from "next/image";
import Link from "next/link";
import React from "react";

import nextlogof from "../../public/assets/images/nextlogof.png";

const Footer = () => {
  return (
    <footer
      className="footer bg-thm-color-one style_2 style_3 z-1"
      style={{ backgroundImage: "url(assets/images/elements/element_18.png)" }}
    >
      <div className="container relative z-1">
        <div className="footer_top pt-20">
          <div className="flex flex-row justify-start flex-wrap">
            <div className="ft_widget ft_about wow fadeInDown">
              <Link href="/">
                <a className="logo">
                  <Image src={nextlogof} alt="logo" className="image-fit" />
                </a>
              </Link>
            </div>

            <div className="flex flex-row justify-start">
              <div className="flex flex-col min-w-[30rem]">
                <h6 className="text-white text-3xl">Navigation</h6>
                <div className="ft_widget ft_menu wow fadeInUp flex flex-row gap-10">
                  <ul>
                    <li>
                      <a href="/about">About Us</a>
                    </li>
                    <li>
                      <a href="/tc">Terms and Conditions</a>
                    </li>
                    <li>
                      <a href="/contact">Contact Us</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/become-a-teammate">Become a Teammate</a>
                    </li>
                    <li>
                      <a href="/i-want-to-find-teammate">Find a Teammate</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col min-w-[30rem]">
              <h6 className="text-white text-3xl">Contact Us</h6>
              <ul className="info text-white">
                <li>
                  <b>USA</b>
                </li>
                <li>402 E Pennsylvania blvd Feasterville PA 19053</li>
                <li>
                  <a href="tel:+12672080020">+1 267-208-0020</a>
                </li>
                <br />
                <li>
                  <b>Bulgaria</b>
                </li>
                <li>
                  ul. &quot;Boris Rumenov&quot; 16, 1407 <br /> Promishlena Zona Hladilnika, Sofia
                </li>
                <li>
                  <a href="tel:+359884188911">+359 88 4188911</a>
                </li>
                <br />
                <li>
                  <a href="mailto:contact@nextteammate.com">contact@nextteammate.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <p className="mb-0">
            © 2022 <a href="https://javery.bg/">Javery</a>. All Rights Reserved, Design By Javery.
          </p>
        </div>
        <div className="arrows to_up slideTop">
          <div className="arrow" />
          <div className="arrow" />
          <div className="arrow" />
          <div className="arrow" />
          <div className="arrow" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
