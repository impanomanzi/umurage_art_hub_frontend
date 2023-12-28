import React, { useState } from "react";
import "../FormTemplate/FormTemplate.css";
import settings from "../settings.json";
function PainterCreationForm() {
  let [fullname, setFullname] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [profilePicture, setProfilePicture] = useState("");
  let handleOnSubmit = (event) => {
    if (profilePicture) {
      console.log(profilePicture.name);
      console.log(profilePicture.size);
      console.log(profilePicture.lastModified);
    }
    event.preventDefault();
    let formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("phonenumber", phoneNumber);
    formData.append("profilepicture", profilePicture);

    let options = {
      method: "POST",
      headers: {
        encType: "multipart/form-data",
      },
      body: formData,
    };
    fetch(`${settings.server_domain}/add_new_painter`, options)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="payment-registration-form-container">
      <h2>CREATE NEW PAINTER ACCOUNT</h2>
      <hr />

      <form
        // action={`${settings.server_domain}/add_new_painter`}
        // method="POST"
        // encType="multipart/form-data"
        onSubmit={handleOnSubmit}
      >
        <div className="form-inputs-container">
          <label htmlFor="username">FULL NAME</label>
          <input
            type="text"
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
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="phonenumber">PHONE NUMBER</label>
          <input
            type="text"
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
            name="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="profile">PROFILE PICTURE</label>
          <input
            type="file"
            name="profilepicture"
            onChange={(event) => {
              setProfilePicture(event.target.files[0]);
            }}
          />
        </div>

        <button type="submit">
          <i className="fas fa-plus"></i>
          Add new
        </button>
      </form>
    </div>
  );
}

export default PainterCreationForm;
