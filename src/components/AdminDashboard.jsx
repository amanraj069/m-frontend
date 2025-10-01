import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Link to="/">Milestone Admin</Link>
            </div>
            <div className="user-menu">
              <div className="user-info">
                <i className="fas fa-user-shield"></i>
                <span>Welcome, {user?.name || 'Admin'}</span>
              </div>
              <button onClick={logout} className="btn btn-outline">
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="container">
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

          <div className="dashboard-main">
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

            <div className="dashboard-sections">
              <div className="section">
                <h2>Recent Activities</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">
                      <i className="fas fa-user-plus"></i>
                    </div>
                    <div className="activity-content">
                      <p><strong>New user registration:</strong> John Doe joined as Freelancer</p>
                      <span className="activity-time">2 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">
                      <i className="fas fa-briefcase"></i>
                    </div>
                    <div className="activity-content">
                      <p><strong>New job posted:</strong> "React Developer Needed" by TechCorp</p>
                      <span className="activity-time">4 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">
                      <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <div className="activity-content">
                      <p><strong>New complaint:</strong> Payment dispute between client and freelancer</p>
                      <span className="activity-time">6 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>

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

              <div className="section">
                <h2>Quick Actions</h2>
                <div className="quick-actions">
                  <button className="btn btn-primary">
                    <i className="fas fa-user-shield"></i>
                    Verify Freelancer
                  </button>
                  <button className="btn btn-primary">
                    <i className="fas fa-ban"></i>
                    Suspend User
                  </button>
                  <button className="btn btn-primary">
                    <i className="fas fa-envelope"></i>
                    Send Announcement
                  </button>
                  <button className="btn btn-primary">
                    <i className="fas fa-download"></i>
                    Export Reports
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;