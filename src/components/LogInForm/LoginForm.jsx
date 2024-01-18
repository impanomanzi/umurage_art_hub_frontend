import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Link, useNavigate } from "react-router-dom";
import FormTemplate from "../FormTemplate/FormTemplate";
import FormNavbar from "../NavBar/FormNavbar";
import settings from "../settings.json";
function LoginForm(props) {
  let navigate = useNavigate();
  const closeAlert = (event) => {
    document.querySelector(".response-alert").innerHTML = "";
  };
  const bigErrorAlert = (
    <div className={`alert alert-danger alert-dismissible`}>
      <center>
        <p className="lead">Username or password is incorrect.</p>
      </center>

      <button className="btn btn-close" onClick={closeAlert}></button>
    </div>
  );
  const err = (
    <div className={`alert alert-danger alert-dismissible`}>
      <center>
        <p className="lead">Error occured try again</p>
      </center>

      <button className="btn btn-close" onClick={closeAlert}></button>
    </div>
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleOnSubmit = (event) => {
    event.preventDefault();
    document.querySelector(".submit-btn").removeAttribute("disabled");
    ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
      <center>
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </center>
    );
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
        if (data.message) {
          localStorage.setItem("session", data.session);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("username", data.username);
          localStorage.setItem("authKey", data.session);

          if (data.role === "admin") {
            props.onAdminLoggedIn(true);
            navigate(`/profile`);
          } else {
            props.onClientLoggedIn(true);
            navigate("/user-profile");
          }
        } else {
          document.querySelector(".submit-btn").removeAttribute("disabled");
          ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
            <span>
              {" "}
              <i className="fas fa-unlock"></i> &nbsp; Sign in
            </span>
          );
          ReactDOM.createRoot(document.querySelector(".response-alert")).render(
            bigErrorAlert
          );
        }
      })
      .catch((e) => {
        document.querySelector(".submit-btn").removeAttribute("disabled");
        ReactDOM.createRoot(document.querySelector(".submit-btn")).render(
          <span>
            {" "}
            <i className="fas fa-unlock"></i> &nbsp; Sign in
          </span>
        );
        ReactDOM.createRoot(document.querySelector(".response-alert")).render(
          err
        );
      });
  };

  return (
    <div>
      <FormNavbar />
      <div className="payment-registration-form-container m-3">
        <h2>LOG IN TO UMURAGE ART HUB</h2>
        <hr />
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="col-form-label">
              USERNAME
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="col-form-label">
              PASSWORD
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          {/* <Link to={"/user-profile"}> */}
          <button type="submit" className="btn btn-primary submit-btn">
            <i className="fas fa-unlock"></i> &nbsp; Sign in
          </button>
          {/* </Link> */}
          {/* <center>
            <p>or</p>
          </center>
          <center>
            {" "}
            <a href={`${settings.server_domain}/login`}>
              <img src="/web_light_sq_SI.svg" />
            </a>
          </center> */}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
