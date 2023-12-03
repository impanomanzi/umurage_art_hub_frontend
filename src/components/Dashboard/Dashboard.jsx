import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-exhibition-card">
        <span>Total Exhibitions</span>
        <span>56</span>
      </div>
      <div className="dashboard-gallery-card">
        <span>Total Galleries</span>
        <span>256</span>
      </div>
      <div className="dashboard-painter-card">
        <span>Total painters</span>
        <span>546</span>
      </div>
      <div className="dashboard-analytics-card">
        <span>Total Analytics</span>
        <span>256</span>
      </div>
    </div>
  );
}

export default Dashboard;
