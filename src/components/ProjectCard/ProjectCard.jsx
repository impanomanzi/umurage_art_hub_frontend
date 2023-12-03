import React from "react";
import "./ProjectCard.css";

function ProjectCard(props) {
  return (
    <div className="project-card">
      <div className="project-image">
        <img
          src={props.project.image}
          loading="lazy"
          alt={`project-${props.index}`}
        />
      </div>

      <div className="project-meta">
        <div className="project-details">{props.project.image}</div>

        <div className="project-nav">
          <span>
            <h5>
              <b>
                {props.project.price}-{props.project.price}
              </b>
            </h5>
          </span>
        </div>
      </div>
      <button className="primary">Contact supplier</button>
    </div>
  );
}

export default ProjectCard;
