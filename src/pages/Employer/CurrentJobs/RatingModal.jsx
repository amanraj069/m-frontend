import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RatingModal.css';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:9000';

const RatingModal = ({ freelancer, onClose, onSuccess }) => {
  const [closing, setClosing] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const startClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose && onClose();
    }, 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/employer/rate-freelancer/${freelancer.jobId}`,
        { rating, review },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert('Rating submitted successfully!');
        onSuccess && onSuccess();
        startClose();
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`app-modal-backdrop ${closing ? 'closing' : ''}`} onClick={startClose}>
      <div
        className={`app-modal-panel ${closing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '500px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 rounded-t-lg bg-gradient-to-r from-yellow-50 to-orange-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Rate Freelancer</h2>
            <p className="text-sm text-gray-600 mt-1">Share your experience with {freelancer?.name}</p>
          </div>
          <button onClick={startClose} className="app-modal-close-btn" aria-label="Close">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Freelancer Info */}
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
            <img
              src={freelancer?.picture || '/default-avatar.png'}
              alt={freelancer?.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <h4 className="font-semibold text-gray-800 text-lg">{freelancer?.name}</h4>
              <p className="text-sm text-gray-600">{freelancer?.jobTitle}</p>
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Your Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center gap-2 py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <i
                    className={`fas fa-star text-5xl transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  ></i>
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              {rating === 0 && 'Click to rate'}
              {rating === 1 && '⭐ Poor'}
              {rating === 2 && '⭐⭐ Fair'}
              {rating === 3 && '⭐⭐⭐ Good'}
              {rating === 4 && '⭐⭐⭐⭐ Very Good'}
              {rating === 5 && '⭐⭐⭐⭐⭐ Excellent'}
            </p>
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Review (Optional)
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="4"
              placeholder="Share your experience working with this freelancer..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              maxLength="500"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1 text-right">{review.length}/500 characters</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={startClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || rating === 0}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="fas fa-check mr-2"></i>
                  Submit Rating
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;
