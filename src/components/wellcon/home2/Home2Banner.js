import Link from "next/dist/client/link";
import Counter from "../../Counter";
const Home2Banner = () => {
  return (
    <div className="single_banner bg-thm-color-two-gradient relative z-1">
      <img
        src="assets/images/elements/element_8.png"
        alt="element"
        className="element_1"
      />
      <div className="transform-center banne_text">
        <div className="container relative z-1">
          <div className="row">
            <div className="col-xl-6 col-lg-7 relative z-1">
              <div className="banner_text">
                <span
                  className="tag_badge style_2 bg-thm-color-white thm-color-two wow fadeInUp"
                  data-wow-delay=".40ms"
                >
                  I want to hire
                </span>
                <h1 className="title wow fadeInDown" data-wow-delay=".50ms">
                  Hire a professional
                </h1>
                <p className="wow fadeInUp" data-wow-delay=".60ms">
                  Our main priority is to make your life easier so you can focus
                  on your business.
                </p>
                <Link href="/about-2">
                  <a
                    className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rounded mr-2 mb-2 wow afdeInLeft"
                    data-wow-delay=".70ms"
                  >
                    Hire <i className="fal fa-chevron-right ml-10 " />
                  </a>
                </Link>
              </div>
              <img
                src="assets/images/elements/circle3.png"
                className="element_4 rotate_elem"
                alt="img"
              />
              <img
                src="assets/images/elements/circle3.png"
                className="element_5 rotate_elem"
                alt="img"
              />
            </div>
          </div>
          <img
            src="assets/images/elements/circle3.png"
            className="element_2 slideRightTwo"
            alt="img"
          />
          <img
            src="assets/images/elements/circle3.png"
            className="element_3 zoom-fade"
            alt="img"
          />
        </div>
      </div>
      <div className="shape_img relative">
        <img
          src="assets/images/banner/women.png"
          className="wow fadeInDown"
          alt="img"
        />
        <div className="progress_box fadeInUp">
          <div
            className="circle_bar"
            data-percent={89}
            data-track-color="#ecf2ff"
            data-bar-color="#4b83fb"
            data-size={80}
          >
            <div className="counter transform-center text-center">
              <Counter end={89} />
            </div>
          </div>
          <div className="text">
            <h5 className="mb-0">
              Success
              <br /> Result
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home2Banner;
