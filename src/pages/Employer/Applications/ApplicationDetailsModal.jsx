import React from 'react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={application.freelancerPicture || '/default-avatar.png'}
                alt={application.freelancerName}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h2 className="text-2xl font-bold">{application.freelancerName || 'Unknown Applicant'}</h2>
                <p className="text-blue-100 text-sm">Candidate Application Details</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
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
              {application.freelancerEmail && (
                <a 
                  href={`mailto:${application.freelancerEmail}`}
                  className="text-blue-600 hover:text-blue-700 text-sm mt-1 inline-block"
                >
                  <i className="fas fa-paper-plane mr-1"></i>
                  Send Email
                </a>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <label className="text-sm font-semibold text-gray-600 mb-2 block">
                <i className="fas fa-phone mr-2 text-blue-600"></i>
                Phone Number
              </label>
              <p className="text-gray-800 font-medium">
                {application.freelancerPhone || 'Not provided'}
              </p>
              {application.freelancerPhone && (
                <a 
                  href={`tel:${application.freelancerPhone}`}
                  className="text-blue-600 hover:text-blue-700 text-sm mt-1 inline-block"
                >
                  <i className="fas fa-phone-alt mr-1"></i>
                  Call Now
                </a>
              )}
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
