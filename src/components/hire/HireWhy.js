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
                What We Offer
              </p>
              <h3 className="title"> Why People Choose Our Service</h3>
              <p>
                Nextteammate is here to take care of the entire employment process - from payroll and health insurance
                benefits to managment and built-in scheduling software
              </p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <ul className="why-us-list style_2">
              <li className="wow fadeInUp" data-wow-delay=".2s">
                <i className="icon fal fa-check" />
                <div className="text">
                  <h6 className="mb-0">We help you with hiring </h6>
                </div>
                <img src="assets/images/_gradient.png" alt="img" className="image-fit" />
              </li>
              <li className="wow fadeInDown" data-wow-delay=".35s">
                <i className="icon fal fa-check" />
                <div className="text">
                  <h6 className="mb-0">We take care of the payroll </h6>
                </div>
                <img src="assets/images/_gradient.png" alt="img" className="image-fit" />
              </li>
              <li className="wow fadeInUp" data-wow-delay=".40s">
                <i className="icon fal fa-check" />
                <div className="text">
                  <h6 className="mb-0">We take care of the health insurance </h6>
                </div>
                <img src="assets/images/_gradient.png" alt="img" className="image-fit" />
              </li>
              <li className="wow fadeInDown" data-wow-delay=".5s">
                <i className="icon fal fa-check" />
                <div className="text">
                  <h6 className="mb-0">We connect you with your employee </h6>
                </div>
                <img src="assets/images/_gradient.png" alt="img" className="image-fit" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HireWhy;
