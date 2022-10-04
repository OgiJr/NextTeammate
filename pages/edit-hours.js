import { Button, Form } from "react-bootstrap";
import Layout from "../src/layout/Layout";
import React from "react";
import { withIronSessionSsr } from "iron-session/next";
import { authCookie } from "../lib/cookies";
import Footer from "../src/layout/Footer";
import { dbConnect, dbUserToIronUser } from "../lib/db";
import User from "../models/User";
import { codes } from "currency-codes";
import { useRouter } from "next/router";

const EditHours = ({ editable }) => {
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
            <div className="text-center min-w-full text-4xl font-semibold">Edit User Hours</div>
            <Form
              onSubmit={async (e) => {
                e.preventDefault();

                const expected_hours_weekly = e.target.expected_hours_weekly?.value;
                const current_price_per_hour = e.target.current_price_per_hour?.value;
                const currency = e.target.currency?.value;

                const body = {
                  email: editable.email,
                  expected_hours_weekly,
                  current_price_per_hour,
                  currency,
                };
                const bodyJSON = JSON.stringify(body);

                let result;
                result = await fetch("/api/set-work", {
                  method: "POST",
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
              <Form.Group className="my-3" controlId="expected_hours_weekly">
                <Form.Label>Expected Hours Per Week</Form.Label>
                <Form.Control type="numer" placeholder={editable.work_data.expected_hours_weekly} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="current_price_per_hour">
                <Form.Label>Price per Hour</Form.Label>
                <Form.Control type="text" placeholder={editable.work_data.current_price_per_hour} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="currency">
                <Form.Label>Currency</Form.Label>
                <Form.Control as="select">
                  <option>{editable.work_data.currency}</option>
                  {[...codes()]
                    .filter((item) => item != editable.work_data.currency)
                    .map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                </Form.Control>
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

  try {
    dbConnect();

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

export default EditHours;
