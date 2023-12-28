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
function Home() {
  const [exhibitions, setExhibitions] = useState([]);
  const [imagesObject, setImagesObject] = useState({}); // Declare imagesObject in the outer scope
  // function to remove dupplication from an array
  const removeDuplication = (array) => {
    // console.log(array);
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
  useEffect(() => {
    // const cookieValue = document.cookie
    //   .split("; ")
    //   .find((row) => row.startsWith("session="))
    //   .split("=")[1];
    // console.log(cookieValue);
    const headers = new Headers();
    headers.set("Cookie", `session=${""}`);
    fetch(`${settings.server_domain}/get_exhibitions`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setExhibitions(data);
      });
  }, []);

  return (
    <div className="home">
      <NavBar />
      <div className="home-main-container">
        <div className="exhibition-section">
          {/* <header>
            <h1>Currently available exhibtions</h1>
            <p>
              All exhibition are available. So, select which is better for you.
            </p>
          </header> */}
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
