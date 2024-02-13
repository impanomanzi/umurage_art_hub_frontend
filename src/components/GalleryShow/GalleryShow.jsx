import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GalleryCard from "../GalleryCard/GalleryCard";
import "./GalleryShow.css";
import settings from "../settings.json";
import FormNavbar from "../NavBar/FormNavbar";
function GalleryShow(props) {
  const { paintings } = props;
  const galleryOwner = useParams().name;
  const wantedGallery = paintings.data.filter((item) => {
    return item.owner === galleryOwner;
  });
  const [fixedGalleries, setFixedGalleries] = useState(wantedGallery);
  const [galleries, setGalleries] = useState(wantedGallery);

  const [dropdownText, setDropdownText] = useState("Sort by");
  const [filterDropdownText, setFilterDropdownText] = useState("Filter only");
  const [observing, setObserving] = useState(true);
  const imageOptions = {};
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      let image = entry.target;
      image.classList.remove("skeleton");

      image.innerHTML = `<img src=${image.getAttribute(
        "data-src"
      )} class="card-img-top gallery-image" style="border-radius:1em"/>`;
      observer.unobserve(image);
    });
  }, {});
  const images = [];
  const closeExDropdown = () => {
    if (document.querySelector(".g-dropdown-menu").style.display === "none") {
      document.querySelector(".g-dropdown-menu").style.display = "block";
    } else {
      document.querySelector(".g-dropdown-menu").style.display = "none";
    }
  };

  const closeFilterDropdown = () => {
    if (document.querySelector(".f-dropdown-menu").style.display === "none") {
      document.querySelector(".f-dropdown-menu").style.display = "block";
    } else {
      document.querySelector(".f-dropdown-menu").style.display = "none";
    }
  };

  const closeImageViewer = () => {
    document.querySelector(".my-image-viewer").style.display = "none";
  };
  const showImageViewer = (event, image) => {
    event.preventDefault();

    const el = `
    <div  style="height:80vh; overflow-y:scroll">
      
     <center> <img src="${image}" class="img-fluid"/></center>
    </div>`;
    document.querySelector(".my-image-viewer").style.display = "block";
    document.querySelector(".my-image-viewer div").innerHTML = el;
  };

  return (
    <div className="gallery-shw">
      <div className="my-image-viewer" style={{ display: "none" }}>
        <button
          className="btn"
          style={{ color: "red" }}
          onClick={closeImageViewer}
        >
          <i className="fas fa-times"></i>
        </button>
        <div></div>
      </div>
      <FormNavbar />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <h2>{galleryOwner} Gallery</h2>
        </span>

        <div
          className="btn-group"
          role="group"
          aria-label="button group for filtering and sorting gallery painting"
        >
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={closeFilterDropdown}
              onMouseEnter={() => {
                closeFilterDropdown();
                document.querySelector(".g-dropdown-menu").style.display =
                  "none";
              }}
            >
              <i className="fas fa-filter"></i>&nbsp; {filterDropdownText}
            </button>
            <div
              className="dropdown-menu f-dropdown-menu"
              aria-labelledby="dropdownMenu1"
              onMouseLeave={() => {
                document.querySelector(".f-dropdown-menu").style.display =
                  "none";
              }}
            >
              <button
                className="dropdown-item"
                onClick={(event) => {
                  let filteredArray = fixedGalleries.filter((item) => {
                    return item.category == "Art work";
                  });
                  setFilterDropdownText("Art works");
                  setGalleries(filteredArray);
                  setObserving(false);
                }}
              >
                Art works
              </button>
              <button
                className="dropdown-item"
                onClick={(event) => {
                  let filteredArray = fixedGalleries.filter((item) => {
                    return item.category == "Potrait";
                  });
                  setFilterDropdownText("Potraits");
                  setGalleries(filteredArray);
                  setObserving(false);
                }}
              >
                Potraits
              </button>
              <button
                className="dropdown-item"
                onClick={(event) => {
                  setFilterDropdownText("All");
                  setGalleries(fixedGalleries);
                  setObserving(false);
                }}
              >
                Default
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* <div className="col-lg-4 col-md-12 mb-4 mb-lg-0"> */}
        {galleries.map((item, index) => {
          return (
            <>
              <GalleryCard
                gallery={item}
                key={index}
                likes={item.likes}
                observing={observing}
                onImageClicked={showImageViewer}
              />
              {document.querySelector(`#card-img-top${item.id}`)
                ? images.push(document.querySelector(`#card-img-top${item.id}`))
                : null}
              {images.forEach((image) => {
                imageObserver.observe(image);
              })}
            </>
          );
        })}
      </div>
    </div>
    // </div>
  );
}

export default GalleryShow;
