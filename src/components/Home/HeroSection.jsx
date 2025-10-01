import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ user }) => (
  <section className="hero">
    <div className="container">
      <div className="hero-content">
        <h1 className="fade-in">Elevate Your Career With Top Talent</h1>
        <p className="fade-in">
          Connect with skilled freelancers or find exciting projects that match your expertise.
        </p>
        <div className="hero-buttons fade-in">
          <Link to="/jobs" className="btn btn-primary">
            <i className="fas fa-briefcase"></i>
            Find Jobs
          </Link>
          {user && user.role === 'Employer' && (
            <Link to="/employer/job-listings/new" className="btn btn-outline">
              <i className="fas fa-plus"></i>
              Post a Job
            </Link>
          )}
        </div>
      </div>
      <img src="/assets/home/Online resume-cuate.svg" alt="Decorative" className="hero-overlay-image1" />
      <img src="/assets/home/oversight-bro.svg" alt="Decorative" className="hero-overlay-image2" />
      <img src="/assets/home/Mobile Marketing-bro.svg" alt="Decorative" className="hero-overlay-image3" />
      <img src="/assets/home/Freelancer-bro.svg" alt="Decorative" className="hero-overlay-image4" />
    </div>
  </section>
);

export default HeroSection;
