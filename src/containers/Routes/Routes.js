/** @format */

import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import HotelDetails from "../../components/Hotels/HotelDetails";
import HotelRooms from "../../components/Hotels/HotelRooms";
import Booking from "../../components/Booking/Booking";
import Login from "../../components/Authenticated/Login";
import AuthWelcome from "../../components/Authenticated/Welcome";
import SignUp from "../../components/Authenticated/SignUp";
import ContactUs from "../../components/Contact-Us/ContactUs";
import Aggrements from "../../components/Aggrements/Aggrements";
import Map from "../../components/Map/Map";
import Home from "../Home";

function Routes(props) {
  return (
    <Fragment>
      <Switch>
        <Route path="/hotel-details/:hotelId" exact>
          <HotelDetails />
        </Route>
        <Route path="/hotel-details/:hotelId/hotel-rooms" exact>
          <HotelRooms />
        </Route>
        <Route path="/hotel-details/:hotelId/hotel-rooms/booking/:roomId">
          <Booking />
        </Route>
        <Route path="/authenticate">
          <AuthWelcome />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/contact-us">
          <ContactUs />
        </Route>
        <Route path="/aggrements">
          <Aggrements />
        </Route>
        <Route path="/map">
          <Map {...props} />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Fragment>
  );
}
export default Routes;
