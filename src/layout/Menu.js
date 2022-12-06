import Link from "next/link";
import { Fragment } from "react";
import React from "react";

export const HomeMenu = ({ language }) => (
  <Fragment>
    <li className="menu-item">
      <Link href={language == "en" ? "/become-a-teammate" : "/become-a-teammate-bg"}>
        {language == "en" ? "Become a Teammate" : "Търся работа"}
      </Link>
    </li>
    <li className="menu-item">
      <Link href={language == "en" ? "/i-want-to-find-teammate" : "/i-want-to-find-teammate-bg"}>
        {language == "en" ? "Find my Teammate" : "Търся служители"}
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
