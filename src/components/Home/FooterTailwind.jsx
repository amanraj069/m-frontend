import React from 'react';
import { Link } from 'react-router-dom';

const FooterTailwind = () => (
  <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* About Section */}
        <div>
          <div className="mb-4">
            <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              Mile<span className="text-blue-600">stone</span>
            </Link>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Your go-to platform for hiring top freelancers and finding exciting projects. Connect, collaborate, and create with the best talent worldwide.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                Find Jobs
              </Link>
            </li>
            <li>
              <Link to="/freelancers" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                Hire Freelancers
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* For Freelancers */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">For Freelancers</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/find-work" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                Find Work
              </Link>
            </li>
            <li>
              <Link to="/create-profile" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                Create Profile
              </Link>
            </li>
            <li>
              <Link to="/freelancer-resources" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                Resources
              </Link>
            </li>
            <li>
              <Link to="/community" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                Community
              </Link>
            </li>
          </ul>
        </div>

        {/* For Clients */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">For Clients</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/post-job" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                Post a Job
              </Link>
            </li>
            <li>
              <Link to="/find-freelancers" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                Find Freelancers
              </Link>
            </li>
            <li>
              <Link to="/enterprise" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                Enterprise Solutions
              </Link>
            </li>
            <li>
              <Link to="/success-stories" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                Success Stories
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2023 Milestone. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterTailwind;
