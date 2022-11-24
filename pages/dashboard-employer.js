import { withIronSessionSsr } from "iron-session/next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import { authCookie } from "../lib/cookies";
import { dbUserToIronUser, isUserEmailInDb } from "../lib/db";
import User from "../models/User";
import Footer from "../src/layout/Footer";
import { Card, Button as NextButton, Link as NextLink } from "@nextui-org/react";
import { cdnSubpath } from "../lib/cdn";

const DashboardEmployer = ({ user, employees, employers, others }) => {
  const router = useRouter();

  return (
    <div className="min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-8">
      <div className="flex flex-row min-w-full bg-gradient-to-r from-cyan-500 to-blue-500 justify-between items-center px-10">
        <div className="flex flex-row justify-center my-2">
          <Link href="/dashboard-user">
            <Image src="/assets/images/nextlogowhite.png" width={100} height={100} layout="fixed" />
          </Link>
        </div>
        <div className=" flex flex-col mt-3 md:mt-0 md:flex-row justify-evenly md:gap-8">
          <Button
            className="thm-btn bg-thm-color-one thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
            onClick={() => {
              router.push("/dashboard-records");
            }}
          >
            Records
          </Button>
          <Button
            className="thm-btn bg-violet-900 thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
            onClick={() => {
              router.push("/create-employer");
            }}
          >
            Add Employer
          </Button>
          <Button
            className="thm-btn bg-thm-color-four thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
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
      <div className="flex flex-col">
        <div className="self-center text-cyan-600 text-xl">{user.company.name}</div>
        <div className="text-center text-3xl font-bold">Employers</div>
        <div className="flex flex-row flex-wrap min-w-full gap-8 justify-center justify-items-center">
          {employers.length === 0 ? (
            <div className="text-center text-3xl">No other employers yet.</div>
          ) : (
            <>
              {employers.map((e) => {
                return (
                  <div className="min-w-[20vw] min-h-[20vh]  justify-evenly gap-2 p-4" key={e.email}>
                    <Card isHoverable isPressable>
                      <Card.Body>
                        <div className="flex flex-row justify-center">
                          <img
                            src={e.has_picture ? `${cdnSubpath()}${e.picture}` : "/assets/images/no-user.png"}
                            width={150}
                            height={150}
                            className="rounded-full"
                          />
                        </div>
                        <div className="text-center text-3xl mt-2">
                          {e.first_name}&nbsp;{e.last_name}
                        </div>
                        <div className="text-center text-md text-gray-800">{e.email}</div>
                        <div className="text-center text-md text-gray-500">{e.bio}</div>
                        {e.email === user.email ? (
                          <div className="flex flex-row mt-2">
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
            <>
              {employees.map((e) => {
                const is_setup =
                  e.work_data &&
                  e.work_data.currency &&
                  e.work_data.expected_hours_weekly &&
                  e.work_data.current_price_per_hour;
                return (
                  <div className="min-w-[20vw] min-h-[20vh]  justify-evenly gap-2 p-4" key={e.email}>
                    <Card isHoverable isPressable>
                      <Card.Body>
                        <div className="flex flex-row justify-center">
                          <img
                            src={e.has_picture ? `${cdnSubpath()}${e.picture}` : "/assets/images/no-user.png"}
                            width={150}
                            height={150}
                            className="rounded-full"
                          />
                        </div>
                        <div className="text-center text-3xl mt-2">
                          {e.first_name}&nbsp;{e.last_name}
                        </div>
                        <div className="text-center text-md text-gray-800">{e.email}</div>
                        {is_setup ? (
                          <div className="text-center text-md text-gray-800">
                            {e.work_data.expected_hours_weekly} hours @ {e.work_data.current_price_per_hour}&nbsp;
                            {e.work_data.currency} / hour
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="text-center text-md text-gray-500">{e.bio}</div>
                        {!e.has_password ? (
                          <div className="text-center text-xl text-red-500">Unclaimed Account</div>
                        ) : (
                          <div className="flex flex-col justify-center gap-2 mt-2">
                            <NextButton
                              disabled={!e.has_video}
                              color="gradient"
                              shadow
                              auto
                              rounded
                              className="px-4 min-w-[25%] mr-2 self-center"
                              onClick={() => router.push(`/view-video?id=${e._id}`)}
                            >
                              Play Video
                            </NextButton>
                          </div>
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
        <div className="text-center text-3xl font-bold">Employee Pool</div>
        <div className="flex flex-row flex-wrap min-w-full gap-8 justify-center justify-items-center">
          {others.length === 0 ? (
            <div className="text-center text-3xl">No free other employees.</div>
          ) : (
            <>
              {others.map((e) => {
                const is_setup =
                  e.work_data &&
                  e.work_data.currency &&
                  e.work_data.expected_hours_weekly &&
                  e.work_data.current_price_per_hour;
                return (
                  <div className="min-w-[20vw] min-h-[20vh]  justify-evenly gap-2 p-4" key={e.email}>
                    <Card isHoverable isPressable>
                      <Card.Body>
                        <div className="flex flex-row justify-center">
                          <img
                            src={e.has_picture ? `${cdnSubpath()}${e.picture}` : "/assets/images/no-user.png"}
                            width={150}
                            height={150}
                            className="rounded-full"
                          />
                        </div>
                        <div className="text-center text-3xl mt-2">
                          {e.first_name}&nbsp;{e.last_name}
                        </div>
                        <div className="text-center text-md text-gray-800">{e.email}</div>
                        {is_setup ? (
                          <div className="text-center text-md text-gray-800">
                            {e.work_data.expected_hours_weekly} hours @ {e.work_data.current_price_per_hour}&nbsp;
                            {e.work_data.currency} / hour
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="text-center text-md text-gray-500">{e.bio}</div>
                        {!e.has_password ? (
                          <div className="text-center text-xl text-red-500">Unclaimed Account</div>
                        ) : (
                          <div className="flex flex-col justify-center gap-2 mt-2">
                            <NextLink href={`/api/hire?_id=${e._id}`} className="self-center">
                              <NextButton
                                color="success"
                                shadow
                                auto
                                rounded
                                className="px-4 min-w-[25%] mr-2 self-center"
                              >
                                I want to hire
                              </NextButton>
                            </NextLink>
                          </div>
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
      <Footer />
    </div>
  );
};

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req }) {
  const user = req.session.user;

  if (!isUserEmailInDb(user.email)) {
    console.log(!isUserEmailInDb(user.email));
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
    },
  };
}, authCookie);

export default DashboardEmployer;
