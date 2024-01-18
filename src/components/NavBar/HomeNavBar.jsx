import "./HomeNavBar.css";
import { Link } from "react-router-dom";

function HomeNavBar() {
  return (
    <>
      <div className="profile-top-nav-container home-navbar" id="top">
        <div className="home-navbar__logo" id="NavBarLogo">
          <img src="/UMURAGE HEADER.png" alt="" />
        </div>

        <Link
          to="/sign-in"
          style={{
            marginRight: "0.5rem",
            backgroundColor: "transparent",
            color: "white",
          }}
        >
          <button>
            <i className="fas fa-unlock"></i>
          </button>
        </Link>
      </div>
    </>
  );
}

export default HomeNavBar;
