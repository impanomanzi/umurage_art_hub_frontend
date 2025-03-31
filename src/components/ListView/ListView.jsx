import { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./ListView.css";
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


 

  return (
    <div className="row justify-content-center m-.7 list-view-container">
      
      <div
        className="list-group  row justify-content-center col-md-6 payment-form list-view-o"
        style={{ margin: "1rem 1rem 1rem 1rem", alignContent: "left" }}
      >
        <div
          className="list-group-item list-title"
          style={{ marginBottom: "1em" }}
        >
          <h3 className="my-fantastic-header">{props.title.toUpperCase()}</h3>
          
          <div
        className="btn-group search-box-container"
        role="group"
        aria-label="button group for filtering and sorting exhibitions"
      > <span className="badge badge-light" style={{ color: "black" }}>
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
                        {   
                          <tr className="list-items-container">
                            <td>
                              <b className="text-uppercase card-text">
                                {headers[innerIndex]} &nbsp;
                              </b>
                            </td>
                            <td>{item[innerItem]}</td>
                          </tr>
                        }
                      </>
                    );
                  })}
                </tbody>
              </table>
              
            </div>
          );
        })}
      </div>
 
    </div>
  );
}

export default ListView;
