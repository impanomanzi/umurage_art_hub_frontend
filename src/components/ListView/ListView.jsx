import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import settings from "../settings.json";
function ListView(props) {
  const [fixedItems, setFixedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [headers, setHeaders] = useState([]);
  let keyword = props.keyword;

  useEffect(() => {
    setFixedItems(props.items);
    setItems(props.items);
    setHeaders(Object.keys(props.items[0]));
  }, []);
  return (
    // creating table headers
    <div className="row justify-content-center m-l-1 m-r-1">
      <div
        class="btn-group"
        role="group"
        aria-label="button group for filtering and sorting exhibitions"
      >
        <input
          type="text"
          placeholder={`Search by ${keyword.toLowerCase()}`}
          onChange={(event) => {
            let searchResult = fixedItems.filter((item) => {
              return item[keyword]
                .toLowerCase()
                .startsWith(event.target.value.toLowerCase());
            });
            setItems(searchResult);
          }}
        />
      </div>
      <div
        className="list-group  row justify-content-center col-md-6 payment-form"
        style={{ margin: "1rem 0.8rem 1rem 0.8rem", alignContent: "left" }}
      >
        <div className="list-group-item active">
          <h4 className="h3">{props.title}</h4>
          <span className="badge badge-light" style={{ color: "black" }}>
            {items.length}
          </span>
        </div>
        <div className="message"></div>

        {items.map((item, index) => {
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
                      ) : headers[innerIndex] === "status" ? (
                        <table className="table">
                          <tr>
                            <td scope="col">
                              {" "}
                              <b className="text-uppercase card-text">
                                {headers[innerIndex]} &nbsp;
                              </b>
                            </td>
                            <td scope="col">
                              {item[innerItem] === "active" ? (
                                <span className="badge badge-success">
                                  {item[innerItem]}
                                </span>
                              ) : (
                                <span className="badge badge-warning">
                                  {item[innerItem]}
                                </span>
                              )}
                            </td>
                          </tr>
                        </table>
                      ) : (
                        <table className="table">
                          <tr>
                            <td scope="col">
                              {" "}
                              <b className="text-uppercase card-text">
                                {headers[innerIndex]} &nbsp;
                              </b>
                            </td>
                            <td scope="col">{item[innerItem]}</td>
                          </tr>
                        </table>
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
    </div>
  );
}

export default ListView;
