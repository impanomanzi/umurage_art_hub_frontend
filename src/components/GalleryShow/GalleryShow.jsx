import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import GalleryCard from "../GalleryCard/GalleryCard";
import "./GalleryShow.css";
import FormNavbar from "../NavBar/FormNavbar";
import { PaintingAndExhibitionsContext } from "../Contexts/PaintingAndExhibitionsContext";
function GalleryShow(props) {
  const { exhibitions, paintings } = useContext(PaintingAndExhibitionsContext);
  const [viewImageViewer, setViewImageViewer] = useState(false);
  const galleryOwner = useParams().name;
  const [currentPainting, setCurrentPainting] = useState({});
  const wantedGallery = paintings.data.filter((item) => {
    return item.owner === galleryOwner;
  });
  const [fixedGalleries, setFixedGalleries] = useState(wantedGallery);
  const [galleries, setGalleries] = useState(wantedGallery);
  const [filterDropdownText, setFilterDropdownText] = useState("Filter only");

  const closeFilterDropdown = () => {
    if (document.querySelector(".f-dropdown-menu").style.display === "none") {
      document.querySelector(".f-dropdown-menu").style.display = "block";
    } else {
      document.querySelector(".f-dropdown-menu").style.display = "none";
    }
  };

  const closeImageViewer = () => {
    setViewImageViewer(false);
  };
  const showImageViewer = (event, painting) => {
    event.preventDefault();
    setViewImageViewer(true);
    setCurrentPainting(painting);
  };

  return (
    <>
      <FormNavbar />
      <div className="gallery-shw">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ marginLeft: "1em" }}>
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
        </div>

        <div className="row">
          {galleries.map((item, index) => {
            return (
              <>
                <GalleryCard
                  gallery={item}
                  key={index}
                  likes={item.likes}
                  onImageClicked={showImageViewer}
                />
              </>
            );
          })}
        </div>
      </div>

      {viewImageViewer && (
        <div className="my-image-viewer">
          <button className="btn btn-danger" onClick={closeImageViewer}>
            <i className="fas fa-times"></i>
          </button>
          <div className="inner-image-viewer">
            <img src={currentPainting.image} />
          </div>
          <div className="painting-description">
            <h4>Description</h4>
            <span className="desc-data">
              <p className="lead">Name</p>
              {currentPainting.name}
            </span>
            <span className="desc-data">
              <p className="lead">Category</p>
              {currentPainting.category}
            </span>
            <span className="desc-data">
              <p className="lead">Owner</p>
              {currentPainting.owner}
            </span>
            <span className="desc-data">
              <p className="lead">Phone</p>
              {currentPainting.phone}
            </span>
            <span className="desc-data">
              <p className="lead">Created</p>
              {currentPainting.created}
            </span>
            <span className="desc-data">
              <p className="lead">Likes</p>
              {currentPainting.likes}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default GalleryShow;
