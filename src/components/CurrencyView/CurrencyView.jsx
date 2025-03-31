import React from "react";

function CurrencyView({ number, style, className }) {
  return (
    <h2 style={style} className={className}>
      {Number(number).toLocaleString("en-US", {
        style: "currency",
        currency: "RWF",
      })}
    </h2>
  );
}

export default CurrencyView;
