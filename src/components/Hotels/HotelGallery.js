/** @format */

import "./HotelGallery.css";
import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { TweenMax, Power3 } from "gsap";
import Empty from "../UI/Empty";

function HotelGallery({ imageToRender }) {
  let images = useRef(null);
  let imageHeader = useRef(null);

  const getImage = (image) => {
    console.warn(image);
  };

  useEffect(() => {
    TweenMax.from(
      imageHeader,
      0.8,
      {
        opacity: 0,
        x: 20,
        ease: Power3.easeOut,
      },
      0.2
    );
  }, []);

  const renderedImage = imageToRender.map((item, i) => {
    return (
      <div
        ref={(element) => {
          images = element;
        }}
        className="pics"
        key={i}
        onClick={() => {
          getImage(item.image);
        }}>
        <img src={item.image} style={{ width: "100%" }} alt="" />
      </div>
    );
  });

  return (
    <div className="gallery-container">
      <div ref={(elementHeader) => (imageHeader = elementHeader)}>
        <FontAwesomeIcon icon={faPhotoVideo} />
        <span style={{ padding: "0 .3rem" }}> Gallery</span>
      </div>
      {renderedImage && <div className="gallery">{renderedImage}</div>}
      {renderedImage.length === 0 && <Empty />}
    </div>
  );
}
export default HotelGallery;
