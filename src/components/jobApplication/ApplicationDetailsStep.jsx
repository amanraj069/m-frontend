import React, { useState, useEffect } from 'react';
import JobDescriptionModal from './JobDescriptionModal';

const ApplicationDetailsStep = ({ jobData, applicationData, setApplicationData, onBack, onSubmit }) => {
  const [showJobModal, setShowJobModal] = useState(false);
  const [lastCoverMessage, setLastCoverMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch last used cover message
    const fetchLastCoverMessage = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/freelancer/cover-message/last', {
          credentials: 'include',
        });
        const result = await response.json();
        if (result.success && result.data.lastCoverMessage) {
          setLastCoverMessage(result.data.lastCoverMessage);
        }
      } catch (err) {
        console.error('Error fetching last cover message:', err);
      }
    };

    fetchLastCoverMessage();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: value,
    });
    setError('');
  };

  const handleUseLastCoverMessage = () => {
    if (lastCoverMessage) {
      setApplicationData({
        ...applicationData,
        coverMessage: lastCoverMessage,
      });
    }
  };

  const validateAndSubmit = async () => {
    // Validate cover message
    if (!applicationData.coverMessage || applicationData.coverMessage.length < 50) {
      setError('Cover message must be at least 50 characters long');
      return;
    }

    if (!applicationData.skillRating) {
      setError('Please rate your expertise level');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await onSubmit(applicationData);
    } catch (err) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  // Get first skill from job requirements
  const firstSkill = jobData?.description?.skills?.[0] || 'this skill';

  return (
    <div className="application-details-step">
      <h2 className="step-title">Application Details</h2>

      {/* Error Message */}
      {error && (
        <div className="error-alert">
          <i className="fas fa-exclamation-circle"></i>
          <span>{error}</span>
        </div>
      )}

      {/* Job Summary Card */}
      <div className="job-summary-card">
        <div className="job-summary-header">
          <div className="job-logo">
            {jobData?.imageUrl ? (
              <img src={jobData.imageUrl} alt="Company" />
            ) : (
              <i className="fas fa-briefcase"></i>
            )}
          </div>
          <div className="job-summary-info">
            <h3>{jobData?.title}</h3>
            <p className="job-meta p-2">
              <span><i className="fas fa-map-marker-alt"></i> {jobData?.location || 'Remote'}</span>
              <span><i className="fas fa-dollar-sign"></i> Rs. {jobData?.budget?.amount || jobData?.budget}</span>
            </p>
            <p className="job-meta p-2">
              {/* <span><i className="fas fa-signal"></i> {jobData?.experienceLevel}</span> */}
              <span><i className="fas fa-calendar-alt"></i> Deadline : {jobData?.applicationDeadline ? new Date(jobData.applicationDeadline).toLocaleDateString() : 'N/A'}</span>
              <span><i className="fas fa-clock"></i> {jobData?.jobType}</span>
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn-link"
          onClick={() => setShowJobModal(true)}
        >
          <i className="fas fa-external-link-alt"></i> See full job description
        </button>
      </div>

      {/* Skill Rating */}
      <div className="form-group">
        <label htmlFor="skillRating" className="form-label">
          Rate your expertise in {firstSkill} <span className="required">*</span>
        </label>
        <select
          id="skillRating"
          name="skillRating"
          value={applicationData.skillRating}
          onChange={handleInputChange}
          className="form-select"
          required
        >
          <option value="">Select your expertise level (1-5)</option>
          <option value="1">1 - Beginner</option>
          <option value="2">2 - Elementary</option>
          <option value="3">3 - Intermediate</option>
          <option value="4">4 - Advanced</option>
          <option value="5">5 - Expert</option>
        </select>
      </div>

      {/* Availability */}
      <div className="form-group">
        <label className="form-label">
          Confirm your availability <span className="required">*</span>
        </label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="availability"
              value="immediate"
              checked={applicationData.availability === 'immediate'}
              onChange={handleInputChange}
            />
            <span className='pl-3'>Yes, I am available to join immediately</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="availability"
              value="notice"
              checked={applicationData.availability === 'notice'}
              onChange={handleInputChange}
            />
            <span className='pl-3'>No, I am currently on notice period</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="availability"
              value="serve-notice"
              checked={applicationData.availability === 'serve-notice'}
              onChange={handleInputChange}
            />
            <span className='pl-3'>No, I will have to serve notice period</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="availability"
              value="other"
              checked={applicationData.availability === 'other'}
              onChange={handleInputChange}
            />
            <span className='pl-3'>Other (please specify in cover message)</span>
          </label>
        </div>
      </div>

      {/* Cover Message */}
      <div className="form-group">
        <div className="form-label-with-action">
          <label htmlFor="coverMessage" className="form-label">
            Cover Message <span className="required">*</span>
          </label>
          {lastCoverMessage && (
            <button
              type="button"
              className="btn-link-small"
              onClick={handleUseLastCoverMessage}
            >
              <i className="fas fa-history"></i> Use last cover message
            </button>
          )}
        </div>
        <textarea
          id="coverMessage"
          name="coverMessage"
          value={applicationData.coverMessage}
          onChange={handleInputChange}
          rows="6"
          className="form-textarea"
          placeholder="Tell the employer why you're the perfect fit for this job... (minimum 50 characters)"
          required
        ></textarea>
        <div className="character-count">
          {applicationData.coverMessage.length}/50 minimum characters
        </div>
      </div>

      {/* Action Buttons */}
      <div className="step-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={onBack}
          disabled={loading}
        >
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <button
          type="button"
          className="btn-primary btn-large"
          onClick={validateAndSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-small"></span> Submitting...
            </>
          ) : (
            <>
              Submit Application <i className="fas fa-paper-plane"></i>
            </>
          )}
        </button>
      </div>

      {/* Job Description Modal */}
      {showJobModal && (
        <JobDescriptionModal
          jobData={jobData}
          onClose={() => setShowJobModal(false)}
        />
      )}
    </div>
  );
};

export default ApplicationDetailsStep;
