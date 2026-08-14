import React from 'react';
import { Users, TrendingUp, Target, Star, Plus } from 'lucide-react';
import './TrustBanner.css';

export default function TrustBanner() {
  const clientAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
  ];

  return (
    <section className="digitalorra-trust-banner">
      <div className="trust-banner-container">
        
        {/* Left Side: Tagline Box */}
        <div className="trust-tagline-box">
          <span className="trust-label">TRUSTED BY</span>
          <span className="trust-businesses">
            <strong className="pink-text">100+</strong> BUSINESSES
          </span>
        </div>

        {/* Divider line for desktop */}
        <div className="trust-v-divider"></div>

        {/* Stat Item 1: Happy Clients */}
        <div className="trust-stat-item">
          <div className="trust-icon-squircle">
            <Users size={22} className="trust-icon" />
          </div>
          <div className="trust-stat-info">
            <span className="trust-number">500+</span>
            <span className="trust-subtext">Happy Clients</span>
          </div>
        </div>

        {/* Stat Item 2: Revenue Generated */}
        <div className="trust-stat-item">
          <div className="trust-icon-squircle">
            <TrendingUp size={22} className="trust-icon" />
          </div>
          <div className="trust-stat-info">
            <span className="trust-number">₹50Cr+</span>
            <span className="trust-subtext">Revenue Generated</span>
          </div>
        </div>

        {/* Stat Item 3: Campaigns Delivered */}
        <div className="trust-stat-item">
          <div className="trust-icon-squircle">
            <Target size={22} className="trust-icon" />
          </div>
          <div className="trust-stat-info">
            <span className="trust-number">1200+</span>
            <span className="trust-subtext">Campaigns Delivered</span>
          </div>
        </div>

        {/* Stat Item 4: Google Rating */}
        <div className="trust-stat-item">
          <div className="trust-icon-squircle">
            <Star size={22} className="trust-icon star-fill" />
          </div>
          <div className="trust-stat-info">
            <span className="trust-number">4.9</span>
            <span className="trust-subtext">Google Rating</span>
          </div>
        </div>

        {/* Right Side: Avatar Stack Group */}
        <div className="trust-avatar-stack">
          {clientAvatars.map((src, idx) => (
            <img 
              key={idx} 
              src={src} 
              alt={`Client Avatar ${idx + 1}`} 
              className="avatar-circle-img"
            />
          ))}
          <div className="avatar-plus-badge" title="Join 100+ Happy Businesses">
            <Plus size={16} strokeWidth={3} />
          </div>
        </div>

      </div>
    </section>
  );
}
