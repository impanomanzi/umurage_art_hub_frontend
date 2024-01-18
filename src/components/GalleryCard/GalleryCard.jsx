import React from "react";
import { useState } from "react";
import "./GalleryCard.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import settings from "../settings.json";

function GalleryCard(props) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes);
  const [likeBtnText, setLikeBtnText] = useState("Like");
  const like = () => {
    let temp = Number.parseInt(likes);
    setLikes(temp + 1);
    fetch(`${settings.server_domain}/like/${props.gallery.id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLiked(true);
          setLikes(data.likes);
        } else {
          setLikes(temp - 1);
          setLikeBtnText("Like");
          console.log("failed");
        }
      })
      .catch((error) => {
        setLikes(temp - 1);
        console.log(error);
      });
  };
  const dislike = () => {
    let temp = Number.parseInt(likes);
    setLikes(temp > 0 ? temp - 1 : 0);
    fetch(`${settings.server_domain}/dislike/${props.gallery.id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLiked(false);
          setLikes(data.likes);
        } else {
          setLikes(temp + 1);
          console.log("failed");
        }
      })
      .catch((error) => {
        setLikes(temp + 1);
        console.log(error);
      });
  };
  return (
    <div className="col-md-4 mt-2 col-lg-3">
      <img
        src={props.gallery.image.replace(
          "http://localhost:5000",
          `${settings.server_domain}`
        )}
        className="w-100 shadow-1-strong rounded mb-4"
      />

      <div className="card-body gallery-card-link">
        <div
          class="btn-group"
          role="group"
          aria-label="button group for filtering and sorting gallery painting"
        >
          <Link
            to={`https://wa.me/${props.gallery.phone}`.trim()}
            className="btn btn-primary"
          >
            <i className="fas fa-cart-arrow-down"></i>&nbsp; Buy now
          </Link>
          <button
            className="btn btn-secondary"
            onClick={(event) => {
              if (navigator.share) {
                navigator
                  .share({
                    title: "Umurage art hub",
                    text: `${props.gallery.name} by \n ${props.gallery.owner}`,
                    url: props.gallery.image.replace(
                      "http://localhost:5000",
                      `${settings.server_domain}`
                    ),
                  })
                  .then(() => console.log("Successful share"))
                  .catch((error) => console.log("Error sharing", error));
              }
            }}
          >
            <i className="fas fa-share"></i> &nbsp; Share
          </button>
          <button
            className="btn btn-secondary"
            onClick={(event) => {
              if (!liked) {
                like();
              } else {
                dislike();
              }
            }}
          >
            <i className="fas fa-heart"></i> &nbsp; {likeBtnText} &nbsp;
            <span className="badge badge-light" style={{ color: "black" }}>
              {likes}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default GalleryCard;
