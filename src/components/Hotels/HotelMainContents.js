/** @format */

import classes from "./HotelMainContents.module.css";
import React, { useRef, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { withRouter } from "react-router-dom";
import { TweenMax, Power3 } from "gsap";
import Button from "../UI/Button/Button";

function HotelMainContents(props) {
  let headerAnimation = useRef(null);
  let summaryAnimation = useRef(null);
  let summaryHeader = useRef(null);
  let buttonAnimation = useRef(null);

  useEffect(() => {
    TweenMax.staggerFrom(
      [
        headerAnimation.current,
        summaryAnimation.current,
        summaryHeader.current,
        buttonAnimation.current,
      ],
      0.8,
      { opacity: 0, y: 20, ease: Power3.easeOut },
      0.2
    );
  }, []);

  const RoomsType = (id) => {
    props.history.push({ pathname: "/hotel-details/" + id + "/hotel-rooms" });
  };

  return (
    <div>
      <div className={classes.MainHotelProfile}>
        <img src={props.profileImage} alt="profile" />
      </div>
      <div className={classes.HotelDetailsContainer}>
        <div
          ref={(element) => (headerAnimation.current = element)}
          className={classes.mainTitleContainer}
        >
          <div className={classes.HotelTitle}>
            <div>{props.hotelName}</div>
            <div>{props.hotelAddress}</div>
          </div>
          <div className={classes.HotelPrice}>
            <div>
              <CurrencyFormat
                value={props.averagePrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"RWF "}
              />
            </div>
            <div>average per Night</div>
          </div>
        </div>
        <div className={classes.SummaryContent}>
          <p ref={(element) => (summaryHeader.current = element)}>Summary</p>
          <p ref={(element) => (summaryAnimation.current = element)}>
            {props.hotelDescription}
          </p>
        </div>
        <div style={{ textAlign: "center", width: "80%", margin: "0 auto" }}>
          <Button
            btnType="Success"
            clicked={() => RoomsType(props.roomButtonId)}
          >
            VIEW ROOM TYPES
          </Button>
        </div>
      </div>
    </div>
  );
}
export default withRouter(HotelMainContents);
