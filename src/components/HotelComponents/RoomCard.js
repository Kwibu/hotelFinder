/** @format */

import React from "react";
import "./RoomCard.css";
import { withRouter } from "react-router-dom";
import Button from "../UI/Button/Button";
import CurrencyFormat from "react-currency-format";

const RoomCard = (props) => {
  return (
    <div className="room-card-container">
      <div className="room-card-image">
        <img src={props.images} alt="" />
      </div>
      <div className="room-type-information">
        <div className="room-type-title">
          <div>{props.roomType}</div>
          <div>
            <CurrencyFormat
              value={props.roomPrice}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"RWF "}
            />{" "}
            / Night
          </div>
          <div>
            Sleep {props.adultNumber} adults and {props.childNumber} children
          </div>
        </div>
        <div className="room-type-right-info">
          <Button btnType="Success" clicked={props.hotelRoomId}>
            Book Now
          </Button>
          <p> More review</p>
        </div>
      </div>
    </div>
  );
};
export default withRouter(RoomCard);
