import React from "react";
import ExhibitionCard from "../ExhibitionCard/ExhibitionCard";
import ReactDOM from "react-dom/client";

import "./Exihibitions.css";
function Exhibitions(props) {
  const removeSkeletons = (index) => {
    document.querySelector(`.exhibitions-loading`).innerHTML = "";
  };

  return (
    <div className="exhibitions-outer-container">
      <div className="header">
        <center>
          <h1 className="h1" style={{ color: "white" }}>
            Exhibitions
          </h1>
        </center>
      </div>
      <div className="exhibitions-loading" style={{ color: "white" }}>
        <center style={{ marginTop: "25%" }}>
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            <p className="lead">Loading exhibitions</p>
          </div>
        </center>
      </div>
      <div className="exhibitions-container" id="exhibitions-container">
        {props.exhibitions.map((exhibition, index) => {
          removeSkeletons();
          return <ExhibitionCard exhibition={exhibition} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Exhibitions;
