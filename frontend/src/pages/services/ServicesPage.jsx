import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, 
  Search, 
  Share2, 
  Target, 
  Video, 
  MessageSquare, 
  Smartphone, 
  Users, 
  Award, 
  Megaphone, 
  TrendingUp, 
  Zap, 
  Bot, 
  Cpu, 
  MousePointer, 
  Palette, 
  Database,
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { servicesData } from '../../data/servicesData';
import ScrollRowAnimateCard from '../../components/Common/ScrollRowAnimateCard';
import ServerErrorNotice from '../../components/Common/ServerErrorNotice';
import './ServicesPage.css';

const iconMap = {
  'social-media-handling': <Share2 size={26} />,
  'performance-marketing': <TrendingUp size={26} />,
  'google-ads-ppc': <Target size={26} />,
  'seo-search-engine-optimization': <Search size={26} />,
  'meta-ads': <Megaphone size={26} />,
  'geo-generative-engine-optimization': <Cpu size={26} />,
  'aeo-answer-engine-optimization': <Zap size={26} />,
  'aio-artificial-intelligence-optimization': <Bot size={26} />,
  'sxo-search-experience-optimization': <MousePointer size={26} />,
  'influencer-marketing': <Users size={26} />,
  'celebrity-endorsement-pr': <Award size={26} />,
  'corporate-video-shoots': <Video size={26} />,
  'ugc-creator-content': <Video size={26} />,
  'graphic-designing': <Palette size={26} />,
  'web-app-development': <Globe size={26} />,
  'web-development': <Globe size={26} />,
  'app-development': <Smartphone size={26} />,
  'crm-erp-solutions': <Database size={26} />,
  'whatsapp-integration': <MessageSquare size={26} />,
  '360-virtual-tour': <Globe size={26} />
};

export default function ServicesPage() {
  const navigate = useNavigate();
  const { services } = useData() || {};
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const getServiceIcon = (service) => {
    if (React.isValidElement(service.icon)) return service.icon;
    if (service.id && iconMap[service.id]) return iconMap[service.id];
    const found = servicesData.find(s => s.id === service.id);
    if (found && React.isValidElement(found.icon)) return found.icon;
    return <Globe size={26} />;
  };

  const categories = [
    'All',
    'Performance',
    'Search & AI',
    'Social & Brand',
    'Development',
    'Automation'
  ];

  const activeServices = (services && services.length > 0) ? services : servicesData;

  const filteredServices = activeServices.filter((service) => {
    const matchesCategory = activeFilter === 'All' || service.category === activeFilter;
    const matchesSearch = !searchTerm ||
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.tag.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCardClick = (service) => {
    const slug = (service.id && !/^[0-9a-fA-F]{24}$/.test(service.id))
      ? service.id 
      : service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    navigate(`/service/${slug}`);
  };

  return (
    <div className="services-page">
      {/* Hero Banner */}
      <section className="services-page-hero">
        <div className="services-page-hero-container">
          <span className="services-page-badge">OUR COMPLETE CAPABILITIES</span>
          <h1 className="services-page-title">
            All Core Services & <br className="mobile-title-br" /><span className="highlight-pink">Digital Growth Solutions</span>
          </h1>
          <p className="services-page-sub">
            Explore all performance-driven services designed to scale your revenue, brand reach, and digital footprint.
          </p>

          {/* Search Box */}
          <div className="services-search-box">
            <Search size={18} className="services-search-icon" />
            <input
              type="text"
              placeholder="Search services (e.g. SEO, Meta Ads, Web Development)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="services-page-content">
        <div className="services-page-container">

          {/* Category Filter Pills */}
          <div className="services-page-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`sp-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* All Services Grid with Scroll Alternating Animations */}
          <div className="services-page-grid">
            {filteredServices.map((service, sIdx) => (
              <ScrollRowAnimateCard
                key={service.id}
                index={sIdx}
                itemsPerRow={3}
                className="sp-card-box"
                onClick={() => handleCardClick(service)}
              >
                {/* Top Header: Icon & Category Tag */}
                <div className="sp-card-top">
                  <div className="sp-icon-box">
                    {getServiceIcon(service)}
                  </div>
                  <span className="sp-tag-badge">{service.tag}</span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="sp-card-title">{service.title}</h3>
                <p className="sp-card-desc">{service.desc}</p>

                {/* Feature Deliverables List */}
                <ul className="sp-feature-list">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="sp-feature-item">
                      <CheckCircle2 size={14} className="sp-check-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Action CTA */}
                <button className="sp-btn-details">
                  <span>Explore Service</span>
                  <ArrowRight size={14} />
                </button>
              </ScrollRowAnimateCard>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
