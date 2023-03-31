import Layout from "../../src/layout/Layout";
import React from "react";
import Footer from "../../src/layout/Footer";

const SetPicture = () => {
  return (
    <Layout language={"en"}>
      <div className="flex flex-row justify-center min-w-full">
        <div className="flex flex-col justify-center min-w-full items-center justify-items-center">
          <div
            className="bg-gray-100 lg:w-[40vw] w-[80vw] py-8 mb-8 !border-sky-600 px-8"
            style={{ borderWidth: 4, borderStyle: "solid", borderRadius: 20 }}
          >
            <div className="text-center min-w-full text-4xl font-semibold">Mariya Terziyska</div>
            <div className="flex flex-col justify-center items-center">
              <video className="w-[100%]" controls>
                <source src={"/emails/terziyska.mov"} />
              </video>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default SetPicture;
