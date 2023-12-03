import React from "react";
import "./ExhibitionCard.css";
import { Link } from "react-router-dom";

function ExhibitionCard(props) {
  return (
    <div className="exhibition-card">
      <div className="exhibition-image">
        <img
          src={props.exhibition.image}
          loading="lazy"
          alt={`exbhition-${props.exhibition.name}`}
        />
      </div>

      <div className="exhibition-meta">
        <h3>Price: {props.exhibition.fees}</h3>
      </div>

      {/* {props.exhibition.status === "upcoming" ||
      props.exhibition.status === "current" ? ( */}
      <Link to={`/payment/${props.exhibition.id}`} className="join-btn">
        <button>Join</button>
      </Link>
      {/* ) : null} */}
    </div>
  );
}

export default ExhibitionCard;
