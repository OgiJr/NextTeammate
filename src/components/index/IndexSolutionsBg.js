import React from "react";

const IndexSolutions = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title wow fadeInUp mv-rigj">
              <p className="subtitle">
                <i className="fal fa-book" />
                Нашата цел
              </p>
              <h3 className="title">
                Предлагаме професионално бизнес решение.
              </h3>
              <p className="text-bold text-lg">
                С напредването на технологиите, по-ниските разходи и глобалната
                пандемия през 2020  насърчиха предприятия от всякакъв мащаб и в
                различни области да създават повече възможности за работа от
                дома.
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-center flex-wrap gap-4">
            <div className="lg:!max-w-[25%] ">
              <div
                className="features_box style_2 wow fadeInDown lg:min-h-full"
                data-wow-delay=".20ms"
              >
                <div className="icon">
                  <img
                    src="assets/images/icons/bulb-dynamic-color.png"
                    alt="icon"
                    width={80}
                  />
                </div>
                <h5>Цел</h5>
                <p>
                  Нашата цел е да свързваме търсещите работа с работодателите и
                  да даваме възможност за възможно най-добро взаимодействие
                  между тях както по време на процеса на наемане, така и през
                  цялото време на работните им взаимоотношения.
                </p>
              </div>
            </div>
            <div className="lg:!max-w-[25%]">
              <div
                className="features_box style_2 wow fadeInUp lg:min-h-[100%]"
                data-wow-delay=".30ms"
              >
                <div className="icon">
                  <img
                    src="assets/images/icons/chart-dynamic-gradient.png"
                    alt="icon"
                    width={80}
                  />
                </div>
                <h5>Мисия</h5>
                <p>
                  Нашата мисия е да осигурим лесна и безпроблемна система за
                  комуникация, подходяща и достъпна и за двете страни.
                </p>
              </div>
            </div>
            <div className="lg:!max-w-[25%]">
              <div
                className="features_box style_2 wow fadeInDown lg:min-h-full"
                data-wow-delay=".40ms"
              >
                <div className="icon">
                  <img
                    src="assets/images/icons/rocket-dynamic-gradient copy.png"
                    alt="icon"
                    width={80}
                  />
                </div>
                <h5>Визия</h5>
                <p>
                  Нашата визия е да изграждаме международни връзки между
                  работодатели и служители, които водят до висока ефективност.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexSolutions;
