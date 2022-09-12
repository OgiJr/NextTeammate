import { useState } from "react";
import VideoPopup from "../../VideoPopup";

const Home2Video = () => {
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
                src="assets/images/hands.png"
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
            <div className="arrows slideRight">
              <div className="arrow" />
              <div className="arrow" />
              <div className="arrow" />
              <div className="arrow" />
              <div className="arrow" />
            </div>
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
                  Admission Going On
                </p>
                <h3 className="title mb-0">Find Your Best Employee</h3>
              </div>
              <p class="font-bold ...">
                We provide: <br></br>● Online secure conference platform which
                connects you with your employee throughout the whole day.
                <br></br>● Secure/enc rypted file sharing platform, enabling
                easy management and sharing of file structures and documents
                inside your business.
              </p>

              <p class="font-bold ...">
                Further benefits:<br></br>● American phone number, allowing the
                employee to communicate not only with the employer himself, but
                also with clients via phone.<br></br>● Laptops, computers and
                various working equipment depending on the clients needs.
              </p>
              <form
                className="wow fadeInDown"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group"></div>
                  </div>
                  <div className="col-sm-12">
                    <button
                      type="submit"
                      className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rounded"
                    >
                      Hire Now <i className="fal fa-chevron-right ml-2" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home2Video;
