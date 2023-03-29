import React from "react";

import folder from "../../../public/assets/images/icons/folder-dynamic-gradient.png";
import computer from "../../../public/assets/images/icons/computer-dynamic-gradient.png";
import video from "../../../public/assets/images/icons/video-camera-dynamic-gradient.png";
import clock from "../../../public/assets/images/icons/clock-dynamic-gradient.png";
import Image from "next/image";

const HireSkills = () => {
  return (
    <div className="section-padding lg:mt-40">
      <div className="container">
        <div className="row">
          {/* Box */}
          <div className="col-lg-3 col-md-6">
            <div className="counter_box wow fadeInUp" data-wow-delay=".2s">
              <div className="icon">
                <Image src={folder} alt="icon" className="image-fit" />
              </div>
              <div className="text">
                <h5 className="mb-0">
                  Encrypted <br></br>Files
                </h5>
              </div>
            </div>
          </div>
          {/* Box */}
          {/* Box */}
          <div className="col-lg-3 col-md-6">
            <div className="counter_box wow fadeInUp" data-wow-delay=".4s">
              <div className="icon">
                <Image src={video} alt="icon" className="image-fit" />
              </div>
              <div className="text">
                <h5 className="mb-0">
                  Conference<br></br> Platform
                </h5>
              </div>
            </div>
          </div>
          {/* Box */}
          {/* Box */}
          <div className="col-lg-3 col-md-6">
            <div className="counter_box wow fadeInUp" data-wow-delay=".6s">
              <div className="icon">
                <Image src={computer} alt="icon" className="image-fit" />
              </div>
              <div className="text">
                <h5 className="mb-0">
                  Collaboration <br></br>Equipment
                </h5>
              </div>
            </div>
          </div>
          {/* Box */}
          {/* Box */}
          <div className="col-lg-3 col-md-6">
            <div className="counter_box wow fadeInUp" data-wow-delay=".8s">
              <div className="icon">
                <Image src={clock} alt="icon" className="image-fit" />
              </div>
              <div className="text">
                <h5 className="mb-0">
                  Time<br></br>Tracking
                </h5>
              </div>
            </div>
          </div>
          {/* Box */}
        </div>
      </div>
    </div>
  );
};

export default HireSkills;
