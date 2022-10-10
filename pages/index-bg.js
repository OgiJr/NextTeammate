import IndexSkills from "../src/components/index/IndexSkillsBg";
import IndexWeCare from "../src/components/index/IndexWeCareBg";
import IndexBanner from "../src/components/index/IndexBannerBg";
import IndexSolutions from "../src/components/index/IndexSolutionsBg";
import IndexVideo from "../src/components/index/IndexVideo";
import Layout from "../src/layout/Layout";

import React from "react";
import Footer from "../src/layout/FooterBg";

const Index = () => {
  return (
    <Layout language={"bg"}>
      <IndexBanner />
      <IndexWeCare />
      <IndexSolutions />
      <IndexSkills />
      <IndexVideo />
      <Footer />
    </Layout>
  );
};

export default Index;
