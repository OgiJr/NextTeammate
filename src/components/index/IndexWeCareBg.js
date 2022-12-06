import Link from "next/link";

import React from "react";

const IndexWeCare = () => {
  return (
    <section
      className="section section-bg about_bg about style_2"
      style={{ backgroundImage: "url(assets/images/bg/gradient.png)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div className="section-title left-align wow fadeInDown">
              <p className="subtitle">
                <i className="fal fa-book" />
                Нашата цел
              </p>
              <h3 className="title text-3xl">Развитие на бизнеса ви</h3>
              <p className="mb-0">
                Nextteammate е платформа, създадена с цел да улесни процеса на наемане на работа както за компанията,
                така и за служителите. Ние предлагаме работа за чуждестранни фирми и нова и цялостна система за
                дистанционна работа/ работа от дома (WFH) / (bpo), която е лесна, надеждна и сигурна и най-важното –
                ефективна.
              </p>
            </div>
            <ul className="about_list style_2 mb-xl-30 wow fadeInUp">
              <li>Дигитализирана работа от дома </li>
              <li>Лесно, сигурно и защитено</li>
              <li>Рентабилно</li>
            </ul>
            <Link href="/i-want-to-find-teammate-bg">
              <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rectangle wow fadeInDown">
                Научи повече
                <i className="fal fa-chevron-right ml-2" />
              </a>
            </Link>
          </div>
          <div className="col-lg-5">
            <div className="image_boxes relative z-1 mb-md-10 h-max">
              <img src="assets/images/about/peoplepeople123.png" className="lg:flex wow fadeInDown" alt="img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexWeCare;
