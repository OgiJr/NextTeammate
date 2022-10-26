/* eslint-disable indent */
import { withIronSessionSsr } from "iron-session/next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import { authCookie } from "../lib/cookies";
import { dbUserToIronUser } from "../lib/db";
import User from "../models/User";
import Footer from "../src/layout/Footer";
import { Col, Text, Row, User as NextUser, Table } from "@nextui-org/react";
import { StyledBadge } from "../src/components/zoom-panel/StyledBadge";

const DashboardAdmin = ({ employees }) => {
  const router = useRouter();
  const columns = [
    { name: "NAME", uid: "name" },
    { name: "STATUS", uid: "status" },
    { name: "EXPECTED vs ACTUAL WORK HOURS THIS WEEK", uid: "hoursActual" },
    { name: "EXPECTED vs AVG(WORK HOURS/WEEK)", uid: "hoursMonthly" },
    { name: "MONTHLY SALARY", uid: "salary" },
  ];
  const users = [
    {
      id: 1,
      name: "Ognian Trajanov",
      hoursActual: 100,
      hoursExpected: 24,
      hoursMonthly: 25,
      salary: "$9000",
      status: "active",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWJnqNYzZkAYIQffsgaGOkSf525NPJAfwGieLH1NLZctX1iwguf3NMjpuu5agX5YUFfSA&usqp=CAUd",
      email: "ogtrjr@gmail.com",
    },
    {
      id: 2,
      name: "Boris Radulov",
      hoursActual: 90,
      hoursExpected: 96,
      hoursMonthly: 95,
      salary: "BGN19000",
      status: "paused",
      avatar:
        "https://countryqueer.com/wp-content/uploads/2021/02/Cameron-Hawthorn.jpg",
      email: "braduloff@gmail.com",
    },
    {
      id: 3,
      name: "Cocke",
      hoursActual: 80,
      hoursExpected: 73,
      hoursMonthly: 78,
      salary: "$9000",
      status: "active",
      avatar:
        "https://www.gannett-cdn.com/-mm-/2887f5d7d58a75a6437c45e987fd994202334aff/c=0-156-3000-1844/local/-/media/2019/06/14/DetroitFreePress/B9336878512Z.1_20190614124157_000_GH4OOU8DT.1-0.JPG.jpg?width=3000&height=1688&fit=crop&format=pjpg&auto=webp",
      email: "cocke@gmail.com",
    },
    {
      id: 4,
      name: "Dimitur Kostadinov",
      hoursActual: 70,
      hoursExpected: 100,
      hoursMonthly: 90,
      status: "paused",
      salary: "$9000",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Gay_cowboys.jpg/856px-Gay_cowboys.jpg",
      email: "borisjavery@gmail.com",
    },
    {
      id: 5,
      name: "Bobington Ivanov",
      hoursActual: 93,
      hoursExpected: 55,
      hoursMonthly: 65,
      status: "active",
      salary: "$9000",
      avatar:
        "https://d3u63wyfuci0ch.cloudfront.net/wp-content/uploads/2020/12/29225802/Cowboys-1000x500.jpg",
      email: "borisjavery@gmail.com",
    },
  ];
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <NextUser squared src={user.avatar} name={cellValue} css={{ p: 0 }}>
            {user.email}
          </NextUser>
        );
      case "hoursActual":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                Actual: {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                Expected: {user.hoursExpected}
              </Text>
            </Row>
          </Col>
        );
      case "hoursMonthly":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                Actual: {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                Expected: {user.hoursExpected}
              </Text>
            </Row>
          </Col>
        );
      case "status":
        return (
          <StyledBadge type={user.status}>
            {cellValue == "active" ? "OK" : "Not OK"}
          </StyledBadge>
        );
      default:
        return <div className="font-bold">{cellValue}</div>;
    }
  };
  return (
    <div className="min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-8">
      <div className="flex flex-row min-w-full bg-gradient-to-r from-cyan-500 to-blue-500 justify-between items-center px-10">
        <div className="flex flex-row justify-center my-2">
          <Link href="/dashboard-user">
            <Image
              src="/assets/images/nextlogowhite.png"
              width={100}
              height={100}
              layout="fixed"
            />
          </Link>
        </div>
        <div className=" flex flex-col mt-3 md:mt-0 md:flex-row justify-evenly md:gap-8">
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
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="none"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={users}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <Footer />
    </div>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
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
    let employees = await Promise.all(
      result.map(async (e) => await dbUserToIronUser(e))
    );

    return {
      props: {
        user,
        employees,
      },
    };
  },
  authCookie
);

export default DashboardAdmin;
