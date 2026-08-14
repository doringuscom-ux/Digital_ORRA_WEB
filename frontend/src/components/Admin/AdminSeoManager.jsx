import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Globe, 
  Save, 
  Loader2, 
  ExternalLink,
  FileCode,
  ShieldCheck,
  Edit3,
  X,
  ChevronDown,
  ChevronRight,
  FileText,
  Briefcase,
  Layers,
  GraduationCap
} from 'lucide-react';

export default function AdminSeoManager({ 
  seoPages = [], 
  onSaveSeo,
  services = [],
  portfolio = [],
  blog = [],
  courses = [],
  careers = []
}) {
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [showSeoModal, setShowSeoModal] = useState(false);
  
  // Accordion State
  const [expandedGroups, setExpandedGroups] = useState({
    static: true,
    services: false,
    portfolio: false,
    blog: false,
    courses: false,
    careers: false
  });

  const [formData, setFormData] = useState({
    pageSlug: 'home',
    pageName: 'Home Page',
    metaTitle: '',
    metaDescription: '',
    focusKeywords: '',
    canonicalUrl: '',
    ogImage: ''
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const getSlug = (item) => {
    return item.slug || (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : item._id);
  };

  // 1. Static Pages
  const staticPages = [
    { slug: 'home', name: 'Home Page' },
    { slug: 'about-us', name: 'About Us Page' },
    { slug: 'services', name: 'Services (Base)' },
    { slug: 'courses', name: 'Courses Academy (Base)' },
    { slug: 'blog', name: 'Blog & Articles (Base)' },
    { slug: 'gallery', name: 'Gallery Page' },
    { slug: 'career', name: 'Careers (Base)' },
    { slug: 'contact-us', name: 'Contact Us Page' },
    { slug: 'scan-qr', name: 'Scan QR Page' },
    { slug: 'our-team', name: 'Our Team Page' },
    { slug: 'faqs', name: 'FAQs Page' },
    { slug: 'portfolio', name: 'Portfolio (Base)' },
    { slug: 'academy', name: 'Academy Page' },
    { slug: 'it-company', name: 'IT Company Page' },
    { slug: 'company-profile', name: 'Company Profile' },
    { slug: 'testimonial', name: 'Testimonials' }
  ];

  // 2. Dynamic Groups
  const seoGroups = [
    { id: 'static', title: 'Static & Core Pages', icon: <Globe size={18} />, items: staticPages },
    { id: 'services', title: 'Service Pages', icon: <Layers size={18} />, items: services.map(s => ({ slug: `service/${getSlug(s)}`, name: s.title })) },
    { id: 'blog', title: 'Blog Articles', icon: <FileText size={18} />, items: blog.map(b => ({ slug: `blog/${getSlug(b)}`, name: b.title })) }
  ];

  const handleOpenPageSeoModal = (pageSlug, pageName) => {
    setSelectedSlug(pageSlug);
    const existing = seoPages.find(s => s.pageSlug === pageSlug);
    if (existing) {
      setFormData({
        pageSlug: existing.pageSlug,
        pageName: existing.pageName || pageName || pageSlug,
        metaTitle: existing.metaTitle || '',
        metaDescription: existing.metaDescription || '',
        focusKeywords: existing.focusKeywords || '',
        canonicalUrl: existing.canonicalUrl || `https://digitalorra.com/${pageSlug === 'home' ? '' : pageSlug}`,
        ogImage: existing.ogImage || ''
      });
    } else {
      setFormData({
        pageSlug: pageSlug,
        pageName: pageName || pageSlug,
        metaTitle: `Digital Orra | ${pageName || 'Digital Agency'}`,
        metaDescription: 'Digital Orra premier performance marketing, SEO, Meta Ads & Web Development agency.',
        focusKeywords: 'digital marketing, seo, performance marketing',
        canonicalUrl: `https://digitalorra.com/${pageSlug === 'home' ? '' : pageSlug}`,
        ogImage: '/logo.png'
      });
    }
    setSaveSuccess(false);
    setShowSeoModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    await onSaveSeo(formData);

    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowSeoModal(false);
    }, 1500);
  };

  const titleLength = formData.metaTitle ? formData.metaTitle.length : 0;
  const descLength = formData.metaDescription ? formData.metaDescription.length : 0;

  const isTitleOptimal = titleLength >= 40 && titleLength <= 65;
  const isDescOptimal = descLength >= 120 && descLength <= 165;

  return (
    <div className="seo-manager-view-container">
      {/* Header Bar */}
      <div className="seo-header-card">
        <div className="seo-header-title-box">
          <Search size={24} className="seo-icon-pink" />
          <div>
            <h2>Search Engine Optimization (SEO) Manager</h2>
            <p>Select any page below to configure Meta Tags, Page Titles, Descriptions & OG Cards in Pop-up Modal</p>
          </div>
        </div>

        <div className="seo-quick-links-row">
          <a 
            href={`${import.meta.env.VITE_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:5000/api`}/seo/sitemap.xml`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="sitemap-btn-link"
          >
            <FileCode size={16} /> <span>View XML Sitemap</span> <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Accordion Pages Display */}
      <div className="seo-pages-sidebar-card" style={{ width: '100%', marginTop: '20px' }}>
        
        {seoGroups.map(group => {
          if (group.items.length === 0) return null;
          
          const isExpanded = expandedGroups[group.id];
          
          return (
            <div key={group.id} style={{ marginBottom: '16px', background: '#111827', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div 
                onClick={() => toggleGroup(group.id)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', cursor: 'pointer', background: isExpanded ? 'rgba(236,72,153,0.05)' : 'transparent', borderBottom: isExpanded ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#EC4899' }}>{group.icon}</span>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '600', color: '#FFF' }}>
                    {group.title} <span style={{ color: '#6B7280', fontSize: '0.85rem', marginLeft: '8px' }}>({group.items.length})</span>
                  </h3>
                </div>
                {isExpanded ? <ChevronDown size={20} color="#9CA3AF" /> : <ChevronRight size={20} color="#9CA3AF" />}
              </div>

              {isExpanded && (
                <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
                  {group.items.map(page => {
                    const pageSeo = seoPages.find(s => s.pageSlug === page.slug);
                    const hasCustom = !!(pageSeo && pageSeo.metaTitle);

                    return (
                      <div
                        key={page.slug}
                        className="seo-page-select-btn"
                        onClick={() => handleOpenPageSeoModal(page.slug, page.name)}
                        style={{ padding: '14px 16px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', background: '#1F2937', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', gap: '12px' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <Globe size={16} style={{ color: '#9CA3AF', marginTop: '3px' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#E5E7EB', lineHeight: '1.3' }}>{page.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '4px', wordBreak: 'break-all' }}>/{page.slug}</div>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                          <span className={`seo-status-tag ${hasCustom ? 'customized' : 'default'}`} style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', background: hasCustom ? 'rgba(16,185,129,0.1)' : 'rgba(107,114,128,0.1)', color: hasCustom ? '#10B981' : '#9CA3AF' }}>
                            {hasCustom ? '✓ Configured' : 'Default SEO'}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenPageSeoModal(page.slug, page.name);
                            }}
                            style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)', color: '#EC4899', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}
                          >
                            <Edit3 size={12} /> Edit
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SEO Edit Pop-up Modal */}
      {showSeoModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowSeoModal(false)}>
          <div className="admin-modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px', width: '90%' }}>
            <div className="admin-modal-header">
              <div className="admin-modal-title">
                <Globe size={20} className="modal-header-icon" style={{ color: '#EC4899' }} />
                <h3>SEO Settings — {formData.pageName}</h3>
              </div>
              <button type="button" className="admin-modal-close" onClick={() => setShowSeoModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              <form onSubmit={handleSubmit} className="admin-form">
                {/* Health Indicators */}
                <div className="seo-health-audit-box" style={{ marginBottom: '20px' }}>
                  <div className="audit-box-header">
                    <ShieldCheck size={18} className="audit-shield-icon" />
                    <span>Page Meta Health Audit</span>
                  </div>
                  <div className="audit-metrics-row">
                    <div className={`audit-pill ${isTitleOptimal ? 'good' : 'warn'}`}>
                      {isTitleOptimal ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      <span>Title: <strong>{titleLength} chars</strong> (Ideal: 50-60)</span>
                    </div>
                    <div className={`audit-pill ${isDescOptimal ? 'good' : 'warn'}`}>
                      {isDescOptimal ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      <span>Description: <strong>{descLength} chars</strong> (Ideal: 150-160)</span>
                    </div>
                  </div>
                </div>

                {/* Meta Title Field */}
                <div className="admin-form-group">
                  <label>
                    Meta Title <span style={{ color: '#EC4899' }}>*</span>
                    <span className="char-count-text">({titleLength} / 60 recommended)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={e => setFormData({ ...formData, metaTitle: e.target.value })}
                    placeholder="Page Meta Title (e.g. Digital Orra | Top Marketing Agency)"
                    required
                  />
                </div>

                {/* Meta Description Field */}
                <div className="admin-form-group">
                  <label>
                    Meta Description <span style={{ color: '#EC4899' }}>*</span>
                    <span className="char-count-text">({descLength} / 160 recommended)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.metaDescription}
                    onChange={e => setFormData({ ...formData, metaDescription: e.target.value })}
                    placeholder="Page Meta Description summary snippet that appears on Google SERP..."
                    required
                  />
                </div>

                {/* Focus Keywords & Canonical URL */}
                <div className="admin-form-grid-2">
                  <div className="admin-form-group">
                    <label>Focus Keywords</label>
                    <input
                      type="text"
                      value={formData.focusKeywords}
                      onChange={e => setFormData({ ...formData, focusKeywords: e.target.value })}
                      placeholder="e.g. digital marketing, performance marketing"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Canonical URL</label>
                    <input
                      type="text"
                      value={formData.canonicalUrl}
                      onChange={e => setFormData({ ...formData, canonicalUrl: e.target.value })}
                      placeholder="https://digitalorra.com/your-page"
                    />
                  </div>
                </div>

                {/* Social Share OG Image */}
                <div className="admin-form-group">
                  <label>OpenGraph Social Share Image (OG Image URL)</label>
                  <input
                    type="text"
                    value={formData.ogImage}
                    onChange={e => setFormData({ ...formData, ogImage: e.target.value })}
                    placeholder="OG Banner Image URL (e.g. /logo.png)"
                  />
                </div>

                {/* Modal Footer Save Bar */}
                <div className="admin-modal-footer">
                  <button type="button" className="btn-modal-cancel" onClick={() => setShowSeoModal(false)}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`btn-seo-save ${saveSuccess ? 'success-state' : ''}`}
                    disabled={isSaving}
                    style={{ minWidth: '180px' }}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={16} className="btn-spinner-icon" /> <span>Saving SEO...</span>
                      </>
                    ) : saveSuccess ? (
                      <>
                        <CheckCircle2 size={16} className="btn-success-icon" /> <span>SEO Saved Live!</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} /> <span>Save Configuration</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
