import React, { useEffect, useState } from "react";
import "../FormTemplate/FormTemplate.css";
import "bootstrap/dist/css/bootstrap.css";
import "./ExhibitionImagesForm.css";
import ReactDOM from "react-dom/client";
import settings from "../settings.json";

function ExhibitionImagesForm() {
  let exhibitionNames;
  let painters;

  fetch(`${settings.server_domain}/get_exhibitions`)
    .then((response) => response.json())
    .then((data) => {
      exhibitionNames = data;

      fetch(`${settings.server_domain}/get_painters`)
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
              },
              body: formData,
            };

            fetch(`${settings.server_domain}/add_exhibition_painting`, options)
              .then((response) => response.json())
              .then((data) => {
                document.querySelector(
                  ".submit-btn"
                ).innerHTML = `<i className="fas fa-plus"></i> add`;
                document.querySelector(".painting-form").reset();
                if (data.success) {
                  let message = (
                    <div className="alert alert-success">
                      <center>
                        <span>Painting added successfully </span>
                      </center>
                    </div>
                  );
                  ReactDOM.createRoot(
                    document.querySelector(".message")
                  ).render(message);
                } else {
                  let message = (
                    <div className="alert alert-danger">
                      <center>
                        <span>Adding new painting failed </span>
                      </center>
                    </div>
                  );
                  ReactDOM.createRoot(
                    document.querySelector(".message")
                  ).render(message);
                }
              })
              .catch((error) => {
                let message = (
                  <div className="alert alert-danger">
                    <center>
                      <span>error happened while adding painting </span>
                    </center>
                  </div>
                );
                ReactDOM.createRoot(document.querySelector(".message")).render(
                  message
                );
                document.querySelector(
                  ".submit-btn"
                ).innerHTML = `<i className="fas fa-plus"></i> add`;
              });
          };

          let form = (
            <div className="payment-registration-form-container">
              <div className="message"></div>
              <form onSubmit={handleOnSubmit} className="painting-form">
                <h2>ADD EXHIBITION'S PAINTINGS</h2>
                <hr />
                <div className="form-inputs-container">
                  <label htmlFor="exhibition">SELECT PAINTER</label>
                  <select name="painter">
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

                <div className="form-inputs-container">
                  <label htmlFor="exhibition">SELECT EXHIBITION</label>
                  <select name="exhibition">
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
                <div className="painting-container">
                  <div className="form-inputs-container">
                    <label htmlFor="painting">
                      <i className="fas fa-image"></i>
                    </label>
                    <input
                      type="file"
                      required
                      onChange={(event) => {
                        painting = event.target.files[0];
                      }}
                    />
                  </div>
                  <div className="form-inputs-container">
                    <label htmlFor="painting-sound">
                      <i className="fas fa-volume-up"></i>
                    </label>
                    <input
                      type="file"
                      required
                      onChange={(event) => {
                        paintingAudio = event.target.files[0];
                      }}
                    />
                  </div>
                  <div className="form-inputs-container">
                    <label htmlFor="painting-name">NAME</label>
                    <input
                      type="text"
                      onChange={(event) => {
                        paintingName = event.target.value;
                      }}
                      required
                    />
                  </div>
                  <div className="form-inputs-container">
                    <label htmlFor="painting-description">DESCRIPTION</label>
                    <textarea
                      type="text"
                      required
                      onChange={(event) => {
                        paintingDescription = event.target.value;
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    onClick={(event) => {
                      event.target.innerHTML = `<center>
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </center>`;
                      {
                        document.querySelector(".list-group").innerHTML += `
                <li className="list-group-item">
                <div className="painting-item">
                <span> ${painting.name}</span></br>
                <span> ${paintingAudio.name}</span>
                <button className="btn btn-danger" style="background-color:red;width:40%"> Delete</button>
                </div>
               
                </li>
                 
                `;
                      }
                    }}
                  >
                    <i className="fas fa-plus"></i> add
                  </button>
                </div>
                <div className="selected-files">
                  <h1>uploaded files</h1>
                  <ol type="1" className="list-group file-list"></ol>
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
    <div className="exhibition-paintings-container">
      <center>
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </center>
    </div>
  );
}

export default ExhibitionImagesForm;
