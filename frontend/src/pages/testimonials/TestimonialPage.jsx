import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Quote, User, ArrowRight, MessageSquareQuote } from 'lucide-react';
import { useData } from '../../context/DataContext';
import ServerErrorNotice from '../../components/Common/ServerErrorNotice';
import './TestimonialPage.css';

export default function TestimonialPage() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { reviews, isBackendOnline } = useData() || {};

  const activeReviews = reviews && reviews.length > 0 ? reviews : [];
  // Tripled list for seamless infinite marquee loop
  const marqueeList = [...activeReviews, ...activeReviews, ...activeReviews];

  return (
    <div className="testimonial-page-v2" ref={sectionRef}>
      {/* Ambient background glows & decorative quotes */}
      <div className="tst-v2-orb tst-v2-orb-1"></div>
      <div className="tst-v2-orb tst-v2-orb-2"></div>
      <Quote size={180} className="testi-deco-quote testi-deco-q1" />
      <Quote size={120} className="testi-deco-quote testi-deco-q2" />

      <div className="tst-v2-container">
        {/* Header */}
        <div className="tst-v2-header">
          <div className="tst-v2-pill">
            <MessageSquareQuote size={15} />
            <span>CLIENT REVIEWS & TESTIMONIALS</span>
          </div>
          <h1 className="tst-v2-title">
            WHAT OUR CLIENTS <span className="highlight-gradient">SAY ABOUT US</span>
          </h1>
          <p className="tst-v2-subtitle">
            Real feedback from businesses, brands, and partners who scaled their digital growth with Digital Orra.
          </p>
        </div>

        {!isBackendOnline ? (
          <ServerErrorNotice 
            title="Server Error: Reviews Unavailable"
            message="Unable to load client reviews because the backend server is offline. Please start the backend server."
          />
        ) : (
          <>
            {/* 1. INFINITE SMOOTH MARQUEE SLIDER (MATCHING HOME PAGE) */}
        <div className="testi-v2-marquee-viewport">
          <div className="testi-v2-marquee-track">
            {marqueeList.map((item, index) => (
              <div key={`${item.id}-${index}`} className="tst-v2-card-slide">
                <div className="tst-v2-card-inner">
                  {/* Card Header: Avatar, Name & Stars */}
                  <div className="tst-v2-card-top">
                    <div className="tst-v2-client-row">
                      <div className="tst-v2-avatar-box">
                        <User size={18} className="tst-v2-avatar-icon" />
                      </div>
                      <h4 className="tst-v2-client-name">{item.clientName}</h4>
                    </div>
                    <div className="tst-v2-stars-row">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={14} className="star-filled" />
                      ))}
                    </div>
                  </div>
                  {/* Review Text */}
                  <p className="tst-v2-quote-text">"{item.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. ALL REVIEWS GRID LAYOUT */}
        <div className="tst-v2-grid-section">
          <div className="tst-v2-grid-title-box">
            <h2>ALL VERIFIED CLIENT REVIEWS</h2>
          </div>
          <div className="tst-v2-grid">
            {activeReviews.map((item) => (
              <div key={item.id} className="tst-v2-grid-card">
                <div className="tst-v2-card-top">
                  <div className="tst-v2-client-row">
                    <div className="tst-v2-avatar-box">
                      <User size={18} className="tst-v2-avatar-icon" />
                    </div>
                    <h4 className="tst-v2-client-name">{item.clientName}</h4>
                  </div>
                  <div className="tst-v2-stars-row">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={14} className="star-filled" />
                    ))}
                  </div>
                </div>
                <p className="tst-v2-quote-text">"{item.quote}"</p>
              </div>
            ))}
          </div>
        </div>
          </>
        )}

        {/* CTA Banner */}
        <div className="faqs-cta-box" style={{ marginTop: '70px' }}>
          <h3 className="faqs-cta-title">Ready To Scale Your Brand With Digital Orra?</h3>
          <p className="faqs-cta-desc">
            Get a free performance audit and strategic roadmap tailored for your business.
          </p>
          <button className="faqs-cta-btn" onClick={() => navigate('/contact-us')}>
            <span>Get Started Now</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
