import React, { useState } from "react";
import FormTemplate from "../FormTemplate/FormTemplate";
import settings from "../../settings.json";
import ReactDOM from "react-dom/client";
import { AlertError, AlertSuccess } from "../../Alerts/Alert";
import { loading } from "../../ButtonEffects/ButtonEffects";
function ExhibitionCreationForm(props) {
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [fees, setFees] = useState("");
  const [banner, setExhibitionBanner] = useState("");
  const getFormData = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("host", host);
    formData.append("start_date", startdate);
    formData.append("end_date", enddate);
    formData.append("entrace_fees", fees);
    formData.append("banner", banner);
    return formData;
  };
  const handleRequest = (url, formData) => {
    fetch(`${settings.server_domain}/${url}`, {
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
          let inner = props.exhibitions;
          inner.push(data.data[0]);
          props.addNewExhibition(inner);
          ReactDOM.createRoot(document.querySelector(".response-alert")).render(
            AlertSuccess("Exhibition Added successfully.")
          );
          document.querySelector(".exhibition-form").reset();
        } else if (data.exhibitionExist) {
          ReactDOM.createRoot(document.querySelector(".response-alert")).render(
            AlertError("Exhibition already exist.")
          );
        } else {
          ReactDOM.createRoot(document.querySelector(".response-alert")).render(
            AlertError("Failed to add new exhibition")
          );
        }
      })
      .catch((error) => {
        ReactDOM.createRoot(document.querySelector(".response-alert")).render(
          AlertError(error.toString())
        );
        ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
          <span>
            <i className="fas fa-plus "></i>
            Add
          </span>
        );
      });
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    loading(".submit-btn");
    let formData = getFormData();

    // make request
    handleRequest("add_new_exhibition", formData);
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    loading();
    let formData = getFormData();

    // make request
    handleRequest(
      `update_exhibition/${props.data.id}/${props.data.name}`,
      formData
    );
  };
  return (
    <div className="payment-registration-form-container m-3">
      <form
        onSubmit={props.data ? handleUpdate : handleOnSubmit}
        className="exhibition-form"
      >
        {props.data ? (
          <h2>UPDATE EXHIBITION</h2>
        ) : (
          <h2>CREATE NEW EXHIBITION</h2>
        )}
        <div className="form-group">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            EXHIBITION NAME
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            required
            placeholder={props.data ? props.data.name : null}
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
            placeholder={props.data ? props.data.host : null}
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
            placeholder={props.data ? props.data.name : null}
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
            placeholder={props.data ? props.data.enddate : null}
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
            placeholder={props.data ? props.data.fees : null}
            onChange={(event) => {
              setFees(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="banner" className="col-sm-2 col-form-label">
            EXHIBITION BANNER
          </label>
          <div className="exhibition-preview"></div>
          <input
            type="file"
            required
            className="form-control-file"
            name="banner"
            onChange={(event) => {
              const previewUrl = URL.createObjectURL(event.target.files[0]);
              const el = `<img src="${previewUrl}" width="200px" style="border-radius:20px"/>`;
              event.target.parentElement.querySelector(
                ".exhibition-preview"
              ).innerHTML = el;
              setExhibitionBanner(event.target.files[0]);
            }}
          />
        </div>
        <button type="submit" className="submit-btn btn btn-primary">
          <i className="fas fa-plus "></i>
          &nbsp;
          {props.data ? "Update Exhibition" : "Add Exhibition"}
        </button>
      </form>
    </div>
  );
}

export default ExhibitionCreationForm;
