import React from "react";
// import galleries from "../db/galleries.json";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GalleryCard from "../GalleryCard/GalleryCard";
import "./GalleryShow.css";
import settings from "../settings.json";
function GalleryShow() {
  const [galleries, setGalleries] = useState([]);
  // gettings galleries from server
  useEffect(() => {
    fetch(`${settings.server_domain}/get_paintings`)
      .then((response) => response.json())
      .then((data) => setGalleries(data));
  }, []);
  let galleryOwner = useParams().name;
  let wantedGallery = galleries.filter((item) => {
    return item.owner === galleryOwner;
  });
  return (
    <>
      <div className="gallery-show-header">
        <h1>{galleryOwner} Gallery</h1>
        <hr />
      </div>

      <div className="galleries-container">
        {wantedGallery.map((item, index) => {
          return <GalleryCard gallery={item} key={index} />;
        })}
      </div>
    </>
  );
}

export default GalleryShow;
