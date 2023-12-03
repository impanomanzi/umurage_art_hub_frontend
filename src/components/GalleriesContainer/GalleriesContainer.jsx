import React from "react";
import GalleryCard from "../GalleryCard/GalleryCard";
import "./GalleriesContainer.css";
function GalleriesContainer(props) {
  return (
    <div className="galleries-container">
      {props.galleries.map((item, index) => {
        return <GalleryCard gallery={item} key={index} />;
      })}
    </div>
  );
}

export default GalleriesContainer;
