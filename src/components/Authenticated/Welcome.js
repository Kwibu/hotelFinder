/** @format */

import React from "react";
import landing from "../../assets/Illustrations/8xpaLvblzE@2x.png";
import "./Authenticated.css";
import Button from "../UI/Button/Button";
import { withRouter } from "react-router-dom";

function Welcome(props) {
  const loginHandler = (event) => {
    event.preventDefault();
    props.history.push("/login");
  };
  const signUpHandler = (event) => {
    event.preventDefault();
    props.history.push("/sign-up");
  };

  return (
    <div className="landingPageContainer">
      <div className="landingImage">
        <img src={landing} alt="login-pic" />
      </div>
      <div className="LandingHeader">Authenticate your self</div>
      <div className="LandingHeaderSubtitle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
        nostrum ut in, dicta voluptatibus veritatis explicabo nemo
      </div>
      <div className="ButtonContainerGrid">
        <Button btnType="Success" clicked={loginHandler}>
          Login
        </Button>
        <Button btnType="Success" clicked={signUpHandler}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
export default withRouter(Welcome);
