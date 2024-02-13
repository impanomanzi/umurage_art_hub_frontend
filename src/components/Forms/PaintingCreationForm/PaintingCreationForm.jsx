import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import "../FormTemplate/FormTemplate.css";
import settings from "../../settings.json";
import { AlertError, AlertSuccess } from "../../Alerts/Alert";
import { loading } from "../../ButtonEffects/ButtonEffects";
function PaintingCreationForm(props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Potrait");
  const [painting, setPainting] = useState("");
  const btnText = (
    <span>
      <i className="fas fa-plus "></i>
      Add
    </span>
  );
  const changebtnText = () => {
    ReactDOM.createRoot(document.querySelector(".submit-btn")).render(btnText);
  };
  let formData = new FormData();
  formData.append("name", name);
  formData.append("category", category);
  formData.append("painting", painting);
  formData.append("owner", localStorage.getItem("userId"));
  const handleOnSubmit = (event) => {
    event.preventDefault();
    loading(".submit-btn");
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
          23;
          let inner = props.paintings.data;
          inner.push(data.data[0]);
          props.addNewPainting(inner);
          ReactDOM.createRoot(document.querySelector(".response-alert")).render(
            AlertSuccess("Painting added succesfully")
          );
          changebtnText();
          document.querySelector(".painting-form").reset();
        } else {
          ReactDOM.createRoot(document.querySelector(".response-alert")).render(
            AlertError("failed to add new painting")
          );
          changebtnText();
        }
      })
      .catch((error) => {
        console.log(error);
        ReactDOM.createRoot(document.querySelector(".response-alert")).render(
          AlertError("Error happened while adding new painting")
        );
        changebtnText();
      });
  };

  return (
    <div className="payment-registration-form-container m-3">
      <h2>ADD NEW PAINTING</h2>

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
              const url = URL.createObjectURL(event.target.files[0]);
              const el = `<center><img src="${url}" width="135px" style="border-radius:10px"/></center>`;
              event.target.parentElement.querySelector(
                ".painting-preview"
              ).innerHTML = el;
              setPainting(event.target.files[0]);
            }}
          />
          <div className="painting-preview"></div>
        </div>
        <button type="submit" className="submit-btn btn btn-primary">
          {btnText}
        </button>
      </form>
    </div>
  );
}

export default PaintingCreationForm;
