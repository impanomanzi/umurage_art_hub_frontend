import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "../FormTemplate/FormTemplate.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import settings from "../../settings.json";
import { AlertError, AlertSuccess } from "../../Alerts/Alert";
import { loading } from "../../ButtonEffects/ButtonEffects";

function PainterCreationForm(props) {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const handleOnChange = (value) => {
    setPhoneNumber(value);
  };

  const getFormData = () => {
    let formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("phonenumber", phoneNumber);
    formData.append("profilepicture", profilePicture);
    return formData;
  };

  const changeBtnText = () => {
    const btnText = (
      <span>
        <i className="fas fa-plus"></i>
        &nbsp;&nbsp; Add new
      </span>
    );
    document.querySelector(".painter-form").reset();
    ReactDOM.createRoot(document.querySelector(".submit-btn")).render(btnText);
  };

  const handleRequest = (url) => {
    let formData = getFormData();
    let options = {
      method: "POST",
      headers: {
        encType: "multipart/form-data",
      },
      body: formData,
    };

    fetch(`${settings.server_domain}/${url}`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          ReactDOM.createRoot(document.querySelector(".response-alert")).render(
            AlertSuccess("Painter Saved successfully")
          );
          changeBtnText();
        } else if (data.userExist) {
          ReactDOM.createRoot(document.querySelector(".response-alert")).render(
            AlertError("user Already Exist")
          );

          changeBtnText();
        } else {
          ReactDOM.createRoot(document.querySelector(".response-alert")).render(
            AlertError("Painter not saved try again")
          );

          changeBtnText();
        }
      })
      .catch((error) => {
        ReactDOM.createRoot(document.querySelector(".response-alert")).render(
          AlertError("Error happened while adding new painter.")
        );
        changeBtnText();
      });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    loading(".submit-btn");
    handleRequest("add_new_painter");
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    loading();
    handleRequest(`update_painter/${props.data.id}`);
  };
  props.data
    ? useEffect(() => {
        setFullname(props.data.fullname);
        setUsername(props.data.username);
        setPhoneNumber(props.data.phone);
        setPassword(props.data.password);
        setProfilePicture(props.data.image);
      }, [])
    : null;
  return (
    <div className="payment-registration-form-container m-3">
      {props.data ? (
        <h2>UPDATE PAINTER ACCOUNT</h2>
      ) : (
        <h2>CREATE NEW PAINTER ACCOUNT</h2>
      )}
      <form
        onSubmit={props.data ? handleUpdate : handleOnSubmit}
        className="painter-form"
      >
        <div className="form-group">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            FULL NAME
          </label>
          <input
            type="text"
            className="form-control"
            required
            name="fullname"
            placeholder={props.data ? props.data.fullname : null}
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
            placeholder={props.data ? props.data.username : null}
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
            country={"rw"}
            value={phoneNumber}
            onChange={handleOnChange}
            inputProps={{ required: true }}
            className="form-control"
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
            placeholder={props.data ? props.data.password : null}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        {props.data ? null : (
          <div className="form-group">
            <label htmlFor="profile" className="col-sm-2 col-form-label">
              PROFILE PICTURE
            </label>
            <div className="profile-preview"></div>
            <input
              required
              type="file"
              name="profilepicture"
              className="form-control-file"
              onChange={(event) => {
                const url = URL.createObjectURL(event.target.files[0]);
                const el = `<center><img src="${url}" width="135px" height="135px" style="border-radius:67.5px"/></center>`;
                event.target.parentElement.querySelector(
                  ".profile-preview"
                ).innerHTML = el;
                setProfilePicture(event.target.files[0]);
              }}
            />
          </div>
        )}

        <button type="submit" className="submit-btn btn btn-primary">
          {props.data ? (
            <span>
              <i className="fas fa-pen"></i>
              &nbsp;&nbsp; UPDATE PAINTER
            </span>
          ) : (
            <span>
              <i className="fas fa-plus"></i>
              &nbsp;&nbsp; ADD PAINTER
            </span>
          )}
        </button>
      </form>
    </div>
  );
}

export default PainterCreationForm;
