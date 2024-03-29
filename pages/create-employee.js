import { withIronSessionSsr } from "iron-session/next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { authCookie } from "../lib/cookies";
import Footer from "../src/layout/Footer";
import { dbCompanyToCompany, dbConnect, isUserEmailInDb } from "../lib/db";
import Company from "../models/Company";
import useSWR from "swr";
import Categories from "../lib/categories";

const CreateEmployee = ({ user, companies }) => {
  const router = useRouter();
  const [error, setError] = React.useState(null);

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

  return (
    <div className="min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-8">
      <div className="flex flex-row min-w-full bg-gradient-to-r from-cyan-500 to-blue-500 justify-between items-center px-10">
        <div className="flex flex-row justify-center my-2">
          <Link href="/dashboard-user">
            <Image src="/assets/images/nextlogowhite.png" width={100} height={100} layout="fixed" />
          </Link>
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
      <div className="flex flex-col justify-center min-w-full items-center justify-items-center">
        <div
          className="bg-gray-100 lg:w-[40vw] w-[80vw] py-8 mb-8 !border-sky-600 px-8"
          style={{ borderWidth: 4, borderStyle: "solid", borderRadius: 20 }}
        >
          <div className="text-center min-w-full text-4xl font-semibold">Enter Employee Information</div>
          <Form
            onSubmit={async (e) => {
              e.preventDefault();

              const email = e.target.email.value;
              const first_name = e.target.first_name.value;
              const last_name = e.target.last_name.value;
              const company = e.target.company.value;
              const categories = Categories.filter((c) => e.target[c].checked);

              if (!email || !first_name || !last_name || !company) {
                setError("Please fill out all fields!");
                return;
              }

              const body = { email, first_name, last_name, company, categories };
              const bodyJSON = JSON.stringify(body);

              let result;
              result = await fetch("/api/user", {
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
              router.push("/dashboard-admin");
            }}
          >
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="john.smith@example.com" />
            </Form.Group>
            {user.is_admin ? (
              <Form.Group className="mb-3" controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control as="select" aria-label="Company">
                  <option value="0">No Company</option>
                  {companies.map((c) => (
                    <option value={c._id} key={c.name}>
                      {c.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            ) : (
              <></>
            )}
            <Form.Group className="mb-3" controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="John" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Smith" />
            </Form.Group>

            <Form.Label>Categories</Form.Label>
            <div className="flex flex-row flex-wrap min-w-full gap-12 mb-12">
              {Categories.map((c) => (
                <div key={c} className="flex gap-2 flex-row max-w-fit justify-center items-center align-center">
                  <input type="checkbox" name={c} id={c} value={c} />
                  <label htmlFor={c} className="m-0 text-center min-h-fit">
                    {c}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex flex-row justify-evenly min-w-full">
              <Button variant="success" type="submit" className="font-bold">
                Create
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

  if (!(await isUserEmailInDb(user.email))) {
    req.session.destroy();
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  if (!user.is_admin) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard-user",
      },
      props: {},
    };
  } else {
    try {
      await dbConnect();

      const companies = (await Company.find()).map((c) => dbCompanyToCompany(c));

      return {
        props: { user, companies },
      };
    } catch {
      return {
        redirect: {
          permanent: false,
          destination: "/dashboard-user",
        },
        props: {},
      };
    }
  }
}, authCookie);

export default CreateEmployee;
