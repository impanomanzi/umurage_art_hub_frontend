import "./Gallery.css";
import "../ExhibitionCard/ExhibitionCard.css";
import "bootstrap/dist/css/bootstrap.css";
import HomeProjectsSlider from "../HomeProjectsSlider/HomeProjectsSlider";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import usePaintings from "../../hooks/usePaintings";
import { removeDuplication } from "../../lib/removeDuplication";
function Gallery() {
  const { paintings } = usePaintings();
  const [query, setQuery] = useState("");

  const filteredGalleries = useMemo(
    () =>
      paintings?.data?.filter((gallery) =>
        gallery.owner.toLowerCase().includes(query)
      ),
    [paintings, query]
  );

  const galleryOwners = useMemo(() => {
    const galleryOwners = filteredGalleries?.map((gallery) => gallery.owner);
    return removeDuplication(galleryOwners);
  }, [filteredGalleries]);

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
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="btn btn-primary">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className="message"></div>
      <div className="gallery-container">
        {galleryOwners.map((owner, index) => {
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
                {owner}
              </h3>
              <Link to={`/gallery/${owner}`}>
                <HomeProjectsSlider
                  projects={filteredGalleries.filter((gallery) => {
                    return gallery.owner === owner;
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
