import Link from "next/link";
import { Fragment } from "react";
import React from "react";

export const HomeMenu = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/i-want-to-work">I Want to Work</Link>
    </li>
    <li className="menu-item">
      <Link href="/i-want-to-hire">I Want to Hire</Link>
    </li>
  </Fragment>
);
export const PageMenu = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/about">About</Link>
    </li>
    <li className="menu-item">
      <Link href="/tc">Terms and Conditions</Link>
    </li>
  </Fragment>
);
