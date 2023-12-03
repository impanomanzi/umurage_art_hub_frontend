import "./HomeNavBar.css";
import { Link } from "react-router-dom";

function HomeNavBar() {
  return (
    <>
      <div className="home-navbar" id="top">
        <div className="home-navbar__logo" id="NavBarLogo">
          <h1 className="gallery-hor">Umurage Art Hub</h1>
        </div>

        <Link to="/sign-in">
          <button className="primary">
            <i className="fas fa-unlock"></i>
          </button>
        </Link>
      </div>
    </>
  );
}

export default HomeNavBar;
