import "./HomeNavBar.css";
import settings from "../settings.json";
import { Link } from "react-router-dom";
function FormNavbar() {
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
        <span>&nbsp;</span>
      </div>
    </>
  );
}

export default FormNavbar;
