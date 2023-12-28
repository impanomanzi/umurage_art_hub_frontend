import React from "react";
import NavBar from "../NavBar/NavBar";
import "./profile.css";
import Home from "../Home/Home";
import ProfileHome from "../ProfileHome/ProfileHome";
import Exhibitions from "../Exhibitions/Exhibitions";
import NotFound from "../NotFound/NotFound";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
function Profile() {
  // let currentUserId = localStorage.getItem("userId");
  // let currentAuthKey = localStorage.getItem("authKey");

  return (
    <>
      <div>
        <NavBar username="Rafiki" />
      </div>
      <div className="profile-main">
        <Dashboard />
      </div>
    </>
  );
}

export default Profile;
