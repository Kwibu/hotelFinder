/** @format */

import classes from "./Hotel.module.css";
import React, { useRef, useEffect } from "react";
import { TweenMax, Power3 } from "gsap";
import CurrencyFormat from "react-currency-format";

export default function Hotel(props) {
  let cardAnimation = useRef(null);
  useEffect(() => {
    TweenMax.staggerFrom(
      [cardAnimation],
      0.8,
      { opacity: 0, y: 20, ease: Power3.easeInOut },
      0.2
    );
  }, []);

  return (
    <li
      onClick={props.clicked}
      className={classes.HotelContainer}
      ref={(cardEl) => {
        cardAnimation = cardEl;
      }}
    >
      <div className={classes.HotelImage}>
        <img src={props.profileImage} alt={props.image} />
      </div>
      <div className={classes.HotelDescription}>
        <div>{props.hotelName}</div>
        <div>
          <CurrencyFormat
            value={props.averagePrice}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"RWF "}
          />
          /Night
        </div>
        <div>
          {navigator.onLine ? props.hotelDescription.slice(0, 102) : "Wait"}
        </div>
      </div>
    </li>
  );
}
