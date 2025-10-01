import React from 'react';

const FeaturesSection = () => (
  <section className="features" id="features">
    <div className="container">
      <div className="section-header">
        <h2>Everything You Need to <span style={{ color: '#2563eb' }}>Succeed</span></h2>
        <p>Milestone provides all the tools you need to find, hire, and work with top freelancers from around the world.</p>
      </div>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-brain"></i>
          </div>
          <h3>Smart Matching</h3>
          <p>Our AI-powered system connects you with the perfect freelancers for your specific project needs.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h3>Secure Payments</h3>
          <p>Milestone payments ensure you only pay for completed work that meets your standards.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-clock"></i>
          </div>
          <h3>Time Tracking</h3>
          <p>Built-in time tracking tools for hourly projects with screenshot verification.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-certificate"></i>
          </div>
          <h3>Verified Talent</h3>
          <p>All freelancers undergo a thorough vetting process to ensure top quality.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-users-cog"></i>
          </div>
          <h3>Team Collaboration</h3>
          <p>Easily manage multiple freelancers with our collaboration tools.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-rocket"></i>
          </div>
          <h3>Fast Delivery</h3>
          <p>Get your projects completed quickly with our efficient workflow system.</p>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
