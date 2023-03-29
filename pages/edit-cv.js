import { Button, Form } from "react-bootstrap";
import React from "react";
import { withIronSessionSsr } from "iron-session/next";
import { authCookie } from "../lib/cookies";
import Footer from "../src/layout/Footer";
import { dbConnect, dbUserToIronUser, isUserEmailInDb } from "../lib/db";
import User from "../models/User";

import { useRouter } from "next/router";
import Image from "next/image";

const EditCV = ({ editable }) => {
  const [error, setError] = React.useState(null);
  const router = useRouter();
  const [file, setFile] = React.useState(null);

  return (
    <div className="min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-8">
      <div className="flex flex-row min-w-full bg-gradient-to-r from-cyan-500 to-blue-500 justify-between items-center px-10">
        <div className="flex flex-row justify-center my-2">
          <Image src="/assets/images/nextlogowhite.png" width={100} height={100} />
        </div>
        <div className="flex flex-col mt-3 md:mt-0 md:flex-row justify-evenly md:gap-8">
          <Button
            className="thm-btn bg-thm-color-three thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
            variant="success"
            onClick={() => {
              router.push("/dashboard-admin");
            }}
          >
            Dashboard
          </Button>
          <Button
            className="thm-btn bg-thm-color-four thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
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
      <div className="flex flex-col justify-center min-w-full items-center justify-items-center">
        <div
          className="bg-gray-100 lg:w-[40vw] w-[80vw] py-8 mb-8 !border-sky-600 px-8"
          style={{ borderWidth: 4, borderStyle: "solid", borderRadius: 20 }}
        >
          <div className="text-center min-w-full text-4xl font-semibold">Edit CV</div>
          <Form
            onSubmit={async (e) => {
              e.preventDefault();

              if (!file) {
                setError("Please select a cv!");
                return;
              }

              let formData = new FormData();
              formData.append("cv", file);
              formData.append("email", editable.email);

              let result;
              result = await fetch("/api/set-cv", {
                method: "POST",
                body: formData,
              });
              let content = await result.json();
              if (result.status !== 200) {
                setError(content.message);
                return;
              }

              setError(null);
              router.push("/dashboard-redirector");
            }}
          >
            <Form.Group className="mb-3" controlId="cv" onChange={(e) => setFile(e.target.files[0])}>
              <Form.Label>New CV</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <div className="flex flex-row justify-evenly min-w-full">
              <Button variant="primary" type="submit" className="font-bold">
                Finish
              </Button>
            </div>
            {error ? (
              <div className="flex flex-row justify-center texte-center bg-red-400 my-4 rounded-xl text-white">
                {error}
              </div>
            ) : (
              <></>
            )}
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, query }) {
  const user = req.session.user;

  if (!query.email) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  if (!user || !user.is_admin) {
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

  try {
    await dbConnect();

    const editable = await User.findOne({ email: query.email });

    if (!editable) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
    }
    const ironEditable = await dbUserToIronUser(editable);

    return {
      props: { editable: ironEditable },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
}, authCookie);

export default EditCV;
