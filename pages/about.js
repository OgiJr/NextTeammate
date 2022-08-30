import Link from "next/dist/client/link";
import { useState } from "react";
import Slider from "react-slick";
import Counter from "../src/components/Counter";
import PageTitleBanner from "../src/components/PageTitleBanner";
import VideoPopup from "../src/components/VideoPopup";
import Layout from "../src/layout/Layout";
import { testimonial_slider } from "../src/sliderProps";

const About = () => {
  const [video, setVideo] = useState(false);
  return (
    <Layout footerStyle={2}>
      <PageTitleBanner pageName="About Us" />
      {video && <VideoPopup close={() => setVideo(false)} />}
      <section className="section about_inner">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6">
              <div className="image_box shadow_1 mb-md-80 wow fadeInLeft">
                <img
                  src="assets/images/about/about-us.jpg"
                  alt="img"
                  className="image-fit"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="section-title left-align wow fadeInDown">
                <p className="subtitle">
                  <i className="fal fa-book" />
                  About Us
                </p>
                <h3 className="title">
                  Our main priority is to make your life easier so you can focus
                  on your business.
                </h3>
                <p>We will take care of the entire employment process:</p>
              </div>
              <ul className="about_list row">
                <li className="col-md-6 wow fadeInUp">
                  <div className="icon">
                    <img
                      src="assets/images/icons/tick.png"
                      alt="img"
                      className="image-fit"
                    />
                  </div>
                  <div className="text">
                    <h6 className="mb-2">Payroll</h6>
                    {/* <p className="mb-0">
                      Quis autem reprehenderit quein voluptate velit esseua
                    </p> */}
                  </div>
                </li>
                <li className="col-md-6 wow fadeInDown">
                  <div className="icon">
                    <img
                      src="assets/images/icons/tick.png"
                      alt="img"
                      className="image-fit"
                    />
                  </div>
                  <div className="text">
                    <h6 className="mb-2">Health insurance benefits</h6>
                    {/* <p className="mb-0">
                      Quis autem reprehenderit quein voluptate velit esseua
                    </p> */}
                  </div>
                </li>
                <li className="col-md-6 wow fadeInUp">
                  <div className="icon">
                    <img
                      src="assets/images/icons/tick.png"
                      alt="img"
                      className="image-fit"
                    />
                  </div>
                  <div className="text">
                    <h6 className="mb-2">Management</h6>
                    {/* <p className="mb-0">
                      Quis autem reprehenderit quein voluptate velit esseua
                    </p> */}
                  </div>
                </li>
                <li className="col-md-6 wow fadeInDown">
                  <div className="icon">
                    <img
                      src="assets/images/icons/tick.png"
                      alt="img"
                      className="image-fit"
                    />
                  </div>
                  <div className="text">
                    <h6 className="mb-2">Built in scheduling software</h6>
                    {/* <p className="mb-0">
                      Quis autem reprehenderit quein voluptate velit esseua
                    </p> */}
                  </div>
                </li>
              </ul>
              <Link href="/about-2">
                <a className="thm-btn bg-thm-color-three thm-color-three-shadow btn-rectangle wow fadeInDown">
                  Learn More
                  <i className="fal fa-chevron-right ml-2" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* About End */}
      {/* Counter Box Start */}
      <div className="section-padding pt-0">
        <div className="container">
          <div className="row">
            {/* Box */}
            <div className="col-lg-3 col-md-6">
              <div className="counter_box wow fadeInUp" data-wow-delay=".10ms">
                <div className="icon">
                  <img
                    src="assets/images/icons/popular-coach.png"
                    alt="icon"
                    className="image-fit"
                  />
                </div>
                <div className="text">
                  <div className="counter">
                    <Counter end={369} />
                  </div>
                  {/* <p className="mb-0">Popular Coach</p> */}
                </div>
              </div>
            </div>
            {/* Box */}
            {/* Box */}
            <div className="col-lg-3 col-md-6">
              <div
                className="counter_box wow fadeInDown"
                data-wow-delay=".20ms"
              >
                <div className="icon">
                  <img
                    src="assets/images/icons/our-advisors.png"
                    alt="icon"
                    className="image-fit"
                  />
                </div>
                <div className="text">
                  <div className="counter">
                    <Counter end={264} />
                  </div>
                  {/* <p className="mb-0">Our Advisors</p> */}
                </div>
              </div>
            </div>
            {/* Box */}
            {/* Box */}
            <div className="col-lg-3 col-md-6">
              <div className="counter_box wow fadeInUp" data-wow-delay=".30ms">
                <div className="icon">
                  <img
                    src="assets/images/icons/video-tutorial.png"
                    alt="icon"
                    className="image-fit"
                  />
                </div>
                <div className="text">
                  <div className="counter">
                    <Counter end={259} />
                  </div>
                  {/* <p className="mb-0">Video Tutorials</p> */}
                </div>
              </div>
            </div>
            {/* Box */}
            {/* Box */}
            <div className="col-lg-3 col-md-6">
              <div
                className="counter_box wow fadeInDown"
                data-wow-delay=".40ms"
              >
                <div className="icon">
                  <img
                    src="assets/images/icons/student-review.png"
                    alt="icon"
                    className="image-fit"
                  />
                </div>
                <div className="text">
                  <div className="counter">
                    <Counter end={568} />
                  </div>
                  {/* <p className="mb-0">Student Reviews</p> */}
                </div>
              </div>
            </div>
            {/* Box */}
          </div>
        </div>
      </div>
      {/* Counter Box End */}
      {/* About Us Start */}
      <section
        className="section section-bg about_bg about style_2"
        style={{ backgroundImage: "url(assets/images/bg/bg_1.jpg)" }}
      >
        <div className="container">
          <div className="row justify-content-between flex-row-reverse">
            <div className="col-lg-6">
              <div className="image_boxes style_2 relative z-1 h-100">
                <img
                  src="assets/images/nextlogo.png"
                  className="small_img wow fadeInUp"
                  alt="img"
                />
                <div className="video_warp style_2 relative z-1 big_img wow fadeInDown">
                  <img src="assets/images/about/video-img.jpg" alt="img" />
                  <a
                    href="#"
                    onClick={() => setVideo(true)}
                    className="popup-youtube transform-center justify-content-center d-flex"
                  >
                    <img src="assets/images/icons/play.png" alt="icon" />
                  </a>
                </div>
                {/* elements */}
                <img
                  src="assets/images/elements/circle3.png"
                  className="element_1"
                  alt="Element"
                />
                <img
                  src="assets/images/elements/circle3.png"
                  className="element_2 rotate_elem"
                  alt="Element"
                />
                <img
                  src="assets/images/elements/circle3.png"
                  className="element_3 rotate_elem"
                  alt="Element"
                />
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 mb-md-80">
              <div className="section-title left-align wow fadeInUp">
                <p className="subtitle">
                  <i className="fal fa-book" />
                  What to expect
                </p>
                <h3 className="title">Other facilities that we can offer:</h3>
                {/* <p className="mb-0">
                  Quis autem vel eum iure reprehenderit qui in ea voluptate esse
                  quam nihil molestiae conseq uaturvel illum qui dolorem eum
                  fugiat quo voluptas nulla pariatur{" "}
                </p> */}
              </div>
              <ul className="about_list style_2 mb-xl-30 wow fadeInDown">
                <li>Online secure conference platform</li>
                <li>Secure and encrypted file sharing platform</li>
                <li>American phone number for the employee</li>
                <li>Laptops computers and various working equipment</li>
              </ul>
              <Link href="/about">
                <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rectangle wow fadeInUp">
                  Learn More
                  <i className="fal fa-chevron-right ml-2" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* About Us End */}
      {/* Team Start */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title wow fadeInDown">
                <p className="subtitle">
                  <i className="fal fa-book" />
                  Our Professionals
                </p>
                <h3 className="title">Meet Our Professinoal Team Members</h3>
              </div>
            </div>
          </div>
          <div className="row">
            {/* Block Start */}
            <div className="col-lg col-md-6">
              <div className="team_block style_2 wow fadeInUp">
                <div className="team_img">
                  <img
                    src="assets/images/team/1.jpg"
                    alt="img"
                    data-wow-delay=".10ms"
                    className="image-fit"
                  />
                  <Link href="/user-panel">
                    <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-circle link">
                      <i className="fal fa-plus" />
                    </a>
                  </Link>
                </div>
                <h6 className="mb-1">
                  <Link href="/user-panel">
                    <a>Wallace D. Grace</a>
                  </Link>
                </h6>
                <p className="thm-color-two mb-0 font-weight-bold">
                  Coach Teacher
                </p>
              </div>
            </div>
            {/* Block End */}
            {/* Block Start */}
            <div className="col-lg col-md-6">
              <div
                className="team_block style_2 wow fadeInDown"
                data-wow-delay=".20ms"
              >
                <div className="team_img">
                  <img
                    src="assets/images/team/2.jpg"
                    alt="img"
                    className="image-fit"
                  />
                  <Link href="/user-panel">
                    <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-circle link">
                      <i className="fal fa-plus" />
                    </a>
                  </Link>
                </div>
                <h6 className="mb-1">
                  <Link href="/user-panel">
                    <a>Evan A. Ethridge</a>
                  </Link>
                </h6>
                <p className="thm-color-two mb-0 font-weight-bold">
                  Coach Teacher
                </p>
              </div>
            </div>
            {/* Block End */}
            {/* Block Start */}
            <div className="col-lg col-md-6">
              <div
                className="team_block style_2 wow fadeInUp"
                data-wow-delay=".30ms"
              >
                <div className="team_img">
                  <img
                    src="assets/images/team/3.jpg"
                    alt="img"
                    className="image-fit"
                  />
                  <Link href="/user-panel">
                    <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-circle link">
                      <i className="fal fa-plus" />
                    </a>
                  </Link>
                </div>
                <h6 className="mb-1">
                  <Link href="/user-panel">
                    <a>Marcus L. Duncan</a>
                  </Link>
                </h6>
                <p className="thm-color-two mb-0 font-weight-bold">
                  Coach Teacher
                </p>
              </div>
            </div>
            {/* Block End */}
            {/* Block Start */}
            <div className="col-lg col-md-6">
              <div
                className="team_block style_2 wow fadeInDown"
                data-wow-delay=".40ms"
              >
                <div className="team_img">
                  <img
                    src="assets/images/team/4.jpg"
                    alt="img"
                    className="image-fit"
                  />
                  <Link href="/user-panel">
                    <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-circle link">
                      <i className="fal fa-plus" />
                    </a>
                  </Link>
                </div>
                <h6 className="mb-1">
                  <Link href="/user-panel">
                    <a>Paul B. Gilliland</a>
                  </Link>
                </h6>
                <p className="thm-color-two mb-0 font-weight-bold">
                  Coach Teacher
                </p>
              </div>
            </div>
            {/* Block End */}
            {/* Block Start */}
            <div className="col-lg col-md-6">
              <div
                className="team_block style_2 wow fadeInUp"
                data-wow-delay=".50ms"
              >
                <div className="team_img">
                  <img
                    src="assets/images/team/5.jpg"
                    alt="img"
                    className="image-fit"
                  />
                  <Link href="/user-panel">
                    <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-circle link">
                      <i className="fal fa-plus" />
                    </a>
                  </Link>
                </div>
                <h6 className="mb-1">
                  <Link href="/user-panel">
                    <a>Donald T.Lewis</a>
                  </Link>
                </h6>
                <p className="thm-color-two mb-0 font-weight-bold">
                  Coach Teacher
                </p>
              </div>
            </div>
            {/* Block End */}
            {/* Block Start */}
            <div className="col-lg col-md-6">
              <div
                className="team_block style_2 wow fadeInDown"
                data-wow-delay=".60ms"
              >
                <div className="team_img">
                  <img
                    src="assets/images/team/6.jpg"
                    alt="img"
                    className="image-fit"
                  />
                  <Link href="/user-panel">
                    <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-circle link">
                      <i className="fal fa-plus" />
                    </a>
                  </Link>
                </div>
                <h6 className="mb-1">
                  <Link href="/user-panel">
                    <a>Allan J. Sumlin</a>
                  </Link>
                </h6>
                <p className="thm-color-two mb-0 font-weight-bold">
                  Coach Teacher
                </p>
              </div>
            </div>
            {/* Block End */}
            {/* Block Start */}
            <div className="col-lg col-md-6">
              <div
                className="team_block style_2 wow fadeInUp"
                data-wow-delay=".70ms"
              >
                <div className="team_img">
                  <img
                    src="assets/images/team/7.jpg"
                    alt="img"
                    className="image-fit"
                  />
                  <Link href="/user-panel">
                    <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-circle link">
                      <i className="fal fa-plus" />
                    </a>
                  </Link>
                </div>
                <h6 className="mb-1">
                  <Link href="/user-panel">
                    <a>Gracie T. Evans</a>
                  </Link>
                </h6>
                <p className="thm-color-two mb-0 font-weight-bold">
                  Coach Teacher
                </p>
              </div>
            </div>
            {/* Block End */}
            {/* Block Start */}
            <div className="col-lg col-md-6">
              <div
                className="team_block style_2 wow fadeInDown"
                data-wow-delay=".80ms"
              >
                <div className="team_img">
                  <img
                    src="assets/images/team/8.jpg"
                    alt="img"
                    className="image-fit"
                  />
                  <Link href="/user-panel">
                    <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-circle link">
                      <i className="fal fa-plus" />
                    </a>
                  </Link>
                </div>
                <h6 className="mb-1">
                  <Link href="/user-panel">
                    <a>David S. Hudson</a>
                  </Link>
                </h6>
                <p className="thm-color-two mb-0 font-weight-bold">
                  Coach Teacher
                </p>
              </div>
            </div>
            {/* Block End */}
            {/* Block Start */}
            <div className="col-lg col-md-6">
              <div
                className="team_block style_2 wow fadeInUp"
                data-wow-delay=".90ms"
              >
                <div className="team_img">
                  <img
                    src="assets/images/team/9.jpg"
                    alt="img"
                    className="image-fit"
                  />
                  <Link href="/user-panel">
                    <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-circle link">
                      <i className="fal fa-plus" />
                    </a>
                  </Link>
                </div>
                <h6 className="mb-1">
                  <Link href="/user-panel">
                    <a>Michael J. Randall</a>
                  </Link>
                </h6>
                <p className="thm-color-two mb-0 font-weight-bold">
                  Coach Teacher
                </p>
              </div>
            </div>
            {/* Block End */}
            {/* Block Start */}
            <div className="col-lg col-md-6">
              <div
                className="team_block style_2 wow fadeInDown"
                data-wow-delay=".100ms"
              >
                <div className="team_img">
                  <img
                    src="assets/images/team/10.jpg"
                    alt="img"
                    className="image-fit"
                  />
                  <Link href="/user-panel">
                    <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-circle link">
                      <i className="fal fa-plus" />
                    </a>
                  </Link>
                </div>
                <h6 className="mb-1">
                  <Link href="/user-panel">
                    <a>Joseph Anderson</a>
                  </Link>
                </h6>
                <p className="thm-color-two mb-0 font-weight-bold">
                  Coach Teacher
                </p>
              </div>
            </div>
            {/* Block End */}
          </div>
        </div>
      </section>
      {/* Team End */}
      {/* Testimonials Start */}
      <section
        className="section section-bg relative z-1 bg-thm-color-one"
        style={{ backgroundImage: "url(assets/images/bg/bg_4.png)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title left-align white wow fadeInDown">
                <p className="subtitle mb-4">
                  <i className="fal fa-book" />
                  Our Testimonials
                </p>
                <h3 className="title mb-0">
                  What’s Our Clients
                  <br /> About Us
                </h3>
              </div>
            </div>
          </div>
          <Slider
            {...testimonial_slider}
            className="testimonial_slider style_2 row wow fadeInUp"
          >
            {/* Testimonial Item */}
            <div className="slide-item col-12">
              <div className="testimonial_item style_dark">
                <div className="author">
                  <div className="image bg-thm-color-two">
                    <img
                      src="assets/images/author/1.jpg"
                      alt="img"
                      className="image-fit"
                    />
                  </div>
                  <div className="text">
                    <h6 className="mb-0">Herminia F. Hudson</h6>
                    <p className="mb-0 font-weight-bold thm-color-two">
                      Web Designer
                    </p>
                  </div>
                </div>
                <p className="comment">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudtium totam rem aperiam eaque quae
                </p>
                <div className="ratings">
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star" />
                </div>
              </div>
            </div>
            {/* Testimonial Item */}
            {/* Testimonial Item */}
            <div className="slide-item col-12">
              <div className="testimonial_item style_dark">
                <div className="author">
                  <div className="image bg-thm-color-two">
                    <img
                      src="assets/images/author/2.jpg"
                      alt="img"
                      className="image-fit"
                    />
                  </div>
                  <div className="text">
                    <h6 className="mb-0">Robert M. Morales</h6>
                    <p className="mb-0 font-weight-bold thm-color-two">
                      Business Manager
                    </p>
                  </div>
                </div>
                <p className="comment">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudtium totam rem aperiam eaque quae
                </p>
                <div className="ratings">
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star" />
                  <i className="fal fa-star" />
                </div>
              </div>
            </div>
            {/* Testimonial Item */}
            {/* Testimonial Item */}
            <div className="slide-item col-12">
              <div className="testimonial_item style_dark">
                <div className="author">
                  <div className="image bg-thm-color-two">
                    <img
                      src="assets/images/author/3.jpg"
                      alt="img"
                      className="image-fit"
                    />
                  </div>
                  <div className="text">
                    <h6 className="mb-0">Nicolas Vanderpool</h6>
                    <p className="mb-0 font-weight-bold thm-color-two">
                      Apps Developer
                    </p>
                  </div>
                </div>
                <p className="comment">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudtium totam rem aperiam eaque quae
                </p>
                <div className="ratings">
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                </div>
              </div>
            </div>
            {/* Testimonial Item */}
            {/* Testimonial Item */}
            <div className="slide-item col-12">
              <div className="testimonial_item style_dark">
                <div className="author">
                  <div className="image bg-thm-color-two">
                    <img
                      src="assets/images/author/1.jpg"
                      alt="img"
                      className="image-fit"
                    />
                  </div>
                  <div className="text">
                    <h6 className="mb-0">Herminia F. Hudson</h6>
                    <p className="mb-0 font-weight-bold thm-color-two">
                      Web Designer
                    </p>
                  </div>
                </div>
                <p className="comment">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudtium totam rem aperiam eaque quae
                </p>
                <div className="ratings">
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star" />
                </div>
              </div>
            </div>
            {/* Testimonial Item */}
            {/* Testimonial Item */}
            <div className="slide-item col-12">
              <div className="testimonial_item style_dark">
                <div className="author">
                  <div className="image bg-thm-color-two">
                    <img
                      src="assets/images/author/2.jpg"
                      alt="img"
                      className="image-fit"
                    />
                  </div>
                  <div className="text">
                    <h6 className="mb-0">Robert M. Morales</h6>
                    <p className="mb-0 font-weight-bold thm-color-two">
                      Business Manager
                    </p>
                  </div>
                </div>
                <p className="comment">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudtium totam rem aperiam eaque quae
                </p>
                <div className="ratings">
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star" />
                  <i className="fal fa-star" />
                </div>
              </div>
            </div>
            {/* Testimonial Item */}
            {/* Testimonial Item */}
            <div className="slide-item col-12">
              <div className="testimonial_item style_dark">
                <div className="author">
                  <div className="image bg-thm-color-two">
                    <img
                      src="assets/images/author/3.jpg"
                      alt="img"
                      className="image-fit"
                    />
                  </div>
                  <div className="text">
                    <h6 className="mb-0">Nicolas Vanderpool</h6>
                    <p className="mb-0 font-weight-bold thm-color-two">
                      Apps Developer
                    </p>
                  </div>
                </div>
                <p className="comment">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudtium totam rem aperiam eaque quae
                </p>
                <div className="ratings">
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                  <i className="fal fa-star active" />
                </div>
              </div>
            </div>
            {/* Testimonial Item */}
          </Slider>
        </div>
      </section>
      {/* Testimonials End */}
      {/* Sponsors Start */}
      <div className="section-padding">
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-auto">
              <div className="sponsors_img">
                <img src="assets/images/sponsors/1.png" alt="img" />
              </div>
            </div>
            <div className="col-auto">
              <div className="sponsors_img">
                <img src="assets/images/sponsors/2.png" alt="img" />
              </div>
            </div>
            <div className="col-auto">
              <div className="sponsors_img">
                <img src="assets/images/sponsors/3.png" alt="img" />
              </div>
            </div>
            <div className="col-auto">
              <div className="sponsors_img">
                <img src="assets/images/sponsors/4.png" alt="img" />
              </div>
            </div>
            <div className="col-auto">
              <div className="sponsors_img">
                <img src="assets/images/sponsors/5.png" alt="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
