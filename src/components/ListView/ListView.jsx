import React, { useState } from "react";
// import "./ListView.css";
import "bootstrap/dist/css/bootstrap.css";

function ListView(props) {
  // extracting keys from an object to be use as table headers
  let headers = Object.keys(props.items[0]);
  // const [changeDetected, setChangeDetected] = useState(false);
  return (
    // creating table headers
    <table className="table  table-bordered table-responsive table-hover table-sm">
      <thead className="table-dark">
        <tr>
          {headers.map((item, index) => {
            return (
              <th scope="col" key={index}>
                {item.toUpperCase()}
              </th>
            );
          })}

          <th scope="col">OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, index) => {
          return (
            <tr key={index}>
              {headers.map((innerItem, innerIndex) => {
                return (
                  <td className="user-select-all" key={innerIndex}>
                    {/* <b className="identifier">{innerItem}</b> */}
                    <p className="data-description">{item[innerItem]}</p>
                  </td>
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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ListView;
