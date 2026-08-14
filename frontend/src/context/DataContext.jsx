import React, { createContext, useContext, useState, useEffect } from 'react';
import { servicesData as initialServices } from '../data/servicesData';
import { recognitionItems, newsList } from '../data/aboutData';
const initialRecognitions = [...recognitionItems, ...newsList];
import { jobOpenings as initialCareers } from '../data/careerData';


const API_BASE = import.meta.env.VITE_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:5000/api`;

// Helper: returns headers for protected API calls (Authorization header removed since we use HttpOnly cookies)
const getAuthHeaders = () => {
  return {
    'Content-Type': 'application/json'
  };
};

const initialPortfolio = [
  { id: 'web-1', title: 'The Bharat School Website', category: 'Website Design', image: '/port_web_des/1-1.webp', link: 'https://thebharatschool.com/', tags: ['Website Design', 'Education'] },
  { id: 'dm-1', title: 'Digital Marketing Campaign 1', category: 'Digital Marketing', image: '/port_digital/1.webp', tags: ['Digital Marketing', 'Campaign'] },
  { id: 'meta-9', title: 'Meta High-ROAS Lead Generation Ad', category: 'Google/Meta Ads', image: '/port_meta/9.webp', tags: ['Meta Ads', 'Lead Gen'] },
  { id: 'logo-2', title: 'Minimalist Brand Identity Logo', category: 'Logo Design', image: '/port_logo/2.webp', tags: ['Logo Design', 'Branding'] },

  { id: 'web-2', title: 'Royal Sky Trips Travel Portal', category: 'Website Design', image: '/port_web_des/2-1.webp', link: 'https://royalskytrips.com/', tags: ['Website Design', 'Travel'] },
  { id: 'dm-2', title: 'Digital Strategy & Brand Outreach', category: 'Digital Marketing', image: '/port_digital/2.webp', tags: ['Digital Marketing', 'Branding'] },
  { id: 'meta-10', title: 'Google Search PPC Campaign Visual', category: 'Google/Meta Ads', image: '/port_meta/10.webp', tags: ['Google Ads', 'PPC'] },
  { id: 'logo-3', title: 'Modern Corporate Crest Logo', category: 'Logo Design', image: '/port_logo/3.webp', tags: ['Corporate Logo', 'Vector'] },

  { id: 'web-3', title: 'Digital Orra Platform', category: 'Website Design', image: '/port_web_des/3-1.webp', link: 'https://digitalorra.digital/', tags: ['Website Design', 'Agency'] },
  { id: 'dm-3', title: 'Social Media Organic Growth', category: 'Digital Marketing', image: '/port_digital/3.webp', tags: ['Social Growth', 'Content'] },
  { id: 'meta-11', title: 'Facebook Carousel Ad Funnel Creative', category: 'Google/Meta Ads', image: '/port_meta/11.webp', tags: ['Facebook Ads', 'Carousel'] },
  { id: 'logo-4', title: 'Creative Agency Logo Concept', category: 'Logo Design', image: '/port_logo/4.webp', tags: ['Creative Design', 'Logo'] },

  { id: 'web-4', title: 'Target Greenland Website', category: 'Website Design', image: '/port_web_des/4-1.webp', link: 'https://targetgreenland.com/', tags: ['Website Design', 'Corporate'] },
  { id: 'dm-4', title: 'Performance Content Marketing', category: 'Digital Marketing', image: '/port_digital/4.webp', tags: ['Content', 'Marketing'] },
  { id: 'meta-12', title: 'Instagram Story High Conversion Ad', category: 'Google/Meta Ads', image: '/port_meta/12.webp', tags: ['Instagram Ads', 'Story'] },
  { id: 'logo-5', title: 'Luxury Monogram Insignia', category: 'Logo Design', image: '/port_logo/5.webp', tags: ['Monogram', 'Luxury'] },

  { id: 'web-5', title: 'Orion Properties Web Portal', category: 'Website Design', image: '/port_web_des/5-1.webp', link: 'https://orionproperties.info/', tags: ['Website Design', 'Real Estate'] },
  { id: 'dm-5', title: 'Multi-Channel Brand Strategy', category: 'Digital Marketing', image: '/port_digital/5.webp', tags: ['Brand Strategy', 'Reach'] },
  { id: 'meta-13', title: 'Google Performance Max Ad Scaling', category: 'Google/Meta Ads', image: '/port_meta/13.webp', tags: ['PMax', 'Google Ads'] },
  { id: 'logo-6', title: 'Tech Startup Mascot Logo', category: 'Logo Design', image: '/port_logo/6.webp', tags: ['Tech Logo', 'Mascot'] },

  { id: 'web-6', title: 'Orion Properties Showcase', category: 'Website Design', image: '/port_web_des/6-1.webp', link: 'https://orionproperties.info/', tags: ['Website Design', 'Property'] },
  { id: 'dm-6', title: 'Creative Reel & Video Marketing', category: 'Digital Marketing', image: '/port_digital/6.webp', tags: ['Video Reel', 'Social'] },
  { id: 'meta-14', title: 'Meta Audience Retargeting Campaign', category: 'Google/Meta Ads', image: '/port_meta/14.webp', tags: ['Retargeting', 'Meta'] },
  { id: 'logo-7', title: 'E-Commerce Brand Symbol', category: 'Logo Design', image: '/port_logo/7.webp', tags: ['Symbol', 'E-Commerce'] },

  { id: 'dm-8', title: 'Organic Reach & Traffic Scaling', category: 'Digital Marketing', image: '/port_digital/8.webp', tags: ['SEO', 'Traffic'] },
  { id: 'meta-15', title: 'E-Commerce High Intent Conversion Ad', category: 'Google/Meta Ads', image: '/port_meta/15.webp', tags: ['D2C Ads', 'ROAS'] },
  { id: 'logo-8', title: 'Elegant Typography Emblem', category: 'Logo Design', image: '/port_logo/8.webp', tags: ['Typography', 'Emblem'] },

  { id: 'dm-9', title: 'Digital Media Growth Showcase', category: 'Digital Marketing', image: '/port_digital/Blog-Images-M-11-scaled.webp', tags: ['Media', 'Showcase'] },
  { id: 'meta-analytics', title: 'Google & Meta Ads Performance Dashboard', category: 'Google/Meta Ads', image: '/port_meta/ads-ANALYTICS-1331-x-428-px.webp', tags: ['Analytics', 'ROAS'] },
  { id: 'logo-9', title: 'Geometric Vector Logo Design', category: 'Logo Design', image: '/port_logo/9.webp', tags: ['Geometric', 'Vector'] },

  { id: 'dm-10', title: 'Brand Awareness & Lead Campaign', category: 'Digital Marketing', image: '/port_digital/WhatsApp-Image-2026-01-20-at-4.59.58-PM.webp', tags: ['Lead Gen', 'Brand'] },
  { id: 'logo-10', title: 'Healthcare & Wellness Logo', category: 'Logo Design', image: '/port_logo/10.webp', tags: ['Healthcare', 'Wellness'] },

  { id: 'dm-11', title: 'Targeted Customer Acquisition', category: 'Digital Marketing', image: '/port_digital/WhatsApp-Image-2026-01-20-at-4.59.58-PM-1.webp', tags: ['Acquisition', 'Targeting'] },
  { id: 'logo-11', title: 'Real Estate Firm Landmark Logo', category: 'Logo Design', image: '/port_logo/11.webp', tags: ['Real Estate', 'Logo'] },

  { id: 'dm-12', title: 'Omnichannel Marketing Funnel', category: 'Digital Marketing', image: '/port_digital/WhatsApp-Image-2026-01-20-at-4.59.59-PM-1.webp', tags: ['Omnichannel', 'Funnel'] },
  { id: 'logo-12', title: 'Fintech App Icon & Logo', category: 'Logo Design', image: '/port_logo/12.webp', tags: ['Fintech', 'App Icon'] },

  { id: 'logo-13', title: 'Hospitality & Hotel Crest', category: 'Logo Design', image: '/port_logo/13.webp', tags: ['Hospitality', 'Crest'] },
  { id: 'logo-14', title: 'Automotive Performance Logo', category: 'Logo Design', image: '/port_logo/14.webp', tags: ['Automotive', 'Insignia'] },
  { id: 'logo-15', title: 'Fitness & Sportware Brand Emblem', category: 'Logo Design', image: '/port_logo/15.webp', tags: ['Fitness', 'Apparel'] },
  { id: 'logo-16', title: 'Restaurant & Cafe Mascot Logo', category: 'Logo Design', image: '/port_logo/16.webp', tags: ['Food & Cafe', 'Logo'] },
  { id: 'logo-17', title: 'Academy & Education Shield Logo', category: 'Logo Design', image: '/port_logo/17.webp', tags: ['Education', 'Shield'] },
  { id: 'logo-18', title: 'SaaS Platform Identity Logo', category: 'Logo Design', image: '/port_logo/18.webp', tags: ['SaaS', 'Identity'] },
  { id: 'logo-19', title: 'Fashion Boutique Emblem', category: 'Logo Design', image: '/port_logo/19.webp', tags: ['Fashion', 'Emblem'] },
  { id: 'logo-20', title: 'Logistics & Supply Chain Mark', category: 'Logo Design', image: '/port_logo/20.webp', tags: ['Logistics', 'Vector'] },
  { id: 'logo-21', title: 'Cybersecurity Shield Insignia', category: 'Logo Design', image: '/port_logo/21.webp', tags: ['Security', 'Shield'] },
  { id: 'logo-23', title: 'Organic Brand Vector Crest', category: 'Logo Design', image: '/port_logo/23.webp', tags: ['Organic', 'Crest'] },
  { id: 'logo-24', title: 'Media & Production Logo Mark', category: 'Logo Design', image: '/port_logo/24.webp', tags: ['Media', 'Logo'] },
  { id: 'logo-25', title: 'Prestige Jewelry Monogram', category: 'Logo Design', image: '/port_logo/25.webp', tags: ['Jewelry', 'Monogram'] },
  { id: 'logo-26', title: 'Legal & Consulting Firm Logo', category: 'Logo Design', image: '/port_logo/26.webp', tags: ['Legal', 'Consulting'] },
  { id: 'logo-27', title: 'Industrial & Construction Crest', category: 'Logo Design', image: '/port_logo/27.webp', tags: ['Construction', 'Crest'] }
];

const initialBlog = [
  { id: 1, title: 'Top Performance Marketing Strategies for D2C Brands in 2026', category: 'Performance Marketing', author: 'Digital ORRA Team', date: 'Aug 02, 2026', readTime: '5 min read', image: '/image1.webp', excerpt: 'Discover how top D2C brands scale revenue using multi-channel paid ads, hyper-targeted creative funnels, and data attribution.' },
  { id: 2, title: 'Featured Case Study: How Digital ORRA Scales Brands to 10x ROI', category: 'Video Breakdown', author: 'Agency Spotlight', date: 'Aug 01, 2026', readTime: '6 min watch', image: '/hero-model.jpg', excerpt: 'Watch our full video breakdown on how we engineer high-converting video campaigns and scale client revenues.', isVideo: true, videoUrl: 'https://www.youtube.com/watch?v=8NPyv5Am6Mo' },
  { id: 3, title: 'Generative Engine Optimization (GEO): The Future of AI Search', category: 'SEO & GEO', author: 'AI Growth Lab', date: 'Jul 28, 2026', readTime: '6 min read', image: '/IMG_1482-scaled.webp', excerpt: 'Learn how to optimize your digital content to rank on ChatGPT, SearchGPT, and Perplexity AI search results.' },
  { id: 4, title: 'How High-Converting Landing Pages Boost Ad Conversion by 300%', category: 'Web Development', author: 'Tech & Design Team', date: 'Jul 20, 2026', readTime: '4 min read', image: '/IMG_1485-scaled.webp', excerpt: 'Key UI/UX frameworks, speed optimization tactics, and psychological triggers that turn casual visitors into paying customers.' }
];

const initialLeads = [
  { id: 101, type: 'Audit Request', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', platform: 'YouTube', date: '2026-08-03 14:30', status: 'New' },
  { id: 102, type: 'Contact Form', name: 'Priya Verma', email: 'priya@techcorp.com', phone: '+91 98123 45678', service: 'Meta Ads', message: 'Looking for scaling e-commerce ads ROI.', date: '2026-08-02 11:15', status: 'Contacted' }
];

const initialReviews = [
  { id: 1, clientName: 'Tanishak', company: 'Growth Retail', rating: 5, quote: 'One of the best digital marketing agencies I’ve worked with. Digital ORRA delivers high-quality work, timely updates, and excellent results.' },
  { id: 2, clientName: 'Happy', company: 'Fitness Studio', rating: 5, quote: 'Amazing experience at Digital Orra! The environment is super friendly and the mentors are very experienced. We learned both theory and practical.' },
  { id: 3, clientName: 'Advisory Solutions', company: 'Financial Services', rating: 5, quote: 'Digital ORRA is truly the best digital marketing company in Panchkula! If you want to take your business to the next level, don’t think twice.' },
  { id: 4, clientName: 'Shubham', company: 'E-Com Brand', rating: 5, quote: 'I had a great experience at Digital ORRA. The well-structured course provided practical insights that are directly applicable to my career.' },
  { id: 5, clientName: 'Vyom Krishna', company: 'Tech Innovations', rating: 5, quote: 'Digital ORRA handles all our website updates, Google ranking, and social media campaigns — all under one roof. Super reliable and professional!' },
  { id: 6, clientName: 'Rajesh Khanna', company: 'Real Estate Group', rating: 5, quote: 'Digital Orra delivered hyper-targeted buyer leads for our project launch. Conversion rates and sales closing were outstanding.' },
  { id: 7, clientName: 'Sonam Sharma', company: 'Boutique Fashion', rating: 5, quote: 'The team designed a modern and user-friendly website for our brand. Their continuous SEO and social media efforts keep our business growing.' },
  { id: 8, clientName: 'Kamal Kishore', company: 'Fintech Solutions', rating: 5, quote: 'Exceptional ROI on Google PPC & Meta Ads. Our customer acquisition cost dropped by 35% in just two months.' }
];

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [services, setServices] = useState(initialServices);
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('do_portfolio');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return initialPortfolio;
  });
  const [reviews, setReviews] = useState(initialReviews);
  const [blog, setBlog] = useState(initialBlog);
  const [courses, setCourses] = useState([]);
  const [careers, setCareers] = useState(initialCareers);
  const [gallery, setGallery] = useState([]);
  const [seoPages, setSeoPages] = useState([]);
  const [leads, setLeads] = useState(initialLeads);
  const [recognitions, setRecognitions] = useState(() => {
    const saved = localStorage.getItem('do_recognitions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return initialRecognitions;
  });
  const [isBackendOnline, setIsBackendOnline] = useState(false);

  // Trash Bin State & LocalStorage Persistence
  const [trash, setTrash] = useState(() => {
    const saved = localStorage.getItem('do_trash');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [];
  });


  const moveToTrash = (item, collectionType) => {
    if (!item) return;
    const trashItem = {
      ...item,
      trashId: `${collectionType}_${item.id || item._id}_${Date.now()}`,
      originalCollection: collectionType,
      deletedAt: new Date().toLocaleString()
    };
    setTrash(prev => [trashItem, ...prev]);
  };

  const restoreFromTrash = async (trashItem) => {
    if (!trashItem) return;
    const { trashId, originalCollection, deletedAt, ...restoredItem } = trashItem;
    
    // Remove from trash state
    setTrash(prev => prev.filter(t => t.trashId !== trashId));

    // Restore back to original collection
    if (originalCollection === 'services') {
      setServices(prev => [restoredItem, ...prev]);
      try { await fetch(`${API_BASE}/services`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(restoredItem) }); } catch (e) {}
    } else if (originalCollection === 'portfolio') {
      setPortfolio(prev => {
        const next = [restoredItem, ...prev];
        localStorage.setItem('do_portfolio', JSON.stringify(next));
        return next;
      });
      try { await fetch(`${API_BASE}/portfolio`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(restoredItem) }); } catch (e) {}
    } else if (originalCollection === 'reviews') {
      setReviews(prev => [restoredItem, ...prev]);
      try { await fetch(`${API_BASE}/reviews`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(restoredItem) }); } catch (e) {}
    } else if (originalCollection === 'blog') {
      setBlog(prev => [restoredItem, ...prev]);
      try { await fetch(`${API_BASE}/blog`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(restoredItem) }); } catch (e) {}
    } else if (originalCollection === 'courses') {
      setCourses(prev => [restoredItem, ...prev]);
      try { await fetch(`${API_BASE}/courses`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(restoredItem) }); } catch (e) {}
    } else if (originalCollection === 'careers') {
      setCareers(prev => [restoredItem, ...prev]);
      try { await fetch(`${API_BASE}/careers`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(restoredItem) }); } catch (e) {}
    }
  };

  const permanentlyDeleteFromTrash = (trashId) => {
    setTrash(prev => prev.filter(t => t.trashId !== trashId));
  };

  const emptyTrash = () => {
    setTrash([]);
  };

  // Health check polling for Express Backend Server
  const checkBackendHealth = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 800);
      const res = await fetch(`${API_BASE}/health`, { signal: controller.signal });
      clearTimeout(timeoutId);
      setIsBackendOnline(res.ok);
      return res.ok;
    } catch (err) {
      setIsBackendOnline(false);
      return false;
    }
  };

  useEffect(() => {
    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  // Helper to normalize MongoDB _id to string id property
  const normalizeData = (arr) => arr.map(i => ({ ...i, id: i._id ? String(i._id) : String(i.id || Date.now()) }));

  // Fetch data from Express Backend API when backend is ONLINE
  useEffect(() => {
    if (isBackendOnline) {
      // fetch(`${API_BASE}/services`)
      //   .then(res => res.json())
      //   .then(data => { if (Array.isArray(data)) setServices(normalizeData(data)); })
      //   .catch(() => {});

      fetch(`${API_BASE}/portfolio`)
        .then(res => res.json())
        .then(data => { if (Array.isArray(data)) setPortfolio(normalizeData(data)); })
        .catch(() => {});

      fetch(`${API_BASE}/reviews`)
        .then(res => res.json())
        .then(data => { if (Array.isArray(data)) setReviews(normalizeData(data)); })
        .catch(() => {});

      fetch(`${API_BASE}/blog`)
        .then(res => res.json())
        .then(data => { if (Array.isArray(data)) setBlog(normalizeData(data)); })
        .catch(() => {});

      fetch(`${API_BASE}/courses`)
        .then(res => res.json())
        .then(data => { if (Array.isArray(data) && data.length > 0) setCourses(normalizeData(data)); })
        .catch(() => {});

      fetch(`${API_BASE}/careers`)
        .then(res => res.json())
        .then(data => { if (Array.isArray(data)) setCareers(normalizeData(data)); })
        .catch(() => {});

      fetch(`${API_BASE}/gallery`)
        .then(res => res.json())
        .then(data => { if (Array.isArray(data)) setGallery(normalizeData(data)); })
        .catch(() => {});

      fetch(`${API_BASE}/seo`)
        .then(res => { if (res.ok) return res.json(); return []; })
        .then(data => { if (Array.isArray(data)) setSeoPages(data); })
        .catch(() => {});

      fetch(`${API_BASE}/leads`)
        .then(res => res.json())
        .then(data => { if (Array.isArray(data)) setLeads(normalizeData(data)); })
        .catch(() => {});

      fetch(`${API_BASE}/recognitions`)
        .then(res => res.json())
        .then(data => { if (Array.isArray(data)) setRecognitions(normalizeData(data)); })
        .catch(() => {});
    }
  }, [isBackendOnline]);

  // LocalStorage data sync disabled as per request

  // Services CRUD with Backend API Sync
  const addService = async (item) => {
    const newItem = { id: Date.now().toString(), ...item };
    setServices([newItem, ...services]);
    try {
      await fetch(`${API_BASE}/services`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(newItem)
      });
    } catch (e) {
      console.log('Service post API error:', e);
    }
  };

  const updateService = async (id, updated) => {
    setServices(services.map(s => (s.id === id ? { ...s, ...updated } : s)));
    try {
      await fetch(`${API_BASE}/services/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.log('Service update API error:', e);
    }
  };

  const deleteService = async (id) => {
    const target = services.find(s => String(s.id) === String(id));
    if (target) moveToTrash(target, 'services');
    setServices(services.filter(s => String(s.id) !== String(id)));
    try {
      await fetch(`${API_BASE}/services/${id}`, { method: 'DELETE', credentials: 'include' });
    } catch (e) {
      console.log('Service delete API error:', e);
    }
  };

  // Portfolio CRUD with Backend API Sync
  const addPortfolio = async (item) => {
    const newItem = { id: Date.now(), ...item };
    setPortfolio(prev => {
      const next = [newItem, ...prev];
      localStorage.setItem('do_portfolio', JSON.stringify(next));
      return next;
    });
    try {
      await fetch(`${API_BASE}/portfolio`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(newItem)
      });
    } catch (e) {
      console.log('Portfolio post API error:', e);
    }
  };

  const updatePortfolio = async (id, updated) => {
    setPortfolio(prev => {
      const next = prev.map(p => (String(p.id) === String(id) ? { ...p, ...updated } : p));
      localStorage.setItem('do_portfolio', JSON.stringify(next));
      return next;
    });
    try {
      await fetch(`${API_BASE}/portfolio/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.log('Portfolio update API error:', e);
    }
  };

  const deletePortfolio = async (id) => {
    const target = portfolio.find(p => String(p.id) === String(id));
    if (target) moveToTrash(target, 'portfolio');
    setPortfolio(prev => {
      const next = prev.filter(p => String(p.id) !== String(id));
      localStorage.setItem('do_portfolio', JSON.stringify(next));
      return next;
    });
    try {
      await fetch(`${API_BASE}/portfolio/${id}`, { method: 'DELETE', credentials: 'include' });
    } catch (e) {
      console.log('Portfolio delete API error:', e);
    }
  };

  // Reviews CRUD with Backend API Sync
  const addReview = async (item) => {
    const newItem = { id: Date.now(), ...item };
    setReviews([newItem, ...reviews]);
    try {
      await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(newItem)
      });
    } catch (e) {
      console.log('Review post API error:', e);
    }
  };

  const updateReview = async (id, updated) => {
    setReviews(reviews.map(r => (r.id === id ? { ...r, ...updated } : r)));
    try {
      await fetch(`${API_BASE}/reviews/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.log('Review update API error:', e);
    }
  };

  const deleteReview = async (id) => {
    const target = reviews.find(r => String(r.id || r._id) === String(id));
    if (target) moveToTrash(target, 'reviews');
    setReviews(reviews.filter(r => String(r.id || r._id) !== String(id)));
    try {
      await fetch(`${API_BASE}/reviews/${id}`, { method: 'DELETE', credentials: 'include' });
    } catch (e) {
      console.log('Review delete API error:', e);
    }
  };

  // Blog CRUD with Backend API Sync
  const addBlog = async (item) => {
    const newItem = { id: Date.now(), ...item };
    setBlog([newItem, ...blog]);
    try {
      await fetch(`${API_BASE}/blog`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(newItem)
      });
    } catch (e) {
      console.log('Blog post API error:', e);
    }
  };

  const updateBlog = async (id, updated) => {
    setBlog(blog.map(b => (b.id === id ? { ...b, ...updated } : b)));
    try {
      await fetch(`${API_BASE}/blog/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.log('Blog update API error:', e);
    }
  };

  const deleteBlog = async (id) => {
    const target = blog.find(b => String(b.id) === String(id));
    if (target) moveToTrash(target, 'blog');
    setBlog(blog.filter(b => String(b.id) !== String(id)));
    try {
      await fetch(`${API_BASE}/blog/${id}`, { method: 'DELETE', credentials: 'include' });
    } catch (e) {
      console.log('Blog delete API error:', e);
    }
  };

  // Courses CRUD with Backend API Sync
  const addCourse = async (item) => {
    const newItem = { id: Date.now().toString(), ...item };
    setCourses([newItem, ...courses]);
    try {
      await fetch(`${API_BASE}/courses`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(newItem)
      });
    } catch (e) {
      console.log('Course post API error:', e);
    }
  };

  const updateCourse = async (id, updated) => {
    setCourses(courses.map(c => (c.id === id ? { ...c, ...updated } : c)));
    try {
      await fetch(`${API_BASE}/courses/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.log('Course update API error:', e);
    }
  };

  const deleteCourse = async (id) => {
    const target = courses.find(c => String(c.id) === String(id));
    if (target) moveToTrash(target, 'courses');
    setCourses(courses.filter(c => String(c.id) !== String(id)));
    try {
      await fetch(`${API_BASE}/courses/${id}`, { method: 'DELETE', credentials: 'include' });
    } catch (e) {
      console.log('Course delete API error:', e);
    }
  };

  // Careers CRUD with Backend API Sync
  const addCareer = async (item) => {
    const newItem = { id: Date.now().toString(), ...item };
    setCareers([newItem, ...careers]);
    try {
      await fetch(`${API_BASE}/careers`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(newItem)
      });
    } catch (e) {
      console.log('Career post API error:', e);
    }
  };

  const updateCareer = async (id, updated) => {
    setCareers(careers.map(c => (c.id === id ? { ...c, ...updated } : c)));
    try {
      await fetch(`${API_BASE}/careers/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.log('Career update API error:', e);
    }
  };

  const deleteCareer = async (id) => {
    const target = careers.find(c => String(c.id) === String(id));
    if (target) moveToTrash(target, 'careers');
    setCareers(careers.filter(c => String(c.id) !== String(id)));
    try {
      await fetch(`${API_BASE}/careers/${id}`, { method: 'DELETE', credentials: 'include' });
    } catch (e) {
      console.log('Career delete API error:', e);
    }
  };

  // Leads CRUD with Backend API Sync
  const addLead = async (lead) => {
    const newLead = { id: Date.now(), date: new Date().toLocaleString(), status: 'New', ...lead };
    setLeads([newLead, ...leads]);
    try {
      await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'omit', // public route, no auth needed
        body: JSON.stringify(newLead)
      });
    } catch (e) {
      console.log('Lead post API error:', e);
    }
  };

  const updateLeadStatus = async (id, newStatus) => {
    setLeads(leads.map(l => (l.id === id ? { ...l, status: newStatus } : l)));
    try {
      await fetch(`${API_BASE}/leads/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      console.log('Lead update API error:', e);
    }
  };

  const deleteLead = async (id) => {
    const target = leads.find(l => String(l.id) === String(id));
    if (target) moveToTrash(target, 'leads');
    setLeads(leads.filter(l => String(l.id) !== String(id)));
    try {
      await fetch(`${API_BASE}/leads/${id}`, { method: 'DELETE', credentials: 'include' });
    } catch (e) {
      console.log('Lead delete API error:', e);
    }
  };

  const addRecognition = async (newItem) => {
    setRecognitions([newItem, ...recognitions]);
    try {
      await fetch(`${API_BASE}/recognitions`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(newItem)
      });
    } catch (e) {
      console.log('Recognition add API error:', e);
    }
  };

  const updateRecognition = async (id, updated) => {
    setRecognitions(recognitions.map(r => (String(r.id) === String(id) ? { ...r, ...updated } : r)));
    try {
      await fetch(`${API_BASE}/recognitions/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.log('Recognition update API error:', e);
    }
  };

  const deleteRecognition = async (id) => {
    const target = recognitions.find(r => String(r.id) === String(id));
    if (target) moveToTrash(target, 'recognitions');
    setRecognitions(recognitions.filter(r => String(r.id) !== String(id)));
    try {
      await fetch(`${API_BASE}/recognitions/${id}`, { method: 'DELETE', credentials: 'include' });
    } catch (e) {
      console.log('Recognition delete API error:', e);
    }
  };

  const updateSeoPage = async (seoData) => {
    setSeoPages(prev => {
      const exists = prev.some(s => s.pageSlug === seoData.pageSlug);
      if (exists) {
        return prev.map(s => s.pageSlug === seoData.pageSlug ? { ...s, ...seoData, updatedAt: new Date() } : s);
      }
      return [seoData, ...prev];
    });

    try {
      await fetch(`${API_BASE}/seo`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify(seoData)
      });
    } catch (e) {
      console.log('SEO update error:', e);
    }
  };

  return (
    <DataContext.Provider value={{
      isBackendOnline,
      checkBackendHealth,
      services, addService, updateService, deleteService,
      portfolio, addPortfolio, updatePortfolio, deletePortfolio,
      recognitions, addRecognition, updateRecognition, deleteRecognition,
      reviews, addReview, updateReview, deleteReview,
      blog, addBlog, updateBlog, deleteBlog,
      courses, addCourse, updateCourse, deleteCourse,
      careers, addCareer, updateCareer, deleteCareer,
      gallery,
      seoPages, updateSeoPage,
      leads, addLead, updateLeadStatus, deleteLead,
      trash, restoreFromTrash, permanentlyDeleteFromTrash, emptyTrash
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
