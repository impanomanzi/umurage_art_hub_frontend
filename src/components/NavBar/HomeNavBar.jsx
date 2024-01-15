import "./HomeNavBar.css";
import { Link } from "react-router-dom";

function HomeNavBar() {
  return (
    <>
      <div className="home-navbar" id="top">
        <div className="home-navbar__logo" id="NavBarLogo">
          <img src="/UMURAGE HEADER.png" alt="" />
        </div>

        <Link to="/sign-in">
          <button className="btn btn-outline-primary">
            <i className="fas fa-unlock"></i>
          </button>
        </Link>
      </div>
    </>
  );
}

export default HomeNavBar;
