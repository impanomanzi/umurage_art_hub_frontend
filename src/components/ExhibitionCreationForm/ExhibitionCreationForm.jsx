import React, { useState } from "react";
import FormTemplate from "../FormTemplate/FormTemplate";
import settings from "../settings.json";
function ExhibitionCreationForm() {
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [fees, setFees] = useState("");
  const [banner, setExhibitionBanner] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    document.querySelector(".submit-button").classList.innerHTML =
      "uploading...";
    let formData = new FormData();
    formData.append("name", name);
    formData.append("host", host);
    formData.append("start_date", startdate);
    formData.append("end_date", enddate);
    formData.append("entrace_fees", fees);
    formData.append("banner", banner);
    let request = {
      method: "PUT",
      Headers: {
        encType: "multipart/form-data",
      },
      body: formData,
    };

    // make request

    fetch(`${settings.server_domain}/add_new_exhibition`, request)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document
            .querySelector(".submit-button")
            .classList.remove("uploading");
          document.querySelector(".submit-button").innerHTML = "Done";
          document.querySelector(".List exhibition").click();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="payment-registration-form-container">
      <h2>CREATE NEW EXHIBITION</h2>
      <hr />

      <form onSubmit={handleOnSubmit}>
        <div className="form-inputs-container">
          <label htmlFor="name">EXHIBITION NAME</label>
          <input
            type="text"
            name="name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="description">HOST</label>
          <input
            type="text"
            name="host"
            onChange={(event) => {
              setHost(event.target.value);
            }}
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="startdate">START DATE</label>
          <input
            type="date"
            name="startdate"
            onChange={(event) => {
              setStartdate(event.target.value);
            }}
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="enddate">END DATE</label>
          <input
            type="date"
            name="enddate"
            onChange={(event) => {
              setEnddate(event.target.value);
            }}
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="fees">ENTRACE FEES</label>
          <input
            type="number"
            name="fees"
            onChange={(event) => {
              setFees(event.target.value);
            }}
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="banner">EXHIBITION BANNER</label>
          <input
            type="file"
            name="banner"
            onChange={(event) => {
              setExhibitionBanner(event.target.files[0]);
            }}
          />
        </div>
        <button type="submit" className="submit-button">
          <i className="fas fa-plus "></i>
          Add Exhibition
        </button>
      </form>
    </div>
  );
}

export default ExhibitionCreationForm;
