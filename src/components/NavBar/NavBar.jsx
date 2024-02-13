import "./NavBar.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import ExhibitionCreationForm from "../Forms/ExhibitionCreationForm/ExhibitionCreationForm";
import PainterCreationForm from "../Forms/PainterCreationForm/PainterCreationForm";
import BlogCreationForm from "../Forms/BlogCreationForm/BlogCreationForm";
import PaintingCreationForm from "../Forms/PaintingCreationForm/PaintingCreationForm";
import Dashboard from "../Dashboard/Dashboard";
import ListView from "../ListView/ListView";
import settings from "../settings.json";
import ExhibitionImagesForm from "../Forms/ExhibitionImagesForm/ExhibitionImagesForm";
import "bootstrap/dist/css/bootstrap.css";
import {
  exhibitionKeywords,
  painterKeywords,
  paintingKeywords,
  customerKeywords,
} from "../KeyWords/Keywords";
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
  const { username, logout, exhibitions, paintings } = props;
  const [myFixedExhibitions, setMyFixedExhibitions] = useState(exhibitions);
  const [myFixedPaintings, setMyFixedPaintings] = useState(paintings);
  const [myExhibitions, setMyExhibitions] = useState(exhibitions);
  const [MyPaintings, setMyPaintings] = useState(paintings);
  const closeAlert = (event) => {
    document.querySelector(".response-alert").innerHTML = "";
  };
  const addNewExhibition = (items) => {
    setMyExhibitions(items);
  };
  const addNewPainting = (items) => {
    setMyPaintings(items);
  };
  let loading = () => {
    ReactDOM.createRoot(document.querySelector(".profile-main")).render(
      <center>
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </center>
    );
  };
  let navBaritems = [
    {
      text: "Dashboard",
      counts: null,
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
      counts: exhibitions.length,
      subHeadings: [
        {
          subText: "Create exhibition",
          icon: "fas fa-plus",
          callBack: () => {
            ReactDOM.createRoot(document.querySelector(".profile-main")).render(
              <ExhibitionCreationForm
                exhibitions={exhibitions}
                addNewExhibition={addNewExhibition}
              />
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
              {
                text: "Edit",
                callBack: (params) => {
                  ReactDOM.createRoot(
                    document.querySelector(".profile-main")
                  ).render(<ExhibitionCreationForm data={params.item} />);
                },
                icon: "fas fa-pen",
              },
              {
                text: "Delete",
                callBack: (params) => {
                  fetch(
                    `${settings.server_domain}/delete_exhibition/${params.item.id}/${params.item.name}`,
                    {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "session"
                        )}`,
                      },
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.success) {
                        params.delete();
                      } else {
                        ReactDOM.createRoot(
                          document.querySelector(".response-alert")
                        ).render(
                          <div className="alert alert-danger">
                            <center>Failed to delete that exhibitions</center>
                            <button
                              className="btn btn-close"
                              onClick={closeAlert}
                            ></button>
                          </div>
                        );
                      }
                    })
                    .catch((error) => {
                      console.error(error);
                      ReactDOM.createRoot(
                        document.querySelector(".response-alert")
                      ).render(
                        <div className="alert alert-danger">
                          <center>{error.toString()}</center>
                          <button
                            className="btn btn-close"
                            onClick={closeAlert}
                          ></button>
                        </div>
                      );
                    });
                },
                icon: "fas fa-trash",
              },
            ];

            ReactDOM.createRoot(document.querySelector(".profile-main")).render(
              <ListView
                items={exhibitions}
                title="List of Exhibtions"
                keyword={exhibitionKeywords}
                options={options}
              />
            );
          },
        },
      ],
    },
    {
      text: "Painter",
      counts: null,
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
                text: "Delete",
                callBack: (params) => {
                  fetch(
                    `${settings.server_domain}/delete_painter/${params.item.id}`,
                    {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "session"
                        )}`,
                      },
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.success) {
                        params.delete();
                      } else {
                        ReactDOM.createRoot(
                          document.querySelector(".response-alert")
                        ).render(
                          <div className="alert alert-danger">
                            <center>Failed to delete that Painter</center>
                            <button
                              className="btn btn-close"
                              onClick={closeAlert}
                            ></button>
                          </div>
                        );
                      }
                    })
                    .catch((er) => {
                      ReactDOM.createRoot(
                        document.querySelector(".response-alert")
                      ).render(
                        <div className="alert alert-danger">
                          <center>
                            Error happened while deleting that painter
                          </center>
                          <button
                            className="btn btn-close"
                            onClick={closeAlert}
                          ></button>
                        </div>
                      );
                    });
                },
                icon: "fas fa-trash",
              },
            ];
            fetch(`${settings.server_domain}/get_painters`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("session")}`,
              },
            })
              .then((response) => response.json())
              .then((data) => {
                ReactDOM.createRoot(
                  document.querySelector(".profile-main")
                ).render(
                  <ListView
                    items={data}
                    options={options}
                    keyword={painterKeywords}
                    title="List of all registered painters"
                  />
                );
              })
              .catch((error) => {
                ReactDOM.createRoot(
                  document.querySelector(".response-alert")
                ).render(
                  <div className="alert alert-danger">
                    <center>Failed to load painters</center>
                    <button
                      className="btn btn-close"
                      onClick={closeAlert}
                    ></button>
                  </div>
                );
              });
          },
        },
      ],
    },
    {
      text: "Blogs",
      counts: null,
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
                  fetch(
                    `${settings.server_domain}/api/blog/delete_blog/${blog.Id}`,
                    {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "session"
                        )}`,
                      },
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
      counts: paintings.data.length,
      subHeadings: [
        {
          subText: "Add new",
          icon: "fas fa-plus",
          callBack: () => {
            ReactDOM.createRoot(document.querySelector(".profile-main")).render(
              <PaintingCreationForm
                paintings={paintings}
                addNewPainting={addNewPainting}
              />
            );
          },
        },
        {
          subText: "List Paintings",
          icon: "fas fa-table",
          callBack: () => {
            loading();
            let options = [
              { text: "Edit", callBack: null, icon: "fas fa-pen" },
              {
                text: "Delete",
                callBack: (params) => {
                  fetch(
                    `${settings.server_domain}/delete_painting/${params.item.id}`,
                    {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "session"
                        )}`,
                        userId: localStorage.getItem("userId"),
                      },
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.success) {
                        // if painting has deleted from database update UI

                        params.delete();
                      } else {
                        ReactDOM.createRoot(
                          document.querySelector(".response-alert")
                        ).render(
                          <div className="alert alert-danger">
                            <center>Failed to delete that Painting</center>
                            <button
                              className="btn btn-close"
                              onClick={closeAlert}
                            ></button>
                          </div>
                        );
                      }
                    })
                    .catch((er) => {
                      ReactDOM.createRoot(
                        document.querySelector(".response-alert")
                      ).render(
                        <div className="alert alert-danger">
                          <center>
                            error happened while deleting that painting
                          </center>
                          <button
                            className="btn btn-close"
                            onClick={closeAlert}
                          ></button>
                        </div>
                      );
                    });
                },
                icon: "fas fa-trash",
              },
            ];

            ReactDOM.createRoot(document.querySelector(".profile-main")).render(
              <ListView
                items={paintings.data}
                title="List of paintings"
                keyword={paintingKeywords}
                options={options}
              />
            );
          },
        },
      ],
    },
    {
      text: "Customer",
      counts: null,
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
                if (data.success) {
                  let options = [
                    {
                      text: "Delete",
                      callBack: (params) => {
                        let button = params.event.target;
                        button.setAttribute("disabled", true);

                        ReactDOM.createRoot(button).render(
                          <center>
                            <div class="spinner-border" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          </center>
                        );

                        let formData = new FormData();
                        formData.append("customer_id", params.item.id);
                        fetch(`${settings.server_domain}/delete_customer`, {
                          method: "DELETE",
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "session"
                            )}`,
                          },
                          body: formData,
                        })
                          .then((response) => response.json())
                          .then((data) => {
                            if (data.success) {
                              params.delete();
                            } else {
                              button.removeAttribute("disabled");
                              ReactDOM.createRoot(button).render(
                                <span>
                                  <i className="fas fa-trash"></i>&nbsp;Delete
                                </span>
                              );
                              ReactDOM.createRoot(
                                document.querySelector(".response-alert")
                              ).render(
                                <div className="alert alert-danger">
                                  <center>
                                    Failed to delete that customer
                                  </center>
                                  <button
                                    className="btn btn-close"
                                    onClick={closeAlert}
                                  ></button>
                                </div>
                              );
                            }
                          })
                          .catch((er) => {
                            button.removeAttribute("disabled");
                            ReactDOM.createRoot(button).render(
                              <span>
                                <i className="fas fa-trash"></i>&nbsp;Delete
                              </span>
                            );
                            ReactDOM.createRoot(
                              document.querySelector(".response-alert")
                            ).render(
                              <div className="alert alert-danger">
                                <center>
                                  error happened while deleting customer
                                </center>
                                <button
                                  className="btn btn-close"
                                  onClick={closeAlert}
                                ></button>
                              </div>
                            );
                          });
                      },
                      icon: "fas fa-trash",
                    },
                    {
                      text: "Change status",
                      callBack: (params) => {
                        ReactDOM.createRoot(
                          document.querySelector(".response-alert")
                        ).render(
                          <div className="alert alert-success">
                            <center>
                              customer status changed successfully
                            </center>
                            <button
                              className="btn btn-close"
                              onClick={closeAlert}
                            ></button>
                          </div>
                        );
                        let formData = new FormData();
                        formData.append("customer_id", params.item.id);
                        formData.append("current_status", params.item.status);
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
                              ReactDOM.createRoot(
                                document.querySelector(".profile-main")
                              ).render(
                                <ListView
                                  items={data.data}
                                  title="List of customers"
                                  keyword="firstName"
                                  options={options}
                                />
                              );
                            } else {
                              ReactDOM.createRoot(
                                document.querySelector(".response-alert")
                              ).render(
                                <div className="alert alert-danger">
                                  <center>
                                    Failed to update customer status
                                  </center>
                                  <button
                                    className="btn btn-close"
                                    onClick={closeAlert}
                                  ></button>
                                </div>
                              );
                            }
                          })
                          .catch((error) => {
                            ReactDOM.createRoot(
                              document.querySelector(".response-alert")
                            ).render(
                              <div className="alert alert-danger">
                                <center>
                                  error happened updating customer status
                                </center>
                                <button
                                  className="btn btn-close"
                                  onClick={closeAlert}
                                ></button>
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
                      keyword={customerKeywords}
                      options={options}
                    />
                  );
                }
              })
              .catch((error) => {
                ReactDOM.createRoot(
                  document.querySelector(".response-alert")
                ).render(
                  <div className="alert alert-danger">
                    <center>Error happened while deleting customer</center>
                    <button
                      className="btn btn-close"
                      onClick={closeAlert}
                    ></button>
                  </div>
                );
              });
          },
        },
      ],
    },
  ];
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="profile-top-nav-container home-navbar bg-light">
      <div className="home-navbar__logo " id="NavBarLogo">
        <img src="/UMURAGE HEADER.png" alt="" />
      </div>
      <span>
        <h5 className="h5">
          {" "}
          <i className="fas fa-shield-alt"></i>&nbsp;ADMIN DASHBOARD
        </h5>
        &nbsp;|&nbsp; <i>{localStorage.getItem("username")}</i>
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
        {exhibitions.length != 0 && (
          <span
            className="badge badge-success"
            style={{ width: "5px", height: "7px", borderEndEndRadius: "2.5px" }}
          >
            &nbsp;
          </span>
        )}
        <button
          onClick={() => setOpenMenu(true)}
          className="menu-button-bars btn btn-outline-secondary "
          style={{
            marginRight: "0.5rem",
            backgroundColor: "transparent",
            color: "black",
          }}
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
                    <summary className="lead">
                      {item.text} &nbsp;
                      <span className="badge badge-success">{item.counts}</span>
                    </summary>

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
              <ListItemButton
                onClick={() => {
                  props.logout();
                  setOpenMenu(false);
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
  );
}

export default NavBar;
