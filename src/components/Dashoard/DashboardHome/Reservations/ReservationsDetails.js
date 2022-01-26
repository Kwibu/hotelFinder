import React, { Fragment } from "react";
import classes from "../../../UI/Messages/Details.module.css";

export default function ReservationsDetails({ bookingUserDetails }) {
  const bookingUserDetailsDOM = bookingUserDetails.map((bookingUser) => {
    return (
      <div key={bookingUser.bookingId} className={classes.MoreDetails}>
        <div className={classes.detailsItem}>
          <div className={classes.detailTitle}> Names </div>
          <div className={classes.detailName}> {bookingUser.full_names} </div>
        </div>
        <div className={classes.detailsItem}>
          <div className={classes.detailTitle}> Address </div>
          <div className={classes.detailName}>
            {bookingUser.address}, {bookingUser.town}, {bookingUser.country}
          </div>
        </div>
        <div className={classes.detailsItem}>
          <div className={classes.detailTitle}>Email </div>
          <div className={classes.detailName}> {bookingUser.averagePrice} </div>
        </div>
        <div className={classes.detailsItem}>
          <div className={classes.detailTitle}> Entering Date </div>
          <div className={classes.detailName}>{bookingUser.entering_date}</div>
          <div className={classes.detailTitle}> Leaving Date </div>
          <div className={classes.detailName}> {bookingUser.leaving_date} </div>
          <div className={classes.detailTitle}> Number Of Them </div>
          <div className={classes.detailName}>
            {bookingUser.number_of_adult} Adult(s) and
            <span> {bookingUser.number_of_children}</span> children
          </div>
        </div>
        <div className={classes.detailsItem}>
          <div className={classes.detailTitle}>Room Needed </div>
          <div className={classes.detailName}> {bookingUser.room_needed} </div>
        </div>
        <div className={classes.detailsItem}>
          <div className={classes.detailTitle}>Room Type </div>
          <div className={classes.detailName}> {bookingUser.room_type} </div>
        </div>
        <div className={classes.detailsItem}>
          <div className={classes.detailTitle}>Payment </div>
          <div className={classes.detailName}> {bookingUser.total_payment}</div>
        </div>
      </div>
    );
  });
  return <Fragment>{bookingUserDetailsDOM}</Fragment>;
}
