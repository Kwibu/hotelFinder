/** @format */

import React, { useState } from "react";
import SIgnUpSvg from "../../assets/Illustrations/Group 45.png";
import Button from "../UI/Button/Button";
import UserInput from "../User-input/user-input-validations";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../../firebase";
import axios from "../../firebaseInstance";

const isNotEmpty = (value) => value.trim() !== "" && value.length >= 10;
const isEmailValidated = (value) => value.includes("@");
const isPasswordValidated = (value) => value.length > 5;

function SignUp(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    value: enteredFullNameValue,
    isValid: isFullNameValid,
    hasError: hasFullNameError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameInputBlurHandler,
  } = UserInput(isNotEmpty);
  const {
    value: enteredEmailValue,
    isValid: isEmailValid,
    hasError: hasEmailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
  } = UserInput(isEmailValidated);
  const {
    value: enteredPasswordValue,
    isValid: ispasswordValid,
    hasError: haspasswordError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
  } = UserInput(isPasswordValidated);

  let formIsValid = false;
  if (isEmailValid && ispasswordValid && isFullNameValid) {
    formIsValid = true;
  }
  const enteringEmailClasses = hasEmailError
    ? "form-control invalid"
    : "form-control";
  const enteringPasswordClasses = haspasswordError
    ? "form-control invalid"
    : "form-control";
  const enteringFullNameClasses = hasFullNameError
    ? "form-control invalid"
    : "form-control";

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    if ((formIsValid = true)) {
      setIsLoading(true);
      let customerInformations;
      auth
        .createUserWithEmailAndPassword(enteredEmailValue, enteredPasswordValue)
        .then((response) => {
          customerInformations = {
            id: response.user.uid,
            createdTime: response.user.metadata.creationTime,
            email: response.user.email,
            fullName: enteredFullNameValue,
            userCategory: "Manager",
          };
        })
        .then(() => {
          axios
            .post("/users.json", customerInformations)
            .then(() => {
              setIsLoading(false);
              props.history.replace("/dashboard");
              setError("");
            })
            .catch((error) => {
              setError(error.message);
            });
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }
  };
  return (
    <div className="LoginContainer">
      <div className="LoginHeader">Sign Up</div>

      <form action="" onSubmit={submitHandler}>
        <div className="control-group">
          <div className="CustomerInfoImage">
            <img src={SIgnUpSvg} alt="informationsPic" />
          </div>
          <div className={enteringFullNameClasses}>
            <label htmlFor="text">Full Name</label>
            <input
              type="text"
              value={enteredFullNameValue}
              onChange={fullNameChangeHandler}
              onBlur={fullNameInputBlurHandler}
            />
            {hasFullNameError && (
              <p className="error-form">Please Insert your names</p>
            )}
          </div>
          <div className={enteringEmailClasses}>
            <label htmlFor="Full Name">Email</label>
            <input
              type="text"
              value={enteredEmailValue}
              onChange={emailChangeHandler}
              onBlur={emailInputBlurHandler}
            />
            {hasEmailError && (
              <p className="error-form">Please Insert valid names</p>
            )}
          </div>
          <div className={enteringPasswordClasses}>
            <label htmlFor="email">Password</label>
            <input
              type="password"
              value={enteredPasswordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordInputBlurHandler}
            />
            {haspasswordError && (
              <p className="error-form">Please Insert valid email</p>
            )}
          </div>

          <div className="ButtonContainer">
            <Button disabled={!formIsValid} btnType="Success">
              {isLoading ? "Loading..." : "SignUp"}
            </Button>
          </div>
          <p className="error-form">{error}</p>
          <p className="signUpNav">
            Already have an account ? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
export default withRouter(SignUp);
