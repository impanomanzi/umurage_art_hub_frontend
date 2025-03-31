import "./HomeNavBar.css";
import settings from "../settings.json";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
function FormNavbar({ header, profile, onProfileBtnClicked }) {
  return (
    <>
      <div
        className="homenavbar-container  navbar-expand-sml navbar-light bg-light"
        id="top"
      >
        <Link to={"/"}>
          <img className="navbar-brand" src="/UMURAGE HEADER.png" alt="" />
        </Link>
        <span>
          {header ? (
            <span style={{ marginLeft: "1em" }}>
              <h3>{header}</h3>
            </span>
          ) : (

            <span style={{ marginLeft: "1em" }}>
              <h3>{settings.site_name.toUpperCase()}</h3>
            </span>
            
          )}
        </span>
        <button
          className="btn btn-tertiary"
          style={{ zIndex: 1000 }}
          onClick={onProfileBtnClicked}
        >
          {profile && (
            <LazyLoadImage
              src={profile}
              effect="blur"
              placeholderSrc="/placeholder.png"
              width={"50px"}
              height={"50px"}
              style={{
                verticalAlign: " middle",
                width: "50px",
                height: "50px",
                borderRadius: "50% ",
                border: "2px solid black",
              }}
            />
          )}
        </button>
      </div>
    </>
  );
}

export default FormNavbar;
