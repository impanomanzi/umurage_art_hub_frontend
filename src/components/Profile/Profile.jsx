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
  let userId = useParams().id;
  const validateUser = () => {
    fetch(`${settings.server_domain}/api/authorize/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          let content = (
            <div className="profile-container">
              <div>
                <NavBar username="Rafiki" />
              </div>
              <div className="profile-main">
                <Dashboard />
              </div>
            </div>
          );
          let container = document.querySelector(".dashboard-container");
          ReactDOM.createRoot(container).render(content);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        navigate("/");
      });
  };
  validateUser();
  return (
    <div className="dashboard-container">
      <p className="alert alert-warning">Authenticating please wait ...</p>
    </div>
  );
}

export default Profile;
