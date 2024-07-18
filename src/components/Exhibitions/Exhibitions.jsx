import "./Exihibitions.css";
import { useEffect, useRef } from "react";
import ExhibitionCard from "../ExhibitionCard/ExhibitionCard";
import { useState } from "react";

function Exhibitions(props) {
  const [fixedExhibitions, setFixedExhibitions] = useState([]);
  const [dropdownText, setDropdownText] = useState("Sort by");
  const [exhibitions, setExhibitions] = useState(props.exhibitions);
  const [observing, setObserving] = useState(true);
  const myRef = useRef();
  let customArray = [];
  useEffect(() => {
    setFixedExhibitions(exhibitions);
    customArray = exhibitions;
  }, []);

  const closeExDropdown = () => {
    if (document.querySelector(".ex-dropdown-menu").style.display === "block") {
      document.querySelector(".ex-dropdown-menu").style.display = "none";
    } else {
      document.querySelector(".ex-dropdown-menu").style.display = "block";
    }
  };
  return (
    <>
      <div className="exhibitions-outer-container">
        <div className="header">
          <div className="my-btn-group">
            <div
              className="btn-group"
              role="group"
              aria-label="button group for filtering and sorting exhibitions"
            >
              <input
                type="text"
                className="form-control exh-search"
                placeholder="Search by Exh. name"
                onChange={(event) => {
                  let searchResult = fixedExhibitions.filter((item) => {
                    return item.name
                      .toLowerCase()
                      .startsWith(event.target.value);
                  });
                  setExhibitions(searchResult);
                  setObserving(false);
                }}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={(event) => {
                  setObserving(false);
                  let searchEl = document.querySelector(".exh-search");
                  let searchResult = fixedExhibitions.filter((item) => {
                    return item.name.toLowerCase().startsWith(searchEl.value);
                  });
                  setExhibitions(searchResult);
                }}
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenu1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={closeExDropdown}
                onMouseEnter={closeExDropdown}
              >
                <i className="fas fa-sort-amount-down"></i>&nbsp; {dropdownText}
              </button>
              <div
                className="dropdown-menu ex-dropdown-menu"
                aria-labelledby="dropdownMenu1"
                onMouseLeave={() => {
                  document.querySelector(".ex-dropdown-menu").style.display =
                    "none";
                }}
              >
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setObserving(false);
                    closeExDropdown();
                    setDropdownText("Name");
                    let FilteredExhibitionsbynames = exhibitions.sort(
                      (a, b) => a.name > b.name
                    );
                    setExhibitions(FilteredExhibitionsbynames);
                  }}
                >
                  <i className="fas fa-sort-alpha-down"></i> &nbsp; Name
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setObserving(false);
                    closeExDropdown();
                    setDropdownText("Date");
                    let FilteredExhibitionsbynames = exhibitions.sort(
                      (a, b) => {
                        a = Date.parse(`${a.startdate}`);
                        b = Date.parse(`${b.startdate}`);
                        return a - b;
                      }
                    );

                    setExhibitions(FilteredExhibitionsbynames);
                  }}
                >
                  <i className="fas fa-sort-numeric-down"></i> &nbsp;start Date
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setObserving(false);
                    closeExDropdown();
                    setDropdownText("Price");
                    let FilteredExhibitions = exhibitions.sort(
                      (a, b) => a.fees - b.fees
                    );

                    setExhibitions(FilteredExhibitions);
                  }}
                >
                  <i className="fas fa-sort-numeric-down"></i> &nbsp;Price
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="exhibitions-container" id="exhibitions-container">
          {/* {myRef["current"] && images.push(myRef["current"])} */}
          {exhibitions?.map((exhibition, index) => {
            return (
              <>
                <ExhibitionCard
                  exhibition={exhibition}
                  key={index}
                  observing={observing}
                  mref={myRef}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Exhibitions;
