import Link from "next/dist/client/link";
import { Fragment, useEffect } from "react";
import { stickyNav } from "../utils";
import { HomeMenu, PageMenu } from "./Menu";
import { LogButton } from "./LogButton";
import React from "react";

import nextlogo from "../../public/assets/images/nextlogo.png";
import Image from "next/image";

const Header = ({ openMobileMenu, sticky, headerStyle, absolute, language }) => {
  useEffect(() => {
    window.addEventListener("scroll", stickyNav);
  });

  return (
    <Fragment>
      <header
        className={`header ${absolute ? "header-absolute1" : ""}  ${
          headerStyle ? `header-${headerStyle}` : "header-3"
        }  ${sticky ? "header-absolute1 can-sticky" : ""}`}
        id="header-sticky"
      >
        <div className="nav_sec">
          <div className="container">
            <div className="nav_warp">
              <nav>
                <div className="logo">
                  <Link href={language == "en" ? "/" : "index-bg"}>
                    <a>
                      <Image src={nextlogo} alt="logo" className="header-image" width={100} height={100} />
                    </a>
                  </Link>
                </div>
                <ul className="main-menu">
                  <li className="menu-item">
                    <a href={language == "en" ? "/" : "/index-bg"}>{language == "en" ? "Home" : "Начало"}</a>
                  </li>
                  <li className="menu-item menu-item-has-children">
                    <a href="#">{language == "en" ? "Services" : "Услуги"}</a>
                    <ul className="sub-menu">
                      <HomeMenu language={language} />
                    </ul>
                  </li>
                  <li className="menu-item menu-item-has-children">
                    <a href="#">{language == "en" ? "About Us" : "За нас"}</a>
                    <ul className="sub-menu">
                      <PageMenu language={language} />
                    </ul>
                  </li>
                  <li className="menu-item">
                    <a href={language == "en" ? "/contact" : "/contact-bg"}>
                      {language == "en" ? "Contact Us" : "Контакти"}
                    </a>
                  </li>
                </ul>
                <div className="head_actions">
                  <LogButton language={language} />

                  <button type="button" className="head_trigger mobile_trigger" onClick={() => openMobileMenu()}>
                    <span />
                    <span />
                    <span />
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
