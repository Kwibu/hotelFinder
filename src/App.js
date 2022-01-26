/** @format */
import React, { Fragment, useState } from "react";
import { withRouter } from "react-router";
import DashboardFooter from "./components/Dashoard/DashboardFooter/DashboardFooter";
import DashboardGlobalHeader from "./components/Dashoard/DashboardHeader/DashboardGlobalHeader";
import DashboardHeader from "./components/Dashoard/DashboardHeader/DashboardHeader";
import Header from "./components/Layout/Header";
import Layout from "./components/Layout/Layout";
import DashboardRoutes from "./containers/Dashboard/DashboardRoutes";

function App(props) {
  const [currentPos, setCurrentPos] = useState({});

  console.log(navigator.onLine);

  const staticPosition = {
    latitude: -1.9562469,
    longitude: 30.0626615,
  };

  if (!navigator.geolocation) {
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (success) => {
      setCurrentPos({
        longitude: success.coords.longitude,
        latitude: success.coords.latitude,
      });
    },
    (error) => {}
  );

  let datas;
  if (props.location.pathname === "/dashboard") {
    datas = (
      <Fragment>
        <DashboardHeader {...props} />
        <DashboardRoutes {...props} />
        <DashboardFooter {...props} />
      </Fragment>
    );
  } else if (
    props.location.pathname.length > 13 &&
    props.location.pathname.includes("dash")
  ) {
    datas = (
      <Fragment>
        <DashboardGlobalHeader {...props} />
        <DashboardRoutes {...props} />
        <DashboardFooter {...props} />
      </Fragment>
    );
  } else {
    datas = (
      <Fragment>
        <Header {...props} />
        <DashboardRoutes {...props} />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Layout currentPositon={navigator.onLine ? currentPos : staticPosition}>
        {datas}
      </Layout>
    </Fragment>
  );
}

export default withRouter(App);
