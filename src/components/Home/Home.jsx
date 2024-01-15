import React, { useState, useEffect } from "react";
import "./Home.css";
import NavBar from "../NavBar/HomeNavBar.jsx";
import Gallery from "../Gallery/Gallery.jsx";
import Exhibitions from "../Exhibitions/Exhibitions.jsx";

import { useNavigate } from "react-router-dom";
function Home() {
  let navigate = useNavigate();
  const [exhibitions, setExhibitions] = useState([]);
  // function to remove dupplication from an array
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
      <NavBar />

      <div className="home-main-container">
        <div className="exhibition-section">
          <div className="home-exhibition-container">
            <Exhibitions exhibitions={exhibitions} />
          </div>
        </div>
        <div className="gallery-section">
          <header>
            <h1 className="h1">Galleries</h1>
          </header>
          <Gallery />
        </div>
      </div>
    </div>
  );
}

export default Home;
