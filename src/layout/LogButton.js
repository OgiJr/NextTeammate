import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import useIsLoggedIn from "../../lib/useIsLoggedIn";

export const LogButton = ({ language }) => {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? (
    <div className="flex flex-row justify-center gap-2 flex-wrap">
      <Link href="/dashboard-redirector">
        <Button
          variant="success"
          className="thm-btn bg-thm-color-three thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
        >
          Dashboard <i className="fal fa-chevron-right ml-2" />
        </Button>
      </Link>
      <Button
        className="thm-btn bg-thm-color-five thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
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
    <Link href="/login">
      <a
        className="thm-btn bg-thm-color-three thm-color-two-shadow btn-rounded mr-4 mb-4 wow fadeInRight"
        data-wow-delay=".50ms"
      >
        {language == "en" ? "Log in" : "Портал"}
        <i className="fal fa-chevron-right ml-2" />
      </a>
    </Link>
  );
};
