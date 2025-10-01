import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const FreelancerDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Link to="/">Milestone</Link>
            </div>
            <div className="user-menu">
              <div className="user-info">
                <i className="fas fa-user-circle"></i>
                <span>Welcome, {user?.name || 'Freelancer'}</span>
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
                <li><Link to="/freelancer/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li>
                <li><Link to="/freelancer/profile"><i className="fas fa-user"></i> Profile</Link></li>
                <li><Link to="/freelancer/jobs"><i className="fas fa-briefcase"></i> Find Jobs</Link></li>
                <li><Link to="/freelancer/applications"><i className="fas fa-file-alt"></i> My Applications</Link></li>
                <li><Link to="/freelancer/active-jobs"><i className="fas fa-tasks"></i> Active Jobs</Link></li>
                <li><Link to="/freelancer/history"><i className="fas fa-history"></i> Job History</Link></li>
                <li><Link to="/freelancer/skills"><i className="fas fa-award"></i> Skills & Badges</Link></li>
                <li><Link to="/freelancer/earnings"><i className="fas fa-chart-line"></i> Earnings</Link></li>
              </ul>
            </nav>
          </div>

          <div className="dashboard-main">
            <div className="dashboard-overview">
              <h1>Freelancer Dashboard</h1>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <div className="stat-content">
                    <h3>5</h3>
                    <p>Active Applications</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-tasks"></i>
                  </div>
                  <div className="stat-content">
                    <h3>2</h3>
                    <p>Ongoing Projects</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="stat-content">
                    <h3>12</h3>
                    <p>Completed Jobs</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="stat-content">
                    <h3>$2,450</h3>
                    <p>Total Earnings</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-sections">
              <div className="section">
                <h2>Recent Job Opportunities</h2>
                <div className="job-listings">
                  <div className="job-card">
                    <h3>React Developer Needed</h3>
                    <p>Build a modern e-commerce platform with React and Node.js</p>
                    <div className="job-meta">
                      <span className="budget">$800 - $1200</span>
                      <span className="duration">2-3 weeks</span>
                    </div>
                    <div className="job-actions">
                      <button className="btn btn-primary">Apply Now</button>
                    </div>
                  </div>
                  <div className="job-card">
                    <h3>UI/UX Design for Mobile App</h3>
                    <p>Design intuitive user interfaces for a fitness tracking mobile application</p>
                    <div className="job-meta">
                      <span className="budget">$600 - $900</span>
                      <span className="duration">1-2 weeks</span>
                    </div>
                    <div className="job-actions">
                      <button className="btn btn-primary">Apply Now</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section">
                <h2>Active Projects</h2>
                <div className="project-list">
                  <div className="project-card">
                    <h3>E-commerce Website Development</h3>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '75%'}}></div>
                    </div>
                    <p>Progress: 75% complete</p>
                    <div className="project-actions">
                      <button className="btn btn-outline">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;