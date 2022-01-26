/** @format */

import React, { useState } from "react";
import loginSvg from "../../assets/Illustrations/Group 43.png";
import Button from "../UI/Button/Button";
import UserInput from "../User-input/user-input-validations";
import { Link, useHistory, withRouter } from "react-router-dom";
import { auth } from "../../firebase";

const isNotEmpty = (value) => value.trim() !== "" && value.length > 5;
const isEmailValidated = (value) => value.includes("@") || value.trim() !== "";

function Login(props) {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

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
  } = UserInput(isNotEmpty);

  let formIsValid = false;
  if (isEmailValid && ispasswordValid) {
    formIsValid = true;
  }
  const enteringEmailClasses = hasEmailError
    ? "form-control invalid"
    : "form-control";
  const enteringPasswordClasses = haspasswordError
    ? "form-control invalid"
    : "form-control";

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    if (formIsValid) {
      setIsloading(true);
      auth
        .signInWithEmailAndPassword(enteredEmailValue, enteredPasswordValue)
        .then((response) => {
          setIsloading(false);
        })
        .then(() => {
          history.push("/dashboard");
        })
        .catch((error) => {
          setError(error.message);
          setIsloading(false);
        });
    }
  };
  return (
    <div className="LoginContainer">
      <div className="LoginHeader">Login</div>

      <form action="" onSubmit={submitHandler}>
        <div className="control-group">
          <div className="CustomerInfoImage">
            <img src={loginSvg} alt="informationsPic" />
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
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </div>
          <p className="error-form">{error}</p>
          <p className="signUpNav">
            Already have an account ? <Link to="/sign-up"> Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
export default withRouter(Login);
