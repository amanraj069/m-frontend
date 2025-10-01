import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="dashboard-sidebar">
    <nav className="sidebar-nav">
      <ul>
        <li><Link to="/admin/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li>
        <li><Link to="/admin/users"><i className="fas fa-users"></i> Users</Link></li>
        <li><Link to="/admin/freelancers"><i className="fas fa-user-tie"></i> Freelancers</Link></li>
        <li><Link to="/admin/employers"><i className="fas fa-building"></i> Employers</Link></li>
        <li><Link to="/admin/jobs"><i className="fas fa-briefcase"></i> Job Listings</Link></li>
        <li><Link to="/admin/payments"><i className="fas fa-credit-card"></i> Payments</Link></li>
        <li><Link to="/admin/complaints"><i className="fas fa-exclamation-triangle"></i> Complaints</Link></li>
        <li><Link to="/admin/analytics"><i className="fas fa-chart-line"></i> Analytics</Link></li>
        <li><Link to="/admin/settings"><i className="fas fa-cog"></i> Settings</Link></li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
