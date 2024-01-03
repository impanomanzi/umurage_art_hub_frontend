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
import { useNavigate } from "react-router-dom";
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
  let items = [];

  const loading = () => {
    ReactDOM.createRoot(document.querySelector(".profile-main")).render(
      <div className="exhibition-paintings-container">
        <center>
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </center>
      </div>
    );
  };
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
            loading();
            let options = [
              { text: "Edit", callBack: null, icon: "fas fa-pen" },
              {
                text: "Delete",
                callBack: (event, item) => {
                  fetch(
                    `${settings.server_domain}/delete_exhibition/${item.id}`,
                    {
                      method: "DELETE",
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.success) {
                        // if exhibition has deleted from database update UI

                        ReactDOM.createRoot(
                          document.querySelector(".profile-main")
                        ).render(
                          <ListView
                            items={data.data}
                            title="List of Exhibtions"
                            options={options}
                          />
                        );
                      } else {
                        ReactDOM.createRoot(
                          document.querySelector(".message")
                        ).render(
                          <div className="alert alert-danger">
                            <center>Failed to delete that exhibitions</center>
                          </div>
                        );
                      }
                    })
                    .catch((error) => {
                      ReactDOM.createRoot(
                        document.querySelector(".message")
                      ).render(
                        <div className="alert alert-danger">
                          <center>Failed to delete that exhibitions</center>
                        </div>
                      );
                    });
                },
                icon: "fas fa-trash",
              },
            ];
            // fetching exhibition from server
            fetch(`${settings.server_domain}/get_exhibitions`)
              .then((response) => response.json())
              .then((data) => {
                items = data;
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
            loading();
            let options = [
              {
                text: "Edit",
                callBack: null,
                icon: "fas fa-pen",
              },
              {
                text: "Delete",
                callBack: (event, painter) => {
                  fetch(
                    `${settings.server_domain}/delete_painter/${painter.id}`,
                    { method: "DELETE" }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.success) {
                        // if painter has deleted from database update UI

                        ReactDOM.createRoot(
                          document.querySelector(".profile-main")
                        ).render(
                          <ListView
                            items={data.data}
                            title="List of all registered painters"
                            options={options}
                          />
                        );
                      } else {
                        ReactDOM.createRoot(
                          document.querySelector(".message")
                        ).render(
                          <div className="alert alert-danger">
                            <center>Failed to delete that Painter</center>
                          </div>
                        );
                      }
                    })
                    .catch((er) => {
                      ReactDOM.createRoot(
                        document.querySelector(".message")
                      ).render(
                        <div className="alert alert-danger">
                          <center>Failed to delete that painter</center>
                        </div>
                      );
                    });
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
              .catch((error) => {
                ReactDOM.createRoot(document.querySelector(".message")).render(
                  <div className="alert alert-danger">
                    <center>Failed to load painters</center>
                  </div>
                );
              });
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
            loading();
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
            loading();
            let paintings = [];
            let options = [
              { text: "Edit", callBack: null, icon: "fas fa-pen" },
              {
                text: "Delete",
                callBack: (event, painting) => {
                  fetch(
                    `${settings.server_domain}/delete_painting/${painting.id}`,
                    { method: "DELETE" }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.success) {
                        // if painting has deleted from database update UI

                        ReactDOM.createRoot(
                          document.querySelector(".profile-main")
                        ).render(
                          <ListView
                            items={data.data}
                            title="List of paintings"
                            options={options}
                          />
                        );
                      } else {
                        ReactDOM.createRoot(
                          document.querySelector(".message")
                        ).render(
                          <div className="alert alert-danger">
                            <center>Failed to delete that Painter</center>
                          </div>
                        );
                      }
                    })
                    .catch((er) => {
                      ReactDOM.createRoot(
                        document.querySelector(".message")
                      ).render(
                        <div className="alert alert-danger">
                          <center>Failed to delete that painting</center>
                        </div>
                      );
                    });
                },
                icon: "fas fa-trash",
              },
            ];
            fetch(`${settings.server_domain}/get_paintings`)
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  ReactDOM.createRoot(
                    document.querySelector(".profile-main")
                  ).render(
                    <ListView
                      items={data.data}
                      title="List of List of paintings"
                      options={options}
                    />
                  );
                } else {
                  ReactDOM.createRoot(
                    document.querySelector(".profile-main")
                  ).render(
                    <div className="alert alert-danger">
                      <center>Failed to delete that painter</center>
                    </div>
                  );
                }
              });
          },
        },
      ],
    },
    {
      text: "Customer",
      subHeadings: [
        {
          subText: "List customers",
          icon: "fas fa-list",
          callBack: () => {
            loading();
            fetch(`${settings.server_domain}/get_customers`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("session")}`,
              },
            })
              .then((response) => response.json())
              .then((data) => {
                // console.log(data);
                if (data.success) {
                  let options = [
                    { text: "Edit", callBack: null, icon: "fas fa-pen" },
                    {
                      text: "Delete",
                      callBack: (event, customer) => {
                        ReactDOM.createRoot(
                          document.querySelector(".message")
                        ).render(
                          <div className="exhibition-paintings-container">
                            <center>
                              <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                              </div>
                            </center>
                          </div>
                        );
                        let formData = new FormData();
                        formData.append("customer_id", customer.id);
                        fetch(`${settings.server_domain}/delete_customer`, {
                          method: "DELETE",
                          Authorization: `Bearer ${localStorage.getItem(
                            "session"
                          )}`,
                          body: formData,
                        })
                          .then((response) => response.json())
                          .then((data) => {
                            if (data.success) {
                              ReactDOM.createRoot(
                                document.querySelector(".profile-main")
                              ).render(
                                <ListView
                                  items={data.data}
                                  title="List of customers"
                                  options={options}
                                />
                              );
                            } else {
                              ReactDOM.createRoot(
                                document.querySelector(".message")
                              ).render(
                                <div className="alert alert-danger">
                                  <center>
                                    Failed to delete that customer
                                  </center>
                                </div>
                              );
                            }
                          });
                      },
                      icon: "fas fa-trash",
                    },
                    {
                      text: "Change status",
                      callBack: (event, customer) => {
                        ReactDOM.createRoot(
                          document.querySelector(".message")
                        ).render(
                          <div className="exhibition-paintings-container">
                            <center>
                              <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                              </div>
                            </center>
                          </div>
                        );
                        let formData = new FormData();
                        formData.append("customer_id", customer.id);
                        formData.append("current_status", customer.status);
                        fetch(
                          `${settings.server_domain}/update_customer_status`,
                          {
                            method: "POST",
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "session"
                              )}`,
                            },
                            body: formData,
                          }
                        )
                          .then((response) => response.json())
                          .then((data) => {
                            if (data.success) {
                              document.querySelector(".message").innerHTML = "";
                              ReactDOM.createRoot(
                                document.querySelector(".profile-main")
                              ).render(
                                <ListView
                                  items={data.data}
                                  title="List of customers"
                                  options={options}
                                />
                              );
                            } else {
                              ReactDOM.createRoot(
                                document.querySelector(".message")
                              ).render(
                                <div className="alert alert-danger">
                                  <center>
                                    Failed to update customer status
                                  </center>
                                </div>
                              );
                            }
                          })
                          .catch((error) => {
                            ReactDOM.createRoot(
                              document.querySelector(".message")
                            ).render(
                              <div className="alert alert-danger">
                                <center>
                                  error happened updating customer status
                                </center>
                              </div>
                            );
                          });
                      },
                    },
                  ];

                  ReactDOM.createRoot(
                    document.querySelector(".profile-main")
                  ).render(
                    <ListView
                      items={data.data}
                      title="List of customers"
                      options={options}
                    />
                  );
                }
              })
              .catch((error) => {
                ReactDOM.createRoot(document.querySelector(".message")).render(
                  <div className="alert alert-danger">
                    <center>Error happened while deleting customer</center>
                  </div>
                );
              });
          },
        },
      ],
    },
  ];
  const [openMenu, setOpenMenu] = useState(false);

  const btnLoading = (root) => {
    ReactDOM.createRoot(document.querySelector(`${root}`)).render(
      <center>
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </center>
    );
  };
  let currentOpen = "";
  let currentBtn = "";
  const handleOpenDropDwon = (index) => {
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
              <i className="fas fa-sign-out-alt "></i> &nbsp;
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
                <ListItemButton
                  onClick={() => {
                    const navigate = useNavigate();
                    fetch(`${settings.server_domain}/custom-logout`, {
                      method: "GET",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "session"
                        )}`,
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
                  }}
                >
                  <ListItemText>
                    <ListItemIcon>
                      <i className="fas fa-sign-out-alt "></i> &nbsp;
                    </ListItemIcon>
                    Logout
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
