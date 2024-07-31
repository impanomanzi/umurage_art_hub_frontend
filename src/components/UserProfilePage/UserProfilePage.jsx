import ProfileTopNav from "../ProfileTopNav/ProfileTopNav";
import ProfileBottomNav from "../ProfileBottomNav/ProfileBottomNav";
import "./UserProfilePage.css";
import { Outlet } from "react-router-dom";
function UserProfilePage(props) {
  return (
    <div className="home-main-container">
      <ProfileTopNav />

      <div className="user user-main">
        <ProfileBottomNav />
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfilePage;
