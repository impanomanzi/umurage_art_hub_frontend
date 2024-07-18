import "./ExhibitionCard.css";
import { Link } from "react-router-dom";
import settings from "../settings.json";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ExhibitionCard(props) {
  return (
    <>
      <div className="exhibition-card">
        <div className="exhibition-image">
          <LazyLoadImage
            src={`${props.exhibition.image.replace(
              "http://localhost:5000",
              `${settings.server_domain}`
            )}`}
            effect="blur"
            placeholderSrc="/placeholder.png"
            width={"265px"}
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
