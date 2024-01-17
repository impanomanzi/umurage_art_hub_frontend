import React from "react";
import { useLocation } from "react-router-dom";
import settings from "../settings.json";
import "./ExhibitionPaintingShow.css";
import FormNavbar from "../NavBar/FormNavbar";
import ReactImageMagnify from "react-image-magnify";

function ExhibitionPaintingShow(props) {
  let query = new URLSearchParams(useLocation().search);
  return (
    <>
      <FormNavbar />
      <div className="painting-container">
        {/* <span>
          <center>
            <h3 className="h3">Name</h3>
            <p className="lead">
              {query.get("name")} <br />
            </p>
          </center>
        </span> */}
        <div className="exhibition-painting-show-container">
          <div className="exhibition-painting-img">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Exhibition painting",
                  isFluidWidth: true,
                  src: `${query.get("i")}?clientId=${localStorage.getItem(
                    "clientId"
                  )}&exId=${query.get("eid")}`.replace(
                    "http://localhost:5000",
                    `${settings.server_domain}`
                  ),
                },
                largeImage: {
                  src: `${query.get("i")}?clientId=${localStorage.getItem(
                    "clientId"
                  )}&exId=${query.get("eid")}`.replace(
                    "http://localhost:5000",
                    `${settings.server_domain}`
                  ),
                  width: 1200,
                  height: 1200,
                },
                isHintEnabled: true,
                shouldHideHintAfterFirstActivation: false,
                hintTextTouch: true,
                isActivatedOnTouch: true,
                enlargedImagePosition: "over",
              }}
            />

            {/* <img
              src={`${query.get("i")}?clientId=${localStorage.getItem(
                "clientId"
              )}&exId=${query.get("eid")}`.replace(
                "http://localhost:5000",
                `${settings.server_domain}`
              )}
              alt=""
            /> */}
            <center>
              {" "}
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
