import React, { useState } from 'react';
import { Play, CheckCircle2, Video, Trophy, TrendingUp, Users, Film } from 'lucide-react';
import './FeaturedVideoSection.css';

export default function FeaturedVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const features = [
    {
      title: 'Famous Movie Actor Rakesh Bedi',
      desc: 'We help brands scale exponentially with result-driven strategies'
    },
    {
      title: 'Trusted, Result-Driven & Growth Focused',
      desc: 'Delivering ROI-backed digital campaigns, SEO, Google PPC, and viral social media scaling for ambitious brands.'
    },
    {
      title: 'Grow Your Business Digitally',
      desc: 'Comprehensive 360° digital strategy turning clicks into loyal customers and multiplying revenue.'
    }
  ];

  const stats = [
    { value: 'Bollywood', label: 'Celebrity Endorsed', icon: <Trophy size={22} /> },
    { value: '7000+', label: 'Happy Clients', icon: <Users size={22} /> },
    { value: '30x', label: 'ROI Delivered', icon: <TrendingUp size={22} /> },
    { value: 'No. 1', label: 'Digital Agency', icon: <Film size={22} /> }
  ];

  return (
    <section className="featured-video-section" id="showcase">
      {/* Background Glows */}
      <div className="video-bg-glow glow-pink"></div>
      <div className="video-bg-glow glow-purple"></div>

      <div className="video-container">

        {/* Full-Width Centered Header */}
        <div className="video-top-header">
          <div className="video-pill-badge">
            <Trophy size={14} className="badge-icon" />
            <span>PROUD MOMENT • CELEBRITY SPOTLIGHT</span>
          </div>

          <h2 className="video-main-title">
            Famous Movie Actor <span className="highlight-gradient">Rakesh Bedi</span> At Digital ORRA
          </h2>
           <p className="video-subtitle">
              A proud moment for <strong>Digital ORRA</strong> — Recognized by renowned Bollywood actor <strong>Rakesh Bedi</strong> as the Best Digital Marketing Company.<br/> We help brands scale exponentially with result-driven strategies.
            </p> 
        </div>

        {/* 2-Column Content Showcase Grid */}
        <div className="video-showcase-grid">

          {/* Left Column: Subtitle & Feature Points */}
          <div className="video-left-content">
            {/* <p className="video-subtitle">
              A proud moment for <strong>Digital ORRA</strong> — Recognized by renowned Bollywood actor <strong>Rakesh Bedi</strong> as the Best Digital Marketing Company. We help brands scale exponentially with result-driven strategies.
            </p> */}

            {/* 3 Feature Points */}
            <div className="video-feature-list">
              {features.map((feat, idx) => (
                <div key={idx} className="video-feature-item">
                  <div className="feature-check-box">
                    <CheckCircle2 size={18} className="check-svg" />
                  </div>
                  <div className="feature-text-box">
                    <h4 className="feature-item-title">{feat.title}</h4>
                    <p className="feature-item-desc">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="video-cta-box">
              <a
                href="https://www.youtube.com/watch?v=8NPyv5Am6Mo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-watch-video"
              >
                <div className="btn-play-icon">
                  <Play size={16} fill="currentColor" />
                </div>
                <span>Watch Full Video</span>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded YouTube Video */}
          <div className="video-right-embed">
            <div className="video-frame-wrapper">
              <iframe
                className="youtube-iframe"
                src="https://www.youtube.com/embed/8NPyv5Am6Mo?autoplay=0&rel=0"
                title="Featured Digital Marketing Agency Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div>

        {/* Below Video 4 Key Stats Grid */}
        <div className="video-stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card-box">
              <div className="stat-icon-wrapper">
                {stat.icon}
              </div>
              <div className="stat-text-group">
                <span className="stat-number-value">{stat.value}</span>
                <span className="stat-label-text">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
