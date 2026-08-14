import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Award, CheckCircle2, Users, ArrowRight, BookOpen, Laptop, Briefcase, Sparkles } from 'lucide-react';
import './AcademyPage.css';

export default function AcademyPage() {
  const navigate = useNavigate();

  const stats = [
    { number: '1,500+', label: 'Students Trained' },
    { number: '100%', label: 'Practical Learning' },
    { number: '95%', label: 'Placement Rate' },
    { number: '50+', label: 'Hiring Partners' }
  ];

  const features = [
    {
      icon: <Laptop size={24} />,
      title: 'Live Client Budget Management',
      desc: 'Work on actual ad budgets and live websites instead of basic theoretical demos.'
    },
    {
      icon: <Award size={24} />,
      title: 'Global Certifications',
      desc: 'Earn recognized certifications from Google, Meta, HubSpot, and Digital Orra Academy.'
    },
    {
      icon: <Briefcase size={24} />,
      title: '100% Placement Support',
      desc: 'Dedicated career cell providing resume building, portfolio reviews & direct hiring drives.'
    },
    {
      icon: <Sparkles size={24} />,
      title: 'AI-Powered Curriculum',
      desc: 'Learn GEO, AEO, ChatGPT prompt engineering, and modern AI automation tools.'
    }
  ];

  const courses = [
    {
      title: 'Advanced Digital Marketing',
      subtitle: 'Master performance marketing, paid ads, SEO & social media scaling.',
      tag: 'MOST POPULAR',
      popular: true,
      price: '₹45,000',
      syllabus: ['Meta & Google Ads', 'SEO (GEO & AEO)', 'Content & Copywriting', 'Analytics & GA4', '3 Month Live Internship']
    },
    {
      title: 'Full Stack Web Development',
      subtitle: 'Become a job-ready developer building modern web & mobile apps.',
      tag: 'HIGH DEMAND',
      price: '₹55,000',
      syllabus: ['React.js & Next.js', 'Node.js & Express', 'MongoDB & SQL', 'REST APIs & Cloud', 'Portfolio Projects']
    },
    {
      title: 'AI & Automation Specialist',
      subtitle: 'Learn to build AI agents, chat automation, and CRM integrations.',
      tag: 'FUTURE TECH',
      price: '₹50,000',
      syllabus: ['AI Agents & Workflow', 'WhatsApp API Chatbots', 'Zapier & Make Automation', 'Prompt Engineering', 'Custom GPTs']
    }
  ];

  return (
    <div className="academy-page">
      <div className="academy-orb academy-orb-1"></div>
      <div className="academy-orb academy-orb-2"></div>

      <div className="academy-container">
        {/* Hero */}
        <div className="academy-hero">
          <div className="academy-pill">
            <GraduationCap size={15} />
            <span>DIGITAL ORRA ACADEMY</span>
          </div>
          <h1 className="academy-title">
            BUILD A HIGH-GROWTH CAREER IN <span className="highlight-gradient">DIGITAL TECH & MARKETING</span>
          </h1>
          <p className="academy-subtitle">
            Industry-led training programs designed by agency founders. Master real-world skills with 100% practical exposure and placement support.
          </p>

          <div className="academy-hero-stats">
            {stats.map((s, i) => (
              <div key={i} className="ac-stat-card">
                <div className="ac-stat-number">{s.number}</div>
                <div className="ac-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Academy */}
        <div className="academy-features-section">
          <div className="section-heading-center">
            <h2>Why Learn At <span className="highlight-gradient">Digital Orra Academy?</span></h2>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon-box">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Courses Section */}
        <div className="academy-courses-section">
          <div className="section-heading-center">
            <h2>Explore Our Flagship <span className="highlight-gradient">Programs</span></h2>
          </div>
          <div className="courses-grid">
            {courses.map((c, i) => (
              <div key={i} className={`academy-course-card ${c.popular ? 'popular' : ''}`}>
                <div>
                  <span className="card-top-tag">{c.tag}</span>
                  <h3 className="course-card-title">{c.title}</h3>
                  <p className="course-card-subtitle">{c.subtitle}</p>
                  <ul className="course-bullets">
                    {c.syllabus.map((s, sIdx) => (
                      <li key={sIdx}>
                        <CheckCircle2 size={16} className="course-bullet-icon" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="course-footer">
                  <div className="course-price">{c.price}</div>
                  <button 
                    className="enroll-btn" 
                    onClick={() => navigate('/contact-us', { state: { service: c.title, scrollToForm: true } })}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
