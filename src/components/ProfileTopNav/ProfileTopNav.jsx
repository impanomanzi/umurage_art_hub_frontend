import React, { useState } from "react";
import "./ProfileTopNav.css";
import { HiOutlineBars3 } from "react-icons/hi2";
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
    <div className="profile-top-nav-container">
      <h2>Umurage art hub</h2>
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
          <h2>{localStorage.getItem("username")}</h2>
          <List className="drawer">
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <i className="fas fa-grip-vertical"></i>
                </ListItemIcon>
                <ListItemText primary={"Gallery"} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={logout}>
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
      <div className="menu-area">
        <button>
          <b>Gallery</b>
        </button>

        <button>
          <b>Blogs</b>
        </button>

        <button>
          <b>Exhibitions</b>
        </button>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={handleOpenDropDown}
            onMouseEnter={handleOpenDropDown}
          >
            <i className="fas fa-user-circle"></i> &nbsp;
            {localStorage.getItem("username")}
          </button>
          <div
            className={`dropdown-menu nav-dropdown`}
            aria-labelledby="dropdownMenuButton"
            onMouseLeave={() => {
              document.querySelector(".nav-dropdown").style.display = "none";
            }}
          >
            <button className="dropdown-item" onClick={logout}>
              <i className="fas fa-sign-out-alt "></i>&nbsp;Logout
            </button>
          </div>
        </div>
      </div>
      <div className="navbar-menu">
        <button onClick={() => setOpenMenu(true)} className="menu-button-bars">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </div>
  );
}

export default ProfileTopNav;
