import HireBanner from "../src/components/hire/HireBannerBg";
import HireSkills from "../src/components/hire/HireSkillsBg";
import HireFind from "../src/components/hire/HireFindBg";
import HireWhy from "../src/components/hire/HireWhyBg";
import Layout from "../src/layout/Layout";

import React from "react";
import Footer from "../src/layout/FooterBg";

const IWantToHire = () => {
  return (
    <Layout language={"bg"}>
      <HireBanner />
      <HireSkills />
      <HireWhy />
      <HireFind />
      <Footer />
    </Layout>
  );
};

export default IWantToHire;
