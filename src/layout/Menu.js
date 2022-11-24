import Link from "next/link";
import { Fragment } from "react";
import React from "react";

export const HomeMenu = ({ language }) => (
  <Fragment>
    <li className="menu-item">
      <Link href={language == "en" ? "/i-want-to-work" : "/i-want-to-work-bg"}>
        {language == "en" ? "I Want to Work" : "Търся работа"}
      </Link>
    </li>
    <li className="menu-item">
      <Link href={language == "en" ? "/i-want-to-hire" : "/i-want-to-hire-bg"}>
        {language == "en" ? "I Want to Hire" : "Търся служители"}
      </Link>
    </li>
  </Fragment>
);
export const PageMenu = ({ language }) => (
  <Fragment>
    <li className="menu-item">
      <Link href={language == "en" ? "/about" : "about-bg"}>{language == "en" ? "About" : "Кои сме ние"}</Link>
    </li>
    <li className="menu-item">
      <Link href={language == "en" ? "/tc" : "tc-bg"}>
        {language == "en" ? "Terms and Conditions" : "Права и условия"}
      </Link>
    </li>
  </Fragment>
);

export const LanguageMenu = () => <></>;
