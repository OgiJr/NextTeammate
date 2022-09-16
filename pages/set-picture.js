import { Button, Form } from "react-bootstrap";
import Layout from "../src/layout/Layout";
import React from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { authCookie } from "../lib/cookies";

const SetPicture = () => {
  const [error, setError] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const router = useRouter();

  return (
    <Layout>
      <div className="flex flex-row justify-center min-w-full">
        <div className="flex flex-col justify-center min-w-full items-center justify-items-center">
          <div
            className="bg-gray-100 lg:w-[40vw] w-[80vw] py-8 mb-8 !border-sky-600 px-8"
            style={{ borderWidth: 4, borderStyle: "solid", borderRadius: 20 }}
          >
            <div className="text-center min-w-full text-4xl font-semibold">Set Picture</div>
            <Form
              onSubmit={async (e) => {
                e.preventDefault();

                if (!file) {
                  setError("Please select a picture!");
                  return;
                }

                let formData = new FormData();
                formData.append("picture", file);

                let result;
                result = await fetch("/api/set-picture", {
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
              <Form.Group className="mb-3" controlId="picture" onChange={(e) => setFile(e.target.files[0])}>
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" accept="image/png, image/jpeg" />
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
    props: {},
  };
}, authCookie);

export default SetPicture;
