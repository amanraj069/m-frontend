import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const EmployerDashboard = () => {
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
                <i className="fas fa-building"></i>
                <span>Welcome, {user?.name || 'Employer'}</span>
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
                <li><Link to="/employer/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li>
                <li><Link to="/employer/profile"><i className="fas fa-building"></i> Company Profile</Link></li>
                <li><Link to="/employer/post-job"><i className="fas fa-plus"></i> Post a Job</Link></li>
                <li><Link to="/employer/job-listings"><i className="fas fa-list"></i> My Job Listings</Link></li>
                <li><Link to="/employer/applications"><i className="fas fa-users"></i> Applications</Link></li>
                <li><Link to="/employer/active-projects"><i className="fas fa-project-diagram"></i> Active Projects</Link></li>
                <li><Link to="/employer/payments"><i className="fas fa-credit-card"></i> Payments</Link></li>
                <li><Link to="/employer/analytics"><i className="fas fa-chart-bar"></i> Analytics</Link></li>
              </ul>
            </nav>
          </div>

          <div className="dashboard-main">
            <div className="dashboard-overview">
              <h1>Employer Dashboard</h1>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <div className="stat-content">
                    <h3>8</h3>
                    <p>Active Job Listings</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="stat-content">
                    <h3>23</h3>
                    <p>Total Applications</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <div className="stat-content">
                    <h3>4</h3>
                    <p>Hired Freelancers</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="stat-content">
                    <h3>$12,500</h3>
                    <p>Total Spent</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-sections">
              <div className="section">
                <div className="section-header">
                  <h2>Recent Applications</h2>
                  <Link to="/employer/applications" className="btn btn-outline">View All</Link>
                </div>
                <div className="applications-list">
                  <div className="application-card">
                    <div className="applicant-info">
                      <img src="/assets/home/aman.png" alt="Aman Raj" className="applicant-avatar" />
                      <div>
                        <h3>Aman Raj</h3>
                        <p>Full Stack Developer</p>
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <span>4.9 (127 reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="application-meta">
                      <span className="job-title">React Developer Position</span>
                      <span className="application-date">Applied 2 hours ago</span>
                    </div>
                    <div className="application-actions">
                      <button className="btn btn-primary">View Profile</button>
                      <button className="btn btn-outline">Message</button>
                    </div>
                  </div>
                  <div className="application-card">
                    <div className="applicant-info">
                      <img src="/assets/home/vanya.png" alt="Vanya Awasthi" className="applicant-avatar" />
                      <div>
                        <h3>Vanya Awasthi</h3>
                        <p>UI/UX Designer</p>
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <span>4.8 (95 reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="application-meta">
                      <span className="job-title">Mobile App Design</span>
                      <span className="application-date">Applied 1 day ago</span>
                    </div>
                    <div className="application-actions">
                      <button className="btn btn-primary">View Profile</button>
                      <button className="btn btn-outline">Message</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section">
                <div className="section-header">
                  <h2>Active Job Listings</h2>
                  <Link to="/employer/post-job" className="btn btn-primary">Post New Job</Link>
                </div>
                <div className="job-listings">
                  <div className="job-card employer-view">
                    <h3>Senior React Developer</h3>
                    <p>Looking for an experienced React developer to build a modern web application</p>
                    <div className="job-meta">
                      <span className="budget">$1000 - $1500</span>
                      <span className="applications">8 applications</span>
                      <span className="posted">Posted 3 days ago</span>
                    </div>
                    <div className="job-actions">
                      <button className="btn btn-outline">View Applications</button>
                      <button className="btn btn-primary">Edit</button>
                    </div>
                  </div>
                  <div className="job-card employer-view">
                    <h3>Mobile App UI/UX Design</h3>
                    <p>Design modern and intuitive interfaces for our fitness tracking mobile app</p>
                    <div className="job-meta">
                      <span className="budget">$800 - $1200</span>
                      <span className="applications">5 applications</span>
                      <span className="posted">Posted 1 week ago</span>
                    </div>
                    <div className="job-actions">
                      <button className="btn btn-outline">View Applications</button>
                      <button className="btn btn-primary">Edit</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section">
                <h2>Active Projects</h2>
                <div className="project-list">
                  <div className="project-card">
                    <div className="project-header">
                      <h3>E-commerce Platform Development</h3>
                      <span className="project-status active">In Progress</span>
                    </div>
                    <div className="freelancer-info">
                      <img src="/assets/home/aman.png" alt="Aman Raj" />
                      <span>Aman Raj</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress" style={{width: '65%'}}></div>
                    </div>
                    <p>Progress: 65% complete</p>
                    <div className="project-actions">
                      <button className="btn btn-outline">View Details</button>
                      <button className="btn btn-primary">Message</button>
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

export default EmployerDashboard;