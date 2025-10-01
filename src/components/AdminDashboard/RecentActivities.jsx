import React from 'react';

const RecentActivities = () => (
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
);

export default RecentActivities;
