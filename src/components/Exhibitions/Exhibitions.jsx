import React, { useEffect } from "react";
import ExhibitionCard from "../ExhibitionCard/ExhibitionCard";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import settings from "../settings.json";
import "./Exihibitions.css";
import { useNavigate } from "react-router-dom";
function Exhibitions(props) {
  const [fixedExhibitions, setFixedExhibitions] = useState([]);
  const [dropdownText, setDropdownText] = useState("Sort by");
  const [exhibitions, setExhibitions] = useState(props.exhibitions);
  const [searchResult, setSearchResult] = useState("");
  let customArray = [];
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${settings.server_domain}/get_exhibitions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message != false) {
          setFixedExhibitions(data);
          setExhibitions(data);
          customArray = data;
        } else {
          navigate("/sign-in");
        }
      });
  }, []);

  const removeSkeletons = (index) => {
    document.querySelector(`.exhibitions-loading`).innerHTML = "";
  };
  const closeExDropdown = () => {
    if (document.querySelector(".ex-dropdown-menu").style.display === "block") {
      document.querySelector(".ex-dropdown-menu").style.display = "none";
    } else {
      document.querySelector(".ex-dropdown-menu").style.display = "block";
    }
  };
  return (
    <div className="exhibitions-outer-container">
      <div className="header">
        <center>
          <h1 className="h1" style={{ color: "white" }}>
            Exhibitions
          </h1>
        </center>
        <div
          class="btn-group"
          role="group"
          aria-label="button group for filtering and sorting exhibitions"
        >
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
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
              class="dropdown-menu ex-dropdown-menu"
              aria-labelledby="dropdownMenu1"
              onMouseLeave={() => {
                document.querySelector(".ex-dropdown-menu").style.display =
                  "none";
              }}
            >
              <button
                class="dropdown-item"
                onClick={() => {
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
                class="dropdown-item"
                onClick={() => {
                  closeExDropdown();
                  setDropdownText("Date");
                  let FilteredExhibitionsbynames = exhibitions.sort((a, b) => {
                    a = Date.parse(`${a.startdate}`);
                    b = Date.parse(`${b.startdate}`);
                    return a - b;
                  });

                  setExhibitions(FilteredExhibitionsbynames);
                }}
              >
                <i className="fas fa-sort-numeric-down"></i> &nbsp;start Date
              </button>
              <button
                class="dropdown-item"
                onClick={() => {
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
          <input
            type="text"
            className="form-control exh-search"
            placeholder="Search by Exh. name"
            onChange={(event) => {
              let searchResult = fixedExhibitions.filter((item) => {
                return item.name.toLowerCase().startsWith(event.target.value);
              });
              setExhibitions(searchResult);
            }}
          />
          <button
            type="button"
            class="btn btn-outline-secondary"
            onClick={(event) => {
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
      </div>
      <div className="exhibitions-loading" style={{ color: "white" }}>
        <center style={{ marginTop: "25%" }}>
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            <p className="lead">Loading exhibitions</p>
          </div>
        </center>
      </div>
      <div className="exhibitions-container" id="exhibitions-container">
        {exhibitions.map((exhibition, index) => {
          removeSkeletons();
          return <ExhibitionCard exhibition={exhibition} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Exhibitions;
