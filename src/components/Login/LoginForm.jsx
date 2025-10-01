import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ formData, error, loading, handleChange, handleSubmit }) => (
  <div className="auth-form-content">
    {error && (
      <div className="error-message">
        <i className="fas fa-exclamation-circle"></i>
        {error}
      </div>
    )}
    <form onSubmit={handleSubmit} className="milestone-form">
      <div className="form-field">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="form-field">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="form-field">
        <label>Login as</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select role</option>
          <option value="Freelancer">Freelancer</option>
          <option value="Employer">Employer</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div className="forgot-password-link">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <button type="submit" className="milestone-btn milestone-btn-primary" disabled={loading}>
        {loading ? 'Logging In...' : 'Log In'}
      </button>
    </form>
    <div className="auth-switch">
      <span>Don't have an account? </span>
      <Link to="/signup">Sign up</Link>
    </div>
  </div>
);

export default LoginForm;
