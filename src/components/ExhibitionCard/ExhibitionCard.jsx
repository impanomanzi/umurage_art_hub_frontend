import React from "react";
import "./ExhibitionCard.css";
import { Link } from "react-router-dom";
import settings from "../settings.json";

function ExhibitionCard(props) {
  return (
    <>
      <div className="exhibition-card">
        <div className="exhibition-image">
          <img
            ref={props.mref}
            id={props.exhibition.id}
            src={`${props.exhibition.image.replace(
              "http://localhost:5000",
              `${settings.server_domain}`
            )}`}
          />
        </div>

        <div className="exhibition-meta">
          <h5 className="h5"> {props.exhibition.name}</h5>
          <p className="lead">
            <p className="lead">
              {props.exhibition.startdate}
              &nbsp;
              <i className="fas fa-arrow-right"></i>
              &nbsp;
              {props.exhibition.enddate}
            </p>
            <p className="lead">
              Entrance:<b> {props.exhibition.fees} Rwf</b>
            </p>
          </p>
          <Link to={`/exhibition/${props.exhibition.id}`} className="join-btn">
            <button className="btn btn-primary">Join</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ExhibitionCard;
