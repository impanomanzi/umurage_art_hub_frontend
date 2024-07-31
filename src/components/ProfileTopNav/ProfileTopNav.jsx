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
    <div className="profile-top-nav-container">
      <div className="home-navbar__logo" id="NavBarLogo">
        <Link to={"/"}>
          <img src="/UMURAGE HEADER.png" alt="" width={"100px"} />
        </Link>
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
          onClick={() => setOpenMenu(false)}
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
      <span>
        <h5 className="h5">
          <i className="fas fa-shield-alt"></i>&nbsp;PAINTER
        </h5>
        &nbsp;|&nbsp; <i>{user.user}</i>
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
