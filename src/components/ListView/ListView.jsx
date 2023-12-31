import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

function ListView(props) {
  // extracting keys from an object to be use as table headers
  let headers = Object.keys(props.items[0]);
  let number = headers.length;
  // const [changeDetected, setChangeDetected] = useState(false);
  return (
    // creating table headers
    <div className="list-group" style={{ margin: "1rem 0.8rem 1rem 0.8rem" }}>
      <div className="list-group-item active">
        <h4 className="h4">{props.title}</h4>
      </div>

      {props.items.map((item, index) => {
        return (
          <div
            className="list-group-item"
            key={index}
            style={{ marginBottom: "1em" }}
          >
            <button
              type="button"
              class="btn btn-primary"
              style={{ width: "4rem", height: "2rem" }}
            >
              <h4 class="badge badge-light h4">
                <center>{index + 1}</center>
              </h4>
            </button>
            {headers.map((innerItem, innerIndex) => {
              return (
                <div
                  style={{ display: "flex", flexDirection: "column" }}
                  key={innerIndex}
                >
                  <p className="data-description">
                    <b className="text-uppercase">
                      {headers[innerIndex]}: &nbsp;
                    </b>
                    {item[innerItem]}
                  </p>
                </div>
              );
            })}
            <div className="table-data">
              <div key={index} className="options-container">
                {props.options.map((optionItem, optionIndex) => {
                  return (
                    <button
                      className="btn btn-outline-secondary"
                      style={{ marginLeft: "1em" }}
                      value={optionItem.text}
                      key={optionIndex}
                      onClick={(id) => {
                        // changeDetected === true
                        //   ? setChangeDetected(false)
                        //   : setChangeDetected(true);

                        optionItem.callBack(item);
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
  );
}

export default ListView;
