import "./NavBar.css";
import React, { useState, useEffect } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import ReactDOM from "react-dom/client";
import ExhibitionCreationForm from "../ExhibitionCreationForm/ExhibitionCreationForm";
import PainterCreationForm from "../PainterCreationForm/PainterCreationForm";
import BlogCreationForm from "../BlogCreationForm/BlogCreationForm";
import PaintingCreationForm from "../PaintingCreationForm/PaintingCreationForm";
import Dashboard from "../Dashboard/Dashboard";
import ListView from "../ListView/ListView";
import settings from "../settings.json";
import ExhibitionImagesForm from "../ExhibitionImagesForm/ExhibitionImagesForm";
import "bootstrap/dist/css/bootstrap.css";
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
          subText: "Add paintings",
          icon: "fas fa-plus",
          callBack: () => {
            ReactDOM.createRoot(document.querySelector(".profile-main")).render(
              <ExhibitionImagesForm />
            );
          },
        },
        ,
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
  ];
  const [openMenu, setOpenMenu] = useState(false);
  let currentOpen = "";
  let currentBtn = "";
  const handleOpenDropDwon = (index) => {
    console.log(currentBtn);
    if (
      document.querySelector(".dropdown-menu-" + index).style.display ===
      "block"
    ) {
      document.querySelector(".dropdown-menu-" + index).style.display = "none";
    } else {
      if (currentOpen)
        document.querySelector(currentOpen).style.display = "none";
      document.querySelector(".dropdown-menu-" + index).style.display = "block";
      currentOpen = ".dropdown-menu-" + index;
    }
  };

  return (
    <div className="navbar">
      <div className="navbar__logo" id="NavBarLogo">
        <h1>{settings.site_name}</h1>
      </div>
      <div
        className="pc-navbar"
        onMouseLeave={() => {
          if (currentOpen)
            document.querySelector(currentOpen).style.display = "none";
        }}
      >
        <div className="nav-item-container">
          <div className="dropdown-container">
            {navBaritems.map((item, index) => {
              return (
                <div
                  className={`drop-down`}
                  key={index}
                  onClick={item.callBack}
                >
                  <button
                    className={`btn btn-secondary dropdown-toggle drop-down-btn-${index}`}
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onMouseEnter={() => {
                      handleOpenDropDwon(index);
                    }}
                    onClick={() => {
                      handleOpenDropDwon(index);
                    }}
                  >
                    {item.text}
                  </button>
                  <div
                    className={`dropdown-menu dropdown-menu-${index}`}
                    onMouseLeave={() => {
                      document.querySelector(
                        ".dropdown-menu-" + index
                      ).style.display = "none";
                    }}
                    aria-labelledby="dropdownMenuButton"
                  >
                    {item.subHeadings.map((innerItem, innerIndex) => {
                      return (
                        <button
                          className="dropdown-item"
                          key={innerIndex}
                          onClick={innerItem.callBack}
                        >
                          <i className={innerItem.icon}></i>
                          {innerItem.subText}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <button>
              <i className="fas fa-cog"></i>
            </button>
            <button>
              <i className="fas fa-user-circle"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="navbar-menu-btn">
        <button
          onClick={() => setOpenMenu(true)}
          className="menu-button-bars btn btn-outline-secondary "
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <div className="mobile-nav">
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
            <ListItem>
              <ListItemButton>
                <ListItemText className="menu-text">Menu</ListItemText>
              </ListItemButton>
            </ListItem>
            <List className="drawer">
              {navBaritems.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <details
                      className="link-btn card"
                      key={index}
                      onClick={item.callBack}
                      style={{ padding: "0 1em 0 1em" }}
                    >
                      <summary className="lead">{item.text}</summary>

                      {item.subHeadings.map((innerItem, innerIndex) => {
                        return (
                          <button
                            key={innerIndex}
                            className="sub-link-btn card"
                            style={{ margin: "0.7em 0 0.7em 0" }}
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
              <ListItem>
                <ListItemButton>
                  <ListItemText>
                    <ListItemIcon>
                      <i className="fas fa-cog"></i>
                    </ListItemIcon>
                    Settings
                  </ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemText>
                    <ListItemIcon>
                      <i className="fas fa-user-circle"></i>
                    </ListItemIcon>
                    Profile
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </div>
    </div>
  );
}

export default NavBar;
