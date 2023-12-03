import React from "react";
import { useState, useEffect } from "react";
import ProfileTopNav from "../ProfileTopNav/ProfileTopNav";
import ProfileBottomNav from "../ProfileBottomNav/ProfileBottomNav";
import settings from "../settings.json";
import GalleryCard from "../GalleryCard/GalleryCard";
import "./UserProfilePage.css";
function UserProfilePage() {
  const [galleries, setGalleries] = useState([]);
  // gettings galleries from server
  useEffect(() => {
    fetch(`${settings.server_domain}/get_paintings`)
      .then((response) => response.json())
      .then((data) => setGalleries(data));
  }, []);
  return (
    <div>
      <ProfileTopNav />
      {/* <div className="profile-header">
        <h2>
          <center>
            <em>Recents</em>
          </center>
          <hr />
        </h2>
      </div> */}

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
