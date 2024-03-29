import Head from "next/head";
import { Fragment } from "react";
import "../styles/globals.css";
import React from "react";
import { DefaultSeo } from "next-seo";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
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
      <Component {...pageProps} />
      <Script
        type="text/javascript"
        charset="UTF-8"
        src="//cdn.cookie-script.com/s/677eea5fdcc0ef85104e7bb52ef20e68.js"
      ></Script>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-11157459203"></Script>
      <script>
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-11157459203');`}
      </script>
    </Fragment>
  );
}

export default MyApp;
