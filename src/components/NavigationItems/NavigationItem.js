/** @format */

import React from "react";
import "./NaviagtionItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavigationItem(props) {
  return (
    <div className="navigationItem">
      <ul>
        <li onClick={props.onClose}>
          <FontAwesomeIcon
            icon={props.icon}
            style={{ paddingRight: ".7rem" }}
          />
          <span>{props.children} </span>
        </li>
      </ul>
    </div>
  );
}
