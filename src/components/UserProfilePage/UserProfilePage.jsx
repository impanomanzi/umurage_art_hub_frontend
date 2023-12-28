import React from "react";
import { useState, useEffect } from "react";
import ProfileTopNav from "../ProfileTopNav/ProfileTopNav";
import ProfileBottomNav from "../ProfileBottomNav/ProfileBottomNav";
import settings from "../settings.json";
import GalleryCard from "../GalleryCard/GalleryCard";
// import useHistory from "react-router-dom";
import "./UserProfilePage.css";
function UserProfilePage(props) {
  // let history = useHistory();
  const [galleries, setGalleries] = useState([]);
  // gettings galleries from server
  useEffect(() => {
    fetch(`${settings.server_domain}/get_paintings`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (!data.authorized) {
          console.log(data);
        } else {
          console.log(data);

          setGalleries(data);
        }
      });
  }, []);
  return (
    <div className="home-main-container">
      <ProfileTopNav />

      <div className="galleries-container">
        {galleries.map((item, index) => {
          return <GalleryCard gallery={item} key={index} />;
        })}
      </div>
      <ProfileBottomNav />
    </div>
  );
}

export default UserProfilePage;
