import Link from "next/dist/client/link";
const Home1About = () => {
  return (
    <section
      className="section section-bg about_bg about style_2"
      style={{ backgroundImage: "url(assets/images/bg/gradient.png)" }}
    >
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-6">
            <div className="image_boxes relative z-1 mb-md-80 h-100">
              <img
                src="assets/images/about/smallb.png"
                className="small_img wow fadeInUp"
                alt="img"
              />
              <img
                src="assets/images/about/businessm.png"
                className="big_img wow fadeInDown"
                alt="img"
              />
              {/* elements */}
              <img
                src="assets/images/elements/circle3big.png"
                className="element_1"
                alt="Element"
              />
              <img
                src="assets/images/elements/circle3.png"
                className="element_2 rotate_elem"
                alt="Element"
              />
              <img
                src="assets/images/elements/circle3big.png"
                className="element_3 rotate_elem"
                alt="Element"
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="section-title left-align wow fadeInDown">
              <p className="subtitle">
                <i className="fal fa-book" />
                Our goal
              </p>
              <h3 className="title">We Care About Your Business.</h3>
              <p className="mb-0">
                We provide foreign employment and a new and complete work from
                home (WFH) system which is easy, reliable and secure.{" "}
              </p>
            </div>
            <ul className="about_list style_2 mb-xl-30 wow fadeInUp">
              <li>Business Consulting</li>
              <li>Career Development</li>
              <li>Financial Solutions</li>
            </ul>
            <Link href="/about">
              <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rectangle wow fadeInDown">
                Learn More
                <i className="fal fa-chevron-right ml-2" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home1About;
