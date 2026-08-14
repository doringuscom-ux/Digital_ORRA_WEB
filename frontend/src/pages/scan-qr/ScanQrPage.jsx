import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  Navigation,
  Award,
  ChevronDown,
  MessageCircle,
  Share2,
  Video,
  Play,
  Send
} from 'lucide-react';
import './ScanQrPage.css';

export default function ScanQrPage() {
  const navigate = useNavigate();
  const [isCertDropdownOpen, setIsCertDropdownOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const certificatesList = [
    {
      id: 'gst',
      title: 'Form GST REG-06',
      subtitle: 'Government of India GST Registration Certificate',
      link: '/qr-certified/gst-reg-3.pdf'
    },
    {
      id: 'udyam',
      title: 'UDYAM REGISTRATION CERTIFICATE',
      subtitle: 'Ministry of Micro, Small & Medium Enterprises (MSME)',
      link: '/qr-certified/Print-_-Udyam-Registration-Certificate.pdf'
    },
    {
      id: 'iso',
      title: 'ISO CERTIFICATE',
      subtitle: 'ISO 9001:2015 Quality Management System',
      link: '/qr-certified/IMG_20241230_165503.pdf'
    }
  ];

  return (
    <div className="scan-qr-page-wrapper">
      <div className="scan-qr-container">

        {/* MAIN EMBEDDED CARD CONTAINER */}
        <div className="qr-linktree-card">
          
          {/* 1. Social Media Icon Links Row */}
          <div className="qr-social-icons-row">
            {/* Facebook */}
            <a href="https://www.facebook.com/DigitalORRA/" target="_blank" rel="noopener noreferrer" className="social-icon-btn facebook" title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a href="https://x.com/Digital_ORRA" target="_blank" rel="noopener noreferrer" className="social-icon-btn twitter" title="X">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a href="https://www.youtube.com/@DIGITALORRA" target="_blank" rel="noopener noreferrer" className="social-icon-btn youtube" title="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/digitalorra/" target="_blank" rel="noopener noreferrer" className="social-icon-btn instagram" title="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/916280458005" target="_blank" rel="noopener noreferrer" className="social-icon-btn whatsapp" title="WhatsApp">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
          </div>

          {/* 3. Heading Statement */}
          <h1 className="qr-heading-text">
            Digital ORRA – Connect with us for latest updates & offers
          </h1>

          {/* 4. Link Button 1: Visit Website */}
          <a
            href="https://digitalorra.com"
            target="_blank"
            rel="noopener noreferrer"
            className="qr-link-item-btn"
          >
            <div className="btn-left-content">
              <Globe size={20} className="link-icon-blue" />
              <span className="link-btn-text">Visit Website</span>
            </div>
          </a>

          {/* 5. Link Button 2: Direction */}
          <a
            href="https://maps.google.com/?q=Digital+ORRA+Panchkula"
            target="_blank"
            rel="noopener noreferrer"
            className="qr-link-item-btn"
          >
            <div className="btn-left-content">
              <Navigation size={20} className="link-icon-blue" />
              <span className="link-btn-text">Direction</span>
            </div>
          </a>

          {/* 6. Primary Action Red Button: Our Certification (with Dropdown) */}
          <div className="qr-certification-wrapper">
            <button
              className={`btn-our-certification ${isCertDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsCertDropdownOpen(!isCertDropdownOpen)}
            >
              <span>Our Certification</span>
              <ChevronDown size={18} className={`cert-chevron ${isCertDropdownOpen ? 'open' : ''}`} />
            </button>

            {/* Certification Dropdown Menu */}
            {isCertDropdownOpen && (
              <div className="certification-dropdown-menu">
                {certificatesList.map((cert) => (
                  <a
                    key={cert.id}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-dropdown-item"
                  >
                    <Award size={22} className="cert-item-icon" />
                    <div className="cert-item-text">
                      <span className="cert-item-title">{cert.title}</span>
                      <span className="cert-item-subtitle">{cert.subtitle}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
