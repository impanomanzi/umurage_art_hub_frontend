import React from "react";
import { Link } from "react-router-dom";
import FormTemplate from "../FormTemplate/FormTemplate";

function LoginForm() {
  let fields = [
    { text: "username", type: "text" },
    { text: "password", type: "password" },
  ];

  return (
    <div className="payment-registration-form-container">
      <h2>SIGN IN TO CONTINUE</h2>
      <hr />

      <form>
        <div className="form-inputs-container">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            name="username"
            // onChange={(event) => {
            //   setUsername(event.target.value);
            // }}
          />
        </div>

        <div className="form-inputs-container">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            name="password"
            // onChange={(event) => {
            //   setPassword(event.target.value);
            // }}
          />
        </div>
        <Link to={"/user-profile"}>
          <button type="submit">
            <i className="fas fa-unlock"></i>
            Sign in
          </button>
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
