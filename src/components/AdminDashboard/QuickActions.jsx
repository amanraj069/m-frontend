import React from 'react';

const QuickActions = () => (
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
);

export default QuickActions;
