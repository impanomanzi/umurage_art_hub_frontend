import React from "react";
import "./ExhibitionCard.css";
import { Link } from "react-router-dom";
import settings from "../settings.json";

function ExhibitionCard(props) {
  return (
    <div className="exhibition-card">
      <div className="exhibition-image">
        <img
          src={`${props.exhibition.image.replace(
            "http://localhost:5000",
            `${settings.server_domain}`
          )}`}
          loading="lazy"
          alt={`exbhition-${props.exhibition.name}`}
        />
      </div>

      <div className="exhibition-meta">
        <h5> {props.exhibition.name}</h5>
        <h3>Price: {props.exhibition.fees}</h3>
      </div>

      {/* {props.exhibition.status === "upcoming" ||
      props.exhibition.status === "current" ? ( */}
      <Link to={`/exhibition/${props.exhibition.id}`} className="join-btn">
        <button className="btn btn-primary">Join</button>
      </Link>
      {/* ) : null} */}
    </div>
  );
}

export default ExhibitionCard;
