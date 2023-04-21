import { useState } from "react";
import PageTitleBanner from "../src/components/PageTitleBanner";
import VideoPopup from "../src/components/VideoPopup";
import Layout from "../src/layout/Layout";
import React from "react";
import Footer from "../src/layout/Footer";
import Image from "next/image";

import peopleanalutics from "../public/assets/images/about/peopleanalutics.png";
import money_bag from "../public/assets/images/icons/money-bag-dynamic-gradient copy.png";
import shield_dynamic from "../public/assets/images/icons/sheild-dynamic-gradient copy.png";
import wifi_dynamic from "../public/assets/images/icons/wifi-dynamic-gradient copy.png";
import working_women from "../public/assets/images/about/workingwomen1.png";
import circle_3 from "../public/assets/images/elements/circle3.png";
import Head from "next/head";

const About = () => {
  const [video, setVideo] = useState(false);
  return (
    <Layout language={"en"}>
      <Head>
        <title>We will redefine your entire employment process</title>

        <meta
          name="google-site-verification"
          content="TXwDNoDHW1ddiHu53LjULUQvXFhctJyVUjEHZaiLII4"
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-35BKM9CFFZ"
        ></script>
        <script>
          {`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-35BKM9CFFZ');`}
        </script>

        <link rel="alternate" hrefLang="en" href="https://nextteammate.com" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        />
        <link rel="icon" href="icon.jpg" />
        <link rel="shortcut icon" href="icon.jpg" />
        <link rel="canonical" href="https://www.nextteammate.com/about" />
        <link rel="shortlink" href="https://nextteammate.com/about" />
        <link rel="mask-icon" href="icon.png" color="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://www.nextteammate.com/about"
        />
        <link rel="shortlink" href="https://nextteammate.com/about" />
        <link rel="shortcut icon" href="icon.jpg" />
        <link rel="apple-touch-icon" href="icon.png" />
        <link rel="icon" type="image/png" sizes="60x60" href="icon.png" />
        <link rel="icon" type="image/jpg" sizes="60x60" href="icon.jpg" />
        <link rel="mask-icon" href="icon.png" color="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        <meta
          name="description"
          content="We are an US based Company Providing a Cost-Effective Solution for Reinforcing Your Remote Office Workforce."
        />

        <meta
          name="keywords"
          content="Recruitment, Talent acquisition, Employee retention,HR consulting, HR solutions, Performance management, HR software, HR technology, Benefits administration, Compliance management, Payroll processing,"
        />

        <meta property="og:locale" content="en" />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content="We will redefine your entire employment process"
        />
        <meta
          property="og:title"
          content="We will redefine your entire employment process"
        />
        <meta
          property="og:description"
          content="We are an US based Company Providing a Cost-Effective Solution for Reinforcing Your Remote Office Workforce."
        />
        <meta
          property="og:image"
          content="https://nextteammate.com/assets/images/banner/about-banner.jpg"
        />
        <meta
          property="og:image"
          content="https://nextteammate.com/assets/images/banner/banner-work.jpg"
        />
        <meta
          property="og:image"
          content="https://nextteammate.com/assets/images/banner/index-banner.jpeg"
        />
        <meta
          property="og:image"
          content="https://nextteammate.com/assets/images/banner/work-banner.jpg"
        />
        <meta
          property="og:image"
          content="https://nextteammate.com/assets/images/banner/contact-banner.jpg"
        />
        <meta property="og:url" content=" https://www.nextteammate.com/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="We will redefine your entire employment process"
        />
        <meta
          name="twitter:description"
          content="We are an US based Company Providing a Cost-Effective Solution for Reinforcing Your Remote Office Workforce."
        />
        <meta
          name="twitter:image:src"
          content="https://nextteammate.com/assets/images/banner/about-banner.jpg"
        />
        <meta name="twitter:url" content="https://www.nextteammate.com/" />
        <meta name="twitter:domain" content="https://www.nextteammate.com/" />
        <meta property="og:type" content="article" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="revisit-after" content="3 day" />
        <meta name="robots" content="index, follow, " />
        <meta name="msnbot" content="index, follow, " />
        <meta name="googlebot" content="index, follow, " />
        <meta name="rating" content="All" />
        <meta
          name="classification"
          content="We will redefine your entire employment process"
        />
        <meta name="Creator" content="vasil_beevski@abv.bg" />
        <meta name="Publisher" content="https://www.nextteammate.com" />
        <meta name="state" content="global" />
        <meta name="country" content="global" />
        <meta name="author" content="Vasil Beebvski" />
        <meta name="copyright" content="Vasil Beebvski" />
        <meta
          name="page-topic"
          content="We will redefine your entire employment process"
        />
        <meta name="Distribution" content="Global" />
        <meta name="Rating" content="General" />
        <meta name="apple-touch-fullscreen" content="YES" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="Generator" content="VB design studio" />
        <meta name="Publisher" content="https://www.nextteammate.com" />
        <meta
          name="SPAM Reporting"
          content=" info@spamcop.net, info@spamcop.com "
        />
        <meta name="country" content="global" />
        <meta name="author" content="Vasil Beebvski" />
        <meta name="copyright" content="Vasil Beebvski" />
        <meta
          name="page-topic"
          content="Find a Competent, Cost-Effective Candidate With the Click of a Button"
        />
        <meta name="Distribution" content="Global" />
        <meta name="Rating" content="General" />
        <meta name="apple-touch-fullscreen" content="YES" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="Generator" content="VB design studio" />
        <meta name="Publisher" content="https://www.nextteammate.com" />
        <meta
          name="SPAM Reporting"
          content=" info@spamcop.net, info@spamcop.com "
        />
      </Head>
      <PageTitleBanner
        pageName="About Us"
        url="assets/images/banner/about-banner.jpg"
      />
      {video && <VideoPopup close={() => setVideo(false)} />}
      <section className="section about_inner">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6">
              <div className="image_box  mb-md-80 wow fadeInLeft ">
                <Image src={peopleanalutics} alt="img" className="image-fit" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="section-title left-align wow fadeInDown">
                <p className="subtitle">
                  <i className="fal fa-book" />
                  About Us
                </p>
                <h3 className="title">
                  We will redefine your entire employment process:
                </h3>
                <p>
                  During and after the pandemic two significant changes in the
                  workforce happened. At first working remotely was found to be
                  a good alternative and secondly there is an increasing number
                  of open positions for reliable people willing to work.
                  Noticing those two trends and experimenting with different
                  models we found that there is a pool of good, educated,
                  reliable people willing to work remotely from overseas
                  countries. Using our connections in Bulgaria and comply with
                  the local law we created a company to help US based companies
                  to find a proper team member for their remote work needs. Our
                  teammates can help with: phone calls, scheduling, filling
                  paperwork and almost every other aspect of the work in the
                  office.
                </p>
                <p>
                  Our main priority is to make your life easier so you can focus
                  on your business. You don&apos;t need to do: payroll, pay
                  vacation time, health insurance and other benefits.
                </p>
              </div>
              <ul className="about_list row">
                <li className="col-md-6 wow fadeInUp">
                  <div className="icon">
                    <Image src={money_bag} alt="img" className="image-fit" />
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
                    <Image
                      src={shield_dynamic}
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
                <li className="col-md-6 wow fadeInDown">
                  <div className="icon">
                    <Image src={wifi_dynamic} alt="img" className="image-fit" />
                  </div>
                  <div className="text">
                    <h6 className="mb-2">Built in scheduling software</h6>
                    {/* <p className="mb-0">
                      Quis autem reprehenderit quein voluptate velit esseua
                    </p> */}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section-bg about_bg about style_2"
        style={{
          backgroundImage: "url(assets/images/dfqwerrfdddddftgfgfgf.png)",
        }}
      >
        <div className="container">
          <div className="row justify-content-between flex-row-reverse">
            <div className="col-lg-6">
              <div className="image_boxes style_2 relative z-1 h-100">
                <div className="flex">
                  <Image src={working_women} alt="img" />
                </div>
                {/* elements */}
                <Image src={circle_3} className="element_1" alt="Element" />
                <Image
                  src={circle_3}
                  className="element_2 rotate_elem"
                  alt="Element"
                />
                <Image
                  src={circle_3}
                  className="element_3 rotate_elem"
                  alt="Element"
                />
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 mb-md-80 text-white">
              <div className="section-title left-align wow fadeInUp">
                <p className="subtitle">
                  <i className="fal fa-book text-white" />
                  What to expect
                </p>
                <h3 className="title text-white">
                  Other advantages that we can offer:
                </h3>
                {/* <p className="mb-0">
                  Quis autem vel eum iure reprehenderit qui in ea voluptate esse
                  quam nihil molestiae conseq uaturvel illum qui dolorem eum
                  fugiat quo voluptas nulla pariatur{" "}
                </p> */}
              </div>
              <ul className="about_list style_2 mb-xl-30 wow fadeInDown">
                <li>Online secure conference platform</li>
                <li>Secure and encrypted file sharing platform</li>
                <li>US phone number to your teammate</li>
                <li>Laptops, computers, and various working equipment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* About Us End */}
      {/* Team Start */}
      {/* <WorkTeam users={users} /> */}
      <Footer />
    </Layout>
  );
};

export default About;
