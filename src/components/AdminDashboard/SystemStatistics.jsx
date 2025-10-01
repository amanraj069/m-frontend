import React from 'react';

const SystemStatistics = () => (
  <div className="section">
    <h2>System Statistics</h2>
    <div className="charts-container">
      <div className="chart-card">
        <h3>User Growth</h3>
        <div className="chart-placeholder">
          <i className="fas fa-chart-line"></i>
          <p>Chart visualization would be here</p>
        </div>
      </div>
      <div className="chart-card">
        <h3>Revenue</h3>
        <div className="chart-placeholder">
          <i className="fas fa-chart-bar"></i>
          <p>Revenue chart would be here</p>
        </div>
      </div>
    </div>
  </div>
);

export default SystemStatistics;
