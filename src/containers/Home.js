/** @format */

import React, { Fragment } from "react";
import Hero from "../components/Layout/Hero";
import Hotels from "../components/Hotels/Hotels";
import { withRouter } from "react-router";

function Home(props) {
  const viewMapClickedHandler = (event) => {
    event.preventDefault();

    props.history.push("/map");
  };

  return (
    <Fragment>
      <Hero clicked={viewMapClickedHandler} />
      <Hotels />
    </Fragment>
  );
}
export default withRouter(Home);
