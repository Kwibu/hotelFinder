import React from "react";
import "./HotelModify.css";

export default function HotelServiceModify(props) {
  return (
    <div className="service-deletion-container">
      <div className="service-name-deletion">{props.name}</div>
      <button className="delete-image-button" onClick={props.clicked}>
        {props.buttonName}
      </button>
    </div>
  );
}
