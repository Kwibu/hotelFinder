import React from "react";
import "./Reservations.css";
import CurrencyFormat from "react-currency-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

export default function Reservation(props) {
  const approvedColor = props.approved === true ? "#1ED760" : "#DF7400";
  return (
    <div className="reservation-order">
      <div className="reservation-avatar">
        <FontAwesomeIcon icon={faUserCircle} />
      </div>
      <div>
        <div className="reservation-name-payer">{props.name}</div>
        <div className="reservation-name-payer-subtitle">
          {props.hotel}{" "}
          <span
            style={{
              width: "40px",
              padding: ".3rem",
              backgroundColor: approvedColor,
              fontSize: "10px",
              color: "white",
            }}
          >
            {props.approved === true ? "Approved" : "Not_Approved"}
          </span>
        </div>
      </div>
      <div className="reservation-name-payer-payement">
        <CurrencyFormat
          value={props.paymentValue}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"RWF "}
        />{" "}
      </div>
      <div className="HotelRoom-name-payer-payement">
        <button className="delete-image-button" onClick={props.clicked}>
          Actions
        </button>
      </div>
    </div>
  );
}
