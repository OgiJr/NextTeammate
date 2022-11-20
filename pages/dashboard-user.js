import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withIronSessionSsr } from "iron-session/next";
import Link from "next/link";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { authCookie } from "../lib/cookies";
import Image from "next/image";
import { dbConnect, dbUserToIronUser, getIronUserWorkStats, isIronUserAssigned, isIronUserWorking } from "../lib/db";
import User from "../models/User";
import Footer from "../src/layout/Footer";
import { useRouter } from "next/router";
import { cdnSubpath } from "../lib/cdn";

const DashboardUser = ({
  user,
  is_working,
  work_hours_this_week,
  work_hours_this_month,
  average_hours_per_week,
  projected_salary,
  is_assigned,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState(null);

  return (
    <div className="min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-8">
      {isModalOpen ? (
        <div className="flex flex-col justify-center items-center z-40 absolute top-0 left-0 w-[100vw] h-[190vh] bg-[#33333333]">
          <div className="bg-white rounded-lg flex flex-col justify-start w-[50%] h-fit p-4">
            <div className="flex flex-row justify-end w-full">
              <div
                className="text-4xl"
                onClick={() => {
                  setIsModalOpen(false);
                  setFile(null);
                }}
              >
                <FontAwesomeIcon icon={faX} size="1x" color="#000" />
              </div>
            </div>
            <div className="flex flex-row justify-center w-full text-4xl">Upload file here:</div>
            <div className="flex flex-row justify-center w-full">
              <Form
                className="flex flex-col justify-center w-full items-center justify-items-center mt-8"
                onSubmit={async (e) => {
                  e.preventDefault();

                  if (!file) {
                    setError("Please select a picture!");
                    return;
                  }

                  let formData = new FormData();
                  formData.append("file", file);

                  let result;
                  result = await fetch("/api/upload-video", {
                    method: "POST",
                    body: formData,
                  });
                  let content = await result.json();
                  if (result.status !== 200) {
                    setError(content.message);
                    return;
                  }

                  setError(null);
                  setIsModalOpen(false);
                }}
              >
                <Form.Group controlId="file" onChange={(e) => setFile(e.target.files[0])}>
                  <Form.Control type="file" accept="video/mp4,video/x-m4v,video/*" />
                </Form.Group>
                {file !== null ? (
                  <div className="flex flex-row justify-center w-full ">
                    <div className="!bg-[#007bff] !rounded-lg">
                      <button type="submit" className="text-white text-xl px-4 py-2">
                        Submit
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </Form>
            </div>
            <div className="flex flex-row justify-center w-full text-lg bg-[#ff0000] text-white">{error}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-row min-w-full bg-gradient-to-r from-cyan-500 to-blue-500 justify-between items-center px-10">
        <div className="flex flex-row justify-center my-2">
          <Link href="/dashboard-user">
            <Image src="/assets/images/nextlogowhite.png" width={100} height={100} layout="fixed" />
          </Link>
          <div className="hidden lg:flex flex-row text-center justify-center ml-2 mt-4 text-4xl text-white">
            Welcome, {user.first_name}!
          </div>{" "}
        </div>
        <div className="flex flex-col mt-3 md:mt-0 md:flex-row justify-evenly md:gap-8">
          <Button
            className="thm-btn bg-thm-color-three thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
            variant="success"
            onClick={() => {
              router.push("/zoom");
            }}
          >
            Sharing System
          </Button>
          <Button
            className="thm-btn bg-thm-color-five thm-color-five-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
            variant="danger"
            onClick={async () => {
              await fetch("/api/logout");
              router.push("/login");
            }}
          >
            Log Out
          </Button>
        </div>
      </div>
      <section className="team_details">
        <div className="container rounded-[16px]">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="flex flex-row justify-center">
                <img
                  src={`${cdnSubpath()}${user.picture}`}
                  alt="img"
                  className="image-fit wow fadeInLeft rounded-[12px] max-w-[40%] border-4 border-indigo-600"
                />
              </div>
            </div>
            <div className="col-lg-6 my-4">
              <div className="team_text pl-0 pl-xl-5 pl-lg-3 ">
                <h3 className="name wow fadeInDown">{user.first_name + " " + user.last_name}</h3>
                <p className="desi thm-color-two wow fadeInUp">{user.bio}</p>
                {is_assigned ? (
                  <ul className="info wow fadeInDown">
                    <li>
                      <i className="icon fal fa-clock bg-thm-color-three" />
                      <div className="text">
                        <h6 className="mb-0">Expected hours per week</h6>
                        <p className="mb-0">{user.work_data.expected_hours_weekly}</p>
                      </div>
                    </li>
                    <li>
                      <i className="icon fal fa-lightbulb-on" />
                      <div className="text">
                        <h6 className="mb-0">Work hours this week</h6>
                        <p className="mb-0">{work_hours_this_week}</p>
                      </div>
                    </li>
                    <li>
                      <i className="icon fal fa-calendar-week" />
                      <div className="text">
                        <h6 className="mb-0">Average hours per week</h6>
                        <p className="mb-0">{average_hours_per_week}</p>
                      </div>
                    </li>
                    <li>
                      <i className="icon fal fa-calendar" />
                      <div className="text">
                        <h6 className="mb-0">Work hours this month</h6>
                        <p className="mb-0">{work_hours_this_month}</p>
                      </div>
                    </li>
                    <li>
                      <i className="icon fal fa-dollar-sign" />
                      <div className="text">
                        <h6 className="mb-0">Projected Salary *</h6>
                        <p className="mb-0">
                          {projected_salary} {user.work_data.currency}
                        </p>
                      </div>
                    </li>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col items-center justify-center">
                        {is_working ? (
                          <Button
                            variant="danger"
                            className="px-4 text-2xl"
                            onClick={async () => {
                              await fetch("/api/clock-out");
                              router.reload();
                            }}
                          >
                            Clock Out
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            disabled={!user.work_data.current_price_per_hour}
                            className="px-4 text-2xl"
                            onClick={async () => {
                              await fetch("/api/clock-in");
                              router.reload();
                            }}
                          >
                            Clock In
                          </Button>
                        )}
                        <div className="flex flex-row justify-evenly gap-4">
                          <Button
                            variant="primary"
                            disabled={!user.work_data.current_price_per_hour}
                            className="px-4 text-2xl mt-4"
                            onClick={async () => {
                              setIsModalOpen(true);
                            }}
                          >
                            Upload Video
                          </Button>
                          {user.has_video ? (
                            <Button
                              variant="primary"
                              className="px-4 text-2xl mt-4"
                              onClick={() => router.push(`/view-video?id=${user._id}`)}
                            >
                              View Video
                            </Button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-row items-center justify-center gap-4">
                        <Link href="/edit-user">
                          <Button variant="dark" className="px-4 min-w-[25%]">
                            Edit Account
                          </Button>
                        </Link>
                        <Link href="/set-picture">
                          <Button variant="dark" className="px-4 min-w-[25%]">
                            Change Picture
                          </Button>
                        </Link>
                      </div>
                      <span>* This is a projection based on estimates and past performance, not a promise.</span>
                    </div>
                  </ul>
                ) : (
                  <div className="text-[#ff0000] text-xl"> Please ask the administrator to assign work data! </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req }) {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  if (user.is_admin || user.is_employer) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard-redirector",
      },
      props: {},
    };
  }

  try {
    dbConnect();

    const newUser = await User.findOne({ email: user.email });
    req.session.user = await dbUserToIronUser(newUser);
    await req.session.save();

    const { work_hours_this_week, work_hours_this_month, average_hours_per_week, projected_salary } =
      await getIronUserWorkStats(req.session.user);

    return {
      props: {
        user: req.session.user,
        is_assigned: isIronUserAssigned(req.session.user),
        is_working: isIronUserWorking(req.session.user),
        work_hours_this_week,
        work_hours_this_month,
        average_hours_per_week,
        projected_salary,
      },
    };
  } catch (e) {
    return {
      props: {
        user,
        is_working: isIronUserWorking(user),
        work_hours_this_week: "Error",
        work_hours_this_month: "Error",
      },
    };
  }
}, authCookie);

export default DashboardUser;
