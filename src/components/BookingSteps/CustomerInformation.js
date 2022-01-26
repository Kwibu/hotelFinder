/** @format */

import React, { useState } from "react";
import SectionBookingTitle from "./SectionBookingTitle";
import InformationSVG from "../../assets/Illustrations/IXfCau6BaY (1)@2x.png";
import "./CustomerInformation.css";
import "react-phone-number-input/style.css";
import UserInput from "../User-input/user-input-validations";
import Button from "../UI/Button/Button";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const isNotEmpty = (value) => value.trim() !== "";
const isEmailValid = (value) => value.includes("@") || value.trim() !== "";

export default function CustomerInformation(props) {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const PhoneNumberInputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const {
    value: enteredFullNameValue,
    isValid: isFullNameValid,
    hasError: hasFullNameError,
    valueChangeHandler: fullnameChangeHandler,
    inputBlurHandler: fullNameInputBlurHandler,
  } = UserInput(isNotEmpty);
  const {
    value: enteredEmailValue,
    isValid: isemailValid,
    hasError: hasemailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
  } = UserInput(isEmailValid);

  const {
    value: enteredTownValue,
    isValid: isTownValid,
    hasError: hasTownError,
    valueChangeHandler: TownChangeHandler,
    inputBlurHandler: TownInputBlurHandler,
  } = UserInput(isNotEmpty);
  const {
    value: enteredCountryValue,
    isValid: isCountryValid,
    hasError: hasCountryError,
    valueChangeHandler: CountryChangeHandler,
    inputBlurHandler: CountryInputBlurHandler,
  } = UserInput(isNotEmpty);

  const {
    value: enteredAddressValue,
    isValid: isAddressValid,
    hasError: hasAddressError,
    valueChangeHandler: AddressChangeHandler,
    inputBlurHandler: AddressInputBlurHandler,
  } = UserInput(isNotEmpty);

  const enteringFullNameClasses = hasFullNameError
    ? "form-control invalid"
    : "form-control";
  const enteringEmailClasses = hasemailError
    ? "form-control invalid"
    : "form-control";
  // const enteringPhoneNUmberClasses = hasPhoneNumberError
  //   ? "form-control invalid"
  //   : "form-control";
  const enteringAddressesClasses = hasAddressError
    ? "form-control invalid"
    : "form-control";
  const enteringTownClasses = hasTownError
    ? "form-control invalid"
    : "form-control";
  const enteringCountryClasses = hasCountryError
    ? "form-control invalid"
    : "form-control";

  let formIsValid = false;
  if (
    isFullNameValid &&
    isemailValid &&
    isValidPhoneNumber &&
    isCountryValid &&
    isAddressValid &&
    isTownValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const customerInformations = {
      enteredFullNameValue,
      enteredEmailValue,
      enteredPhoneNumberValue: value,
      enteredAddressValue,
      enteredCountryValue,
      enteredTownValue,
    };
    props.customerInfo(customerInformations);
    props.nextStep();
  };

  return (
    <div>
      <SectionBookingTitle numbering="2" title="Your Informations" />

      <form onSubmit={submitHandler} className="booking-form">
        <div className="control-group">
          <div className="CustomerInfoImage">
            <img src={InformationSVG} alt="informationsPic" />
          </div>
          <div className={enteringFullNameClasses}>
            <label htmlFor="Full Name">Your Full Name</label>
            <input
              type="text"
              value={enteredFullNameValue}
              onChange={fullnameChangeHandler}
              onBlur={fullNameInputBlurHandler}
            />
            {hasFullNameError && (
              <p className="error-form">Please Insert valid names</p>
            )}
          </div>
          <div className={enteringEmailClasses}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              value={enteredEmailValue}
              onChange={emailChangeHandler}
              onBlur={emailInputBlurHandler}
            />
            {hasemailError && (
              <p className="error-form">Please Insert valid email</p>
            )}
          </div>
          <div className="form-control">
            <label htmlFor="phone-number">Phone Number</label>
            <PhoneInput
              international
              defaultCountry="RW"
              value={value}
              onChange={setValue}
              onBlur={PhoneNumberInputBlurHandler}
            />

            {isTouched && value.trim() === "" && (
              <p className="error-form">Please Insert valid phone numbers</p>
            )}
          </div>
          <div className={enteringAddressesClasses}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              value={enteredAddressValue}
              onChange={AddressChangeHandler}
              onBlur={AddressInputBlurHandler}
            />
            {hasAddressError && (
              <p className="error-form">Please Insert valid addresses</p>
            )}
          </div>
          <div className={enteringTownClasses}>
            <label htmlFor="town">Town</label>
            <input
              type="text"
              value={enteredTownValue}
              onChange={TownChangeHandler}
              onBlur={TownInputBlurHandler}
            />
            {hasTownError && (
              <p className="error-form">Please Insert valid town</p>
            )}
          </div>
          <div className={enteringCountryClasses}>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              value={enteredCountryValue}
              onChange={CountryChangeHandler}
              onBlur={CountryInputBlurHandler}
            />
            {hasCountryError && (
              <p className="error-form">Please Insert valid country</p>
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
            clicked={submitHandler}
          >
            Checkout
          </Button>
        </div>
      </form>
    </div>
  );
}
