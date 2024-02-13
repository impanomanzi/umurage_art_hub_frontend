import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";
import settings from "../settings.json";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
function Profile(props) {
  const { onLogout, exhibitions, paintings } = props;
  const navigate = useNavigate();

  const logout = () => {
    fetch(`${settings.server_domain}/custom-admin-logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate("/sign-in");
          localStorage.removeItem("authKey");
          localStorage.removeItem("session");
          localStorage.removeItem("userId");
          localStorage.removeItem("username");
          props.onLogout(false);
        }
      });
  };

  return (
    <div className="dashboard-container">
      <div className="profile-container">
        <div>
          <NavBar
            username="Rafiki"
            logout={logout}
            exhibitions={exhibitions}
            paintings={paintings}
          />
        </div>
        <div className="profile-main">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default Profile;
