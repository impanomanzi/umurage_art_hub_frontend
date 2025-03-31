import "./Gallery.css";
import "../ExhibitionCard/ExhibitionCard.css";
import "bootstrap/dist/css/bootstrap.css";
import { useMemo, useState,useCallback } from "react";
import usePaintings from "../../hooks/usePaintings";
import { removeDuplication } from "../../lib/removeDuplication";
import { useNavigate } from "react-router-dom";
import HomeProjectSlider from "../HomeProjectsSlider/HomeProjectsSlider";
function Gallery() {
  const { paintings } = usePaintings();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const filteredGalleries = useMemo(
    () =>
      paintings?.data?.filter((gallery) =>
        gallery.owner.toLowerCase().includes(query.toLocaleLowerCase())
      ),
    [paintings, query]
  );

  const galleryOwners = useMemo(() => {
    const galleryOwners = filteredGalleries?.map((gallery) => gallery.owner);
    return removeDuplication(galleryOwners);
  }, [filteredGalleries]);
  const gotoGallery= useCallback((painter)=>navigate(`/gallery/${painter}`),[ paintings])

  return (
    <>
    <p className="section-description">
      Explore our vibrant gallery, where each artist's unique collection is displayed in a stunning carousel. Simply click on a painting to discover more about the artist and their full range of work. Each section is dedicated to a different painter, offering a seamless journey through their artistic world.</p>
     <div className="gallery-outer-container">
      <div
        className="btn-group search-box-container"
        role="group"
        aria-label="button group for filtering and sorting exhibitions"
      >
        <input
          type="text"
          placeholder="Search by gallery name"
          className="search-input"
          onChange={(event) => setQuery(event.target.value)}
         
        />
       
      </div>
       
      <div className="gallery-container">
        {galleryOwners.length>0?galleryOwners.map((owner, index) => {
          return (
            <div
              key={index}
              className="gallery-home-card"
              style={{ borderColor: "#cbcfd4", borderWidth: "20px" }}
            >
              <h3
                className="gallery_name"
                 
              >
                {owner}
              </h3>
            
                 
                    <HomeProjectSlider
                      projects={filteredGalleries.filter((gallery) => {
                        return gallery.owner === owner;
                      })}
                       onClick= {()=>gotoGallery(owner)}
                    />
                
              
            </div>
          );
        }):<p>No Gallery found</p>}
      </div>
    </div></>
   
  );
}

export default Gallery;
