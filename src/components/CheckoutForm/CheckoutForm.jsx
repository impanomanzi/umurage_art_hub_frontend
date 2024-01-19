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
      <div className="checkout-message"></div>
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
            style={{ fontWeight: "900", fontSize: "1.2em" }}
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
            style={{ fontWeight: "900", fontSize: "1.2em" }}
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
            style={{ fontWeight: "900", fontSize: "1.2em" }}
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
            style={{ fontWeight: "900", fontSize: "1.2em" }}
          />
        </div>

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
        <div className="row justify-content-center" role="group">
          <a href={`tel:*182*8*1*798732#`} className="mtn btn btn-secondary">
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
  );
}

export default CheckoutForm;
