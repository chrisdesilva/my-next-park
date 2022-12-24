import React from "react";
import { oneOf, string } from "prop-types";

import NextLink from "next/link";

const Link = ({ className = "", color = "green", href, label }) => {
  const isInternal = href.charAt(0) === "/";

  const getColorStyles = () => {
    if (!["green", "blue"].includes(color)) {
      console.warn("Please use green or blue for the Link component");
      return "";
    }
    if (color === "green") {
      return "text-green-700 hover:text-green-900";
    }

    if (color === "blue") {
      return "text-blue-700 hover:text-blue-900";
    }
  };

  const colorStyles = getColorStyles();
  const styles = `${className} ${colorStyles} transition-colors duration-300`;

  if (isInternal) {
    <NextLink href={href}>
      <a className={styles}>{label}</a>
    </NextLink>;
  }

  return (
    <a className={styles} href={href} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
};

Link.propTypes = {
  className: string,
  color: oneOf(["blue", "green"]),
  href: string,
  label: string,
};

export default Link;
