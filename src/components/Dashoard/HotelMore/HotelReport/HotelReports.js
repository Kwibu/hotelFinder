import React, { useState, useEffect, useCallback } from "react";
import HotelReport from "./HotelReport";
import "./HotelReport.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import axios from "../../../../firebaseInstance";
import Spinner from "../../../UI/Spinner";
import SideMenuBar from "../../DashboardHome/SideMenuBar/SideMenuBar";

export default function HotelReports({ user }) {
  const [bookings, setBookings] = useState([]);
  const [hotelData, sethotelData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const reservationsDatas = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/booking.json")
      .then((response) => {
        let reservationsArray = [];
        for (let i in response.data) {
          reservationsArray.push(response.data[i]);
        }
        setIsLoading(false);
        setBookings(reservationsArray);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  const selectedHotelHandler = useCallback(() => {
    setIsLoading(true);
    axios
      .get("Hotels.json")
      .then((response) => {
        let hotelResponses = [];
        for (let i in response.data) {
          hotelResponses.push(response.data[i]);
        }
        setIsLoading(false);
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
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    reservationsDatas();
    selectedHotelHandler();
  }, [reservationsDatas, selectedHotelHandler]);

  //DateHandler
  const dateToDaysHandler = (date) => new Date(date).getDay();
  const getMonth = (date) => new Date(date).getMonth();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDay();

  //Show Data Handler
  const getDaysData = bookings
    .filter(
      (booking) =>
        dateToDaysHandler(booking.date) === currentDay &&
        booking.hotel_id === hotelData.hotelId
    )
    .reduce((accumulator, days) => {
      return accumulator + days.total_payment;
    }, 0);
  const getMonthData = bookings
    .filter(
      (booking) =>
        getMonth(booking.date) === currentMonth &&
        booking.hotel_id === hotelData.hotelId
    )
    .reduce((accumulator, days) => {
      return accumulator + days.total_payment;
    }, 0);
  const totalCustomers = bookings.filter(
    (booking) => booking.hotel_id === hotelData.hotelId
  );
  const totalAllPayements = bookings
    .filter((booking) => booking.hotel_id === hotelData.hotelId)
    .reduce((accumulator, days) => {
      return accumulator + days.total_payment;
    }, 0);

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
      <div className="HotelReports-container">
        <div className="HotelReports-header">
          <div className="HotelReport-title">Hotel Reports</div>
          <div className="HotelReport-filter">
            <span> filter </span>
            <select>
              <option>filter</option>
            </select>
          </div>
        </div>
        <SimpleBar style={{ maxHeight: 500 }}>
          {!isLoading ? (
            <div className="HotelReports-content-container">
              <HotelReport days="To Day" totalPayement={getDaysData} />
              <HotelReport days="Previous Month" totalPayement={getMonthData} />
              <HotelReport
                days="Total Customers"
                totalNumber={totalCustomers.length}
              />
              <HotelReport
                days="Total Payment"
                totalPayement={totalAllPayements}
              />
            </div>
          ) : (
            <Spinner />
          )}
          {error && <p>{error}</p>}
        </SimpleBar>
      </div>
    </div>
  );
}
