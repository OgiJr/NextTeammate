import { useState } from "react";
import VideoPopup from "../VideoPopup";

import React from "react";

const IndexVideo = () => {
  const [video, setVideo] = useState(false);
  return (
    <div className="section pt-0 video_box_elements mt-20">
      {video && <VideoPopup close={() => setVideo(false)} videoID="TKnufs85hXk" />}
      <div className="container relative z-1">
        <div className="row">
          <div className="col-12">
            <div className="video_warp style_2 relative z-1 wow fadeInUp">
              <img src="assets/images/pexels-pixabay-416405.jpg" alt="img" className="image-fit" />
              <a
                onClick={() => setVideo(true)}
                href="#"
                className="popup-youtube video_btn transform-center justify-content-center d-flex style_2 big"
              >
                <i className="fas fa-play video_icon bg-thm-color-three pulse-animated" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexVideo;
