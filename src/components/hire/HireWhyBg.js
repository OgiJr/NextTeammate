import React from "react";

const HireWhy = () => {
  return (
    <section className="section-padding pt-0 about">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-xl-5 col-lg-6">
            <div className="section-title left-align wow fadeInDown">
              <p className="subtitle">
                <i className="fal fa-book" />
                Какво предлагаме
              </p>
              <h3 className="title">Защо бизнесите избират NextTeammate</h3>
              <p>
                NextTeammate предоставя цялостни решения за наемане на работа -
                от проучване на потенциалните кандидати, заплащане и здравни
                осигуровки до софтуер за управление и вградено планиране.
              </p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <ul className="why-us-list style_2">
              <li className="wow fadeInUp" data-wow-delay=".2s">
                <i className="icon fal fa-check" />
                <div className="text">
                  <h6 className="mb-0">Помагаме Ви да наемете</h6>
                </div>
                <img
                  src="assets/images/_gradient.png"
                  alt="img"
                  className="image-fit"
                />
              </li>
              <li className="wow fadeInDown" data-wow-delay=".35s">
                <i className="icon fal fa-check" />
                <div className="text">
                  <h6 className="mb-0">Ведомост за заплати</h6>
                </div>
                <img
                  src="assets/images/_gradient.png"
                  alt="img"
                  className="image-fit"
                />
              </li>
              <li className="wow fadeInUp" data-wow-delay=".40s">
                <i className="icon fal fa-check" />
                <div className="text">
                  <h6 className="mb-0">Грижим се за здравните усигоровки</h6>
                </div>
                <img
                  src="assets/images/_gradient.png"
                  alt="img"
                  className="image-fit"
                />
              </li>
              <li className="wow fadeInDown" data-wow-delay=".5s">
                <i className="icon fal fa-check" />
                <div className="text">
                  <h6 className="mb-0">Свързваме Ви с Вашите служители</h6>
                </div>
                <img
                  src="assets/images/_gradient.png"
                  alt="img"
                  className="image-fit"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HireWhy;
