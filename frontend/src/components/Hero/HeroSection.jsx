import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, TrendingUp, Lightbulb, Target, RotateCw, Headphones, MessageCircle, FileText, ArrowUpRight } from 'lucide-react';
import './HeroSection.css';

export default function HeroSection({ onOpenAuditModal }) {
  const navigate = useNavigate();
  // Metric Target Values
  const targetConversions = 4.7; // 4.7K
  const targetTraffic = 28.6;   // 28.6K
  const targetRoas = 5.6;       // 5.6x
  const targetDonutPercent = 75;

  // Dynamic counter states
  const [conversions, setConversions] = useState(0);
  const [traffic, setTraffic] = useState(0);
  const [roas, setRoas] = useState(0);
  const [donutPercent, setDonutPercent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  // Digital marketing typing animation words list
  const wordsList = [
    'Real Results.',
    'High ROI Leads.',
    '10x Web Traffic.',
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const currentWord = wordsList[currentWordIndex];
    let typingSpeed = isDeleting ? 40 : 85;

    if (!isDeleting && displayText === currentWord) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % wordsList.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentWord.substring(0, displayText.length - 1)
          : currentWord.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex]);

  // Counter animation logic
  const animateMetrics = () => {
    setIsAnimating(true);
    setConversions(0);
    setTraffic(0);
    setRoas(0);
    setDonutPercent(0);

    const duration = 1800; // ms
    const steps = 60;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setConversions(parseFloat((targetConversions * easeProgress).toFixed(1)));
      setTraffic(parseFloat((targetTraffic * easeProgress).toFixed(1)));
      setRoas(parseFloat((targetRoas * easeProgress).toFixed(1)));
      setDonutPercent(Math.round(targetDonutPercent * easeProgress));

      if (step >= steps) {
        clearInterval(timer);
        setIsAnimating(false);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  };

  useEffect(() => {
    animateMetrics();
  }, []);

  return (
    <section className="digitalorra-hero" id="home">
      {/* Full Viewport Background Video */}
      <video
        src="/hero_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="full-hero-bg-video"
      />
      <div className="hero-video-overlay light-overlay"></div>


      <div className="digitalorra-hero-container">

        {/* Left Column: Headline, Copy & CTA */}
        <div className="hero-left-content">

          {/* Top Pill Badge */}
          {/* <div className="agency-pill-badge">
            <span>DIGITAL MARKETING</span>
          </div> */}

          {/* Main Headline with Typing Animation */}
          <h1 className="hero-main-title">
            Transform Your Business & Brand.<br />
            <span className="highlight-pink">with Latest Technology</span>
          </h1>

          {/* Expanded Subtitle Paragraph */}
          {/* <p className="hero-description">
            We help ambitious businesses scale exponentially online with data-driven SEO, ROI-focused PPC ads, viral social media campaigns, and high-converting web design that turn clicks into loyal customers.
          </p> */}

          {/* Bottom Features Bar (Commented Out) */}
          {/* <div className="hero-features-bar">

            <div className="feature-item">
              <div className="feature-icon-box pink-light">
                <TrendingUp size={24} className="feature-svg" />
              </div>
              <div className="feature-text">
                <span className="feature-title">Data-Driven</span>
                <span className="feature-subtitle">Strategies</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box pink-light">
                <Lightbulb size={24} className="feature-svg" />
              </div>
              <div className="feature-text">
                <span className="feature-title">Creative</span>
                <span className="feature-subtitle">Campaigns</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box pink-light">
                <Target size={24} className="feature-svg" />
              </div>
              <div className="feature-text">
                <span className="feature-title">Measurable</span>
                <span className="feature-subtitle">Results</span>
              </div>
            </div>

          </div> */}

          {/* 3 Stylish & Attractive CTA Buttons */}
          <div className="hero-buttons-row">
            <button
              type="button"
              className="gradient-rect-btn stylish-counselling-btn"
              onClick={(e) => {
                e.preventDefault();
                if (onOpenAuditModal) {
                  onOpenAuditModal();
                } else {
                  navigate('/contact', { state: { service: 'Free Counselling', scrollToForm: true } });
                }
              }}
            >
              <div className="btn-shimmer-beam"></div>
              <div className="btn-inner-stroke">
                <Headphones size={18} className="btn-icon-pink" />
                <span>FREE<br />COUNSELLING</span>
                <ArrowUpRight size={16} className="btn-arrow-icon" />
              </div>
            </button>

            <a
              href="https://wa.me/919990432321?text=Hi,%20I%20want%20Free%20Counselling%20from%20Digital%20Orra"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-rect-btn stylish-whatsapp-btn"
            >
              <div className="btn-shimmer-beam"></div>
              <div className="btn-inner-stroke">
                <MessageCircle size={18} className="btn-icon-green" />
                <span>WHATSAPP<br />NOW</span>
                <ArrowUpRight size={16} className="btn-arrow-icon" />
              </div>
            </a>

            <button
              type="button"
              className="gradient-rect-btn stylish-profile-btn"
              onClick={(e) => {
                e.preventDefault();
                navigate('/company-profile');
              }}
            >
              <div className="btn-shimmer-beam"></div>
              <div className="btn-inner-stroke">
                <FileText size={18} className="btn-icon-cyan" />
                <span>COMPANY<br />PROFILE</span>
                <ArrowUpRight size={16} className="btn-arrow-icon" />
              </div>
            </button>
          </div>
        </div>



      </div>
    </section>
  );
}
