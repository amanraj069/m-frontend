import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer" id="footer">
    <div className="container">
      <div className="footer-top">
        <div className="footer-about">
          <h3>Milestone</h3>
          <p>The world's largest freelancing platform connecting businesses with skilled professionals.</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>For Clients</h4>
            <ul>
              <li><Link to="/how-it-works">How it Works</Link></li>
              <li><Link to="/talent">Browse Talent</Link></li>
              <li><Link to="/post-job">Post a Job</Link></li>
              <li><Link to="/enterprise">Enterprise</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>For Freelancers</h4>
            <ul>
              <li><Link to="/jobs">Find Jobs</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/success-stories">Success Stories</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/press">Press</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 Milestone. All rights reserved.</p>
        <div className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
