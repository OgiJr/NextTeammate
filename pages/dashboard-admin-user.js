import { useState } from "react";
import PageTitleBanner from "../src/components/PageTitleBanner";
import Layout from "../src/layout/Layout";

import React from "react";

const AdminUserPanel = () => {
  const [indicator, setIndicator] = useState(true);
  const [userData] = useState({
    expectedHours: 30,
    hoursThisWeek: 27.9,
    hoursPerMonth: 122,
    workingWeeks: 4,
    salary: 2133.35,
  });

  return (
    <Layout language={"en"}>
      <PageTitleBanner pageName="Managing Users" />

      <section className="section-padding team_details">
        <div className="container rounded-[16px] bg-gradient-to-r from-white via-slate-100 to-blue-500">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="team_img mb-md-80">
                <img
                  src="assets/images/team/user-panel-photo.jpeg"
                  alt="img"
                  className="image-fit wow fadeInLeft rounded-[12px]"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="team_text pl-0 pl-xl-5 pl-lg-3 ">
                <h3 className="name wow fadeInDown">Collins</h3>
                <p className="desi thm-color-two wow fadeInUp">
                  Elizabeth Collins
                </p>
                <ul className="social mb-xl-30 wow fadeInDown">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-behance" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-youtube" />
                    </a>
                  </li>
                </ul>
                <ul className="info wow fadeInDown">
                  <li>
                    <i className="icon fal fa-clock bg-thm-color-three" />
                    <div className="text">
                      <h6 className="mb-0">Expected hours per week:</h6>
                      <p className="mb-0 text-xl font-extrabold text-amber-500">
                        {userData.expectedHours} hours
                      </p>
                    </div>
                  </li>
                  <li>
                    <i className="icon fal fa-lightbulb-on" />
                    <div className="text">
                      <h6 className="mb-0">Work hours this week:</h6>
                      {indicator ? (
                        userData.expectedHours > userData.hoursThisWeek ? (
                          <p className="mb-0 text-xl font-extrabold text-red-600">
                            {userData.hoursThisWeek} hours
                          </p>
                        ) : (
                          <p className="mb-0 text-xl font-extrabold text-green-600">
                            {userData.hoursThisWeek} hours
                          </p>
                        )
                      ) : (
                        <p className="mb-0 text-xl font-extrabold text-amber-500">
                          {userData.hoursThisWeek} hours
                        </p>
                      )}
                    </div>
                  </li>
                  <li>
                    <i className="icon fal fa-calendar-week" />
                    <div className="text">
                      <h6 className="mb-0">Average hours per week:</h6>
                      {indicator ? (
                        userData.expectedHours >
                        userData.hoursPerMonth / userData.workingWeeks ? (
                          <p className="mb-0 text-xl font-extrabold text-red-600">
                            {userData.hoursPerMonth / userData.workingWeeks}{" "}
                            hours
                          </p>
                        ) : (
                          <p className="mb-0 text-xl font-extrabold text-green-600">
                            {userData.hoursPerMonth / userData.workingWeeks}{" "}
                            hours
                          </p>
                        )
                      ) : (
                        <p className="mb-0 text-xl font-extrabold text-amber-500">
                          {userData.hoursPerMonth / userData.workingWeeks} hours
                        </p>
                      )}
                    </div>
                  </li>
                  <li>
                    <i className="icon fal fa-calendar" />
                    <div className="text">
                      <h6 className="mb-0">Work hours this month:</h6>
                      {indicator ? (
                        <p className="mb-0 text-xl font-extrabold  text-green-600">
                          {userData.hoursPerMonth} hours
                        </p>
                      ) : (
                        <p className="mb-0 text-xl font-extrabold  text-amber-500">
                          {userData.hoursPerMonth} hours
                        </p>
                      )}
                    </div>
                  </li>
                  <li>
                    <i className="icon fal fa-dollar-sign" />
                    <div className="text">
                      <h6 className="mb-0">Projected Salary:</h6>
                      <p className="mb-0 text-xl font-extrabold  text-amber-500">
                        ${userData.salary.toFixed(2)}
                      </p>
                    </div>
                  </li>
                  <div className="flex items-center justify-center">
                    {indicator ? (
                      <button
                        type="button"
                        className="content-center px-10 p-3.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-500 hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={() => setIndicator(false)}
                      >
                        &#10008; Disable
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="content-center px-10 p-3.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-500 hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={() => setIndicator(true)}
                      >
                        &#10004; Enable
                      </button>
                    )}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminUserPanel;
