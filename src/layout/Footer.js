import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-thm-color-one style_2 style_3 z-1" style={{ backgroundImage: "url(assets/images/elements/element_18.png)" }}>
      <div className="container relative z-1">
        <div className="footer_top pt-20">
          <div className="flex flex-row justify-start flex-wrap">
            <div className="col-lg-3 col-md-6">
              <div className="ft_widget ft_about wow fadeInDown">
                <Link href="/">
                  <a className="logo">
                    <img src="assets/images/nextlogof.png" alt="logo" className="image-fit" />
                  </a>
                </Link>
              </div>
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
                      <a href="/faqs">Terms and Conditions</a>
                    </li>
                    <li>
                      <a href="/contact">Contacts</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/i-want-to-work">I want to work</a>
                    </li>
                    <li>
                      <a href="/i-want-to-hire">I want to hire</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col min-w-[30rem]">
              <h6 className="text-white text-3xl">Contacts</h6>
              <ul className="info text-white">
                <li>
                  402 E Pennsylvania blvd
                  <br />
                  Feasterville PA 19053
                </li>
                <li>
                  <a href="tel:+12672658100">+12672658100</a>
                </li>
                <li>
                  <a href="mailto:example@example.com"> nextteammateltd@gmail.com</a>
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
        <img src="assets/images/elements/circle3.png" alt="element" className="element_3 rotate_elem" />
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
