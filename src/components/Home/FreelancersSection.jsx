import React from 'react';

const FreelancersSection = ({ freelancers, currentFreelancerIndex, prevFreelancer, nextFreelancer }) => {
  const freelancer = freelancers[currentFreelancerIndex];
  return (
    <section className="freelancers" id="freelancers">
      <div className="container">
        <div className="section-header">
          <h2>Meet Our Top Freelancers</h2>
          <p>Work with the best talent in the industry</p>
        </div>
        <div className="freelancers-carousel">
          <div className="freelancer-card">
            {freelancer.featured && <div className="freelancer-badge">Featured</div>}
            {freelancer.topRated && <div className="freelancer-badge top-rated">Top Rated</div>}
            <div className="freelancer-header">
              <img src={freelancer.avatar} alt={freelancer.name} />
              <div>
                <h4>{freelancer.name}</h4>
                <p>{freelancer.title}</p>
              </div>
            </div>
            <div className="freelancer-skills">
              {freelancer.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
            <div className="freelancer-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < Math.floor(freelancer.rating) ? 'filled' : ''}`}></i>
                ))}
              </div>
              <span>{freelancer.rating} ({freelancer.reviews} reviews)</span>
            </div>
            <div className="freelancer-stats">
              <div className="stat">
                <span className="stat-number">{freelancer.completed}</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
            <button className="btn btn-primary">Hire Now</button>
          </div>
        </div>
        <div className="carousel-controls">
          <button onClick={prevFreelancer} className="carousel-control">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button onClick={nextFreelancer} className="carousel-control">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FreelancersSection;
