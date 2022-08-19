const Home1Banner = () => {
  return (
    <div
      className="bg-banner relative z-1"
      style={{
        backgroundImage: "url(assets/images/banner/homepageb.png)",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-10 relative z-1">
            <div className="banner_text">
              <h1
                className="title thm-color-white wow fadeInDown"
                data-wow-delay=".20ms"
              >
                Hire\Find your nextteamate with the click of a button.
              </h1>
              <form
                className="wow fadeInUp"
                data-wow-delay=".40ms"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="input-group">
                  <span className="input-group-preappend">
                    <i className="fal fa-search" />
                  </span>
                  <input
                    type="text"
                    name="#"
                    className="form-control"
                    placeholder="Search For Employment "
                    autoComplete="off"
                  />
                  <div className="input-group-append">
                    <button
                      type="submit"
                      className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rectangle ml-0"
                    >
                      Search Now
                      <i className="fal fa-chevron-right ml-2" />
                    </button>
                  </div>
                </div>
                <div className="form-check-inline">
                  <label className="form-check-label">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="coach"
                      defaultChecked
                    />
                    Office Work
                  </label>
                </div>
                <div className="form-check-inline">
                  <label className="form-check-label">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="coach"
                    />
                    Accounting
                  </label>
                </div>
                <div className="form-check-inline disabled">
                  <label className="form-check-label">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="coach"
                    />
                    Office manager
                  </label>
                </div>
              </form>
            </div>
            <img
              src="assets/images/elements/circle3.png"
              alt="element"
              className="element_1 slideRightTwo"
            />
            <img
              src="assets/images/elements/circle3.png"
              alt="element"
              className="element_2 zoom-fade"
            />
            <img
              src="assets/images/elements/circle3big.png"
              alt="element"
              className="element_3 rotate_elem"
            />
            <img
              src="assets/images/elements/circle3.png"
              alt="element"
              className="element_4 rotate_elem"
            />
          </div>
        </div>
        <div className="think_box wow fadeInDown" data-wow-delay=".50ms"></div>
      </div>
    </div>
  );
};

export default Home1Banner;
