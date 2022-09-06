import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Layout from "../src/layout/Layout";
import validateEmail from "../lib/validateEmail";
import validatePassword from "../lib/validatePassword";
import { RegisterStore } from "../lib/registerState";

const Questionaire = () => {
  const first_name = RegisterStore.useState((s) => s.first_name);
  const last_name = RegisterStore.useState((s) => s.last_name);
  const [error, setError] = useState(null);

  const Start = () => (
    <>
      <div className="text-center min-w-full text-3xl font-semibold">
        Are you an employeer or are you looking to freelance?
      </div>
      <div className="flex flex-row justify-center gap-12 mt-8">
        <Button variant="primary" className="text-2xl" onClick={() => setDrawable("name")}>
          I'm an employer
        </Button>
        <Button variant="primary" className="text-2xl" onClick={() => setDrawable("no")}>
          I'm a freelancer
        </Button>
      </div>
    </>
  );

  const NoReg = () => (
    <>
      <div className="text-center min-w-full text-2xl mt-4">
        Sorry. We don&apos;t currently accept registrations from independent freelancers. Please ask your employer to
        create an account for you.
      </div>
      <div className="flex flex-row justify-center mt-8">
        <Button variant="primary" className="text-2xl" onClick={() => setDrawable("start")}>
          Go Back
        </Button>
      </div>
    </>
  );

  const EmployerName = () => (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (!e.target.firstName.value || !e.target.lastName.value) {
            setError("Please fill out your names!");
            return;
          }

          RegisterStore.update((s) => {
            s.first_name = e.target.firstName.value;
            s.last_name = e.target.lastName.value;
          });

          setError(null);
          setDrawable("email");
        }}
      >
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="John" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Smith" />
        </Form.Group>

        <div className="flex flex-row justify-evenly min-w-full">
          <Button variant="secondary" onClick={() => setDrawable("Start")}>
            Go Back
          </Button>
          <Button variant="primary" type="submit" className="font-bold">
            Next
          </Button>
        </div>
      </Form>
    </>
  );

  const EmployerEmail = () => (
    <>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();

          if (!e.target.email.value || !e.target.password.value) {
            setError("Please fill out your email and password!");
            return;
          }

          if (!validateEmail(e.target.email.value)) {
            setError("Please enter a valid email!");
            return;
          }

          if (!validatePassword(e.target.password.value)) {
            setError(
              "The password must be at least 8 characters, contain a lowercase letter, an uppercase letter, and at least one digit!"
            );
            return;
          }

          const user = {
            first_name,
            last_name,
            email: e.target.email.value,
            password: e.target.password.value,
            is_admin: true,
          };

          let result;
          try {
            result = await fetch("/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            });
          } catch (e) {
            const content = await result.json();

            setError(content.message);
            return;
          }

          setError(null);
          setDrawable("done");
        }}
      >
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="john.smith@example.com" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="********" />
        </Form.Group>

        <div className="flex flex-row justify-evenly min-w-full">
          <Button variant="secondary" onClick={() => setDrawable("name")}>
            Go Back
          </Button>
          <Button variant="primary" type="submit" className="font-bold">
            Finish
          </Button>
        </div>
      </Form>
    </>
  );

  const Done = () => (
    <>
      <div className="text-center min-w-full text-2xl mt-4">Thank you {first_name}. Your registration is complete.</div>
      <div className="flex flex-row justify-center mt-8">
        <Button variant="primary" className="text-2xl">
          Go To Dashboard
        </Button>
      </div>
    </>
  );

  const [drawable, setDrawable] = useState("start");

  return (
    <div className="flex flex-row justify-center min-w-full">
      <div className="flex flex-col justify-center min-w-full items-center justify-items-center">
        <div
          className="bg-gray-100 lg:w-[40vw] w-[80vw] py-8 mb-8 !border-sky-600 px-8"
          style={{ borderWidth: 4, borderStyle: "solid", borderRadius: 20 }}
        >
          <div className="text-center min-w-full text-4xl font-semibold">Register</div>
          <div className="my-8 mx-auto w-[80%] h-[2px] bg-sky-600" />
          {(() => {
            switch (drawable) {
              case "start":
                return <Start />;
              case "no":
                return <NoReg />;
              case "name":
                return <EmployerName />;
              case "email":
                return <EmployerEmail />;
              case "done":
                return <Done />;
            }
          })()}
          {error ? <div className="text-center bg-red-200 mt-8 rounded-xl p-2">{error}</div> : <></>}
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <Layout>
      <Questionaire />
    </Layout>
  );
};

export default Index;
