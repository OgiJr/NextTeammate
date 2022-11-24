import { Button, Form } from "react-bootstrap";
import React from "react";
import { withIronSessionSsr } from "iron-session/next";
import { authCookie } from "../lib/cookies";
import Footer from "../src/layout/Footer";
import { dbCompanyToCompany, dbConnect, dbUserToIronUser, isUserEmailInDb } from "../lib/db";
import User from "../models/User";
import Company from "../models/Company";
import { useRouter } from "next/router";

const EditCompany = ({ editable, companies }) => {
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
          <div className="text-center min-w-full text-4xl font-semibold">Edit User Company</div>
          <Form
            onSubmit={async (e) => {
              e.preventDefault();

              const company = e.target.company.value;

              const body = {
                email: editable.email,
                company,
              };
              const bodyJSON = JSON.stringify(body);

              let result;
              result = await fetch("/api/set-company", {
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
            <Form.Group className="mb-3" controlId="company">
              <Form.Label>Company</Form.Label>
              <Form.Control as="select">
                <option value="0">No Company</option>
                {companies.map((value) => (
                  <option key={value._id} value={value._id}>
                    {value.name}
                  </option>
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
    dbConnect();

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

export default EditCompany;
