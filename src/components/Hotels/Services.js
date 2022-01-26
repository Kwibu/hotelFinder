/** @format */

import classes from "./Services.module.css";
import React from "react";
import Empty from "../UI/Empty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

export default function Services({ services }) {
  const servicesArray = services.map((service, i) => {
    return <li key={i}>{service.serviceName}</li>;
  });
  return (
    <div className={classes.Services}>
      <div>
        <FontAwesomeIcon icon={faDoorOpen} />
        <span style={{ padding: "0 .3rem" }}> Services</span>
      </div>
      {servicesArray && <ul>{servicesArray}</ul>}
      {servicesArray.length === 0 && <Empty />}
    </div>
  );
}
