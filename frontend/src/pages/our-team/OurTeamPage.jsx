import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './OurTeamPage.css';

export default function OurTeamPage() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);

  // All 24 images from /public/join our team/
  const teamImages = [
    '/join our team/k-1.webp',
    '/join our team/image-1-1-scaled.webp',
    '/join our team/Man-1.webp',
    '/join our team/kNI-1.webp',
    '/join our team/KARAN.webp',
    '/join our team/avtar.webp',
    '/join our team/sss.webp',
    '/join our team/hari.webp',
    '/join our team/D-1.webp',
    '/join our team/J.webp',
    '/join our team/M.webp',
    '/join our team/MUS.webp',
    '/join our team/Mam-1.webp',
    '/join our team/Monika-1.webp',
    '/join our team/Parshant.webp',
    '/join our team/R-1.webp',
    '/join our team/SA-1.webp',
    '/join our team/SON-1.webp',
    '/join our team/V-1.webp',
    '/join our team/WhatsApp-Image-2025-12-27-at-10.10.11.webp',
    '/join our team/WhatsApp-Image-2025-12-27-at-10.14.37.webp',
    '/join our team/funalrajni.webp',
    '/join our team/ggggg.webp',
    '/join our team/gur.webp'
  ];

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? teamImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === teamImages.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="our-team-page">
      {/* Background Ambient Glow Orbs */}
      <div className="team-orb team-orb-1"></div>
      <div className="team-orb team-orb-2"></div>

      <div className="team-container">
        {/* Header */}
        <div className="team-hero">
          <div className="team-pill">
            <Users size={15} />
            <span>JOIN OUR TEAM</span>
          </div>
          <h1 className="team-title">
            MEET THE MINDS OF <span className="highlight-gradient">DIGITAL ORRA</span>
          </h1>
          <p className="team-subtitle">
            Our talented team of growth marketers, engineers, designers, and innovators driving digital transformation.
          </p>
        </div>

        {/* Attractive Image-Only Cards Grid */}
        <div className="team-photo-grid">
          {teamImages.map((imgPath, index) => (
            <div
              key={index}
              className="team-photo-card"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="photo-card-wrapper">
                <img
                  src={imgPath}
                  alt={`Digital Orra Team Member ${index + 1}`}
                  className="team-card-img"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal for Full Image View with Navigation */}
        {selectedIndex !== null && (
          <div className="team-modal-overlay" onClick={() => setSelectedIndex(null)}>
            <div className="team-modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="team-modal-close"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close Preview"
              >
                <X size={22} />
              </button>

              <button
                className="modal-nav-btn nav-prev"
                onClick={handlePrev}
                aria-label="Previous Image"
              >
                <ChevronLeft size={24} />
              </button>

              <img
                src={teamImages[selectedIndex]}
                alt={`Digital Orra Team Member ${selectedIndex + 1}`}
                className="team-modal-img"
              />

              <button
                className="modal-nav-btn nav-next"
                onClick={handleNext}
                aria-label="Next Image"
              >
                <ChevronRight size={24} />
              </button>

              <div className="modal-image-counter">
                {selectedIndex + 1} / {teamImages.length}
              </div>
            </div>
          </div>
        )}

        {/* Join Our Team CTA */}
        <div className="faqs-cta-box" style={{ marginTop: '70px' }}>
          <h3 className="faqs-cta-title">Want to join our amazing team?</h3>
          <p className="faqs-cta-desc">
            We are always looking for passionate marketers, developers, and creative minds. Apply today!
          </p>
          <button className="faqs-cta-btn" onClick={() => navigate('/career')}>
            <span>Explore Open Roles</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
