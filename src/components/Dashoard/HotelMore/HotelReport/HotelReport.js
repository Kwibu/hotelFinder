import React from "react";
import "./HotelReport.css";
import CurrencyFormat from "react-currency-format";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function HotelReport(props) {
  return (
    <div className="HotelReport-order">
      <div className="report-time-in-between">{props.days}</div>
      <p className="report-money">
        {props.totalNumber ? (
          props.totalNumber + " Customer(s)"
        ) : (
          <CurrencyFormat
            value={props.totalPayement}
            displayType={"text"}
            thousandSeparator={true}
            prefix={" RWF "}
          />
        )}
      </p>
    </div>
  );
}
