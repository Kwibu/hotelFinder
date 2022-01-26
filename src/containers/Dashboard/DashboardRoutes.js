/** @format */

import React, { Fragment } from "react";
import { Route, withRouter } from "react-router";
import Dashboard from "../../components/Dashoard/Dashboard";
import DashboardHome from "../../components/Dashoard/DashboardHome/DashboardHome";
import Payment from "../../components/Dashoard/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CreateHotel from "../../components/Dashoard/CreateHotel/CreateHotel";
import HomeHotel from "../../components/Dashoard/HotelMore/HomeHotel";
import ServiceEntry from "../../components/Dashoard/DashboardHome/ServiceEntry/ServiceEntry";
import RoomEntry from "../../components/Dashoard/DashboardHome/RoomEntry/RoomEntry";
import GalleryEntry from "../../components/Dashoard/DashboardHome/GalleryEntry/GalleryEntry";
import Reservations from "../../components/Dashoard/DashboardHome/Reservations/Reservations";
import HotelReports from "../../components/Dashoard/HotelMore/HotelReport/HotelReports";
import HotelModify from "../../components/Dashoard/HotelMore/HotelModify/HotelModify";
import HotelManagements from "../../components/Dashoard/DashboardHome/HotelManagement/HotelManagements";
import UserManagements from "../../components/Dashoard/DashboardHome/UsersManagement/UserManagements";
import HotelPayment from "../../components/Dashoard/DashboardHome/HotelPayments/HotelPayments";
import AdminReport from "../../components/Dashoard/HotelMore/HotelReport/AdminReport";

const promise = loadStripe(
  "pk_test_51IzTnSDRYQok9NIfaDcp3gdGSx43hH6urrnlNTo1P8Hv4TiW4OxWuE5kQ6UhYXw0X40JbKwsKKojcHdovDXTcuXH00dcYoEVaz"
);

function DashboardRoutes(props) {
  return (
    <Fragment>
      <Route path="/dashboard" exact>
        <Dashboard>
          <DashboardHome {...props} />
        </Dashboard>
      </Route>
      <Route path="/dashboard/create-hotel/payment">
        <Elements stripe={promise}>
          <Payment {...props} />
        </Elements>
      </Route>
      <Route path="/dashboard/create-hotel/inputs">
        <CreateHotel {...props} />
      </Route>
      <Route path="/dashboard/manage-hotel">
        <HotelManagements {...props} />
      </Route>
      <Route path="/dashboard/manage-users">
        <UserManagements {...props} />
      </Route>
      <Route path="/dashboard/hotel" exact>
        <HomeHotel {...props} />
      </Route>
      <Route path="/dashboard/hotel/create-service">
        <ServiceEntry {...props} />
      </Route>
      <Route path="/dashboard/hotel/create-room">
        <RoomEntry {...props} />
      </Route>
      <Route path="/dashboard/hotel/create-gallery">
        <GalleryEntry {...props} />
      </Route>
      <Route path="/dashboard/reservation-orders">
        <Reservations {...props} />
      </Route>
      <Route path="/dashboard/hotel/Report">
        <HotelReports {...props} />
      </Route>
      <Route path="/dashboard/hotel/modify-hotel">
        <HotelModify {...props} />
      </Route>
      <Route path="/dashboard/admin/payment">
        <HotelPayment {...props} />
      </Route>
      <Route path="/dashboard/admin/Report">
        <AdminReport {...props} />
      </Route>
    </Fragment>
  );
}
export default withRouter(DashboardRoutes);
