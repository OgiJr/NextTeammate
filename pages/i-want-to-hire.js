import HireBanner from "../src/components/hire/HireBanner";
import HireSkills from "../src/components/hire/HireSkills";
import HireFind from "../src/components/hire/HireFind";
import HireWhy from "../src/components/hire/HireWhy";
import Layout from "../src/layout/Layout";

import React from "react";
import Footer from "../src/layout/Footer";

const IWantToHire = () => {
  return (
    <Layout language={"en"}>
      <HireBanner />
      <HireSkills />
      <HireWhy />
      <HireFind />
      <Footer />
    </Layout>
  );
};

export default IWantToHire;
