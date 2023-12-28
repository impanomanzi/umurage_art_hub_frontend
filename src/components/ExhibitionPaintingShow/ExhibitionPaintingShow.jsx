import React from "react";
import { useLocation } from "react-router-dom";
import settings from "../settings.json";
import "./ExhibitionPaintingShow.css";
import FormNavbar from "../NavBar/FormNavbar";

function ExhibitionPaintingShow(props) {
  let query = new URLSearchParams(useLocation().search);
  return (
    <>
      <FormNavbar />
      <div className="exhibition-painting-show-container">
        <div className="exhibition-painting-img">
          <img
            src={`${query.get("i")}`.replace(
              "http://localhost:5000",
              `${settings.server_domain}`
            )}
            alt=""
          />
        </div>
        <audio
          src={`${query.get("a")}`.replace(
            "http://localhost:5000",
            `${settings.server_domain}`
          )}
          controls="controls"
          preload="auto"
          autoPlay
        >
          AUDIO NOT SUPPORTED
        </audio>
      </div>
    </>
  );
}

export default ExhibitionPaintingShow;
