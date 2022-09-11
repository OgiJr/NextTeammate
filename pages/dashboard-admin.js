import { withIronSessionSsr } from "iron-session/next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import { authCookie } from "../lib/cookies";

const DashboardAdmin = ({ user }) => {
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
          Welcome, {user.first_name}
        </div>
        <div className="flex flex-row justify-evenly gap-8 w-[20%]">
          <Button variant="success" className="text-xl">
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
      props: {
        user,
      },
    };
  }
}, authCookie);

export default DashboardAdmin;
