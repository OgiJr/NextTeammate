import { Image } from "@nextui-org/react";
import React from "react";

import gradient from "../../../public/assets/images/_gradient.png";

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
              <h3 className="title">Why you should choose our service</h3>
              <p>
                NextTeammate provides end to end solutions –screening the potential candidates, providing them with the
                best possible conditions, using dedicated software to utilize the working process. We know that our
                system works. We use it every day ourselves. Our teammates help multiple businesses lowering their
                operational costs and increasing their efficiency.
              </p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <ul className="why-us-list style_2">
              <li className="wow fadeInUp" data-wow-delay=".2s">
                <i className="icon fal fa-check" />
                <div className="text">
                  <h6 className="mb-0">We help you finding the best teammate that will suit your needs</h6>
                </div>
                <Image src={gradient} alt="img" className="image-fit" />
              </li>
              <li className="wow fadeInDown" data-wow-delay=".35s">
                <i className="icon fal fa-check" />
                <div className="text">
                  <h6 className="mb-0">No payroll – you pay a US based company</h6>
                </div>
                <Image src={gradient} alt="img" className="image-fit" />
              </li>
              <li className="wow fadeInUp" data-wow-delay=".40s">
                <i className="icon fal fa-check" />
                <div className="text">
                  <h6 className="mb-0">NO need to pay for health insurance or other benefits</h6>
                </div>
                <Image src={gradient} alt="img" className="image-fit" />
              </li>
              <li className="wow fadeInDown" data-wow-delay=".5s">
                <i className="icon fal fa-check" />
                <div className="text">
                  <h6 className="mb-0">We prescreen and background check your future teammates</h6>
                </div>
                <Image src={gradient} alt="img" className="image-fit" />
              </li>
              <li className="wow fadeInDown" data-wow-delay=".5s">
                <i className="icon fal fa-check" />
                <div className="text">
                  <h6 className="mb-0">
                    Better control - our teammate is required to have their camera and screen sharing ON all the time
                  </h6>
                </div>
                <Image src={gradient} alt="img" className="image-fit" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HireWhy;
