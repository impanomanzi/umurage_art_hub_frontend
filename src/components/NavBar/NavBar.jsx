import "./NavBar.css";
import React, { useState, useEffect } from "react";
// import Exhibitions from "../Exhibitions/Exhibitions";
// import ProfileHome from "../ProfileHome/ProfileHome";
import { HiOutlineBars3 } from "react-icons/hi2";
// import { Link } from "react-router-dom";
import ReactDOM from "react-dom/client";
import ExhibitionCreationForm from "../ExhibitionCreationForm/ExhibitionCreationForm";
import PainterCreationForm from "../PainterCreationForm/PainterCreationForm";
import BlogCreationForm from "../BlogCreationForm/BlogCreationForm";
import PaintingCreationForm from "../PaintingCreationForm/PaintingCreationForm";
import Dashboard from "../Dashboard/Dashboard";
// import exhibitions from "../db/exhibitions.json";
// import paintings from "../db/galleries.json";
import ListView from "../ListView/ListView";
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
function NavBar(props) {
  let navBaritems = [
    {
      text: "Dashboard",
      subHeadings: [
        {
          subText: "View",
          icon: "fas fa-eye",
          callBack: () => {
            ReactDOM.createRoot(document.querySelector(".profile-main")).render(
              <Dashboard />
            );
          },
        },
      ],
    },

    {
      text: "Exhibition",
      subHeadings: [
        {
          subText: "Create exhibition",
          icon: "fas fa-plus",
          callBack: () => {
            ReactDOM.createRoot(document.querySelector(".profile-main")).render(
              <ExhibitionCreationForm />
            );
          },
        },
        {
          subText: "List exhibition",
          icon: "fas fa-table",
          callBack: () => {
            let options = [
              { text: "Edit", callBack: null, icon: "fas fa-pen" },
              { text: "Delete", callBack: null, icon: "fas fa-trash" },
            ];
            // fetching exhibition from server
            fetch(`${settings.server_domain}/get_exhibitions`)
              .then((response) => response.json())
              .then((data) => {
                ReactDOM.createRoot(
                  document.querySelector(".profile-main")
                ).render(
                  <ListView
                    items={data}
                    title="List of Exhibtions"
                    options={options}
                  />
                );
              });
          },
        },
      ],
    },
    {
      text: "Painter",
      subHeadings: [
        {
          subText: "Add painter account",
          icon: "fas fa-plus",
          callBack: () => {
            ReactDOM.createRoot(document.querySelector(".profile-main")).render(
              <PainterCreationForm />
            );
          },
        },
        {
          subText: "List painters",
          icon: "fas fa-table",
          callBack: () => {
            let options = [
              {
                text: "Edit",
                callBack: null,
                icon: "fas fa-pen",
              },
              {
                text: "Delete",
                callBack: (painter) => {
                  fetch(
                    `${settings.server_domain}/delete_painter/${painter.id}`,
                    { method: "DELETE" }
                  );
                },
                icon: "fas fa-trash",
              },
            ];
            fetch(`${settings.server_domain}/get_painters`)
              .then((response) => response.json())
              .then((data) => {
                ReactDOM.createRoot(
                  document.querySelector(".profile-main")
                ).render(
                  <ListView
                    items={data}
                    options={options}
                    title="List of all registered painters"
                  />
                );
              })
              .catch((error) => console.log(error));
          },
        },
      ],
    },
    {
      text: "Blogs",
      subHeadings: [
        {
          subText: "Add new Blog",
          icon: "fas fa-plus",
          callBack: () => {
            ReactDOM.createRoot(document.querySelector(".profile-main")).render(
              <BlogCreationForm />
            );
          },
        },
        {
          subText: "List blogs",
          icon: "fas fa-table",
          callBack: () => {
            let options = [
              { text: "Edit", callBack: null, icon: "fas fa-trash" },
              {
                text: "Delete",
                callBack: (blog) => {
                  console.log(blog.Id);
                  fetch(
                    `${settings.server_domain}/api/blog/delete_blog/${blog.Id}`,
                    {
                      method: "DELETE",
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => data)
                    .catch((error) => {
                      console.log(error);
                    });
                },
                icon: "fas fa-pen",
              },
            ];
            fetch(`${settings.server_domain}/api/blog/get_blogs`)
              .then((response) => response.json())
              .then((data) => {
                // console.log(data);
                ReactDOM.createRoot(
                  document.querySelector(".profile-main")
                ).render(
                  <ListView
                    items={data}
                    options={options}
                    title="List of released Blogs"
                  />
                );
              })
              .catch((error) => console.info(error));
          },
        },
      ],
    },
    {
      text: "Paintings",
      subHeadings: [
        {
          subText: "Add new",
          icon: "fas fa-plus",
          callBack: () => {
            ReactDOM.createRoot(document.querySelector(".profile-main")).render(
              <PaintingCreationForm />
            );
          },
        },
        {
          subText: "List Paintings",
          icon: "fas fa-table",
          callBack: () => {
            let paintings = [];
            let options = [
              { text: "Edit", callBack: null, icon: "fas fa-pen" },
              { text: "Delete", callBack: null, icon: "fas fa-trash" },
            ];
            fetch(`${settings.server_domain}/get_paintings`)
              .then((response) => response.json())
              .then((data) => {
                ReactDOM.createRoot(
                  document.querySelector(".profile-main")
                ).render(
                  <ListView
                    items={data}
                    title="List of List of paintings"
                    options={options}
                  />
                );
              });
          },
        },
      ],
    },
    // {
    //   text: "settings",
    //   subHeadings: ["Create blog", "List blogs"],
    // },
  ];
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <div className="navbar" id="top">
        <div className="navbar__logo" id="NavBarLogo">
          <h1>{settings.site_name}</h1>
        </div>
        <div className="navbar__elements">
          {navBaritems.map((item, index) => {
            return (
              <details
                className="pc-link-btn"
                key={index}
                onClick={item.callBack}
              >
                <summary>{item.text}</summary>
                <div className="sub-buttons-container">
                  {item.subHeadings.map((innerItem, innerIndex) => {
                    return (
                      <button
                        className={`sub-link-btn ${innerItem.subText}`}
                        key={innerIndex}
                        onClick={innerItem.callBack}
                      >
                        <i className={innerItem.icon}></i>
                        {innerItem.subText}
                      </button>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>
        <button className="primary">
          <i className="fas fa-cog"></i>
        </button>
        <button className="primary">
          <i className="fas fa-user-circle"></i>
          {props.username}
        </button>
        <div className="navbar-menu">
          <HiOutlineBars3
            onClick={() => setOpenMenu(true)}
            className="menu-button-bars"
          />
        </div>
        <Drawer
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
            <List className="drawer">
              {navBaritems.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <details
                      className="link-btn"
                      key={index}
                      onClick={item.callBack}
                    >
                      <summary>{item.text}</summary>

                      {item.subHeadings.map((innerItem, innerIndex) => {
                        return (
                          <button
                            key={innerIndex}
                            className="sub-link-btn"
                            onClick={() => {
                              innerItem.callBack();
                              console.log("Clicked");
                              setOpenMenu(false);
                            }}
                          >
                            {innerItem.subText}
                          </button>
                        );
                      })}
                    </details>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      </div>
    </>
  );
}

export default NavBar;
