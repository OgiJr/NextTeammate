import Link from "next/dist/client/link";
import PageTitleBanner from "../src/components/PageTitleBanner";
import Layout from "../src/layout/Layout";
import React, { useState } from "react";
import Footer from "../src/layout/Footer";
import Image from "next/image";

import phone_incoming from "../public/assets/images/icons/phone-incoming-dynamic-gradient copy.png";
import chat_text from "../public/assets/images/icons/chat-text-dynamic-gradient copy.png";

const Contact = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  return (
    <Layout language={"en"}>
      <PageTitleBanner pageName="Contact Us" url="assets/images/banner/contact-banner.jpg" />
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title wow fadeInUp">
                <p className="subtitle">
                  <i className="fal fa-book" />
                  Contact Us
                </p>
                <h3 className="title">Reach out to us if you have any questions</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="contact_faq_box shadow_1 wow fadeInDown" data-wow-delay=".30ms">
                <div className="icon">
                  <Image src={phone_incoming} alt="icon" className="image-fit-contain" />
                </div>
                <div className="text">
                  <h4>Phone</h4>
                  <p>Call us Mon - Fri 9:00 AM - 5:00 PM EST</p>
                  <Link href="tel:+12672080020">
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
                  <Image src={chat_text} alt="icon" className="image-fit-contain" />
                </div>
                <div className="text">
                  <h4>Have Any Questions</h4>
                  <p>Don&apos;t hesitate to ask your questions. We will answer all of them.</p>
                  <Link href="mailto:contact@nextteammate.com">
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
      <div className="">
        <div className="row align-items-center px-[10%]">
          <div className="col-xl-4 col-lg-5">
            <div className="section-title left-align wow fadeInDown">
              <p className="subtitle">
                <i className="fal fa-book" />
                Contact Us
              </p>
              <h3 className="title">Have Any Questions Get In Touch</h3>
            </div>
            <div className="contact_info mb-md-80">
              <div className="flex flex-col gap-8">
                <div className="wow fadeInUp flex flex-row gap-4">
                  <i className="icon fal fa-map-marker-alt text-3xl  text-green-500" />
                  <div className="text">
                    <h6>USA</h6>
                    <div className="mt-2 flex flex-col">
                      <strong>Email:</strong>
                      contact@nextteammate.com
                    </div>
                    <div className="mt-2 flex flex-col">
                      <strong>Address:</strong>
                      402 E Pennsylvania blvd
                      <br />
                      Feasterville PA 19053
                    </div>
                    <div className="mt-2 flex flex-col">
                      <strong>Phone:</strong>+1 267-208-0020
                    </div>
                  </div>
                </div>
                <div className="wow fadeInDown flex flex-row gap-4">
                  <i className="icon fal fa-map-marker-alt text-3xl text-green-500" />
                  <div className="text">
                    <h6>Bulgaria</h6>
                    <div className="mt-2 flex flex-col">
                      <strong>Email:</strong>
                      <div>contact@nextteammate.com</div>
                    </div>
                    <div className="mt-2 flex flex-col">
                      <strong>Address:</strong>
                      ul. &quot;Boris Rumenov&quot; 16 1407
                      <br />
                      Promishlena Zona Hladilnika, Sofia
                    </div>
                    <div className="mt-2 flex flex-col">
                      <strong>Phone:</strong>
                      <div>+359 88 4188911</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-7">
            <div className="contact_map relative z-1 wow fadeInRight flex flex-col gap-8" id="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.590101717821!2d-75.0114418!3d40.151413399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6ad77a03ed939%3A0x23d1508632b7b17d!2s402%20E%20Pennsylvania%20Blvd%2C%20Feasterville-Trevose%2C%20PA%2019053!5e0!3m2!1sen!2sus!4v1663016138375!5m2!1sen!2sus"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                width="100%"
                height="100%"
              />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d733.5790973907042!2d23.3189912!3d42.6546503!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8467fe4845e7%3A0xc52cabdf7408d4ab!2z0YPQuy4g4oCe0JHQvtGA0LjRgSDQoNGD0LzQtdC90L7QsuKAnCAxNiwgMTQwNyDQn9GA0L7QvNC40YjQu9C10L3QsCDQt9C-0L3QsCDQpdC70LDQtNC40LvQvdC40LrQsCwg0KHQvtGE0LjRjywg0JHRitC70LPQsNGA0LjRjw!5e0!3m2!1sbg!2sus!4v1678314540211!5m2!1sbg!2sus"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <section className="section">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="section-title wow fadeInDown">
                    <p className="subtitle">
                      <i className="fal fa-book" />
                      Drop A Message
                    </p>
                    <h3 className="title">Reach out to us for a prosperous partnership</h3>
                  </div>
                  <div className="flex flex-col w-full items-center gap-2 mb-4">
                    <div className="text-2xl w-[90%] text-left">How it works (4 easy steps):</div>
                    <div className="text-xl w-[90%] text-left">1. Fill out the contact form</div>
                    <div className="text-xl w-[90%] text-left">
                      2. After we check your company, we will give you temporary access to our platform. There you can
                      find all of our available teammates with video resumes and get familiar with our system.
                    </div>
                    <div className="text-xl w-[90%] text-left">
                      3. We schedule an online interview with the selected prospects.
                    </div>
                    <div className="text-xl w-[90%] text-left">
                      4. After choosing the right candidate you sign a contract and start working with your new
                      teammate.
                    </div>
                  </div>
                </div>
              </div>
              <form
                className="mf_form_validate ajax_submit wow fadeInUp"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSuccess(null);
                  setError(null);

                  const name = e.target.name.value;
                  const phone = e.target.phone.value;
                  const email = e.target.email.value;
                  const subject = e.target.subject.value;
                  const message = e.target.message.value;
                  const company = e.target.company.value;
                  const website = e.target.website.value;

                  if (!name || !phone || !email || !subject | !message) {
                    setError("Please fill out all the fields!");
                    return;
                  }

                  if (
                    !String(email)
                      .toLowerCase()
                      .match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
                  ) {
                    setError("Please fill out a valid email!");
                    return;
                  }

                  const body = {
                    name,
                    phone,
                    email,
                    subject,
                    company,
                    website,
                    message,
                  };
                  const bodyJSON = JSON.stringify(body);

                  let result;
                  result = await fetch("/api/contact-form", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: bodyJSON,
                  });
                  const content = await result.json();
                  if (result.status !== 200) {
                    setError(content.message);
                    return;
                  }

                  setSuccess("Thanks! We'll be in touch shortly.");
                }}
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group form_style">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        autoComplete="off"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group form_style">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        autoComplete="off"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group form_style">
                      <label>Website (Optional)</label>
                      <input
                        type="text"
                        name="website"
                        className="form-control"
                        autoComplete="off"
                        placeholder="Your Website (Optional)"
                        required={false}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group form_style">
                      <label>Company (Optional)</label>
                      <input
                        type="text"
                        name="company"
                        className="form-control"
                        autoComplete="off"
                        placeholder="Your Company (Optional)"
                        required={false}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group form_style">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        autoComplete="off"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group form_style">
                      <label>Subject</label>
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        autoComplete="off"
                        placeholder="I Would Like To Discuss"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group form_style">
                      <label>Message</label>
                      <textarea
                        rows={10}
                        className="form-control"
                        placeholder="Write Message"
                        autoComplete="off"
                        name="message"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 text-center ">
                    <button type="submit" className="thm-btn bg-thm-color-three thm-color-three-shadow btn-rectangle">
                      Send Your Message <i className="fal fa-chevron-right ml-2" />
                    </button>
                  </div>
                  {error ? (
                    <div className="flex flex-row justify-center texte-center bg-red-400 my-4 rounded-xl text-white min-w-full">
                      {error}
                    </div>
                  ) : (
                    <></>
                  )}
                  {success ? (
                    <div className="flex flex-row justify-center texte-center bg-green-400 my-4 rounded-xl text-white min-w-full">
                      {success}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </form>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Contact;
