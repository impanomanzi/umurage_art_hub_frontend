import { LazyLoadImage } from "react-lazy-load-image-component";
import "../Forms/FormTemplate/FormTemplate.css";
import FormNavbar from "../NavBar/FormNavbar";
import { Link, useParams } from "react-router-dom";
import settings from "../settings.json";
import "./ExhibitionShowPage.css";
import { useMemo } from "react";
import useExhibitions from "../../hooks/useExhibitions";

function ExhibitionShowPage() {
  const { exhibitions } = useExhibitions();
  const exhibitionId = useParams().id;
  const wanted = useMemo(
    () => exhibitions.filter((item) => (item.id = exhibitionId))[0],
    [exhibitions]
  );

  return (
    <>
      <FormNavbar />
      <div className="form-outer-container">
        <div className="form-inner-container">
          <div>
            <h2>{wanted?.name.toUpperCase()}</h2>
            <LazyLoadImage
              src={`${wanted?.image.replace(
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

              <Link
                to={`/payment/${exhibitionId}`}
                className="btn btn-primary"
                style={{ width: "100%", marginBottom: "1em" }}
                state={{ exhibition: wanted }}
              >
                Register
              </Link>
              <br />
              <div className="horizontal-line">
                <span className="left-line">&nbsp;</span>
                <span className="text"> or</span>
                <span className="right-line">&nbsp;</span>
              </div>

              <Link
                to={`/check_payment/${exhibitionId}`}
                className="btn btn-outline-primary"
                style={{ marginTop: "1em", width: "100%" }}
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExhibitionShowPage;
