/** @format */

import React, { useState } from "react";
import contactUsSVG from "../../assets/Illustrations/Group 99.png";
import Button from "../UI/Button/Button";
import UserInput from "../User-input/user-input-validations";
import { useHistory, withRouter } from "react-router-dom";
// import axios from "../../firebaseInstance";

const isNotEmpty = (value) => value.trim() !== "" && value.length > 10;
const isEmailValidated = (value) => value.includes("@") || value.trim() !== "";

function ContactUs() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const {
    value: enteredEmailValue,
    isValid: isEmailValid,
    hasError: hasEmailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
  } = UserInput(isEmailValidated);
  const {
    value: enteredMessageValue,
    isValid: isMessageValid,
    hasError: hasMessageError,
    valueChangeHandler: MessageChangeHandler,
    inputBlurHandler: MessageInputBlurHandler,
  } = UserInput(isNotEmpty);

  let formIsValid = false;
  if (isEmailValid && isMessageValid) {
    formIsValid = true;
  }
  const enteringEmailClasses = hasEmailError
    ? "form-control invalid"
    : "form-control";
  const enteringMessageClasses = hasMessageError
    ? "form-control invalid"
    : "form-control";

  const submitHandler = (event) => {
    setIsLoading(true);
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const customerInformations = {
      createdDate: new Date().toISOString(),
      enteredEmailValue,
      enteredMessageValue,
    };

    fetch(
      "http://localhost:5001/hotel-finder-34fbd/us-central1/api/contact-us",
      {
        method: "POST",
        body: JSON.stringify(customerInformations),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        alert(data.message);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="LoginContainer">
      <div className="LoginHeader">Contact Us</div>
      <form action="" onSubmit={submitHandler}>
        <div className="control-group">
          <div className="CustomerInfoImage">
            <img src={contactUsSVG} alt="informationsPic" />
          </div>
          <p style={{ textAlign: "justify", padding: ".6rem 0" }}>
            If there are problem when you not understand how the app really work
            you can send to us message
          </p>
          <div className={enteringEmailClasses}>
            <label htmlFor="Full Name">Email</label>
            <input
              type="text"
              value={enteredEmailValue}
              onChange={emailChangeHandler}
              onBlur={emailInputBlurHandler}
            />
            {hasEmailError && (
              <p className="error-form">Please Insert valid email</p>
            )}
          </div>
          <div className={enteringMessageClasses}>
            <label htmlFor="textarea">Message</label>
            <textarea
              //   type="textarea"
              value={enteredMessageValue}
              onChange={MessageChangeHandler}
              onBlur={MessageInputBlurHandler}
            />
            {hasMessageError && (
              <p className="error-form">Please insert valid message</p>
            )}
          </div>
          <div className="ButtonContainer">
            <Button disabled={!formIsValid} btnType="Success">
              {isLoading ? "Loading..." : " Send Message"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default withRouter(ContactUs);
