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
      <div className="exhibition-show-container">
        <div className="exhibition-page-container">
          <div className="m-3">
            <ListItem>
              {" "}
              <h1 className="h1" style={{ color: "white" }}>
                {wanted.name}
              </h1>
            </ListItem>
            <p className="exhibition-description">
              <ListItem>
                <p>
                  <i className="fas fa-user-alt"></i>&nbsp;
                  {wanted.host}
                </p>
              </ListItem>
              <ListItem>
                {" "}
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
            </p>
          </div>
          <img
            src={`${wanted.image.replace(
              "http://localhost:5000",
              `${settings.server_domain}`
            )}`}
            alt={wanted.name}
            className="img-fluid img-thumbnail"
            width={"500px"}
            height={"500px"}
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
      </div>
    </>
  );
}

export default ExhibitionShowPage;
