/** @format */

import React, { useEffect, useState, useCallback } from "react";
import "../Dashboard.css";
import axios from "../../../firebaseInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../../UI/Spinner";
import HomeHeaderSection from "./HomeHeaderSection/HomeHeaderSection";

import {
  faHotel,
  faSuitcase,
  faIndustry,
  faMoneyBill,
  faComments,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SideMenuBar from "./SideMenuBar/SideMenuBar";
import withErrorSubscription from "../../../HOC/withSubscription";

const AdminItems = [
  {
    name: "Hotel Managment ",
    icon: faHotel,
    color: "#7A078F",
    link: "/dashboard/manage-hotel",
    hotelCreate: true,
    user: "",
  },
  {
    name: "Payments",
    icon: faMoneyBill,
    color: "#F9B004",
    link: "/dashboard/admin/payment",
    hotelCreate: true,
    user: "",
  },
  {
    name: "Report",
    icon: faIndustry,
    color: "#772D2D",
    link: "/dashboard/admin/Report",
    hotelCreate: true,
    user: "",
  },
  {
    name: "Users Management",
    icon: faUser,
    color: "black",
    link: "/dashboard/manage-users",
    hotelCreate: true,
    user: "test@test.com",
  },
];

function DashboardHome({ user }) {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const hotelsHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("Hotels.json");
      const data = await response.data;

      let hotelArray = [];
      for (let i in data) {
        hotelArray.push(data[i].userId);
      }
      setIsLoading(false);
      setHotels(hotelArray);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    hotelsHandler();
  }, [hotelsHandler]);

  const buttonArray = [
    {
      name: "Create Hotel",
      icon: faHotel,
      color: "#7A078F",
      link: "/dashboard/create-hotel/payment",
      hotelCreate: true,
      user: "",
    },
    {
      name: "Reservations",
      icon: faSuitcase,
      color: "#F9B004",
      link: "/dashboard/reservation-orders",
      hotelCreate: false,
      user: "",
    },
    {
      name: "Hotel Management",
      icon: faIndustry,
      color: "#772D2D",
      link: "/dashboard/hotel",
      hotelCreate: false,
      user: "",
    },
    {
      name: "Report",
      icon: faComments,
      color: "black",
      link: "/dashboard/hotel/Report",
      hotelCreate: false,
      user: "",
    },
  ];

  const buttonNavigations = () => {
    let buttonToTheDOM = null;

    if (user !== null) {
      if (user.email === "test@test.com") {
        buttonToTheDOM = AdminItems.map((button, i) => (
          <div key={i} className="button-management">
            <Link to={button.link}>
              <p style={{ color: button.color, fontSize: "24px" }}>
                <FontAwesomeIcon icon={button.icon} />
              </p>
              <p style={{ color: "black" }}>{button.name}</p>
            </Link>
          </div>
        ));
      } else {
        buttonToTheDOM = buttonArray.map((button, i) => {
          let restrictedButton = null;
          if (
            button.hotelCreate === false &&
            hotels.includes(user.uid) === true
          ) {
            restrictedButton = (
              <div key={i} className="button-management">
                <Link to={button.link}>
                  <p style={{ color: button.color, fontSize: "24px" }}>
                    <FontAwesomeIcon icon={button.icon} />
                  </p>
                  <p style={{ color: "black" }}>{button.name}</p>
                </Link>
              </div>
            );
          } else if (
            button.hotelCreate === true &&
            hotels.includes(user.uid) === false
          ) {
            restrictedButton = (
              <div key={i} className="button-management">
                <Link to={button.link}>
                  <p style={{ color: button.color, fontSize: "24px" }}>
                    <FontAwesomeIcon icon={button.icon} />
                  </p>
                  <p style={{ color: "black" }}>{button.name}</p>
                </Link>
              </div>
            );
          } else {
            restrictedButton = (
              <div key={i} className="button-management-invalid">
                <p style={{ color: "gray", fontSize: "24px" }}>
                  <FontAwesomeIcon icon={button.icon} />
                </p>
                <p style={{ color: "gray" }}>{button.name}</p>
              </div>
            );
          }
          return restrictedButton;
        });
      }
    }
    return buttonToTheDOM;
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
      <div>
        <HomeHeaderSection />
        <div className="button-management-container">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p>{error}</p>
          ) : (
            buttonNavigations()
          )}
        </div>
      </div>
    </div>
  );
}
export default withErrorSubscription(DashboardHome,axios);
