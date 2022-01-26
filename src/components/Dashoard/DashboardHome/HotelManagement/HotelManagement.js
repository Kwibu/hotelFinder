import React from "react";
import "./HotelManagement.css";

export default function HotelRoomModify(props) {
  return (
    <div className="HotelRoom-order">
      <div className="HotelRoom-avatar">
        <img
          src={props.image}
          alt={props.hotelName}
          style={{ width: "40px" }}
        />
      </div>
      <div>
        <div className="HotelRoom-name-payer">{props.hotelName}</div>
        <div className="HotelRoom-name-payer-subtitle">{props.hotelAdress}</div>
      </div>
      <div className="HotelRoom-name-payer-payement">
        <button className="delete-image-button" onClick={props.clicked}>
          view
        </button>
      </div>
    </div>
  );
}
