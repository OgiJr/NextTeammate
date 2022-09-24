import Link from "next/dist/client/link";
import { Fragment, useState } from "react";
import { HomeMenu } from "./Menu";

import React from "react";

const MobileMenu = ({ closeMobileMenu, showMobileMenu }) => {
  const [activeMenu, setActiveMenu] = useState("");
  const activeFun = (name) => setActiveMenu(name === activeMenu ? "" : name);
  const activeLi = (name) => (name === activeMenu ? { display: "block" } : { display: "none" });
  return (
    <Fragment>
      <aside className={`aside_bar aside_bar_left aside_mobile ${showMobileMenu ? "open" : ""}`}>
        {/* logo */}
        <Link href="/">
          <a className="logo">
            <img src="assets/images/mobile_banner.png" alt="logo" />
          </a>
        </Link>
        {/* logo */}
        {/* Menu */}
        <nav>
          <ul className="main-menu">
            <li className="menu-item">
              <Link href="/">Home</Link>
            </li>
            <li className="menu-item menu-item-has-children">
              <a onClick={() => activeFun("Pages")}>Services</a>
              <ul className="sub-menu" style={activeLi("Pages")}>
                <HomeMenu />
              </ul>
            </li>
            <li className="menu-item">
              <a href="/about">About Us</a>
            </li>
            <li className="menu-item">
              <a href="/tc">Terms and Conditions</a>
            </li>
            <li className="menu-item">
              <a href="/contact">Contacts</a>
            </li>
          </ul>
        </nav>

        {/* Menu */}
      </aside>
      <div className="aside-overlay trigger-left" onClick={() => closeMobileMenu()}></div>
    </Fragment>
  );
};

export default MobileMenu;
