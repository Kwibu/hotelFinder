import React, { useCallback, useEffect, useState } from "react";
import axios from "../../../../firebaseInstance";

const Other = (props) => {
  const [selectedHotel, setSelectedHotel] = useState([]);
  const data = useCallback(async () => {
    const response = await axios.get("Hotels.json");
    const data = await response.data;

    const convertedData = [];

    for (let index in data) {
      convertedData.push({ id: index, ...data[index] });
    }

    const filteredArray = convertedData.filter(
      (hotel) => hotel.hotelName === "Onomo Hotel"
    );
    setSelectedHotel(filteredArray);
  }, []);

  useEffect(() => {
    data();
  }, [data]);

  console.log(selectedHotel);
  const DOMName = selectedHotel.map((hotel) => {
    return (
      <div
        style={{
          color: "#2680EB",
          paddingLeft: "1rem",
          border: "1px solid #2680EB",
          margin: "1rem",
          padding: "1rem",
          borderRadius: "25px",
        }}
        key={hotel.id}
      >
        {hotel.hotelName}
      </div>
    );
  });

  return (
    <div style={{ paddingTop: "5rem" }}>
      <div>{selectedHotel.hotelName}</div>
      {DOMName}
    </div>
  );
};
export default Other;
