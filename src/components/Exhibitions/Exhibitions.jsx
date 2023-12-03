import React from "react";
import ExhibitionCard from "../ExhibitionCard/ExhibitionCard";

import "./Exihibitions.css";
function Exhibitions(props) {
  return (
    <div className="exhibitions-outer-container">
      <div className="exhibition-header">
        <h2>
          Exhibitions <i className="fas fa-arrow-right"></i>
        </h2>
      </div>

      <div className="exhibitions-container" id="exhibitions-container">
        {props.exhibitions.map((exhibition, index) => {
          return <ExhibitionCard exhibition={exhibition} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Exhibitions;
