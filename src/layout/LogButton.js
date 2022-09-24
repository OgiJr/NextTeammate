import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import useIsLoggedIn from "../../lib/useIsLoggedIn";

export const LogButton = () => {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? (
    <div className="flex flex-row justify-center gap-2 flex-wrap">
      <Link href="/dashboard-redictor">
        <Button variant="success">
          Dashboard <i className="fal fa-chevron-right ml-2" />
        </Button>
      </Link>
      <Button
        variant="danger"
        onClick={async () => {
          await fetch("/api/logout");
          router.push("/login");
        }}
      >
        Log Out <i className="fal fa-chevron-right ml-2" />
      </Button>
    </div>
  ) : (
    <Button
      variant="primary"
      onClick={() => {
        router.push("/login");
      }}
    >
      Log in <i className="fal fa-chevron-right ml-2" />
    </Button>
  );
};
