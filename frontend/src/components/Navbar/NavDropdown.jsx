import React from 'react';
import { Database, Server, Code2, Cpu, ArrowUpRight, Zap, Layers, Lock } from 'lucide-react';
import './Navbar.css';

export default function NavDropdown({ isOpen }) {
  if (!isOpen) return null;

  const stackItems = [
    {
      icon: <Database className="dropdown-item-icon text-emerald" size={20} />,
      title: 'MongoDB Database',
      desc: 'Document-based NoSQL schema & Atlas cluster connectivity.',
      tag: 'Data',
      tagColor: 'green'
    },
    {
      icon: <Server className="dropdown-item-icon text-amber" size={20} />,
      title: 'Express.js Backend',
      desc: 'Robust RESTful API routes & middleware integration.',
      tag: 'Server',
      tagColor: 'amber'
    },
    {
      icon: <Code2 className="dropdown-item-icon text-cyan" size={20} />,
      title: 'React.js Frontend',
      desc: 'Dynamic UI components with hooks & responsive state.',
      tag: 'UI',
      tagColor: 'cyan'
    },
    {
      icon: <Cpu className="dropdown-item-icon text-purple" size={20} />,
      title: 'Node.js Runtime',
      desc: 'Asynchronous event-driven backend service architecture.',
      tag: 'Core',
      tagColor: 'purple'
    }
  ];

  const quickFeatures = [
    { icon: <Zap size={15} />, text: 'JWT Authentication' },
    { icon: <Layers size={15} />, text: 'Mongoose Schemas' },
    { icon: <Lock size={15} />, text: 'CORS & Security' },
  ];

  return (
    <div className="nav-dropdown-menu">
      <div className="dropdown-header">
        <span>MERN STACK ARCHITECTURE</span>
        <span className="dropdown-badge">v2.4</span>
      </div>
      
      <div className="dropdown-grid">
        {stackItems.map((item, idx) => (
          <a key={idx} href={`#${item.title.toLowerCase().replace(/\s+/g, '-')}`} className="dropdown-grid-item">
            <div className="item-icon-wrapper">
              {item.icon}
            </div>
            <div className="item-details">
              <div className="item-title-row">
                <span className="item-title">{item.title}</span>
                <span className={`item-tag tag-${item.tagColor}`}>{item.tag}</span>
              </div>
              <p className="item-desc">{item.desc}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="dropdown-footer">
        <div className="quick-features">
          {quickFeatures.map((feat, i) => (
            <div key={i} className="feature-pill">
              {feat.icon}
              <span>{feat.text}</span>
            </div>
          ))}
        </div>
        <a href="#docs" className="dropdown-footer-link">
          Explore MERN Specs <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}
