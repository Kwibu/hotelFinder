import axios from "../../../../firebaseInstance";
import React, { useCallback, useEffect, useState } from "react";
import HotelManagement from "./HotelManagement";
import "./HotelManagement.css";
import Alert from "../../../UI/Messages/MoreDetails";
import ViewMore from "../../../UI/ViewsModal";
import SimpleBar from "simplebar-react";
import Spinner from "../../../UI/Spinner";
import SideMenuBar from "../SideMenuBar/SideMenuBar";

export default function HotelManagements() {
  const [hotels, setHotels] = useState([]);
  const [choosenId, setChoosenId] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getHotels = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/Hotels.json")
      .then((response) => {
        let hotelsArray = [];
        for (let i in response.data) {
          hotelsArray.push(response.data[i]);
        }
        setIsLoading(false);
        setHotels(hotelsArray);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    getHotels();
  }, [getHotels]);

  const viewAllHotelData = (id) => {
    const hotelObj = hotels.filter((hotel) => hotel.check_id === id);
    setIsShown(true);
    setChoosenId(hotelObj);
  };

  const hotelManagementsDOM = hotels.map((hotel) => {
    return (
      <HotelManagement
        key={hotel.check_id}
        image={hotel.profileImage}
        hotelName={hotel.hotelName}
        hotelAdress={hotel.hotelAdress}
        clicked={() => viewAllHotelData(hotel.check_id)}
      />
    );
  });

  const onCloseHandler = () => {
    setIsShown(false);
  };

  return (
    <div className="dashboard-containers">
      <div className="navigations-header">
        <div>
          <div className="dashboard-name">Dashboard</div>
          <div>
            <SideMenuBar />
          </div>
        </div>
      </div>
      <div className="hotelManagements-container">
        <div className="HotelModify-header">
          <div className="HotelModify-title">All Hotels</div>
          <div className="HotelModify-filter">
            TotalNumber
            <span
              style={{
                backgroundColor: "#0482B2",
                padding: ".4rem .6rem",
                color: "white",
                margin: "auto 0",
              }}
            >
              {hotels.length}
            </span>
          </div>
        </div>
        {isShown && (
          <ViewMore onClose={onCloseHandler}>
            <Alert
              hotelDetails={choosenId}
              confirmClicked={onCloseHandler}
              buttonName="Close"
            />
          </ViewMore>
        )}
        <SimpleBar style={{ maxHeight: 470 }}>
          {hotelManagementsDOM && hotelManagementsDOM}
          {isLoading && <Spinner />}
          {error && <p>{error}</p>}
        </SimpleBar>
      </div>
    </div>
  );
}
