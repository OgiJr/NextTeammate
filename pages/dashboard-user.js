import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withIronSessionSsr } from "iron-session/next";
import Link from "next/link";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { authCookie } from "../lib/cookies";
import Image from "next/image";
import {
  dbCompanyToCompany,
  dbConnect,
  dbUserToIronUser,
  isIronUserAssigned,
  isIronUserWorking,
  isUserEmailInDb,
} from "../lib/db";
import User from "../models/User";
import Footer from "../src/layout/Footer";
import { useRouter } from "next/router";
import { cdnSubpath } from "../lib/cdn";
import useSWR from "swr";
import Company from "../models/Company";

const DashboardUser = ({ user, is_working, is_assigned, company }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState(null);

  const fetcher = (url) => {
    return fetch(url).then((res) => {
      return res.json();
    });
  };

  const { data: unread_data } = useSWR("/api/has-unread", fetcher, {
    refreshInterval: 500,
    refreshWhenHidden: true,
    onSuccess: (d) => {
      if (d.ping) {
        const audio = new Audio("/assets/sounds/notif.mp3");
        audio.play();
      }
    },
  });

  const [autoClockOut, setAutoClockOut] = React.useState(false);
  React.useEffect(() => {
    if (autoClockOut) {
      const audio = new Audio("/assets/sounds/notif.mp3");
      audio.play();
      setTimeout(() => alert("You have been auto clocked out!"), 1000);
      setAutoClockOut(false);
    }
  }, [autoClockOut]);

  useSWR("/api/auto-clock-out", fetcher, {
    refreshInterval: 1000,
    refreshWhenHidden: true,
    onSuccess: (d) => {
      setAutoClockOut(d.clockout);
    },
  });

  return (
    <div className="min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-8">
      {isModalOpen ? (
        <div className="flex flex-col justify-center items-center z-40 absolute top-0 left-0 w-[100vw] h-[100vh] bg-[#33333333]">
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
                <p> When you click submit, the website may appear frozen. Please be patient! </p>
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
          </div>
        </div>
        <div className="flex flex-col mt-3 md:mt-0 md:flex-row justify-evenly md:gap-8">
          {company && company.dropbox && (
            <Button
              className="thm-btn bg-blue-500 thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
              onClick={() => {
                window.location.assign(company.dropbox);
              }}
            >
              Dropbox
            </Button>
          )}
          <Button
            className="thm-btn bg-thm-color-three thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
            variant="success"
            onClick={() => {
              router.push("/zoom");
            }}
          >
            <div className="flex flex-row justify-center gap-2 justify-items-center items-center">
              <div>Sharing System</div>
              {unread_data && unread_data.unread ? <div className="text-[#ff0000] text-xl font-bold">!</div> : <></>}
            </div>
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
                  width={350}
                  height={350}
                  src={`${cdnSubpath()}${user.picture}`}
                  alt="img"
                  className="image-fit wow fadeInLeft rounded-[12px] max-w-[40%] border-4 border-indigo-600"
                />
              </div>
            </div>
            <div className="col-lg-6 my-4">
              <div className="team_text pl-0 pl-xl-5 pl-lg-3 ">
                <h3 className="name wow fadeInDown text-center">{user.first_name + " " + user.last_name}</h3>
                {user.categories.length > 0 && (
                  <h5 className="name wow fadeInDown text-center !text-[1rem] text-gray-800">
                    {user.categories.reduce((accum, c, index) => {
                      accum += c;
                      if (index !== user.categories.length - 1) {
                        accum += ", ";
                      }

                      return accum;
                    }, "")}
                  </h5>
                )}
                <p className="desi thm-color-two wow fadeInUp">{user.bio}</p>
                {is_assigned ? (
                  <ul className="info wow fadeInDown">
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
                      </div>
                    </div>
                  </ul>
                ) : (
                  <div className="text-[#ff0000] text-xl"> Please ask the administrator to assign work data! </div>
                )}
                <div className="flex flex-row items-center justify-center gap-4 justify-items-center mx-auto">
                  <Button
                    variant="dark"
                    className="px-4 w-[25%]"
                    onClick={async () => {
                      setIsModalOpen(true);
                    }}
                  >
                    Upload Video
                  </Button>
                  {user.has_video ? (
                    <Button
                      variant="dark"
                      className="px-4 w-[25%]"
                      onClick={() => router.push(`/view-video?id=${user._id}`)}
                    >
                      View Video
                    </Button>
                  ) : (
                    <></>
                  )}
                  <Button variant="dark" className="px-4 w-[25%]" onClick={() => router.push("/edit-user")}>
                    Edit Account
                  </Button>
                  <Button variant="dark" className="px-4 w-[25%]" onClick={() => router.push("/set-picture")}>
                    Change Picture
                  </Button>
                  <Button
                    variant="dark"
                    className="px-4 w-[25%]"
                    onClick={() => window.location.assign(`${cdnSubpath()}${user.cv}`)}
                    disabled={!user.has_cv}
                  >
                    View Résumé
                  </Button>
                </div>
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

  if (!(await isUserEmailInDb(user.email))) {
    req.session.destroy();
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
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
    await dbConnect();

    const newUser = await User.findOne({ email: user.email });
    req.session.user = await dbUserToIronUser(newUser);
    await req.session.save();

    console.log(newUser);

    return {
      props: {
        user: req.session.user,
        is_assigned: isIronUserAssigned(req.session.user),
        is_working: isIronUserWorking(req.session.user),
        company: req.session.user.company
          ? dbCompanyToCompany(await Company.findOne({ _id: req.session.user.company._id }))
          : null,
      },
    };
  } catch (e) {
    return {
      props: {
        user,
        is_working: isIronUserWorking(user),
        company: req.session.user.company
          ? dbCompanyToCompany(await Company.findOne({ _id: req.session.user.company._id }))
          : null,
      },
    };
  }
}, authCookie);

export default DashboardUser;
