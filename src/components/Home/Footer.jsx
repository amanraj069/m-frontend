import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-900 text-white py-16" id="footer">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <h3 className="text-2xl font-bold mb-4">Milestone</h3>
          <p className="text-gray-400 mb-6 leading-relaxed">The world's largest freelancing platform connecting businesses with skilled professionals.</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white transition-all hover:bg-navy-700 hover:-translate-y-0.5">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white transition-all hover:bg-navy-700 hover:-translate-y-0.5">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white transition-all hover:bg-navy-700 hover:-translate-y-0.5">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white transition-all hover:bg-navy-700 hover:-translate-y-0.5">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">For Clients</h4>
          <ul className="list-none space-y-2">
            <li><Link to="/how-it-works" className="text-gray-400 no-underline transition-colors hover:text-navy-400">How it Works</Link></li>
            <li><Link to="/talent" className="text-gray-400 no-underline transition-colors hover:text-navy-400">Browse Talent</Link></li>
            <li><Link to="/post-job" className="text-gray-400 no-underline transition-colors hover:text-navy-400">Post a Job</Link></li>
            <li><Link to="/enterprise" className="text-gray-400 no-underline transition-colors hover:text-navy-400">Enterprise</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">For Freelancers</h4>
          <ul className="list-none space-y-2">
            <li><Link to="/jobs" className="text-gray-400 no-underline transition-colors hover:text-navy-400">Find Jobs</Link></li>
            <li><Link to="/resources" className="text-gray-400 no-underline transition-colors hover:text-navy-400">Resources</Link></li>
            <li><Link to="/community" className="text-gray-400 no-underline transition-colors hover:text-navy-400">Community</Link></li>
            <li><Link to="/success-stories" className="text-gray-400 no-underline transition-colors hover:text-navy-400">Success Stories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Company</h4>
          <ul className="list-none space-y-2">
            <li><Link to="/about" className="text-gray-400 no-underline transition-colors hover:text-navy-400">About Us</Link></li>
            <li><Link to="/careers" className="text-gray-400 no-underline transition-colors hover:text-navy-400">Careers</Link></li>
            <li><Link to="/press" className="text-gray-400 no-underline transition-colors hover:text-navy-400">Press</Link></li>
            <li><Link to="/contact" className="text-gray-400 no-underline transition-colors hover:text-navy-400">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-gray-400">
        <p>© 2023 Milestone. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link to="/privacy" className="text-gray-400 no-underline transition-colors hover:text-navy-400">Privacy Policy</Link>
          <Link to="/terms" className="text-gray-400 no-underline transition-colors hover:text-navy-400">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
