import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicationDetailsModal.css';

const ApplicationDetailsModal = ({ application, onClose }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    // Navigate to freelancer's public profile
    navigate(`/freelancer/${application.freelancerId}`);
  };

  const handleViewJob = () => {
    // Navigate to job description page
    navigate(`/jobs/${application.jobId}`);
  };

  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // disable scrolling on body while modal open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const startClose = () => {
    setClosing(true);
    // match CSS animation durations (overlay out 180ms, panel out 180ms)
    setTimeout(() => {
      onClose && onClose();
    }, 200);
  };

  return (
    <div className={`app-modal-backdrop ${closing ? 'closing' : ''}`} onClick={startClose}>
      <div
        className={`app-modal-panel ${closing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 rounded-t-lg">
          <div className="flex items-center gap-4">
            <img
              src={application.freelancerPicture || '/default-avatar.png'}
              alt={application.freelancerName}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 shadow-sm"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{application.freelancerName || 'Unknown Applicant'}</h2>
              <p className="text-sm text-gray-500">Candidate Application Details</p>
            </div>
          </div>
          <button onClick={startClose} className="app-modal-close-btn" aria-label="Close">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Job Role Applied For */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label className="text-sm font-semibold text-gray-600 mb-1 block">
                  <i className="fas fa-briefcase mr-2 text-blue-600"></i>
                  Job Role Applied For
                </label>
                <p className="text-lg font-medium text-gray-800">{application.jobTitle}</p>
              </div>
              <button
                onClick={handleViewJob}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap ml-4"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                View Job
              </button>
            </div>
          </div>

          {/* Cover Message */}
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">
              <i className="fas fa-envelope mr-2 text-blue-600"></i>
              Cover Message
            </label>
            <div className="bg-gray-50 rounded-lg p-4 min-h-[100px]">
              <p className="text-gray-700 whitespace-pre-wrap">
                {application.coverMessage || 'No cover message provided.'}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="text-sm font-semibold text-gray-600 mb-2 block">
                <i className="fas fa-envelope mr-2 text-blue-600"></i>
                Email Address
              </label>
              <p className="text-gray-800 font-medium">
                {application.freelancerEmail || 'Not provided'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <label className="text-sm font-semibold text-gray-600 mb-2 block">
                <i className="fas fa-phone mr-2 text-blue-600"></i>
                Phone Number
              </label>
              <p className="text-gray-800 font-medium">
                {application.freelancerPhone || 'Not provided'}
              </p>
            </div>
          </div>

          {/* Skill Rating */}
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="text-sm font-semibold text-gray-600 mb-3 block">
              <i className="fas fa-star mr-2 text-blue-600"></i>
              Skill Rating
            </label>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`fas fa-star text-2xl ${
                      star <= (application.skillRating || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  ></i>
                ))}
              </div>
              <span className="text-gray-700 font-medium ml-2">
                {application.skillRating || 'N/A'} / 5
              </span>
            </div>
          </div>

          {/* Application Status */}
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">
              <i className="fas fa-info-circle mr-2 text-blue-600"></i>
              Application Status
            </label>
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                application.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                application.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              }`}>
                {application.status}
              </span>
              <span className="text-gray-600 text-sm">
                Applied on {new Date(application.appliedDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleViewProfile}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-md hover:shadow-lg"
            >
              <i className="fas fa-user mr-2"></i>
              View Full Profile
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;
