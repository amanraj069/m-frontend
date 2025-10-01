import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, logout }) => (
  <div className="dashboard-header">
    <div className="container">
      <div className="header-content">
        <div className="logo">
          <Link to="/">Milestone Admin</Link>
        </div>
        <div className="user-menu">
          <div className="user-info">
            <i className="fas fa-user-shield"></i>
            <span>Welcome, {user?.name || 'Admin'}</span>
          </div>
          <button onClick={logout} className="btn btn-outline">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
