/** @format */

import React from "react";
import Button from "../../../UI/Button/Button";
import UserInput from "../../../User-input/user-input-validations";
import "../../../BookingSteps/CustomerInformation.css";
import hotelInformationSVG from "../../../../assets/Illustrations/Group 71.png";
import "./HotelInformation.css";

const isNotEmpty = (value) => value.trim() !== "";
const isHotelAddressValidValue = (value) =>
  value.includes("@") || value.trim() !== "";

export default function HotelInformation(props) {
  const previousStep = (event) => {
    event.preventDefault();
    props.prevStep();
  };

  const {
    value: enteredHotelNameValue,
    isValid: isHotelNameValid,
    hasError: hasHotelNameError,
    valueChangeHandler: hotelNameChangeHandler,
    inputBlurHandler: hotelNameInputBlurHandler,
  } = UserInput(isNotEmpty);
  const {
    value: enteredHotelAddressValue,
    isValid: isHotelAddressValid,
    hasError: hasHotelAddressError,
    valueChangeHandler: hotelAddressChangeHandler,
    inputBlurHandler: hotelAddressInputBlurHandler,
  } = UserInput(isHotelAddressValidValue);
  const {
    value: enteredAveragePriceValue,
    isValid: isAveragePriceValid,
    hasError: hasAveragePriceError,
    valueChangeHandler: averagePriceChangeHandler,
    inputBlurHandler: averagePriceInputBlurHandler,
  } = UserInput(isNotEmpty);

  const enteringHotelNameClasses = hasHotelNameError
    ? "form-control invalid"
    : "form-control";
  const enteringHotelAddressClasses = hasHotelAddressError
    ? "form-control invalid"
    : "form-control";
  const enteringAveragePriceClasses = hasAveragePriceError
    ? "form-control invalid"
    : "form-control";

  let formIsValid = false;
  if (isHotelNameValid && isHotelAddressValid && isAveragePriceValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const customerInformationsobj = {
      enteredHotelNameValue,
      enteredHotelAddressValue,
      enteredAveragePriceValue,
    };
    props.customerInformations(customerInformationsobj);
    props.nextStep();
  };

  return (
    <div className="hotel-information__container">
      <form onSubmit={submitHandler}>
        <div className="control-group">
          <div className="hotel-Info-Image">
            <img src={hotelInformationSVG} alt="informationsPic" />
          </div>
          <div className={enteringHotelNameClasses}>
            <label htmlFor="Hotel Name">Hotel Name</label>
            <input
              type="text"
              value={enteredHotelNameValue}
              onChange={hotelNameChangeHandler}
              onBlur={hotelNameInputBlurHandler}
            />
            {hasHotelNameError && (
              <p className="error-form">Please Insert valid names</p>
            )}
          </div>
          <div className={enteringHotelAddressClasses}>
            <label htmlFor="HotelAddress">Hotel Address</label>
            <input
              type="text"
              value={enteredHotelAddressValue}
              onChange={hotelAddressChangeHandler}
              onBlur={hotelAddressInputBlurHandler}
            />
            {hasHotelAddressError && (
              <p className="error-form">Please Insert valid Address</p>
            )}
          </div>
          <div className={enteringAveragePriceClasses}>
            <label htmlFor="number">Average Price</label>
            <input
              type="number"
              value={enteredAveragePriceValue}
              onChange={averagePriceChangeHandler}
              onBlur={averagePriceInputBlurHandler}
            />
            {hasAveragePriceError && (
              <p className="error-form">Please Insert valid Price</p>
            )}
          </div>
        </div>
        <div className="ButtonContainer">
          {/* <Button btnType="Success" clicked={previousStep}>
            Back
          </Button> */}
          <Button
            btnType="Success"
            disabled={!formIsValid}
            clicked={submitHandler}>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
