import React from "react";
import "./ProfileBottomNav.css";

function ProfileBottomNav() {
  return (
    <div className="profile-bottom-nav-container">
      <div className="home-area">
        <button>
          <i className="fas fa-home"></i>
        </button>
      </div>
      <div className="add-area">
        <button>
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="contact-area">
        <button>
          <i className="fas fa-user-circle"></i>
        </button>
      </div>
    </div>
  );
}

export default ProfileBottomNav;
