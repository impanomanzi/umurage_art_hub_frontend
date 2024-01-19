import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "../FormTemplate/FormTemplate.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import settings from "../settings.json";
function PainterCreationForm() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const closeAlert = (event) => {
    document.querySelector(".response-alert").innerHTML = "";
  };
  const displayMessage = (message, type) => {
    ReactDOM.createRoot(document.querySelector(".response-alert")).render(
      <div className={`alert alert-${type} alert-dismissible`}>
        <center>
          <p className="lead">{message}</p>
        </center>

        <button className="btn btn-close" onClick={closeAlert}></button>
      </div>
    );
    let btnText = (
      <span>
        <i className="fas fa-plus"></i>
        Add new
      </span>
    );
    document.querySelector(".painter-form").reset();
    ReactDOM.createRoot(document.querySelector(".submit-btn")).render(btnText);
  };

  let [phoneNumber, setPhoneNumber] = useState("");
  let [profilePicture, setProfilePicture] = useState("");
  let handleOnSubmit = (event) => {
    event.preventDefault();
    ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
      <center>
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </center>
    );
    let formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("phonenumber", phoneNumber);
    formData.append("profilepicture", profilePicture);
    ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
      <center>
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </center>
    );
    let options = {
      method: "POST",
      headers: {
        encType: "multipart/form-data",
      },
      body: formData,
    };
    fetch(`${settings.server_domain}/add_new_painter`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          displayMessage("Painter Saved successfully", "success");
        } else {
          displayMessage("Painter not saved try again", "danger");
        }
      })
      .catch((error) => {
        displayMessage("Error happened while adding new painter.", "danger");
      });
  };

  return (
    <div className="payment-registration-form-container m-3">
      <h2>CREATE NEW PAINTER ACCOUNT</h2>
      <hr />

      <form onSubmit={handleOnSubmit} className="painter-form">
        <div className="form-group">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            FULL NAME
          </label>
          <input
            type="text"
            className="form-control"
            required
            name="fullname"
            onChange={(event) => {
              setFullname(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            USERNAME
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            autoComplete="off"
            required
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phonenumber" className="col-sm-2 col-form-label">
            PHONE NUMBER
          </label>
          <PhoneInput
            type="tel"
            className="form-control"
            required
            name="phonenumber"
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            PASSWORD
          </label>
          <input
            type="password"
            required
            autoComplete="off"
            className="form-control"
            name="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile" className="col-sm-2 col-form-label">
            PROFILE PICTURE
          </label>
          <input
            required
            type="file"
            name="profilepicture"
            className="form-control-file"
            onChange={(event) => {
              setProfilePicture(event.target.files[0]);
            }}
          />
        </div>

        <button type="submit" className="submit-btn btn btn-primary">
          <i className="fas fa-plus"></i>
          Add new
        </button>
      </form>
    </div>
  );
}

export default PainterCreationForm;
