import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./ListView.css";
import settings from "../settings.json";
import { loading } from "../ButtonEffects/ButtonEffects";
import { AlertSuccess } from "../Alerts/Alert";

function ListView(props) {
  if (props.items.length == 0) {
    return (
      <div>
        <center>
          <h1>No Data</h1>
        </center>
      </div>
    );
  }
  const [fixedItems, setFixedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [keyword, setKeyword] = useState(props.keyword[0]);
  const [dropDownText, setDropdownText] = useState("Search By");
  const [searchPlaceHolder, setSearchPlaceHolder] = useState(
    `search by ${keyword}`
  );

  const deleteItem = (element, value, item) => {
    console.log("delete executed succesffuly");
    try {
      let temp = items;
      let arr = temp.filter((value, index) => {
        return value.id != item.id;
      });

      temp.splice(items.indexOf(item), 1);
      document.querySelector(element).innerHTML = value;
      if (!arr) setItems([]);

      setItems(arr);
      ReactDOM.createRoot(document.querySelector(".response-alert")).render(
        AlertSuccess("Item Deleted successfully.")
      );
    } catch (err) {
      console.log(err);
    }
  };

  const closeDropdown = () => {
    if (
      document.querySelector(".search-dropdown-menu").style.display === "none"
    ) {
      document.querySelector(".search-dropdown-menu").style.display = "block";
    } else {
      document.querySelector(".search-dropdown-menu").style.display = "none";
    }
  };
  useEffect(() => {
    setFixedItems(props.items);
    setItems(props.items);
    setHeaders(Object.keys(props.items[0]));
  }, []);

  return (
    // creating table headers
    props.items.length == 0 ? (
      <div>
        <center>
          <h1>No Data</h1>
        </center>
      </div>
    ) : (
      <div className="row justify-content-center m-1">
        <div
          class="btn-group"
          role="group"
          aria-label="button group for filtering and sorting exhibitions"
        >
          <input
            type="text"
            className="form-control"
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
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={closeDropdown}
              onMouseEnter={() => {
                closeDropdown();
              }}
            >
              <i className="fas fa-search"></i>&nbsp; {dropDownText}
            </button>
            <div
              className="dropdown-menu search-dropdown-menu"
              aria-labelledby="dropdownMenu1"
              onMouseLeave={() => {
                document.querySelector(".search-dropdown-menu").style.display =
                  "none";
              }}
            >
              {props.keyword.map((item, index) => {
                return (
                  <button
                    className="dropdown-item"
                    key={index}
                    onClick={() => {
                      setKeyword(item);
                      closeDropdown();
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className="list-group  row justify-content-center col-md-6 payment-form list-view-o"
          style={{ margin: "1rem 0.8rem 1rem 0.8rem", alignContent: "left" }}
        >
          <div className="list-group-item active list-title">
            <h3 className="my-fantastic-header">{props.title.toUpperCase()}</h3>
            <span className="badge badge-light" style={{ color: "black" }}>
              {items.length}
            </span>
          </div>
          <div className="message"></div>

          {items.map((item, index) => {
            return (
              <div
                className="list-group-item card my-list-item"
                key={index}
                style={{ marginBottom: "1em" }}
              >
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
                              width={"40%"}
                              className="img-thumbnail"
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
                                  <span
                                    style={{
                                      backgroundColor: "green",
                                      color: "white",
                                    }}
                                  >
                                    {item[innerItem]}
                                  </span>
                                ) : (
                                  <span style={{ backgroundColor: "yellow" }}>
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
                          className={`btn btn-primary m-1 option-btn-${optionItem.text}-${index}`}
                          style={{ marginLeft: "1em" }}
                          value={optionItem.text}
                          key={optionIndex}
                          onClick={(event) => {
                            const name =
                              event.target.classList[
                                event.target.classList.length - 1
                              ];
                            loading(`.${name}`);

                            optionItem.callBack({
                              event: event,
                              item: item,
                              delete: () => {
                                deleteItem(`.${name}`, optionItem.text, item);
                              },
                            });
                          }}
                        >
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
    )
  );
}

export default ListView;
