import React from "react";
import { useParams } from "react-router-dom";
import settings from "../settings.json";
import "./ExhibitionShowPage.css";
import FormNavbar from "../NavBar/FormNavbar";
import { ListItem } from "@mui/material";

function ExhibitionShowPage(props) {
  const { exhibitions } = props;
  const exhibitionId = useParams().id;
  const wanted = exhibitions.filter((item, index) => {
    return (item.id = exhibitionId);
  })[0];

  return (
    <>
      <FormNavbar />
      <center>
        <h2>{wanted.name.toUpperCase()}</h2>
      </center>
      <div className="exhibition-show-container">
        <div className="exhibition-page-container">
          <div>
            <div className="exhibition-description">
              <ListItem>
                <p>
                  <i className="fas fa-user-alt"></i>&nbsp;
                  {wanted.host}
                </p>
              </ListItem>

              <ListItem>
                <p>
                  <i className="fas fa-calendar"></i>
                  &nbsp; {wanted.startdate}
                </p>
              </ListItem>
              <ListItem>
                <p>
                  <i className="fas fa-calendar"></i>
                  &nbsp; {wanted.enddate}
                </p>
              </ListItem>
            </div>
          </div>

          <img
            src={`${wanted.image.replace(
              "http://localhost:5000",
              `${settings.server_domain}`
            )}`}
            alt={wanted.name}
            className="img-thumbnail"
            width={"500px"}
          />

          <div className="exhibition-continue">
            <h3 className="h3">Entrace:&nbsp;{wanted.fees} Rwf </h3>

            <a href={`/payment/${exhibitionId}`}>
              <button className="btn btn-primary">
                Register &nbsp; <i className="fas fa-arrow-right"></i>
              </button>
            </a>
            <br />
            <center>
              <span> Already paid? </span>
            </center>
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
    </>
  );
}

export default ExhibitionShowPage;
