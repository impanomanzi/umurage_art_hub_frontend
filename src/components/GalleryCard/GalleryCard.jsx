import { useState } from "react";
import "./GalleryCard.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import settings from "../settings.json";
import { toast } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
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
        }
      })
      .catch((error) => {
        setLikes(temp - 1);
        toast.error(error.toString());
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
          toast.error("failed");
        }
      })
      .catch((error) => {
        setLikes(temp + 1);
      });
  };
  let imageUrl = props.gallery.image;
  let index1 = imageUrl.indexOf("upload/") + "upload/".length;
  let newUrl =
    imageUrl.substring(0, index1) +
    "c_auto,g_auto,h_350,w_300/" +
    imageUrl.substring(index1, imageUrl.length);
  return (
    <div className="col-md-4 mt-2 col-lg-3 gallery-card">
      <a
        href=""
        onClick={(event) => {
          props.onImageClicked(event, props.gallery);
        }}
      >
        <LazyLoadImage
          src={newUrl}
          effect="blur"
          placeholderSrc="/placeholder.png"
          width={"300px"}
          height={"320px"}
        />
      </a>

      <div className="card-body gallery-card-link">
        <div
          className="btn-group"
          role="group"
          aria-label="button group for filtering and sorting gallery painting"
        >
          <Link
            to={`https://api.whatsapp.com/send?phone=${props.gallery.phone}`.trim()}
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
                    url: imageUrl,
                  })
                  .then(() => toast.success("Successful share"))
                  .catch((error) => toast.error("Error sharing", error));
              }
            }}
          >
            <i className="fas fa-share"></i> &nbsp;share
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
            style={{ backgroundColor: "#ed9b1f" }}
          >
            <i className="fas fa-heart"></i>&nbsp;
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
