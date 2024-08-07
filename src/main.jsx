import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ThreeGallery from "./components/ThreeGallery/ThreeGallery.jsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <ThreeGallery />
  </React.StrictMode>
);
