import { withIronSessionSsr } from "iron-session/next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import { authCookie } from "../lib/cookies";
import { dbUserToIronUser } from "../lib/db";
import User from "../models/User";

const DashboardAdmin = ({ user, employees }) => {
  const router = useRouter();
  return (
    <div className="min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-8">
      <div className="flex flex-row min-w-full bg-sky-400 justify-between items-center px-10">
        <div className="flex flex-row justify-center min-w-[20%]">
          <Link href="/">
            <Image src="/assets/images/nextlogo.png" width={100} height={100} layout="fixed" />
          </Link>
        </div>
        <div className="flex flex-row justify-center text-center text-4xl text-white w-[20%]">
          Welcome, {user.first_name}!
        </div>
        <div className="flex flex-row justify-evenly gap-8 w-[20%]">
          <Button
            variant="success"
            className="text-xl"
            onClick={() => {
              router.push("/create-employee");
            }}
          >
            Add Employee
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
      <div className="flex flex-row flex-wrap min-w-full gap-8 p-10 justify-center justify-items-center">
        {employees.length === 0 ? (
          <div className="text-center text-3xl">No Employees Yet.</div>
        ) : (
          <>
            {employees.map((e) => (
              <div
                className="flex flex-col rounded-xl bg-gray-200 !border-sky-300 !border-1 min-w-[10vw] min-h-[20vh]  justify-evenly gap-2 p-4"
                key={e.email}
              >
                <div className="flex flex-row justify-center">
                  <Image
                    src={e.picture ? `/uploads/${e.picture}` : "/assets/images/no-user.jpg"}
                    layout="fixed"
                    width={150}
                    height={150}
                  />
                </div>
                <div className="text-center text-3xl">
                  {e.first_name}&nbsp;{e.last_name}
                </div>
                <div className="text-center text-md text-gray-500">{e.email}</div>
                {!e.has_password ? <div className="text-center text-xl text-red-500">Unclaimed Account</div> : <></>}
              </div>
            ))}
          </>
        )}
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
  }

  let result = await User.find({ is_admin: false });
  let employees = result.map((e) => dbUserToIronUser(e));

  return {
    props: {
      user,
      employees,
    },
  };
}, authCookie);

export default DashboardAdmin;
