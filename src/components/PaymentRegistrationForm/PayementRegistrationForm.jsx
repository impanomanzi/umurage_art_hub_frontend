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
            document.querySelector(".payment-registration-form-container")
          ).render(
            <CheckoutForm
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
          <div>
            <FormNavbar />
            <form onSubmit={handleOnSubmit}>
              <h2 style={{ backgroundColor: "#ffcc99", padding: "1rem" }}>
                You're going to pay {wantedExhibition[0].fees} for{" "}
                {wantedExhibition[0].name}
              </h2>
              <div className="form-inputs-container">
                <label htmlFor="first_name">FIRST NAME</label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  onChange={(event) => {
                    firstName = event.target.value;
                  }}
                />
              </div>
              <div className="form-inputs-container">
                <label htmlFor="last_name">LAST NAME</label>
                <input
                  type="text"
                  name="last_name"
                  onChange={(event) => {
                    lastName = event.target.value;
                  }}
                />
              </div>

              <div className="form-inputs-container">
                <label htmlFor="email">EMAIL</label>
                <input
                  name="email"
                  type="email"
                  onChange={(event) => {
                    email = event.target.value;
                  }}
                />
              </div>
              <div className="form-inputs-container">
                <label htmlFor="phone">PHONE</label>
                <input
                  name="phone"
                  type="text"
                  onChange={(event) => {
                    phoneNumber = event.target.value;
                  }}
                />
              </div>
              <button type="submit">continue</button>
            </form>
          </div>
        );
        ReactDOM.createRoot(
          document.querySelector(".payment-registration-form-container")
        ).render(form);
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="payment-registration-form-container">
      <h5>Getting exhibition info...</h5>
    </div>
  );
}

export default PayementRegistrationForm;
