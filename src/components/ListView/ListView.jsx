import { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./ListView.css";
import settings from "../settings.json";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Viewer from "react-viewer";
import { toast } from "react-hot-toast";
import { useOutletContext } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";

function ListView(props) {
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [listItems] = useOutletContext();
  const listData = useMemo(() => {
    setKeyword(listItems?.keyword[0] ? listItems?.keyword[0] : "");
    return listItems;
  }, [listItems]);
  const filteredItems = useMemo(() => {
    if (keyword)
      return listData?.items.filter((item) =>
        item[keyword].toLowerCase().includes(query)
      );
    return listData?.items;
  }, [listData, query, keyword]);
  const headers = useMemo(
    () => Object.keys(listData?.items.at(0) ? listData?.items.at(0) : []),
    [listData]
  );
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const innerCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("text copied");
  };

  return (
    <div className="row justify-content-center m-.7 list-view-container">
      <div
        className="btn-group"
        role="group"
        aria-label="button group for filtering and sorting exhibitions"
      >
        <input
          type="text"
          className="form-control"
          placeholder={`Search by ${keyword?.toLowerCase()}`}
          onChange={(event) => setQuery(event.target.value.toLowerCase())}
        />

        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Search By
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {listData?.keyword?.map((item, index) => (
              <Dropdown.Item>
                <button
                  className="dropdown-item"
                  key={index}
                  onClick={() => {
                    setKeyword(item);
                  }}
                >
                  {item}
                </button>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
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
            {listData.isLoading ? (
              <Spinner
                animation="border"
                role="status"
                variant="light"
              ></Spinner>
            ) : (
              <Badge bg="light" text="dark">
                {filteredItems.length}
              </Badge>
            )}
          </span>
        </div>
        <div className="message"></div>

        {filteredItems.map((item, index) => {
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
                        ) : headers[innerIndex] === "actions" ? (
                          ""
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
                {item.actions.map((action, index) => action)}
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
  );
}

export default ListView;
