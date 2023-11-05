import IndexSkills from "../src/components/index/IndexSkills";
import IndexWeCare from "../src/components/index/IndexWeCare";
import IndexBanner from "../src/components/index/IndexBanner";
import IndexSolutions from "../src/components/index/IndexSolutions";
import IndexVideo from "../src/components/index/IndexVideo";
import Layout from "../src/layout/Layout";

import React from "react";
import Footer from "../src/layout/Footer";
import Head from "next/head";
import Script from "next/script";
import VideoPlayer from "../lib/video_player";

const Index = () => {
  return (
    <Layout language={"en"}>
      <Head>
        <title>Find your New Next Teammate with the click of a button</title>

        <meta
          name="google-site-verification"
          content="TXwDNoDHW1ddiHu53LjULUQvXFhctJyVUjEHZaiLII4"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-35BKM9CFFZ"
        ></Script>
        <Script>
          {` window.dataLayer = window.dataLayer || []; function gtag()
          {dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', 'G-35BKM9CFFZ'); `}
        </Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-11157459203"
        ></Script>
        <Script>
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-11157459203');`}
        </Script>
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
        <link rel="canonical" href="https://www.nextteammate.com/" />
        <link rel="shortlink" href="https://nextteammate.com/" />
        <link rel="mask-icon" href="icon.png" color="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://www.nextteammate.com/"
        />
        <link rel="shortlink" href="https://nextteammate.com/" />
        <link rel="shortcut icon" href="icon.jpg" />
        <link rel="apple-touch-icon" href="icon.png" />
        <link rel="icon" type="image/png" sizes="60x60" href="icon.png" />
        <link rel="icon" type="image/jpg" sizes="60x60" href="icon.jpg" />
        <link rel="mask-icon" href="icon.png" color="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        <meta
          name="description"
          content="NextTeammate was created to redefine the employment process for your company. We provide prescreened foreign team members and a new Collaborate from Home (CFH) system which is easy, reliable, secure, and most importantly, cost effective. "
        />

        <meta
          name="keywords"
          content="NextTeammate, Next Teammate, Workforce, Teammate, Employee, Employer, Remote, Looking for employee,  Next, Office, Bookkeeping, Accounting, Medical, Work hand, Work, BPO system,  Work from home, Home office, Find worker, Find employee, Find employer, Job platform, Online job platform, Online job, Job,HRcompany, HR business, Account, CFH system, Cost effective "
        />

        <meta property="og:locale" content="en" />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content="Find your NextTeammate with the click of a button."
        />
        <meta
          property="og:title"
          content="Easily Find Cost-Effective, Qualified, Remote Office Teammates  Eager to Work. Learn More!"
        />
        <meta
          property="og:description"
          content="NextTeammate was created to redefine the employment process for your company. We provide prescreened foreign team members and a new Collaborate from Home (CFH) system which is easy, reliable, secure, and most importantly, cost effective."
        />
        <meta
          property="og:image"
          content="https://nextteammate.com/assets/images/banner/index-banner.jpeg"
        />
        <meta
          property="og:image"
          content="https://nextteammate.com/assets/images/banner/about-banner.jpg"
        />
        <meta
          property="og:image"
          content="https://nextteammate.com/assets/images/banner/work-banner.jpg"
        />
        <meta
          property="og:image"
          content="https://nextteammate.com/assets/images/banner/banner-work.jpg"
        />
        <meta
          property="og:image"
          content="https://nextteammate.com/assets/images/banner/contact-banner.jpg"
        />
        <meta property="og:url" content=" https://www.nextteammate.com/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Find your NextTeammate with the click of a button."
        />
        <meta
          name="twitter:description"
          content="NextTeammate was created to redefine the employment process for your company. We provide prescreened foreign team members and a new Collaborate from Home (CFH) system which is easy, reliable, secure, and most importantly, cost effective."
        />
        <meta
          name="twitter:image:src"
          content="https://nextteammate.com/assets/images/banner/index-banner.jpeg "
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
          content="Easily Find Cost-Effective, Qualified, Remote Office Teammates  Eager to Work. Learn More!"
        />
        <meta name="Creator" content="vasil_beevski@abv.bg" />
        <meta name="Publisher" content="https://www.nextteammate.com" />
        <meta name="state" content="global" />
        <meta name="country" content="global" />
        <meta name="author" content="Vasil Beebvski" />
        <meta name="copyright" content="Vasil Beebvski" />
        <meta
          name="page-topic"
          content="Easily Find Cost-Effective, Qualified, Remote Office Teammates  Eager to Work. Learn More!"
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

      <IndexBanner />
      <IndexWeCare />
      <IndexSolutions />
      <div
        className=" w-full rounded-xl"
      >
        <div className="mx-auto lg:w-[60%] w-[85%]"><VideoPlayer src="/sunshine/sunshine.m3u8" /></div>
      </div>
      <IndexSkills />
      <IndexVideo />
      <Footer />
    </Layout>
  );
};

export default Index;
