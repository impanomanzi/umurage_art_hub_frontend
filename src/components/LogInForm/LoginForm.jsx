import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Link, useNavigate } from "react-router-dom";
import FormTemplate from "../FormTemplate/FormTemplate";
import FormNavbar from "../NavBar/FormNavbar";
import settings from "../settings.json";
function LoginForm(props) {
  let navigate = useNavigate();
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
        if (data.message) {
          localStorage.setItem("session", data.session);
          localStorage.setItem("userId", data.userId);
          props.onClientLoggedIn();
          navigate("/user-profile");
        } else {
          let errorMessage = (
            <p className="alert alert-warning">
              Username or password is incorrect
            </p>
          );
          ReactDOM.createRoot(document.querySelector(".formMessage")).render(
            errorMessage
          );
        }
      });
  };

  return (
    <div>
      <FormNavbar />
      <div className="payment-registration-form-container">
        <h2>LOG IN TO UMURAGE ART HUB</h2>
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
