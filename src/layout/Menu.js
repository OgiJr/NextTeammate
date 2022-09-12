import Link from "next/link";
import { Fragment } from "react";
export const HomeMenu = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/index-3">I want to Work</Link>
    </li>
    <li className="menu-item">
      <Link href="/index-2">I Want to Hire</Link>
    </li>
  </Fragment>
);
export const PageMenu = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/faqs">{`Terms and Conditions`}</Link>
    </li>
  </Fragment>
);

export const CoursesMenu = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/courses">Courses</Link>
    </li>
    <li className="menu-item">
      <Link href="/course-details">Course Details</Link>
    </li>
  </Fragment>
);
export const BlogMenu = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/blog-grid">Blog Grid</Link>
    </li>
    <li className="menu-item">
      <Link href="/blog-list">Blog List</Link>
    </li>
    <li className="menu-item">
      <Link href="/blog-masonry">Blog Masonry</Link>
    </li>
    <li className="menu-item">
      <Link href="/blog-details">Blog Details</Link>
    </li>
  </Fragment>
);
export const PortfolioMenu = () => (
  <Fragment>
    <li className="menu-item">
      <Link href="/portfolio-grid">Portfolio Grid</Link>
    </li>
    <li className="menu-item">
      <Link href="/portfolio-gallery">Portfolio Gallery</Link>
    </li>
    <li className="menu-item">
      <Link href="/portfolio-masonry">Portfolio Masonry</Link>
    </li>
    <li className="menu-item">
      <Link href="/portfolio-details">Portfolio Details</Link>
    </li>
  </Fragment>
);
