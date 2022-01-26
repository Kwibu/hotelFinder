/** @format */

import React from "react";
import "./Empty.css";
import EmptyImage from "../../assets/Illustrations/Group 93.png";
export default function Empty() {
  return (
    <div className="empty">
      <div className="empty-image">
        <img src={EmptyImage} alt="empty" />
      </div>
      <p className="empty-message">Ooops! There are no Service added Yet</p>
    </div>
  );
}
