import { Fragment, useEffect, useState } from "react";
import { aTagClick, pieChart, scrollTop } from "../utils";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import ScrollTop from "./ScrollTop";

import React from "react";

const Layout = ({
  children,
  noHeaderTop,
  sticky,
  sideBar,
  headerStyle,
  absolute,
  language,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    aTagClick();
    window.addEventListener("scroll", scrollTop);
  });
  useEffect(() => {
    pieChart("circle_bar");
  }, []);

  return (
    <Fragment>
      <MobileMenu
        closeMobileMenu={() => setMobileMenuOpen(false)}
        showMobileMenu={mobileMenuOpen}
        language={language}
      />
      <Header
        language={language}
        openMobileMenu={() => setMobileMenuOpen(true)}
        noHeaderTop={noHeaderTop}
        sticky={sticky}
        sideBar={sideBar}
        headerStyle={headerStyle}
        absolute={absolute}
      />
      {children}
      <ScrollTop />
    </Fragment>
  );
};

export default Layout;
