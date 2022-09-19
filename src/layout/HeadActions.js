import Link from "next/dist/client/link";
import React from "react";

export const DefaultHeadActions = () => {
  return (
    <Link href="/login">
      <a className="thm-btn bg-thm-color-three thm-color-three-shadow btn-rectangle">
        Log in <i className="fal fa-chevron-right ml-2" />
      </a>
    </Link>
  );
};
