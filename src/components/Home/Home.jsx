import React, { useState, useEffect } from "react";
import Switcher from "../Switcher/Switcher.jsx";
import "./Home.css";
import NavBar from "../NavBar/HomeNavBar.jsx";
import ProjectCard from "../ProjectCard/ProjectCard.jsx";
import HomeProjectsSlider from "../HomeProjectsSlider/HomeProjectsSlider.jsx";
import ExhibitionsNavbar from "../ExhibitionsNavbar/ExhibitionsNavbar.jsx";
// import exhibitions from "../db/exhibitions.json";
import Gallery from "../Gallery/Gallery.jsx";
import Exhibitions from "../Exhibitions/Exhibitions.jsx";
import settings from "../settings.json";
function Home() {
  // const [currentTab, setCurrentTab] = useState("paintings");
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
    fetch(`${settings.server_domain}/get_exhibitions`)
      .then((response) => response.json())
      .then((data) => {
        setExhibitions(data);
      });
  }, []);
  // useEffect(() => {
  //   const fetchImages = async fetch() => {
  //     // const images = await import.meta.glob(
  //     //   "/public/images/*.{png,jpg,jpeg,svg}"
  //     // );
  //     setImagesObject(images); // Set imagesObject in the state
  //     const keys = Object.keys(images);
  //     let projectArray = keys.map((image) => {
  //       return { image: image, price: "5000Rwf", artist: "XXX" };
  //     });
  //     setImageArray(projectArray);
  //   };

  //   fetchImages();
  // }, []);

  return (
    <div className="home-main-container">
      <NavBar />
      <div className="home-exhibition-container">
        <Exhibitions exhibitions={exhibitions} />
      </div>
      {/* <HomeProjectsSlider projects={exhibitions} /> */}
      <Gallery exhibitions={exhibitions} />

      {/* <div className="home-main">
        <div className="project-container"></div>
      </div>

      <div className="switcher">
        <Switcher onText="Paintings" offText="Photos" />
      </div> */}
    </div>
  );
}

export default Home;
