import "./ProfileTopNav.css";
import PainterCreationForm from "../Forms/PainterCreationForm/PainterCreationForm";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import settings from "../settings.json";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
function ProfileTopNav() {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const handleOpenDropDown = (event) => {
    if (document.querySelector(".nav-dropdown").style.display === "none") {
      document.querySelector(".nav-dropdown").style.display = "block";
    } else {
      document.querySelector(".nav-dropdown").style.display = "none";
    }
  };
  const logout = () => {
    fetch(`${settings.server_domain}/custom-logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.removeItem("session");
          localStorage.removeItem("userId");
          navigate("/");
        }
      });
  };
  return (
    <div className="profile-top-nav-container home-navbar">
      <div className="home-navbar__logo" id="NavBarLogo">
        <img src="/UMURAGE HEADER.png" alt="" />
      </div>
      <Drawer
        className="user-profile-drawer"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        anchor="right"
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onclick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <center>
            <h1 className="h4">Menu</h1>
          </center>
          <List className="drawer">
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <i className="fas fa-newspaper"></i>
                </ListItemIcon>
                <ListItemText primary={"Blogs"} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <i className="fas fa-eye"></i>
                </ListItemIcon>
                <ListItemText primary={"Exhibitions"} />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <i className="fas fa-user "></i>
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <i className="fas fa-sign-out-alt "></i>
                </ListItemIcon>
                <ListItemText primary="logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <span>
        <h5 className="h5">
          {" "}
          <i className="fas fa-shield-alt"></i>&nbsp;PAINTER DASHBOARD
        </h5>
        &nbsp;|&nbsp; <i>{localStorage.getItem("username")}</i>
      </span>
      <div className="navbar-menu">
        <button
          onClick={() => setOpenMenu(true)}
          className="menu-button-bars btn btn-outline-secondary"
          style={{ color: "black" }}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </div>
  );
}

export default ProfileTopNav;
