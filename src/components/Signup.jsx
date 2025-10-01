import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    setError(''); // Clear error when user types
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setError('');

    // Validate step 1 fields
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

    // Validate password fields
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
      navigate('/login', { 
        state: { message: 'Account created successfully! Please sign in.' }
      });
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-maroon-50 to-maroon-100 p-5">
      <div className="flex max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl min-h-[600px] border border-gray-100">
        {/* Left Side - Form */}
        <div className="flex-1 p-12 flex items-center justify-center bg-white">
          <div className="w-full max-w-sm">
            {/* Step Indicator */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1 bg-gradient-to-r from-maroon-50 to-maroon-100 px-4 py-2 rounded-full text-sm font-medium text-gray-600 border border-gray-200">
                <span className="text-maroon-700 font-bold">{currentStep}</span>
                <span className="text-gray-500">of 2</span>
              </div>
            </div>

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Milestone</h2>
                  <p className="text-base text-gray-600">Let's start with the basics</p>
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-5 flex items-center gap-2 text-sm font-medium">
                    <i className="fas fa-exclamation-circle"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleNextStep} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      autoFocus
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg text-base bg-gray-50 transition-all outline-none text-gray-900 focus:border-maroon-700 focus:bg-white focus:ring-4 focus:ring-maroon-100 placeholder:text-gray-400"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      autoComplete="email"
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg text-base bg-gray-50 transition-all outline-none text-gray-900 focus:border-maroon-700 focus:bg-white focus:ring-4 focus:ring-maroon-100 placeholder:text-gray-400"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Register as</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg text-base bg-gray-50 transition-all outline-none text-gray-900 focus:border-maroon-700 focus:bg-white focus:ring-4 focus:ring-maroon-100"
                    >
                      <option value="">Select role</option>
                      <option value="Freelancer">Freelancer</option>
                      <option value="Employer">Employer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <button type="submit" className="px-6 py-3.5 rounded-lg font-semibold cursor-pointer transition-all text-base inline-flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-800 text-white w-full hover:from-maroon-900 hover:via-maroon-800 hover:to-maroon-700 hover:shadow-lg hover:-translate-y-0.5">
                    <span>Continue</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </form>

                <div className="text-center mt-8 text-base text-gray-600">
                  <span>Already have an account? </span>
                  <Link to="/login" className="text-blue-500 no-underline font-semibold hover:underline">Sign in</Link>
                </div>
              </>
            )}

            {/* Step 2: Password Setup */}
            {currentStep === 2 && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Secure Your Account</h2>
                  <p className="text-base text-gray-600">Create a strong password to protect your account</p>
                </div>

                <div className="bg-gradient-to-r from-maroon-50 to-maroon-100 border border-gray-200 rounded-xl p-4 mb-6 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-maroon-950 to-maroon-800 rounded-full flex items-center justify-center text-white text-lg">
                      <i className="fas fa-user"></i>
                    </div>
                    <div>
                      <div className="text-base font-semibold text-gray-900 mb-0.5">{formData.name}</div>
                      <div className="text-sm text-gray-600 mb-0.5">{formData.email}</div>
                      <div className="text-xs text-maroon-700 font-medium bg-maroon-50 px-2 py-0.5 rounded-xl inline-block">{formData.role}</div>
                    </div>
                  </div>
                  <button onClick={handlePrevStep} className="bg-transparent border-none text-gray-500 cursor-pointer p-2 rounded-md transition-all hover:bg-maroon-50 hover:text-maroon-700">
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-5 flex items-center gap-2 text-sm font-medium">
                    <i className="fas fa-exclamation-circle"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      autoFocus
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg text-base bg-gray-50 transition-all outline-none text-gray-900 focus:border-maroon-700 focus:bg-white focus:ring-4 focus:ring-maroon-100 placeholder:text-gray-400"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      At least 6 characters
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg text-base bg-gray-50 transition-all outline-none text-gray-900 focus:border-maroon-700 focus:bg-white focus:ring-4 focus:ring-maroon-100 placeholder:text-gray-400"
                    />
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button type="button" onClick={handlePrevStep} className="px-6 py-3.5 rounded-lg font-semibold cursor-pointer transition-all text-base inline-flex items-center justify-center gap-2 bg-transparent border-2 border-maroon-700 text-maroon-700 hover:bg-maroon-700 hover:text-white hover:-translate-y-0.5 flex-none min-w-[100px]">
                      <i className="fas fa-arrow-left"></i>
                      <span>Back</span>
                    </button>
                    <button type="submit" disabled={loading} className="flex-1 px-6 py-3.5 rounded-lg font-semibold cursor-pointer transition-all text-base inline-flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-800 text-white hover:from-maroon-900 hover:via-maroon-800 hover:to-maroon-700 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none">
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
        </div>

        {/* Right Side - Branding */}
        <div className="flex-1 bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-800 text-white px-12 py-16 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            background: 'radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)'
          }}></div>
          
          <div className="relative z-10 text-center w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-5xl font-bold tracking-tight">Milestone</h1>
            </div>
            <div className="mb-12">
              <h2 className="text-2xl font-semibold leading-snug opacity-95">Start your journey with us. Create opportunities.</h2>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <p className="text-base leading-relaxed mb-6 opacity-90 italic text-left">"Milestone helped me find the perfect freelancers for my project. The platform is intuitive and the quality of talent is exceptional!"</p>
              <div className="flex items-center gap-4">
                <img src="/assets/user_female.png" alt="Client" className="w-12 h-12 rounded-full object-cover border-2 border-white/30" />
                <div className="text-left">
                  <strong className="block text-base font-semibold mb-0.5">Maria K.</strong>
                  <span className="text-sm opacity-80">Founder at TechStart, Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;