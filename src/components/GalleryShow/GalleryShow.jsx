import { useMemo, useState, lazy, Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GalleryShow.css";
import usePaintings from "../../hooks/usePaintings";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary.jsx";
import ErrorComponent from "../ErrorComponent/ErrorComponent.jsx";
import Loading from "../loading/loading.jsx";
import Viewer from "react-viewer";
import { API } from "../../API/serverRequest.jsx";
import useToast from "../../hooks/useToast.jsx";
import ProfileViewer from "../ProfileViewer/ProfileViewer.jsx";

function GalleryShow() {
  const { setToast } = useToast();
  const FormNavbar = lazy(() => import("../NavBar/FormNavbar"));
  const GalleryCard = lazy(() => import("../GalleryCard/GalleryCard"));
  const { paintings } = usePaintings();
  const [visible, setVisible] = useState(false);
  const galleryOwner = useParams().name;
  const [currentPainting, setCurrentPainting] = useState({});
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
  const imageUrl = useMemo(() => {
    let index1 = currentPainting?.image?.indexOf("upload/") + "upload/".length;
    let newUrl =
      currentPainting?.image?.substring(0, index1) +
      "q_auto:best/" +
      currentPainting?.image?.substring(index1, currentPainting?.image?.length);
    return newUrl;
  }, [currentPainting]);

  const closeFilterDropdown = () => {
    if (document.querySelector(".f-dropdown-menu").style.display === "none") {
      document.querySelector(".f-dropdown-menu").style.display = "block";
    } else {
      document.querySelector(".f-dropdown-menu").style.display = "none";
    }
  };

  const showImageViewer = (event, painting) => {
    event.preventDefault();
    setVisible(true);
    setCurrentPainting(painting);
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <ErrorBoundary fallback={<ErrorComponent />}>
        <Suspense fallback={<Loading />}>
          <FormNavbar
            header={`${galleryOwner}`}
            profile={filteredGalleries[0]?.profile}
            onProfileBtnClicked={() => {
              setShowProfile(true);
            }}
          />
        </Suspense>
      </ErrorBoundary>
      <div className="gallery-shw">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              <ErrorBoundary fallback={<ErrorComponent />}>
                <Suspense fallback={<Loading />}>
                  <GalleryCard
                    gallery={item}
                    key={index}
                    likes={item.likes}
                    onImageClicked={showImageViewer}
                    id={item.id}
                  />
                </Suspense>
              </ErrorBoundary>
            );
          })}
        </div>
      </div>

      <Viewer
        visible={visible}
        onClose={() => setVisible(false)}
        className="image-viewer"
        images={[
          {
            src: imageUrl,
            alt: "",
          },
        ]}
        noImgDetails
        noNavbar
        changeable
      />

      <ProfileViewer
        show={showProfile}
        onHide={() => setShowProfile(false)}
        profile={profile}
      />
    </>
  );
}

export default GalleryShow;
