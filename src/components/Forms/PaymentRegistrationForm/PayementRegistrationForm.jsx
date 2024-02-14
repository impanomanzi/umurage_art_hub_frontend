import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate, useParams } from "react-router-dom";
import settings from "../../settings.json";
import CheckoutForm from "../../CheckoutForm/CheckoutForm";
import FormNavbar from "../../NavBar/FormNavbar";
import PhoneInput from "react-phone-input-2";
import MultiStepProgressBar from "../../MultistepProgressBar/MultiStepProgressBar";
import "react-phone-input-2/lib/style.css";
import { AlertError } from "../../Alerts/Alert";
import { loading } from "../../ButtonEffects/ButtonEffects";
function PayementRegistrationForm(props) {
  const exhibitionId = useParams().id;
  const { exhibitions } = props;
  const wanted = exhibitions.filter((item, index) => {
    return (item.id = exhibitionId);
  })[0];

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const options = ["Registration", "Checkout", "Finish"];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleOnChange = (value) => {
    setPhoneNumber(value);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    document.querySelector(".response-alert").innerHTML = "";
    loading(".submit-btn");
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
          setActiveTab(1);
          ReactDOM.createRoot(
            document.querySelector(".payment-form-container")
          ).render(
            <CheckoutForm
              c_id={data.data[0].id}
              id={exhibitionId}
              firstName={firstName}
              lastName={lastName}
              email={email}
              phoneNumber={phoneNumber}
              exhibitionName={wanted.name}
              amount={wanted.fees}
              navigate={navigate}
              diminishProgress={() => {
                setActiveTab(0);
              }}
              updateProgress={() => {
                setActiveTab(2);
                setActiveTab(3);
              }}
            />
          );
        } else {
          ReactDOM.createRoot(document.querySelector(".response-alert")).render(
            AlertError("Failed to submit Your informations")
          );
        }
      })
      .catch((error) => {
        ReactDOM.createRoot(document.querySelector(".response-alert")).render(
          AlertError("error happened while submiting your informations")
        );
        ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
          <span>continue</span>
        );
      });
  };

  return (
    <div>
      <FormNavbar />

      <div className="payment-form-container container">
        <div>
          <h2>CUSTOMER REGISTRATION FORM</h2>
          <MultiStepProgressBar activeElement={activeTab} options={options} />
          <form
            onSubmit={handleOnSubmit}
            className="row  col-md-6 payment-form"
          >
            <div className="form-group"></div>

            <div className="form-group">
              <label htmlFor="first_name" className="col-sm-2 col-form-label">
                FIRST NAME
              </label>
              <input
                type="text"
                name="name"
                required
                autoComplete="off"
                onChange={(event) => {
                  setFirstName(event.target.value);
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
                  setLastName(event.target.value);
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
                  setEmail(event.target.value);
                }}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">PHONE</label>
              <PhoneInput
                country={"rw"}
                value={phoneNumber}
                onChange={handleOnChange}
                inputProps={{ required: true }}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary submit-btn form-control"
              >
                continue &nbsp; <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PayementRegistrationForm;
