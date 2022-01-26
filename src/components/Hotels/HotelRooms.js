/** @format */

import React, { Fragment, useCallback, useEffect, useState } from "react";
import axios from "../../firebaseInstance";
import classes from "./HotelRoom.module.css";
import RoomTitle from "../HotelComponents/RoomTitle";
import RoomCard from "../HotelComponents/RoomCard";
import { withRouter } from "react-router-dom";
import Spinner from "../UI/Spinner";
import Empty from "../UI/Empty";

function HotelRooms(props) {
  const [hotelRooms, setHotelRooms] = useState([]);
  const [hotelName, setHotelName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getHotel = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/Hotels.json");
      const datas = await response.data;

      let filteredHotel = [];

      for (let i in datas) {
        filteredHotel.push(datas[i]);
      }
      let finalHotel = [];
      filteredHotel.filter((hotel) => {
        if (
          hotel.check_id === +props.match.params.hotelId ||
          hotel.check_id === props.match.params.hotelId
        ) {
          finalHotel.push(hotel);
        }
        return finalHotel;
      });
      setIsLoading(false);
      setHotelName(finalHotel);
    } catch (error) {
      console.log(error.message);
      setError("No Network");
    }
  }, []);

  const getRooms = useCallback(async () => {
    setIsLoading(true);
    const response = await axios.get("/HotelRooms.json");
    const data = await response.data;

    let filteredHotels = [];
    for (let i in data) {
      filteredHotels.push(data[i]);
    }
    let roomsFiltered = [];
    filteredHotels.filter((room) => {
      if (
        room.hotel_id === +props.match.params.hotelId ||
        room.hotel_id === props.match.params.hotelId
      ) {
        roomsFiltered.push(room);
      }
      return roomsFiltered;
    });
    setIsLoading(false);
    setHotelRooms(roomsFiltered);
  }, []);

  useEffect(() => {
    getRooms();
    getHotel();
  }, []);

  const bookButtonClickedHandler = (hotelId, roomId) => {
    props.history.push({
      pathname: `/hotel-details/${hotelId}/hotel-rooms/booking/${roomId}`,
    });
  };

  const hotelTitle = hotelName.map((hotel, i) => {
    return <RoomTitle key={i} hotelTitle={hotel.hotelName} />;
  });
  let roomCardElements = hotelRooms.map((room, i) => {
    return (
      <RoomCard
        key={i}
        roomType={room.room_type}
        adultNumber={room.adults_number}
        roomPrice={room.room_price}
        childNumber={room.child_number}
        images={room.images.image1}
        hotelId={room.hotel_id}
        hotelRoomId={() =>
          bookButtonClickedHandler(room.hotel_id, room.hotelRoomId)
        }
      />
    );
  });

  return (
    <Fragment>
      {isLoading ? <Spinner /> : error ? <p>{error}</p> : hotelTitle}
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>{error}</p>
      ) : roomCardElements.length === 0 ? (
        <Empty />
      ) : (
        <div className={classes.RoomContentsContainer}>{roomCardElements}</div>
      )}
    </Fragment>
  );
}
export default withRouter(HotelRooms);
