/** @format */

import React from "react";
import "./SectionBookingTitle.css";

export default function SectionBuokingTitle(props) {
  return (
    <div className="SectionBooking">
      <div className="SectionBookingNumbering">{props.numbering}</div>
      <div className="SectionBookingTitle">{props.title}</div>
    </div>
  );
}
