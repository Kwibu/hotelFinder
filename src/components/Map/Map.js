/** @format */

import React, { useCallback, useEffect, useState } from "react";

import ReactMapGL, { Marker, setRTLTextPlugin } from "react-map-gl";
import photoMarkers from "../../assets/Pictures&Logos/512px-Map_marker.svg.png";
import axios from "../../firebaseInstance";
import Hotel from "./HotelMap";
import { withRouter } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

setRTLTextPlugin(
  // find out the latest version at https://www.npmjs.com/package/@mapbox/mapbox-gl-rtl-text
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  // lazy: only load when the map first encounters Hebrew or Arabic text
  true
);

function Map(props) {
  const [viewport, setViewport] = useState({
    latitude: props.currentPositon.latitude,
    longitude: props.currentPositon.longitude,
    zoom: 16.45,
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [hotels, setHotel] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [mappedDataToDOM, setMappedDataToDOM] = useState([]);

  const fetchedData = useCallback(async () => {
    const response = await axios.get("/Hotels.json");
    const data = await response.data;

    let hotelsArray = [];
    for (let index in data) {
      hotelsArray.push({ ...data[index], id: index });
    }
    setHotel(hotelsArray);
  }, []);

  const markerClickHandler = (hotel_id) => {
    console.log(hotel_id);
    setIsShown(true);

    let dataSelected = [];
    hotels.filter((hotel) => {
      if (
        (hotel.check_id === +hotel_id && hotel.check_id === hotel_id) ||
        (hotel.check_id === hotel_id && hotel.check_id === hotel_id)
      ) {
        dataSelected.push(hotel);
      }
      return dataSelected;
    });

    setMappedDataToDOM(dataSelected);
  };

  const goToHotelDetailHandler = (hotelId) => {
    console.log(hotelId);
    props.history.push({ pathname: "/hotel-details/" + hotelId });
  };

  const DOMhotelElements = mappedDataToDOM.map((hotel, i) => {
    return (
      <Hotel
        key={i}
        hotelImage={hotel.profileImage}
        hotelName={hotel.hotelName}
        hotelAddress={hotel.hotelAdress}
        clicked={() => goToHotelDetailHandler(hotel.id)}
      />
    );
  });

  useEffect(() => {
    fetchedData();
  }, [fetchedData]);

  const hotelToMarkers = hotels.map((hotel, i) => {
    return (
      <Marker key={i} latitude={hotel.latitude} longitude={hotel.longitude}>
        <div
          className="markersContainer"
          onClick={() => markerClickHandler(hotel.check_id)}
        >
          <div>
            <CurrencyFormat
              value={hotel.averagePrice}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" RWF "}
            />
          </div>
          <img src={photoMarkers} alt="" height={viewport.zoom * 3} />
        </div>
      </Marker>
    );
  });

  return (
    <ReactMapGL
      mapboxApiAccessToken={
        "pk.eyJ1Ijoia3dpYnVrYSIsImEiOiJja3BxbzBiejYwMGJiMndwbWJqMW55Y29vIn0.0u93bgJ7rXkjj_GXP4KORw"
      }
      {...viewport}
      onViewportChange={(newView) => {
        setViewport(newView);
      }}
    >
      {hotelToMarkers}
      {isShown && DOMhotelElements}
    </ReactMapGL>
  );
}
export default withRouter(Map);
