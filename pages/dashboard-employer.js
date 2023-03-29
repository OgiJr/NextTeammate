import { withIronSessionSsr } from "iron-session/next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import { authCookie } from "../lib/cookies";
import { dbCompanyToCompany, dbUserToIronUser, isUserEmailInDb } from "../lib/db";
import User from "../models/User";
import Company from "../models/Company";
import Footer from "../src/layout/Footer";
import { Card, Button as NextButton, Link as NextLink, Modal } from "@nextui-org/react";
import { cdnSubpath } from "../lib/cdn";
import useSWR from "swr";

const DashboardEmployer = ({ user, employees, employers, company }) => {
  const router = useRouter();

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

  const [modalEmployeeIndex, setModalEmployeeIndex] = React.useState(null);
  const [showEmployee, setShowEmployee] = React.useState(false);

  return (
    <div className="min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-8">
      <Modal open={showEmployee} onClose={() => setShowEmployee(false)}>
        {employees && employees[modalEmployeeIndex] && (
          <>
            <Modal.Header>
              <div className="flex flex-col">
                <h3 className="my-0">
                  {employees[modalEmployeeIndex].first_name + " " + employees[modalEmployeeIndex].last_name}
                </h3>
              </div>
            </Modal.Header>
            <Modal.Body>
              <p>{employees[modalEmployeeIndex].bio}</p>
            </Modal.Body>
          </>
        )}
      </Modal>
      <div className="flex flex-row min-w-full bg-gradient-to-r from-cyan-500 to-blue-500 justify-between items-center px-10">
        <div className="flex flex-row justify-center my-2">
          <Link href="/dashboard-user">
            <Image src="/assets/images/nextlogowhite.png" width={100} height={100} layout="fixed" />
          </Link>
        </div>
        <div className=" flex flex-col mt-3 md:mt-0 md:flex-row justify-evenly md:gap-8">
          {company.dropbox && (
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
            className="thm-btn bg-violet-900 thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
            onClick={() => {
              router.push("/available-employees");
            }}
          >
            Available Employees
          </Button>
          <Button
            className="thm-btn bg-thm-color-one thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
            onClick={() => {
              router.push("/dashboard-records");
            }}
          >
            Records
          </Button>
          <Button
            className="thm-btn bg-thm-color-four thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
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
      <div className="flex flex-col">
        <div className="flex flex-row justify-center">
          <div className="flex flex-row justify-center">
            <img
              src={`${cdnSubpath()}${company.picture}`}
              width={150}
              height={150}
              className="rounded-full"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="self-center text-cyan-600 text-xl">{user.company.name}</div>
        <div className="flex flex-row mt-2 justify-center">
          <NextLink href="/change-company-picture">
            <NextButton color="warning" shadow auto rounded className="px-4 min-w-[25%] mr-2">
              Change Company Information
            </NextButton>
          </NextLink>
        </div>
        <div className="text-center text-3xl font-bold">Employers</div>
        <div className="flex flex-row flex-wrap min-w-full gap-8 justify-center justify-items-center">
          {employers.length === 0 ? (
            <div className="text-center text-3xl">No other employers yet.</div>
          ) : (
            <>
              {employers.map((e) => {
                return (
                  <div
                    className="min-w-[20vw] min-h-[20vh]  justify-evenly gap-2 p-4  w-[90%] md:max-w-[33.3%]"
                    key={e.email}
                  >
                    <Card isHoverable isPressable>
                      <Card.Body>
                        <div className="flex flex-row justify-center">
                          <div className="flex flex-row justify-center">
                            <img
                              src={e.has_picture ? `${cdnSubpath()}${e.picture}` : "/assets/images/no-user.png"}
                              width={150}
                              height={150}
                              className="rounded-full"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </div>
                        <div className="text-center text-3xl mt-2">
                          {e.first_name}&nbsp;{e.last_name}
                        </div>
                        <div className="text-center text-md text-gray-500">{e.bio}</div>
                        {e.email === user.email ? (
                          <div className="flex flex-row justify-center w-full mt-2">
                            <NextLink href="/edit-user">
                              <NextButton color="warning" shadow auto rounded className="px-4 min-w-[25%] mr-2">
                                Edit Account
                              </NextButton>
                            </NextLink>
                            <NextLink href="/set-picture">
                              <NextButton
                                color="success"
                                shadow
                                auto
                                rounded
                                href="/"
                                className="px-4 min-w-[25%] ml-2"
                              >
                                Change Picture
                              </NextButton>
                            </NextLink>
                          </div>
                        ) : (
                          <></>
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <div className="text-center text-3xl font-bold">Employees</div>
        <div className="flex flex-row flex-wrap min-w-full gap-8 justify-center justify-items-center">
          {employees.length === 0 ? (
            <div className="text-center text-3xl">No Employees Yet.</div>
          ) : (
            <div className="flex flex-col justify-center w-[90%] items-center">
              <div className="min-w-[10vw] min-h-[20vh] justify-evenly gap-2 p-4 w-full md:max-w-[30%]">
                {employees.map((e) => {
                  const is_setup =
                    e.work_data &&
                    e.work_data.currency &&
                    e.work_data.expected_hours_weekly &&
                    e.work_data.current_price_per_hour;
                  return (
                    <div className="min-w-[10vw] min-h-[20vh] justify-evenly gap-2 p-4 w-full" key={e.email}>
                      <Card
                        isHoverable
                        isPressable
                        className="min-h-full"
                        onPress={() => {
                          if (e.has_password) {
                            setModalEmployeeIndex(employees.indexOf(e));
                            setShowEmployee(true);
                          }
                        }}
                      >
                        <Card.Body className="min-h-full">
                          <div className="flex flex-row justify-center min-h-full">
                            <div className="flex flex-row justify-center">
                              <img
                                src={e.has_picture ? `${cdnSubpath()}${e.picture}` : "/assets/images/no-user.png"}
                                width={150}
                                height={150}
                                className="rounded-full"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          </div>
                          <div className="text-center text-3xl mt-2">
                            {e.first_name}&nbsp;{e.last_name}
                          </div>
                          {is_setup ? (
                            <div className="text-center text-md text-gray-800">
                              {e.work_data.expected_hours_weekly} hours @ {e.work_data.current_price_per_hour}&nbsp;
                              {e.work_data.currency} / hour
                            </div>
                          ) : (
                            <></>
                          )}
                          <div className="text-center text-md text-gray-500">
                            <div className="text-center text-md text-gray-500">
                              {e.bio.length > 100 ? e.bio.substring(0, 100) + "..." : e.bio}
                            </div>
                          </div>
                          {!e.has_password ? (
                            <div className="text-center text-xl text-red-500">Unclaimed Account</div>
                          ) : (
                            <></>
                          )}
                          <NextButton
                            color="secondary"
                            shadow
                            auto
                            rounded
                            className="px-4 min-w-[25%] mr-2 self-center"
                            onClick={() => window.location.assign(`${cdnSubpath()}${e.cv}`)}
                            disabled={!e.has_cv}
                          >
                            View Résumé
                          </NextButton>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
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

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  if (!user.is_employer) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard-redirector",
      },
      props: {},
    };
  }

  let my_employers = await User.find({ is_admin: false, is_employer: true, company: user.company._id });
  let my_employees = await User.find({ is_admin: false, is_employer: false, company: user.company._id });
  let my_others = await User.find({ is_admin: false, is_employer: false, company: null });

  let employees = await Promise.all(my_employees.map(async (e) => await dbUserToIronUser(e)));
  let employers = await Promise.all(my_employers.map(async (e) => await dbUserToIronUser(e)));
  let others = await Promise.all(my_others.map(async (e) => await dbUserToIronUser(e)));

  return {
    props: {
      user,
      employees,
      employers,
      others,
      company: dbCompanyToCompany(await Company.findOne({ _id: user.company._id })),
    },
  };
}, authCookie);

export default DashboardEmployer;
