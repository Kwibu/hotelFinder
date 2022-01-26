import React from "react";
import "./HotelModify.css";

export default function HotelGalleryModify(props) {
  return (
    <div>
      <div className="gallery-image-delete">
        <img src={props.image} alt={props.image} />
        <button className="delete-image-button" onClick={props.clicked}>
          {props.delete}
        </button>
      </div>
    </div>
  );
}
