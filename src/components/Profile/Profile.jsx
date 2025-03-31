import NavBar from "../NavBar/NavBar";
import "./Profile.css";
import { Outlet } from "react-router-dom";

function Profile(props) {
  return (
    <div className="dashboard-container">
      <div className="profile-container">
        
          <NavBar />
         
        <div className="profile-main">
          <Outlet />
        </div>
      </div>
     
    </div>
  );
}

 

export default Profile;
