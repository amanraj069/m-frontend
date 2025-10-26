import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/DashboardLayout';

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    budget: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    remote: false,
    applicationDeadline: '',
    descriptionText: '',
    responsibilities: '',
    requirements: '',
    skills: '',
    imageUrl: ''
  });

  const [milestones, setMilestones] = useState([
    {
      description: '',
      deadline: '',
      payment: '',
      subTasks: [{ description: '' }]
    }
  ]);

  useEffect(() => {
    loadJobData();
  }, [jobId]);

  const loadJobData = async () => {
    try {
      setInitialLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/employer/job-listings/${jobId}`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const job = data.data;
        
        // Format date to YYYY-MM-DD for input
        const formatDate = (dateString) => {
          if (!dateString) return '';
          const date = new Date(dateString);
          return date.toISOString().split('T')[0];
        };

        setFormData({
          title: job.title || '',
          budget: job.budget || '',
          location: job.location || '',
          jobType: job.jobType || '',
          experienceLevel: job.experienceLevel || '',
          remote: job.remote || false,
          applicationDeadline: formatDate(job.applicationDeadline),
          descriptionText: job.description.text || '',
          responsibilities: (job.description.responsibilities || []).join('\n'),
          requirements: (job.description.requirements || []).join('\n'),
          skills: (job.description.skills || []).join(', '),
          imageUrl: job.imageUrl || ''
        });

        if (job.milestones && job.milestones.length > 0) {
          setMilestones(job.milestones.map(m => ({
            description: m.description || '',
            deadline: formatDate(m.deadline),
            payment: m.payment || '',
            subTasks: m.subTasks && m.subTasks.length > 0 
              ? m.subTasks.map(st => ({ description: st.description || '' }))
              : [{ description: '' }]
          })));
        }
      } else {
        setError('Failed to load job data');
      }
    } catch (err) {
      console.error('Error loading job:', err);
      setError('Network error. Please try again.');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      {
        description: '',
        deadline: '',
        payment: '',
        subTasks: [{ description: '' }]
      }
    ]);
  };

  const removeMilestone = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const updateMilestone = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const addSubTask = (milestoneIndex) => {
    const updated = [...milestones];
    updated[milestoneIndex].subTasks.push({ description: '' });
    setMilestones(updated);
  };

  const removeSubTask = (milestoneIndex, subTaskIndex) => {
    const updated = [...milestones];
    updated[milestoneIndex].subTasks = updated[milestoneIndex].subTasks.filter((_, i) => i !== subTaskIndex);
    setMilestones(updated);
  };

  const updateSubTask = (milestoneIndex, subTaskIndex, value) => {
    const updated = [...milestones];
    updated[milestoneIndex].subTasks[subTaskIndex].description = value;
    setMilestones(updated);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Job title is required');
      return;
    }
    if (!formData.budget || parseFloat(formData.budget) <= 0) {
      setError('Please enter a valid budget amount');
      return;
    }
    if (!formData.jobType) {
      setError('Please select a job type');
      return;
    }
    if (!formData.experienceLevel) {
      setError('Please select an experience level');
      return;
    }
    if (!formData.applicationDeadline) {
      setError('Application deadline is required');
      return;
    }
    if (!formData.descriptionText.trim()) {
      setError('Job description is required');
      return;
    }
    if (!formData.skills.trim()) {
      setError('Please enter at least one required skill');
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

    const filledMilestones = milestones.filter(m => m.description && m.deadline && m.payment);
    if (filledMilestones.length > 0) {
      const totalMilestonePayment = filledMilestones.reduce((sum, m) => sum + parseFloat(m.payment || 0), 0);
      const totalBudget = parseFloat(formData.budget);
      
      if (Math.abs(totalMilestonePayment - totalBudget) > 0.01) {
        setError(`Milestone payments (₹${totalMilestonePayment.toLocaleString('en-IN')}) must equal the total budget (₹${totalBudget.toLocaleString('en-IN')})`);
        setLoading(false);
        return;
      }
    }

    try {
      const jobData = {
        title: formData.title,
        budget: parseFloat(formData.budget),
        location: formData.location,
        jobType: formData.jobType,
        experienceLevel: formData.experienceLevel,
        remote: formData.remote,
        applicationDeadline: formData.applicationDeadline,
        description: {
          text: formData.descriptionText,
          responsibilities: formData.responsibilities.split('\n').filter(r => r.trim()),
          requirements: formData.requirements.split('\n').filter(r => r.trim()),
          skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
        },
        imageUrl: formData.imageUrl || '/assets/company_logo.jpg',
        milestones: filledMilestones.map(m => ({
          description: m.description,
          deadline: m.deadline,
          payment: m.payment,
          status: 'not-paid',
          requested: false,
          subTasks: m.subTasks
            .filter(st => st.description.trim())
            .map(st => ({
              description: st.description,
              status: 'pending',
              completedDate: null,
              notes: ''
            })),
          completionPercentage: 0
        }))
      };

      const response = await fetch(`${apiBaseUrl}/api/employer/job-listings/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(jobData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigate('/employer/job-listings');
      } else {
        setError(data.error || 'Failed to update job listing');
      }
    } catch (err) {
      console.error('Error updating job:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="flex flex-col items-center justify-center py-20">
            <i className="fas fa-spinner fa-spin text-5xl text-blue-600 mb-4"></i>
            <p className="text-gray-600 text-lg">Loading job data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with Step Indicator */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between gap-8">
              {/* Title Section */}
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Job Listing</h1>
                <p className="text-gray-600">Update the job details and milestones</p>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center gap-4">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    currentStep >= 1 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > 1 ? <i className="fas fa-check"></i> : '1'}
                  </div>
                  <span className={`text-xs font-medium mt-1 whitespace-nowrap ${
                    currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    Job Details
                  </span>
                </div>

                {/* Connector Line */}
                <div className={`h-1 w-16 rounded transition-all ${
                  currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'
                }`}></div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    currentStep >= 2 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    2
                  </div>
                  <span className={`text-xs font-medium mt-1 whitespace-nowrap ${
                    currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    Milestones
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Container - Reusing the same form structure as AddJob but with update logic */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Show error at top only for Step 1 */}
            {currentStep === 1 && error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                <i className="fas fa-exclamation-circle text-xl"></i>
                <span>{error}</span>
              </div>
            )}

            {/* Render the same form content as AddJob component */}
            {/* For brevity, I'll include the same form JSX structure */}
            {currentStep === 1 && (
              <form onSubmit={handleNextStep} className="space-y-6">
                {/* Same form fields as AddJob Step 1 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Senior React Developer"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="e.g., 50000"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Mumbai, India"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all"
                    />
                  </div>
                  <div className="flex items-center pt-8">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="remote"
                        checked={formData.remote}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700 font-medium">Remote Work Available</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all"
                    >
                      <option value="">Select job type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Experience Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all"
                    >
                      <option value="">Select experience level</option>
                      <option value="Entry">Entry Level</option>
                      <option value="Mid">Mid Level</option>
                      <option value="Senior">Senior Level</option>
                      <option value="Expert">Expert Level</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Application Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="descriptionText"
                    value={formData.descriptionText}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Provide a detailed description of the job..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Key Responsibilities
                  </label>
                  <textarea
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter each responsibility on a new line..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all resize-none"
                  ></textarea>
                  <p className="text-sm text-gray-500 mt-1">One responsibility per line</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Requirements
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter each requirement on a new line..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all resize-none"
                  ></textarea>
                  <p className="text-sm text-gray-500 mt-1">One requirement per line</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Required Skills <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                    placeholder="e.g., React, Node.js, MongoDB, TypeScript"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Logo URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/employer/job-listings')}
                    className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all font-semibold"
                  >
                    Next: Update Milestones
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </form>
            )}

            {currentStep === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Same Step 2 content as AddJob */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Project Milestones</h2>
                  <p className="text-gray-600">Update project milestones (Optional)</p>
                </div>

                {/* Show error at top only for non-milestone errors */}
                {error && !error.includes('Milestone payments') && (
                  <div className="bg-red-50 border-2 border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                    <i className="fas fa-exclamation-circle text-xl"></i>
                    <span>{error}</span>
                  </div>
                )}

                {/* Budget Tracker - Same as AddJob */}
                {(() => {
                  const filledMilestones = milestones.filter(m => m.payment);
                  const totalMilestonePayment = filledMilestones.reduce((sum, m) => sum + parseFloat(m.payment || 0), 0);
                  const totalBudget = parseFloat(formData.budget || 0);
                  const remaining = totalBudget - totalMilestonePayment;
                  const isValid = Math.abs(remaining) < 0.01;
                  
                  if (filledMilestones.length > 0) {
                    return (
                      <div className={`p-4 rounded-xl border-2 ${
                        isValid ? 'bg-green-50 border-green-500' : 'bg-yellow-50 border-yellow-500'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-700">Total Budget:</span>
                          <span className="font-bold text-lg">₹{totalBudget.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-700">Milestone Payments:</span>
                          <span className="font-bold text-lg">₹{totalMilestonePayment.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="border-t-2 border-gray-300 pt-2 mt-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-700">Remaining:</span>
                            <span className={`font-bold text-xl ${
                              isValid ? 'text-green-600' : remaining < 0 ? 'text-red-600' : 'text-yellow-600'
                            }`}>
                              ₹{Math.abs(remaining).toLocaleString('en-IN')}
                              {isValid && <i className="fas fa-check-circle ml-2"></i>}
                              {!isValid && remaining < 0 && <i className="fas fa-exclamation-triangle ml-2"></i>}
                            </span>
                          </div>
                        </div>
                        {!isValid && (
                          <p className="text-sm text-gray-600 mt-2 text-center">
                            {remaining > 0 
                              ? '⚠️ Milestone payments should equal the total budget' 
                              : '❌ Milestone payments exceed the total budget'}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                })()}

                <div className="space-y-6">
                  {milestones.map((milestone, mIndex) => (
                    <div key={mIndex} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                          <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                            {mIndex + 1}
                          </span>
                          Milestone {mIndex + 1}
                        </h4>
                        {milestones.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMilestone(mIndex)}
                            className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                          >
                            <i className="fas fa-trash"></i>
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Milestone Description
                          </label>
                          <input
                            type="text"
                            value={milestone.description}
                            onChange={(e) => updateMilestone(mIndex, 'description', e.target.value)}
                            placeholder="e.g., Complete UI Design Phase"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Deadline
                            </label>
                            <input
                              type="date"
                              value={milestone.deadline}
                              onChange={(e) => updateMilestone(mIndex, 'deadline', e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Payment Amount (₹)
                            </label>
                            <input
                              type="number"
                              value={milestone.payment}
                              onChange={(e) => updateMilestone(mIndex, 'payment', e.target.value)}
                              min="0"
                              placeholder="e.g., 15000"
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all bg-white"
                            />
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border-2 border-gray-200 shadow-sm">
                          <div className="flex justify-between items-center mb-3">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                              <i className="fas fa-tasks text-blue-600"></i>
                              Sub-tasks
                            </label>
                            <button
                              type="button"
                              onClick={() => addSubTask(mIndex)}
                              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                            >
                              <i className="fas fa-plus"></i>
                              Add Sub-task
                            </button>
                          </div>

                          <div className="space-y-2">
                            {milestone.subTasks.map((subTask, stIndex) => (
                              <div key={stIndex} className="flex gap-2 items-center">
                                <span className="text-gray-400 text-sm font-medium w-6">{stIndex + 1}.</span>
                                <input
                                  type="text"
                                  value={subTask.description}
                                  onChange={(e) => updateSubTask(mIndex, stIndex, e.target.value)}
                                  placeholder={`Sub-task ${stIndex + 1}`}
                                  className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all text-sm"
                                />
                                {milestone.subTasks.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeSubTask(mIndex, stIndex)}
                                    className="text-red-500 hover:text-red-700 px-2"
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={addMilestone}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                  >
                    <i className="fas fa-plus"></i>
                    Add Another Milestone
                  </button>
                </div>

                {/* Milestone Payment Validation Error - Just above buttons */}
                {error && error.includes('Milestone payments') && (
                  <div className="bg-red-50 border-2 border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2 animate-pulse">
                    <i className="fas fa-exclamation-circle text-xl"></i>
                    <span className="font-semibold">{error}</span>
                  </div>
                )}

                <div className="flex gap-4 pt-6 border-t-2 border-gray-200">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-arrow-left"></i>
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Updating Job...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check"></i>
                        Update Job Listing
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditJob;

