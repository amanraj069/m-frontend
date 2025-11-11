import React, { useEffect } from 'react';

const SuccessModal = ({ onClose }) => {
  useEffect(() => {
    // Auto close after 4 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-container modal-success" onClick={(e) => e.stopPropagation()}>
        <div className="success-animation">
          <div className="success-checkmark">
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
        </div>
        <div className="modal-body text-center">
          <h2 className="success-title">Application Submitted!</h2>
          <p className="success-message">
            Your application has been successfully submitted to the employer.
            You will be notified once they review your application.
          </p>
          <p className="success-submessage">
            <i className="fas fa-search"></i> Explore other job opportunities
          </p>
          <p className="redirect-message">Redirecting in a few seconds...</p>
        </div>
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Browse Jobs Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
