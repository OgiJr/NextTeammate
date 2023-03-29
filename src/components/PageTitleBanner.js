import Link from "next/link";
import React from "react";

import dots from "../../public/assets/images/elements/dots.png";
import circle3 from "../../public/assets/images/elements/circle3.png";
import circle3big from "../../public/assets/images/elements/circle3big.png";
import Image from "next/image";

const PageTitleBanner = ({ pageName, title, url = "assets/images/carlos-muza-hpjSkU2UYSU-unsplash.jpg" }) => {
  return (
    <div className="subheader relative z-1" style={{ backgroundImage: "url(" + url + ")" }}>
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
        <Image src={dots} alt="element" className="element_1 slideRightTwo" />
        <Image src={circle3} alt="element" className="element_2 zoom-fade" />
        <Image src={circle3big} alt="element" className="element_3 rotate_elem" />
        <Image src={circle3} alt="element" className="element_4 rotate_elem" />
      </div>
    </div>
  );
};

export default PageTitleBanner;
