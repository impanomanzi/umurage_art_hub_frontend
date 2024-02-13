import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import settings from "../settings.json";
import "./ExhibitionPaintingShow.css";
import FormNavbar from "../NavBar/FormNavbar";
import ReactImageMagnify from "@blacklab/react-image-magnify";

function ExhibitionPaintingShow(props) {
  let query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  return (
    <>
      <FormNavbar />
      <div className="painting-container">
        <div className="exhibition-painting-show-container">
          <button
            className="btn"
            style={{ color: "red" }}
            onClick={(event) => {
              // console.log(props.back);
              navigate(query.get("b"));
              document.querySelector(
                ".exhibition-painting-show-container"
              ).style.display = "none";
            }}
          >
            <i className="fas fa-times"></i>
          </button>
          <div className="exhibition-painting-img">
            <ReactImageMagnify
              imageProps={{
                className: "x-image",
                src: `${query.get("i")}?clientId=${localStorage.getItem(
                  "clientId"
                )}&exId=${query.get("eid")}`.replace(
                  "http://localhost:5000",
                  `${settings.server_domain}`
                ),
              }}
              portalProps={{
                placement: "over",
              }}
              magnifiedImageProps={{
                src: `${query.get("i")}?clientId=${localStorage.getItem(
                  "clientId"
                )}&exId=${query.get("eid")}`.replace(
                  "http://localhost:5000",
                  `${settings.server_domain}`
                ),
                width: "800px",
                height: "950px",
              }}
            />

            <center>
              <audio
                src={`${query.get("a")}?clientId=${localStorage.getItem(
                  "clientId"
                )}&exId=${query.get("eid")}`.replace(
                  "http://localhost:5000",
                  `${settings.server_domain}`
                )}
                controls="controls"
                preload="auto"
                autoPlay
                loop
              ></audio>
            </center>
          </div>
        </div>
        {/* <span>
          <center>
            <h3 className="h3">Description</h3>
            <p className="lead">{query.get("des")}</p>
          </center>
        </span> */}
      </div>
    </>
  );
}

export default ExhibitionPaintingShow;
