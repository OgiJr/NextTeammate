import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import Preloader from "../src/layout/Preloader";
import "../styles/globals.css";
import React from "react";
import { DefaultSeo } from "next-seo";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Fragment>
      <Script>
        {`
          footers = document.querySelectorAll("footer");
          if (footers.length > 1) {
            for (i = 1; i < footers.length; i++) {
              footers[i].remove();
            }
          }
        `}
      </Script>
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
      <Script
        type="text/javascript"
        charset="UTF-8"
        src="//cdn.cookie-script.com/s/677eea5fdcc0ef85104e7bb52ef20e68.js"
      ></Script>
    </Fragment>
  );
}

export default MyApp;
