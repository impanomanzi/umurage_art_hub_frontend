import React from "react";
import "./GalleryCard.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import settings from "../settings.json";

function GalleryCard(props) {
  return (
    <div className="gallery-card card">
      <img
        src={props.gallery.image.replace(
          "http://localhost:5000",
          `${settings.server_domain}`
        )}
        className="card-img-top gallery-image"
        loading="lazy"
        alt={`exbhition-${props.gallery.name}`}
      />
      <div className="card-body">
        {/* <p className="card-text">
          Name:{props.gallery.name} <br />
          Category:{props.gallery.category}
        </p> */}

        <Link
          to={`https://wa.me/${props.gallery.phone}`.trim()}
          className="btn btn-primary"
        >
          <i className="fas fa-phone"></i>
        </Link>
      </div>
    </div>
  );
}

export default GalleryCard;
