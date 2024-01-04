import React from "react";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import settings from "../settings.json";
import "./ExhibitionShowPage.css";
import FormNavbar from "../NavBar/FormNavbar";

function ExhibitionShowPage() {
  let exhibitionId = useParams().id;
  fetch(`${settings.server_domain}/get_exhibition/${exhibitionId}`)
    .then((response) => response.json())
    .then((data) => {
      let wanted = data;
      let exhibitionPage = (
        <div className="exhibition-page-container">
          <div>
            <h1 className="h1" style={{ color: "white" }}>
              {wanted.name}
            </h1>
            <p className="exhibition-description">
              <p>
                <i className="fas fa-user-alt"></i>&nbsp;
                {wanted.host}
              </p>
              &nbsp;&nbsp; &nbsp;
              <p>
                <i className="fas fa-calendar"></i>
                &nbsp; {wanted.startdate}
              </p>
              &nbsp; &nbsp;
              <p>
                <i className="fas fa-calendar"></i>
                &nbsp; {wanted.enddate}
              </p>
              &nbsp;
            </p>
          </div>
          <img
            src={`${wanted.image.replace(
              "http://localhost:5000",
              `${settings.server_domain}`
            )}`}
            alt={wanted.name}
          />

          <div className="exhibition-continue">
            <h3 className="h3">Entrace:</h3>
            <h1 className="h1">{wanted.fees} </h1>
            <h4 className="h4"> Rwf</h4>
            <a href={`/payment/${exhibitionId}`}>
              <button className="btn btn-primary">
                Continue &nbsp; <i className="fas fa-arrow"></i>
              </button>
            </a>
            <a href={`/check_payment/${exhibitionId}`}>
              <button
                className="btn btn-secondary"
                style={{ marginTop: "1em" }}
              >
                Already paid? &nbsp; <i className="fas fa-arrow"></i>
              </button>
            </a>
          </div>
        </div>
      );
      ReactDOM.createRoot(
        document.querySelector(".exhibition-show-container")
      ).render(exhibitionPage);
    });
  return (
    <>
      <FormNavbar />
      <div className="exhibition-show-container"></div>
    </>
  );
}

export default ExhibitionShowPage;
