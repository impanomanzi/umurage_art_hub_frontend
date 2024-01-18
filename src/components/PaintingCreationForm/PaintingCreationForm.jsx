import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import "../FormTemplate/FormTemplate.css";
import settings from "../settings.json";
function PaintingCreationForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Potrait");
  const [painting, setPainting] = useState("");
  const closeAlert = (event) => {
    document.querySelector(".response-alert").innerHTML = "";
  };
  const bigErrorAlert = (
    <div className={`alert alert-danger alert-dismissible`}>
      <center>
        <p className="lead">Error happened while adding new painting</p>
      </center>

      <button className="btn btn-close" onClick={closeAlert}></button>
    </div>
  );

  const errorAlert = (
    <div className={`alert alert-danger`}>
      <center>
        <p className="lead">failed to add new painting</p>
      </center>
      <button className="btn btn-close" onClick={closeAlert}></button>
    </div>
  );
  const successAlert = (
    <div className={`alert alert-success`}>
      <center>
        <p className="lead">Painting added succesfully</p>
      </center>
      <button className="btn btn-close" onClick={closeAlert}></button>
    </div>
  );
  let formData = new FormData();
  formData.append("name", name);
  formData.append("category", category);
  formData.append("painting", painting);
  formData.append("owner", localStorage.getItem("userId"));
  const handleOnSubmit = (event) => {
    event.preventDefault();
    ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
      <center>
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </center>
    );
    fetch(`${settings.server_domain}/add_new_painting`, {
      method: "PUT",
      headers: {
        encType: "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          ReactDOM.createRoot(document.querySelector(".response-alert")).render(
            successAlert
          );
          ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
            <span>
              <i className="fas fa-plus "></i>
              Add
            </span>
          );
          document.querySelector(".painting-form").reset();
        } else {
          ReactDOM.createRoot(document.querySelector(".response-alert")).render(
            errorAlert
          );
          ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
            <span>
              <i className="fas fa-plus "></i>
              Add
            </span>
          );
        }
      })
      .catch((error) => {
        ReactDOM.createRoot(document.querySelector(".response-alert")).render(
          bigErrorAlert
        );
        ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
          <span>
            <i className="fas fa-plus "></i>
            Add
          </span>
        );
      });
  };

  return (
    <div className="payment-registration-form-container m-3">
      <h2>ADD NEW PAINTING</h2>
      <hr />
      <form onSubmit={handleOnSubmit} className="painting-form">
        <div className="form-group">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            required
            autoComplete="off"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="col-sm-2 col-form-label">
            Category
          </label>
          <select
            className="form-control"
            name="category"
            required
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          >
            <option value="Potrait" selected>
              Potrait
            </option>
            <option value="Art work">Art Work</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="painting" className="col-sm-2 col-form-label">
            Painting
          </label>
          <input
            name="painiting"
            required
            className="form-control-file"
            type="file"
            onChange={(event) => {
              setPainting(event.target.files[0]);
            }}
          />
        </div>
        <button type="submit" className="submit-btn btn btn-primary">
          Add New
        </button>
      </form>
    </div>
  );
}

export default PaintingCreationForm;
