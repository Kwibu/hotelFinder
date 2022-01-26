import React from "react";
import "./HotelModify.css";
import CurrencyFormat from "react-currency-format";

export default function HotelRoomModify(props) {
  return (
    <div className="HotelRoom-order">
      <div className="HotelRoom-avatar">
        <img src={props.image} alt={props.roomName} style={{ width: "40px" }} />
      </div>
      <div>
        <div className="HotelRoom-name-payer">{props.roomName}</div>
        <div className="HotelRoom-name-payer-subtitle">
          <CurrencyFormat
            value={props.price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"RWF "}
          />
        </div>
      </div>
      <div className="HotelRoom-name-payer-payement">
        <button className="delete-image-button" onClick={props.clicked}>
          {props.option}
        </button>
      </div>
    </div>
  );
}
