import Link from "next/dist/client/link";
import { Fragment, useState } from "react";
import { HomeMenu } from "./Menu";
import { LogButton } from "./LogButton";

import React from "react";

const MobileMenu = ({ closeMobileMenu, showMobileMenu, language }) => {
  const [activeMenu, setActiveMenu] = useState("");
  const activeFun = (name) => setActiveMenu(name === activeMenu ? "" : name);
  const activeLi = (name) =>
    name === activeMenu ? { display: "block" } : { display: "none" };
  return (
    <Fragment>
      <aside
        className={`aside_bar aside_bar_left aside_mobile ${
          showMobileMenu ? "open" : ""
        }`}
      >
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
              <Link href={language == "en" ? "/" : "/index-bg"}>
                {language == "en" ? "Home" : "Начало"}
              </Link>
            </li>
            <li className="menu-item menu-item-has-children">
              <a onClick={() => activeFun("Pages")}>
                {language == "en" ? "Services" : "Услуги"}
              </a>
              <ul className="sub-menu" style={activeLi("Pages")}>
                <HomeMenu language={language} />
              </ul>
            </li>
            <li className="menu-item">
              <a href={language == "en" ? "/about" : "/about-bg"}>
                {language == "en" ? "About Us" : "За нас"}
              </a>
            </li>
            <li className="menu-item">
              <a href={language == "en" ? "/tc" : "/tc-bg"}>
                {language == "en" ? "Terms and Conditions" : "Права и условия"}
              </a>
            </li>
            <li className="menu-item">
              <a href={language == "en" ? "/contact" : "/contact-bg"}>
                {language == "en" ? "Contacts" : "Контакти"}
              </a>
            </li>
            <li className="menu-item">
              <a href="/">English</a>
            </li>
            <li className="menu-item">
              <a href="/index-bg">Български</a>
            </li>
            <li className="menu-item mt-10">
              <LogButton language={language} />
            </li>
          </ul>
        </nav>

        {/* Menu */}
      </aside>
      <div
        className="aside-overlay trigger-left"
        onClick={() => closeMobileMenu()}
      ></div>
    </Fragment>
  );
};

export default MobileMenu;
