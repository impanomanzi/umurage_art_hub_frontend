import Exhibitions from "../Exhibitions/Exhibitions";
import ReactDOM from "react-dom/client";
import "./ExhibitionsNavbar.css";
import exhibitions from "../db/exhibitions.json";

function ExhibitionsNavbar() {
  return (
    <div className="exhibition-container">
      <h3 id="exhibitions">Online Exhibitions</h3>
      <div className="exhibition-menu-container">
        <button
          onClick={() => {
            let currentExhibitions = exhibitions.filter((item) => {
              return item.status === "current";
            });
            let component = <Exhibitions exhibitions={currentExhibitions} />;
            let elementToScrolltoRect = document
              .querySelector(".home-main")
              .getBoundingClientRect();
            window.scrollTo({
              top: elementToScrolltoRect.top * 2,
              left: elementToScrolltoRect.left * 2,
            });
            ReactDOM.createRoot(document.querySelector(".home-main")).render(
              component
            );
            document.querySelector(".home-main").scrollIntoView();
          }}
          className="current"
        >
          current
        </button>
        <button
          className="upcoming"
          onClick={() => {
            let upcomingExhibitions = exhibitions.filter((item) => {
              return item.status === "upcoming";
            });
            let component = <Exhibitions exhibitions={upcomingExhibitions} />;
            let elementToScrolltoRect = document
              .querySelector(".home-main")
              .getBoundingClientRect();
            window.scrollTo({
              top: elementToScrolltoRect.top * 2,
              left: elementToScrolltoRect.left * 2,
            });
            ReactDOM.createRoot(document.querySelector(".home-main")).render(
              component
            );
            document.querySelector(".home-main").scrollIntoView();
          }}
        >
          Upcoming
        </button>
        <button
          className="past"
          onClick={() => {
            let pastExhibitions = exhibitions.filter((item) => {
              return item.status === "past";
            });
            let component = <Exhibitions exhibitions={pastExhibitions} />;
            let elementToScrolltoRect = document
              .querySelector(".home-main")
              .getBoundingClientRect();
            window.scrollTo({
              top: elementToScrolltoRect.top * 2,
              left: elementToScrolltoRect.left * 2,
            });
            ReactDOM.createRoot(document.querySelector(".home-main")).render(
              component
            );
            document.querySelector(".home-main").scrollIntoView();
          }}
        >
          Past
        </button>
      </div>
    </div>
  );
}

export default ExhibitionsNavbar;
