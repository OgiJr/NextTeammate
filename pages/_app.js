import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import Preloader from "../src/layout/Preloader";
import "../styles/globals.css";
import React from "react";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Fragment>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://nextteammate.com/",
          siteName: "NextTeammate",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <title>NextTeammate</title>
        <link rel="icon" type="image/png" sizes="32x32" href="favicon.ico" />
      </Head>
      {loading && <Preloader />}
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
