import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router-dom";
import FormTemplate from "../FormTemplate/FormTemplate";
import settings from "../settings.json";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import FormNavbar from "../NavBar/FormNavbar";
function PayementRegistrationForm() {
  let exhibitionId = useParams().id;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
        };
        let form = (
          <div className="container">
            <div className="alert alert-warning alert-dismissible">
              {/* <h4 className="alert-heading">
                  <i className="fas fa-info"></i>
                </h4> */}
              <p className="h3">
                You're going to pay {wantedExhibition[0].fees} for{" "}
                {wantedExhibition[0].name}
              </p>
            </div>
            <form
              onSubmit={handleOnSubmit}
              className="row justify-content-center col-md-6"
            >
              <div className="form-group">
                <label htmlFor="first_name">FIRST NAME</label>
                <input
                  type="text"
                  name="name"
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
                  onChange={(event) => {
                    phoneNumber = event.target.value;
                  }}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-dark">
                <p className="h4">continue</p>
              </button>
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
        <h5>Getting exhibition info...</h5>
      </div>
    </div>
  );
}

export default PayementRegistrationForm;
