import React, { useRef } from 'react';
import { 
  Star, 
  Quote,
  User
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import ServerErrorNotice from '../Common/ServerErrorNotice';
import './TestimonialsSection.css';

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const { reviews, isBackendOnline } = useData() || {};

  const activeReviews = reviews && reviews.length > 0 ? reviews : [];
  // Tripled list for seamless infinite marquee loop
  const marqueeList = [...activeReviews, ...activeReviews, ...activeReviews];

  return (
    <section className="testimonials-section-v2" id="reviews" ref={sectionRef}>

      {/* Floating decorative quote marks */}
      <Quote size={180} className="testi-deco-quote testi-deco-q1" />
      <Quote size={120} className="testi-deco-quote testi-deco-q2" />

      <div className="testimonials-container">
        
        {/* Section Header */}
        <div className="testimonials-header">
          <div className="testimonials-pill-badge">
            <span className="testi-pill-dot"></span>
            <span>CLIENT REVIEWS</span>
          </div>

          <h2 className="testimonials-main-title">
            What Our Clients <span className="highlight-pink">Say About Us</span>
          </h2>

          <p className="testimonials-subtitle">
            Real feedback from businesses and partners who scaled with Digital Orra.
          </p>
        </div>

        {!isBackendOnline ? (
          <ServerErrorNotice 
            compact={true}
            title="Server Error: Reviews Unavailable"
            message="Unable to load client reviews because backend server is offline. Please start backend server."
          />
        ) : (
          /* Infinite Left-to-Right Continuous Marquee Track */
          <div className="testi-marquee-viewport">
          <div className="testi-marquee-track">
            {marqueeList.map((item, index) => (
              <div key={`${item.id}-${index}`} className="testimonial-card-slide">
                <div className="testimonial-card-inner">

                  {/* Top Row: User Icon, Name, and Stars */}
                  <div className="card-top-head">
                    <div className="client-avatar-row">
                      <div className="client-avatar-icon-box">
                        <User size={18} className="avatar-user-icon" />
                      </div>
                      <h4 className="client-name">{item.clientName}</h4>
                    </div>

                    <div className="card-stars-row">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={14} className="star-filled" />
                      ))}
                    </div>
                  </div>

                  {/* Review Quote / Description */}
                  <p className="quote-text">"{item.quote}"</p>

                </div>
              </div>
            ))}
          </div>
        </div>
        )}

      </div>
    </section>
  );
}
