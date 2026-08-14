import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  TrendingUp,
  Award,
  Users,
  ShieldCheck,
  Zap,
  ArrowRight,
  Globe,
  Smile,
  Smartphone,
  X,
  Compass,
  BarChart3,
  Play,
  Lightbulb,
  Briefcase,
  UserCheck,
  Flag,
  Send,
  Trophy,
  Newspaper,
  Loader2
} from 'lucide-react';
import { processItems, pillHighlights, aboutValues } from '../../data/aboutData';
import { useData } from '../../context/DataContext';
import './AboutUsPage.css';

export default function AboutUsPage({ onNavigate, onOpenAuditModal }) {
  const { recognitions, isBackendOnline } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mission');
  const [yearsCount, setYearsCount] = useState(0);
  const [selectedRecognitionModal, setSelectedRecognitionModal] = useState(null);
  const [imageOnlyView, setImageOnlyView] = useState(false);

  // 3D Carousel State
  const [processIndex, setProcessIndex] = useState(0);
  const [isProcessPaused, setIsProcessPaused] = useState(false);
  const [isProcessInView, setIsProcessInView] = useState(false);
  const [isProcessStarted, setIsProcessStarted] = useState(false);
  const processSectionRef = useRef(null);
  const [activeAwardTab, setActiveAwardTab] = useState('all');

  // Scroll observer for Our Process section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsProcessInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (processSectionRef.current) {
      observer.observe(processSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Delay starting animation by 1.2s after section comes into view
  useEffect(() => {
    let delayTimer;
    if (isProcessInView) {
      delayTimer = setTimeout(() => {
        setIsProcessStarted(true);
      }, 1200);
    } else {
      setIsProcessStarted(false);
    }
    return () => clearTimeout(delayTimer);
  }, [isProcessInView]);

  // Infinite 3D Auto Rotation Effect
  useEffect(() => {
    if (!isProcessStarted || isProcessPaused) return;
    const timer = setInterval(() => {
      setProcessIndex((prev) => (prev + 1) % processItems.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [isProcessStarted, isProcessPaused]);

  const getCard3DClass = (index) => {
    const total = processItems.length;
    let diff = index - processIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) return 'card-3d-center';
    if (diff === 1) return 'card-3d-right';
    if (diff === -1) return 'card-3d-left';
    return 'card-3d-back';
  };

  useEffect(() => {
    let start = 0;
    const end = 10;
    const duration = 1200;
    const stepTime = Math.floor(duration / end);

    const timer = setInterval(() => {
      start += 1;
      setYearsCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const bottomStats = [
    { id: 1, label: 'Happy Clients', value: '500+', icon: <Users size={28} className="pink-stat-icon" /> },
    { id: 2, label: 'Projects Completed', value: '1200+', icon: <TrendingUp size={28} className="pink-stat-icon" /> },
    { id: 3, label: 'Years of Experience', value: `${yearsCount}+`, icon: <Target size={28} className="pink-stat-icon" /> },
    { id: 4, label: 'Client Satisfaction', value: '98%', icon: <Smile size={28} className="pink-stat-icon" /> }
  ];

  return (
    <div className="about-page-wrapper">

      {/* 1. Main Hero About Section */}
      <section className="about-hero-section">
        <div className="about-container">

          <div className="about-hero-flex">

            {/* Left Content Column */}
            <div className="about-hero-left">

              {/* Pink Accent Line Eyebrow */}
              <div className="about-eyebrow-row">
                <span className="eyebrow-line"></span>
                <span className="eyebrow-text">ABOUT DIGITAL ORRA</span>
              </div>

              <h1 className="about-hero-title">About Digital Orra — Performance Marketing & Growth Agency</h1>

              {/* Paragraph 1 */}
              <p className="about-body-text">
                Digital ORRA is a results-driven Digital Marketing Company in Panchkula, based out in Panchkula near Chandigarh, India, offering end-to-end digital solutions for brands and businesses. We specialize in digital marketing, Google Ads, Meta Ads, influencer marketing, graphic designing, website development and designing, CRM software, app development, and ERP solutions.
              </p>

              {/* Paragraph 2 */}
              <p className="about-body-text">
                Our services also include corporate video editing and professional corporate video shoots to help brands communicate with impact. With a strategic, creative, and performance-focused approach, Digital ORRA helps businesses grow, scale, and stand out in the digital landscape.
              </p>

              {/* 4 Feature Pill Badges */}
              <div className="about-pills-grid">
                {pillHighlights.map((pill, idx) => (
                  <div key={idx} className="about-pill-item">
                    <div className="pill-icon-box">{pill.icon}</div>
                    <span className="pill-text">{pill.title}</span>
                  </div>
                ))}
              </div>

              {/* CTA Action Buttons */}
              <div className="about-cta-buttons">
                <a
                  href="/contact-us"
                  className="btn-work-together"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/contact-us', { state: { scrollToForm: true } });
                  }}
                >
                  <span>Let's Work</span>
                  <ArrowRight size={14} />
                </a>

                <button
                  className="btn-watch-story"
                  onClick={() => {
                    const storyElem = document.getElementById('our-story-section');
                    if (storyElem) storyElem.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="play-icon-circle">
                    <Play size={9} fill="#E6007E" color="#E6007E" />
                  </div>
                  <span>Watch Story</span>
                </button>
              </div>

            </div>

            {/* Right Visual Image Card */}
            <div className="about-hero-right">
              <div className="about-image-frame-container">
                <div className="pink-frame-backdrop"></div>
                <div className="pink-dots-pattern"></div>

                <div className="about-image-card">
                  <img
                    src="/about-office.png"
                    alt="Digital Orra Office Conference Room - Think Plan Create Grow Together"
                    className="about-office-img"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800';
                    }}
                  />

                  {/* Floating 10+ Years Badge Card */}
                  <div className="floating-years-card">
                    <div className="years-text-group">
                      <span className="years-number">{yearsCount}+</span>
                      <span className="years-label">Years of Experience</span>
                    </div>
                    <div className="years-award-icon">
                      <Award size={22} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: 4 Key Proof Stats */}
          <div className="about-proof-stats-bar">
            {bottomStats.map((stat, idx) => (
              <React.Fragment key={stat.id}>
                <div className="proof-stat-item">
                  <div className="proof-stat-icon-wrapper">
                    {stat.icon}
                  </div>
                  <div className="proof-stat-text">
                    <h3 className="proof-stat-value">{stat.value}</h3>
                    <p className="proof-stat-label">{stat.label}</p>
                  </div>
                </div>
                {idx < bottomStats.length - 1 && <div className="proof-stat-divider"></div>}
              </React.Fragment>
            ))}
          </div>

        </div>
      </section>

      {/* 2. Story & Mission Interactive Section */}
      <section className="about-story-section" id="our-story-section">
        <div className="about-container">
          <div className="about-story-grid">

            {/* Left Visual Banner with Team Image */}
            <div className="about-story-visual">
              <div className="story-image-frame-container">
                <div className="pink-frame-backdrop"></div>
                <div className="pink-dots-pattern"></div>

                <div className="story-image-card">
                  <img
                    src="/about-team.webp"
                    alt="Digital Orra Founder & Team - Expert Marketers & Developers"
                    className="story-main-img"
                    onError={(e) => {
                      e.target.src = '/about-founder-team.jpg';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Story Content & Tabs */}
            <div className="about-story-content">
              <div className="section-pill">OUR FOUNDATION</div>
              <h2 className="section-title">
                Driven by Results, Fueled by <span className="highlight-pink">Innovation</span>
              </h2>

              <p className="section-description">
                Founded with a mission to bridge the gap between creative design and measurable financial growth,
                Digital Orra has evolved from a passionate group of marketers into an industry-leading digital growth engine.
              </p>

              {/* Tab Navigation */}
              <div className="story-tabs-nav">
                <button
                  className={`tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
                  onClick={() => setActiveTab('mission')}
                >
                  <Target size={16} />
                  <span>Our Mission</span>
                </button>

                <button
                  className={`tab-btn ${activeTab === 'vision' ? 'active' : ''}`}
                  onClick={() => setActiveTab('vision')}
                >
                  <Compass size={16} />
                  <span>Our Vision</span>
                </button>

                <button
                  className={`tab-btn ${activeTab === 'philosophy' ? 'active' : ''}`}
                  onClick={() => setActiveTab('philosophy')}
                >
                  <BarChart3 size={16} />
                  <span>Our Philosophy</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="story-tab-body">
                {activeTab === 'mission' && (
                  <div className="tab-pane fade-in">
                    <h4>To deliver creative, customized, and effective digital strategies that help brands grow online.</h4>
                  </div>
                )}

                {activeTab === 'vision' && (
                  <div className="tab-pane fade-in">
                    <h4>To empower businesses with innovative and result-driven digital marketing solutions.</h4>
                  </div>
                )}

                {activeTab === 'philosophy' && (
                  <div className="tab-pane fade-in">
                    <h4>To deliver excellence with integrity, innovation, and a commitment to customer success.</h4>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2.5. Digital ORRA Believes In QR Showcase Banner */}
      <section className="about-believes-section">
        <div className="about-container">
          <div className="believes-card-container">
            <div className="dots-matrix-decor"></div>
            <div className="pink-soft-glow-circle"></div>

            <div className="believes-grid-layout">

              <div className="believes-content-col">
                <div className="pink-accent-marks">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <h2 className="believes-main-title">
                  Digital ORRA <br />
                  <span className="highlight-pink-text">Believes In</span>
                </h2>
                <div className="title-bottom-line"></div>

                <p className="believes-description">
                  Digital Marketing is an ever-evolving niche as the tools and technologies
                  used in this field keep undergoing upgradation. Therefore, we too keep
                  innovating with our training methods, which allow us to make the best possible
                  course for our students.
                </p>

                <div
                  className="certifications-cta-pill"
                  onClick={() => navigate('/scan-qr')}
                  title="Click to view Scan QR page"
                >
                  <div className="cert-award-icon-box">
                    <Award size={24} className="pink-award-ribbon" />
                  </div>
                  <div className="cert-v-divider"></div>
                  <span className="cert-pill-label">Certifications for Scan QR</span>
                  <div className="cert-arrow-circle">
                    <ArrowRight size={16} />
                  </div>
                </div>

              </div>

              <div className="believes-qr-visual">
                <div className="dark-fluid-backdrop-right">
                  <div
                    className="qr-code-frame-box"
                    onClick={() => navigate('/scan-qr')}
                    title="Click to view Scan QR page"
                  >
                    <img
                      src="/QR.webp"
                      alt="Digital ORRA Scan QR Code Certifications"
                      className="qr-code-img"
                    />

                    <div className="scan-me-pill">
                      <div className="scan-phone-icon">
                        <Smartphone size={16} />
                      </div>
                      <span>SCAN ME</span>
                    </div>
                  </div>

                  <div className="floating-pink-dots">
                    <span className="dot-filled"></span>
                    <span className="dot-ring"></span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2.6. Our Process - 3D Circular Carousel Section */}
      <section className="about-process-showcase-section" ref={processSectionRef}>
        <div className="about-container">

          <div className="process-header-center">
            <div className="process-eyebrow">
              <span className="line"></span>
              <span className="dot">•</span>
              <span className="text">OUR PROCESS</span>
              <span className="dot">•</span>
              <span className="line"></span>
            </div>

            <h2 className="process-title">
              How We <span className="highlight-pink-underline">Make It</span> Happen
            </h2>
          </div>

          <div className="process-timeline-nav">
            <div className="timeline-bar-wrapper">
              <div className="timeline-line-bg"></div>

              {processItems.map((item, idx) => (
                <div
                  key={item.id}
                  className={`timeline-step-node step-${idx + 1} ${idx === processIndex ? 'active' : ''}`}
                  onClick={() => setProcessIndex(idx)}
                >
                  <span className="step-label">{item.step}</span>
                  <div className={`step-node-icon ${item.nodeClass}`}>
                    {item.nodeIcon}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="process-3d-stage"
            onMouseEnter={() => setIsProcessPaused(true)}
            onMouseLeave={() => setIsProcessPaused(false)}
          >
            <div className="process-3d-track">
              {processItems.map((item, idx) => {
                const card3DClass = getCard3DClass(idx);
                return (
                  <div
                    key={item.id}
                    className={`process-feature-card ${item.theme} ${card3DClass}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setProcessIndex(idx);
                    }}
                    title={`Click to bring ${item.title} to front`}
                  >
                    <div className="card-image-wrap">
                      <img
                        src={item.image}
                        alt={`${item.step} - ${item.title}`}
                        className="process-card-img"
                      />
                      <div className={`curved-wave-badge ${item.waveClass}`}>
                        <div className={`step-number-circle ${item.bgClass}`}>{item.number}</div>
                      </div>
                    </div>

                    <div className="process-card-body">
                      <div className={`card-icon-badge ${item.iconBgClass}`}>
                        {item.icon}
                      </div>

                      <h3 className="process-card-title">{item.title}</h3>
                      <p className="process-card-desc">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="process-pagination-dots">
            {processItems.map((item, idx) => (
              <span
                key={item.id}
                className={`dot ${item.dotClass} ${idx === processIndex ? 'active' : ''}`}
                onClick={() => setProcessIndex(idx)}
              ></span>
            ))}
          </div>

        </div>
      </section>

      {/* 2.7. Award Certificates & News Coverage Section */}
      <section className="about-awards-news-section">
        <div className="about-container">

          <div className="awards-news-header-center">
            <div className="awards-eyebrow">
              <span className="line"></span>
              <span className="dot">•</span>
              <span className="text">RECOGNITION & PRESS</span>
              <span className="dot">•</span>
              <span className="line"></span>
            </div>

            <h2 className="awards-news-title">
              Award Certificates & <span className="highlight-pink-underline">Media News</span>
            </h2>

            <p className="awards-news-subtitle">
              Celebrating our industry accolades, official Google & Meta accreditations, and featured national press coverage.
            </p>
          </div>

          <div className="awards-tab-toggle-bar">
            <button
              className={`awards-tab-btn ${activeAwardTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveAwardTab('all')}
            >
              <Trophy size={16} />
              <span>All</span>
            </button>
            <button
              className={`awards-tab-btn ${activeAwardTab === 'awards' ? 'active' : ''}`}
              onClick={() => setActiveAwardTab('awards')}
            >
              <Award size={16} />
              <span>Awards</span>
            </button>
            <button
              className={`awards-tab-btn ${activeAwardTab === 'news' ? 'active' : ''}`}
              onClick={() => setActiveAwardTab('news')}
            >
              <Newspaper size={16} />
              <span>News</span>
            </button>
          </div>

          {isBackendOnline ? (
            <div className="awards-news-grid">
              {recognitions
                .filter(item => activeAwardTab === 'all' || item.category === activeAwardTab)
                .map((item) => (
                <div
                  key={item.id}
                  className="award-image-card"
                  onClick={() => { setSelectedRecognitionModal(item); setImageOnlyView(true); }}
                >
                  <div className="award-image-card-img-wrap">
                    <img
                      src={item.image}
                      alt={item.title || item.headline || 'Recognition Image'}
                      className="award-image-card-img"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', color: '#64748B' }}>
              <Loader2 size={40} className="animate-spin" style={{ color: '#ec4899', marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
              <p>Loading recognition & press data from server...</p>
            </div>
          )}

          <div className="awards-trust-banner">
            <div className="trust-banner-left">
              <Award size={28} className="trust-ribbon-icon" />
              <div>
                <h4>Verified Google & Meta Business Partner</h4>
                <p>Scan our official agency QR code or verify live accreditation records.</p>
              </div>
            </div>
            <button
              className="btn-verify-qr-cert"
              onClick={() => navigate('/contact')}
            >
              <span>Verify Agency Credentials</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </section>

      {/* 3. Core Values Section */}
      <section className="about-values-section">
        <div className="about-container">
          <div className="section-header-center">
            <div className="section-pill">OUR CORE VALUES</div>
            <h2 className="section-title">
              The Principles That Drive <span className="highlight-pink">Every Campaign</span>
            </h2>
            <p className="section-subtitle">
              These fundamental values guide our team, shape our culture, and ensure every client receives exceptional results.
            </p>
          </div>

          <div className="values-grid">
            {aboutValues.map((val, idx) => (
              <div key={idx} className="value-card">
                <div className="value-card-header">
                  <div className="value-icon-box">{val.icon}</div>
                  <span className="value-tag-badge">{val.tag}</span>
                </div>
                <h3 className="value-title">{val.title}</h3>
                <p className="value-description">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call To Action (CTA) Section */}
      <section className="about-cta-section">
        <div className="about-container">
          <div className="about-cta-card">
            <div className="cta-glow glow-left"></div>
            <div className="cta-glow glow-right"></div>

            <div className="cta-content">
              <span className="cta-pill">READY TO ESCALATE YOUR BRAND?</span>
              <h2 className="cta-title">
                Let’s Build Something <br className="cta-title-br" /><span className="highlight-pink">Extraordinary</span> Together
              </h2>
              <p className="cta-text">
                Schedule a free 30-minute growth strategy consultation with our senior team.
                We’ll audit your current digital footprint and reveal untapped growth channels.
              </p>

              <div className="cta-buttons flex-row">
                <a
                  href="/contact-us"
                  className="btn-cta-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenAuditModal) {
                      onOpenAuditModal();
                    } else {
                      navigate('/contact-us', { state: { service: 'Free Digital Marketing Audit', scrollToForm: true } });
                    }
                  }}
                >
                  <span>Claim Your Free Audit</span>
                  <ArrowRight size={18} />
                </a>

                <button
                  className="btn-cta-secondary"
                  onClick={() => navigate('/services')}
                >
                  <span>Explore All Services</span>
                </button>
              </div>

              <div className="cta-trust-items">
                <span>✓ No Obligation</span>
                <span>✓ 100% Customized Roadmap</span>
                <span>✓ Direct Strategist Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPUP MODAL */}
      {selectedRecognitionModal && (
        <div
          className="recognition-modal-backdrop"
          onClick={() => { setSelectedRecognitionModal(null); setImageOnlyView(false); }}
        >
          <div className="recognition-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="btn-modal-close"
              onClick={() => { setSelectedRecognitionModal(null); setImageOnlyView(false); }}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {imageOnlyView ? (
              <div className="modal-image-only-view">
                <img
                  src={selectedRecognitionModal.image}
                  alt={selectedRecognitionModal.title}
                  className="modal-image-only-img"
                />
              </div>
            ) : (
              <div className="recognition-modal-body">
                <div className="modal-image-col">
                  <div className="modal-img-frame">
                    <img
                      src={selectedRecognitionModal.image}
                      alt={selectedRecognitionModal.title}
                      className="modal-full-view-image"
                    />
                  </div>
                </div>

                <div className="modal-info-col">
                  <div className="modal-icon-wrapper">
                    {selectedRecognitionModal.icon}
                  </div>

                  <span className="modal-year-pill">{selectedRecognitionModal.year}</span>
                  <span className="modal-issuer-pill">{selectedRecognitionModal.issuer}</span>

                  <h3 className="modal-item-title">{selectedRecognitionModal.title}</h3>
                  <p className="modal-item-desc">{selectedRecognitionModal.description}</p>

                  <div className="modal-footer-actions">
                    <button
                      className="btn-modal-verify-cert"
                      onClick={() => setImageOnlyView(true)}
                    >
                      <span>View Award / Certificate</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
