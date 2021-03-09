import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => (
  <>
    <img
      src={spinner}
      style={{ width: "200px", matgin: "auto", display: "block" }}
      alt="Loading..."
    />
  </>
);

export default Spinner;
