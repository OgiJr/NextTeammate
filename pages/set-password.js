import { Button, Form } from "react-bootstrap";
import Layout from "../src/layout/Layout";
import React from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { authCookie } from "../lib/cookies";
import { dbConnect } from "../lib/db";
import User from "../models/User";
import Footer from "../src/layout/Footer";

const SetPassword = ({ password_generation_key, email }) => {
  const [error, setError] = React.useState(null);
  const router = useRouter();

  return (
    <Layout language={"en"}>
      <div className="flex flex-row justify-center min-w-full">
        <div className="flex flex-col justify-center min-w-full items-center justify-items-center">
          <div
            className="bg-gray-100 lg:w-[40vw] w-[80vw] py-8 mb-8 !border-sky-600 px-8"
            style={{ borderWidth: 4, borderStyle: "solid", borderRadius: 20 }}
          >
            <div className="text-center min-w-full text-4xl font-semibold">Set Password</div>
            <Form
              onSubmit={async (e) => {
                e.preventDefault();

                const password = e.target.password.value;
                const repeat_password = e.target.repeat_password.value;

                if (!repeat_password || !password) {
                  setError("Please fill out all fields!");
                  return;
                }

                if (repeat_password !== password) {
                  setError("Make sure the two passwords match!");
                  return;
                }

                let body = { email, password, password_generation_key };
                let bodyJSON = JSON.stringify(body);

                let result;
                result = await fetch("/api/set-password", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: bodyJSON,
                });
                let content = await result.json();
                if (result.status !== 200) {
                  setError(content.message);
                  return;
                }

                body = { email, password };
                bodyJSON = JSON.stringify(body);
                result = await fetch("/api/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: bodyJSON,
                });
                content = await result.json();
                if (result.status !== 200) {
                  setError(content.message);
                  return;
                }

                setError(null);
                router.push("/dashboard-redirector");
              }}
            >
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="********" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="repeat_password">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control type="password" placeholder="********" />
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
      </div>
      <Footer />
    </Layout>
  );
};

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ query }) {
  const { password_generation_key, email } = query;
  if (!password_generation_key || !email) {
    console.log("no key");
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  try {
    await dbConnect();

    const user = await User.findOne({ email });
    console.log(user);
    if (!user || user.has_password || user.password_generation_key !== password_generation_key) {
      console.log("no user");
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
    }

    return {
      props: {
        password_generation_key,
        email,
      },
    };
  } catch {
    console.log("?");
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
}, authCookie);

export default SetPassword;
