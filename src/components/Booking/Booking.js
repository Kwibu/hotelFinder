/** @format */

import React, { useState, useEffect, useCallback } from "react";
import classes from "./Booking.module.css";
import PickDate from "../BookingSteps/PickDate";
import CustomerInformation from "../BookingSteps/CustomerInformation";
import CustomerPayment from "../BookingSteps/CustomerPayment";
import SuccessFullBooking from "../BookingSteps/SuccessFullBooking";
import { withRouter } from "react-router-dom";
import axios from "../../firebaseInstance";
import CurrencyFormat from "react-currency-format";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51IzTnSDRYQok9NIfaDcp3gdGSx43hH6urrnlNTo1P8Hv4TiW4OxWuE5kQ6UhYXw0X40JbKwsKKojcHdovDXTcuXH00dcYoEVaz"
);
const Booking = (props) => {
  const [step, setStep] = useState(1);
  const [choosenRoom, setChoosenRoom] = useState([]);
  const [arrivingObject, setArrivingObject] = useState({});
  const [customerInformation, setCustomerInformation] = useState({});

  let fullInfo = { ...arrivingObject, ...customerInformation };

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const roomTypePrice = useCallback(async () => {
    const response = await axios.get("/HotelRooms.json");
    const datas = await response.data;
    let rooms = [];
    for (let i in datas) {
      rooms.push(datas[i]);
    }
    setChoosenRoom(rooms);
  }, []);

  useEffect(() => {
    roomTypePrice();
  }, [roomTypePrice]);

  const choosenRoomToPass = [];

  choosenRoom.filter((choosenRoom) => {
    if (
      choosenRoom.hotelRoomId === props.match.params.roomId ||
      choosenRoom.hotelRoomId === +props.match.params.roomId ||
      choosenRoom.hotelRoomId === props.match.params.roomId
    ) {
      choosenRoomToPass.push(choosenRoom);
    }
  });

  console.log(choosenRoomToPass);

  const choosenRoomArray = choosenRoom
    .filter((choosenRoom) => {
      if (
        choosenRoom.hotelRoomId === props.match.params.roomId ||
        choosenRoom.hotelRoomId === +props.match.params.roomId ||
        choosenRoom.hotelRoomId === props.match.params.roomId
      ) {
        return choosenRoom;
      }
    })
    .map((choosenRooms, i) => {
      // setchoosenRoomPrice(choosenRooms.room_price);
      return (
        <div key={i}>
          <div className={classes.bookingSubtitle}>
            {choosenRooms.room_type} at
            <span>
              {
                <CurrencyFormat
                  value={choosenRooms.room_price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" RWF "}
                />
              }
            </span>
          </div>
        </div>
      );
    });

  // console.log(choosenRoomArray);

  let roomPrice = null;
  choosenRoom.forEach((price) => {
    roomPrice = price.room_price;
  });

  const switchComponent = () => {
    switch (step) {
      case 1:
        return (
          <PickDate
            arriving={setArrivingObject}
            nextStep={nextStep}
            prevStep={previousStep}
          />
        );
      case 2:
        return (
          <CustomerInformation
            customerInfo={setCustomerInformation}
            nextStep={nextStep}
            prevStep={previousStep}
          />
        );
      case 3:
        return (
          <Elements stripe={promise}>
            <CustomerPayment
              {...props}
              choosenRoomPriceData={roomPrice}
              roomObject={choosenRoomToPass}
              customerInformation={fullInfo}
              nextStep={nextStep}
              prevStep={previousStep}
            />
          </Elements>
        );
      case 4:
        return <SuccessFullBooking />;
    }
  };

  return (
    <div className={classes.BookingContainer}>
      <div className={classes.HeaderBooking}>
        <div className={classes.BookingHeader}>Booking </div>
        {choosenRoomArray}
      </div>
      {switchComponent()}
    </div>
  );
};
export default withRouter(Booking);
