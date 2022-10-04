import { Button, Form } from "react-bootstrap";
import Layout from "../src/layout/Layout";
import React from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { authCookie } from "../lib/cookies";
import Footer from "../src/layout/Footer";

const EditUser = ({ user }) => {
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
            <div className="text-center min-w-full text-4xl font-semibold">Edit User Details</div>
            <Form
              onSubmit={async (e) => {
                e.preventDefault();

                const email = e.target.email?.value;
                const first_name = e.target.first_name?.value;
                const last_name = e.target.last_name?.value;
                const bio = e.target.bio?.value;
                const birthdate = e.target.birthdate?.value;

                if (!email && !first_name && !last_name && !bio && !birthdate) {
                  setError("You must change something!");
                  return;
                }

                const body = {
                  email,
                  first_name,
                  last_name,
                  bio,
                  birthdate,
                };
                const bodyJSON = JSON.stringify(body);

                let result;
                result = await fetch("/api/user", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: bodyJSON,
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
              <Form.Group className="mb-3" controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder={user.first_name} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder={user.last_name} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder={user.email} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="bio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder={user.bio ? user.bio : "Example: SEO expert with experience in..."}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="birthdate">
                <Form.Label>Birthdate</Form.Label>
                <Form.Control type="date" />
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

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  return {
    props: { user },
  };
}, authCookie);

export default EditUser;
