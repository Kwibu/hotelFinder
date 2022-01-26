import React from "react";
import classes from "./HomeHeader.module.css";

export default function HomeHeaderSection() {
  return (
    <div className={classes.HomeHeader}>
      <div className={classes.HomeHeaderTitle}>Manage your Hotel.</div>
      <div className={classes.HomeHeaderSubtitle}>
        When you need to Scale your business shiwell is only application that
        will help you.
      </div>
    </div>
  );
}
