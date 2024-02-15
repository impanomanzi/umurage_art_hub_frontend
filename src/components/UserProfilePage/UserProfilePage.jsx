import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paintingKeywords } from "../KeyWords/Keywords";
import ProfileTopNav from "../ProfileTopNav/ProfileTopNav";
import ProfileBottomNav from "../ProfileBottomNav/ProfileBottomNav";
import ListView from "../ListView/ListView";
import ReactDOM from "react-dom/client";
import settings from "../settings.json";
import "./UserProfilePage.css";
import { AlertError } from "../Alerts/Alert";

function UserProfilePage(props) {
  const { login, exhibitions, paintings } = props;
  const navigate = useNavigate();
  const [galleries, setGalleries] = useState([]);
  useEffect(() => {
    setGalleries(paintings.data);
  }, []);

  const wantedData = paintings.data.filter((item, index) => {
    return item.owner == localStorage.getItem("username");
  });
  let options = [
    { text: "Edit", callBack: null, icon: "fas fa-pen" },
    {
      text: "Delete",
      callBack: (params) => {
        fetch(`${settings.server_domain}/delete_painting/${params.item.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("session")}`,
            userId: localStorage.getItem("userId"),
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.unauthorized) {
              navigate("/sigin-in");
            }
            if (data.success) {
              // if painting has deleted from database update UI
              let wantedData = data.data;
              params.delete();
            } else {
              ReactDOM.createRoot(document.querySelector(".message")).render(
                <div className="alert alert-danger">
                  <center>Failed to delete that Painter</center>
                </div>
              );
            }
          })
          .catch((er) => {
            ReactDOM.createRoot(document.querySelector(".message")).render(
              <div className="alert alert-danger">
                <center>Failed to delete that painting</center>
              </div>
            );
          });
      },
      icon: "fas fa-trash",
    },
  ];

  // gettings galleries from server
  const load = () => {
    fetch(
      `${settings.server_domain}/get_user_paintings/${localStorage.getItem(
        "userId"
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("session")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let wantedData = data.data;
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
                    Authorization: `Bearer ${localStorage.getItem("session")}`,
                    userId: localStorage.getItem("userId"),
                  },
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  if (data.unauthorized) {
                    navigate("/sigin-in");
                  }
                  if (data.success) {
                    // if painting has deleted from database update UI
                    let wantedData = data.data;
                    params.delete();
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

        ReactDOM.createRoot(document.querySelector(".user")).render(
          <ListView
            items={wantedData}
            title="Your paintings"
            keyword={paintingKeywords}
            options={options}
          />
        );

        if (!data.authorized) {
          AlertError("You are not authorized to do this operation");
        } else {
          setGalleries(data.data);
        }
      });
  };

  load();

  return (
    <div className="home-main-container">
      <ProfileTopNav />

      <div className="user user-main"></div>
      <ProfileBottomNav home={load} paintings={paintings} />
    </div>
  );
}

export default UserProfilePage;
