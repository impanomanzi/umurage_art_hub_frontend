import React from "react";
import FormNavbar from "../NavBar/FormNavbar";
import { Link } from "react-router-dom";
import settings from "../settings.json";
import PaypalButton from "../PaypalButton/PaypalButton";
import PayementRegistrationForm from "../Forms/PaymentRegistrationForm/PayementRegistrationForm";
import "./CheckoutForm.css";
import ReactDOM from "react-dom/client";

import { useState } from "react";
function CheckoutForm(props) {
  const [productName, setProductName] = useState(props.exhibitionName);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productPrice, setProductPrice] = useState(props.amount);

  return (
    <div>
      <div className="checkout-message"></div>
      <h2>CHECKOUT</h2>
      <button
        className="btn btn-outline-tertiary"
        onClick={(event) => {
          props.navigate(`/payment/${props.id}`);
        }}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
      <hr />
      <div className="checkout-container">
        <div className="payment-info-alert">
          <div
            className="alert alert-dismissible alert-info"
            style={{ color: "black" }}
          >
            <h4 className="h4">Payment guide</h4>
            <hr />
            <span>
              <p className="lead">
                <div className="alert alert-warning" style={{ color: "black" }}>
                  CHECK YOUR EMAIL INBOX TO SEE YOUR ID <br />
                  To use to access an exhibition <br />
                  after payment.
                </div>{" "}
                <br />
                After making payment send payment screenshot to this <br />
                number, to get access to an exhibition. <br />
                <b>0791105800</b>
                <br />
                or E-mail to <br />
                <b>niyomugaboisaie05@gmail.com</b>
              </p>
            </span>
            {/* <a href="#pay-button1">
            {" "}
            <button className="btn btn-outline-primary"> see pay button</button>
          </a> */}
          </div>
        </div>
        <form className="row col-md-5">
          <p className="h3">Invoice data</p>
          <hr />
          <div className="form-group">
            <label htmlFor="first_name"> YOUR FIRST NAME</label>
            <input
              type="text"
              name="first-name"
              autoComplete="off"
              value={props.firstName}
              disabled
              className="form-control-plaintext"
              style={{ fontWeight: "900", fontSize: "1.2em" }}
            />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="last_name"> YOUR LAST NAME</label>
            <input
              type="text"
              name="last_name"
              value={props.lastName}
              disabled
              className="form-control-plaintext"
              style={{ fontWeight: "900", fontSize: "1.2em" }}
            />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="email">YOUR EMAIL</label>
            <input
              name="email"
              type="email"
              value={props.email}
              disabled
              className="form-control-plaintext"
              style={{ fontWeight: "900", fontSize: "1.2em" }}
            />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="exhibition_name">EXHIBITION NAME</label>
            <input
              name="exhibitionName"
              type="text"
              value={props.exhibitionName}
              disabled
              className="form-control-plaintext"
              style={{ fontWeight: "900", fontSize: "1.2em" }}
            />
          </div>
          <hr />

          <div className="form-group">
            <label htmlFor="phone">YOUR PHONE</label>
            <input
              name="exhibitionName"
              type="text"
              disabled
              value={props.phoneNumber}
              className="form-control-plaintext"
              style={{ fontWeight: "900", fontSize: "1.2em" }}
            />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="amount">AMOUNT TO PAY</label>
            <input
              name="amount"
              type="text"
              value={props.amount}
              disabled
              className="form-control-plaintext"
              style={{ fontWeight: "900", fontSize: "1.2em" }}
            />
          </div>
          <hr />
          <div className="row justify-content-center" role="group">
            <a
              href={`tel:*182*8*1*798732#`}
              className="mtn btn btn-secondary"
              id="pay-button1"
            >
              SEND MONEY HERE <br />
              *182*8*1*798732#
            </a>
            {/* <a href={"#"} className="airtel btn btn-secondary">
            Pay With Airtel Money
          </a> */}

            {/* <PaypalButton
            productInfo={{
              c_id: props.c_id,
              exId: props.id,
              phone: props.phoneNumber,
              name: productName,
              quantity: productQuantity,
              price: productPrice,
            }}
            navigate={props.navigate}
          /> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
