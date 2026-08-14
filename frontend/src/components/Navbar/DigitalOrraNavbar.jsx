import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  Code,
  Search,
  Share2,
  Target,
  Palette,
  Video,
  TrendingUp,
  Megaphone,
  Bot,
  Zap,
  Cpu,
  MousePointer,
  MessageSquare,
  Smartphone,
  Users,
  Award,
  Database,
  ArrowRight,
  ArrowLeft,
  Send,
  Globe,
  Camera,
  ThumbsUp,
  PlaySquare,
  Share,
  Briefcase,
  Download,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import './DigitalOrraNavbar.css';

// Social media platform options for Step 1
const socialPlatforms = [
  { id: 'youtube', label: 'YouTube', icon: <PlaySquare size={22} />, color: '#FF0000', bg: '#FFF1F1' },
  { id: 'website', label: 'Website', icon: <Globe size={22} />, color: '#10B981', bg: '#ECFDF5' },
  /* 
  { id: 'instagram', label: 'Instagram', icon: <Camera size={22} />, color: '#E1306C', bg: '#FDF0F4' },
  { id: 'facebook',  label: 'Facebook',  icon: <ThumbsUp size={22} />, color: '#1877F2', bg: '#EFF6FF' },
  { id: 'twitter',   label: 'X (Twitter)', icon: <Share size={22} />, color: '#1DA1F2', bg: '#EFF8FF' },
  { id: 'linkedin',  label: 'LinkedIn',  icon: <Briefcase size={22} />, color: '#0A66C2', bg: '#EFF6FF' },
  */
];


import { useData } from '../../context/DataContext';

