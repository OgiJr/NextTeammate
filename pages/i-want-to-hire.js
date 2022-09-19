import HireBanner from "../src/components/hire/HireBanner";
import HireSkills from "../src/components/hire/HireSkills";
import HireFind from "../src/components/hire/HireFind";
import HireWhy from "../src/components/hire/HireWhy";
import Layout from "../src/layout/Layout";

import React from "react";

const IWantToHire = () => {
  return (
    <Layout>
      <HireBanner />
      <HireSkills />
      <HireWhy />
      <HireFind />
    </Layout>
  );
};

export default IWantToHire;
