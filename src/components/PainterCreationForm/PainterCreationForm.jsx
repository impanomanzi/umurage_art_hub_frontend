import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "../FormTemplate/FormTemplate.css";
import settings from "../settings.json";
function PainterCreationForm() {
  let [fullname, setFullname] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const generateSubmissionMessage = (message, type) => {
    message = (
      <div className={`alert alert-${type}`}>
        <center>
          <p className="lead">{message}</p>
        </center>
      </div>
    );

    return message;
  };
  const displayMessage = (message, type) => {
    ReactDOM.createRoot(document.querySelector(".message")).render(
      <div className={`alert alert-${type}`}>
        <center>
          <p className="lead">{message}</p>
        </center>
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
    <div className="payment-registration-form-container">
      <div className="message"></div>
      <h2>CREATE NEW PAINTER ACCOUNT</h2>
      <hr />

      <form onSubmit={handleOnSubmit} className="painter-form">
        <div className="form-inputs-container">
          <label htmlFor="username">FULL NAME</label>
          <input
            type="text"
            required
            name="fullname"
            onChange={(event) => {
              setFullname(event.target.value);
            }}
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            name="username"
            required
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="phonenumber">PHONE NUMBER</label>
          <input
            type="text"
            required
            name="phonenumber"
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            required
            name="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="profile">PROFILE PICTURE</label>
          <input
            required
            type="file"
            name="profilepicture"
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
