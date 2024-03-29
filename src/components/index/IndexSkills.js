import Counter from "../Counter";
import React from "react";

const Banner1 = ({ text, color }) => (
  <div className="progress_box grid wow fadeInUp lg:min-h-full !m-0" data-wow-delay=".30ms">
    <div className="circle_bar" data-percent={97} data-track-color="#ecf2ff" data-bar-color={color} data-size={80}>
      <div className="counter transform-center text-center">
        <Counter end={91} />
      </div>
    </div>
    <div className="text">
      <h5 className="mb-0">{text}</h5>
    </div>
  </div>
);

const Banner2 = ({ text, color }) => (
  <div className="progress_box grid wow fadeInUp lg:min-h-full !m-0" data-wow-delay=".30ms">
    <div className="circle_bar" data-percent={97} data-track-color="#702963" data-bar-color={color} data-size={80}>
      <div className="counter transform-center text-center">
        <Counter end={92} />
      </div>
    </div>
    <div className="text">
      <h5 className="mb-0">{text}</h5>
    </div>
  </div>
);

const IndexSkills = () => {
  return (
    <div className="min-w-[100vw] flex flex-row justify-center">
      <div className="lg:w-[50%] w-[100%] bg-[#1b2336] h-[100%] flex flex-col justify-start p-16">
        <h1 className="text-[14px] text-white font-bold uppercase ">
          <i className="fal fa-book mr-2 font-semibold" />
          Our Company
        </h1>
        <h2 className="text-3xl text-white font-bold">NextTeammate- a comprehensive solution</h2>
        <h4 className="text-2xl text-white font-normal">
          Our company believes that remote collaboration and financial system without borders is what the future holds.
          We replace outdated, unnecessary and ineffective methods with new and improved ways to master the workplace.
        </h4>
        <div className="flex flex-row justify-center my-20 gap-20">
          <Banner1
            text={
              <>
                Happy
                <br />
                Clients
              </>
            }
            color="#65cfa9"
          />
          <Banner2
            text={
              <>
                Happy
                <br />
                Employees
              </>
            }
            color="#ffbd3f"
          />
        </div>
      </div>
      <div className="lg:w-[50%] min-h-[100%] bg-[url('/assets/images/workiworkin.webp')] bg-cover"></div>
    </div>
  );
};

export default IndexSkills;
