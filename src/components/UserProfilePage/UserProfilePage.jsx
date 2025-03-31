import ProfileTopNav from "../ProfileTopNav/ProfileTopNav";
import ProfileBottomNav from "../ProfileBottomNav/ProfileBottomNav";
import "./UserProfilePage.css";
import { Outlet } from "react-router-dom";
import useMoto from "../../hooks/useMoto";
import { useEffect } from "react";
function UserProfilePage(props) {
  const{setViewMoto}= useMoto()
  useEffect(()=>{
    setViewMoto(false)
  },[])

  return (
    <div className="dashboard-container">
      <div className="profile-container">
      <ProfileTopNav />
      <div className="profile-main">
        <ProfileBottomNav />
        <Outlet />
      </div>
      </div>
      
    </div>
  );
}

export default UserProfilePage;
