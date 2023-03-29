import { useState } from "react";
import VideoPopup from "../VideoPopup";
import React from "react";
import Link from "next/link";

import adam from "../../../public/assets/images/adam-nowakowski-D4LDw5eXhgg-unsplash.jpg";
import circle3 from "../../../public/assets/images/elements/circle3.png";
import Image from "next/image";

const HireFind = () => {
  const [video, setVideo] = useState(false);
  return (
    <section className="bg-cyan-50 z-1 video_quote">
      {video && <VideoPopup close={() => setVideo(false)} videoID="BA6VUAQRBt0" />}

      <div className="container-fluid p-0">
        <div className="row no-gutters align-items-center">
          <div className="col-lg-6">
            <div className="video_warp relative z-1 h-100 wow fadeInLeft">
              <Image src={adam} alt="img" className="image-fit" />
            </div>
          </div>
          <div className="col-lg-6">
            <Image src={circle3} className="element_4 rotate_elem" alt="img" />
            <div className="quote_sec about relative z-1">
              <Image src={circle3} className="element_5 rotate_elem" alt="img" />
              <div className="section-title left-align wow fadeInUp">
                <h3 className="title mb-0">Find Your New Best Team Member</h3>
              </div>
              <h6>We provide:</h6>
              <p className="font-bold ...">
                ● Proprietary online platform which connects you with your team member throughout the whole day.
                <br></br>● Secure/ encrypted file sharing platform, enabling easy management and sharing of file
                structures and documents inside your business.<br></br>● Highly motivated and skilled people readily
                available to collaborate. All candidates undergo a full background verification and language skills.
                <br></br>● No need to pay for compensation, insurance, wage taxes and other team member’s related
                expenses. NextTeammate’s solution covers everything in accordance with the local laws in the overseas
                country.
                <br></br>● Cancel anytime
              </p>
              <div>
                <h6>Future Benefits</h6>
              </div>
              <p className="font-bold ...">
                ● We provide a localized phone number or toll-free phone number, allowing the team member to communicate
                not only with the employer himself, but also with clients via phone.<br></br>● For a monthly
                subscription we can provide all of the required equipment to the Nextteammate person collaborating with
                you. This includes everything necessary for and teammate to operate which includes a laptop, phone
                number, internet….<br></br>● Our proprietary platform includes a time management portal to track your
                NextTeammates time and projects.
              </p>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group"></div>
                </div>
                <div className="col-sm-12">
                  <Link href="/contact">
                    <button className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rounded">
                      Find a Teammate <i className="fal fa-chevron-right ml-2" />
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
