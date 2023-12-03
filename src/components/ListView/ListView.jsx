import React, { useState } from "react";
import "./ListView.css";

function ListView(props) {
  // extracting keys from an object to be use as table headers
  let headers = Object.keys(props.items[0]);
  // const [changeDetected, setChangeDetected] = useState(false);
  return (
    // creating table headers
    <div className="table">
      <div className="table-row table-headers">
        {headers.map((item, index) => {
          return (
            <div className="table-data table-header" key={index}>
              {item.toUpperCase()}
            </div>
          );
        })}
        <div className="table-data table-header">OPTIONS</div>
      </div>

      {props.items.map((item, index) => {
        return (
          <div className="table-row" key={index}>
            {headers.map((innerItem, innerIndex) => {
              return (
                <div className="table-data" key={innerIndex}>
                  <b className="identifier">{innerItem}</b>
                  <p className="data-description">{item[innerItem]}</p>
                </div>
              );
            })}
            <div className="table-data">
              <div key={index} className="options-container">
                {props.options.map((optionItem, optionIndex) => {
                  return (
                    <button
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
