import React from "react";
import ReactDOM from "react-dom/client";
import PaintingCreationForm from "../PaintingCreationForm/PaintingCreationForm";
import "./ProfileBottomNav.css";
import { render } from "react-dom";

function ProfileBottomNav(props) {
  return (
    <div className="profile-bottom-nav-container">
      <div className="home-area">
        <button
          className="btn btn-primary"
          onClick={() => {
            ReactDOM.createRoot(document.querySelector(".user")).render(
              <div className="user user-main">
                <center>
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </center>
              </div>
            );
            props.home();
          }}
        >
          <i className="fas fa-home"></i>
        </button>
      </div>
      <div className="add-area">
        <button
          className="btn btn-primary"
          onClick={(event) => {
            console.log(document.querySelector(".user"));
            ReactDOM.createRoot(document.querySelector(".user")).render(
              <PaintingCreationForm />
            );
          }}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="contact-area">
        <button className="btn btn-primary">
          <i className="fas fa-user-circle"></i>
        </button>
      </div>
    </div>
  );
}

export default ProfileBottomNav;
