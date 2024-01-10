import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router-dom";
import FormTemplate from "../FormTemplate/FormTemplate";
import settings from "../settings.json";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import FormNavbar from "../NavBar/FormNavbar";
function PayementRegistrationForm() {
  const exhibitionId = useParams().id;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alertVisible, setAlertVisible] = useState(true);

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
          document.querySelector(".message").innerHTML = "";
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
                    id={exhibitionId}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    phoneNumber={phoneNumber}
                    exhibitionName={wantedExhibition[0].name}
                    amount={wantedExhibition[0].fees}
                  />
                );
              } else {
                ReactDOM.createRoot(document.querySelector(".message")).render(
                  <div className={`alert alert-danger`}>
                    <center>
                      <p className="lead">failed to submit your request</p>
                    </center>
                  </div>
                );
              }
            })
            .catch((error) => {
              ReactDOM.createRoot(document.querySelector(".message")).render(
                <div className={`alert alert-danger`}>
                  <center>
                    <p className="lead">
                      erro happened while submiting your informations
                    </p>
                  </center>
                </div>
              );
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
