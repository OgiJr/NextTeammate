import React from "react";

const WorkAbout = () => {
  return (
    <section className="section-padding pt-0 about mt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-7 col-lg-6">
            <div className="image_box wow fadeInLeft">
              <img
                src="assets/images/about/working-team.png"
                alt="img"
                className="image-fit image_1 rounded-circle"
              />
              <img
                src="assets/images/about/analiz123.png"
                alt="img"
                className="image-fit image_2 rounded-circle"
              />
            </div>
          </div>
          <div className="col-xl-5 col-lg-6">
            <div className="section-title left-align wow fadeInUp">
              <p className="subtitle">
                <i className="fal fa-book" />
                Какво предлагаме
              </p>
              <h3 className="title">Ползи:</h3>
            </div>
            <ul className="about_list">
              <li className=" wow fadeInDown">
                <div className="icon">
                  <img
                    src="assets/images/icons/medal-dynamic-gradient copy.png"
                    alt="img"
                    className="image-fit"
                  />
                </div>
                <div className="text">
                  <h6 className="mb-2">Предимствата на работата от вкъщи</h6>
                  <p className="mb-0">
                    Основните ползи от модела WFM включват: по-добър баланс
                    между работата и личния живот, по-висока производителност и
                    ефективност.
                  </p>
                </div>
              </li>
              <li className=" wow fadeInDown">
                <div className="icon">
                  <img
                    src="assets/images/icons/target-dynamic-gradient copy.png"
                    alt="img"
                    className="image-fit"
                  />
                </div>
                <div className="text">
                  <h6 className="mb-2">Изграждане на връзки</h6>
                  <p className="mb-0">
                    Ще имате възможност да се свържете с американски корпорации
                    и да се утвърдите на международния пазар.
                  </p>
                </div>
              </li>
              <li className=" wow fadeInDown">
                <div className="icon">
                  <img
                    src="assets/images/icons/wallet-dynamic-gradient copy.png"
                    alt="img"
                    className="image-fit"
                  />
                </div>
                <div className="text">
                  <h6 className="mb-2">Американски стандарти</h6>
                  <p className="mb-0">
                    Конкурентна заплата, базирана на заплатите в САЩ.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkAbout;
