import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import "../FormTemplate/FormTemplate.css";
import settings from "../settings.json";
function PaintingCreationForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [painting, setPainting] = useState("");
  let formData = new FormData();
  formData.append("name", name);
  formData.append("category", category);
  formData.append("painting", painting);
  formData.append("owner", localStorage.getItem("userId"));
  let options = {
    method: "PUT",
    headers: {
      encType: "multipart/form-data",
    },
    body: formData,
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
      <center>
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </center>
    );
    fetch(`${settings.server_domain}/add_new_painting`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          ReactDOM.createRoot(document.querySelector(".message")).render(
            <div className={`alert alert-success`}>
              <center>
                <p className="lead">Painting added succesfully</p>
              </center>
            </div>
          );
          ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
            <span>
              <i className="fas fa-plus "></i>
              Add
            </span>
          );
          document.querySelector(".painting-form").reset();
        } else {
          ReactDOM.createRoot(document.querySelector(".message")).render(
            <div className={`alert alert-danger`}>
              <center>
                <p className="lead">failed to add new painting</p>
              </center>
            </div>
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
        ReactDOM.createRoot(document.querySelector(".message")).render(
          <div className={`alert alert-danger`}>
            <center>
              <p className="lead">Error happened while adding new painting</p>
            </center>
          </div>
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
    <div className="payment-registration-form-container">
      <h2>Add new painitng</h2>
      <hr />
      <div className="message"></div>
      <form onSubmit={handleOnSubmit} className="painting-form">
        <div className="form-inputs-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            required
            autoComplete="off"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            required
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          >
            <option value="Potrait">Potrait</option>
            <option value="Art work">Art Work</option>
          </select>
        </div>

        <div className="form-inputs-container">
          <label htmlFor="painting">Painting</label>
          <input
            name="painiting"
            required
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
