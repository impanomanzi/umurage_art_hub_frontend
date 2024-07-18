import "./HomeNavBar.css";
import settings from "../settings.json";
function FormNavbar() {
  return (
    <>
      <div
        className="homenavbar-container  navbar-expand-sml navbar-light bg-light"
        id="top"
      >
        <img className="navbar-brand" src="/UMURAGE HEADER.png" alt="" />
        <span>
          <h5 className="nav-header">{settings.site_name.toUpperCase()}</h5>
        </span>
        <span>&nbsp;</span>
      </div>
    </>
  );
}

export default FormNavbar;
