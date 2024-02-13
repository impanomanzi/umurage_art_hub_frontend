import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-exhibition-card">
        <span>Exhibitions</span>
        <span className="badge badge-warning">
          {localStorage.getItem("exhibitions")}{" "}
        </span>
      </div>
      <div className="dashboard-gallery-card">
        <span>Paintings</span>
        <span className="badge badge-warning">
          {localStorage.getItem("paintings")}
        </span>
      </div>
      <div className="dashboard-painter-card">
        <span>painters</span>
        <span className="badge badge-warning">{null}</span>
      </div>
      <div className="dashboard-analytics-card">
        <span>Analytics</span>
        <span className="badge badge-warning">{null}</span>
      </div>
    </div>
  );
}

export default Dashboard;
