/* eslint-disable indent */
import { withIronSessionSsr } from "iron-session/next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import { authCookie } from "../lib/cookies";
import Footer from "../src/layout/Footer";
import { Col, Text, Row, User as NextUser, Table, Input } from "@nextui-org/react";
import { StyledBadge } from "../src/components/zoom-panel/StyledBadge";
import useSWR, { useSWRConfig } from "swr";

const DashboardAdmin = ({ start, end }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "STATUS", uid: "status" },
    { name: "WORK HOURS", uid: "hoursActual" },
    { name: "PERFORMANCE", uid: "performance" },
    { name: "SALARY", uid: "salary" },
  ];

  const [start_date, set_start_date] = React.useState(new Date(start));
  const [end_date, set_end_date] = React.useState(new Date(end));

  const isDate = (date) => new Date(date) !== "Invalid Date" && !isNaN(new Date(date));

  const fetcher = (url, queryParams = "") => fetch(`${url}${queryParams}`).then(async (res) => await res.json());
  const { data } = useSWR(
    [
      "/api/get-records",
      `?start=${isDate(start_date) ? start_date.toISOString() : new Date(0).toISOString()}&end=${
        isDate(end_date) ? end_date.toISOString() : new Date().toISOString()
      }`,
    ],
    fetcher
  );

  const renderCell = (user, columnKey) => {
    switch (columnKey) {
      case "name":
        return (
          <NextUser squared src={user.picture} name={user.name} css={{ p: 0 }}>
            {user.email}
          </NextUser>
        );
      case "hoursActual":
        return user.is_assigned ? (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                Actual: {user.actual_work}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                Expected: {user.expected_work}
              </Text>
            </Row>
          </Col>
        ) : (
          <></>
        );
      case "status":
        return (
          <StyledBadge type={user.is_assigned && user.status ? "active" : "paused"}>
            {user.is_assigned && user.status ? "Clocked In" : "Clocked Out"}
          </StyledBadge>
        );
      case "salary":
        return user.is_assigned ? (
          <Col>
            {Object.keys(user.salaries).map((curr, i) => (
              <Row key={i}>
                <Text b size={14} css={{ tt: "capitalize" }}>
                  {curr}&nbsp;{user.salaries[curr]}
                </Text>
              </Row>
            ))}
          </Col>
        ) : (
          <></>
        );
      case "performance":
        return (
          <StyledBadge type={user.actual_work >= user.expected_work ? "active" : "paused"}>
            {user.actual_work >= user.expected_work ? "OK Performance" : "Underperforming"}
          </StyledBadge>
        );
      default:
        return <div className="font-bold"></div>;
    }
  };
  return (
    <div className="min-w-[100vw] min-h-[100vh] flex flex-col justify-start gap-8">
      <div className="flex flex-row min-w-full bg-gradient-to-r from-cyan-500 to-blue-500 justify-between items-center px-10">
        <div className="flex flex-row justify-center my-2">
          <Link href="/dashboard-user">
            <Image src="/assets/images/nextlogowhite.png" width={100} height={100} layout="fixed" />
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
      <div className="flex min-w-full flex-row justify-center gap-2">
        <div className="flex flex-col justify-center items-center gap-2">
          <span className="text-xl w-full text-center">Start Date</span>
          <Input
            aria-label="start-date"
            width="186px"
            type="date"
            value={`${start_date.getFullYear()}-${pad(start_date.getMonth() + 1)}-${pad(start_date.getDate())}`}
            onChange={(e) => {
              e.preventDefault();

              const new_date = new Date(
                parseInt(e.target.value.substring(0, 4)),
                parseInt(e.target.value.substring(5, 7)),
                parseInt(e.target.value.substring(8, 10))
              );

              if (new_date >= new Date()) {
                return;
              }
              set_start_date(new_date);
              mutate();
            }}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <span className="text-xl w-full text-center">End Date</span>
          <Input
            aria-label="end-date"
            width="186px"
            type="date"
            value={`${end_date.getFullYear()}-${pad(end_date.getMonth() + 1)}-${pad(end_date.getDate())}`}
            onChange={(e) => {
              e.preventDefault();

              const new_date = new Date(
                parseInt(e.target.value.substring(0, 4)),
                parseInt(e.target.value.substring(5, 7)),
                parseInt(e.target.value.substring(8, 10))
              );

              if (new_date < start_date) {
                return;
              }
              set_end_date(new_date);
              mutate();
            }}
          />
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
        <Table.Body items={!data ? [] : data.data}>
          {(item) => (
            <Table.Row key={item.email}>
              {(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <Footer />
    </div>
  );
};

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req, query }) {
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

  const props = {
    start: query.start ? query.start : new Date(Date.now() - 60 * 60 * 24 * 30 * 1000).toISOString(),
    end: query.end ? query.end : new Date().toISOString(),
  };

  return {
    props,
  };
}, authCookie);

export default DashboardAdmin;
