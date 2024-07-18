import "./Home.css";
import Announcement from "../Announcement/Announcement.jsx";
import Exhibitions from "../Exhibitions/Exhibitions.jsx";
import Gallery from "../Gallery/Gallery.jsx";
import HomeNavBar from "../NavBar/HomeNavBar.jsx";
import Moto from "../Moto/Moto.jsx";
import { motion } from "framer-motion";
import { useContext, useEffect, useRef } from "react";
import { useInView, useAnimation } from "framer-motion";
import { PaintingAndExhibitionsContext } from "../Contexts/PaintingAndExhibitionsContext.jsx";
function Home() {
  const { exhibitions, paintings } = useContext(PaintingAndExhibitionsContext);
  const renderExhibitions = () => {
    return exhibitions?.length == 0 ? (
      <div style={styles.centeredContainer}>
        <i className="fas fa-trash-alt"></i>
        <center style={{ color: "dodgerBlue" }}>
          Oops, no active exhibitions are available
        </center>
      </div>
    ) : (
      <Exhibitions exhibitions={exhibitions} />
    );
  };
  const renderGallery = () => {
    return paintings?.data.length == 0 ? (
      <div style={styles.centeredContainer}>
        <i className="fas fa-trash-alt"></i>
        <center style={{ color: "dodgerBlue" }}>No Data</center>
      </div>
    ) : (
      <Gallery paintings={paintings} ref={ref} mainControls={mainControls} />
    );
  };

  const renderMoto = () => {
    return <Moto />;
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <div className="home">
      <HomeNavBar />
      <div>
        <Announcement />
      </div>

      <div className="home-main-container">
        <div className="exhibition-section">
          <header>
            <h2>Exhibitions</h2>
          </header>
          <div className="home-exhibition-container">{renderExhibitions()}</div>
        </div>
        <div className="gallery-section">
          <header>
            <h2>Galleries</h2>
          </header>
          {renderGallery()}
        </div>
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: "0.5", delay: "0.25" }}
          className="moto-section"
        >
          <header>
            <h2>About</h2>
          </header>
          {renderMoto()}
        </motion.div>
      </div>
    </div>
  );
}
const styles = {
  centeredContainer: {
    height: "100%",
    fontSize: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};
export default Home;
