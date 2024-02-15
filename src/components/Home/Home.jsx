import "./Home.css";
import Announcement from "../Announcement/Announcement.jsx";
import Exhibitions from "../Exhibitions/Exhibitions.jsx";
import Gallery from "../Gallery/Gallery.jsx";
import HomeNavBar from "../NavBar/HomeNavBar.jsx";
import Moto from "../Moto/Moto.jsx";
import React from "react";
function Home(props) {
  const { exhibitions, paintings } = props;
  const renderExhibitions = () => {
    return exhibitions.length == 0 ? (
      <div style={styles.centeredContainer}>
        <i className="fas fa-trash-alt"></i>
        <center style={{ color: "dodgerBlue" }}>No Data</center>
      </div>
    ) : (
      <Exhibitions exhibitions={exhibitions} />
    );
  };
  const renderGallery = () => {
    return paintings.length == 0 ? (
      <div style={styles.centeredContainer}>
        <i className="fas fa-trash-alt"></i>
        <center style={{ color: "dodgerBlue" }}>No Data</center>
      </div>
    ) : (
      <Gallery paintings={paintings} />
    );
  };

  const renderMoto = () => {
    return <Moto />;
  };

  return (
    <div className="home">
      <HomeNavBar />
      <Announcement />

      <div className="home-main-container">
        <div className="exhibition-section">
          <header>
            <h2>EXHIBITIONS</h2>
          </header>
          <div className="home-exhibition-container">{renderExhibitions()}</div>
        </div>
        <div className="gallery-section">
          <header>
            <h2>GALLERIES</h2>
          </header>
          {renderGallery()}
        </div>
        <div className="moto-section">
          <header>
            <h2>OUR GOALS</h2>
          </header>
          {renderMoto()}
        </div>
      </div>
    </div>
  );
}
const styles = {
  centeredContainer: {
    height: "100%",
    fontSize: "4rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};
export default Home;
