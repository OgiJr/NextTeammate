import { Fragment, useEffect, useState } from "react";
import { animation, aTagClick, pieChart, scrollTop } from "../utils";
import Footer from "./Footer";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import ScrollTop from "./ScrollTop";

import React from "react";

const Layout = ({ children, noHeaderTop, sticky, sideBar, headerStyle, absolute }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    aTagClick();
    window.addEventListener("scroll", scrollTop);
  });
  useEffect(() => {
    animation();
    pieChart("circle_bar");
  }, []);
  return (
    <Fragment>
      <MobileMenu closeMobileMenu={() => setMobileMenuOpen(false)} showMobileMenu={mobileMenuOpen} />
      <Header
        openMobileMenu={() => setMobileMenuOpen(true)}
        noHeaderTop={noHeaderTop}
        sticky={sticky}
        sideBar={sideBar}
        headerStyle={headerStyle}
        absolute={absolute}
      />
      {children}
      <Footer />
      <ScrollTop />
    </Fragment>
  );
};

export default Layout;
