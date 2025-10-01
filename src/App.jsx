import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import FreelancerDashboard from './components/FreelancerDashboard';
import EmployerDashboard from './components/EmployerDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route 
              path="/freelancer/dashboard" 
              element={
                <ProtectedRoute requiredRole="Freelancer">
                  <FreelancerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employer/dashboard" 
              element={
                <ProtectedRoute requiredRole="Employer">
                  <EmployerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute requiredRole="Admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all other routes and redirect based on user role */}
            <Route 
              path="*" 
              element={<Home />} 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
