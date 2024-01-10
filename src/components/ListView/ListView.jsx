import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import settings from "../settings.json";
function ListView(props) {
  // extracting keys from an object to be use as table headers
  let headers = Object.keys(props.items[0]);
  let number = headers.length;
  return (
    // creating table headers
    <center>
      {" "}
      <div
        className="list-group  row justify-content-center col-md-6 payment-form"
        style={{ margin: "1rem 0.8rem 1rem 0.8rem", alignContent: "left" }}
      >
        <div className="list-group-item active">
          <h4 className="h4">{props.title}</h4>
        </div>
        <div className="message"></div>
        {props.items.map((item, index) => {
          return (
            <div
              className="list-group-item card"
              key={index}
              style={{ marginBottom: "1em" }}
            >
              <button
                type="button"
                class="btn btn-primary"
                style={{ width: "4rem", height: "2rem" }}
              >
                <h4>
                  <center>{index + 1}</center>
                </h4>
              </button>
              {headers.map((innerItem, innerIndex) => {
                return (
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    key={innerIndex}
                  >
                    <p className="data-description card-text">
                      {headers[innerIndex] === "image" ? (
                        <div>
                          <b className="text-uppercase">
                            {headers[innerIndex]}: &nbsp;
                          </b>
                          <img
                            loading="lazy"
                            className="card-img-top"
                            src={`${item[innerItem]}`.replace(
                              "http://localhost:5000",
                              `${settings.server_domain}`
                            )}
                            style={{ borderRadius: "1em" }}
                          />
                        </div>
                      ) : (
                        <div>
                          <b className="text-uppercase card-text">
                            {headers[innerIndex]}: &nbsp;
                          </b>
                          {item[innerItem]}
                        </div>
                      )}
                    </p>
                  </div>
                );
              })}
              <div className="table-data">
                <div key={index} className="options-container">
                  {props.options.map((optionItem, optionIndex) => {
                    return (
                      <button
                        className={`btn btn-primary`}
                        style={{ marginLeft: "1em" }}
                        value={optionItem.text}
                        key={optionIndex}
                        onClick={(event) => {
                          optionItem.callBack(event, item);
                        }}
                      >
                        <i className={optionItem.icon}></i>
                        {optionItem.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </center>
  );
}

export default ListView;
