/** @format */

import React from "react";
import classes from "./Logo.module.css";
import LogoPic from "../../assets/Pictures&Logos/shewell logo white.png";
import LogoBlackImage from "../../assets/Pictures&Logos/shewell logo.png";

export const Logo = (props) => (
  <div className={classes.SwiftLogo}>
    <img src={LogoPic} alt="" />
  </div>
);

export const LogoBlack = (props) => (
  <div className={classes.SwiftLogo}>
    <img src={LogoBlackImage} alt="" />
  </div>
);
