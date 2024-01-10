import React, { useState } from "react";
import FormTemplate from "../FormTemplate/FormTemplate";
import settings from "../settings.json";
import ReactDOM from "react-dom/client";
function ExhibitionCreationForm() {
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [fees, setFees] = useState("");
  const [banner, setExhibitionBanner] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
      <center>
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </center>
    );
    let formData = new FormData();
    formData.append("name", name);
    formData.append("host", host);
    formData.append("start_date", startdate);
    formData.append("end_date", enddate);
    formData.append("entrace_fees", fees);
    formData.append("banner", banner);

    // make request

    fetch(`${settings.server_domain}/add_new_exhibition`, {
      method: "PUT",
      headers: {
        encType: "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
          <span>
            <i className="fas fa-plus "></i>
            Add
          </span>
        );
        if (data.success) {
          ReactDOM.createRoot(document.querySelector(".message")).render(
            <div className={`alert alert-success`}>
              <center>
                <p className="lead">Exhibition added succesfully</p>
              </center>
            </div>
          );
          document.querySelector(".exhibition-form").reset();
        } else if (data.exhibitionExist) {
          ReactDOM.createRoot(document.querySelector(".message")).render(
            <div className={`alert alert-danger`}>
              <center>
                <p className="lead">Exhibition Already Exists.</p>
              </center>
            </div>
          );
        } else {
          ReactDOM.createRoot(document.querySelector(".message")).render(
            <div className={`alert alert-danger`}>
              <center>
                <p className="lead">failed to add new Exhibition</p>
              </center>
            </div>
          );
        }
      })
      .catch((error) => {
        ReactDOM.createRoot(document.querySelector(".message")).render(
          <div className={`alert alert-danger`}>
            <center>
              <p className="lead">Error happened while adding Exhibition</p>
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
      <h2>CREATE NEW EXHIBITION</h2>
      <hr />
      <div className="message"></div>

      <form onSubmit={handleOnSubmit} className="exhibition-form">
        <div className="form-inputs-container">
          <label htmlFor="name">EXHIBITION NAME</label>
          <input
            type="text"
            name="name"
            required
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
            required
            onChange={(event) => {
              setHost(event.target.value);
            }}
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="startdate">START DATE</label>
          <input
            required
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
            required
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
            required
            onChange={(event) => {
              setFees(event.target.value);
            }}
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="banner">EXHIBITION BANNER</label>
          <input
            type="file"
            required
            name="banner"
            onChange={(event) => {
              setExhibitionBanner(event.target.files[0]);
            }}
          />
        </div>
        <button type="submit" className="submit-btn btn btn-primary">
          <i className="fas fa-plus "></i>
          Add Exhibition
        </button>
      </form>
    </div>
  );
}

export default ExhibitionCreationForm;
