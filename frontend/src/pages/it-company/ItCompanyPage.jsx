import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Code, Smartphone, Database, Cloud, ShieldCheck, Zap, Bot, Layers, ArrowRight } from 'lucide-react';
import './ItCompanyPage.css';

export default function ItCompanyPage({ onOpenAuditModal }) {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Code size={26} />,
      title: 'Full Stack Web Applications',
      desc: 'High-performance web apps built with React, Next.js, Node.js, and modern microservices architecture tailored for scale.'
    },
    {
      icon: <Smartphone size={26} />,
      title: 'Mobile App Development',
      desc: 'Native and cross-platform iOS & Android mobile applications using Flutter & React Native with seamless cloud integration.'
    },
    {
      icon: <Database size={26} />,
      title: 'Custom ERP & CRM Systems',
      desc: 'Enterprise business management software, automated lead workflows, inventory management, and custom client portals.'
    },
    {
      icon: <Cloud size={26} />,
      title: 'Cloud Infrastructure & DevOps',
      desc: 'AWS, Google Cloud & Azure cloud migration, CI/CD pipeline automation, serverless architecture, and 99.9% uptime management.'
    },
    {
      icon: <Bot size={26} />,
      title: 'AI Agents & Chatbot Automation',
      desc: 'Next-gen LLM integration, custom AI agents, WhatsApp Business API chatbots, and intelligent workflow automation.'
    },
    {
      icon: <ShieldCheck size={26} />,
      title: 'Cybersecurity & Web Audits',
      desc: 'Comprehensive web security audits, SSL encryption, vulnerability assessments, and DDoS defense systems.'
    }
  ];

  const techStack = [
    'React.js', 'Next.js', 'Node.js', 'Python', 'Flutter', 'React Native',
    'MongoDB', 'PostgreSQL', 'AWS Cloud', 'Docker', 'GraphQL', 'Tailwind CSS',
    'TypeScript', 'Zapier API', 'OpenAI LLM'
  ];

  return (
    <div className="it-company-page">
      <div className="it-orb it-orb-1"></div>
      <div className="it-orb it-orb-2"></div>

      <div className="it-container">
        {/* Hero */}
        <div className="it-hero">
          <div className="it-pill">
            <Cpu size={15} />
            <span>ENTERPRISE IT & SOFTWARE SOLUTIONS</span>
          </div>
          <h1 className="it-title">
            EMPOWERING BUSINESSES WITH <span className="highlight-gradient">NEXT-GEN SOFTWARE & TECH</span>
          </h1>
          <p className="it-subtitle">
            From complex web applications and mobile apps to custom ERPs and AI automation, Digital Orra delivers resilient digital infrastructure.
          </p>
        </div>

        {/* Services Grid */}
        <div className="it-services-grid">
          {services.map((s, i) => (
            <div key={i} className="it-service-card">
              <div className="it-card-icon">{s.icon}</div>
              <h3 className="it-card-title">{s.title}</h3>
              <p className="it-card-desc">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="it-tech-section">
          <div className="section-heading-center">
            <h2>OUR CORE <span className="highlight-gradient">TECHNOLOGY STACK</span></h2>
          </div>
          <div className="tech-pills-container">
            {techStack.map((tech, i) => (
              <div key={i} className="tech-pill-badge">
                <Zap size={14} style={{ color: '#06B6D4' }} />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="faqs-cta-box" style={{ marginTop: '50px' }}>
          <h3 className="faqs-cta-title">Need a Custom Software Solution?</h3>
          <p className="faqs-cta-desc">
            Book a free technical consultation with our lead software architects today.
          </p>
          <button 
            className="faqs-cta-btn" 
            onClick={() => {
              if (onOpenAuditModal) {
                onOpenAuditModal();
              } else {
                navigate('/contact-us', { state: { service: 'Technical Software Audit', scrollToForm: true } });
              }
            }}
          >
            <span>Request Technical Audit</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
