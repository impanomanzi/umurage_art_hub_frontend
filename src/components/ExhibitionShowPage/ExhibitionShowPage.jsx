import { LazyLoadImage } from "react-lazy-load-image-component";
import "../Forms/FormTemplate/FormTemplate.css";
import FormNavbar from "../NavBar/FormNavbar";
import { Link, useParams } from "react-router-dom";
import settings from "../settings.json";
import "./ExhibitionShowPage.css";
import { useMemo } from "react";
import useExhibitions from "../../hooks/useExhibitions";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet-async";

function ExhibitionShowPage() {
  const { exhibitions } = useExhibitions();
  const exhibitionId = useParams().id;
  const wanted = useMemo(
    () => exhibitions.filter((item) => (item.id = exhibitionId))[0],
    [exhibitions]
  );

  return (
    <>
      <Helmet>
        <title>{wanted?.name}</title>
        <meta
          name="description"
          content={`Explore the ${wanted?.name}, a virtual exhibition showcasing. Join us online to experience a unique digital art event featuring works from various artists.`}
        />
        <meta
          name="keywords"
          content={`${wanted?.name}, Virtual Exhibition, Online Art Event, Digital Art Showcase,Art Exhibition`}
        />
      </Helmet>
      <FormNavbar />
      <div className="form-outer-container">
        <div className="form-inner-container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1 id="customer-form-header" className="main-title">
              {wanted?.name.toUpperCase()} by {wanted?.host}
            </h1>
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
            <ReactMarkdown className="w-20">{wanted.description}</ReactMarkdown>
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
