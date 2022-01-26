/** @format */

import classes from "./Hotels.module.css";
import React, { useEffect, useCallback, useState } from "react";
import { withRouter } from "react-router-dom";
import Hotel from "./Hotel";
import axios from "axios";
import Spinner from "../UI/Spinner";

function Hotels(props) {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHotels = useCallback(() => {
    //Getting data in database

    setIsLoading(true);
    axios
      .get("https://hotel-finder-34fbd-default-rtdb.firebaseio.com/Hotels.json")
      .then((response) => {
        let result = [];
        for (let i in response.data) {
          result.push({ ...response.data[i], id: i });
        }
        setIsLoading(false);
        setHotels(result);
      })

      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const goToMoreDetail = (id) => {
    props.history.push({ pathname: "/hotel-details/" + id });
  };

  const hotelsDOM = hotels.map((hotel, i) => {
    return (
      <Hotel
        key={i}
        hotelName={hotel.hotelName}
        averagePrice={hotel.averagePrice}
        profileImage={hotel.profileImage}
        hotelDescription={hotel.HotelDescription}
        clicked={() => goToMoreDetail(hotel.id)}
      />
    );
  });

  // console.log(hotels);

  return (
    <div className={classes.HotelsContainer}>
      <div>Nearest Hotels</div>
      <ul className={classes.HotelCardsContainer}>
        {hotelsDOM && hotelsDOM}
        {isLoading && <Spinner />}
        {error && (
          <p style={{ textAlign: "center", paddingTop: "4rem" }}>{error}</p>
        )}
      </ul>
    </div>
  );
}
export default withRouter(Hotels);
