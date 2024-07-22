import { useState } from "react";
import "./GalleryCard.css";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { API } from "../../API/serverRequest";
import useToast from "../../hooks/useToast";
function GalleryCard(props) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes);
  const setToast = useToast();
  const location = useLocation();
  let imageUrl = props.gallery.image;
  let index1 = imageUrl.indexOf("upload/") + "upload/".length;
  let newUrl =
    imageUrl.substring(0, index1) +
    "q_auto:best/" +
    imageUrl.substring(index1, imageUrl.length);

  const like = async () => {
    let temp = Number.parseInt(likes);
    try {
      setLikes(temp + 1);
      const resp = await API.likePainting(props.gallery.id);
      if (resp.success) {
        setLiked(true);
        setLikes(resp.likes);
      } else {
        setLikes(temp - 1);
      }
    } catch (error) {
      setLikes(temp - 1);
    }
  };
  const dislike = async () => {
    try {
      let temp = Number.parseInt(likes ? likes : 0);
      setLikes(temp > 0 ? temp - 1 : 0);
      const resp = await API.dislikePainting(props.gallery.id);
      if (resp.success) {
        setLiked(false);
        setLikes(data.likes);
      } else {
        setLikes(temp + 1);
      }
    } catch (error) {
      setLikes(temp + 1);
    }
  };
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Umurage art hub",
          text: `${props.gallery.name} by \n ${props.gallery.owner}`,
          url: `${location.pathname}/${props.id}`,
        });
      } catch (error) {
        setToast({ variant: "danger", message: error.message });
      }
    }
  };

  return (
    <div className="col-md-4 mt-2 col-lg-3 gallery-card">
      <a
        className="image-viewer"
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
          <button className="btn btn-secondary" onClick={share}>
            <i class="fas fa-share-alt"></i>&nbsp; share
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              console.log(props.id);
              if (liked) {
                dislike();
              } else {
                like();
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
