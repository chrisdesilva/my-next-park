import React from "react";
import Head from "next/head";

import Link from "./Link";

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>My Next Park | {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="border-b-2 border-green-700 fixed text-center z-10 w-screen py-4 bg-white">
        <Link href="/" label="My Next Park" />
      </nav>
      <main className="container mx-auto">{children}</main>
    </>
  );
};

export default Layout;
