import "./NavBar.css";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.css";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
function NavBar(props) {
  const user = useUser();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="profile-top-nav-container home-navbar bg-light">
      <div className="home-navbar__logo " id="NavBarLogo">
        <img src="/UMURAGE HEADER.png" alt="" />
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
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onKeyDown={() => setOpenMenu(false)}
        >
          <ListItem>
            <ListItemButton>
              <ListItemText className="menu-text">Menu</ListItemText>
            </ListItemButton>
          </ListItem>
          <List className="drawer">
            <ListItem>
              <ListItemButton onClick={() => setOpenMenu(!openMenu)}>
                <Link to={"dash"} style={styles.navItemText}>
                  Dashboard
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <Link
                  to={"exhibitions"}
                  style={styles.navItemText}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  Exhibitions
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <Link
                  to={"exhibition_paintings"}
                  style={styles.navItemText}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  Exhibition Paintings
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <Link
                  to={"painters"}
                  style={styles.navItemText}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  Painters
                </Link>
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
                  to={"paintings"}
                  style={styles.navItemText}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  Paintings
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <Link
                  to={"customers"}
                  style={styles.navItemText}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  Customers
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

export default NavBar;
