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
          <div className="exhibition-description">
            <p>
              <h1>{wanted.name}</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae in asperiores pariatur dolor molestias ipsum rem,
                temporibus iusto distinctio quibusdam impedit, laboriosam
                quisquam unde omnis doloremque eligendi praesentium quo sit.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                repellendus tempora molestias pariatur accusantium labore ex
                dolores at odit, voluptates ea distinctio necessitatibus enim
                rem porro iste recusandae incidunt placeat.
              </p>
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
            <h3>Entrace:</h3>
            <h1>{wanted.fees} </h1>
            <h4>Rwf</h4>
            <a href={`/payment/${exhibitionId}`}>
              <button className="btn btn-primary">
                Continue &nbsp; <i className="fas fa-arrow"></i>
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
