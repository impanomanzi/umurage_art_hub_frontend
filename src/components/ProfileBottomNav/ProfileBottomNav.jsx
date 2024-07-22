import { Link } from "react-router-dom";
import "./ProfileBottomNav.css";

function ProfileBottomNav(props) {
  return (
    <div className="profile-bottom-nav-container">
      <div className="home-area">
        <Link className="btn btn-primary" to={"paintings"}>
          <i className="fas fa-home"></i>
        </Link>
      </div>
      <div className="add-area">
        <Link className="btn btn-primary" to={"paintings/add_painting"}>
          <i className="fas fa-plus"></i>
        </Link>
      </div>
      <div className="contact-area">
        <Link className="btn btn-primary" to={"profile"}>
          <i className="fas fa-user-circle"></i>
        </Link>
      </div>
    </div>
  );
}

export default ProfileBottomNav;
