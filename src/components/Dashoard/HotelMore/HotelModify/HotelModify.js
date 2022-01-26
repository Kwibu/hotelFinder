import React, { useState, useEffect, useCallback } from "react";
import HotelRoomModify from "./HotelRoomModify";
import "./HotelModify.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import axios from "../../../../firebaseInstance";
import { useHistory } from "react-router-dom";
import HotelGalleryModify from "./HotelGalleryModify";
import HotelServiceModify from "./HotelServiceModify";
import Confirm from "../../../UI/Confirmation";
import Alert from "../../../UI/Messages/Alert";
import Empty from "../../../UI/Empty";
import Spinner from "../../../UI/Spinner";
import SideMenuBar from "../../DashboardHome/SideMenuBar/SideMenuBar";

let GALLERY_NAME = "Gallery";
let ROOM_TYPE = "Room type";
let SERVICES = "Services";

export default function HotelModify({ user }) {
  const [hotelRooms, setHotelRooms] = useState([]);
  const [hotels, setHotels] = useState({});
  const [gallery, setGallery] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(GALLERY_NAME);
  const [isShown, setIsShown] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState("");
  const [serviceIdDeletion, setServiceIdDeletion] = useState("");
  const [roomIdDeletion, setRoomIdDeletion] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  //Services
  const ServicesFetchingFn = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/Services.json")
      .then((res) => {
        let datas = [];
        for (let key in res.data) {
          datas.push({ ...res.data[key], id: key });
        }
        setIsLoading(false);
        setServices(datas);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  //Image Gallery Deletion
  const imageGalleryFetch = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/Gallery.json")
      .then((res) => {
        let datas = [];
        for (let key in res.data) {
          datas.push({ ...res.data[key], gallery_id: key });
        }
        setIsLoading(false);
        setGallery(datas);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  //Hotel Rooms Fetching
  const hotelRoomsFetch = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/HotelRooms.json")
      .then((res) => {
        let datas = [];
        for (let key in res.data) {
          datas.push({ ...res.data[key], id: key });
        }
        setIsLoading(false);
        setHotelRooms(datas);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  // Hotel Fetching
  const hotelsFetch = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/Hotels.json")
      .then((res) => {
        let datas = [];
        for (let key in res.data) {
          datas.push(res.data[key]);
        }
        const filteredHotels = datas.filter(
          (hotel) => hotel.userId === user.uid
        );
        let filteredObj = {};
        for (let i in filteredHotels) {
          filteredObj = filteredHotels[i];
        }
        setIsLoading(false);
        setHotels(filteredObj);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    hotelRoomsFetch();
    hotelsFetch();
    imageGalleryFetch();
    ServicesFetchingFn();
  }, [hotelRoomsFetch, hotelsFetch, imageGalleryFetch, ServicesFetchingFn]);

  const roomDelete = (id) => {
    setRoomIdDeletion(id);
    setIsLoading(true);
    setIsShown(true);
  };

  //Display Our Items to the DOM

  let filteredChoiceTotheDOM;
  if (filter === ROOM_TYPE) {
    filteredChoiceTotheDOM = hotelRooms
      .filter((room) => room.hotel_id === hotels.check_id)
      .map((room) => {
        return (
          <HotelRoomModify
            key={room.id}
            roomName={room.room_type}
            price={room.room_price}
            image={room.images.image1}
            option={"Delete"}
            clicked={() => roomDelete(room.id)}
          />
        );
      });
  } else if (filter === GALLERY_NAME) {
    const galleryPictures = gallery
      .filter((gallery) => gallery.id === hotels.check_id)
      .map((gallery) => {
        return (
          <HotelGalleryModify
            key={gallery.gallery_id}
            image={gallery.image}
            delete={"Delete"}
            clicked={() => onClose(gallery.gallery_id)}
          />
        );
      });
    filteredChoiceTotheDOM = (
      <div className="gallery-deletion-order">{galleryPictures}</div>
    );
  } else {
    filteredChoiceTotheDOM = services
      .filter((services) => services.hotelId === hotels.check_id)
      .map((service, index) => {
        return (
          <HotelServiceModify
            key={index}
            buttonName={"Delete"}
            name={service.serviceName}
            clicked={() => deleteButtonShowIdHandler(service.id)}
          />
        );
      });
  }

  //Filtering Response
  const filterResultHandler = (event) => {
    setFilter(event.target.value);
  };

  const onClose = (id) => {
    setIdToUpdate(id);
    setIsShown(true);
  };
  const deleteButtonShowIdHandler = (id) => {
    setIsShown(true);
    setServiceIdDeletion(id);
  };
  const deleteIdHandler = () => {
    if (idToUpdate) {
      setIsLoading(true);
      axios.delete(`/Gallery/${idToUpdate}.json`).then((res) => {
        setIsShown(false);
        setIsLoading(false);
        setGallery((currentGallery) => {
          return currentGallery.filter(
            (image) => image.gallery_id !== idToUpdate
          );
        });
      });
    }
    if (serviceIdDeletion) {
      setIsLoading(true);
      axios.delete(`/Services/${serviceIdDeletion}.json`).then((res) => {
        setIsShown(false);
        setIsLoading(false);
        setServices((currentService) => {
          return currentService.filter(
            (service) => service.id !== serviceIdDeletion
          );
        });
      });
    }
    if (roomIdDeletion) {
      setIsLoading(true);
      axios.delete(`/HotelRooms/${roomIdDeletion}.json`).then((res) => {
        setIsShown(false);
        setIsLoading(false);
        setHotelRooms((currentRooms) => {
          return currentRooms.filter((room) => room.id !== roomIdDeletion);
        });
      });
    }
  };
  const onHide = () => {
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
      <div className="HotelModify-container">
        <div className="HotelModify-header">
          <div className="HotelModify-title">Hotel Modifications</div>
          <div className="HotelModify-filter">
            <span> filter </span>
            <select onChange={filterResultHandler} value={filter}>
              <option value={GALLERY_NAME}>Gallery</option>
              <option value={ROOM_TYPE}>Rooms Type</option>
              <option value={SERVICES}>Services</option>
            </select>
          </div>
        </div>
        {isShown && (
          <Confirm onClose={onClose}>
            <Alert
              confirmClicked={deleteIdHandler}
              cancelClicked={onHide}
              buttonName={isLoading ? "Wait..." : "Delete"}
            />
          </Confirm>
        )}
        <SimpleBar style={{ maxHeight: 470 }}>
          <div className="HotelModifys-content-container">
            {filteredChoiceTotheDOM && filteredChoiceTotheDOM}
            {filteredChoiceTotheDOM.length === 0 && <Empty />}
            {isLoading && <Spinner />}
            {error && <p>{error} </p>}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}
