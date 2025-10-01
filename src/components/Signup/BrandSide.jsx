import React from 'react';

const BrandSide = () => (
  <div className="brand-content">
    <div className="brand-logo">
      <h1>Milestone</h1>
    </div>
    <div className="brand-message">
      <h2>Start your journey with us. Create opportunities.</h2>
    </div>
    <div className="testimonial">
      <div className="testimonial-content">
        <p>"Milestone helped me find the perfect freelancers for my project. The platform is intuitive and the quality of talent is exceptional!"</p>
        <div className="testimonial-author">
          <img src="/assets/user_female.png" alt="Client" className="author-avatar" />
          <div className="author-info">
            <strong>Maria K.</strong>
            <span>Founder at TechStart, Mumbai, India</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BrandSide;
