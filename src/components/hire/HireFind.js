import { useState } from "react";
import VideoPopup from "../VideoPopup";

import React from "react";
import Link from "next/link";

const HireFind = () => {
  const [video, setVideo] = useState(false);
  return (
    <section className="bg-cyan-50 z-1 video_quote">
      {video && (
        <VideoPopup close={() => setVideo(false)} videoID="BA6VUAQRBt0" />
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
                  Admission Going On
                </p>
                <h3 className="title mb-0">Find Your Best Employee</h3>
              </div>
              <h6>We provide:</h6>
              <p className="font-bold ...">
                ● Proprietary online platform which connects you with your
                employee throughout the whole day.<br></br>● Secure/ encrypted
                file sharing platform, enabling easy management and sharing of
                file structures and documents inside your business.<br></br>●
                Highly motivated and skilled people readily available to work.
                All candidates undergo a full background verification and
                language skills.<br></br>● No need to pay for workers
                compensation, insurance, wage taxes and other employee’s related
                expenses. Nextteammate’s solution covers everything in
                accordance with the local codes in the overseas country.
                <br></br>● Cancel anytime
              </p>
              <div>
                <h6>Future Benefits</h6>
              </div>
              <p className="font-bold ...">
                ● We provide a localized phone number or toll-free phone number,
                allowing the employee to communicate not only with the employer
                himself, but also with clients via phone.<br></br>● For a
                monthly subscription we can provide all of the required
                equipment to the Nextteammate person working for you. This
                includes everything necessary for and teammate to operate which
                includes a laptop, phone number, internet….<br></br>● Our
                proprietary platform includes a time management portal to track
                your Nextteammates time and projects.
              </p>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group"></div>
                </div>
                <div className="col-sm-12">
                  <Link href="/contact">
                    <button className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rounded">
                      Hire Now <i className="fal fa-chevron-right ml-2" />
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
