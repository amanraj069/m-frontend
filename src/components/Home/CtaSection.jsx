import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection = () => (
  <section className="cta">
    <div className="container">
      <div className="cta-content">
        <h2>Ready to Start Your Freelancing Journey?</h2>
        <p>Join thousands of freelancers and businesses on Milestone today</p>
        <div className="cta-buttons">
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
          <Link to="/jobs" className="btn btn-outline">Browse Jobs</Link>
        </div>
      </div>
    </div>
  </section>
);

export default CtaSection;
