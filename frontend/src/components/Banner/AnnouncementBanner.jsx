import React, { useState } from 'react';
import { Zap, ArrowRight, X } from 'lucide-react';
import './AnnouncementBanner.css';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="announcement-banner">
      <div className="banner-content">
        <span className="banner-badge">
          <Zap className="banner-icon" size={14} /> NEW RELEASE
        </span>
        <p className="banner-text">
          <strong>MERN Stack 2.0</strong> is now live! Explore MongoDB, Express, React & Node features.
        </p>
        <a href="#features" className="banner-link">
          Learn More <ArrowRight size={14} />
        </a>
      </div>
      <button 
        className="banner-close-btn" 
        onClick={() => setIsVisible(false)}
        aria-label="Close Announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
}
