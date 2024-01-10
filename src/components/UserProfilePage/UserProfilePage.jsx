import React from "react";
import { useState, useEffect } from "react";
import ProfileTopNav from "../ProfileTopNav/ProfileTopNav";
import ProfileBottomNav from "../ProfileBottomNav/ProfileBottomNav";
import settings from "../settings.json";
import GalleryCard from "../GalleryCard/GalleryCard";
import ListView from "../ListView/ListView";
import ReactDOM from "react-dom/client";
import "./UserProfilePage.css";
import { useNavigate } from "react-router-dom";
function UserProfilePage(props) {
  const navigate = useNavigate();
  const [galleries, setGalleries] = useState([]);

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
            callBack: (event, painting) => {
              fetch(
                `${settings.server_domain}/delete_painting/${painting.id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("session")}`,
                  },
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  if (data.unauthorized) {
                    navigate("/sigin-in");
                  }
                  if (data.success) {
                    // if painting has deleted from database update UI
                    let wantedData = data.data.filter((item, index) => {
                      return item.owner == localStorage.getItem("username");
                    });
                    ReactDOM.createRoot(document.querySelector(".user")).render(
                      <ListView
                        items={wantedData}
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

        ReactDOM.createRoot(document.querySelector(".user")).render(
          <ListView
            items={wantedData}
            title="Your paintings"
            options={options}
          />
        );

        if (!data.authorized) {
          console.log(data);
        } else {
          console.log(data);

          setGalleries(data.data);
        }
      });
  };

  load();

  return (
    <div className="home-main-container">
      <ProfileTopNav />

      <div className="user user-main">
        <center>
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </center>
      </div>
      <ProfileBottomNav home={load} />
    </div>
  );
}

export default UserProfilePage;
