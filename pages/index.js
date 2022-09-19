import IndexSkills from "../src/components/index/IndexSkills";
import IndexWeCare from "../src/components/index/IndexWeCare";
import IndexBanner from "../src/components/index/IndexBanner";
import IndexSolutions from "../src/components/index/IndexSolutions";
import IndexVideo from "../src/components/index/IndexVideo";
import Layout from "../src/layout/Layout";

import React from "react";

const Index = () => {
  return (
    <Layout>
      <IndexBanner />
      <IndexWeCare />
      <IndexSolutions />
      <IndexSkills />
      <IndexVideo />
    </Layout>
  );
};

export default Index;
