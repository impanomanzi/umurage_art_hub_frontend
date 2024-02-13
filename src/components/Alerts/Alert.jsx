import React from "react";

const closeAlert = (event) => {
  document.querySelector(".response-alert").innerHTML = "";
};
export const AlertSuccess = (message) => {
  return (
    <div className={`alert alert-success`}>
      <center>
        <p className="lead">{message}</p>
      </center>
      <button className="btn btn-close" onClick={closeAlert}></button>
    </div>
  );
};

export const WarningAlert = (message) => {
  return (
    <div className={`alert alert-warning`}>
      <center>
        <p className="lead">{message}</p>
      </center>
      <button className="btn btn-close" onClick={closeAlert}></button>
    </div>
  );
};

export const AlertError = (message) => {
  return (
    <div className={`alert alert-danger`}>
      <center>
        <p className="lead">{message}</p>
      </center>
      <button className="btn btn-close" onClick={closeAlert}></button>
    </div>
  );
};
