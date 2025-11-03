import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BlogSection from './Home/BlogSection';

const Home = () => {
  const { user, getDashboardRoute } = useAuth();
  const [theme, setTheme] = useState('light');
  const [currentFreelancerIndex, setCurrentFreelancerIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const freelancers = [
    {
      name: 'Aman Raj',
      title: 'Full Stack Developer',
      avatar: '/assets/home/aman.png',
      rating: 4.9,
      reviews: 127,
      completed: 89,
      skills: ['React', 'Node.js', 'MongoDB'],
      featured: true
    },
    {
      name: 'Vanya Awasthi',
      title: 'UI/UX Designer',
      avatar: '/assets/home/vanya.png',
      rating: 4.8,
      reviews: 95,
      completed: 76,
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      topRated: true
    },
    {
      name: 'Deepak Kumar',
      title: 'Data Scientist',
      avatar: '/assets/home/deepak.jpg',
      rating: 4.9,
      reviews: 112,
      completed: 68,
      skills: ['Python', 'Machine Learning', 'Data Analysis']
    },
    {
      name: 'Jayanth Patel',
      title: 'Mobile Developer',
      avatar: '/assets/home/jayanth.png',
      rating: 4.7,
      reviews: 89,
      completed: 54,
      skills: ['React Native', 'Flutter', 'iOS']
    },
    {
      name: 'Abhishek Singh',
      title: 'DevOps Engineer',
      avatar: '/assets/home/abhishek.jpg',
      rating: 4.8,
      reviews: 103,
      completed: 72,
      skills: ['AWS', 'Docker', 'Kubernetes']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'Milestone has been instrumental in helping us find top-tier freelancers. The quality of work and professionalism is outstanding.',
      avatar: '/assets/user_female.png',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager, InnovateCorp',
      content: 'As a freelancer, Milestone has provided me with consistent, high-quality projects. The platform is intuitive and fair.',
      avatar: '/assets/user_image.jpg',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, GrowthLab',
      content: 'The project management tools and communication features make working with remote teams seamless and efficient.',
      avatar: '/assets/user_female.png',
      rating: 5
    }
  ];

  useEffect(() => {
    document.body.className = theme + '-mode';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const nextFreelancer = () => {
    setCurrentFreelancerIndex((prev) => (prev + 1) % freelancers.length);
  };

  const prevFreelancer = () => {
    setCurrentFreelancerIndex((prev) => (prev - 1 + freelancers.length) % freelancers.length);
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between py-4">
            <div className="text-4xl font-bold text-gray-900">
              <Link to="/" className="hover:text-navy-700 transition-colors">
                Mile<span className="text-navy-700">stone</span>
              </Link>
            </div>
            <div className="flex-1 max-w-md mx-8">
              <form className="relative">
                <input 
                  type="text" 
                  placeholder="Search for services..." 
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-full text-sm outline-none transition-all focus:border-navy-700 focus:ring-4 focus:ring-navy-100"
                />
                <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 bg-navy-700 text-white border-none rounded-full w-9 h-9 cursor-pointer transition-all hover:bg-navy-800 flex items-center justify-center">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="bg-transparent border-none text-lg cursor-pointer text-gray-600 transition-colors hover:text-navy-700 p-2"
              >
                <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
              </button>
              
              {user ? (
                <Link 
                  to={getDashboardRoute()} 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white rounded-lg font-medium no-underline transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <i className="fas fa-tachometer-alt"></i>
                  Dashboard
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white rounded-lg font-medium no-underline transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <i className="fas fa-sign-in-alt"></i>
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-800 via-navy-700 to-navy-600 text-white pt-32 pb-20 px-8 min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-6xl font-semibold mb-8 leading-tight tracking-tight fade-in">
            Elevate Your Career With Top Talent
          </h1>
          <p className="text-xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto fade-in">
            Connect with skilled freelancers or find exciting projects that match your expertise.
          </p>
          <div className="flex gap-6 justify-center flex-wrap fade-in">
            <Link 
              to="/jobs" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-navy-700 rounded-lg font-semibold no-underline transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <i className="fas fa-briefcase"></i>
              Find Jobs
            </Link>
            {user && user.role === 'Employer' && (
              <Link 
                to="/employer/job-listings/new" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold no-underline transition-all hover:bg-white hover:text-navy-700"
              >
                <i className="fas fa-plus"></i>
                Post a Job
              </Link>
            )}
          </div>
        </div>
        <img src="/assets/home/Online resume-cuate.svg" alt="" className="absolute top-1/5 right-1/10 w-52 opacity-10 z-0" />
        <img src="/assets/home/oversight-bro.svg" alt="" className="absolute bottom-1/5 left-1/10 w-44 opacity-10 z-0" />
        <img src="/assets/home/Mobile Marketing-bro.svg" alt="" className="absolute top-1/10 left-1/5 w-40 opacity-10 z-0" />
        <img src="/assets/home/Freelancer-bro.svg" alt="" className="absolute bottom-1/10 right-1/5 w-48 opacity-10 z-0" />
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <h2 className="text-5xl font-semibold mb-6 text-gray-900 leading-tight">
              Our <span className="text-navy-700">achievement</span> at a glance
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="bg-white p-12 rounded-2xl text-center shadow-md transition-all hover:-translate-y-2 hover:shadow-xl border border-gray-100">
              <i className="fas fa-users text-5xl text-navy-700 mb-4"></i>
              <h3 className="text-5xl font-bold text-gray-900 mb-2">10K+</h3>
              <p className="text-gray-600 font-medium">Active Freelancers</p>
            </div>
            <div className="bg-white p-12 rounded-2xl text-center shadow-md transition-all hover:-translate-y-2 hover:shadow-xl border border-gray-100">
              <i className="fas fa-briefcase text-5xl text-navy-700 mb-4"></i>
              <h3 className="text-5xl font-bold text-gray-900 mb-2">5K+</h3>
              <p className="text-gray-600 font-medium">Projects Completed</p>
            </div>
            <div className="bg-white p-12 rounded-2xl text-center shadow-md transition-all hover:-translate-y-2 hover:shadow-xl border border-gray-100">
              <i className="fas fa-globe text-5xl text-navy-700 mb-4"></i>
              <h3 className="text-5xl font-bold text-gray-900 mb-2">30+</h3>
              <p className="text-gray-600 font-medium">Countries Served</p>
            </div>
            <div className="bg-white p-12 rounded-2xl text-center shadow-md transition-all hover:-translate-y-2 hover:shadow-xl border border-gray-100">
              <i className="fas fa-star text-5xl text-navy-700 mb-4"></i>
              <h3 className="text-5xl font-bold text-gray-900 mb-2">4.9/5</h3>
              <p className="text-gray-600 font-medium">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-navy-50" id="features">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <h2 className="text-5xl font-semibold mb-6 text-gray-900 leading-tight">
              Everything You Need to <span className="text-navy-700">Succeed</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Milestone provides all the tools you need to find, hire, and work with top freelancers from around the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: 'fa-brain', title: 'Smart Matching', desc: 'Our AI-powered system connects you with the perfect freelancers for your specific project needs.' },
              { icon: 'fa-shield-alt', title: 'Secure Payments', desc: 'Milestone payments ensure you only pay for completed work that meets your standards.' },
              { icon: 'fa-clock', title: 'Time Tracking', desc: 'Built-in time tracking tools for hourly projects with screenshot verification.' },
              { icon: 'fa-certificate', title: 'Verified Talent', desc: 'All freelancers undergo a thorough vetting process to ensure top quality.' },
              { icon: 'fa-users-cog', title: 'Team Collaboration', desc: 'Easily manage multiple freelancers with our collaboration tools.' },
              { icon: 'fa-rocket', title: 'Fast Delivery', desc: 'Get your projects completed quickly with our efficient workflow system.' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-12 rounded-2xl text-center transition-all hover:-translate-y-1 hover:shadow-xl border border-gray-100 hover:border-navy-700">
                <div className="w-20 h-20 bg-gradient-to-br from-navy-950 to-navy-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className={`fas ${feature.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Freelancers Section */}
      <section className="py-20 bg-white" id="freelancers">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold mb-4 text-gray-900">Meet Our Top Freelancers</h2>
            <p className="text-lg text-gray-600">Work with the best talent in the industry</p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl relative border border-gray-100">
              {freelancers[currentFreelancerIndex].featured && (
                <div className="absolute -top-3 right-5 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-xs font-semibold">
                  Featured
                </div>
              )}
              {freelancers[currentFreelancerIndex].topRated && (
                <div className="absolute -top-3 right-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full text-xs font-semibold">
                  Top Rated
                </div>
              )}
              <div className="flex items-center gap-4 mb-6">
                <img src={freelancers[currentFreelancerIndex].avatar} alt={freelancers[currentFreelancerIndex].name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{freelancers[currentFreelancerIndex].name}</h4>
                  <p className="text-gray-600 text-sm">{freelancers[currentFreelancerIndex].title}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {freelancers[currentFreelancerIndex].skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">{skill}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star text-sm ${i < Math.floor(freelancers[currentFreelancerIndex].rating) ? 'text-amber-400' : 'text-gray-200'}`}></i>
                  ))}
                </div>
                <span className="text-sm text-gray-600">{freelancers[currentFreelancerIndex].rating} ({freelancers[currentFreelancerIndex].reviews} reviews)</span>
              </div>
              <div className="flex justify-between mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <span className="block text-xl font-bold text-gray-900">{freelancers[currentFreelancerIndex].completed}</span>
                  <span className="text-xs text-gray-600">Projects</span>
                </div>
                <div className="text-center">
                  <span className="block text-xl font-bold text-gray-900">100%</span>
                  <span className="text-xs text-gray-600">Success Rate</span>
                </div>
              </div>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5">
                Hire Now
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prevFreelancer} className="w-12 h-12 rounded-full bg-navy-700 text-white cursor-pointer transition-all hover:bg-navy-800 hover:scale-110 flex items-center justify-center border-none">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button onClick={nextFreelancer} className="w-12 h-12 rounded-full bg-navy-700 text-white cursor-pointer transition-all hover:bg-navy-800 hover:scale-110 flex items-center justify-center border-none">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-navy-50" id="testimonials">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold mb-4 text-gray-900">Success Stories</h2>
            <p className="text-lg text-gray-600">See how Milestone has transformed careers and businesses</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-12 rounded-2xl shadow-xl text-center">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                  <i key={i} className="fas fa-star text-lg text-amber-400"></i>
                ))}
              </div>
              <p className="text-lg leading-relaxed text-gray-700 mb-8 italic">
                "{testimonials[currentTestimonialIndex].content}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img src={testimonials[currentTestimonialIndex].avatar} alt={testimonials[currentTestimonialIndex].name} className="w-12 h-12 rounded-full object-cover" />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">{testimonials[currentTestimonialIndex].name}</h4>
                  <p className="text-sm text-gray-600">{testimonials[currentTestimonialIndex].role}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prevTestimonial} className="w-12 h-12 rounded-full bg-navy-700 text-white cursor-pointer transition-all hover:bg-navy-800 hover:scale-110 flex items-center justify-center border-none">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button onClick={nextTestimonial} className="w-12 h-12 rounded-full bg-navy-700 text-white cursor-pointer transition-all hover:bg-navy-800 hover:scale-110 flex items-center justify-center border-none">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-5xl font-bold mb-4">Ready to Start Your Freelancing Journey?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of freelancers and businesses on Milestone today</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/signup" className="px-8 py-4 bg-white text-navy-700 rounded-lg font-semibold no-underline transition-all hover:shadow-xl hover:-translate-y-1 inline-block">
              Get Started
            </Link>
            <Link to="/jobs" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold no-underline transition-all hover:bg-white hover:text-navy-700 inline-block">
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default Home;