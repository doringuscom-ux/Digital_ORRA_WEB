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
import './ServicesSection.css';

const iconMap = {
  'social-media-handling': <Share2 size={28} />,
  'search-engine-optimization': <TrendingUp size={28} />,
  'video-editing-shoots': <Video size={28} />,
  'graphic-designing': <Palette size={28} />,
  'website-development': <Globe size={28} />,
  'app-development': <Smartphone size={28} />,
  'influencer-marketing': <Users size={28} />,
  'crm-erp-solutions': <Database size={28} />,
  'whatsapp-integration': <MessageSquare size={28} />
};

export default function ServicesSection({ onSelectService }) {
  const navigate = useNavigate();
  const { services } = useData() || {};
  const [selectedService, setSelectedService] = useState(null);

  const handleCardClick = (service) => {
    const slug = (service.id && !/^[0-9a-fA-F]{24}$/.test(service.id))
      ? service.id 
      : service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    navigate(`/service/${slug}`);
  };

  const getServiceIcon = (service) => {
    if (React.isValidElement(service.icon)) return service.icon;
    if (iconMap[service.id]) return iconMap[service.id];
    return <Globe size={28} />;
  };

  const activeServices = (services && services.length > 0) ? services : servicesData;
  // Duplicate for seamless infinite marquee scroll loop
  const marqueeList = [...activeServices, ...activeServices, ...activeServices];

  return (
    <section className="digitalorra-services" id="services">
      
      <div className="services-container">
        
        {/* Section Header */}
        <div className="services-header">
          <div className="services-pill-badge">
            <span>OUR CORE SERVICES</span>
          </div>

          <h2 className="services-main-title">
            Tailored Digital <span className="highlight">Growth Solutions</span>
          </h2>

          <p className="services-subtitle">
            Engineered to scale revenue, build brand authority, and deliver high-ROAS marketing results.
          </p>
        </div>

        {/* Infinite Smooth Marquee Slider */}
        <div className="services-marquee-viewport">
          <div className="services-marquee-track">
            {marqueeList.map((service, index) => (
              <div 
                key={`${service.id}-${index}`} 
                className="service-card-box"
                onClick={() => handleCardClick(service)}
              >
                
                {/* Top Badge & Icon */}
                <div className="card-top-row">
                  <div className="service-icon-wrapper">
                    {getServiceIcon(service)}
                  </div>
                  <span className="service-tag-pill">{service.tag}</span>
                </div>

                {/* Card Title & Desc */}
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.desc}</p>

                {/* Feature Bullet List */}
                <ul className="service-feature-list">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="feature-bullet">
                      <CheckCircle2 size={14} className="bullet-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More CTA Button */}
                <button 
                  className="btn-learn-more"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(service);
                  }}
                >
                  <span>Learn More</span>
                  <div className="cta-arrow-box">
                    <ArrowRight size={14} />
                  </div>
                </button>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Service Detail Modal Fallback */}
      {selectedService && (
        <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="service-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon-box">{selectedService.icon}</div>
              <div>
                <span className="modal-tag">{selectedService.tag}</span>
                <h3 className="modal-title">{selectedService.title}</h3>
              </div>
            </div>
            <p className="modal-desc">{selectedService.desc}</p>
            <div className="modal-features-section">
              <h4>Key Deliverables:</h4>
              <ul className="modal-feature-grid">
                {selectedService.features.map((feat, idx) => (
                  <li key={idx} className="modal-feature-item">
                    <CheckCircle2 size={16} className="pink-check" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button className="btn-modal-close" onClick={() => setSelectedService(null)}>Close</button>
              <button
                className="btn-modal-cta"
                onClick={() => {
                  const targetServ = selectedService?.title;
                  setSelectedService(null);
                  navigate('/contact', { state: { service: targetServ } });
                  setTimeout(() => {
                    const formElem = document.querySelector('.contact-form-card');
                    if (formElem) {
                      formElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }, 150);
                }}
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
