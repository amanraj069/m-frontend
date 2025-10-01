import React from 'react';

const StatsOverview = () => (
  <div className="dashboard-overview">
    <h1>Admin Dashboard</h1>
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-users"></i>
        </div>
        <div className="stat-content">
          <h3>1,247</h3>
          <p>Total Users</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-user-tie"></i>
        </div>
        <div className="stat-content">
          <h3>892</h3>
          <p>Active Freelancers</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-building"></i>
        </div>
        <div className="stat-content">
          <h3>355</h3>
          <p>Employers</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-briefcase"></i>
        </div>
        <div className="stat-content">
          <h3>156</h3>
          <p>Active Jobs</p>
        </div>
      </div>
    </div>
  </div>
);

export default StatsOverview;
