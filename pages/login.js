import { Button, Form } from "react-bootstrap";
import Layout from "../src/layout/Layout";
import React from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { authCookie } from "../lib/cookies";
import Footer from "../src/layout/Footer";

const Login = () => {
  const [error, setError] = React.useState(null);
  const router = useRouter();

  return (
    <Layout>
      <div className="flex flex-row justify-center min-w-full">
        <div className="flex flex-col justify-center min-w-full items-center justify-items-center">
          <div
            className="bg-gray-100 lg:w-[40vw] w-[80vw] py-8 mb-8 !border-sky-600 px-8"
            style={{ borderWidth: 4, borderStyle: "solid", borderRadius: 20 }}
          >
            <div className="text-center min-w-full text-4xl font-semibold">Log In</div>
            <Form
              onSubmit={async (e) => {
                e.preventDefault();

                const email = e.target.email.value;
                const password = e.target.password.value;

                const body = { email, password };
                const bodyJSON = JSON.stringify(body);

                if (!email || !password) {
                  setError("Please fill out all fields!");
                  return;
                }

                let result;
                result = await fetch("/api/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: bodyJSON,
                });
                const content = await result.json();
                if (result.status !== 200) {
                  setError(content.message);
                  return;
                }

                setError(null);
                router.push("/dashboard-redirector");
              }}
            >
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="john.smith@example.com" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
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

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req }) {
  const user = req.session.user;

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard-redirector",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
}, authCookie);

export default Login;
