import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card dashboard-exhibition-card">
        <span>Exhibitions</span>
        <span className="badge">
          {localStorage.getItem("exhibitions") || 0}
        </span>
      </div>
      <div className="dashboard-card dashboard-gallery-card">
        <span>Paintings</span>
        <span className="badge">{localStorage.getItem("paintings") || 0}</span>
      </div>
      <div className="dashboard-card dashboard-painter-card">
        <span>Painters</span>
        <span className="badge">{localStorage.getItem("painters") || 0}</span>
      </div>
      <div className="dashboard-card dashboard-analytics-card">
        <span>Analytics</span>
        <span className="badge">{localStorage.getItem("analytics") || 0}</span>
      </div>
    </div>
  );
}

export default Dashboard;
