import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormTemplate from "../FormTemplate/FormTemplate";
import FormNavbar from "../NavBar/FormNavbar";
import settings from "../settings.json";
function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleOnSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    let options = {
      method: "POST",
      body: formData,
    };
    fetch(`${settings.server_domain}/custom-login`, options)
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".formMessage").innerHTML = data.message;
        if (data.message === "success") {
          document.cookie = `session=${data.session}`;
        } else {
          // document.querySelector(".formMessage").innerHTML = "Failed to login";
        }
      });
  };

  return (
    <div>
      <FormNavbar />
      <div className="payment-registration-form-container">
        <h2>LOG IN To Continue</h2>
        <hr />
        <span className="formMessage"></span>
        <form onSubmit={handleOnSubmit}>
          <div className="form-inputs-container">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              name="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>

          <div className="form-inputs-container">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          {/* <Link to={"/user-profile"}> */}
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-unlock"></i> &nbsp; Sign in
          </button>
          {/* </Link> */}
          <center>
            <p>or</p>
          </center>
          <center>
            {" "}
            <a href={`${settings.server_domain}/login`}>
              <img src="/web_light_sq_SI.svg" />
            </a>
          </center>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
