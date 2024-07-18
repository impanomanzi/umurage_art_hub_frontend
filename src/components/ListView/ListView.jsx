import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./ListView.css";
import settings from "../settings.json";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Viewer from "react-viewer";
import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function ListView(props) {
  if (!props.items) {
    return (
      <div>
        <center>
          <h1>No Data</h1>
        </center>
      </div>
    );
  }
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [fixedItems, setFixedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [keyword, setKeyword] = useState(props.keyword[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [dropDownText, setDropdownText] = useState("Search By");

  const deleteItem = (item) => {
    try {
      let temp = items;
      let arr = temp.filter((value, _) => {
        return value.id != item.id;
      });
      if (!arr) setItems([]);
      setItems(arr);
      toast.success("Item Deleted successfully.");
    } catch (err) {
      toast.error(String(err));
    }
  };
  const innerCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("text copied");
  };
  const innerUpdater = (item) => {
    try {
      let temp = items;
      let index = temp.indexOf(
        temp.filter((innerItem, _) => {
          return innerItem.id === item.id;
        })[0]
      );
      temp[index] = item;
      setItems(temp);
    } catch (error) {
      toast.error(String(err));
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
    try {
      setFixedItems(props.items);
      setItems(props.items);
      setHeaders(Object.keys(props.items[0]));
    } catch (error) {
      setItems([]);
    }
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
      <div className="row justify-content-center m-.7 list-view-container">
        <div
          className="btn-group"
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
          style={{ margin: "1rem 1rem 1rem 1rem", alignContent: "left" }}
        >
          <div
            className="list-group-item active list-title"
            style={{ marginBottom: "1em" }}
          >
            <h3 className="my-fantastic-header">{props.title.toUpperCase()}</h3>
            <span className="badge badge-light" style={{ color: "black" }}>
              {items.length}
            </span>
          </div>
          <div className="message"></div>

          {items.map((item, index) => {
            return (
              <div
                className="list-group-item my-list-item"
                key={index}
                style={{ marginBottom: "1em", borderRadius: "10px" }}
              >
                <table>
                  <tbody>
                    {headers.map((innerItem, innerIndex) => {
                      return (
                        <>
                          {headers[innerIndex] === "image" ? (
                            <tr className="list-items-container">
                              <span
                                onClick={() => {
                                  setVisible(true);
                                  setImageUrl(
                                    `${item[innerItem]}`.replace(
                                      "http://localhost:5000",
                                      `${settings.server_domain}`
                                    )
                                  );
                                }}
                              >
                                <LazyLoadImage
                                  src={`${item[innerItem]}`.replace(
                                    "http://localhost:5000",
                                    `${settings.server_domain}`
                                  )}
                                  effect="blur"
                                  placeholderSrc="/placeholder.png"
                                  width={"300px"}
                                  height="320px"
                                  style={{ borderRadius: "1em" }}
                                />
                              </span>
                            </tr>
                          ) : headers[innerIndex] === "status" ? (
                            <tr className="list-items-container">
                              <td scope="col">
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
                                      padding: "2px",
                                      borderRadius: "2px",
                                    }}
                                  >
                                    {item[innerItem]}
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      backgroundColor: "yellow",
                                      padding: "2px",
                                      borderRadius: "2px",
                                    }}
                                  >
                                    {item[innerItem]}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ) : headers[innerIndex] === "content" ? (
                            <article>{item[innerItem]}</article>
                          ) : headers[innerIndex] === "audio" ? (
                            <audio src={item[innerItem]} controls></audio>
                          ) : headers[innerIndex] == "id" ? (
                            <tr className="list-items-container">
                              <td>
                                <b className="text-uppercase card-text">
                                  {headers[innerIndex]} &nbsp;
                                </b>
                              </td>
                              <td>
                                {item[innerItem]}
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={() => innerCopy(item[innerItem])}
                                >
                                  <i className="fas fa-copy"></i>
                                </button>
                              </td>
                            </tr>
                          ) : headers[innerIndex] === "description" ? (
                            <tr className="list-items-container">
                              <td>
                                <b className="text-uppercase card-text">
                                  {headers[innerIndex]} &nbsp;
                                </b>
                              </td>
                              <td>
                                <article>{item[innerItem]}</article>
                              </td>
                            </tr>
                          ) : (
                            <tr className="list-items-container">
                              <td>
                                <b className="text-uppercase card-text">
                                  {headers[innerIndex]} &nbsp;
                                </b>
                              </td>
                              <td>{item[innerItem]}</td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>
                <div key={index} className="options-container">
                  {props.options.map((optionItem, optionIndex) => {
                    return (
                      <button
                        className="btn btn-primary m-1"
                        key={optionIndex}
                        isLoading={isLoading}
                        onClick={async (event) => {
                          setIsLoading(true);
                          setActiveButton((index + 1) * (optionIndex + index));
                          if (props.confirmationRequired) {
                            confirmAlert({
                              title: "Confirm",
                              message: "Are you sure to do this.",
                              buttons: [
                                {
                                  label: "Yes",
                                  onClick: async () => {
                                    await optionItem.callBack({
                                      event: event,
                                      item: item,
                                      updater: (newItems) => {
                                        innerUpdater(newItems);
                                      },
                                      delete: () => {
                                        deleteItem(item);
                                      },
                                    });
                                    setIsLoading(false);
                                    setActiveButton("");
                                  },
                                },
                                {
                                  label: "No",
                                  onClick: () => {
                                    setIsLoading(false);
                                    setActiveButton("");
                                    return;
                                  },
                                },
                              ],
                            });
                          } else {
                            await optionItem.callBack({
                              event: event,
                              item: item,
                              updater: (newItems) => {
                                innerUpdater(newItems);
                              },
                              delete: () => {
                                deleteItem(item);
                              },
                            });
                            setIsLoading(false);
                            setActiveButton("");
                          }
                        }}
                        disabled={
                          isLoading &&
                          activeButton == (index + 1) * (optionIndex + index)
                            ? true
                            : false
                        }
                      >
                        {isLoading &&
                        activeButton == (index + 1) * (optionIndex + index) ? (
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : null}
                        {optionItem.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <Viewer
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          className="painting-show"
          images={[
            {
              src: imageUrl,
              alt: "",
            },
          ]}
        />
      </div>
    )
  );
}

export default ListView;
