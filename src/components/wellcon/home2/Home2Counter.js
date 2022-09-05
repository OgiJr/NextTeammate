import Counter from "../../Counter";

const Home2Counter = () => {
  return (
    <div className="section-padding">
      <div className="container">
        <div className="row">
          {/* Box */}
          <div className="col-lg-3 col-md-6">
            <div className="counter_box wow fadeInUp" data-wow-delay=".2s">
              <div className="icon">
                <img
                  src="assets/images/icons/files123.png"
                  alt="icon"
                  className="image-fit"
                />
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
                <img
                  src="assets/images/icons/video123.png"
                  alt="icon"
                  className="image-fit"
                />
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
                <img
                  src="assets/images/icons/comp.png"
                  alt="icon"
                  className="image-fit"
                />
              </div>
              <div className="text">
                <h5 className="mb-0">
                  Working <br></br>Equipment
                </h5>
              </div>
            </div>
          </div>
          {/* Box */}
          {/* Box */}
          <div className="col-lg-3 col-md-6">
            <div className="counter_box wow fadeInUp" data-wow-delay=".8s">
              <div className="icon">
                <img
                  src="assets/images/icons/tracking system.png"
                  alt="icon"
                  className="image-fit"
                />
              </div>
              <div className="text">
                <h5 className="mb-0">
                  Tracking<br></br> System
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

export default Home2Counter;
