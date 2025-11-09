import React from 'react';

const JobDescriptionModal = ({ jobData, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Job Description</h3>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body-1">
          <div className="job-detail-section">
            <h4>{jobData?.title}</h4>
            <div className="job-meta-grid">
              <div className="meta-item">
                <i className="fas fa-briefcase"></i>
                <span>{jobData?.jobType}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{jobData?.location || 'Remote'}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-dollar-sign"></i>
                <span>Rs. {jobData?.budget?.amount || jobData?.budget}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-signal"></i>
                <span>{jobData?.experienceLevel}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-laptop-house"></i>
                <span>{jobData?.remote ? 'Remote' : 'On-site'}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-calendar-alt"></i>
                <span>Deadline: {new Date(jobData?.applicationDeadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="job-detail-section">
            <h5>Description</h5>
            <p>{jobData?.description?.text}</p>
          </div>

          {jobData?.description?.responsibilities?.length > 0 && (
            <div className="job-detail-section">
              <h5>Responsibilities</h5>
              <ul className="job-list">
                {jobData.description.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {jobData?.description?.requirements?.length > 0 && (
            <div className="job-detail-section">
              <h5>Requirements</h5>
              <ul className="job-list">
                {jobData.description.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {jobData?.description?.skills?.length > 0 && (
            <div className="job-detail-section">
              <h5>Required Skills</h5>
              <div className="skills-tags">
                {jobData.description.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {jobData?.milestones?.length > 0 && (
            <div className="job-detail-section">
              <h5>Milestones</h5>
              <div className="milestones-list">
                {jobData.milestones.map((milestone, index) => (
                  <div key={index} className="milestone-item">
                    <div className="milestone-number">{index + 1}</div>
                    <div className="milestone-content">
                      <p className="milestone-desc">{milestone.description}</p>
                      <div className="milestone-meta">
                        <span><i className="fas fa-calendar"></i> {milestone.deadline}</span>
                        <span><i className="fas fa-dollar-sign"></i> Rs. {milestone.payment}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionModal;
