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
      .then((data) => setGalleries(data));
  }, []);
  let galleryOwner = useParams().name;
  let wantedGallery = galleries.filter((item) => {
    return item.owner === galleryOwner;
  });
  // let gImages;
  // const callBack = (images) => {
  //   // creatng image obsever
  //   let observer = new IntersectionObserver((entries, observer) => {
  //     entries.forEach((entry) => {
  //       if (!entry.isIntersecting) return;
  //       let galleryCard = entry.target;
  //       galleryCard.querySelector("gallery-image").src = galleryCard
  //         .querySelector("gallery-image")
  //         .getAttribute("data-src");
  //       observer.unobserve(galleryCard);
  //     });
  //   });
  //   // getting all gallery images
  //   // let images = document.querySelector(".gallery-card");
  //   images.forEach((image) => {
  //     observer.observe(image);
  //   });
  // };
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
