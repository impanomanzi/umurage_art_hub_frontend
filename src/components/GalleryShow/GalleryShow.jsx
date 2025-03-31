import { useMemo, useState, lazy, Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GalleryShow.css";
import usePaintings from "../../hooks/usePaintings";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary.jsx";
import ErrorComponent from "../ErrorComponent/ErrorComponent.jsx";
import Loading from "../loading/loading.jsx";
import { API } from "../../API/serverRequest.jsx";
import useToast from "../../hooks/useToast.jsx";
import ProfileViewer from "../ProfileViewer/ProfileViewer.jsx";
import { Helmet } from "react-helmet-async";

function GalleryShow() {
  const { setToast } = useToast();
  const FormNavbar = lazy(() => import("../NavBar/FormNavbar"));
  const GalleryCard = lazy(() => import("../GalleryCard/GalleryCard"));
  const { paintings } = usePaintings();
  const galleryOwner = useParams().name;
  const [query, setQuery] = useState("");
  const [profile, setProfile] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  
  const getProfile = async () => {
    try {
      const resp = await API.getProfile(galleryOwner);
      if (resp.success) {
        setProfile(resp.data);
      } else {
        setToast({ variant: "danger", message: resp.message });
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
    }
  };
  const fixedGalleries = useMemo(
    () =>
      paintings.data.filter((item) => {
        return item.owner === galleryOwner;
      }),
    [paintings]
  );

  const filteredGalleries = useMemo(() =>
    fixedGalleries.filter(
      (item) => item.category.toLowerCase().includes(query.toLowerCase()),
      [fixedGalleries, query]
    )
  );
  

  const closeFilterDropdown = () => {
    if (document.querySelector(".f-dropdown-menu").style.display === "none") {
      document.querySelector(".f-dropdown-menu").style.display = "block";
    } else {
      document.querySelector(".f-dropdown-menu").style.display = "none";
    }
  };


  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Helmet>
        <title>{useParams().name} - Gallery</title>
        <meta
          name="description"
          content={`Explore the virtual gallery of ${
            useParams().name
          }, showcasing a stunning collection of portrait paintings and diverse artworks. Discover and buy original pieces from this talented artist.`}
        />
        <meta
          name="keywords"
          content={`${
            useParams().name
          }, Virtual Gallery, Portrait Paintings, Artworks, Online Art Exhibition, Digital Art Gallery, Buy Art Online,  ${
            useParams().name
          } Collection`}
        />
      </Helmet>
      <ErrorBoundary fallback={<ErrorComponent />}>
        <Suspense fallback={<Loading />}>
         <div className="gallery-nav">
         <FormNavbar
            header={`${useParams().name} - Gallery`}
            profile={filteredGalleries[0]?.profile}
            onProfileBtnClicked={() => {
              setShowProfile(true);
            }}
          />
         </div>
        </Suspense>
      </ErrorBoundary>
      <div className="gallery-shw main-section">
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="gallery-filter"
        >
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
                style={{ borderRadius: "0px" }}
              >
                <i className="fas fa-filter"></i>&nbsp;{" "}
                {query == "" ? "All" : query}
              </button>
              <div
                className="dropdown-menu f-dropdown-menu"
                aria-labelledby="dropdownMenu1"
                onMouseLeave={() => {
                  document.querySelector(".f-dropdown-menu").style.display =
                    "none";
                }}
                style={{ borderRadius: "0px" }}
              >
                <button
                  className="dropdown-item"
                  onClick={() => setQuery("Art work")}
                >
                  Art works
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => setQuery("Potrait")}
                >
                  Potraits
                </button>
                <button className="dropdown-item" onClick={() => setQuery("")}>
                  All
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {filteredGalleries.map((item, index) => {
            return (
              <ErrorBoundary fallback={<ErrorComponent />} key={index}>
                <Suspense fallback={<Loading />}>
                  <GalleryCard
                    gallery={item}
                    key={index}
                    likes={item.likes}
                    id={item.id}
                    
                  />
                </Suspense>
              </ErrorBoundary>
            );
          })}
        </div>
      </div>

      <ProfileViewer
        show={showProfile}
        onHide={() => setShowProfile(false)}
        profile={profile}
      />
    </>
  );
}
const styles = {
  backToTopButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },
};

export default GalleryShow;
