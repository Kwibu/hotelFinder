/** @format */

import React, { useState, useCallback, useEffect } from "react";
import UserInput from "../../../User-input/user-input-validations";
import Button from "../../../UI/Button/Button";
import "../../../BookingSteps/CustomerInformation.css";
import "./RoomEntry.css";
import { projectStorage } from "../../../../firebase";
import { useHistory } from "react-router-dom";
import axios from "../../../../firebaseInstance";
import SideMenuBar from "../SideMenuBar/SideMenuBar";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const isNotEmpty = (value) => value.trim() !== "";
const types = ["image/png", "image/jpeg"];

export default function RoomEntry({ user }) {
  const [imageErrors, setImageErrors] = useState("");
  const [urlfile, setUrlFile] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hotelData, sethotelData] = useState({});
  const history = useHistory();

  const {
    value: enteredHotelRoomTypeValue,
    isValid: isHotelRoomTypeValid,
    hasError: hasHotelRoomTypeError,
    valueChangeHandler: hotelRoomTypeChangeHandler,
    inputBlurHandler: hotelRoomTypeInputBlurHandler,
  } = UserInput(isNotEmpty);

  const {
    value: enteredHotelRoomTypePriceValue,
    isValid: isHotelRoomTypePriceValid,
    hasError: hasHotelRoomTypePriceError,
    valueChangeHandler: hotelRoomTypePriceChangeHandler,
    inputBlurHandler: hotelRoomTypePriceInputBlurHandler,
  } = UserInput(isNotEmpty);

  const {
    value: enteredHotelRoomAdultsNumberValue,
    isValid: isHotelRoomAdultsNumberValid,
    hasError: hasHotelRoomAdultsNumberError,
    valueChangeHandler: hotelRoomAdultsNumberChangeHandler,
    inputBlurHandler: hotelRoomAdultsNumberInputBlurHandler,
  } = UserInput(isNotEmpty);

  const {
    value: enteredHotelRoomChildrenNumberValue,
    isValid: isHotelRoomChildrenNumberValid,
    hasError: hasHotelRoomChildrenNumberError,
    valueChangeHandler: hotelRoomChildrenNumberChangeHandler,
    inputBlurHandler: hotelRoomChildrenNumberInputBlurHandler,
  } = UserInput(isNotEmpty);

  const {
    value: enteredHotelRoomTypeReviewValue,
    isValid: isHotelRoomTypeReviewValid,
    hasError: hasHotelRoomTypeReviewError,
    valueChangeHandler: hotelRoomTypeReviewChangeHandler,
    inputBlurHandler: hotelRoomTypeReviewInputBlurHandler,
  } = UserInput(isNotEmpty);

  const enteringHotelRoomTypeClasses = hasHotelRoomTypeError
    ? "form-control invalid"
    : "form-control";
  const enteringHotelRoomTypePriceClasses = hasHotelRoomTypePriceError
    ? "form-control invalid"
    : "form-control";
  const enteringHotelRoomAdultsNumberClasses = hasHotelRoomAdultsNumberError
    ? "form-control invalid"
    : "form-control";
  const enteringHotelTypeReviewClasses = hasHotelRoomTypeReviewError
    ? "form-control invalid"
    : "form-control";

  let formIsValid = false;
  if (
    isHotelRoomTypeValid &&
    isHotelRoomTypePriceValid &&
    isHotelRoomAdultsNumberValid &&
    isHotelRoomChildrenNumberValid &&
    isHotelRoomTypeReviewValid &&
    urlfile
  ) {
    formIsValid = true;
  }

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

  // console.log(hotelData);

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

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const dataToSend = {
      date: new Date().toISOString(),
      room_type: enteredHotelRoomTypeValue,
      room_price: enteredHotelRoomTypePriceValue,
      reviews_more: enteredHotelRoomTypeReviewValue,
      adults_number: enteredHotelRoomAdultsNumberValue,
      child_number: enteredHotelRoomChildrenNumberValue,
      hotel_id: hotelData.hotelId,
      hotelRoomId: enteredHotelRoomTypeValue + Math.random(),
      images: {
        image1: urlfile,
      },
    };
    setIsLoading(true);
    console.log(dataToSend);
    axios
      .post("HotelRooms.json", dataToSend)
      .then((response) => {
        setIsLoading(true);
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
      <div className="create-room-container">
        <div className="room-fields-title">Create Room</div>
        <SimpleBar className="SimpeBar">
          <form onSubmit={submitHandler}>
            <div className="control-group">
              <div className={enteringHotelRoomTypeClasses}>
                <label htmlFor="Hotel Name">Room Type</label>
                <input
                  type="text"
                  value={enteredHotelRoomTypeValue}
                  onChange={hotelRoomTypeChangeHandler}
                  onBlur={hotelRoomTypeInputBlurHandler}
                />
                {hasHotelRoomTypeError && (
                  <p className="error-form">
                    Please Insert valid room name Type
                  </p>
                )}
                {error && <p>{error}</p>}
              </div>
            </div>
            {/* Price  */}
            <div className="control-group">
              <div className={enteringHotelRoomTypePriceClasses}>
                <label htmlFor="Hotel Name">Price Per Night</label>
                <input
                  type="number"
                  value={enteredHotelRoomTypePriceValue}
                  onChange={hotelRoomTypePriceChangeHandler}
                  onBlur={hotelRoomTypePriceInputBlurHandler}
                />
                {hasHotelRoomTypePriceError && (
                  <p className="error-form">
                    Please Insert valid room name Type
                  </p>
                )}
              </div>
            </div>

            {/* Number Of People Who Adults in Room */}
            <div className="control-group">
              <div
                className={`${enteringHotelRoomAdultsNumberClasses} control_rooms-container`}
              >
                <div>
                  <label htmlFor="Hotel Name">Adults number</label>
                  <input
                    type="number"
                    value={enteredHotelRoomAdultsNumberValue}
                    onChange={hotelRoomAdultsNumberChangeHandler}
                    onBlur={hotelRoomAdultsNumberInputBlurHandler}
                  />
                </div>
                <div>
                  <label htmlFor="Hotel Name">Children number</label>
                  <input
                    type="number"
                    value={enteredHotelRoomChildrenNumberValue}
                    onChange={hotelRoomChildrenNumberChangeHandler}
                    onBlur={hotelRoomChildrenNumberInputBlurHandler}
                  />
                </div>
                {hasHotelRoomChildrenNumberError && (
                  <p className="error-form">
                    Please Insert valid Numbers less than 20 People
                  </p>
                )}
              </div>
            </div>

            {/* Room More Review */}
            <div className="control-group">
              <div className={enteringHotelTypeReviewClasses}>
                <label htmlFor="Hotel Name">Write Room Review</label>
                <input
                  type="text"
                  value={enteredHotelRoomTypeReviewValue}
                  onChange={hotelRoomTypeReviewChangeHandler}
                  onBlur={hotelRoomTypeReviewInputBlurHandler}
                />
                {hasHotelRoomTypeReviewError && (
                  <p className="error-form">
                    Please Insert valid Numbers less than 20 People
                  </p>
                )}
              </div>
            </div>
            {/* Image Upload */}
            {!urlfile && (
              <div className="file-input-container" htmlFor="file-upload">
                <label htmlFor="file-upload" className="upload-input-file">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleImageSelection}
                  />
                  Upload HotelRoom Picture
                </label>
              </div>
            )}
            {progress && <div style={{ width: `${progress}%` }}>.</div>}
            {urlfile && (
              <div className="room-image-uploader-container">
                <img src={urlfile} alt="roomImage" />
              </div>
            )}
            <div className="ButtonContainer">
              <Button
                btnType="Success"
                disabled={!formIsValid}
                clicked={submitHandler}
              >
                {isLoading && "Loading..."}
                {!isLoading && "Save"}
              </Button>
            </div>
          </form>
        </SimpleBar>
      </div>
    </div>
  );
}
