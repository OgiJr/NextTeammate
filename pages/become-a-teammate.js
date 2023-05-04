import WorkAbout from "../src/components/work/WorkAbout";
import WorkBanner from "../src/components/work/WorkBanner";
import WorkTeam from "../src/components/work/WorkTeam";
import Layout from "../src/layout/Layout";
import React from "react";
import { dbConnect, dbUserToIronUser } from "../lib/db";
import User from "../models/User";
import Footer from "../src/layout/Footer";
import Head from "next/head";
import Script from "next/script";

export const getServerSideProps = async () => {
  dbConnect();

  const users = await User.find({ is_admin: false });
  const ironUsers = [
    ...(await Promise.all(users.map(async (u) => await dbUserToIronUser(u)))),
  ];

  return {
    props: { users: ironUsers },
  };
};

const IWantToWork = ({ users }) => {
  return (
    <Layout language={"en"}>
      <Head>
        <title>
          Team up with a U.S. based company from the comfort of your own home
        </title>

        <meta
          name="google-site-verification"
          content="TXwDNoDHW1ddiHu53LjULUQvXFhctJyVUjEHZaiLII4"
        />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-35BKM9CFFZ"
        ></Script>
        <Script>
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-35BKM9CFFZ');`}
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
        <link
          rel="canonical"
          href="https://www.nextteammate.com/become-a-teammate/"
        />
        <link
          rel="shortlink"
          href="https://nextteammate.com/become-a-teammate"
        />
        <link rel="mask-icon" href="icon.png" color="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://www.nextteammate.com/become-a-teammate"
        />
        <link
          rel="shortlink"
          href="https://nextteammate.com/become-a-teammate"
        />
        <link rel="shortcut icon" href="icon.jpg" />
        <link rel="apple-touch-icon" href="icon.png" />
        <link rel="icon" type="image/png" sizes="60x60" href="icon.png" />
        <link rel="icon" type="image/jpg" sizes="60x60" href="icon.jpg" />
        <link rel="mask-icon" href="icon.png" color="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        <meta
          name="description"
          content="Nextteammate is here to take care of the whole employment process – from finding a suitable employer/company for you to payroll and health benefits administration."
        />

        <meta
          name="keywords"
          content="Cheap, Cheap working hand, Qualified workers, Educated workers,  Profitable, Flexibility, Global, International, International business, Employment, Global talents, Biusiness solution, Minimum wage,"
        />

        <meta property="og:locale" content="en" />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content="Start Working on the US Market Remotely Today."
        />
        <meta
          property="og:title"
          content="Team up with a U.S. based company from the comfort of your own home "
        />
        <meta
          property="og:description"
          content="Nextteammate is here to take care of the whole employment process – from finding a suitable employer/company for you to payroll and health benefits administration."
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
          content="https://nextteammate.com/assets/images/banner/about-banner.jpg"
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
          content="Start Working on the US Market Remotely Today."
        />
        <meta
          name="twitter:description"
          content="Nextteammate is here to take care of the whole employment process – from finding a suitable employer/company for you to payroll and health benefits administration."
        />
        <meta
          name="twitter:image:src"
          content="https://nextteammate.com/assets/images/banner/banner-work.jpg"
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
          content="Start Working on the US Market Remotely Today."
        />
        <meta name="Creator" content="vasil_beevski@abv.bg" />
        <meta name="Publisher" content="https://www.nextteammate.com" />
        <meta name="state" content="global" />
        <meta name="country" content="global" />
        <meta name="author" content="Vasil Beebvski" />
        <meta name="copyright" content="Vasil Beebvski" />
        <meta
          name="page-topic"
          content="Start Working on the US Market Remotely Today."
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
      <WorkBanner />
      <WorkAbout />
      <WorkTeam users={users} />
      <Footer />
    </Layout>
  );
};

export default IWantToWork;
