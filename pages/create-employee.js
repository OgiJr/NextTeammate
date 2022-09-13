import { withIronSessionSsr } from "iron-session/next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { authCookie } from "../lib/cookies";

const CreateEmployee = () => {
  const router = useRouter();
  const [error, setError] = React.useState(null);
  return (
    <div className="min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-8">
      <div className="flex flex-row min-w-full bg-sky-400 justify-between items-center px-10">
        <div className="flex flex-row justify-center min-w-[20%]">
          <Link href="/">
            <Image src="/assets/images/nextlogo.png" width={100} height={100} layout="fixed" />
          </Link>
        </div>
        <div className="flex flex-row justify-center text-center text-4xl text-white w-[20%]">Create Employee</div>
        <div className="flex flex-row justify-evenly gap-8 w-[20%]">
          <Button
            variant="success"
            className="text-xl"
            onclick={() => {
              router.push("/dashboard-admin");
            }}
          >
            Dashboard
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

              const body = { email, first_name, last_name };
              const bodyJSON = JSON.stringify(body);

              if (!email || !first_name || !last_name) {
                setError("Please fill out all fields!");
                return;
              }

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

            <Form.Group className="mb-3" controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="John" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Smith" />
            </Form.Group>

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

  if (!user.is_admin) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard-user",
      },
      props: {},
    };
  } else {
    return {
      props: {},
    };
  }
}, authCookie);

export default CreateEmployee;
