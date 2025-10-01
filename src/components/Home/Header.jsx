import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, getDashboardRoute, theme, toggleTheme }) => (
  <header className="header">
    <div className="container">
      <div className="header-content">
        <div className="logo">
          <Link to="/" style={{ fontSize: '40px' }}>
            Mile<span>stone</span>
          </Link>
        </div>
        <div className="search-container">
          <form className="search-form">
            <input type="text" placeholder="Search for services..." />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
          {user ? (
            <Link to={getDashboardRoute()} className="btn btn-primary">
              <i className="fas fa-tachometer-alt"></i>
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary">
              <i className="fas fa-sign-in-alt"></i>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  </header>
);

export default Header;
