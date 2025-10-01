import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from './LoginForm';
import BrandSide from './BrandSide';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(formData);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="milestone-auth">
      <div className="auth-split-container">
        <div className="auth-form-side">
          <LoginForm
            formData={formData}
            error={error}
            loading={loading}
            handleChange={handleChange}
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

export default Login;
