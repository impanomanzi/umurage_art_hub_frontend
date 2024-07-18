import { PaintingAndExhibitionsContext } from "../Contexts/PaintingAndExhibitionsContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../Forms/FormTemplate/FormTemplate.css";
import FormNavbar from "../NavBar/FormNavbar";
import { useParams } from "react-router-dom";
import settings from "../settings.json";
import "./ExhibitionShowPage.css";
import { useContext } from "react";

function ExhibitionShowPage() {
  const { exhibitions, paintings } = useContext(PaintingAndExhibitionsContext);
  const exhibitionId = useParams().id;
  const wanted = exhibitions.filter((item, index) => {
    return (item.id = exhibitionId);
  })[0];

  return (
    <>
      <FormNavbar />
      <div className="form-outer-container">
        <div className="form-inner-container">
          <div>
            <h2>{wanted.name.toUpperCase()}</h2>
            <LazyLoadImage
              src={`${wanted.image.replace(
                "http://localhost:5000",
                `${settings.server_domain}`
              )}`}
              effect="blur"
              placeholderSrc="/placeholder.png"
              width={"300px"}
              height={"350px"}
            />
          </div>
          <div>
            <div>
              <p>
                <i className="fas fa-user-alt">&nbsp;Host</i> &nbsp;
                {wanted.host}
              </p>

              <p>
                <i className="fas fa-calendar">&nbsp; Start</i> &nbsp;{" "}
                {wanted.startdate}
              </p>

              <p>
                <i className="fas fa-calendar">&nbsp; End</i>
                &nbsp; {wanted.enddate}
              </p>
            </div>
            <div>
              <h3>Entrace:&nbsp;{wanted.fees} Rwf </h3>

              <a href={`/payment/${exhibitionId}`}>
                <button className="btn btn-primary">
                  Register &nbsp; <i className="fas fa-arrow-right"></i>
                </button>
              </a>
              <br />
              <div className="horizontal-line">
                <span className="left-line">&nbsp;</span>
                <span className="text"> Already paid?</span>
                <span className="right-line">&nbsp;</span>
              </div>

              <a href={`/check_payment/${exhibitionId}`}>
                <button
                  className="btn btn-outline-primary"
                  style={{ marginTop: "1em" }}
                >
                  Sign in
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExhibitionShowPage;
