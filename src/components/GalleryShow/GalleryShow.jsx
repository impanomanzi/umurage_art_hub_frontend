import React from "react";
// import galleries from "../db/galleries.json";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GalleryCard from "../GalleryCard/GalleryCard";
import "./GalleryShow.css";
import settings from "../settings.json";
import FormNavbar from "../NavBar/FormNavbar";
function GalleryShow(props) {
  const [fixedGalleries, setFixedGalleries] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const galleryOwner = useParams().name;
  const [dropdownText, setDropdownText] = useState("Sort by");
  const [filterDropdownText, setFilterDropdownText] = useState("Filter");
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
  // gettings galleries from server
  useEffect(() => {
    fetch(`${settings.server_domain}/get_paintings`)
      .then((response) => response.json())
      .then((data) => {
        let wantedGallery = data.data.filter((item) => {
          return item.owner === galleryOwner;
        });
        setGalleries(wantedGallery);
        setFixedGalleries(wantedGallery);
      });
  }, []);

  return (
    <div className="gallery-shw">
      <FormNavbar />

      <div
        className="btn-group"
        role="group"
        aria-label="button group for filtering and sorting gallery painting"
      >
        <span style={{ color: "white", opacity: "50%" }}>
          <h1 className="h3">{galleryOwner} Gallery&nbsp;&nbsp;&nbsp;</h1>
        </span>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={closeExDropdown}
            onMouseEnter={() => {
              closeExDropdown();
              document.querySelector(".f-dropdown-menu").style.display = "none";
            }}
          >
            <i className="fas fa-sort-amount-down"></i>&nbsp; {dropdownText}
          </button>
          <div
            className="dropdown-menu g-dropdown-menu"
            aria-labelledby="dropdownMenu1"
            onMouseLeave={() => {
              document.querySelector(".g-dropdown-menu").style.display = "none";
            }}
          >
            <button
              className="dropdown-item"
              onClick={(event) => {
                let sortedByDate = galleries.sort((a, b) => {
                  a = Date.parse(`${a.created}`);
                  b = Date.parse(`${b.created}`);
                  return a - b;
                });
                setGalleries(sortedByDate);
                document.querySelector(".g-dropdown-menu").style.display =
                  "none";
              }}
            >
              <i className="fas fa-sort-alpha-down"></i> &nbsp; Date
            </button>
          </div>
        </div>

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
              document.querySelector(".g-dropdown-menu").style.display = "none";
            }}
          >
            <i className="fas fa-filter"></i>&nbsp; {filterDropdownText}
          </button>
          <div
            className="dropdown-menu f-dropdown-menu"
            aria-labelledby="dropdownMenu1"
            onMouseLeave={() => {
              document.querySelector(".f-dropdown-menu").style.display = "none";
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
              }}
            >
              Potraits
            </button>
            <button
              className="dropdown-item"
              onClick={(event) => {
                setFilterDropdownText("All");
                setGalleries(fixedGalleries);
              }}
            >
              Default
            </button>
          </div>
        </div>
      </div>

      <div className="galleries-container">
        {galleries.map((item, index) => {
          return <GalleryCard gallery={item} key={index} likes={item.likes} />;
        })}
      </div>
    </div>
  );
}

export default GalleryShow;
