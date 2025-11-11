import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PersonalInfoStep from './PersonalInfoStep';
import ApplicationDetailsStep from './ApplicationDetailsStep';
import SuccessModal from './SuccessModal';
import './JobApplication.css';

const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Profile data
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    picture: '',
    resume: '',
  });

  // Job data
  const [jobData, setJobData] = useState(null);

  // Application data
  const [applicationData, setApplicationData] = useState({
    skillRating: '',
    availability: 'immediate',
    coverMessage: '',
  });

  useEffect(() => {
    // Redirect if not a freelancer
    if (user && user.role !== 'Freelancer') {
      navigate('/jobs');
      return;
    }

    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch freelancer profile
      const profileResponse = await fetch('http://localhost:9000/api/freelancer/profile', {
        credentials: 'include',
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch profile');
      }

      const profileResult = await profileResponse.json();
      if (profileResult.success) {
        setProfileData(profileResult.data);
      }

      // Fetch job details
      const jobResponse = await fetch(`http://localhost:9000/api/jobs/api/${jobId}`);
      if (!jobResponse.ok) {
        throw new Error('Failed to fetch job details');
      }

      const jobResult = await jobResponse.json();
      if (jobResult.success) {
        setJobData(jobResult.job);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfileData({ ...profileData, ...updatedProfile });
  };

  const handleApplicationSubmit = async (appData) => {
    try {
      const response = await fetch(`http://localhost:9000/api/freelancer/apply/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          coverMessage: appData.coverMessage,
          skillRating: appData.skillRating,
          availability: appData.availability,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      if (result.success) {
        setShowSuccessModal(true);
        // Redirect after 4 seconds
        setTimeout(() => {
          navigate('/jobs');
        }, 4000);
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      setError(err.message || 'Failed to submit application');
    }
  };

  if (loading) {
    return (
      <div className="job-application-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error && !jobData) {
    return (
      <div className="job-application-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/jobs')} className="btn-primary">
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="job-application-container">
      {/* Header */}
      <div className="job-application-header">
        <h1>Apply for {jobData?.title || 'Job'}</h1>
        <p>Fill in the details to submit your application</p>
      </div>

      {/* Progress Steps */}
      <div className="application-steps">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
          <div className="step-number">{currentStep > 1 ? '✓' : '1'}</div>
          <div className="step-label">Personal Info</div>
        </div>
        <div className={`step-connector ${currentStep >= 2 ? 'active' : ''}`}></div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <div className="step-label">Application Details</div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-alert">
          <i className="fas fa-exclamation-circle"></i>
          <span>{error}</span>
        </div>
      )}

      {/* Step Content */}
      <div className="application-content">
        {currentStep === 1 && (
          <PersonalInfoStep
            profileData={profileData}
            onUpdate={handleProfileUpdate}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <ApplicationDetailsStep
            jobData={jobData}
            applicationData={applicationData}
            setApplicationData={setApplicationData}
            onBack={handleBack}
            onSubmit={handleApplicationSubmit}
          />
        )}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          onClose={() => {
            setShowSuccessModal(false);
            navigate('/jobs');
          }}
        />
      )}
    </div>
  );
};

export default JobApplication;
