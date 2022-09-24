import Link from "next/dist/client/link";
import PageTitleBanner from "../src/components/PageTitleBanner";
import Layout from "../src/layout/Layout";

import React from "react";

const Contact = () => {
  return (
    <Layout>
      <PageTitleBanner pageName="Contact Us" url="assets/images/banner/contact-banner.JPG" />
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title wow fadeInUp">
                <p className="subtitle">
                  <i className="fal fa-book" />
                  Contact Us
                </p>
                <h3 className="title">Reach out to us @ any time to connect or if you have any questions</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="contact_faq_box shadow_1 wow fadeInDown" data-wow-delay=".30ms">
                <div className="icon">
                  <img src="assets/images/icons/support.jpg" alt="icon" className="image-fit-contain" />
                </div>
                <div className="text">
                  <h4>Phone</h4>
                  <p>Call us from 9 to 5 M-F. (U.S.A.)</p>
                  <Link href="tel:+126720800020">
                    <a className="thm-btn bg-thm-color-three thm-color-three-shadow btn-rectangle">
                      Give us a call <i className="fal fa-chevron-right ml-2" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact_faq_box shadow_1 wow fadeInUp" data-wow-delay=".40ms">
                <div className="icon">
                  <img src="assets/images/icons/chat.png" alt="icon" className="image-fit-contain" />
                </div>
                <div className="text">
                  <h4>Have Any Questions</h4>
                  <p>Don&apos;t hesitate to ask your questions. We will answer all of them.</p>
                  <Link href="mailto:nextteammateltd@gmail.com">
                    <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rectangle">
                      Contact Us <i className="fal fa-chevron-right ml-2" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
