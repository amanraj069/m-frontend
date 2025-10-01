import React from 'react';

const StatsSection = () => (
  <section className="stats">
    <div className="container">
      <div className="section-header">
        <h2>Our <span style={{ color: '#2563eb' }}>achievement</span> at a glance</h2>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <i className="fas fa-users"></i>
          <h3>10K+</h3>
          <p>Active Freelancers</p>
        </div>
        <div className="stat-card">
          <i className="fas fa-briefcase"></i>
          <h3>5K+</h3>
          <p>Projects Completed</p>
        </div>
        <div className="stat-card">
          <i className="fas fa-globe"></i>
          <h3>30+</h3>
          <p>Countries Served</p>
        </div>
        <div className="stat-card">
          <i className="fas fa-star"></i>
          <h3>4.9/5</h3>
          <p>Client Satisfaction</p>
        </div>
      </div>
    </div>
  </section>
);

export default StatsSection;
