import { Button, Form } from "react-bootstrap";
import React from "react";
import { withIronSessionSsr } from "iron-session/next";
import { authCookie } from "../lib/cookies";
import Footer from "../src/layout/Footer";
import { dbCompanyToCompany, dbConnect, dbUserToIronUser, isUserEmailInDb } from "../lib/db";
import User from "../models/User";
import { codes } from "currency-codes";
import Company from "../models/Company";
import { useRouter } from "next/router";
import Categories from "../lib/categories";

const EditHours = ({ editable }) => {
  const [error, setError] = React.useState(null);
  const router = useRouter();

  return (
    <div className="min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-8">
      <div className="flex flex-row min-w-full bg-gradient-to-r from-cyan-500 to-blue-500 justify-between items-center px-10">
        <div className="flex flex-row justify-center my-2">
          <img src="/assets/images/nextlogowhite.png" width={100} height={100} />
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
          <div className="text-center min-w-full text-4xl font-semibold">Edit User Account</div>
          <Form
            onSubmit={async (e) => {
              e.preventDefault();

              const expected_hours_weekly = e.target.expected_hours_weekly?.value;
              const current_price_per_hour = e.target.current_price_per_hour?.value;
              const currency = e.target.currency?.value;
              const autoClockOutHours = e.target.autoClockOutHours?.value;
              const categories = Categories.filter((c) => e.target[c].checked);

              const body = {
                email: editable.email,
                expected_hours_weekly,
                current_price_per_hour,
                currency,
                autoClockOutHours,
                categories,
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
            <Form.Group className="my-3" controlId="autoClockOutHours">
              <Form.Label>Hours to Clock Out Automatically</Form.Label>
              <Form.Control type="number" placeholder={editable.work_data.autoClockOutHours} min="1" />
            </Form.Group>

            <Form.Group className="my-3" controlId="expected_hours_weekly">
              <Form.Label>Expected Hours Per Week</Form.Label>
              <Form.Control type="number" placeholder={editable.work_data.expected_hours_weekly} min="0" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="current_price_per_hour">
              <Form.Label>Price per Hour</Form.Label>
              <Form.Control type="text" placeholder={editable.work_data.current_price_per_hour} min="0" />
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

            <Form.Label>Categories</Form.Label>
            <div className="flex flex-row flex-wrap min-w-full gap-12 mb-12">
              {Categories.map((c) => (
                <div key={c} className="flex gap-2 flex-row max-w-fit justify-center items-center align-center">
                  <input
                    type="checkbox"
                    name={c}
                    id={c}
                    value={c}
                    defaultChecked={editable.categories.indexOf(c) !== -1}
                  />
                  <label htmlFor={c} className="m-0 text-center min-h-fit">
                    {c}
                  </label>
                </div>
              ))}
            </div>

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
    const companies = (await Company.find()).map((c) => dbCompanyToCompany(c));

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
      props: { editable: ironEditable, companies },
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
