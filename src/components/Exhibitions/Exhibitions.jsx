import React from "react";
import ExhibitionCard from "../ExhibitionCard/ExhibitionCard";

import "./Exihibitions.css";
function Exhibitions(props) {
  const removeSkeletons = (index) => {
    document.querySelector(`.exhibitions-container`).innerHTML = "";
  };
  return (
    <div className="exhibitions-outer-container">
      <div className="exhibitions-container" id="exhibitions-container">
        <div className="skeleton skeleton0">
          <p className="skeleton-content">&nbsp;</p>
        </div>
        <div className="skeleton skeleton1">
          <p className="skeleton-content">&nbsp;</p>
        </div>
        <div className="skeleton skeleton2">
          <p className="skeleton-content">&nbsp;</p>
        </div>
        <div className="skeleton skeleton3">
          <p className="skeleton-content">&nbsp;</p>
        </div>
        <div className="skeleton skeleton4">
          <p className="skeleton-content">&nbsp;</p>
        </div>
        <div className="skeleton skeleton5">
          <p className="skeleton-content">&nbsp;</p>
        </div>
        <div className="skeleton skeleton6">
          <p className="skeleton-content">&nbsp;</p>
        </div>
        <div className="skeleton skeleton7">
          <p className="skeleton-content">&nbsp;</p>
        </div>
        {props.exhibitions.map((exhibition, index) => {
          removeSkeletons(index);
          return <ExhibitionCard exhibition={exhibition} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Exhibitions;
