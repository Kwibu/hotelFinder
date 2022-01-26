import React, { useState, useEffect, useCallback } from "react";
import Reservation from "./Reservation";
import "./Reservations.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import axios from "../../../../firebaseInstance";
import Alert from "../../../UI/Messages/DetailPopUp";
import ViewMore from "../../../UI/ViewsModal";
import ReservationsDetails from "./ReservationsDetails";
import Spinner from "../../../UI/Spinner";
import SideMenuBar from "../SideMenuBar/SideMenuBar";
import { useHistory } from "react-router-dom";

export default function Reservations({ user }) {
  const [reservations, setReservations] = useState([]);
  const [hotelData, sethotelData] = useState({});
  const [selectedIdNumber, setSelectedIdNumber] = useState("");
  const [choosenId, setChoosenId] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const reservationsFn = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/booking.json")
      .then((response) => {
        let datas = [];
        for (let i in response.data) {
          datas.push({ ...response.data[i], bookingId: i });
        }
        setIsLoading(false);
        setReservations(datas);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
        console.log(error.message);
      });
  }, []);

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
    reservationsFn();
  }, [reservationsFn, selectedHotelHandler]);

  const viewAllHotelData = (id) => {
    const reservationObj = reservations.filter(
      (reservation) => reservation.bookingId === id
    );
    setIsShown(true);
    setChoosenId(reservationObj);
    setSelectedIdNumber(reservationObj[0].bookingId);
  };

  const onCloseHandler = () => {
    setIsShown(false);
  };
  const allCustomers = reservations
    .filter((reservation) => reservation.hotel_id === hotelData.hotelId)
    .map((reservationMap) => {
      return (
        <Reservation
          key={reservationMap.book_id}
          name={reservationMap.full_names}
          hotel={reservationMap.room_type}
          approved={reservationMap.approved}
          paymentValue={reservationMap.total_payment}
          clicked={() => viewAllHotelData(reservationMap.bookingId)}
        />
      );
    });
  console.log(selectedIdNumber);
  const sendMessageToTheCustomer = () => {
    setIsLoading(true);
    fetch(
      "http://localhost:5001/hotel-finder-34fbd/us-central1/api/approve-user",
      {
        method: "POST",
        body: JSON.stringify(choosenId),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        axios
          .patch(`/booking/${selectedIdNumber}.json`, { approved: true })
          .then(() => {
            setReservations((currentReservations) => {
              return currentReservations.filter((approved) => approved);
            });
            setIsShown(false);
            console.log("Successfully Approved");
          });
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  console.log(choosenId);

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
      <div className="reservation-container">
        <div className="reservations-header">
          <div className="reservation-title">Reservations</div>
          <div className="reservation-filter">
            <span> filter </span>
            <select>
              <option>filter</option>
            </select>
          </div>
        </div>
        {isShown && (
          <ViewMore onClose={onCloseHandler}>
            <Alert
              cancelClicked={onCloseHandler}
              confirmClicked={sendMessageToTheCustomer}
              buttonName="Allow"
            >
              <ReservationsDetails bookingUserDetails={choosenId} />
            </Alert>
          </ViewMore>
        )}
        <SimpleBar style={{ maxHeight: 500 }}>
          <div className="reservations-content-container">
            {allCustomers && allCustomers}
            {isLoading && <Spinner />}
            {error && <p>{error}</p>}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}
