import React from "react";
import "../HomeProjectCard";

function HomeProjectCard(props) {
  return (
    <div className="home-project-card">
      <span className="home-project-card-image-container">
        <img src={props.project.image} />
      </span>
      <span>{props.project.description}</span>
      <div className="home-project-card-nav">
        <button>Edit</button>
        <button>Share</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default HomeProjectCard;
