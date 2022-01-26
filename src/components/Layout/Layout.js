/** @format */

import React, { Fragment } from "react";
import Routes from "../../containers/Routes/Routes";

export default function Layout(props) {
  return (
    <Fragment>
      {props.children}
      <Routes {...props} />
    </Fragment>
  );
}
