/** @format */

import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import gallerySVG from "../../../../assets/Illustrations/Group 66.png";
import Button from "../../../UI/Button/Button";
import "./GalleryEntry.css";
import axios from "../../../../firebaseInstance";
import { projectStorage } from "../../../../firebase";
import SideMenuBar from "../SideMenuBar/SideMenuBar";
// import
const types = ["image/png", "image/jpeg"];
const GalleryEntry = ({ user }) => {
  const [urlfile, setUrlFile] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const [imageErrors, setImageErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hotelData, sethotelData] = useState({});
  const history = useHistory();

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

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const urlObject = {
      id: hotelData.hotelId,
      image: urlfile,
      imageDescription: "",
    };
    console.log(urlObject);
    setIsLoading(true);
    axios
      .post("/Gallery.json", urlObject)
      .then((response) => {
        if (!response.data.name === 0) {
          setIsLoading(true);
        }
        console.log(response);
      })
      .then(() => {
        setIsLoading(false);
        history.push("/dashboard/hotel");
      });
  };

  let formIsValid = false;
  if (urlfile) {
    formIsValid = true;
  }

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
      <div className="upload-gallery-container">
        <p className="upload-gallery-title">Create Hotel Gallery</p>
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
        {progress && (
          <div className="progress-bar">
            <div
              style={{
                width: `${progress}%`,
                color: "#DF7400",
                fontSize: 8,
                margin: "1rem auto",
                backgroundColor: "#DF7400",
                boxSizing: "border-box",
              }}
            >
              .
            </div>{" "}
            <span>{`${progress}%`}</span>
          </div>
        )}
        {!urlfile && (
          <div className="upload-gallery-storage">
            <img src={gallerySVG} alt="image-gallery" />
            <p className="upload-gallery-storage-title">
              Images will display here
            </p>
          </div>
        )}
        {urlfile && (
          <div className="url-file-image-container">
            <img src={urlfile} alt="image-gallery" />
          </div>
        )}

        <div className="Upload-gallery-button">
          <Button
            btnType="Success"
            disabled={!formIsValid}
            clicked={submitHandler}
          >
            {isLoading ? "Loading..." : " Upload Pictures"}
          </Button>
        </div>
        {/* {imageErrors && <p style={{ color: "red" }}>{imageErrors}</p>} */}
      </div>
    </div>
  );
};

export default GalleryEntry;
