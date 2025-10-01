import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignupForm from './SignupForm';
import BrandSide from './BrandSide';

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setError('');
    if (!formData.name.trim()) {
      setError('Full name is required');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!formData.role) {
      setError('Please select your role');
      return;
    }
    setCurrentStep(2);
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!formData.password) {
      setError('Password is required');
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    const { confirmPassword, ...submitData } = formData;
    const result = await signup(submitData);
    if (result.success) {
      navigate('/login', { state: { message: 'Account created successfully! Please sign in.' } });
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="milestone-auth">
      <div className="auth-split-container">
        <div className="auth-form-side">
          <SignupForm
            currentStep={currentStep}
            formData={formData}
            error={error}
            loading={loading}
            handleChange={handleChange}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="auth-brand-side">
          <BrandSide />
        </div>
      </div>
    </div>
  );
};

export default Signup;
