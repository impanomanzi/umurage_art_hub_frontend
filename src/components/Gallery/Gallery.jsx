import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./Gallery.css";
import "../ExhibitionCard/ExhibitionCard.css";
// import galleries from "../db/galleries.json";
import GalleryCard from "../GalleryCard/GalleryCard";
import GalleriesContainer from "../GalleriesContainer/GalleriesContainer";
import HomeProjectsSlider from "../HomeProjectsSlider/HomeProjectsSlider";
import { Link } from "react-router-dom";
import settings from "../settings.json";
function Gallery(props) {
  const [galleries, setGalleries] = useState([]);
  // gettings galleries from server
  useEffect(() => {
    fetch(`${settings.server_domain}/get_paintings`)
      .then((response) => response.json())
      .then((data) => setGalleries(data));
  }, []);
  // function to remove dupplication from an array
  const removeDuplication = (array) => {
    // console.log(array);
    let clearArray = [];

    for (let i = 0; i < array.length; i++) {
      let found = false;
      for (let j = 0; j < clearArray.length; j++) {
        if (array[i] === clearArray[j]) {
          found = true;
        }
      }
      if (found === false) {
        clearArray.push(array[i]);
      }
    }
    return clearArray;
  };
  let galleryOwners = galleries.map((item, index) => {
    return item.owner;
  });
  let galleryOwner = removeDuplication(galleryOwners);

  return (
    <>
      <div className="gallery-header">
        <hr />
        <h2>
          Galleries <i className="fas fa-arrow-down"></i>
        </h2>
        <hr />
      </div>
      <div className="gallery-container">
        {galleryOwner.map((item, index) => {
          return (
            <div key={index}>
              <h3 style={{ color: "#ffcc99" }}>{item}</h3>
              <Link to={`/gallery/${item}`}>
                <HomeProjectsSlider
                  projects={galleries.filter((innerItem) => {
                    return innerItem.owner === item;
                  })}
                />
              </Link>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Gallery;
