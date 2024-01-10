import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import FormNavbar from "../NavBar/FormNavbar";
import { useNavigate, useParams } from "react-router-dom";
import settings from "../settings.json";

function CheckPaymentForm() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState();
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
    formData.append("exhibitionId", id);
    formData.append("customerId", customerId);

    fetch(`${settings.server_domain}/check_payment`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
          <span>Submit</span>
        );
        if (data.success) {
          localStorage.setItem("clientId", customerId);
          navigate(`/exhibition_paintings/${data.id}`);
        } else {
          ReactDOM.createRoot(document.querySelector(".message")).render(
            <div className={`alert alert-danger`}>
              <center>
                <p className="lead">
                  You haven't paid to attend this exhibition
                </p>
                <a
                  href={`/payment/${id}`}
                  className="btn btn-outline-secondary"
                >
                  Please Pay
                </a>
              </center>
            </div>
          );
        }
      })
      .catch((error) => {
        ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
          <span>Submit</span>
        );
        ReactDOM.createRoot(document.querySelector(".message")).render(
          <div className={`alert alert-danger`}>
            <center>
              <p className="lead">Some error happened</p>
            </center>
          </div>
        );
      });
  };
  return (
    <div className="checkPaymentForm-container">
      <FormNavbar />

      <form
        className="row col-md-5 justify-content-center"
        style={{ marginLeft: "1em" }}
        onSubmit={handleOnSubmit}
      >
        <div className="message"></div>
        <h1 className="h1">Customer Entry</h1>
        <div className="form-group">
          <label>Enter your Id</label>
          <input
            type="text"
            required
            className="form-control"
            onChange={(event) => {
              setCustomerId(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CheckPaymentForm;
