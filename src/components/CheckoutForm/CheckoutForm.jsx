import React from "react";
import FormNavbar from "../NavBar/FormNavbar";
function CheckoutForm(props) {
  return (
    <div className="payment-registration-form-container">
      <FormNavbar />
      <h2>CHECKOUT</h2>
      <hr />

      <form>
        <div className="form-inputs-container">
          <label htmlFor="first_name"> YOUR FIRST NAME</label>
          <input
            type="text"
            name="first-name"
            autoComplete="off"
            value={props.firstName}
            disabled
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="last_name"> YOUR LAST NAME</label>
          <input type="text" name="last_name" value={props.lastName} disabled />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="email">YOUR EMAIL</label>
          <input name="email" type="email" value={props.email} disabled />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="exhibition_name">EXHIBITION NAME</label>
          <input
            name="exhibitionName"
            type="text"
            value={props.exhibitionName}
            disabled
          />
        </div>

        <div className="form-inputs-container">
          <label htmlFor="phone">YOUR PHONE</label>
          <input name="exhibitionName" type="text" value={props.phoneNumber} />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="amount">AMOUNT TO PAY</label>
          <input name="amount" type="text" value={props.amount} disabled />
        </div>
        <div className="form-inputs-container">
          <button type="submit" className="momo-pay-button">
            Pay With MTN MOMO
          </button>
          {/* <button>Cancel</button> */}
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
