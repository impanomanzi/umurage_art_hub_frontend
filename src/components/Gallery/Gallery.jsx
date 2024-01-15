import React, { useEffect, useState } from "react";
import "./Gallery.css";
import "../ExhibitionCard/ExhibitionCard.css";
import "bootstrap/dist/css/bootstrap.css";
import HomeProjectsSlider from "../HomeProjectsSlider/HomeProjectsSlider";
import { Link } from "react-router-dom";
import settings from "../settings.json";
function Gallery(props) {
  const [fixedGalleryOwner, setFixedGalleryOnwer] = useState([]);
  const [galleryOwner, setGalleryOwner] = useState([]);
  const [galleries, setGalleries] = useState([]);

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
  // gettings galleries from server
  useEffect(() => {
    fetch(`${settings.server_domain}/get_paintings`, {
      cache: "force-cache",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setGalleries(data.data);
          let galleryOwners = data.data.map((item, index) => {
            return item.owner;
          });
          setGalleryOwner(removeDuplication(galleryOwners));
          setFixedGalleryOnwer(removeDuplication(galleryOwners));
        } else {
        }
      });
  }, []);

  return (
    <div className="gallery-outer-container">
      <div
        class="btn-group"
        role="group"
        aria-label="button group for filtering and sorting exhibitions"
      >
        <input
          type="text"
          placeholder="Search by gallery name"
          onChange={(event) => {
            let searchResult = fixedGalleryOwner.filter((item) => {
              return item.toLowerCase().startsWith(event.target.value);
            });
            setGalleryOwner(searchResult);
          }}
        />
        <button className="btn btn-outline-primary">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className="skeletons">
        <div className="gallery-loading" style={{ color: "black" }}>
          <center>
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
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
