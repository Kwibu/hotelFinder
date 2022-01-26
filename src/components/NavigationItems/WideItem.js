/** @format */

import React from "react";
import classes from "./wideItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavItem(props) {
  return (
    <div className={classes.navigationItemWide}>
      <li onClick={props.onClose}>
        <FontAwesomeIcon icon={props.icon} style={{ paddingRight: ".7rem" }} />
        <span>{props.children} </span>
      </li>
    </div>
  );
}
