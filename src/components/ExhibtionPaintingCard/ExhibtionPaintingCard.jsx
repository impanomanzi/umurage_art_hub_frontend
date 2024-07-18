import "./ExhibtionPaintingCard.css";
import "bootstrap/dist/css/bootstrap.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import settings from "../settings.json";

function ExhibtionPaintingCard(props) {
  return (
    <div className="card exhibition-painting-card">
      <LazyLoadImage
        src={`${props.item.image}?clientId=${localStorage.getItem(
          "clientId"
        )}&exId=${props.exhibition}`.replace(
          "http://localhost:5000",
          `${settings.server_domain}`
        )}
        effect="blur"
        placeholderSrc="/placeholder.png"
        className="ecard-img"
        width={"300px"}
        height={"320px"}
      />

      <div className="card-body">
        <p className="card-title lead">{props.item.name}</p>
        <details>
          <summary>Details</summary>
          <p className="card-text">{props.item.description}</p>
        </details>
        <a
          href={`/view_painting/${props.item.id}?i=${props.item.image}&a=${props.item.audio}&name=${props.item.name}&des=${props.item.description}&painter=${props.item.painter}&exhibition=${props.item.owner}&eid=${props.exhibition}&b=/exhibition_paintings/${props.exhibition}`}
          className="btn btn-primary"
        >
          View
        </a>
      </div>
    </div>
  );
}

export default ExhibtionPaintingCard;
