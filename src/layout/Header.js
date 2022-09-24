import Link from "next/dist/client/link";
import { Fragment, useEffect } from "react";
import { stickyNav } from "../utils";
import { HomeMenu, PageMenu } from "./Menu";
import { LogButton } from "./LogButton";

import React from "react";

const Header = ({ openMobileMenu, sticky, headerStyle, absolute }) => {
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
                  <Link href="/">
                    <a>
                      <img src="assets/images/nextlogo.png" alt="logo" className="header-image" />
                    </a>
                  </Link>
                </div>
                <ul className="main-menu">
                  <li className="menu-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="menu-item menu-item-has-children">
                    <a href="#">Services</a>
                    <ul className="sub-menu">
                      <HomeMenu />
                    </ul>
                  </li>
                  <li className="menu-item menu-item-has-children">
                    <a href="#">About Us</a>
                    <ul className="sub-menu">
                      <PageMenu />
                    </ul>
                  </li>
                  <li className="menu-item">
                    <a href="/contact">Contacts</a>
                  </li>
                </ul>
                <div className="head_actions">
                  <LogButton />

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
