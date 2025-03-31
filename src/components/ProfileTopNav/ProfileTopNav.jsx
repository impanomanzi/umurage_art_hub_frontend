import { useState } from "react";
import "./ProfileTopNav.css";
import { Link } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import useUser from "../../hooks/useUser";
function ProfileTopNav(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const user = useUser();
  return (
    <div className="profile-top-nav-container home-navbar bg-light">
      <div className="home-navbar__logo" id="NavBarLogo">
        <Link to={"/"}>
          <img src="/UMURAGE HEADER.png" alt="" width={"100px"} />
        </Link>
      </div>
      <span>
        <h5 className="h5">
          <i className="fas fa-shield-alt"></i>&nbsp;ADMIN
        </h5>
        &nbsp;|&nbsp; <i>{user.user}</i>
      </span>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "right",
          justifyItems: "right",
          alignItems: "right",
        }}
      >
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="menu-button-bars btn btn-outline-secondary "
          style={{
            marginRight: "0.5rem",
            backgroundColor: "transparent",
            color: "black",
          }}
          onMouseEnter={() => setOpenMenu(!openMenu)}
        >
          <i className="fas fa-bars"></i>
        </button>
      </span>
      <Drawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        anchor="right"
        className="user-profile-drawer"
        style={{ zIndex: 12001 }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onKeyDown={() => setOpenMenu(false)}
        >
          <List className="drawer">
            <ListItem>
              <ListItemButton>
                <ListItemText className="menu-text">Menu</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <Link
                  to={"blogs"}
                  style={styles.navItemText}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  Blogs
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <Link
                  to={"profile"}
                  style={styles.navItemText}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  Profile
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <Link
                  to={"change_password"}
                  style={styles.navItemText}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  Change password
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <Link
                  to={"/logout"}
                  style={styles.navItemText}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  Logout
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
  
    </div>
  );
}

const styles = {
  navItemText: {
    textDecoration: "none",
    fontSize: "1.2em",
    fontWeight: 120,
    color: "black",
    width: "100%",
  },
};

export default ProfileTopNav;
