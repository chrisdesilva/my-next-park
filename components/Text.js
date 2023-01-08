import React from "react";
import { string } from "prop-types";

const styleMap = {
  h1: "text-3xl md:text-5xl",
  h2: "text-xl md:text-3xl",
};

const Text = ({ children, className, element: Element = "p" }) => {
  let styles = className;

  if (styleMap[Element]) {
    styles = `${styleMap[Element]} ${className}`;
  }
  return <Element className={styles}>{children}</Element>;
};

Text.propTypes = {
  children: string,
  className: string,
  element: string,
};

export default Text;
