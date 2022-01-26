/** @format */

import React from "react";
import successfulPic from "../../assets/Illustrations/Group 46.png";
import "./success.css";
import Button from "../UI/Button/Button";
import { withRouter } from "react-router-dom";
function SuccessFullBooking(props) {
  console.log(props);
  const backToHome = () => {
    props.history.replace("/");
  };
  return (
    <div>
      <div className="successfulPage">
        <div>
          <img src={successfulPic} alt="" />
        </div>
        <div className="Success-tile">SuccessFull done</div>
        <div>
          <Button btnType="Success" clicked={backToHome}>
            Back home
          </Button>
        </div>
      </div>
    </div>
  );
}
export default withRouter(SuccessFullBooking);
