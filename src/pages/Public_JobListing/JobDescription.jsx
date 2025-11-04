import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Footer from '../../components/Home/Footer';

const JobDescription = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${apiBaseUrl}/api/jobs/api/${jobId}`, {
        credentials: 'include',
      });
      const data = await response.json();

      if (data.success) {
        setJob(data.job);
      } else {
        setError('Job not found');
      }
    } catch (err) {
      console.error('Error fetching job details:', err);
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyNow = () => {
    if (!user) {
      // Redirect to login if not logged in
      navigate('/login', { state: { from: `/jobs/${jobId}` } });
    } else if (user.role === 'Freelancer') {
      // Redirect to application page for freelancers
      navigate(`/jobs/apply/${jobId}`);
    } else {
      // Show message for non-freelancers
      alert('Only Freelancers can apply to jobs.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/jobs')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header - Without Search Bar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="text-4xl font-bold text-gray-900">
              <Link to="/" className="hover:text-blue-700 transition-colors">
                Mile<span className="text-blue-700">stone</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back
              </button>
              {user ? (
                <Link
                  to={
                    user.role === 'Admin'
                      ? '/admin/profile'
                      : user.role === 'Employer'
                      ? '/employer/profile'
                      : '/freelancer/profile'
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-lg font-medium no-underline transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <i className="fas fa-tachometer-alt"></i>
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-lg font-medium no-underline transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <i className="fas fa-sign-in-alt"></i>
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Job Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100 hover:shadow-2xl transition-shadow">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            {/* Left Section - Job Info */}
            <div className="flex-1 min-w-0">
              {/* Application Deadline */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-4">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                </svg>
                <span className="text-red-600 font-semibold text-sm">
                  Deadline: {formatDate(job.applicationDeadline)}
                </span>
              </div>

              {/* Job Title & Company */}
              <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">
                {job.title}
              </h1>
              <h2 className="text-xl font-semibold text-blue-600 mb-6">
                {job.companyName}
              </h2>

              {/* Job Meta Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-3 p-3 bg-blue-50 border-l-4 border-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="text-gray-800 font-medium">
                    {job.location || 'Not specified'} {job.remote && '(Remote)'}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 border-l-4 border-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z" />
                  </svg>
                  <span className="text-gray-800 font-medium capitalize">
                    {job.jobType.replace('-', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 border-l-4 border-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13h14v-2H5v2zm-2 4h14v-2H3v2zm4-8h14V7H7v2z" />
                  </svg>
                  <span className="text-gray-800 font-medium">
                    {job.experienceLevel} Level
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 border-l-4 border-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11 17h2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3v-1h4V8h-2V7h-2v1h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3v1H9v2h2v1zm9-13H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12z" />
                  </svg>
                  <span className="text-gray-800 font-medium">
                    ₹{job.budget.amount.toLocaleString()} {job.budget.period}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 border-l-4 border-blue-600 rounded-lg hover:bg-blue-100 transition-colors md:col-span-2">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                  </svg>
                  <span className="text-gray-800 font-medium">
                    Posted on {formatDate(job.postedDate)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                {user && user.role === 'Freelancer' ? (
                  job.hasApplied ? (
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 border-2 border-green-500 text-green-700 rounded-xl font-semibold">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Application Submitted
                    </div>
                  ) : (
                    <button
                      onClick={handleApplyNow}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                      Apply Now
                    </button>
                  )
                ) : user && user.role !== 'Freelancer' ? (
                  <div className="px-6 py-3 bg-orange-50 border-2 border-orange-400 text-orange-700 rounded-xl font-semibold">
                    Only Freelancers can apply to jobs
                  </div>
                ) : (
                  <button
                    onClick={handleApplyNow}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                    Apply Now
                  </button>
                )}

                {user && user.role === 'Employer' && user.roleId === job.employerId && (
                  <Link
                    to={`/employer/job-listings/edit/${job.jobId}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors no-underline"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Job
                  </Link>
                )}
              </div>
            </div>

            {/* Right Section - Job Image */}
            <div className="flex-shrink-0 lg:w-72">
              <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img
                  src={job.imageUrl}
                  alt={job.title}
                  className="w-full h-72 object-cover transition-transform group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = '/assets/company_logo.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Description Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100 hover:shadow-2xl transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-blue-600">
            Job Description
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg mb-6 whitespace-pre-wrap">
              {job.description.text}
            </p>

            {job.description.responsibilities &&
              job.description.responsibilities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Responsibilities:
                  </h3>
                  <ul className="space-y-2 ml-5">
                    {job.description.responsibilities.map((item, index) => (
                      <li
                        key={index}
                        className="text-gray-700 leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-blue-600 mt-1.5">▪</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {job.description.requirements &&
              job.description.requirements.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Requirements:
                  </h3>
                  <ul className="space-y-2 ml-5">
                    {job.description.requirements.map((item, index) => (
                      <li
                        key={index}
                        className="text-gray-700 leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-blue-600 mt-1.5">▪</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {job.description.skills && job.description.skills.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Technical Skills:
                </h3>
                <div className="flex flex-wrap gap-3">
                  {job.description.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-200 hover:shadow-md transition-shadow"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Milestones Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
            Project Milestones
          </h2>
          {job.milestones && job.milestones.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <th className="text-left p-4 text-gray-900 font-bold border-b-2 border-blue-200">
                      Description
                    </th>
                    <th className="text-left p-4 text-gray-900 font-bold border-b-2 border-blue-200">
                      Deadline
                    </th>
                    <th className="text-left p-4 text-gray-900 font-bold border-b-2 border-blue-200">
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {job.milestones.map((milestone, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                    >
                      <td className="p-4 text-gray-700">{milestone.description}</td>
                      <td className="p-4 text-gray-700">{milestone.deadline}</td>
                      <td className="p-4 text-blue-600 font-semibold">
                        {milestone.payment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-gray-500 text-lg">
                No milestones defined for this project.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDescription;
