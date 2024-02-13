import React, { useState, useEffect } from "react";
import "./Home.css";
import HomeNavBar from "../NavBar/HomeNavBar.jsx";
import Gallery from "../Gallery/Gallery.jsx";
import Exhibitions from "../Exhibitions/Exhibitions.jsx";
import Announcement from "../Announcement/Announcement.jsx";
import { useNavigate } from "react-router-dom";
function Home(props) {
  let navigate = useNavigate();
  const { exhibitions, paintings } = props;
  const removeDuplication = (array) => {
    let clearArray = [];

    for (let i = 0; i < array.length; i++) {
      let found = false;
      for (let j = 0; j < clearArray.length; j++) {
        if (array[i] === clearArray[j]) {
          found = true;
        }
      }
      if (found === false) {
        clearArray.push(array[i]);
      }
    }
    return clearArray;
  };

  const loading = () => {
    ReactDOM.createRoot(document.querySelector(".profile-main")).render(
      <div
        className="exhibition-paintings-container"
        style={{ color: "white" }}
      >
        <center>
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </center>
      </div>
    );
  };

  return (
    <div className="home">
      <HomeNavBar />
      <div className="announcement-container"></div>
      <Announcement />

      <div className="home-main-container">
        <div className="exhibition-section">
          <div className="home-exhibition-container">
            {exhibitions.length == 0 ? (
              <div
                style={{
                  height: "20vh",
                  fontSize: "4rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i className="fas fa-trash-alt"></i>
                <center style={{ color: "dodgerBlue" }}>No Data</center>
              </div>
            ) : (
              <Exhibitions exhibitions={exhibitions} />
            )}
          </div>
        </div>
        <div className="gallery-section">
          <header>
            <h2>GALLERIES</h2>
          </header>
          {paintings.length == 0 ? (
            <div
              style={{
                height: "100%",
                fontSize: "4rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i className="fas fa-trash-alt"></i>
              <center style={{ color: "dodgerBlue" }}>No Data</center>
            </div>
          ) : (
            <Gallery paintings={paintings} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
