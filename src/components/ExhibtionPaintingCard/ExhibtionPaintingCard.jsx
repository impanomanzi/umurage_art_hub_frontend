import React from "react";
import "./ExhibtionPaintingCard.css";
import "bootstrap/dist/css/bootstrap.css";
import settings from "../settings.json";

function ExhibtionPaintingCard(props) {
  console.log(props.item);
  return (
    <div className="card exhibition-painting-card">
      <img
        src={`${props.item.image}`.replace(
          "http://localhost:5000",
          `${settings.server_domain}`
        )}
        loading="lazy"
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{props.item.name}</h5>
        <p className="card-text">{props.item.description}</p>
        <a
          href={`/view_painting/${props.item.id}?i=${props.item.image}&a=${props.item.audio}&name=${props.item.name}&des=${props.item.description}&painter=${props.item.painter}&exhibition=${props.item.owner}`}
          className="btn btn-primary"
        >
          <i className="fas fa-eye"></i>
        </a>
      </div>
    </div>
  );
}

export default ExhibtionPaintingCard;
