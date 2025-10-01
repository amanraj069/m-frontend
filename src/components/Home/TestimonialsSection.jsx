import React from 'react';

const TestimonialsSection = ({ testimonials, currentTestimonialIndex, prevTestimonial, nextTestimonial }) => {
  const testimonial = testimonials[currentTestimonialIndex];
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>Success Stories</h2>
          <p>See how Milestone has transformed careers and businesses</p>
        </div>
        <div className="testimonials-carousel">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <p>"{testimonial.content}"</p>
              <div className="testimonial-author">
                <img src={testimonial.avatar} alt={testimonial.name} />
                <div>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-controls">
          <button onClick={prevTestimonial} className="carousel-control">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button onClick={nextTestimonial} className="carousel-control">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
