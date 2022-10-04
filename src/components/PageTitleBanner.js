import Link from "next/link";
import React from "react";

const PageTitleBanner = ({
  pageName,
  title,
  url = "assets/images/carlos-muza-hpjSkU2UYSU-unsplash.jpg",
}) => {
  return (
    <div
      className="subheader relative z-1"
      style={{ backgroundImage: "url(" + url + ")" }}
    >
      <div className="container relative z-1">
        <div className="row">
          <div className="col-12">
            <h1 className="page_title">{title ? title : pageName}</h1>
            <div className="page_breadcrumb">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {pageName}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <img
          src="assets/images/elements/dots.png"
          alt="element"
          className="element_1 slideRightTwo"
        />
        <img
          src="assets/images/elements/circle3.png"
          alt="element"
          className="element_2 zoom-fade"
        />
        <img
          src="assets/images/elements/circle3big.png"
          alt="element"
          className="element_3 rotate_elem"
        />
        <img
          src="assets/images/elements/circle3.png "
          alt="element"
          className="element_4 rotate_elem"
        />
      </div>
    </div>
  );
};

export default PageTitleBanner;
