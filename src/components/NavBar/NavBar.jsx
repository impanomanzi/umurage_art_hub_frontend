import "./NavBar.css";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { lazy } from "react";
import { toast } from "react-hot-toast";
import { API } from "../../API/serverRequest";
import "bootstrap/dist/css/bootstrap.css";
import {
  exhibitionKeywords,
  painterKeywords,
  paintingKeywords,
  customerKeywords,
  blogKeywords,
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
  const ListView = lazy(() => import("../ListView/ListView"));
  const { username, logout, exhibitions, paintings } = props;
  const renderPainterCreationForm = () => {
    props.onChangeComponent("painterCreationForm");
  };
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  const renderExhibitionImagesForm = () => {
    props.onChangeComponent("exhibitionImagesForm");
  };

  const renderPaintingCreationForm = () => {
    props.onChangeComponent("paintingCreationForm");
  };

  const renderPasswordChangeForm = () => {
    props.onChangeComponent("passwordChangeForm");
    setOpenMenu(false);
  };

  const renderExhibitionCreationForm = () => {
    props.onChangeComponent("exhibitionCreationForm");
  };

  const renderBlogCreationForm = () => {
    props.onChangeComponent("blogCreationForm");
  };

  const renderDashboard = () => {
    props.onChangeComponent("dashboard");
  };

  const renderList = async (list) => {
    props.onChangeComponent("dashboard");
    await timeout(10);
    props.onChangeComponent("list");
    props.onChangeList(list);
  };
  const getCurrentUserId = () => {
    let userId;
    try {
      userId = jwtDecode(localStorage.getItem("token")).user;
      return userId;
    } catch (error) {
      toast.error("your session expired");
    }
  };
  const [openMenu, setOpenMenu] = useState(false);
  const navBaritems = [
    {
      text: "Dashboard",
      counts: null,
      subHeadings: [
        {
          subText: "View",
          icon: "fas fa-eye",
          callBack: renderDashboard,
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
          callBack: renderExhibitionCreationForm,
        },
        {
          subText: "Add paintings",
          icon: "fas fa-plus",
          callBack: renderExhibitionImagesForm,
        },
        {
          subText: "List paintings",
          icon: "fas fa-plus",
          callBack: async () => {
            const options = [
              {
                text: "Delete",
                callBack: async (params) => {
                  try {
                    const data = await API.deleteExhibitionPainting(params);
                    if (data.success) {
                      params.delete();
                    } else {
                      throw new Error(data.message);
                    }
                  } catch (error) {
                    toast.error(String(error));
                  }
                },
                icon: "fas fa-trash",
              },
            ];
            try {
              const data = await API.getAllExhibitionPaintings();
              if (data.success) {
                renderList(
                  <ListView
                    items={data.data}
                    title="List of Exhibtion Paintings"
                    keyword={["name", "description"]}
                    options={options}
                    confirmationRequired={true}
                  />
                );
              } else {
                throw new Error(data.message);
              }
            } catch (error) {
              toast.error(String(error));
            }
          },
        },
        ,
        {
          subText: "List exhibition",
          icon: "fas fa-table",
          callBack: async () => {
            props.onChangeComponent("loading");
            const options = [
              {
                text: "Delete",
                callBack: async (params) => {
                  try {
                    const data = await API.deleteExhibition(params);
                    if (data.success) {
                      params.delete();
                    } else {
                      throw new Error(data.message);
                    }
                  } catch (error) {
                    toast.error(String(error));
                  }
                },
                icon: "fas fa-trash",
              },
              {
                text: "change status",
                callBack: async (params) => {
                  try {
                    const data = await API.changeExhibitionStatus(params);
                    if (data.success) {
                      params.updater(data.data);
                      toast.success("exhibition status updated");
                    } else {
                      throw new Error(data.message);
                    }
                  } catch (error) {
                    toast.error(String(error));
                  }
                },
                icon: "fas fa-trash",
              },
            ];
            try {
              const data = await API.getAllExhibitions();
              if (data.success) {
                renderList(
                  <ListView
                    items={data.data}
                    title="List of Exhibtions"
                    keyword={exhibitionKeywords}
                    options={options}
                    confirmationRequired={true}
                  />
                );
              } else {
                throw new Error(data.message);
              }
            } catch (error) {
              toast.error(String(error));
            }
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
          callBack: renderPainterCreationForm,
        },
        {
          subText: "List painters",
          icon: "fas fa-table",
          callBack: async () => {
            try {
              props.onChangeComponent("loading");
              const options = [
                {
                  text: "Delete",
                  callBack: async (params) => {
                    try {
                      const data = await API.deletePainter(params);
                      if (data.success) {
                        params.delete();
                      } else {
                        throw new Error(data.message);
                      }
                    } catch (error) {
                      toast.error(String(error));
                    }
                  },
                  icon: "fas fa-trash",
                },
              ];
              const data = await API.getPainters();
              renderList(
                <ListView
                  items={data}
                  options={options}
                  keyword={painterKeywords}
                  title="List of all registered painters"
                  confirmationRequired={true}
                />
              );
            } catch (error) {
              toast.error(String(error));
            }
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
          callBack: renderBlogCreationForm,
        },
        {
          subText: "List blogs",
          icon: "fas fa-table",
          callBack: async () => {
            try {
              props.onChangeComponent("loading");
              const options = [
                {
                  text: "Delete",
                  callBack: async (params) => {
                    try {
                      const data = await API.deleteBlog(params);
                      if (data.success) {
                        params.delete();
                      } else {
                        throw new Error(data.message);
                      }
                    } catch (error) {
                      toast.error(String(error));
                    }
                  },
                },
              ];
              const data = await API.getBlogs();
              if (data.success)
                renderList(
                  <ListView
                    items={data.data}
                    options={options}
                    keyword={blogKeywords}
                    title="List of released Blogs"
                    confirmationRequired={true}
                  />
                );
              else {
                throw new Error(data.message);
              }
            } catch (error) {
              toast.error(String(error));
            }
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
          callBack: renderPaintingCreationForm,
        },
        {
          subText: "List Paintings",
          icon: "fas fa-table",
          callBack: async () => {
            props.onChangeComponent("loading");
            const options = [
              {
                text: "Delete",
                callBack: async (params) => {
                  try {
                    const data = await API.deletePainting(params);
                    if (data.success) {
                      params.delete();
                    } else {
                      throw new Error(data.message);
                    }
                  } catch (error) {
                    toast.error(String(error));
                  }
                },
                icon: "",
              },
            ];
            renderList(
              <ListView
                items={paintings.data}
                title="List of paintings"
                keyword={paintingKeywords}
                options={options}
                confirmationRequired={true}
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
          callBack: async () => {
            props.onChangeComponent("loading");
            try {
              const options = [
                {
                  text: "Delete",
                  callBack: async (params) => {
                    try {
                      const data = await API.deleteCustomer(params);
                      if (data.success) {
                        params.delete();
                      } else {
                        throw new Error("Failed to delete that customer");
                      }
                    } catch (error) {
                      toast.error(String(error));
                    }
                  },
                  icon: "",
                },
                {
                  text: "Change status",
                  callBack: async (params) => {
                    try {
                      const data = await API.changeCustomerStatus(params);
                      if (data.success) {
                        params.updater(data.data);
                        toast.success("customer status updated");
                      } else {
                        throw new Error(data.message);
                      }
                    } catch (error) {
                      toast.error(String(error));
                    }
                  },
                },
              ];

              const data = await API.getCustomers();
              if (data.success)
                renderList(
                  <ListView
                    items={data.data}
                    title="List of customers"
                    keyword={customerKeywords}
                    options={options}
                    confirmationRequired={true}
                  />
                );
              else {
                throw new Error(data.message);
              }
            } catch (error) {
              toast.error(String(error));
            }
          },
        },
      ],
    },
  ];

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
        &nbsp;|&nbsp; <i>{getCurrentUserId()}</i>
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
          onMouseEnter={() => setOpenMenu(true)}
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
            {navBaritems.map((item, index) => {
              return (
                <ListItem key={index}>
                  <details
                    className="link-btn card"
                    key={index}
                    onClick={item.callBack}
                    onMouseEnter={(event) => {
                      event.target.open = true;
                    }}
                    onMouseLeave={(event) => [(event.target.open = false)]}
                    style={{ padding: "0 1em 0 1em" }}
                  >
                    <summary className="lead">{item.text} &nbsp;</summary>

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
              <ListItemButton onClick={renderPasswordChangeForm}>
                <ListItemText>Change Password</ListItemText>
              </ListItemButton>
            </ListItem>
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
