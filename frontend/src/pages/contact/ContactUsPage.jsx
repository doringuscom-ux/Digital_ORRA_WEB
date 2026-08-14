import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Zap, 
  Globe, 
  MessageSquare,
  Building2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import './ContactUsPage.css';

import { useData } from '../../context/DataContext';

export default function ContactUsPage({ onNavigate, selectedSubject }) {
  const { addLead } = useData();
  const location = useLocation();
  const stateService = location.state?.service;
  const initialService = stateService || selectedSubject || 'Social Media Handling';

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    const targetService = stateService || selectedSubject;
    if (targetService) {
      setFormState(prev => ({ ...prev, service: targetService }));
    }
    // Scroll directly to contact form card
    setTimeout(() => {
      const formElem = document.querySelector('.contact-form-card');
      if (formElem) {
        formElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  }, [stateService, selectedSubject]);

  const servicesList = [
    'Social Media Handling',
    'Performance Marketing',
    'Web Development',
    'Meta Ads',
    'SEO (Search Engine Optimization)',
    'AEO (Answer Engine Optimization)',
    'GEO (Generative Engine Optimization)',
    'AIO (Artificial Intelligence Optimization)',
    'SXO (Search Experience Optimization)',
    'WhatsApp Integration',
    'App Development',
    'UGC Creator Content',
    'Influencer Marketing',
    'Celebrity Endorsement',
    'Google Ads (PPC)',
    'Graphic Designing',
    'Corporate Video Shoots',
    'CRM & ERP Solutions',
    'Digital Marketing Courses',
    'Free Digital Marketing Audit'
  ];

  const effectiveServicesList = (formState.service && !servicesList.includes(formState.service))
    ? [formState.service, ...servicesList]
    : servicesList;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (addLead) {
      addLead({
        type: 'Contact Form',
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        service: formState.service,
        message: formState.message
      });
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 800);
  };

  return (
    <div className="contact-page-wrapper">
      
      {/* 1. HERO SECTION */}
      <section className="contact-hero-section">
        <div className="contact-hero-glow glow-pink"></div>
        <div className="contact-hero-glow glow-purple"></div>

        <div className="contact-container">
          <div className="contact-hero-center">
            <div className="contact-pill-badge">
              <span>GET IN TOUCH WITH US</span>
            </div>

            <h1 className="contact-main-title">
              Let’s Build Something <br className="mobile-title-br" />
              <span className="highlight-pink">Extraordinary Together</span>
            </h1>

            <p className="contact-sub-title">
              Have a project in mind, need expert performance marketing, or want to scale your revenue? Reach out to Digital ORRA experts 24x7.
            </p>

            <div className="contact-highlights-row">
              <div className="contact-chip">
                <ShieldCheck size={16} className="chip-icon-pink" />
                <span>24x7 Priority Support</span>
              </div>
              <div className="contact-chip">
                <Building2 size={16} className="chip-icon-pink" />
                <span>Offices in Panchkula, Chandigarh & Mumbai</span>
              </div>
              <div className="contact-chip">
                <Globe size={16} className="chip-icon-pink" />
                <span>Global Client Presence (India, USA, Canada)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN FORM & QUICK CONTACT CARDS */}
      <section className="contact-body-section">
        <div className="contact-container">
          <div className="contact-grid">
            
            {/* LEFT COLUMN: INTERACTIVE FORM */}
            <div className="contact-form-card">
              <div className="form-header">
                <div className="form-icon-wrap">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="form-card-title">Send Us a Message</h3>
                  <p className="form-card-subtitle">Fill out the form below and our team will call you back within 15 minutes.</p>
                </div>
              </div>

              {submittedSuccess ? (
                <div className="contact-success-box">
                  <CheckCircle2 size={56} className="success-check-icon" />
                  <h3>Thank You for Reaching Out!</h3>
                  <p>Your message has been sent successfully. One of our digital strategy consultants will get in touch with you shortly.</p>
                  <button 
                    className="btn-send-another"
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setFormState({ name: '', email: '', phone: '', service: 'Social Media Handling', message: '' });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-elements">
                  <div className="form-row-2col">
                    <div className="contact-field-group">
                      <label>Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Rahul Sharma" 
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>

                    <div className="contact-field-group">
                      <label>Phone Number *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 98765 43210" 
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-2col">
                    <div className="contact-field-group">
                      <label>Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="rahul@company.com" 
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      />
                    </div>

                    <div className="contact-field-group">
                      <label>Service Needed *</label>
                      <select 
                        value={formState.service}
                        onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                        className="contact-select"
                      >
                        {effectiveServicesList.map((srv, idx) => (
                          <option key={idx} value={srv}>{srv}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="contact-field-group">
                    <label>Your Message / Project Requirements</label>
                    <textarea 
                      rows="4" 
                      placeholder="Tell us about your brand goals, target budget, or any specific requirements..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      maxLength="300"
                    ></textarea>
                    <span className="char-counter">{formState.message.length} / 300</span>
                  </div>

                  <button type="submit" className="btn-submit-contact" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* RIGHT COLUMN: QUICK INFO & CONTACT CARDS */}
            <div className="contact-info-column">
              
              {/* Card 1: Phone Numbers */}
              <div className="quick-info-card">
                <div className="quick-icon-box">
                  <Phone size={24} />
                </div>
                <div className="quick-card-content">
                  <h4>Call Us Directly</h4>
                  <p>Our sales & strategy line is open 24x7.</p>
                  <div className="phone-links-wrap">
                    <a href="tel:+919896384224" className="phone-link">+91 98963 84224</a>
                    <a href="tel:+916280458005" className="phone-link">+91 62804 58005</a>
                  </div>
                </div>
              </div>

              {/* Card 2: Email Us */}
              <div className="quick-info-card">
                <div className="quick-icon-box">
                  <Mail size={24} />
                </div>
                <div className="quick-card-content">
                  <h4>Email Us</h4>
                  <p>Send your project RFPs or queries directly.</p>
                  <a href="mailto:info@digitalorra.com" className="email-link">info@digitalorra.com</a>
                </div>
              </div>

              {/* Card 3: HQ Address */}
              <div className="quick-info-card">
                <div className="quick-icon-box">
                  <MapPin size={24} />
                </div>
                <div className="quick-card-content">
                  <h4>Headquarters (Panchkula)</h4>
                  <p>SCO 19, Sector 11, Panchkula, Haryana 134109</p>
                  <span className="working-hours-tag">
                    <Clock size={13} /> Mon - Sat: 9:30 AM - 7:00 PM
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. MULTI-OFFICE BRANCHES SECTION */}
      <section className="offices-location-section">
        <div className="contact-container">
          
          <div className="offices-header-center">
            <span className="section-pill">OUR PRESENCE</span>
            <h2 className="offices-title">
              Visit Our <span className="highlight-pink">Major Office Locations</span>
            </h2>
            <p className="offices-subtitle">
              Headquartered in Panchkula near Chandigarh, with active operations across major cities in India and globally.
            </p>
          </div>

          <div className="offices-cards-grid">
            
            {/* Panchkula HQ */}
            <div className="office-card">
              <div className="office-city-badge">HEADQUARTERS</div>
              <h3>Panchkula Office</h3>
              <p className="office-address">SCO 19, Sector 11, Panchkula, Haryana 134109</p>
              <div className="office-contact-meta">
                <Phone size={14} /> <span>+91 98963 84224</span>
              </div>
            </div>

            {/* Chandigarh Office */}
            <div className="office-card">
              <div className="office-city-badge">TECH HUB</div>
              <h3>Chandigarh Office</h3>
              <p className="office-address">DLF Building Tower E, 1st Floor, Chandigarh Technology Park, Chandigarh, 160101</p>
              <div className="office-contact-meta">
                <Phone size={14} /> <span>+91 62804 58005</span>
              </div>
            </div>

            {/* Mumbai Office */}
            <div className="office-card">
              <div className="office-city-badge">MEDIA HUB</div>
              <h3>Mumbai Office</h3>
              <p className="office-address">17/D2, Mhada, SVP Nagar, Opp St. Marry’s School, Four Bungalows, Andheri West, Mumbai</p>
              <div className="office-contact-meta">
                <Phone size={14} /> <span>+91 98963 84224</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. GOOGLE MAPS EMBED */}
      <section className="map-embed-section">
        <div className="contact-container">
          <div className="map-card-wrapper">
            <div className="map-header-bar">
              <MapPin size={18} className="map-pin-icon" />
              <span>Digital ORRA Panchkula Headquarters Location</span>
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.068298277317!2d76.8513007!3d30.688354399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f953cee3b4fc9%3A0x1530eb9d9658d765!2z8J2Xl_Cdl7bwnZe08J2XtvCdmIHwnZeu8J2XuSDwnZei8J2XpfCdl6XwnZeUIC0g8J2XlfCdl7zwnZe88J2YgPCdmIEg8J2XrPCdl7zwnZiC8J2XvyDwnZeV8J2YgvCdmIDwnZe28J2Xu_Cdl7LwnZiA8J2YgCAmIPCdl5bwnZeu8J2Xv_Cdl7LwnZey8J2XvyDwnZeq8J2XtvCdmIHwnZe1IPCdl5fwnZe28J2XtPCdl7bwnZiB8J2XrvCdl7kg8J2XoPCdl67wnZe_8J2XuPCdl7LwnZiB8J2XtvCdl7vwnZe0LCDwnZea8J2Xv_Cdl67wnZe98J2XtfCdl7bwnZewIPCdl5fwnZey8J2YgPCdl7bwnZe08J2Xu_Cdl7bwnZe78J2XtA!5e0!3m2!1sen!2sus!4v1764131440167!5m2!1sen!2sus" 
              width="100%" 
              height="380" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Digital ORRA Panchkula Location"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
}
