/** @format */

import React, { useCallback, useState, useEffect } from "react";
import "./HomeHotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faConciergeBell,
  faRestroom,
  faImages,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "../../../firebaseInstance";
import SideMenuBar from "../DashboardHome/SideMenuBar/SideMenuBar";

export default function HomeHotel({ user }) {
  const [hotelData, sethotelData] = useState({});

  const buttonArray = [
    {
      name: "Create Service(s)",
      icon: faConciergeBell,
      color: "#7A078F",
      link: "/dashboard/hotel/create-service",
    },
    {
      name: "Create Room(s)",
      icon: faRestroom,
      color: "#F9B004",
      link: "/dashboard/hotel/create-room",
    },
    {
      name: "Create Gallery",
      icon: faImages,
      color: "#772D2D",
      link: "/dashboard/hotel/create-gallery",
    },
    {
      name: "Hotel Modifications",
      icon: faComments,
      color: "black",
      link: "/dashboard/hotel/modify-hotel",
    },
  ];

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

  const ButtonElement = buttonArray.map((button, i) => {
    return (
      <Link key={i} to={button.link}>
        <div className="button-new-home">
          <p style={{ color: button.color, fontSize: "24px" }}>
            <FontAwesomeIcon icon={button.icon} />
          </p>
          <p style={{ color: "black" }}>{button.name}</p>
        </div>
      </Link>
    );
  });

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
      <div>
        <div className="new-dash-home-container">
          <p className="new-dash-home-title"> {hotelData.hotelName}</p>
          <p className="new-dash-home-subtitle">
            Hello welcome to your hotel, your hotel not complete yet try to fill
            it by inserting all services
          </p>
        </div>
        <div className="new-home-container">{ButtonElement}</div>
      </div>
    </div>
  );
}
