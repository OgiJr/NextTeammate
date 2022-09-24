import React from "react";

const IndexSolutions = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title wow fadeInUp">
              <p className="subtitle">
                <i className="fal fa-book" />
                What We Offer
              </p>
              <h3 className="title">We Provide Professional Business Solutions.</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="features_box style_2 wow fadeInDown" data-wow-delay=".20ms">
              <div className="icon">
                <img src="assets/images/icons/bulb-dynamic-color.png" alt="icon" width={80} />
              </div>
              <h5>Exclusive Coach</h5>
              <p>Sed ut perspicia unde omnis iste natus error sit voluptatem accusantium doloreue</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="features_box style_2 wow fadeInUp" data-wow-delay=".30ms">
              <div className="icon">
                <img src="assets/images/icons/chart-dynamic-gradient.png" alt="icon" width={80} />
              </div>
              <h5>Consulting</h5>
              <p>Sed ut perspicia unde omnis iste natus error sit voluptatem accusantium doloreue</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="features_box style_2 wow fadeInDown" data-wow-delay=".40ms">
              <div className="icon">
                <img src="assets/images/icons/gym-dynamic-gradient.png" alt="icon" width={80} />
              </div>
              <h5>Live Trainings</h5>
              <p>Sed ut perspicia unde omnis iste natus error sit voluptatem accusantium doloreue</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="features_box style_2 wow fadeInUp" data-wow-delay=".50ms">
              <div className="icon">
                <img src="assets/images/icons/megaphone-dynamic-gradient.png" alt="icon" width={80} />
              </div>
              <h5>Marketing Goals</h5>
              <p>Sed ut perspicia unde omnis iste natus error sit voluptatem accusantium doloreue</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexSolutions;
