/** @format */

import React from "react";
import "./RoomTitle.css";
import photos from "../../assets/Pictures&Logos/42129518.jpg";

export default function RoomTitle(props) {
  return (
    <div className="room-container">
      <div className="room-title-image">
        <img src={photos} alt="" />
      </div>
      <div className="room-title">
        <p>{props.hotelTitle.toUpperCase()}</p>
        <p>1 hour to reach hotel</p>
      </div>
    </div>
  );
}