export default function DigitalOrraNavbar({ activePage, onNavigate, onSelectService, isAuditModalOpen, setIsAuditModalOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { addLead, services: dynamicServices } = useData() || {};
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Audit popup states
  const [localAuditModal, setLocalAuditModal] = useState(false);
  const auditModal = isAuditModalOpen !== undefined ? isAuditModalOpen : localAuditModal;
  const setAuditModal = (val) => {
    if (setIsAuditModalOpen) setIsAuditModalOpen(val);
    setLocalAuditModal(val);
  };

  const [auditStep, setAuditStep] = useState(1);         // 1 = platforms, 2 = form
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [formData, setFormData] = useState({ url: '', name: '', mobile: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [backendRedirectLink, setBackendRedirectLink] = useState('https://digitalorra.com');

  // Fetch global config like audit redirect link from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:5000/api`}/config`)
      .then(res => res.json())
      .then(data => {
        if (data && data.auditRedirectLink) {
          setBackendRedirectLink(data.auditRedirectLink);
        }
      })
      .catch(() => {});
  }, []);

  // Auto-hide navbar on scroll
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollUpAcc = useRef(0);   // accumulated upward scroll distance
  const isMobileOpenRef = useRef(isMobileOpen);

  // Keep ref in sync with state
  useEffect(() => { isMobileOpenRef.current = isMobileOpen; }, [isMobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (isMobileOpenRef.current) {
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY < 80) {
        // Always visible near top of page
        setIsVisible(true);
        scrollUpAcc.current = 0;
      } else if (delta < 0) {
        // Scrolling UP — accumulate and show after 5px total upward scroll
        scrollUpAcc.current += Math.abs(delta);
        if (scrollUpAcc.current >= 5) {
          setIsVisible(true);
        }
      } else if (delta > 0) {
        // Scrolling DOWN — hide after 80px downward scroll (avoids jitter on bumps)
        scrollUpAcc.current = 0;
        if (currentScrollY > 80 && delta > 2) {
          setIsVisible(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // stable — single listener, no re-registration

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openAuditModal = () => {
    setAuditModal(true);
    setAuditStep(1);
    setSelectedPlatform(null);
    setFormData({ url: '', name: '', mobile: '' });
    setAuditResult(null);
    setIsAuditing(false);
    setFormSubmitted(false);
  };

  const closeModal = () => {
    setAuditModal(false);
    setAuditStep(1);
    setSelectedPlatform(null);
    setAuditResult(null);
    setIsAuditing(false);
    setFormSubmitted(false);
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    setAuditStep(2);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsAuditing(true);

    setTimeout(() => {
      setIsAuditing(false);
      setFormSubmitted(true);

      if (addLead) {
        addLead({
          type: 'Audit Request',
          platform: selectedPlatform?.label || 'General',
          name: formData.name,
          email: 'N/A',
          phone: formData.mobile,
          url: formData.url,
          message: 'Requested Strategy Consultation'
        });
      }
    }, 1200);
  };



  const servicesList = [
    { id: 'social-media-handling', title: 'Social Media Handling', icon: <Share2 size={16} /> },
    { id: 'performance-marketing', title: 'Performance Marketing', icon: <TrendingUp size={16} /> },
    { id: 'web-app-development', title: 'Web & App Development', icon: <Code size={16} /> },
    { id: 'meta-ads', title: 'Meta Ads', icon: <Megaphone size={16} /> },
    { id: 'seo-search-engine-optimization', title: 'SEO Growth', icon: <Search size={16} /> },
    { id: 'aeo-answer-engine-optimization', title: 'AEO (Answer Engine)', icon: <Bot size={16} /> },
    { id: 'geo-generative-engine-optimization', title: 'GEO (Generative Engine)', icon: <Zap size={16} /> },
    { id: 'aio-artificial-intelligence-optimization', title: 'AIO (AI Optimization)', icon: <Cpu size={16} /> },
    { id: 'sxo-search-experience-optimization', title: 'SXO (Search UX)', icon: <MousePointer size={16} /> },
    { id: 'whatsapp-integration', title: 'WhatsApp Integration', icon: <MessageSquare size={16} /> },
    { id: 'ugc-creator-content', title: 'UGC Creator Content', icon: <Video size={16} /> },
    { id: 'influencer-marketing', title: 'Influencer Marketing', icon: <Users size={16} /> },
    { id: 'celebrity-endorsement', title: 'Celebrity Endorsement', icon: <Award size={16} /> },
    { id: 'google-ads-ppc', title: 'Google Ads (PPC)', icon: <Target size={16} /> },
    { id: 'graphic-designing', title: 'Graphic Designing', icon: <Palette size={16} /> },
    { id: 'corporate-video-shoots', title: 'Corporate Video Shoots', icon: <Video size={16} /> },
    { id: 'crm-erp-solutions', title: 'CRM & ERP Solutions', icon: <Database size={16} /> },
    { id: '360-virtual-tour', title: '360° Virtual Tour', icon: <Globe size={16} /> },
  ];

  const getNavServiceIcon = (service) => {
    if (React.isValidElement(service.icon)) return service.icon;
    const match = servicesList.find(s => s.id === service.id || s.title === service.title);
    if (match && React.isValidElement(match.icon)) return match.icon;
    return <Globe size={16} />;
  };

  const activeServicesList = (dynamicServices && dynamicServices.length > 0)
    ? dynamicServices.map(s => ({
        id: (s.id && !/^[0-9a-fA-F]{24}$/.test(s.id)) ? s.id : s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: s.title,
        icon: getNavServiceIcon(s)
      }))
    : servicesList;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: 'about-us' },
    { name: 'Services', path: '/services', hasDropdown: true },
    
    { name: 'Courses', path: '/courses' },
    { name: 'Blog', path: '/blog' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Career', path: '/join-our-team' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setIsMobileOpen(false);
    setIsServicesOpen(false);

    if (item.name === 'Portfolio') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const elem = document.getElementById('portfolio');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const elem = document.getElementById('portfolio');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(item.path);
    }
  };

  const isLinkActive = (item) => {
    const currentPath = location.pathname;
    if (item.name === 'Home' && currentPath === '/') return true;
    if (item.name === 'About us' && (currentPath === '/about-us' || currentPath === '/about')) return true;
    if (item.name === 'Services' && (currentPath.startsWith('/services') || currentPath.startsWith('/service/'))) return true;
    if (item.name === 'Courses' && (currentPath.startsWith('/courses') || currentPath.startsWith('/course/'))) return true;
    if (item.name === 'Blog' && (currentPath.startsWith('/blog') || currentPath.startsWith('/post/'))) return true;
    if (item.name === 'Gallery' && currentPath === '/gallery') return true;
    if (item.name === 'Career' && (currentPath === '/join-our-team' || currentPath === '/career')) return true;
    if (item.name === 'Contact Us' && (currentPath === '/contact-us' || currentPath === '/contact')) return true;
    return false;
  };

  return (
    <>
      <header className={`digitalorra-header ${!isVisible ? 'header-hidden' : ''}`}>
        <div className="digitalorra-navbar-container">

          {/* Logo */}
          <a href="/" className="digitalorra-logo-link" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <img src="/logo.png" alt="Digital Orra Logo" className="digitalorra-logo-img" />
          </a>

          {/* Center Navigation Links */}
          <nav className="digitalorra-desktop-nav">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="nav-item-wrapper"
                onMouseEnter={() => item.hasDropdown && setIsServicesOpen(true)}
                onMouseLeave={() => item.hasDropdown && setIsServicesOpen(false)}
              >
                <a
                  href={item.path}
                  className={`digitalorra-nav-link ${isLinkActive(item) ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown size={14} className={`dropdown-chevron ${isServicesOpen ? 'rotated' : ''}`} />
                  )}
                </a>

                {/* Mega Dropdown for Services */}
                {item.hasDropdown && isServicesOpen && (
                  <div className="services-dropdown-popover">
                    <div className="services-dropdown-grid">
                      {activeServicesList.map((service, idx) => (
                        <a
                          key={idx}
                          href={`/service/${service.id}`}
                          className="service-card-item"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/service/${service.id}`);
                            setIsServicesOpen(false);
                          }}
                        >
                          <div className="service-icon-box">{service.icon}</div>
                          <div className="service-text-box">
                            <span className="nav-dropdown-service-title">{service.title}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right CTA Button */}
          <div className="digitalorra-actions">
            <button
              className="btn-preferred-google"
              onClick={openAuditModal}
            >
              Book a Free Audit
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className="digitalorra-mobile-toggle"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`digitalorra-mobile-drawer ${isMobileOpen ? 'open' : ''}`}>
          <div className="mobile-drawer-content">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`mobile-drawer-link ${isLinkActive(item) ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.name}
              </a>
            ))}
            <div className="mobile-cta-wrapper">
              <button
                className="btn-preferred-google mobile-cta"
                onClick={() => { setIsMobileOpen(false); openAuditModal(); }}
              >
                Book a Free Audit
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────── AUDIT POPUP MODAL ─────────── */}
      {auditModal && (
        <div className="audit-modal-backdrop" onClick={closeModal}>
          <div className="audit-modal-box" onClick={(e) => e.stopPropagation()}>

            {/* Close */}
            <button className="audit-modal-close" onClick={closeModal} aria-label="Close">
              <X size={18} />
            </button>

            {/* STEP 1: Choose Platform */}
            {auditStep === 1 && (
              <div className="audit-step audit-step-1">
                <div className="audit-modal-header">
                  <span className="audit-step-label">Step 1 of 2</span>
                  <h3 className="audit-modal-title">Select Your Platform</h3>
                  <p className="audit-modal-sub">Choose the social media you want audited for free</p>
                </div>

                <div className="audit-platforms-grid">
                  {socialPlatforms.map((p) => (
                    <button
                      key={p.id}
                      className="audit-platform-btn"
                      style={{ '--p-color': p.color, '--p-bg': p.bg }}
                      onClick={() => handlePlatformSelect(p)}
                    >
                      <span className="audit-platform-icon">{p.icon}</span>
                      <span className="audit-platform-label">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Form Input */}
            {auditStep === 2 && !formSubmitted && !isAuditing && (
              <div className="audit-step audit-step-2">
                <button className="audit-back-btn" onClick={() => setAuditStep(1)}>
                  <ArrowLeft size={15} /> Back
                </button>

                <div className="audit-modal-header">
                  <span className="audit-step-label">Step 2 of 2</span>
                  <div className="audit-platform-chosen" style={{ '--p-color': selectedPlatform?.color, '--p-bg': selectedPlatform?.bg }}>
                    <span className="audit-chosen-icon">{selectedPlatform?.icon}</span>
                    <span>{selectedPlatform?.label} Audit</span>
                  </div>
                  <h3 className="audit-modal-title">Enter URL & Details</h3>
                  <p className="audit-modal-sub">Get your deep performance audit report & PDF instant download</p>
                </div>

                <form className="audit-form" onSubmit={handleFormSubmit}>
                  <div className="audit-field">
                    <label>{selectedPlatform?.label || 'Website'} URL</label>
                    <input
                      type="text"
                      placeholder={selectedPlatform?.id === 'youtube' ? 'https://youtube.com/@yourchannel' : 'https://yourwebsite.com'}
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      required
                    />
                  </div>
                  <div className="audit-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="audit-field">
                    <label>Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="audit-submit-btn">
                    <BarChart3 size={18} />
                    <span>Run Deep Audit Scan</span>
                  </button>
                </form>
              </div>
            )}

            {/* STEP 2 LOADING: Scanning Animation */}
            {isAuditing && (
              <div className="audit-step audit-scanning-box">
                <div className="audit-scan-spinner"></div>
                <h3 className="audit-modal-title">Analyzing URL & Metrics...</h3>
                <p className="audit-modal-sub">Auditing SEO, Page Speed, Core Web Vitals & Security metrics</p>
              </div>
            )}

            {/* STEP 3: Audit Submitted Success & Redirect Link */}
            {formSubmitted && (
              <div className="audit-step audit-step-success" style={{ textAlign: 'center', padding: '30px 20px' }}>
                <CheckCircle2 size={54} color="#22C55E" style={{ margin: '0 auto 16px' }} />
                <h3 className="audit-modal-title" style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Audit Request Submitted!</h3>
                <p className="audit-modal-sub" style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '24px' }}>
                  Our performance marketing experts are analyzing your URL. Click below to access your audit report/deck.
                </p>

                {/* External Link configured via backend/.env or frontend/.env */}
                <a
                  href={backendRedirectLink || import.meta.env.VITE_AUDIT_REDIRECT_LINK || 'https://digitalorra.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="audit-download-btn"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                  <ExternalLink size={18} />
                  <span>View / Access Audit Strategy Deck</span>
                </a>

                <div style={{ marginTop: '20px' }}>
                  <button
                    type="button"
                    className="audit-reset-btn"
                    onClick={() => {
                      setFormSubmitted(false);
                      setAuditStep(2);
                      setFormData({ ...formData, url: '' });
                    }}
                  >
                    <RefreshCw size={14} /> Submit Another Audit Request
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
