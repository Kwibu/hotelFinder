/** @format */

import React from "react";
import "./Map.css";

export default function HotelMap(props) {
  return (
    <div className="hotel-marked" onClick={props.clicked}>
      <div className="mapImageHotel">
        <img src={props.hotelImage} alt={props.hotelImage} />
      </div>
      <div>
        <p className="TitleHotelMap">{props.hotelName}</p>
        <p className="subTitleHotelMap">{props.hotelAddress}</p>
        <p className="minuteHotelMap">34min on foot</p>
      </div>
    </div>
  );
}
