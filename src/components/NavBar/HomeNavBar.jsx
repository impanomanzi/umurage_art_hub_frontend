import "./HomeNavBar.css";
import { Link } from "react-router-dom";
import settings from "../settings.json";

function HomeNavBar() {
  return (
    <>
      <div
        className="homenavbar-container  navbar-expand-sml navbar-light bg-light"
        id="top"
      >
        <img className="navbar-brand" src="/UMURAGE HEADER.png" alt="" />
        <span>
          <h5 className="h5">{settings.site_name.toUpperCase()}</h5>
        </span>

        <Link
          to="/sign-in"
          style={{
            marginRight: "0.5rem",
            backgroundColor: "transparent",
            color: "white",
          }}
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#
navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {" "}
          <button className="btn btn-outline-primary">
            <i className="fas fa-unlock" style={{ color: "black" }}></i>
          </button>
        </Link>
      </div>
    </>
  );
}

export default HomeNavBar;
