import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import FeaturesSection from './FeaturesSection';
import FreelancersSection from './FreelancersSection';
import TestimonialsSection from './TestimonialsSection';
import BlogSection from './BlogSection';
import CtaSection from './CtaSection';
import Footer from './Footer';

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
    <div className={`home ${theme}-mode`}>
      <Header user={user} getDashboardRoute={getDashboardRoute} theme={theme} toggleTheme={toggleTheme} />
      <HeroSection user={user} />
      <StatsSection />
      <FeaturesSection />
      <FreelancersSection
        freelancers={freelancers}
        currentFreelancerIndex={currentFreelancerIndex}
        prevFreelancer={prevFreelancer}
        nextFreelancer={nextFreelancer}
      />
      <TestimonialsSection
        testimonials={testimonials}
        currentTestimonialIndex={currentTestimonialIndex}
        prevTestimonial={prevTestimonial}
        nextTestimonial={nextTestimonial}
      />
      <BlogSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Home;
