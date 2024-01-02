import React from "react";
import FormNavbar from "../NavBar/FormNavbar";
import { Link } from "react-router-dom";
import settings from "../settings.json";
import PaypalButton from "../PaypalButton/PaypalButton";
import { useState } from "react";
function CheckoutForm(props) {
  const [productName, setProductName] = useState(props.exhibitionName);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productPrice, setProductPrice] = useState(props.amount);

  return (
    <div>
      <h2>CHECKOUT</h2>
      <hr />

      <form className="row col-md-5">
        <div className="form-group">
          <label htmlFor="first_name"> YOUR FIRST NAME</label>
          <input
            type="text"
            name="first-name"
            autoComplete="off"
            value={props.firstName}
            disabled
            className="form-control-plaintext"
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name"> YOUR LAST NAME</label>
          <input
            type="text"
            name="last_name"
            value={props.lastName}
            disabled
            className="form-control-plaintext"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">YOUR EMAIL</label>
          <input
            name="email"
            type="email"
            value={props.email}
            disabled
            className="form-control-plaintext"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exhibition_name">EXHIBITION NAME</label>
          <input
            name="exhibitionName"
            type="text"
            value={props.exhibitionName}
            disabled
            className="form-control-plaintext"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">YOUR PHONE</label>
          <input
            name="exhibitionName"
            type="text"
            value={props.phoneNumber}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">AMOUNT TO PAY</label>
          <input
            name="amount"
            type="text"
            value={props.amount}
            disabled
            className="form-control-plaintext"
          />
        </div>
        <div className="row justify-content-center" role="group">
          <a
            href={`/exhibition_paintings/${props.id}`}
            className="mtn btn btn-secondary"
          >
            Pay With MTN MOMO
            {/* <button className="momo-pay-button">Pay With MTN MOMO</button> */}
          </a>
          <a
            href={`/exhibition_paintings/${props.id}`}
            className="airtel btn btn-secondary"
          >
            Pay With Airtel Money
            {/* <button className="momo-pay-button">Pay With MTN MOMO</button> */}
          </a>

          <PaypalButton
            productInfo={{
              name: productName,
              quantity: productQuantity,
              price: productPrice,
            }}
          />

          {/* <button>Cancel</button> */}
          {/* {createPaypalOrder().render("#paypal-button-container")} */}
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
