import React, { useState } from 'react';
import { Briefcase, Clock, MapPin, DollarSign, Send, CheckCircle2, ChevronRight, X } from 'lucide-react';
import ScrollRowAnimateCard from '../../components/Common/ScrollRowAnimateCard';
import { jobOpenings } from '../../data/careerData';
import './CareerPage.css';
import { useData } from '../../context/DataContext';
import ServerErrorNotice from '../../components/Common/ServerErrorNotice';

export default function CareerPage() {
  const { careers, isBackendOnline, addLead } = useData() || {};
  const displayJobs = isBackendOnline && careers && careers.length > 0 ? careers : [];
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyModalJob, setApplyModalJob] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', experience: '', resume: null, note: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleApplyClick = (job) => {
    setApplyModalJob(job);
    setFormData({ name: '', email: '', phone: '', experience: '', resume: null, note: '' });
    setSubmitted(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (addLead) {
      addLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: `Job Application: ${applyModalJob?.title || 'General Position'} (${formData.experience || 'N/A'} Exp)`,
        type: 'Job Application',
        notes: formData.note ? `Exp: ${formData.experience} | Note: ${formData.note}` : `Experience: ${formData.experience}`
      });
    }
    setSubmitted(true);
  };

  return (
    <div className="career-page">
      {/* Hero Banner */}
      <section className="career-hero">
        <div className="career-hero-container">
          <span className="career-pill-badge">CAREERS AT DIGITAL ORRA</span>
          <h1 className="career-hero-title">
            Join Our Team & <br className="mobile-title-br" /><span className="highlight-pink">Scale Your Career</span>
          </h1>
          <p className="career-hero-sub">
            Grow your career with a passionate, creative & performance-driven digital team. Explore current openings below and apply today!
          </p>
        </div>
      </section>

      {/* Main Jobs Section */}
      <section className="career-content-section">
        <div className="career-container">
          <div className="career-header-row">
            <div>
              <h2 className="career-section-title">Current Openings</h2>
              <p className="career-section-sub">Find the role that matches your passion and expertise.</p>
            </div>
            <span className="openings-count-chip">{displayJobs.length} Active Roles</span>
          </div>

          {/* Job Openings Grid */}
          {!isBackendOnline ? (
            <ServerErrorNotice 
              title="Server Error: Career Positions Unavailable"
              message="Unable to load active job openings because backend server is offline. Please start backend server."
            />
          ) : (
            <div className="jobs-grid">
            {displayJobs.map((job, jIdx) => (
              <ScrollRowAnimateCard key={job.id} index={jIdx} itemsPerRow={3} className="job-card">
                <div className="job-card-top">
                  <span className="job-dept-chip">{job.department}</span>
                  <span className="job-type-chip">{job.type}</span>
                </div>

                <h3 className="job-card-title">{job.title}</h3>

                <div className="job-meta-list">
                  <div className="job-meta-item">
                    <Clock size={14} className="meta-icon" />
                    <span><strong>Experience:</strong> {job.experience}</span>
                  </div>
                  <div className="job-meta-item">
                    <MapPin size={14} className="meta-icon" />
                    <span><strong>Location:</strong> {job.location}</span>
                  </div>
                  <div className="job-meta-item">
                    <DollarSign size={14} className="meta-icon" />
                    <span><strong>Salary:</strong> {job.salary}</span>
                  </div>
                </div>

                <p className="job-card-desc">{job.description}</p>

                <div className="job-card-actions">
                  <button
                    className="btn-job-details"
                    onClick={() => setSelectedJob(job)}
                  >
                    <span>View Details</span>
                    <ChevronRight size={15} />
                  </button>
                  <button
                    className="btn-job-apply"
                    onClick={() => handleApplyClick(job)}
                  >
                    <span>Apply Now</span>
                    <Send size={14} />
                  </button>
                </div>
              </ScrollRowAnimateCard>
            ))}
          </div>
          )}

        </div>
      </section>

      {/* JOB DETAILS MODAL */}
      {selectedJob && (
        <div className="career-modal-backdrop" onClick={() => setSelectedJob(null)}>
          <div className="career-modal-box job-details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="career-modal-close" onClick={() => setSelectedJob(null)} aria-label="Close">
              <X size={20} />
            </button>

            <div className="modal-header-block">
              <span className="job-dept-chip">{selectedJob.department}</span>
              <h2 className="modal-job-title">{selectedJob.title}</h2>
              <div className="modal-meta-row">
                <span><Clock size={14} /> {selectedJob.experience}</span>
                <span><MapPin size={14} /> {selectedJob.location}</span>
                <span><Briefcase size={14} /> {selectedJob.type}</span>
              </div>
            </div>

            <div className="modal-body-content">
              <div className="modal-section-block">
                <h4>About The Role</h4>
                <p>{selectedJob.description}</p>
              </div>

              {selectedJob.responsibilities && (
                <div className="modal-section-block">
                  <h4>Key Responsibilities</h4>
                  <ul>
                    {selectedJob.responsibilities.map((resp, i) => (
                      <li key={i}><CheckCircle2 size={15} className="list-check-icon" /> {resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedJob.requirements && (
                <div className="modal-section-block">
                  <h4>Requirements & Qualifications</h4>
                  <ul>
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i}><CheckCircle2 size={15} className="list-check-icon" /> {req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="modal-footer-row">
              <button className="btn-modal-apply" onClick={() => { setSelectedJob(null); handleApplyClick(selectedJob); }}>
                <span>Apply For This Position</span>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* APPLY NOW FORM MODAL */}
      {applyModalJob && (
        <div className="career-modal-backdrop" onClick={() => setApplyModalJob(null)}>
          <div className="career-modal-box apply-form-modal" onClick={(e) => e.stopPropagation()}>
            <button className="career-modal-close" onClick={() => setApplyModalJob(null)} aria-label="Close">
              <X size={20} />
            </button>

            {!submitted ? (
              <>
                <div className="modal-header-block">
                  <span className="job-dept-chip">Application Form</span>
                  <h2 className="modal-job-title">Apply for {applyModalJob.title}</h2>
                  <p className="modal-sub-text">Fill in your details below and our HR team will reach out to you shortly.</p>
                </div>

                <form className="career-apply-form" onSubmit={handleFormSubmit}>
                  <div className="form-field-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-field-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-field-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label>Years of Relevant Experience *</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      required
                    >
                      <option value="">Select Experience</option>
                      <option value="Fresher / 0-6 Months">Fresher / 0 - 6 Months</option>
                      <option value="1-2 years">1 - 2 Years</option>
                      <option value="2-4 years">2 - 4 Years</option>
                      <option value="5+ years">5+ Years</option>
                    </select>
                  </div>

                  <div className="form-field-group">
                    <label>Portfolio / LinkedIn Link (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-submit-application">
                    <Send size={16} />
                    <span>Submit Application</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="apply-success-state">
                <div className="success-icon-circle">🎉</div>
                <h3>Application Submitted!</h3>
                <p>Thank you, <strong>{formData.name}</strong>! Your application for the <strong>{applyModalJob.title}</strong> position has been received. Our HR team will review your profile and contact you soon.</p>
                <button className="btn-close-success" onClick={() => setApplyModalJob(null)}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
