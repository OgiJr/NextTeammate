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
import { Card, Button as NextButton, Link as NextLink, useModal, Modal, Text } from "@nextui-org/react";
import { cdnSubpath } from "../lib/cdn";
import useSWR from "swr";

const DashboardAdmin = ({ user, employees, employers, companies, admins }) => {
  const router = useRouter();
  const { setVisible, bindings } = useModal();
  const [tbd, settbd] = React.useState(null);
  const [ctbd, setctbd] = React.useState(null);
  const { setVisible: setCVisible, bindings: cbindings } = useModal();

  const fetcher = (url) => {
    return fetch(url).then((res) => {
      return res.json();
    });
  };

  const [previousState, setPreviousState] = React.useState(false);
  const { data: unread_data } = useSWR("/api/has-unread", fetcher, {
    refreshInterval: 500,
    refreshWhenHidden: true,
    onSuccess: (d) => {
      if (d.unread && !previousState) {
        const audio = new Audio("/assets/sounds/notif.mp3");
        audio.play();
      }
      setPreviousState(d.unread);
    },
  });

  return (
    <div className="min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-8">
      <Modal
        scroll
        blur
        width="600px"
        aria-labelledby="modal-title"
        preventClose
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" className="font-bold" size={18}>
            Are you sure you want to delete this user?
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className=" self-center flex flex-row">
            <NextButton
              color="error"
              shadow
              auto
              rounded
              className="px-4 min-w-[25%] mr-2"
              onClick={async () => {
                await fetch("/api/user?_id=" + tbd, {
                  method: "DELETE",
                });
                setVisible(false);
                router.reload();
              }}
            >
              Confirm
            </NextButton>
            <NextButton
              color="success"
              shadow
              auto
              rounded
              href="/"
              className="px-4 min-w-[25%] ml-2"
              onClick={() => setVisible(false)}
            >
              Close
            </NextButton>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        scroll
        blur
        width="600px"
        aria-labelledby="modal-title"
        preventClose
        aria-describedby="modal-description"
        {...cbindings}
      >
        <Modal.Header>
          <Text id="modal-title" className="font-bold" size={18}>
            Are you sure you want to delete this company? This will delete all employers and unassign all employees to
            that company.
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className=" self-center flex flex-row">
            <NextButton
              color="error"
              shadow
              auto
              rounded
              className="px-4 min-w-[25%] mr-2"
              onClick={async () => {
                await fetch("/api/delete-company?_id=" + ctbd, {
                  method: "DELETE",
                });
                setCVisible(false);
                router.reload();
              }}
            >
              Confirm
            </NextButton>
            <NextButton
              color="success"
              shadow
              auto
              rounded
              href="/"
              className="px-4 min-w-[25%] ml-2"
              onClick={() => setCVisible(false)}
            >
              Close
            </NextButton>
          </div>
        </Modal.Body>
      </Modal>
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
            className="thm-btn bg-orange-600 thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
            onClick={() => {
              router.push("/create-company");
            }}
          >
            Add Company
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
            className="thm-btn bg-thm-color-three thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
            onClick={() => {
              router.push("/create-employee");
            }}
          >
            Add Employee
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
      <div className="flex flex-col mt-4">
        <div className="text-center text-3xl font-bold">Admin</div>
        <div className="flex flex-row flex-wrap min-w-full gap-8 justify-center justify-items-center">
          {admins.map((e) => (
            <div className="min-w-[20vw] min-h-[20vh]  justify-evenly gap-2 p-4" key={e.email}>
              <Card key={e.email} isPressable isHoverable className="mt-3">
                <Card.Body>
                  <div className="flex flex-col self-center">
                    <img
                      src={e.has_picture ? `${cdnSubpath()}/${e.picture}` : "/assets/images/no-user.png"}
                      width={150}
                      height={150}
                      className="self-center rounded-full"
                      style={{ objectFit: "cover" }}
                    />
                    <div className=" text-4xl text-center">{e.first_name + " " + e.last_name}</div>
                    {e.email === user.email ? (
                      <div className="flex flex-row mt-2">
                        <NextLink href="/edit-user">
                          <NextButton color="warning" shadow auto rounded className="px-4 min-w-[25%] mr-2">
                            Edit Account
                          </NextButton>
                        </NextLink>
                        <NextLink href="/set-picture">
                          <NextButton color="success" shadow auto rounded href="/" className="px-4 min-w-[25%] ml-2">
                            Change Picture
                          </NextButton>
                        </NextLink>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <div className="text-center text-3xl font-bold">Companies</div>
        <div className="flex flex-row flex-wrap min-w-full gap-8 justify-center justify-items-center">
          {companies.length === 0 ? (
            <div className="text-center text-3xl">No Companies Yet.</div>
          ) : (
            <>
              {companies.map((e) => {
                return (
                  <div className="min-w-[20vw] min-h-[20vh]  justify-evenly gap-2 p-4" key={e.email}>
                    <Card isHoverable isPressable>
                      <Card.Body>
                        <div className="flex flex-row justify-center">
                          <img
                            src={`${cdnSubpath()}${e.picture}`}
                            width={150}
                            height={150}
                            className="rounded-full"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className="text-center text-3xl mt-2">{e.name}</div>
                        <NextButton
                          color="error"
                          shadow
                          auto
                          rounded
                          className="px-4 min-w-[25%] mr-2 self-center  mt-2"
                          onClick={() => {
                            setCVisible(true);
                            setctbd(e._id);
                          }}
                        >
                          Delete Company
                        </NextButton>
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
        <div className="text-center text-3xl font-bold">Employers</div>
        <div className="flex flex-row flex-wrap min-w-full gap-8 justify-center justify-items-center">
          {employers.length === 0 ? (
            <div className="text-center text-3xl">No Employees Yet.</div>
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
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className="text-center text-3xl mt-2">
                          {e.first_name}&nbsp;{e.last_name}
                        </div>
                        <div className="self-center text-black font-bold text-lg">
                          {e.company ? e.company.name : "No Company Assigned"}
                        </div>
                        <div className="text-center text-md text-gray-800">{e.email}</div>
                        <div className="text-center text-md text-gray-500">{e.bio}</div>
                        {!e.has_password ? (
                          <div className="text-center text-xl text-red-500">Unclaimed Account</div>
                        ) : (
                          <></>
                        )}
                        <NextButton
                          color="error"
                          shadow
                          auto
                          rounded
                          className="px-4 min-w-[25%] mr-2 self-center  mt-2"
                          onClick={() => {
                            setVisible(true);
                            settbd(e._id);
                          }}
                        >
                          Delete User
                        </NextButton>
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
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className="text-center text-3xl mt-2">
                          {e.first_name}&nbsp;{e.last_name}
                        </div>
                        <div className="self-center text-black font-bold text-lg">
                          {e.company ? e.company.name : "No Company Assigned"}
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
                            <NextLink href={`/edit-hours?email=${e.email}`} className="self-center">
                              <NextButton
                                color="success"
                                shadow
                                auto
                                rounded
                                className="px-4 min-w-[25%] mr-2 self-center"
                              >
                                Edit Account
                              </NextButton>
                            </NextLink>
                            <NextLink href={`/edit-company?email=${e.email}`} className="self-center">
                              <NextButton
                                color="warning"
                                shadow
                                auto
                                rounded
                                className="px-4 min-w-[25%] mr-2 self-center"
                              >
                                Edit Company
                              </NextButton>
                            </NextLink>
                          </div>
                        )}
                        <NextButton
                          color="error"
                          shadow
                          auto
                          rounded
                          className="px-4 min-w-[25%] mr-2 self-center mt-2"
                          onClick={() => {
                            setVisible(true);
                            settbd(e._id);
                          }}
                        >
                          Delete User
                        </NextButton>
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

  if (!user.is_admin) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard-user",
      },
      props: {},
    };
  }

  let admins_db = await User.find({ is_admin: true });
  let admins = await Promise.all(admins_db.map(async (e) => await dbUserToIronUser(e)));

  let employees_db = await User.find({ is_admin: false, is_employer: false });
  let employers_db = await User.find({ is_admin: false, is_employer: true });

  let employees = await Promise.all(employees_db.map(async (e) => await dbUserToIronUser(e)));
  let employers = await Promise.all(employers_db.map(async (e) => await dbUserToIronUser(e)));

  let companies = (await Company.find()).map((c) => dbCompanyToCompany(c));

  return {
    props: {
      user,
      employees,
      employers,
      companies,
      admins,
    },
  };
}, authCookie);

export default DashboardAdmin;
