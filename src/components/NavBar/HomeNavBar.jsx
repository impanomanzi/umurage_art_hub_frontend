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
        <Link to={"/"}>
          <img className="navbar-brand" src="/UMURAGE HEADER.png" alt="" />
        </Link>
        <span>
          <h5 className="nav-header">{settings.site_name.toUpperCase()}</h5>
        </span>

        <Link
          to="/sign-in"
          style={{
            marginRight: "0.5rem",
            backgroundColor: "transparent",
            color: "white",
            borderRadius: "0px",
          }}
          className="btn btn-outline-primary z-2"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-unlock-alt" style={{ color: "black" }}></i>
        </Link>
      </div>
    </>
  );
}

export default HomeNavBar;
