import React from "react";
// import galleries from "../db/galleries.json";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GalleryCard from "../GalleryCard/GalleryCard";
import "./GalleryShow.css";
import settings from "../settings.json";
import FormNavbar from "../NavBar/FormNavbar";
import ExhibtionPaintingCard from "../ExhibtionPaintingCard/ExhibtionPaintingCard";
function GalleryShow(props) {
  const [galleries, setGalleries] = useState([]);
  // gettings galleries from server
  useEffect(() => {
    fetch(`${settings.server_domain}/get_paintings`)
      .then((response) => response.json())
      .then((data) => {
        setGalleries(data.data);
      });
  }, []);
  let galleryOwner = useParams().name;
  let wantedGallery = galleries.filter((item) => {
    return item.owner === galleryOwner;
  });

  return (
    <div className="gallery-shw">
      <FormNavbar />

      <h1 id="gsh">{galleryOwner} Gallery</h1>
      <hr />

      <div className="galleries-container">
        {wantedGallery.map((item, index) => {
          let card = <GalleryCard gallery={item} key={index} />;

          return card;
        })}

        {/* {} */}
      </div>
    </div>
  );
}

export default GalleryShow;
