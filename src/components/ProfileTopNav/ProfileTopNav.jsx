import { useState } from "react";
import { lazy } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileTopNav.css";
import { exhibitionKeywords, blogKeywords } from "../KeyWords/Keywords";
import { API } from "../../API/serverRequest";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import toast from "react-hot-toast";
function ProfileTopNav(props) {
  const ListView = lazy(() => import("../ListView/ListView"));

  const renderProfilePage = () => {
    props.onChangeComponent("profile");
    setOpenMenu(false);
  };
  const renderPasswordChangeForm = () => {
    props.onChangeComponent("password");
    setOpenMenu(false);
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  const renderList = async (list) => {
    props.onChangeComponent("profile");
    await timeout(10);
    props.onChangeComponent("list");
    props.onChangeList(list);
  };

  const renderExhibitions = () => {
    renderList(
      <ListView
        items={props.exhibitions}
        title="Exhibtions"
        keyword={exhibitionKeywords}
        options={[]}
      />
    );
  };

  const renderBlogs = async () => {
    try {
      const data = await API.getBlogs();
      if (data.success)
        renderList(
          <ListView
            items={data.data}
            options={[]}
            keyword={blogKeywords}
            title="Blogs"
          />
        );
      else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(String(error));
    }

    setOpenMenu(false);
  };
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
  };
  const getCurrentUserId = () => {
    let userId;
    try {
      userId = jwtDecode(localStorage.getItem("token")).user;
      return userId;
    } catch (error) {
      navigate("/sign-in");
      toast.error("your session expired");
    }
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
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <center>
            <h1 className="h4">Menu</h1>
          </center>
          <List className="drawer">
            <ListItem>
              <ListItemButton onClick={renderBlogs}>
                <ListItemIcon>
                  <i className="fas fa-newspaper"></i>
                </ListItemIcon>
                <ListItemText primary={"Blogs"} />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton onClick={renderProfilePage}>
                <ListItemIcon>
                  <i className="fas fa-user "></i>
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={renderPasswordChangeForm}>
                <ListItemText primary="Change password" />
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
        &nbsp;|&nbsp; <i>{getCurrentUserId()}</i>
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
