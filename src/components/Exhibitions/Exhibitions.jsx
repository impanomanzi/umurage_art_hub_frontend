import "./Exihibitions.css";
import { useMemo, useRef } from "react";
import ExhibitionCard from "../ExhibitionCard/ExhibitionCard";
import { useState } from "react";
import useExhibitions from "../../hooks/useExhibitions";

function Exhibitions() {
  const { exhibitions, setExhibitions } = useExhibitions();
  const [query, setQuery] = useState("");
  const filteredExhibitions = useMemo(
    () =>
      exhibitions?.filter((exhibition) =>
        exhibition.name.toLowerCase().includes(query.toLowerCase())
      ),
    [exhibitions, query]
  );
  const [dropdownText, setDropdownText] = useState("");
  const [observing, setObserving] = useState(true);
  const myRef = useRef();

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
                  setQuery(event.target.value);
                  setObserving(false);
                }}
                style={{ borderRadius: "0px" }}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={(event) => {
                  setObserving(false);
                  setQuery(searchEl.value);
                }}
                style={{ borderRadius: "0px" }}
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
                style={{ borderRadius: "0px" }}
              >
                <i className="fas fa-sort-amount-down"></i>
              </button>
              <div
                className="dropdown-menu ex-dropdown-menu"
                aria-labelledby="dropdownMenu1"
                onMouseLeave={() => {
                  document.querySelector(".ex-dropdown-menu").style.display =
                    "none";
                }}
                style={{ borderRadius: "0px" }}
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
                  Name
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
                  Date
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
                  Price
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="exhibitions-container" id="exhibitions-container">
          {filteredExhibitions?.map((exhibition, index) => {
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
