import { withIronSessionSsr } from "iron-session/next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import { authCookie } from "../lib/cookies";
import { dbCompanyToCompany, dbUserToIronUser, isUserEmailInDb } from "../lib/db";
import User from "../models/User";
import Footer from "../src/layout/Footer";
import { Card, Button as NextButton, Link as NextLink, Modal } from "@nextui-org/react";
import { cdnSubpath } from "../lib/cdn";
import useSWR from "swr";
import Categories from "../lib/categories";
import Company from "../models/Company";

const AvailableEmployees = ({ others, company }) => {
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
  const [chosenCategory, setChosenCategory] = React.useState(null);

  return (
    <div className="min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-8">
      <Modal open={showEmployee} onClose={() => setShowEmployee(false)}>
        {others && others[modalEmployeeIndex] && (
          <>
            <Modal.Header>
              <div className="flex flex-col">
                <h3 className="my-0">
                  {others[modalEmployeeIndex].first_name + " " + others[modalEmployeeIndex].last_name}
                </h3>
                <p className="my-0 text-xl text-gray-500">{others[modalEmployeeIndex].email}</p>
              </div>
            </Modal.Header>
            <Modal.Body>
              <p>{others[modalEmployeeIndex].bio}</p>
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
      <div className="flex flex-col mt-4">
        <div className="text-center text-3xl font-bold">Available Employee Pool</div>
        <div className="flex flex-row flex-wrap min-w-full gap-8 justify-center justify-items-center">
          {others.length === 0 ? (
            <div className="text-center text-3xl">No free other employees.</div>
          ) : (
            <div className="flex flex-col lg:flex-row justify-center w-[100%] items-center lg:items-start lg:justify-start">
              <div className="hidden lg:flex mt-8 flex-col w-[80%] lg:w-[20%] flex-wrap gap-8 justify-center items-center">
                <NextButton
                  className={
                    !chosenCategory
                      ? "!text-black !bg-white underline !font-bold !border-1 !rounded-md !flex !flex-col !items-start !lg:items-center"
                      : "!text-black  !bg-white !border-blue-400 !border-1 !rounded-md  !flex !flex-col !items-start !lg:items-center"
                  }
                  onClick={() => setChosenCategory(null)}
                >
                  All
                </NextButton>
                {Categories.map((c) => (
                  <NextButton
                    key={c}
                    className={
                      c === chosenCategory
                        ? "!text-black !bg-white underline !font-bold  !border-1 !rounded-md  !flex !flex-col !items-start !lg:items-center"
                        : "!text-black  !bg-white !border-blue-400 !border-1 !rounded-md  !flex !flex-col !items-start !lg:items-center"
                    }
                    onClick={() => {
                      if (c === chosenCategory) {
                        setChosenCategory(null);
                      } else {
                        setChosenCategory(c);
                      }
                    }}
                  >
                    {c}
                  </NextButton>
                ))}
              </div>
              <div className="mt-8 flex lg:hidden flex-row w-[80%] lg:w-[20%] flex-wrap gap-8 justify-center items-center">
                <NextButton
                  size="xs"
                  className={
                    !chosenCategory
                      ? "!bg-blue-400 !border-1 !rounded-md"
                      : "!bg-white !border-blue-400 !border-1 !rounded-md !text-blue-400"
                  }
                  onClick={() => setChosenCategory(null)}
                >
                  All
                </NextButton>
                {Categories.map((c) => (
                  <NextButton
                    key={c}
                    size="xs"
                    className={
                      c === chosenCategory
                        ? "!bg-blue-400 !border-1 !rounded-md"
                        : "!bg-white !border-blue-400 !border-1 !rounded-md !text-blue-400"
                    }
                    onClick={() => {
                      if (c === chosenCategory) {
                        setChosenCategory(null);
                      } else {
                        setChosenCategory(c);
                      }
                    }}
                  >
                    {c}
                  </NextButton>
                ))}
              </div>
              <div className="flex flex-row flex-wrap min-w-[10vw] min-h-[20vh] justify-evenly gap-2 p-4 w-full">
                {others
                  .filter((e) => {
                    if (!chosenCategory) return true;
                    return e.categories.some((c) => c === chosenCategory);
                  })
                  .map((e) => {
                    return (
                      <div className="min-w-[10vw] min-h-[20vh] justify-evenly gap-2 p-4" key={e._id}>
                        <Card
                          isHoverable
                          isPressable
                          className="min-h-full"
                          onPress={() => {
                            if (e.has_password) {
                              setModalEmployeeIndex(others.indexOf(e));
                              setShowEmployee(true);
                            }
                          }}
                        >
                          <Card.Body className="min-h-full">
                            <div className="flex flex-row justify-center min-h-full">
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
                            <div className="text-center text-md text-gray-500">
                              {e.bio.length > 100 ? e.bio.substring(0, 100) + "..." : e.bio}
                            </div>
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
                                <NextButton
                                  color="secondary"
                                  shadow
                                  auto
                                  rounded
                                  className="px-4 min-w-[25%] mr-2 self-center"
                                  onClick={() => window.location.assign(`${cdnSubpath()}${e.cv}`)}
                                  disabled={!e.has_cv}
                                >
                                  View CV
                                </NextButton>
                                <NextLink href={`/api/hire?_id=${e._id}`} className="self-center">
                                  <NextButton
                                    color="success"
                                    shadow
                                    auto
                                    rounded
                                    className="px-4 min-w-[25%] mr-2 self-center"
                                  >
                                    I want to find a TEAMMATE
                                  </NextButton>
                                </NextLink>
                              </div>
                            )}
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

  let my_others = await User.find({ is_admin: false, is_employer: false, company: null });

  let others = await Promise.all(my_others.map(async (e) => await dbUserToIronUser(e)));

  others = others.filter((x) => x.has_password);

  return {
    props: {
      user,
      others,
      company: dbCompanyToCompany(await Company.findOne({ _id: user.company._id })),
    },
  };
}, authCookie);

export default AvailableEmployees;
