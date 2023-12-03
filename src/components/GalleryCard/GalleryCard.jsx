import React from "react";
import "./GalleryCard.css";
import { Link } from "react-router-dom";

function GalleryCard(props) {
  return (
    <Link
      to={`https://wa.me/?phone=${props.gallery.phone}`}
      className="gallery-card"
    >
      <div className="gallery-image">
        <img
          src={props.gallery.image}
          loading="lazy"
          alt={`exbhition-${props.gallery.name}`}
        />
      </div>

      <div className="gallery-meta">
        <div className="gallery-details">
          <span>
            <b>Name:</b> <i>{props.gallery.name}</i>
          </span>
          <span>
            <b>Category:</b> <i>{props.gallery.category}</i>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default GalleryCard;
