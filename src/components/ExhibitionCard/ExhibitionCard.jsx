import "./ExhibitionCard.css";
import { Link } from "react-router-dom";
import settings from "../settings.json";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CurrencyView from "../CurrencyView/CurrencyView";

function ExhibitionCard({exhibition}) {
  return (
    <>
      <div className="exhibition-card">
        <div className="exhibition-image">
          <LazyLoadImage
            src={`${exhibition.image.replace(
              "http://localhost:5000",
              `${settings.server_domain}`
            )}`}
            effect="blur"
            placeholderSrc="/placeholder.png"
            width={"265px"}
          />
        </div>

        <div className="exhibition-meta">
          <h5 className="h5"> {exhibition.name}</h5>
          <p className="lead">
             
              {exhibition.startdate}
              &nbsp;
              <i className="fas fa-arrow-right"></i>
              &nbsp;
              {exhibition.enddate}
            </p>
             
              <CurrencyView
                number={exhibition.fees}
                style={{ fontSize: "1.2rem", padding:"0px", margin:"0px" }}
              />
             
          
          <Link to={`/exhibition/${exhibition.id}`} state={{"id":exhibition.id}}>
            <button className="btn join-btn">Join</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ExhibitionCard;
