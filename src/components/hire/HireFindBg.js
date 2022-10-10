import { useState } from "react";
import VideoPopup from "../VideoPopup";

import React from "react";
import Link from "next/link";

const HireFind = () => {
  const [video, setVideo] = useState(false);
  return (
    <section className="bg-cyan-50 z-1 video_quote">
      {video && (
        <VideoPopup close={() => setVideo(false)} videoID="TKnufs85hXk" />
      )}

      <div className="container-fluid p-0">
        <div className="row no-gutters align-items-center">
          <div className="col-lg-6">
            <div className="video_warp relative z-1 h-100 wow fadeInLeft">
              <img
                src="assets/images/adam-nowakowski-D4LDw5eXhgg-unsplash.jpg"
                alt="img"
                className="image-fit"
              />
              <a
                onClick={() => setVideo(true)}
                href="#"
                className="popup-youtube video_btn transform-center justify-content-center d-flex style_2"
              >
                <i className="fas fa-play video_icon bg-thm-color-three pulse-animated" />
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <img
              src="assets/images/elements/circle3.png"
              className="element_4 rotate_elem"
              alt="img"
            />
            <div className="quote_sec about relative z-1">
              <img
                src="assets/images/elements/circle3.png"
                className="element_5 rotate_elem"
                alt="img"
              />
              <div className="section-title left-align wow fadeInUp">
                <p className="subtitle">
                  <i className="fal fa-book" />
                  Търсите служители?
                </p>
                <h3 className="title mb-0">
                  Изберете от най-добрите служители
                </h3>
              </div>
              <h6>We provide:</h6>
              <p className="font-bold ...">
                ● Собствена онлайн платформа, която ви свързва с вашия служител
                през целия ден.<br></br>● SСигурна/криптирана платформа за
                споделяне на файлове, която позволява лесно управление и
                споделяне на файлови структури и документи в рамките на вашия
                бизнес.<br></br>● Високомотивирани и квалифицирани хора, които
                са лесно достъпни за работа. Всички кандидати преминават през
                пълна проверка на работното им минало и владеенето на чужд език.
                <br></br>● Не е необходимо да плащате обезщетения, застраховки,
                данъци върху заплатите и други разходи, свързани с работниците.
                Nextteammate покрива всичко в съответствие с местните кодекси в
                чуждестранната държава.
                <br></br>● Отмяна по всяко време
              </p>
              <div>
                <h6>Предимства скоро</h6>
              </div>
              <p className="font-bold ...">
                ● Предоставяме локализиран телефонен номер или безплатен
                телефонен номер, което позволява на служителя да комуникира не
                само със самия работодател, но и с клиенти по телефона.<br></br>
                ● Срещу месечен абонамент можем да предоставим цялото необходимо
                оборудване на работещия за вас служител от Nextteammate. Това
                включва всичко необходимо, за осъществяването на работния
                процес, което включва лаптоп, телефонен номер, интернет, тн.
                <br></br>● Нашата собствена платформа включва портал за
                управление на времето, за да проследявате работното време и
                проектите на вашите Nextteammates.
              </p>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group"></div>
                </div>
                <div className="col-sm-12">
                  <Link href="/contact-bg">
                    <button className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rounded">
                      Наемете сега <i className="fal fa-chevron-right ml-2" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HireFind;
