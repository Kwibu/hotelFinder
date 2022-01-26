import React from "react";
import "./HotelPayment.css";
import CurrencyFormat from "react-currency-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function HotelPayment(props) {
  return (
    <div className="HotelRoom-order">
      <div className="HotelRoom-avatar">
        {/* <img src={props.image} alt={props.name} style={{ width: "40px" }} /> */}
      </div>
      <div>
        <div className="HotelRoom-name-payer">{props.name}</div>
        <div className="HotelRoom-name-payer-subtitle">{props.email}</div>
      </div>
      <div className="HotelRoom-name-payer-payement">
        <CurrencyFormat
          value={props.payment}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"RWF "}
        />
      </div>
    </div>
  );
}
