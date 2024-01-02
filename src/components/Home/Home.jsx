import React, { useState, useEffect } from "react";
import Switcher from "../Switcher/Switcher.jsx";
import "./Home.css";
import NavBar from "../NavBar/HomeNavBar.jsx";
import ProjectCard from "../ProjectCard/ProjectCard.jsx";
import HomeProjectsSlider from "../HomeProjectsSlider/HomeProjectsSlider.jsx";
import ExhibitionsNavbar from "../ExhibitionsNavbar/ExhibitionsNavbar.jsx";
import Gallery from "../Gallery/Gallery.jsx";
import Exhibitions from "../Exhibitions/Exhibitions.jsx";
import settings from "../settings.json";
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
  let fetched = false;
  useEffect(() => {
    fetch(`${settings.server_domain}/get_exhibitions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message != false) {
          fetched = true;
          setExhibitions(data);
        } else {
          navigate("/sign-in");
        }
      });
  }, []);

  return (
    <div className="home">
      <NavBar />
      <div className="message"></div>
      <div className="home-main-container">
        <div className="exhibition-section">
          <div className="home-exhibition-container">
            <Exhibitions exhibitions={exhibitions} />
          </div>
        </div>
        <div className="gallery-section">
          <header>
            <h1>Expoler galleries</h1>
            <p>
              All our painters everyone has gallery expoler their galleries and
              appreciate their work.
            </p>
          </header>
          <Gallery exhibitions={exhibitions} />
        </div>
      </div>
    </div>
  );
}

export default Home;
