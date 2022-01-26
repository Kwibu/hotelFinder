/** @format */

import React, { useState, useCallback, useEffect } from "react";
import imgeSVG from "../../../../assets/Illustrations/Group 72.png";
import UserInput from "../../../User-input/user-input-validations";
import "../../../BookingSteps/CustomerInformation.css";
import Button from ".././../../UI/Button/Button";
import "./ServiceEntry.css";
import axios from "../../../../firebaseInstance";
import { useHistory, withRouter } from "react-router-dom";
import SideMenuBar from "../SideMenuBar/SideMenuBar";

const isNotEmpty = (value) => value.trim() !== "";

function ServiceEntry({ user }) {
  const [hotelData, sethotelData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const selectedHotelHandler = useCallback(() => {
    axios.get("Hotels.json").then((response) => {
      let hotelResponses = [];
      for (let i in response.data) {
        hotelResponses.push(response.data[i]);
      }
      let filteredHotel;
      hotelResponses.filter((hotelObj) => {
        if (user.uid === hotelObj.userId) {
          filteredHotel = {
            hotelName: hotelObj.hotelName,
            profileImage: hotelObj.profileImage,
            hotelId: hotelObj.check_id,
          };
        }
      });
      sethotelData(filteredHotel);
    });
  }, []);

  useEffect(() => {
    selectedHotelHandler();
  }, [selectedHotelHandler]);
  const {
    value: enteredHotelServiceValue,
    isValid: isHotelServiceValid,
    hasError: hasHotelServiceError,
    valueChangeHandler: hotelServiceChangeHandler,
    inputBlurHandler: hotelServiceInputBlurHandler,
  } = UserInput(isNotEmpty);

  const enteringHotelServiceClasses = hasHotelServiceError
    ? "form-control invalid"
    : "form-control";

  let formIsValid = false;
  if (isHotelServiceValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    setIsLoading(true);
    console.log(enteredHotelServiceValue);
    axios
      .post("/Services.json", {
        serviceName: enteredHotelServiceValue,
        hotelId: hotelData.hotelId,
      })
      .then(() => {
        setIsLoading(false);
        history.push("/dashboard/hotel");
      });
  };

  return (
    <div className="dashboard-container">
      <div className="navigations-header">
        <div>
          <div className="dashboard-name">Dashboard</div>
          <div>
            <SideMenuBar />
          </div>
        </div>
      </div>
      <div className="service-offers">
        <div className="service-offers-title">Create Service(s)</div>
        <div className="service-offers-image-svg">
          <img src={imgeSVG} alt="svg-image" />
        </div>
        <div className="service-offers-subtitle">
          Service are the one sections of hotel you offer inorder to get alot of
          clients that want to sleep in your hotel
        </div>
        <div>
          <form onSubmit={submitHandler}>
            <div className="control-group">
              <div className={enteringHotelServiceClasses}>
                <label htmlFor="Hotel Name">Service Name</label>
                <input
                  type="text"
                  value={enteredHotelServiceValue}
                  onChange={hotelServiceChangeHandler}
                  onBlur={hotelServiceInputBlurHandler}
                />
                {hasHotelServiceError && (
                  <p className="error-form">Please Insert valid Service</p>
                )}
              </div>
            </div>
            <div className="ButtonContainer">
              <Button
                btnType="Success"
                disabled={!formIsValid}
                clicked={submitHandler}
              >
                {isLoading && <p>Loading...</p>}
                {!isLoading && <p>Save</p>}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default withRouter(ServiceEntry);
