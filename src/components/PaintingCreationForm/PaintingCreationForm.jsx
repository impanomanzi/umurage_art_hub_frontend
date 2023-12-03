import React from "react";
import { useState } from "react";
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
  let options = {
    method: "PUT",
    headers: {
      encType: "multipart/form-data",
    },
    body: formData,
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    fetch(`${settings.server_domain}/add_new_painting`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document.querySelector(".submit-button").innerHTML = "Done";
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="payment-registration-form-container">
      <h2>Add new painitng</h2>
      <hr />

      <form onSubmit={handleOnSubmit}>
        <div className="form-inputs-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
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
            type="file"
            onChange={(event) => {
              setPainting(event.target.files[0]);
            }}
          />
        </div>
        <button type="submit" className="submit-button">
          Add New
        </button>
      </form>
      <div className="form-inputs-container">
        <img src={painting.name} alt={painting.name} />
      </div>
    </div>
  );
}

export default PaintingCreationForm;
