import React from "react";
import ReactDOM from "react-dom/client";

export const loading = (el) => {
  ReactDOM.createRoot(document.querySelector(el)).render(
    <center>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </center>
  );
};

export const unload = (el, name) => {
  ReactDOM.createRoot(document.querySelector(el)).render(name);
};
