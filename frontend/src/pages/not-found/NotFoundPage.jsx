import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, AlertCircle, Compass, RefreshCw } from 'lucide-react';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="not-found-page-wrapper">
      {/* Ambient background glow orbs */}
      <div className="nf-orb orb-pink"></div>
      <div className="nf-orb orb-purple"></div>

      <div className="nf-container">
        <div className="nf-card">
          
          {/* Big 404 Glitch Number Showcase */}
          <div className="nf-number-box">
            <span className="nf-digit">4</span>
            <div className="nf-zero-ring">
              <div className="nf-pulse-core"></div>
            </div>
            <span className="nf-digit">4</span>
          </div>

          <div className="nf-badge">
            <AlertCircle size={15} />
            <span>PAGE NOT FOUND</span>
          </div>

          <h1 className="nf-title">
            Oops! You’ve Discovered <br />
            <span className="highlight-pink">Uncharted Digital Territory</span>
          </h1>

          <p className="nf-description">
            The page you are looking for might have been removed, renamed, or is temporarily unavailable. Let's get you back on track with Digital ORRA.
          </p>

          {/* Quick Action Navigation Buttons */}
          <div className="nf-action-row">
            <button className="btn-nf-primary" onClick={() => navigate('/')}>
              <Home size={18} />
              <span>Back to Homepage</span>
            </button>

            <button className="btn-nf-secondary" onClick={() => navigate(-1)}>
              <ArrowLeft size={18} />
              <span>Previous Page</span>
            </button>
          </div>

          {/* Quick Helpful Links Row */}
          <div className="nf-helpful-links">
            <span className="helpful-title">Popular Destinations:</span>
            <div className="links-chips-wrap">
              <a href="/services" onClick={(e) => { e.preventDefault(); navigate('/services'); }}>Services</a>
              <a href="/portfolio" onClick={(e) => { e.preventDefault(); navigate('/portfolio'); }}>Our Work</a>
              <a href="/about-us" onClick={(e) => { e.preventDefault(); navigate('/about-us'); }}>About Us</a>
              <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Contact Us</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
