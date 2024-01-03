import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./Gallery.css";
import "../ExhibitionCard/ExhibitionCard.css";
import "bootstrap/dist/css/bootstrap.css";
import HomeProjectsSlider from "../HomeProjectsSlider/HomeProjectsSlider";
import { Link } from "react-router-dom";
import settings from "../settings.json";
function Gallery(props) {
  const [galleries, setGalleries] = useState([]);
  // gettings galleries from server
  useEffect(() => {
    let request = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    };
    fetch(`${settings.server_domain}/get_paintings`, request)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) setGalleries(data.data);
        else {
        }
      });
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
    <div className="gallery-outer-container">
      <div className="skeletons">
        <div className="gallery-loading" style={{ color: "black" }}>
          <center>
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
              <p className="lead">Loading Galleries</p>
            </div>
          </center>
        </div>
      </div>
      <div className="message"></div>
      <div className="gallery-container">
        {galleryOwner.map((item, index) => {
          document.querySelector(`.gallery-loading`).innerHTML = "";
          return (
            <div key={index} className="gallery-home-card">
              <h3 style={{ color: "inherit" }}>{item}</h3>
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
    </div>
  );
}

export default Gallery;
