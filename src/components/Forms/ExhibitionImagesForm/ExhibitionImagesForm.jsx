import React, { useEffect, useState } from "react";
import "../FormTemplate/FormTemplate.css";
import "bootstrap/dist/css/bootstrap.css";
import "./ExhibitionImagesForm.css";
import ReactDOM from "react-dom/client";
import settings from "../../settings.json";
import { AlertError, AlertSuccess } from "../../Alerts/Alert";
import { loading } from "../../ButtonEffects/ButtonEffects";
function ExhibitionImagesForm() {
  let exhibitionNames;
  let painters;

  fetch(`${settings.server_domain}/get_exhibitions`)
    .then((response) => response.json())
    .then((data) => {
      exhibitionNames = data;

      fetch(`${settings.server_domain}/get_painters`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("session")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          painters = data;

          let painting;
          let paintingName;
          let paintingDescription;
          let paintingAudio;
          let paintingOwner;
          let painter;

          const handleOnSubmit = (event) => {
            event.preventDefault();
            loading(".submit-btn");
            let formData = new FormData();
            formData.append("name", paintingName);
            formData.append("description", paintingDescription);
            formData.append("image", painting);
            formData.append("audio", paintingAudio);
            formData.append("owner", paintingOwner);
            formData.append("painter", painter);
            let options = {
              method: "POST",
              headers: {
                encType: "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("session")}`,
              },
              body: formData,
            };

            fetch(`${settings.server_domain}/add_exhibition_painting`, options)
              .then((response) => response.json())
              .then((data) => {
                document.querySelector(
                  ".submit-btn"
                ).innerHTML = ` &plus;&nbsp;&nbsp;Add Painting`;
                document.querySelector(".painting-form").reset();
                if (data.success) {
                  ReactDOM.createRoot(
                    document.querySelector(".response-alert")
                  ).render(AlertSuccess("Painting added successfully"));
                } else {
                  ReactDOM.createRoot(
                    document.querySelector(".response-alert")
                  ).render(AlertError("Adding new painting failed"));
                }
              })
              .catch((error) => {
                ReactDOM.createRoot(
                  document.querySelector(".response-alert")
                ).render(AlertError("Error happened while adding Exhibition"));
                document.querySelector(
                  ".submit-btn"
                ).innerHTML = `&plus; &nbsp; add`;
              });
          };

          let form = (
            <div className="payment-registration-form-container m-3">
              <form onSubmit={handleOnSubmit} className="painting-form">
                <h2>ADD EXHIBITION'S PAINTINGS</h2>
                <div className="form-group">
                  <select name="painter" required className="form-control">
                    <option value="" selected disabled>
                      select Exhibition
                    </option>
                    {painters.map((item, index) => {
                      return (
                        <option
                          value={item}
                          key={index}
                          onClick={(event) => {
                            painter = item.username;
                          }}
                          style={{ color: "black" }}
                        >
                          {item.username}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <select name="exhibition" className="form-control mt-2">
                    <option value="" selected disabled>
                      select Exhibition
                    </option>
                    {exhibitionNames.map((item, index) => {
                      return (
                        <option
                          value={item.name}
                          key={index}
                          onClick={(event) => {
                            paintingOwner = item.name;
                          }}
                        >
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="painting-image-container">
                  <div className="form-group">
                    <label htmlFor="painting" className="col-form-label">
                      <b>Painting image</b>
                    </label>
                    <div className="previewImage"></div>

                    <input
                      type="file"
                      className="form-control-file"
                      required
                      onChange={(event) => {
                        painting = event.target.files[0];

                        let el = `<img src="${URL.createObjectURL(
                          painting
                        )}" alt=""  width="200px "  style="border-radius: 10px;"/>`;

                        event.target.parentElement.querySelector(
                          ".previewImage"
                        ).innerHTML = el;
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="painting-sound" className="col-form-label">
                      <b>Painting Sound</b>
                    </label>
                    <div className="soundPreview"></div>
                    <input
                      type="file"
                      className="form-control-file"
                      required
                      onChange={(event) => {
                        paintingAudio = event.target.files[0];
                        let el = `<audio src="${URL.createObjectURL(
                          paintingAudio
                        )}" 
                        controls="controls"
                        preload="auto"
                        autoPlay
                        loop> </audio>`;

                        event.target.parentElement.querySelector(
                          ".soundPreview"
                        ).innerHTML = el;
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="painting-name"
                      className="col-sm-2 col-form-label"
                    >
                      NAME
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(event) => {
                        paintingName = event.target.value;
                      }}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="painting-description"
                      className="col-sm-2 col-form-label"
                    >
                      DESCRIPTION
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      required
                      onChange={(event) => {
                        paintingDescription = event.target.value;
                      }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary submit-btn">
                    <i className="fas fa-plus"></i> &nbsp;&nbsp; Add Painting
                  </button>
                </div>
              </form>
            </div>
          );
          ReactDOM.createRoot(
            document.querySelector(".exhibition-paintings-container")
          ).render(form);
        });
    });

  return (
    <>
      <div className="exhibition-paintings-container">
        <center>
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </center>
      </div>
    </>
  );
}

export default ExhibitionImagesForm;
