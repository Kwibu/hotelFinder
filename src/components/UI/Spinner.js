/** @format */

import React from "react";
import classes from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={classes.SpinnerContainer}>
      <div className={classes.Spinner}>Loading...</div>
    </div>
  );
}
