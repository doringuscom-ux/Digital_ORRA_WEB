import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, HelpCircle, MessageSquare, ArrowRight, Sparkles, Lightbulb, PhoneCall } from 'lucide-react';
import './FaqsPage.css';

export default function FaqsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const categories = ['All', 'General', 'Digital Marketing', 'IT & Web Solutions', 'Academy & Courses', 'Pricing & ROI'];

  const faqs = [
    {
      category: 'General',
      question: 'What makes Digital Orra different from traditional agencies?',
      answer: 'Digital Orra combines performance-driven growth marketing with cutting-edge IT development and AI search optimization (GEO/AEO). We focus strictly on measurable ROI, transparent metrics, and custom tech solutions built specifically for your brand.'
    },
    {
      category: 'General',
      question: 'Where is Digital Orra located and do you serve international clients?',
      answer: 'Our headquarters are located in India, and we serve clients globally across USA, UK, UAE, Australia, and Asia with 24/7 dedicated support teams.'
    },
    {
      category: 'Digital Marketing',
      question: 'How fast can we expect results from Meta & Google Ads campaigns?',
      answer: 'Initial campaign optimization and audience testing usually yield actionable leads within the first 7 to 14 days. Scaling for maximum ROI occurs progressively over 30 to 60 days.'
    },
    {
      category: 'Digital Marketing',
      question: 'What is Generative Engine Optimization (GEO) & Answer Engine Optimization (AEO)?',
      answer: 'GEO & AEO ensure your business appears as the top recommended answer inside AI search engines like ChatGPT, Perplexity, Gemini, and Google SGE rather than traditional link listings.'
    },
    {
      category: 'IT & Web Solutions',
      question: 'What tech stack do you use for web & mobile application development?',
      answer: 'We specialize in modern full-stack technologies including React, Next.js, Node.js, Python, Flutter, MERN stack, Shopify, WordPress, and AWS cloud infrastructure.'
    },
    {
      category: 'IT & Web Solutions',
      question: 'Do you provide maintenance and updates after launching a website or app?',
      answer: 'Yes! All our software & web development packages include 3 to 12 months of post-launch maintenance, security patches, performance monitoring, and SLA uptime guarantees.'
    },
    {
      category: 'Academy & Courses',
      question: 'Does Digital Orra Academy guarantee job placement assistance?',
      answer: 'Yes. Our advanced courses include 100% placement support, live client project experience, mock interviews, resume building, and direct hiring referrals to our partner network.'
    },
    {
      category: 'Academy & Courses',
      question: 'Are classes available online or offline?',
      answer: 'We provide flexible hybrid learning models with live interactive online cohorts as well as hands-in-person workshops.'
    },
    {
      category: 'Pricing & ROI',
      question: 'How do you structure your agency pricing?',
      answer: 'We offer flexible retainer models, project-based flat rates, and performance-based commission tiers depending on your growth objectives.'
    },
    {
      category: 'Pricing & ROI',
      question: 'Can I get a custom audit before committing to a contract?',
      answer: 'Absolutely! We offer a free 360-degree digital audit for your website, ad accounts, and SEO presence with no obligations.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="faqs-page">
      <div className="faqs-orb faqs-orb-1"></div>
      <div className="faqs-orb faqs-orb-2"></div>

      <div className="faqs-container">
        {/* Header */}
        <div className="faqs-header">
          <div className="faqs-pill">
            <HelpCircle size={15} />
            <span>KNOWLEDGE BASE & FAQS</span>
          </div>
          <h1 className="faqs-title">
            FREQUENTLY ASKED <span className="highlight-gradient">QUESTIONS</span>
          </h1>
          <p className="faqs-subtitle">
            Find instant answers regarding our marketing strategies, IT development process, academy courses, and agency partnership.
          </p>
        </div>

        {/* Search Input */}
        <div className="faqs-search-wrapper">
          <Search size={20} className="faqs-search-icon" />
          <input
            type="text"
            className="faqs-search-input"
            placeholder="Search any question, topic, or capability..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="faqs-categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`faq-cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="faqs-accordion-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-question-btn"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  >
                    <span className="faq-question-text">
                      <span className="faq-q-badge">Q{idx + 1}.</span>
                      <span className="faq-question-title-span">{faq.question}</span>
                    </span>
                    <div className="faq-toggle-icon">
                      <ChevronDown size={18} />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94A3B8' }}>
              No matching questions found for "{searchQuery}".
            </div>
          )}
        </div>

        {/* Attractive "Still Thinking & Confused?" Interactive Section */}
        <div className="thinking-confused-card">
          <div className="confused-glow-orb orb-left"></div>
          <div className="confused-glow-orb orb-right"></div>

          <div className="confused-top-badge">
            <HelpCircle size={18} className="brain-pulse-icon" />
            <span>STILL THINKING & CONFUSED?</span>
            <Sparkles size={16} className="sparkle-spin-icon" />
          </div>

          <h2 className="confused-main-title">
            Not Sure Which Strategy or Service <span className="highlight-gradient">Fits Your Business?</span>
          </h2>

          <p className="confused-desc">
            Choosing the right marketing channels or tech stack can be overwhelming. We're here to simplify everything with clear roadmap guidance.
          </p>

          {/* Common Confusion Scenarios Pills */}
          <div className="confusion-pills-row">
            <div className="confusion-pill">
              <Lightbulb size={16} className="pill-icon yellow" />
              <span>Which ad platform gives the highest ROI?</span>
            </div>
            <div className="confusion-pill">
              <HelpCircle size={16} className="pill-icon pink" />
              <span>Should I build a Web App or Custom ERP?</span>
            </div>
            <div className="confusion-pill">
              <Sparkles size={16} className="pill-icon cyan" />
              <span>How do GEO & AEO AI search work?</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="confused-actions">
            <button className="faqs-cta-btn primary-glow-btn" onClick={() => navigate('/contact-us')}>
              <PhoneCall size={18} />
              <span>Book Free 1-on-1 Consultation</span>
              <ArrowRight size={18} />
            </button>

            <a
              href="https://wa.me/916280458005"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-quick-btn"
            >
              <MessageSquare size={18} />
              <span>Instant WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
