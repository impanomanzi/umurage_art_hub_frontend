import "./Gallery.css";
import "../ExhibitionCard/ExhibitionCard.css";
import "bootstrap/dist/css/bootstrap.css";
import HomeProjectsSlider from "../HomeProjectsSlider/HomeProjectsSlider";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function Gallery(props) {
  const { paintings } = props;
  const [fixedGalleryOwner, setFixedGalleryOnwer] = useState([]);
  const [galleryOwner, setGalleryOwner] = useState([]);
  const [galleries, setGalleries] = useState(paintings?.data);
  const [galleryLoading, setGalleryLoading] = useState(true);

  // function to remove dupplication from an array
  const removeDuplication = (array) => {
    let clearArray = [];

    for (let i = 0; i < array?.length; i++) {
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
    let galleryOwners = galleries?.map((item, index) => {
      return item.owner;
    });
    setGalleryOwner(removeDuplication(galleryOwners));
    setFixedGalleryOnwer(removeDuplication(galleryOwners));
  }, []);

  return (
    <div className="gallery-outer-container">
      <div
        className="btn-group"
        role="group"
        aria-label="button group for filtering and sorting exhibitions"
      >
        <input
          type="text"
          placeholder="Search by gallery name"
          className="search-input"
          onChange={(event) => {
            let searchResult = fixedGalleryOwner.filter((item) => {
              return item.toLowerCase().startsWith(event.target.value);
            });
            setGalleryOwner(searchResult);
          }}
        />
        <button className="btn btn-primary">
          <i className="fas fa-search"></i>
        </button>
      </div>
      {galleryLoading && (
        <div className="skeletons">
          <div className="gallery-loading" style={{ color: "black" }}>
            <center>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </center>
          </div>
        </div>
      )}
      <div className="message"></div>
      <div className="gallery-container">
        {galleryOwner.map((item, index) => {
          galleryLoading ? setGalleryLoading(false) : null;
          return (
            <div
              key={index}
              className="gallery-home-card"
              style={{ borderColor: "#cbcfd4", borderWidth: "20px" }}
            >
              <h3
                className="lead h3"
                style={{ color: "black", fontWeight: 600 }}
              >
                {item}
              </h3>
              <Link to={`/gallery/${item}`}>
                <HomeProjectsSlider
                  projects={galleries.filter((innerItem) => {
                    return innerItem.owner === item;
                  })}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;
