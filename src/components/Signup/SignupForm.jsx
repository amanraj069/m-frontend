import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupForm = ({
  currentStep,
  formData,
  error,
  loading,
  handleChange,
  handleNextStep,
  handlePrevStep,
  handleSubmit
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
  <div className="auth-form-content">
    <div className="step-indicator">
      <div className="step-counter">
        <span className="current-step">{currentStep}</span>
        <span className="total-steps">of 2</span>
      </div>
    </div>
    {currentStep === 1 && (
      <>
        <div className="form-header">
          <h2>Welcome to Milestone</h2>
          <p>Let's start with the basics</p>
        </div>
        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}
        <form onSubmit={handleNextStep} className="milestone-form">
          <div className="form-field">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              autoFocus
            />
          </div>
          <div className="form-field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              autoComplete="email"
            />
          </div>
          <div className="form-field">
            <label>I want to</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Choose your path</option>
              <option value="Freelancer">Find freelance work</option>
              <option value="Employer">Hire talented freelancers</option>
            </select>
          </div>
          <button type="submit" className="milestone-btn milestone-btn-primary">
            <span>Continue</span>
            <i className="fas fa-arrow-right"></i>
          </button>
        </form>
        <div className="auth-switch">
          <span>Already have an account? </span>
          <Link to="/login">Sign in</Link>
        </div>
      </>
    )}
    {currentStep === 2 && (
      <>
        <div className="form-header">
          <h2>Secure Your Account</h2>
          <p>Create a strong password to protect your account</p>
        </div>
        <div className="user-preview">
          <div className="user-info">
            <div className="user-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div>
              <div className="user-name">{formData.name}</div>
              <div className="user-email">{formData.email}</div>
              <div className="user-role">{formData.role}</div>
            </div>
          </div>
          <button onClick={handlePrevStep} className="edit-btn">
            <i className="fas fa-edit"></i>
          </button>
        </div>
        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="milestone-form">
          <div className="form-field">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                autoComplete="new-password"
                autoFocus
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '5px'
                }}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            <div className="password-hint">
              At least 6 characters
            </div>
          </div>
          <div className="form-field">
            <label>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                autoComplete="new-password"
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '5px'
                }}
              >
                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" onClick={handlePrevStep} className="milestone-btn milestone-btn-outline">
              <i className="fas fa-arrow-left"></i>
              <span>Back</span>
            </button>
            <button type="submit" className="milestone-btn milestone-btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <i className="fas fa-check"></i>
                </>
              )}
            </button>
          </div>
        </form>
      </>
    )}
  </div>
  );
};

export default SignupForm;
