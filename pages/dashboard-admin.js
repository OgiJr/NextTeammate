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
        <div className="flex flex-row justify-center my-2">
          <Link href="/">
            <Image src="/assets/images/nextlogo.png" width={100} height={100} layout="fixed" />
          </Link>
        </div>
        <div className="flex flex-row text-center justify-center text-4xl text-white">Welcome, {user.first_name}!</div>
        <div className="flex flex-row justify-evenly gap-8">
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
            className="text-xl"
            onClick={() => {
              router.push("/zoom");
            }}
          >
            Sharing System
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
            {employees.map((e) => {
              const is_setup =
                e.work_data &&
                e.work_data.currency &&
                e.work_data.expected_hours_weekly &&
                e.work_data.current_price_per_hour;
              return (
                <div
                  className="flex flex-col rounded-xl bg-gray-200 !border-sky-300 !border-1 min-w-[10vw] min-h-[20vh]  justify-evenly gap-2 p-4"
                  key={e.email}
                >
                  <div className="flex flex-row justify-center">
                    <img
                      src={e.picture ? `/uploads/${e.picture}` : "/assets/images/no-user.jpg"}
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="text-center text-3xl">
                    {e.first_name}&nbsp;{e.last_name}
                  </div>
                  <div className="text-center text-md text-gray-800">{e.email}</div>
                  {is_setup ? (
                    <div className="text-center text-md text-gray-800">
                      {e.work_data.expected_hours_weekly} hours @ {e.work_data.current_price_per_hour}&nbsp;
                      {e.work_data.currency} / hour
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="text-center text-md text-gray-500">{e.bio}</div>
                  {!e.has_password ? (
                    <div className="text-center text-xl text-red-500">Unclaimed Account</div>
                  ) : (
                    <div className="flex flex-col justify-center gap-2">
                      <Link href={`/edit-hours?email=${e.email}`}>
                        <Button variant="primary">Edit User</Button>
                      </Link>
                      <Button variant="danger">Delete User</Button>
                    </div>
                  )}
                </div>
              );
            })}
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
  let employees = await Promise.all(result.map(async (e) => await dbUserToIronUser(e)));

  return {
    props: {
      user,
      employees,
    },
  };
}, authCookie);

export default DashboardAdmin;
