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
  const closeAlert = (event) => {
    document.querySelector(".response-alert").innerHTML = "";
  };
  const bigErrorAlert = (
    <div className={`alert alert-danger alert-dismissible`}>
      <center>
        <p className="lead">Error happened while adding Exhibition</p>
      </center>

      <button className="btn btn-close" onClick={closeAlert}></button>
    </div>
  );

  const errorAlert = (
    <div className={`alert alert-danger`}>
      <center>
        <p className="lead">failed to add new Exhibition</p>
      </center>
      <button className="btn btn-close" onClick={closeAlert}></button>
    </div>
  );
  const successAlert = (
    <div className={`alert alert-success`}>
      <center>
        <p className="lead">Exhibition added succesfully</p>
      </center>
      <button className="btn btn-close" onClick={closeAlert}></button>
    </div>
  );
  const alreadyError = (
    <div className={`alert alert-danger`}>
      <center>
        <p className="lead">Exhibition Already Exists.</p>
      </center>
    </div>
  );
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
          ReactDOM.createRoot(document.querySelector(".response-alert")).render(
            successAlert
          );
          document.querySelector(".exhibition-form").reset();
        } else if (data.exhibitionExist) {
          ReactDOM.createRoot(document.querySelector(".response-alert")).render(
            alreadyError
          );
        } else {
          ReactDOM.createRoot(document.querySelector(".response-alert")).render(
            errorAlert
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
      <h2>CREATE NEW EXHIBITION</h2>
      <hr />

      <form onSubmit={handleOnSubmit} className="exhibition-form">
        <div className="form-group">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            EXHIBITION NAME
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="col-sm-2 col-form-label">
            HOST
          </label>
          <input
            type="text"
            name="host"
            className="form-control"
            required
            onChange={(event) => {
              setHost(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="startdate" className="col-sm-2 col-form-label">
            START DATE
          </label>
          <input
            required
            className="form-control"
            type="date"
            name="startdate"
            onChange={(event) => {
              setStartdate(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="enddate" className="col-sm-2 col-form-label">
            END DATE
          </label>
          <input
            type="date"
            name="enddate"
            className="form-control"
            required
            onChange={(event) => {
              setEnddate(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fees" className="col-sm-2 col-form-label">
            ENTRACE FEES
          </label>
          <input
            type="number"
            name="fees"
            className="form-control"
            required
            onChange={(event) => {
              setFees(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="banner" className="col-sm-2 col-form-label">
            EXHIBITION BANNER
          </label>
          <input
            type="file"
            required
            className="form-control-file"
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
