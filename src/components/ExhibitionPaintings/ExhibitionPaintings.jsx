import React from "react";
import FormNavbar from "../NavBar/FormNavbar";
import settings from "../settings.json";
import ReactDOM from "react-dom/client";
import "./ExhibitionPaintings.css";
import ExhibtionPaintingCard from "../ExhibtionPaintingCard/ExhibtionPaintingCard";
import { useParams } from "react-router-dom";
function ExhibitionPaintings() {
  let id = useParams().id;
  fetch(`${settings.server_domain}/get_exhibition_paintings/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("session")}`,
      clientId: localStorage.getItem("clientId"),
      exId: id,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let paintings = data;
      let paintingsEl = (
        <div className="inner-exhibition-paintings-container">
          {paintings.map((item, index) => {
            return (
              <ExhibtionPaintingCard item={item} key={index} exhibition={id} />
            );
          })}
        </div>
      );
      ReactDOM.createRoot(
        document.querySelector(".exhibition-paintings-container")
      ).render(paintingsEl);
    });

  return (
    <>
      <FormNavbar />
      <div className="exhibition-paintings-container"></div>
    </>
  );
}

export default ExhibitionPaintings;
