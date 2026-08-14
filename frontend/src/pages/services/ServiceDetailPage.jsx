import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  ShieldCheck, 
  Rocket, 
  HelpCircle, 
  Zap, 
  BarChart3,
  Layers,
  Clock,
  Star
} from 'lucide-react';
import { servicesData, getServiceByIdOrSlug } from '../../data/servicesData';
import { useData } from '../../context/DataContext';
import './ServiceDetailPage.css';

export default function ServiceDetailPage({ serviceId, serviceIdOverride, onNavigate, onSelectService }) {
  const { serviceId: paramServiceId } = useParams();
  const navigate = useNavigate();
  const { services: dynamicServices } = useData() || {};
  const activeServiceId = serviceIdOverride || paramServiceId || serviceId || 'social-media-handling';
  const currentService = getServiceByIdOrSlug(activeServiceId, dynamicServices);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Scroll to top whenever active service changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpenFaqIndex(0);
  }, [activeServiceId]);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleTopicSwitch = (newService) => {
    navigate(`/service/${newService.id}`);
  };

  return (
    <div className="service-detail-page-wrapper">
      
      {/* 1. HERO SECTION */}
      <section className="service-detail-hero">
        <div className="detail-hero-glow glow-1"></div>
        <div className="detail-hero-glow glow-2"></div>

        <div className="service-detail-container">
          
          {/* Breadcrumbs Navigation */}
          <div className="detail-breadcrumbs">
            <span className="breadcrumb-link" onClick={() => navigate('/services')}>Services</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{currentService.title}</span>
          </div>

          <div className="detail-hero-grid">
            
            {/* Left Content */}
            <div className="detail-hero-left">
              <div className="detail-category-pill">
                <span className="pill-dot"></span>
                <span>{currentService.category}</span>
                <span className="pill-divider">•</span>
                <span className="pill-tag">{currentService.tag}</span>
              </div>

              <h1 className="detail-hero-title">
                {currentService.title}
              </h1>

              <p className="detail-hero-description">
                {currentService.fullDesc}
              </p>

              {/* Action Buttons */}
              <div className="detail-hero-actions">
                <a 
                  href="/contact" 
                  className="btn-detail-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/contact', { state: { service: currentService.title, scrollToForm: true } });
                  }}
                >
                  <span>Get Free {currentService.title} Audit</span>
                  <div className="btn-arrow-circle">
                    <ArrowRight size={16} />
                  </div>
                </a>

                <button 
                  className="btn-detail-secondary"
                  onClick={() => navigate('/services')}
                >
                  <span>Explore Other Services</span>
                </button>
              </div>

            </div>

            {/* Right Interactive Card / Key Stats */}
            <div className="detail-hero-right">
              <div className="detail-feature-card-frame">
                
                <div className="card-top-header">
                  <div className="card-service-icon">
                    {currentService.icon}
                  </div>
                  <div className="card-badge">
                    <Star size={14} fill="#E6007E" color="#E6007E" />
                    <span>Top Rated Solution</span>
                  </div>
                </div>

                <h3 className="card-headline">Proven Results & Impact</h3>

                {/* Stat Metrics Grid */}
                <div className="detail-stats-grid">
                  {(Array.isArray(currentService.stats) ? currentService.stats : [
                    { label: 'Avg ROAS Growth', value: '4.5x' },
                    { label: 'Client Satisfaction', value: '99%' },
                    { label: 'Campaign Scale', value: '10M+' }
                  ]).map((st, sIdx) => (
                    <div key={sIdx} className="detail-stat-box">
                      <span className="stat-val">{st.value}</span>
                      <span className="stat-lbl">{st.label}</span>
                    </div>
                  ))}
                </div>

                {/* Key Bullet Features */}
                <div className="card-bullet-list">
                  {(Array.isArray(currentService.features) ? currentService.features : ['Performance Strategy', 'Creative Ad Production', '24/7 Analytics & ROI']).map((ft, fIdx) => (
                    <div key={fIdx} className="bullet-item">
                      <CheckCircle2 size={16} className="bullet-check-icon" />
                      <span>{ft}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. DYNAMIC TOPIC SWITCHER BAR */}
      <section className="topics-nav-strip" id="all-topics-bar">
        <div className="service-detail-container">
          <div className="strip-header">
            <span className="strip-title">Switch Service Topic ({servicesData.length} Core Services Available):</span>
          </div>

          <div className="topics-scroll-row">
            {servicesData.map((item) => {
              const isActive = item.id === currentService.id;
              return (
                <button
                  key={item.id}
                  className={`topic-pill-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleTopicSwitch(item)}
                >
                  <span className="topic-icon">{item.icon}</span>
                  <span className="topic-name">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. KEY DELIVERABLES SECTION */}
      <section className="service-deliverables-section">
        <div className="service-detail-container">
          
          <div className="section-header-center">
            <div className="section-pill-badge">WHAT WE DELIVER</div>
            <h2 className="section-main-title">
              What You Get With <span className="highlight-pink">{currentService.title}</span>
            </h2>
            <p className="section-sub-text">
              Comprehensive, transparent, and result-oriented deliverables designed for rapid market execution.
            </p>
          </div>

          <div className="deliverables-grid">
            {(Array.isArray(currentService.deliverables) ? currentService.deliverables : [
              { title: 'Custom Strategy Blueprint', desc: 'Tailored execution roadmap aligned with your business goals.' },
              { title: 'High-Converting Assets', desc: 'Eye-catching design, copywriting, and media production.' },
              { title: 'Dedicated Management', desc: 'Proactive account monitoring, optimization, and scaling.' },
              { title: 'Transparent Reporting', desc: 'Real-time performance tracking and actionable monthly reports.' }
            ]).map((del, idx) => (
              <div key={idx} className="deliverable-card">
                <div className="deliverable-number">0{idx + 1}</div>
                <div className="deliverable-content">
                  <h3 className="deliverable-title">{del.title}</h3>
                  <p className="deliverable-desc">{del.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. EXECUTION PROCESS STEP-BY-STEP */}
      <section className="service-process-section">
        <div className="service-detail-container">
          
          <div className="section-header-center">
            <div className="section-pill-badge">OUR WORKFLOW</div>
            <h2 className="section-main-title">
              How We Execute <span className="highlight-pink">{currentService.title}</span>
            </h2>
            <p className="section-sub-text">
              A systematic 4-step framework engineered to minimize risk and maximize measurable growth.
            </p>
          </div>

          <div className="process-steps-grid">
            {(Array.isArray(currentService.process) ? currentService.process : [
              { step: '01', title: 'Audit & Market Research', desc: 'Analyzing existing assets, competitor gaps, and customer intent.' },
              { step: '02', title: 'Strategy Architecture', desc: 'Building high-converting funnels and creative frameworks.' },
              { step: '03', title: 'Execution & Publishing', desc: 'Deploying campaigns, managing budgets, and optimizing ads.' },
              { step: '04', title: 'Scaling & Optimization', desc: 'Iterating on winning assets to double your return on investment.' }
            ]).map((stepItem, pIdx) => (
              <div key={pIdx} className="process-step-card">
                <div className="step-badge">{stepItem.step}</div>
                <h3 className="step-title">{stepItem.title}</h3>
                <p className="step-desc">{stepItem.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="service-faq-section">
        <div className="service-detail-container">
          
          <div className="section-header-center">
            <div className="section-pill-badge">QUICK ANSWERS</div>
            <h2 className="section-main-title">
              Frequently Asked <span className="highlight-pink">Questions</span>
            </h2>
            <p className="section-sub-text">
              Everything you need to know about our {currentService.title} services.
            </p>
          </div>

          <div className="faq-accordion-wrapper">
            {(Array.isArray(currentService.faqs) ? currentService.faqs : [
              { q: 'How soon can we see results?', a: 'Initial campaign insights emerge within 7-14 days of launch.' },
              { q: 'Do you provide monthly reports?', a: 'Yes! You receive a dedicated performance dashboard and detailed monthly reports.' }
            ]).map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div key={fIdx} className={`faq-item-box ${isOpen ? 'open' : ''}`}>
                  <button 
                    className="faq-question-btn"
                    onClick={() => toggleFaq(fIdx)}
                  >
                    <span className="faq-question-text">{faq.q}</span>
                    <div className="faq-toggle-icon">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-pane">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION BANNER */}
      <section className="service-cta-banner-section">
        <div className="service-detail-container">
          <div className="service-cta-card">
            
            <div className="cta-glow-left"></div>
            <div className="cta-glow-right"></div>

            <div className="cta-content-box">
              <span className="cta-pill-label">READY TO ELEVATE YOUR BRAND?</span>
              
              <h2 className="cta-title-text">
                Let's Scale Your Brand With <span className="highlight-pink">{currentService.title}</span>
              </h2>

              <p className="cta-sub-text">
                Book a complimentary 30-minute growth session with our senior digital strategists. 
                We'll analyze your current footprint and build a tailored roadmap.
              </p>

              <div className="cta-buttons-row">
                <a 
                  href="/contact" 
                  className="btn-cta-pink"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/contact', { state: { service: currentService.title, scrollToForm: true } });
                  }}
                >
                  <span>Claim Your Strategy Audit</span>
                  <ArrowRight size={18} />
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
