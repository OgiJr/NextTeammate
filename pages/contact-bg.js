import Link from "next/dist/client/link";
import PageTitleBanner from "../src/components/PageTitleBanner";
import Layout from "../src/layout/Layout";
import React, { useState } from "react";
import Footer from "../src/layout/FooterBg";

const Contact = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  return (
    <Layout language={"bg"}>
      <PageTitleBanner pageName="Свържете се с нас" url="assets/images/banner/contact-banner.jpg" />
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title wow fadeInUp">
                <p className="subtitle">
                  <i className="fal fa-book" />
                  Свържете се с нас
                </p>
                <h3 className="title">Свържете се с нас ако искате да работим заедно / имате въпроси</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="contact_faq_box shadow_1 wow fadeInDown" data-wow-delay=".30ms">
                <div className="icon">
                  <img src="assets/images/icons/phone-incoming-dynamic-gradient copy.png" alt="icon" className="image-fit-contain" />
                </div>
                <div className="text">
                  <h4>Телефон</h4>
                  <p>Свържете се с нас от 16:00 to 24:00 Пон-Петък. (Българско време)</p>
                  <Link href="tel:+12672658100">
                    <a className="thm-btn bg-thm-color-three thm-color-three-shadow btn-rectangle">
                      Звъннете <i className="fal fa-chevron-right ml-2" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact_faq_box shadow_1 wow fadeInUp" data-wow-delay=".40ms">
                <div className="icon">
                  <img src="assets/images/icons/chat-text-dynamic-gradient copy.png" alt="icon" className="image-fit-contain" />
                </div>
                <div className="text">
                  <h4>Имате ли въпроси към нас?</h4>
                  <p>Не се колебайте, изпрате ни имейл.</p>
                  <Link href="mailto:nextteammateltd@gmail.com">
                    <a className="thm-btn bg-thm-color-two thm-color-two-shadow btn-rectangle">
                      Контакт <i className="fal fa-chevron-right ml-2" />
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
                Контакт
              </p>
              <h3 className="title">Искате да се свържете с нас?</h3>
            </div>
            <div className="contact_info mb-md-80">
              <ul>
                <li className="wow fadeInUp">
                  <i className="icon fal fa-map-marker-alt" />
                  <div className="text">
                    <h6>Локация</h6>
                    <li>
                      бул. Пенсилвания 402 E
                      <br />
                      Фестървил PA 19053
                    </li>
                  </div>
                </li>
                <li className="wow fadeInDown">
                  <i className="icon fal fa-envelope-open-text" />
                  <div className="text">
                    <h6>Имейл</h6>
                    <p> nextteammateltd@gmail.com</p>
                  </div>
                </li>
                <li className="wow fadeInUp">
                  <i className="icon fal fa-phone" />
                  <div className="text">
                    <h6>Звъннете</h6>
                    <p>
                      <strong>Телефон: </strong> +(1) 267 - 2080 - 0020
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-8 col-lg-7">
            <div className="contact_map relative z-1 wow fadeInRight" id="map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.590101717821!2d-75.0114418!3d40.151413399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6ad77a03ed939%3A0x23d1508632b7b17d!2s402%20E%20Pennsylvania%20Blvd%2C%20Feasterville-Trevose%2C%20PA%2019053!5e0!3m2!1sen!2sus!4v1663016138375!5m2!1sen!2sus" style={{ border: 0 }} allowFullScreen loading="lazy" width="100%" height="100%" />
            </div>
          </div>
          <section className="section">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="section-title wow fadeInDown">
                    <p className="subtitle">
                      <i className="fal fa-book" />
                      Изпратете съобщение
                    </p>
                    <h3 className="title">Свържете се за едно дълго и успешно партньорство</h3>
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

                  const body = { name, phone, email, subject, message };
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
                      <label>Име</label>
                      <input type="text" name="name" className="form-control" autoComplete="off" placeholder="Full Name" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group form_style">
                      <label>Телефон</label>
                      <input type="text" name="phone" className="form-control" autoComplete="off" placeholder="Phone Number" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group form_style">
                      <label>Имейл</label>
                      <input type="email" name="email" className="form-control" autoComplete="off" placeholder="Email Address" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group form_style">
                      <label>Заглавие</label>
                      <input type="text" name="subject" className="form-control" autoComplete="off" placeholder="I Would Like To Discuss" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group form_style">
                      <label>Съобщение</label>
                      <textarea rows={10} className="form-control" placeholder="Write Message" autoComplete="off" name="message" defaultValue={""} />
                    </div>
                  </div>
                  <div className="col-lg-12 text-center">
                    <button type="submit" className="thm-btn bg-thm-color-three thm-color-three-shadow btn-rectangle">
                      Изпратете съобщение <i className="fal fa-chevron-right ml-2" />
                    </button>
                  </div>
                  {error ? <div className="flex flex-row justify-center texte-center bg-red-400 my-4 rounded-xl text-white min-w-full">{error}</div> : <></>}
                  {success ? <div className="flex flex-row justify-center texte-center bg-green-400 my-4 rounded-xl text-white min-w-full">{success}</div> : <></>}
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
