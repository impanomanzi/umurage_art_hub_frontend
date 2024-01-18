import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate, useParams } from "react-router-dom";
import settings from "../settings.json";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import FormNavbar from "../NavBar/FormNavbar";
function PayementRegistrationForm() {
  const exhibitionId = useParams().id;
  const closeAlert = (event) => {
    document.querySelector(".response-alert").innerHTML = "";
  };
  const bigErrorAlert = (
    <div className={`alert alert-danger alert-dismissible`}>
      <center>
        <p className="lead">erro happened while submiting your informations</p>
      </center>

      <button className="btn btn-close" onClick={closeAlert}></button>
    </div>
  );

  const errorAlert = (
    <div className={`alert alert-danger`}>
      <center>
        <p className="lead">failed to submit your request</p>
      </center>
      <button className="btn btn-close" onClick={closeAlert}></button>
    </div>
  );
  const successAlert = (
    <div className={`alert alert-success`}>
      <center>
        <p className="lead">success</p>
      </center>
      <button className="btn btn-close" onClick={closeAlert}></button>
    </div>
  );

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${settings.server_domain}/get_exhibitions`)
      .then((response) => response.json())
      .then((data) => {
        let firstName = "";
        let lastName = "";
        let email = "";
        let phoneNumber = "";
        let wantedExhibition = data.filter((item) => {
          return item.id === exhibitionId;
        });
        const handleOnSubmit = (event) => {
          event.preventDefault();
          document.querySelector(".response-alert").innerHTML = "";
          ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
            <center>
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </center>
          );
          let formData = new FormData();
          formData.append("firstname", firstName);
          formData.append("lastName", lastName);
          formData.append("email", email);
          formData.append("phonenumber", phoneNumber);
          formData.append("exhibition", exhibitionId);
          fetch(`${settings.server_domain}/add_customer`, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
                <span>continue</span>
              );
              if (data.success) {
                ReactDOM.createRoot(
                  document.querySelector(".payment-form-container")
                ).render(
                  <CheckoutForm
                    c_id={data.data[0].id}
                    id={data.data[0].exId}
                    firstName={data.data[0].firstName}
                    lastName={data.data[0].lastName}
                    email={data.data[0].email}
                    phoneNumber={data.data[0].phone}
                    exhibitionName={wantedExhibition[0].name}
                    amount={wantedExhibition[0].fees}
                    navigate={navigate}
                  />
                );
              } else {
                ReactDOM.createRoot(
                  document.querySelector(".response-alert")
                ).render(errorAlert);
              }
            })
            .catch((error) => {
              ReactDOM.createRoot(
                document.querySelector(".response-alert")
              ).render(bigErrorAlert);
              ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
                <span>continue</span>
              );
            });
        };
        let form = (
          <div className="container">
            <div className="alert alert-success alert-dismissible">
              <p className="h3">
                You're going to pay {wantedExhibition[0].fees} for{" "}
                {wantedExhibition[0].name}
              </p>
            </div>

            <form
              onSubmit={handleOnSubmit}
              className="row justify-content-center col-md-6 payment-form"
            >
              <div className="message"></div>
              <div className="form-group">
                <label htmlFor="first_name">FIRST NAME</label>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="off"
                  onChange={(event) => {
                    firstName = event.target.value;
                  }}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">LAST NAME</label>
                <input
                  type="text"
                  name="last_name"
                  required
                  onChange={(event) => {
                    lastName = event.target.value;
                  }}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">EMAIL</label>
                <input
                  name="email"
                  type="email"
                  required
                  onChange={(event) => {
                    email = event.target.value;
                  }}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">PHONE</label>
                <input
                  name="phone"
                  type="text"
                  required
                  onChange={(event) => {
                    phoneNumber = event.target.value;
                  }}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                {" "}
                <button
                  type="submit"
                  className="btn btn-primary submit-btn form-control"
                >
                  <p className="h4">continue</p>
                </button>
              </div>
            </form>
          </div>
        );
        ReactDOM.createRoot(
          document.querySelector(".payment-form-container")
        ).render(form);
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <FormNavbar />
      <div className="payment-form-container container">
        <center>
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </center>
      </div>
    </div>
  );
}

export default PayementRegistrationForm;
