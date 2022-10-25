import { faFile, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withIronSessionSsr } from "iron-session/next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, Form } from "react-bootstrap";
import useSWR, { useSWRConfig } from "swr";
import { authCookie } from "../lib/cookies";
import { dbUserToIronUser } from "../lib/db";
import User from "../models/User";
import {
  Popover,
  Button as NextButton,
  Text,
  Avatar,
  Grid,
} from "@nextui-org/react";

const Zoom = ({ user, employees }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const chatRef = React.useRef();

  const [currentFriend, setCurrentFriend] = React.useState(null);
  const [currentPicture, setCurrentPicture] = React.useState(
    "/assets/images/no-user.png"
  );
  const [currentName, setCurrentName] = React.useState("");
  const [currentId, setCurrentId] = React.useState("");

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState(null);

  const fetcher = (url, queryParams = "") => {
    if (currentFriend) {
      return fetch(`${url}${queryParams}`).then((res) => {
        return res.json();
      });
    } else {
      return new Promise(() => {});
    }
  };
  const { data: chats } = useSWR(
    ["/api/get-messages", `?sender=${user._id}&receiver=${currentId}`],
    fetcher,
    {
      onSuccess: () => {
        setTimeout(
          () =>
            (chatRef.current.scrollTop = chatRef.current.scrollHeight + 1000),
          100
        );
      },
    }
  );

  return (
    <div className="flex flex-col">
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
            <div className="flex flex-row justify-center w-full text-4xl">
              Upload file here:
            </div>
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
                  formData.append("receiver", currentId);

                  let result;
                  result = await fetch("/api/send-file", {
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
                  mutate(["/api/get-messages", `?sender=${user._id}&receiver=${currentId}`]);
                }}
              >
                <Form.Group
                  controlId="file"
                  onChange={(e) => setFile(e.target.files[0])}
                >
                  <Form.Control type="file" accept="*" />
                </Form.Group>
                {file !== null ? (
                  <div className="flex flex-row justify-center w-full ">
                    <div className="!bg-[#007bff] !rounded-lg">
                      <button
                        type="submit"
                        className="text-white text-xl px-4 py-2"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </Form>
            </div>
            <div className="flex flex-row justify-center w-full text-sm">
              (Max 100MB, Encrypted)
            </div>
            <div className="flex flex-row justify-center w-full text-lg bg-[#ff0000] text-white">
              {error}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="flex flex-row min-w-full bg-sky-400 justify-between items-center px-10">
        <div className="flex flex-row justify-center my-2">
          <Link href="/">
            <Image
              src="/assets/images/nextlogo.png"
              width={100}
              height={100}
              layout="fixed"
            />
          </Link>
        </div>
        <div className="flex flex-row justify-evenly gap-8">
          <Button
            variant="success"
            className="text-xl"
            onClick={() => {
              router.push("/create-employee");
            }}
          >
            Add Employee
          </Button>
          <Button
            className="text-xl"
            onClick={() => {
              router.push("/zoom");
            }}
          >
            Sharing System
          </Button>
          <Button
            variant="danger"
            className="text-xl"
            onClick={async () => {
              await fetch("/api/logout");
              router.push("/login");
            }}
          >
            Log Out
          </Button>
        </div>
      </div>
      <div className="container mx-auto mt-10">
        <div className="min-w-full border rounded lg:grid lg:grid-cols-3 ">
          <div className="border-r border-gray-300 lg:col-span-1  ">
            <div className="mx-3 my-3 ">
              <Popover>
                <Popover.Trigger>
                  <NextButton
                    auto
                    flat
                    shadow
                    color="primary"
                    rounded
                    size="lg"
                  >
                    <p className=" font-bold"> Start meeting</p>
                  </NextButton>
                </Popover.Trigger>
                <Popover.Content>
                  <Text css={{ p: "$10" }}>participants</Text>
                  <Grid.Container gap={2}>
                    <Grid>
                      <Avatar
                        squared
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        bordered
                        color="success"
                      />
                    </Grid>
                    <Grid>
                      <Avatar squared text="Junior" />
                    </Grid>
                    <Grid>
                      <Avatar
                        squared
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        bordered
                        color="success"
                      />
                    </Grid>
                    <Grid>
                      <Avatar squared text="Jane" />
                    </Grid>
                    <Grid>
                      <Avatar
                        squared
                        src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                        bordered
                        color="success"
                      />
                    </Grid>
                    <Grid>
                      <Avatar squared text="Joe" />
                    </Grid>
                  </Grid.Container>
                </Popover.Content>
              </Popover>

              <div className="mt-3 relative text-gray-600">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-gray-300"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </span>
                <input
                  type="search"
                  className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                  name="search"
                  placeholder="Search"
                  required
                />
              </div>
            </div>
            <ul className="overflow-auto h-[32rem]">
              <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chat</h2>
              <li>
                {employees.map((e) => {
                  return (
                    <div
                      key={e.email}
                      className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none ${
                        currentFriend === e.email ? "bg-gray-200" : ""
                      }`}
                      onClick={() => {
                        setCurrentFriend(e.email);
                        setCurrentPicture(
                          e.picture
                            ? `/uploads/${e.picture}`
                            : "/assets/images/no-user.png"
                        );
                        setCurrentName(`${e.first_name} ${e.last_name}`);
                        setCurrentId(e._id);
                      }}
                    >
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={
                          e.picture
                            ? `/uploads/${e.picture}`
                            : "/assets/images/no-user.png"
                        }
                        alt="username"
                      />
                      <div className="w-full">
                        <div className="flex flex-col justify-between">
                          <span className="block ml-2 font-semibold text-gray-600">
                            {e.first_name} {e.last_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </li>
            </ul>
          </div>
          <div className="hidden lg:col-span-2 lg:block">
            {currentFriend ? (
              <div className="w-full">
                <div className="relative flex items-center p-3 border-b border-gray-300">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={currentPicture}
                    alt={currentFriend}
                  />
                  <span className="block ml-2 font-bold text-gray-600">
                    {currentName}
                  </span>
                </div>
                <div
                  className="relative w-full p-6 overflow-y-scroll h-96"
                  ref={chatRef}
                >
                  <ul className="flex flex-col gap-y-2">
                    {error ? (
                      <div className="w-full h-full flex flex-col justify-center items-center">
                        <div className="text-2xl">
                          Failed to load chat. Please try again later...
                        </div>
                      </div>
                    ) : chats ? (
                      chats.chats.map((chat, i) => (
                        <div
                          key={i}
                          className={`flex flex-col w-full ${
                            chat.sender === currentId
                              ? "items-start"
                              : "items-end"
                          }`}
                        >
                          <div className="flex flex-col max-w-[50%]">
                            <div
                              className={`relative px-4 py-2 text-gray-700 rounded shadow ${
                                chat.sender === currentId
                                  ? "bg-black text-white"
                                  : ""
                              } `}
                            >
                              {chat.type === "TEXT" ? (
                                <span className="w-full text-left">
                                  {chat.text}
                                </span>
                              ) : chat.type === "FILE" ? (
                                <a href={`/api/download-file?_id=${chat._id}`}>
                                  <div className="w-full text-left">
                                    <FontAwesomeIcon
                                      icon={faFile}
                                      color={
                                        chat.sender === currentId
                                          ? "#fff"
                                          : "#000"
                                      }
                                      size="1x"
                                      className="w-[1rem]"
                                    />
                                    <span className="ml-4">
                                      {" "}
                                      {chat.og_filename.length < 24
                                        ? chat.og_filename
                                        : chat.og_filename.substring(0, 20) +
                                          "..."}
                                    </span>
                                  </div>
                                </a>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div
                              className={`w-full text-gray-400 text-sm text-${
                                chat.sender === currentId ? "left" : "right"
                              }`}
                            >
                              {new Date(chat.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="w-full h-full flex flex-col justify-center items-center">
                        <div className="text-2xl">Loading...</div>
                      </div>
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>

                  <form
                    className="w-full flex flex-row justify-center items-center"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const message = e.target.message.value;
                      if (!message) {
                        return;
                      }

                      await fetch("/api/send-message", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          sender: user._id,
                          receiver: currentId,
                          type: "TEXT",
                          text: message,
                        }),
                      });

                      e.target.message.value = "";
                      mutate([
                        "/api/get-messages",
                        `?sender=${user._id}&receiver=${currentId}`,
                      ]);
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Message"
                      className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                      name="message"
                      required
                    />
                    <button type="submit">
                      <svg
                        className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="text-2xl">Choose someone to chat with!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
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

    let result = await User.find({ email: { $ne: user.email } });
    let employees = await Promise.all(
      result.map(async (e) => await dbUserToIronUser(e))
    );

    return {
      props: {
        user,
        employees,
      },
    };
  },
  authCookie
);

export default Zoom;
