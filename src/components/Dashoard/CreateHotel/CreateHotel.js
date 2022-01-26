/** @format */

import React, { useState } from "react";
import HotelInformation from "./HotelInformation/HotelInformation";
import HotelUpload from "./HotelUploadImages/HotelUpload";

export default function CreateHotel(props) {
  const [step, setStep] = useState(1);
  const [hotelInfo, setHotelInfo] = useState({});

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const hotelInformationObj = (info) => {
    setHotelInfo(info);
  };

  const switchComponent = () => {
    switch (step) {
      case 1:
        return (
          <HotelInformation
            nextStep={nextStep}
            customerInformations={hotelInformationObj}
          />
        );
      case 2:
        return (
          <HotelUpload
            nextStep={nextStep}
            customerInfo={hotelInfo}
            {...props}
          />
        );

      default:
        return (
          <HotelInformation
            nextStep={nextStep}
            customerInformations={hotelInformationObj}
          />
        );
    }
  };

  return <div>{switchComponent()}</div>;
}
