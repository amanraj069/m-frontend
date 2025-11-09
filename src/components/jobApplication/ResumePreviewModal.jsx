import React from 'react';

const ResumePreviewModal = ({ resumeUrl, onClose }) => {
  // For Cloudinary PDFs, we need to use Google Docs Viewer or direct link
  const getPreviewUrl = (url) => {
    if (url && url.includes('cloudinary.com')) {
      // Use Google Docs Viewer for better PDF preview
      return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
    }
    return url;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <p className='text-2xl font-serif'>Resume Preview</p> 
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body modal-body-resume">
          <iframe
            src={getPreviewUrl(resumeUrl)}
            title="Resume Preview"
            className="resume-preview-iframe"
          />
        </div>
        <div className="modal-footer">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <i className="fas fa-external-link-alt"></i> Open in New Tab
          </a>
          <button className="btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewModal;
