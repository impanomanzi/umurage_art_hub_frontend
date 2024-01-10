import React from "react";
import ReactDOM from "react-dom/client";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";
import Home from "../Home/Home";
import ProfileHome from "../ProfileHome/ProfileHome";
import Exhibitions from "../Exhibitions/Exhibitions";
import NotFound from "../NotFound/NotFound";
import settings from "../settings.json";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
function Profile() {
  let navigate = useNavigate();
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
  let userId = useParams().id;

  return (
    <div className="dashboard-container">
      <div className="profile-container">
        <div>
          <NavBar username="Rafiki" logout={logout} />
        </div>
        <div className="profile-main">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default Profile;
