import React, { useState } from "react";
import "./ProfileTopNav.css";
import { HiOutlineBars3 } from "react-icons/hi2";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
function ProfileTopNav() {
  const [openMenu, setOpenMenu] = useState(false);
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
          <h2>Umurage art hub</h2>
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
                  <i className="fas fa-user-circle"></i>
                </ListItemIcon>
                <ListItemText primary={<span>ISAE</span>} />
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
        <div className="profile-pic-area">
          <span>
            <i className="fas fa-user-circle"></i>
          </span>
          <span>ISAE</span>
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
