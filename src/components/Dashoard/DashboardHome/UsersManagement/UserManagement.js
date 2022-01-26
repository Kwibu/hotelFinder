import React from "react";
import "./UserManagement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function UserManagement(props) {
  return (
    <div className="HotelRoom-order">
      <div className="HotelRoom-avatar">
        <FontAwesomeIcon icon={faUserCircle} />
      </div>
      <div>
        <div className="HotelRoom-name-payer">{props.userName}</div>
        <div className="HotelRoom-name-payer-subtitle">{props.email}</div>
        <div className="HotelRoom-name-payer-subtitle">{props.date}</div>
      </div>
      <div className="HotelRoom-name-payer-payement">
        <button className="delete-image-button" onClick={props.clicked}>
          Choose action
        </button>
      </div>
    </div>
  );
}
