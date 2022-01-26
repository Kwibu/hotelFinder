/** @format */

import React, { Fragment, useEffect, useState, useCallback } from "react";
import HotelMainContent from "./HotelMainContents";
import axios from "../../firebaseInstance";
import { useParams } from "react-router-dom";
import Spinner from "../UI/Spinner";
import Services from "./Services";
import Gallery from "./HotelGallery";

function HotelDetails() {
  const [filteredHotel, setFilteredHotel] = useState({});
  const [isLoading, seIsLoading] = useState(false);
  const [filteredImages, setFilteredImage] = useState([]);
  const [filteredServices, setfilteredService] = useState([]);
  const [error, setError] = useState("");

  const params = useParams().hotelId;

  const filteredData = useCallback(async () => {
    //Getting SelectedHotel from the database
    try {
      seIsLoading(true);
      const response = await (
        await axios.get("/Hotels/" + params + ".json")
      ).data;
      setFilteredHotel(response);
      seIsLoading(false);
    } catch (error) {
      setError(error.message);
    }

    // Getting Gallery from database
    try {
      seIsLoading(true);
      const images = await axios.get("/Gallery.json");
      const data = await images.data;
      let imageArray = [];
      for (let i in data) {
        imageArray.push(data[i]);
      }
      seIsLoading(false);
      setFilteredImage(imageArray);
    } catch (error) {
      setError(error.message);
    }

    //Getting Services from database
    try {
      seIsLoading(true);
      const services = await axios.get("/Services.json");
      const serviceData = await services.data;
      seIsLoading(false);
      let dataServices = [];
      for (let i in serviceData) {
        dataServices.push(serviceData[i]);
      }

      setfilteredService(dataServices);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    filteredData();
  }, [filteredData]);

  //FilteredImage Gallery
  let dataArray = [];
  filteredImages.filter((imageOb) => {
    if (imageOb.id === filteredHotel.check_id) {
      dataArray.push(imageOb);
    }
    return dataArray;
  });

  //Filtered Services to map

  let filteredServicesMap = [];
  filteredServices.filter((service) => {
    if (service.hotelId === filteredHotel.check_id) {
      filteredServicesMap.push(service);
    }
    return filteredServicesMap;
  });

  return (
    <Fragment>
      {!isLoading && (
        <HotelMainContent
          hotelName={filteredHotel.hotelName}
          hotelDescription={filteredHotel.HotelDescription}
          averagePrice={filteredHotel.averagePrice}
          profileImage={filteredHotel.profileImage}
          hotelAddress={filteredHotel.hotelAdress}
          roomButtonId={filteredHotel.check_id}
        />
      )}

      {!isLoading && <Services services={filteredServicesMap} />}
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      {!isLoading && <Gallery imageToRender={dataArray} />}
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
    </Fragment>
  );
}
export default HotelDetails;
