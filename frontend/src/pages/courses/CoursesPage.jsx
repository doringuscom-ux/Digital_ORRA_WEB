import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  Award, 
  Briefcase, 
  Users, 
  X, 
  Star,
  TrendingUp,
  Laptop,
  Video,
  Code,
  Palette,
  ShieldCheck,
  Share2,
  Search,
  Target,
  Megaphone,
  Bot,
  Cpu,
  MousePointer,
  MessageSquare,
  Smartphone,
  Database
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { RenderColorfulCourseIcon } from '../../components/Courses/CourseIconHelper';
import ScrollRowAnimateCard from '../../components/Common/ScrollRowAnimateCard';
import './CoursesPage.css';

export default function CoursesPage({ onNavigate }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCourseForModal, setSelectedCourseForModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const categories = [
    { label: 'All', value: 'All' },
    { label: 'Digital Marketing', value: 'Digital Marketing & Performance' },
    { label: 'AI & Search', value: 'AI & Search (SEO/AEO/GEO)' },
    { label: 'Social & Automation', value: 'Social Media & Automation' },
    { label: 'Creative & Design', value: 'Creative, Video & Design' },
    { label: 'Development & Tech', value: 'Development & Tech' }
  ];

  const { courses } = useData();
  const displayCourses = courses || [];

  const filteredCourses = activeCategory === 'All' 
    ? displayCourses 
    : displayCourses.filter(c => c.category === activeCategory);

  const handleOpenSyllabusModal = (course) => {
    setSelectedCourseForModal(course);
    setIsModalOpen(true);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (selectedCourseForModal && selectedCourseForModal.syllabusPdf !== '#') {
      window.open(selectedCourseForModal.syllabusPdf, '_blank');
    }
    setTimeout(() => {
      setIsModalOpen(false);
      setFormData({ name: '', email: '', phone: '' });
    }, 2000);
  };

  return (
    <div className="courses-page-wrapper">
      
      {/* 1. HERO SECTION */}
      <section className="courses-hero-section">
        <div className="courses-hero-glow glow-pink"></div>
        <div className="courses-hero-glow glow-purple"></div>

        <div className="courses-container">
          
          <div className="courses-hero-center">
            <div className="hero-pill-badge">
              <span>DIGITAL ORRA ACADEMY</span>
            </div>

            <h1 className="courses-main-title">
              Best Digital Marketing & <br />
              <span className="highlight-pink">Practical Training Courses</span>
            </h1>

            <p className="courses-sub-title">
              Master real-world SEO, Performance Marketing, AI Automation, Video Editing, Graphic Design, Web & App Development with 100% practical live client project training.
            </p>

            {/* Feature Highlights Pills */}
            <div className="hero-highlights-row">
              <div className="highlight-chip">
                <ShieldCheck size={16} className="chip-icon" />
                <span>100% Practical Training</span>
              </div>
              <div className="highlight-chip">
                <Briefcase size={16} className="chip-icon" />
                <span>Live Client Projects</span>
              </div>
              <div className="highlight-chip">
                <Award size={16} className="chip-icon" />
                <span>100% Placement Assistance</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. COURSES CARDS GRID */}
      <section className="courses-grid-section">
        <div className="courses-container">
          
          {/* Category Filter Tabs (Moved Outside Hero) */}
          <div className="courses-filter-bar">
            {categories.map((catObj) => (
              <button
                key={catObj.value}
                className={`filter-tab-btn ${activeCategory === catObj.value ? 'active' : ''}`}
                onClick={() => setActiveCategory(catObj.value)}
              >
                <span>{catObj.label}</span>
                {catObj.value === 'All' && <span className="tab-count">{displayCourses.length}</span>}
              </button>
            ))}
          </div>

          <div className="courses-grid">
            {filteredCourses.map((course, cIdx) => (
              <ScrollRowAnimateCard 
                key={course.id} 
                index={cIdx}
                itemsPerRow={3}
                className={`course-card-box ${course.popular ? 'popular-card' : ''}`}
              >
                {/* Popular Ribbon if applicable */}
                {course.popular && (
                  <div className="popular-ribbon">
                    <Star size={12} fill="#ffffff" color="#ffffff" />
                    <span>POPULAR</span>
                  </div>
                )}

                {/* Top Badge & Duration Header */}
                <div className="card-header-top">
                  <RenderColorfulCourseIcon 
                    iconName={course.iconName || (course.id === 'adv_dm' ? 'Award' : course.id === 'ai_dm' ? 'Laptop' : course.id === 'meta_ads' ? 'Megaphone' : course.id === 'google_ads' ? 'Target' : course.id === 'search_optimization' ? 'Search' : course.id === 'aio_automation' ? 'Cpu' : course.id === 'social_management' ? 'Share2' : course.id === 'design_video' ? 'Palette' : 'TrendingUp')} 
                    iconColor={course.iconColor || (course.id === 'adv_dm' ? 'pink' : course.id === 'ai_dm' ? 'cyan' : course.id === 'meta_ads' ? 'purple' : course.id === 'google_ads' ? 'amber' : course.id === 'search_optimization' ? 'blue' : course.id === 'aio_automation' ? 'purple' : course.id === 'social_management' ? 'emerald' : course.id === 'design_video' ? 'pink' : 'emerald')} 
                  />
                  <div className="header-meta">
                    <span className="course-cat-tag">{course.badge}</span>
                    <div className="duration-pill">
                      <Clock size={13} />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="course-card-title">{course.title}</h3>

                {/* Key Benefits Tags */}
                <div className="course-benefits-box">
                  <div className="benefit-badge placement">
                    <Briefcase size={14} />
                    <span>Includes: {course.hasInternship ? 'Internship + Job Placement' : 'Live Projects & Certification'}</span>
                  </div>

                  <div className="benefit-badge ideal">
                    <Users size={14} />
                    <span>Ideal For: {course.idealFor || 'Students, Marketers & Career Professionals'}</span>
                  </div>
                </div>

                <div className="card-divider"></div>

                {/* Syllabus List */}
                <div className="course-syllabus-wrapper">
                  <h4 className="syllabus-heading">What You Will Learn:</h4>
                  <ul className="syllabus-list">
                    {((Array.isArray(course.syllabus) && course.syllabus.length > 0) 
                      ? course.syllabus 
                      : (typeof course.syllabus === 'string' && course.syllabus.trim() 
                          ? course.syllabus.split(',').map(s => s.trim())
                          : ['Hands-on practical training with live agency projects', '100% Job Placement Assistance & Certification Support', 'Expert Mentorship & Real-world Tool Mastery']
                        )
                    ).map((item, idx) => (
                      <li key={idx} className="syllabus-item">
                        <CheckCircle2 size={16} className="check-icon-pink" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing Box - Placed right above Admission Open button */}
                <div className="course-pricing-box">
                  <div className="price-group">
                    <span className="current-price">{course.price}</span>
                    {course.originalPrice && <del className="original-price">{course.originalPrice}</del>}
                  </div>
                  {course.discount && <span className="discount-tag">{course.discount}</span>}
                </div>

                {/* Card Action Buttons */}
                <div className="course-card-actions">
                  <button
                    className="btn-enroll-primary"
                    onClick={() => {
                      navigate('/contact-us', { state: { service: course.title, scrollToForm: true } });
                    }}
                  >
                    <span>Admission Open</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    className="btn-download-syllabus"
                    onClick={() => handleOpenSyllabusModal(course)}
                  >
                    <Download size={15} />
                    <span>Download Free Syllabus</span>
                  </button>
                </div>

              </ScrollRowAnimateCard>
            ))}
          </div>

        </div>
      </section>

      {/* 3. WHY CHOOSE ACADEMY PROOF SECTION */}
      <section className="academy-proof-section">
        <div className="courses-container">
          <div className="proof-card-banner">
            
            <div className="proof-header-center">
              <span className="proof-pill">WHY DIGITAL ORRA ACADEMY</span>
              <h2 className="proof-title">
                Learn By Doing, <span className="highlight-pink">Not Just Reading</span>
              </h2>
              <p className="proof-desc">
                We believe in 100% practical, hands-on learning. Our trainees work directly on live client projects to build portfolio-worthy experience.
              </p>
            </div>

            <div className="proof-features-grid">
              <div className="proof-feature-box">
                <div className="proof-icon-circle">
                  <Briefcase size={26} />
                </div>
                <h3>Live Client Projects</h3>
                <p>Work directly on real brand ad budgets, SEO campaigns, and live client websites.</p>
              </div>

              <div className="proof-feature-box">
                <div className="proof-icon-circle">
                  <Award size={26} />
                </div>
                <h3>Recognized Certifications</h3>
                <p>Earn official certificates from Google, Meta, Hubspot, and Digital ORRA.</p>
              </div>

              <div className="proof-feature-box">
                <div className="proof-icon-circle">
                  <Users size={26} />
                </div>
                <h3>100% Placement Support</h3>
                <p>Dedicated career counseling, resume building, and direct interview scheduling with top firms.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. DOWNLOAD SYLLABUS POPUP MODAL */}
      {isModalOpen && selectedCourseForModal && (
        <div className="syllabus-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="syllabus-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>

            <div className="modal-header">
              <div className="modal-icon-wrap">
                <Download size={24} />
              </div>
              <h3 className="modal-title">Download Free Syllabus</h3>
              <p className="modal-subtitle">
                Get full detailed curriculum for <strong style={{ color: '#E6007E' }}>{selectedCourseForModal.title}</strong> directly to your inbox/browser.
              </p>
            </div>

            {formSubmitted ? (
              <div className="modal-success-state">
                <CheckCircle2 size={48} className="success-icon" />
                <h4>Thank You!</h4>
                <p>Your syllabus download is starting. We'll also send details to your email!</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="syllabus-form">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter your email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="Enter 10-digit mobile number" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-modal-submit">
                  <span>Submit & Download PDF</span>
                  <Download size={16} />
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
