/** @format */

import React, { useState } from "react";
import UserInput from "../../../User-input/user-input-validations";
import Button from "../../../UI/Button/Button";
import { projectStorage } from "../../../../firebase";
import "./UploadImages.css";
import { useHistory } from "react-router-dom";
import axios from "../../../../firebaseInstance";

const isHotelDescriptionValidValue = (value) => value.trim() !== "";
const types = ["image/png", "image/jpeg"];

export default function HotelUpload({ customerInfo, user }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [imageErrors, setImageErrors] = useState("");
  const [urlfile, setUrlFile] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const {
    value: enteredHotelDescriptionValue,
    isValid: isHotelDescriptionValid,
    hasError: hasHotelDescriptionError,
    valueChangeHandler: hotelDescriptionChangeHandler,
    inputBlurHandler: hotelDescriptionInputBlurHandler,
  } = UserInput(isHotelDescriptionValidValue);

  const enteringHotelDescriptionClasses = hasHotelDescriptionError
    ? "form-control invalid"
    : "form-control";

  let formIsValid = false;
  if (isHotelDescriptionValid && latitude && longitude && urlfile) {
    formIsValid = true;
  }

  // Uploading File
  const uploadHook = (file) => {
    const storeageRef = projectStorage.ref(file.name);
    storeageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
        console.log(percentage);
      },
      (error) => {
        setError(error);
        console.log(error);
      },
      async () => {
        const url = await storeageRef.getDownloadURL();
        setUrlFile(url);
        console.log(url);
      }
    );
  };

  const handleImageSelection = (event) => {
    let selectImage = event.target.files[0];
    let error = {};
    let isValid = true;
    if (selectImage && types.includes(selectImage.type)) {
      error = {};
      uploadHook(selectImage);
    } else {
      error.imageType = "Please select valid image( jpeg or png)";
      isValid = false;
    }
    setImageErrors(error);
    return isValid;
  };

  // User Location Position
  const getPositionHandler = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      setLatitude(crd.latitude);
      setLongitude(crd.longitude);
    }
    function error(err) {
      setError(error.message);
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const customerInformations = {
      check_id: customerInfo.enteredHotelNameValue + Math.random(),
      HotelDescription: enteredHotelDescriptionValue,
      averagePrice: customerInfo.enteredAveragePriceValue,
      hotelAdress: customerInfo.enteredHotelAddressValue,
      hotelName: customerInfo.enteredHotelNameValue,
      latitude: latitude,
      longitude: longitude,
      profileImage: urlfile,
      userId: user.uid,
    };

    axios
      .post("/Hotels.json", customerInformations)
      .then(() => {
        setIsLoading(true);
      })
      .then(() => {
        setIsLoading(false);
        history.replace("/dashboard/hotel");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
        console.log(error.message);
      });
  };
  return (
    <div className="hotel-information__container">
      <p className="Hotel-otherInfo">Hotel Other Informations</p>
      <form onSubmit={submitHandler}>
        <div className="control-group">
          <div className={enteringHotelDescriptionClasses}>
            <label htmlFor="Hotel Name">Hotel Descriptions</label>
            <textarea
              type="text"
              placeholder="Hotel in details"
              value={enteredHotelDescriptionValue}
              onChange={hotelDescriptionChangeHandler}
              onBlur={hotelDescriptionInputBlurHandler}
            />
            {hasHotelDescriptionError && (
              <p className="error-form">Please Insert valid Informations</p>
            )}
          </div>
        </div>
        {!imageErrors && (
          <div className="file-input-container" htmlFor="file-upload">
            <label htmlFor="file-upload" className="upload-input-file">
              <input
                type="file"
                id="file-upload"
                onChange={handleImageSelection}
              />
              Upload Hotel Profile
            </label>
          </div>
        )}
        {progress && (
          <div
            style={{
              color: "#DF7400",
              marginTop: ".3rem",
              backgroundColor: "#DF7400",
              width: `${progress}%`,
            }}
          >
            .
          </div>
        )}
        {progress.length !== 100 && (
          <div className="url-image">
            {urlfile && <img src={urlfile} alt="hotel-pic" />}
          </div>
        )}

        <p className="cool-information">
          When you click on below button you will get current position of where
          you are
        </p>
        <div>
          {latitude.length === 0 && (
            <Button btnType="Cool" clicked={getPositionHandler}>
              Get Your Hotel Location
            </Button>
          )}
          {latitude.length !== 0 && (
            <div className="hotel-position-desc">
              <p>
                Latitude is <strong>{latitude}</strong>
              </p>
              <p>
                Longitude is <strong>{longitude}</strong>
              </p>
            </div>
          )}
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
            {isLoading ? "Loading..." : "Upload Your Hotel"}
          </Button>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}
