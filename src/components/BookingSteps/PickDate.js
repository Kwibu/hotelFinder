/** @format */

import React, { useState } from "react";
import SectionBookingTitle from "./SectionBookingTitle";
import "react-calendar/dist/Calendar.css";
import "./PickDate.css";
import "./input.css";
import Button from "../UI/Button/Button";
import userInput from "../User-input/user-input-validations";
const isNotEmpty = (value) => value.trim() !== "";
const PickDate = (props) => {
  const {
    value: enteringDateValue,
    isValid: enteringDateIsValid,
    hasError: enteringDateHasError,
    valueChangeHandler: enteringDateChangeHandler,
    inputBlurHandler: enteringDateBlurHandler,
  } = userInput(isNotEmpty);
  const {
    value: leavingDateValue,
    isValid: leavingDateIsValid,
    hasError: leavingDateHasError,
    valueChangeHandler: leavingDateChangeHandler,
    inputBlurHandler: leavingDateBlurHandler,
  } = userInput(isNotEmpty);
  const {
    value: roomNeededValue,
    isValid: roomNeededIsValid,
    hasError: roomNeededHasError,
    valueChangeHandler: roomNeededChangeHandler,
    inputBlurHandler: roomNeededBlurHandler,
  } = userInput(isNotEmpty);
  const {
    value: NumberOfAdultValue,
    isValid: NumberOfAdultIsValid,
    hasError: numberofAdultHasError,
    valueChangeHandler: NumberOfAdultChangeHandler,
    inputBlurHandler: NumberOfAdultBlurHandler,
  } = userInput(isNotEmpty);
  const {
    value: NumberOfChildrenValue,
    isValid: NumberOfChildrenIsValid,
    hasError: numberOfChildrenHasError,
    valueChangeHandler: NumberOfChildrenChangeHandler,
    inputBlurHandler: NumberOfChildrenBlurHandler,
  } = userInput(isNotEmpty);

  const enteringDateClasses = enteringDateHasError
    ? "form-control invalid"
    : "form-control";
  const leavingDateClasses = leavingDateHasError
    ? "form-control invalid"
    : "form-control";
  const roomNeededClasses = roomNeededHasError
    ? "form-control invalid"
    : "form-control";
  const numberofAdultClasses = numberofAdultHasError
    ? "form-control invalid"
    : "form-control";

  let formIsValid = false;
  if (
    enteringDateIsValid &&
    leavingDateIsValid &&
    roomNeededIsValid &&
    NumberOfAdultIsValid &&
    NumberOfChildrenIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log("submitted");
    console.log(
      enteringDateValue,
      leavingDateValue,
      NumberOfAdultValue,
      NumberOfChildrenValue,
      roomNeededValue
    );

    let date1 = new Date(enteringDateValue);
    let date2 = new Date(leavingDateValue);
    const daysBetweenInMiliSecond = date2.getTime() - date1.getTime();
    let daysBetween = Math.ceil(
      daysBetweenInMiliSecond / (1000 * 60 * 60 * 24)
    );
    const arrivingObject = {
      enteringDateValue: enteringDateValue,
      leavingDateValue: leavingDateValue,
      NumberOfAdultValue: NumberOfAdultValue,
      NumberOfChildrenValue: NumberOfChildrenValue,
      roomNeededValue: roomNeededValue,
      daysBetween: daysBetween,
    };
    props.nextStep();
    props.arriving(arrivingObject);
  };

  return (
    <div>
      <SectionBookingTitle numbering="1" title="Pick date" />
      <div className="booking-container">
        <form className="booking-form">
          <div className="control-group">
            <div className={enteringDateClasses}>
              <label htmlFor="Full Name">Entering Date</label>
              <input
                type="date"
                value={enteringDateValue}
                onChange={enteringDateChangeHandler}
                onBlur={enteringDateBlurHandler}
              />

              {enteringDateHasError && (
                <p className="error-form">Please Pick a date!</p>
              )}
            </div>
            <div className={leavingDateClasses}>
              <label htmlFor="date">Leaving Date</label>
              <input
                type="date"
                value={leavingDateValue}
                onChange={leavingDateChangeHandler}
                onBlur={leavingDateBlurHandler}
              />
              {leavingDateHasError && (
                <p className="error-form">Please Pick a date!</p>
              )}
            </div>
            <div className={roomNeededClasses}>
              <label htmlFor="Full Name">Rooms Needed</label>
              <input
                type="number"
                value={roomNeededValue}
                onChange={roomNeededChangeHandler}
                onBlur={roomNeededBlurHandler}
              />
              {roomNeededHasError && (
                <p className="error-form">
                  Please Enter Number of room(s) you want only!
                </p>
              )}
            </div>
            <div className={numberofAdultClasses}>
              <label htmlFor="Full Name">Number Of Customer</label>
              <div>
                <input
                  type="Number"
                  placeholder="Number of Adult"
                  value={NumberOfAdultValue}
                  onChange={NumberOfAdultChangeHandler}
                  onBlur={NumberOfAdultBlurHandler}
                />
                {numberofAdultHasError && (
                  <p className="error-form">PleaseEnter number of adult!</p>
                )}
                <input
                  type="Number"
                  placeholder="Number of Children"
                  value={NumberOfChildrenValue}
                  onChange={NumberOfChildrenChangeHandler}
                  onBlur={NumberOfChildrenBlurHandler}
                />
                {numberOfChildrenHasError && (
                  <p className="error-form">Please Enter number of children</p>
                )}
              </div>
            </div>
          </div>

          <div className="ButtonContainer">
            <Button
              btnType="Success"
              disabled={!formIsValid}
              clicked={submitHandler}
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PickDate;
