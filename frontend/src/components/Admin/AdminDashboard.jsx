import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Image as ImageIcon, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Inbox, 
  Plus, 
  Trash2, 
  Edit3, 
  LogOut, 
  CheckCircle2, 
  Search,
  ExternalLink,
  ShieldAlert,
  Video,
  X,
  Menu,
  Sparkles,
  MailCheck,
  Mail,
  Shield,
  Check,
  Bell,
  MessageSquareQuote,
  Loader2,
  Upload,
  Link,
  RotateCcw,
  RefreshCw,
  Settings,
  User,
  Key,
  Eye,
  EyeOff,
  Save,
  Award
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import ServerErrorNotice from '../Common/ServerErrorNotice';
import JoditRichEditor from './JoditRichEditor';
import AdminSeoManager from './AdminSeoManager';
import { ICON_MAP, COLOR_THEMES, RenderColorfulCourseIcon } from '../Courses/CourseIconHelper';
import './AdminDashboard.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:5000/api`;
const STANDARD_DEPTS = [
  'Performance Marketing',
  'Engineering & Tech',
  'Creative Design & Video',
  'SEO & Content Strategy',
  'Sales & Business Development',
  'Client Operations & HR'
];

const STANDARD_SERVICES_CATS = [
  'Performance Marketing',
  'Search Engine Optimization (SEO)',
  'Social Media & Automation',
  'Web & App Development',
  'Creative Design & Branding'
];

const STANDARD_SERVICE_TAGS = [
  'High ROAS',
  'Popular',
  'Trending',
  'Best Seller',
  'High Demand',
  'Organic Growth',
  'Enterprise Grade',
  'AI Powered',
  'Featured'
];

const STANDARD_BLOG_CATS = [
  'Digital Marketing',
  'Graphics & Design',
  'SEO',
  'Social Media',
  'Web Designing'
];

const STANDARD_COURSE_CATS = [
  'Digital Marketing & Performance',
  'AI & Search (SEO/AEO/GEO)',
  'Social Media & Automation',
  'Creative Design & Production',
  'Full-Stack Web & Software'
];

function AdminImagePicker({ value, onChange, label = "Image Asset (URL or Device Upload)" }) {
  const [mode, setMode] = useState('url');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'omit' // not protected
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          onChange(data.url);
          setIsUploading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Cloudinary upload endpoint unreachable, falling back to local DataURL');
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-form-group admin-image-picker-wrap">
      <div className="image-picker-header">
        <label>{label}</label>
        <div className="image-mode-toggle-pills">
          <button
            type="button"
            className={`mode-pill-btn ${mode === 'url' ? 'active' : ''}`}
            onClick={() => setMode('url')}
          >
            <Link size={12} /> Image URL
          </button>
          <button
            type="button"
            className={`mode-pill-btn ${mode === 'upload' ? 'active' : ''}`}
            onClick={() => setMode('upload')}
          >
            <Upload size={12} /> Upload File
          </button>
        </div>
      </div>

      {mode === 'url' ? (
        <input
          type="text"
          placeholder="Paste URL / Path (e.g. https://... or /gallery/1.webp)"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className="image-upload-drop-card" onClick={() => !isUploading && fileInputRef.current && fileInputRef.current.click()}>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div className="upload-drop-content">
            <Upload size={20} className="upload-icon-pulse" />
            <span className="upload-main-text">
              {isUploading ? '⚡ Uploading image...' : 'Click to choose image file from device'}
            </span>
            <span className="upload-sub-text">
              {isUploading ? 'Please wait a moment' : 'Direct Cloudinary Upload (JPG, PNG, WEBP, GIF)'}
            </span>
          </div>
        </div>
      )}

      {value && (
        <div className="admin-image-preview-thumb-box">
          <img src={value} alt="Live Preview" className="admin-preview-img" />
          <div className="preview-meta-info">
            <span className="preview-status-badge">Live Image Selected</span>
            <button
              type="button"
              className="btn-clear-image"
              onClick={() => onChange('')}
              title="Remove Image"
            >
              <X size={12} /> Clear Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const TAB_TITLES = {
  overview: 'Overview Dashboard',
  services: 'Services Management',
  portfolio: 'Portfolio Showcase',
  reviews: 'Client Reviews',
  blog: 'Blog Articles',
  courses: 'Courses',
  careers: 'Career Job Openings',
  audits: 'Free Audit Requests',
  leads: 'Contact Leads Inbox',
  seo: 'SEO Manager & Meta Tags',
  trash: 'Trash Bin History',
  settings: 'Admin Account & Security Settings'
};

const ADD_BUTTON_LABELS = {
  services: 'Add New Service',
  portfolio: 'Add New Portfolio',
  reviews: 'Add New Review',
  blog: 'Add New Blog',
  courses: 'Add New Course',
  careers: 'Post Job Opening'
};

export default function AdminDashboard({ onLogout, user }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Admin Settings Form States
  const [adminUsername, setAdminUsername] = useState(user?.username || 'admin');
  const [adminEmail, setAdminEmail] = useState(user?.email || 'admin@digitalorra.com');
  const [adminDisplayName, setAdminDisplayName] = useState(user?.displayName || 'Digital ORRA Super Admin');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState({ type: '', text: '' });
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);

  // Email OTP Verification States
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpMsg, setOtpMsg] = useState({ type: '', text: '' });
  const otpTimerRef = useRef(null);
  const originalEmailRef = useRef(adminEmail);

  // Track if email was changed from the saved version
  const emailChanged = adminEmail.trim().toLowerCase() !== (user?.email || 'admin@digitalorra.com').toLowerCase();

  // Reset OTP states when email changes
  useEffect(() => {
    if (emailChanged) {
      setEmailVerified(false);
      setOtpSent(false);
      setOtpCode('');
      setOtpMsg({ type: '', text: '' });
    }
  }, [adminEmail]);

  // OTP countdown timer
  useEffect(() => {
    if (otpTimer > 0) {
      otpTimerRef.current = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    }
    return () => clearTimeout(otpTimerRef.current);
  }, [otpTimer]);

  // Send OTP to email
  const handleSendOtp = async () => {
    const email = adminEmail.trim();
    if (!email) {
      setOtpMsg({ type: 'error', text: 'Please enter a valid email address first.' });
      return;
    }

    setIsSendingOtp(true);
    setOtpMsg({ type: '', text: '' });

    try {
      const response = await fetch(`${API_BASE}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'omit'
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setOtpSent(true);
        setOtpTimer(300); // 5 min countdown
        setOtpMsg({ type: 'success', text: `✅ OTP sent to ${email}! Check your inbox.` });
      } else {
        setOtpMsg({ type: 'error', text: data.error || 'Failed to send OTP.' });
      }
    } catch (err) {
      setOtpMsg({ type: 'error', text: 'Cannot connect to server. Is backend running?' });
    }
    setIsSendingOtp(false);
  };

  // Verify OTP code
  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length !== 6) {
      setOtpMsg({ type: 'error', text: 'Please enter the 6-digit OTP code.' });
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const response = await fetch(`${API_BASE}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail.trim(), otp: otpCode }),
        credentials: 'omit'
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setEmailVerified(true);
        setOtpMsg({ type: 'success', text: '✅ Email verified successfully!' });
        setOtpTimer(0);
      } else {
        setOtpMsg({ type: 'error', text: data.error || 'Invalid OTP!' });
      }
    } catch (err) {
      setOtpMsg({ type: 'error', text: 'Verification failed. Server error.' });
    }
    setIsVerifyingOtp(false);
  };

  const handleSettingsSave = async (e) => {
    e.preventDefault();
    setSettingsMsg({ type: '', text: '' });

    // If email was changed, require OTP verification
    if (emailChanged && !emailVerified) {
      setSettingsMsg({ type: 'error', text: 'Please verify your new email address with OTP before saving!' });
      return;
    }

    if (newPassword || confirmPassword) {
      const activePass = localStorage.getItem('do_admin_password') || 'admin123';
      if (currentPassword !== activePass && currentPassword !== 'admin123' && currentPassword !== 'admin') {
        setSettingsMsg({ type: 'error', text: 'Current Password is incorrect!' });
        return;
      }
      if (newPassword.length < 5) {
        setSettingsMsg({ type: 'error', text: 'New Password must be at least 5 characters long!' });
        return;
      }
      if (newPassword !== confirmPassword) {
        setSettingsMsg({ type: 'error', text: 'New Password and Confirm Password do not match!' });
        return;
      }
    }

    setIsSavingSettings(true);
    setSettingsSavedSuccess(false);

    try {
      const res = await fetch(`${API_BASE}/admin/update-settings`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          displayName: adminDisplayName.trim(),
          username: adminUsername.trim(),
          email: adminEmail.trim(),
          currentPassword,
          newPassword
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {

        setSettingsSavedSuccess(true);
        setSettingsMsg({ type: 'success', text: '✅ Admin Profile & Credentials successfully updated in MongoDB Atlas Database!' });
      } else {
        setSettingsMsg({ type: 'error', text: data.message || 'Failed to update admin settings. Please try again.' });
      }
    } catch (err) {
      setSettingsMsg({ type: 'error', text: '⚠️ Backend server is offline! Cannot update settings without a running backend.' });
    } finally {
      setIsSavingSettings(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSettingsSavedSuccess(false), 4000);
    }
  };
  const {
    isBackendOnline,
    services, addService, updateService, deleteService,
    portfolio, addPortfolio, updatePortfolio, deletePortfolio,
    recognitions, addRecognition, updateRecognition, deleteRecognition,
    reviews, addReview, updateReview, deleteReview,
    blog, addBlog, updateBlog, deleteBlog,
    courses, addCourse, updateCourse, deleteCourse,
    careers, addCareer, updateCareer, deleteCareer,
    leads, updateLeadStatus, deleteLead,
    seoPages, updateSeoPage,
    trash, restoreFromTrash, permanentlyDeleteFromTrash, emptyTrash
  } = useData();

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // Item being edited
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Helper renderer for animated save buttons
  const renderSaveButton = (defaultLabel) => (
    <button 
      type="submit" 
      className={`btn-modal-save ${saveSuccess ? 'success-state' : ''}`} 
      disabled={isSaving}
    >
      {isSaving ? (
        <>
          <Loader2 size={16} className="btn-spinner-icon" /> <span>Saving Online...</span>
        </>
      ) : saveSuccess ? (
        <>
          <CheckCircle2 size={16} className="btn-success-icon" /> <span>Saved Online!</span>
        </>
      ) : (
        <>
          <Plus size={16} /> <span>{defaultLabel}</span>
        </>
      )}
    </button>
  );

  // Add Form States
  const [newService, setNewService] = useState({ title: '', slug: '', category: 'Performance Marketing', tag: 'High ROAS', desc: '', features: '', _isCatOther: false, _isTagOther: false });
  const [newPortfolio, setNewPortfolio] = useState({ title: '', category: 'E-Commerce', client: '', image: '', link: '' });
  const [newReview, setNewReview] = useState({ clientName: '', company: '', rating: 5, quote: '' });
  const [newBlog, setNewBlog] = useState({ title: '', slug: '', category: 'Digital Marketing', author: 'Digital ORRA Team', date: 'June 29, 2026', readTime: '5 min read', image: '', excerpt: '', content: '', isVideo: false, videoUrl: '', _isCatOther: false });
  const [newCourse, setNewCourse] = useState({ 
    title: '', 
    category: 'Digital Marketing & Performance', 
    badge: 'NEW', 
    duration: '3 Months', 
    price: '₹35,000', 
    originalPrice: '₹42,000', 
    discount: '16% OFF', 
    subtitle: '', 
    desc: '', 
    iconName: 'TrendingUp', 
    iconColor: 'pink', 
    popular: false, 
    hasInternship: true, 
    placementAssistance: true,
    idealFor: 'Beginners, Marketers & Career Professionals',
    syllabus: '',
    _isCatOther: false
  });
  const handleCareerAdd = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const finalCareer = { ...newCareer };
    if (finalCareer._isOther) {
      finalCareer.department = finalCareer.department; 
    }
    delete finalCareer._isOther;
    await addCareer(finalCareer);
    setIsSaving(false);
    setShowAddModal(false);
    setNewCareer({ title: '', department: 'Engineering & Tech', experience: 'Minimum 2 Years', type: 'Full-time (In-Office)', location: 'Panchkula, India', salary: 'As per market standard', description: '', _isOther: false });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleRecognitionAdd = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await addRecognition(newRecognition);
    setIsSaving(false);
    setShowAddModal(false);
    setNewRecognition({ title: '', category: 'awards', year: new Date().getFullYear().toString(), issuer: '', image: '', link: '' });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const [newRecognition, setNewRecognition] = useState({ title: '', category: 'awards', year: new Date().getFullYear().toString(), issuer: '', image: '', link: '' });

  // Filtered Leads
  const auditLeads = leads.filter(l => l.type === 'Audit Request' || l.platform);
  const contactLeads = leads.filter(l => l.type === 'Contact Form' || l.service);

  // Deleting Animation Map & Handler
  const [deletingMap, setDeletingMap] = useState({});

  const handleDeleteItem = async (id, deleteFn) => {
    if (deletingMap[id]) return;
    setDeletingMap(prev => ({ ...prev, [id]: 'deleting' }));
    
    // 1.5 second loading spinner animation
    await new Promise(res => setTimeout(res, 1500));
    
    setDeletingMap(prev => ({ ...prev, [id]: 'success' }));
    
    // 0.8 second green check mark animation
    await new Promise(res => setTimeout(res, 800));
    
    await deleteFn(id);
    setDeletingMap(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const renderDeleteButton = (id, deleteFn, text = 'Delete') => {
    const state = deletingMap[id];
    return (
      <button 
        type="button"
        className={`btn-table-delete ${state === 'success' ? 'success-delete-state' : ''}`}
        onClick={() => handleDeleteItem(id, deleteFn)}
        disabled={!!state}
      >
        {state === 'deleting' ? (
          <>
            <Loader2 size={13} className="btn-spinner-icon" /> <span>Deleting...</span>
          </>
        ) : state === 'success' ? (
          <>
            <CheckCircle2 size={13} className="btn-success-icon" /> <span>Deleted!</span>
          </>
        ) : (
          <>
            <Trash2 size={13} /> <span>{text}</span>
          </>
        )}
      </button>
    );
  };

  // Add Handlers with 1.5s Loading Spinner & Green Checkmark Animation
  const handleServiceAdd = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    await addService({
      id: Date.now().toString(),
      ...newService,
      icon: <Layers size={26} />,
      features: typeof newService.features === 'string' ? newService.features.split(',').map(f => f.trim()) : newService.features
    });
    // 1.5 second loading animation
    await new Promise(res => setTimeout(res, 1500));
    setIsSaving(false);
    setSaveSuccess(true);
    // 0.8 second green tick mark
    await new Promise(res => setTimeout(res, 800));
    setSaveSuccess(false);
    setShowAddModal(false);
    setNewService({ title: '', slug: '', category: 'Performance Marketing', tag: 'High ROAS', desc: '', features: '', _isCatOther: false, _isTagOther: false });
  };

  const handlePortfolioAdd = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    await addPortfolio({ id: Date.now(), ...newPortfolio, tags: ['Featured', newPortfolio.category] });
    // 1.5 second loading animation
    await new Promise(res => setTimeout(res, 1500));
    setIsSaving(false);
    setSaveSuccess(true);
    // 0.8 second green tick mark
    await new Promise(res => setTimeout(res, 800));
    setSaveSuccess(false);
    setShowAddModal(false);
    setNewPortfolio({ title: '', category: 'E-Commerce', client: '', image: '', link: '' });
  };

  const handleReviewAdd = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    await addReview({ id: Date.now(), ...newReview });
    // 1.5 second loading animation
    await new Promise(res => setTimeout(res, 1500));
    setIsSaving(false);
    setSaveSuccess(true);
    // 0.8 second green tick mark
    await new Promise(res => setTimeout(res, 800));
    setSaveSuccess(false);
    setShowAddModal(false);
    setNewReview({ clientName: '', company: '', rating: 5, quote: '' });
  };

  const handleBlogAdd = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    const slug = newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    await addBlog({ id: Date.now(), slug, ...newBlog });
    // 1.5 second loading animation
    await new Promise(res => setTimeout(res, 1500));
    setIsSaving(false);
    setSaveSuccess(true);
    // 0.8 second green tick mark
    await new Promise(res => setTimeout(res, 800));
    setSaveSuccess(false);
    setShowAddModal(false);
    setNewBlog({ title: '', category: 'Digital Marketing', author: 'Digital ORRA Team', date: 'June 29, 2026', readTime: '5 min read', image: '', excerpt: '', content: '', isVideo: false, videoUrl: '' });
  };

  const handleCourseAdd = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    const syllabusArray = typeof newCourse.syllabus === 'string'
      ? newCourse.syllabus.split(',').map(s => s.trim()).filter(Boolean)
      : newCourse.syllabus;
    await addCourse({ 
      id: Date.now().toString(), 
      ...newCourse, 
      syllabus: syllabusArray && syllabusArray.length > 0 ? syllabusArray : ['Live Client Projects', 'Certificate of Completion', 'Job Referral Support']
    });
    // 1.5 second loading animation
    await new Promise(res => setTimeout(res, 1500));
    setIsSaving(false);
    setSaveSuccess(true);
    // 0.8 second green tick mark
    await new Promise(res => setTimeout(res, 800));
    setSaveSuccess(false);
    setShowAddModal(false);
    setNewCourse({ 
      title: '', 
      category: 'Digital Marketing & Performance', 
      badge: 'NEW', 
      duration: '3 Months', 
      price: '₹35,000', 
      originalPrice: '₹42,000', 
      discount: '16% OFF', 
      subtitle: '', 
      desc: '', 
      iconName: 'TrendingUp', 
      iconColor: 'pink', 
      popular: false, 
      hasInternship: true, 
      placementAssistance: true,
      syllabus: ''
    });
  };

  // Edit Submit Handler with 1.5s Loading & Green Checkmark Animation
  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSaving(true);
    setSaveSuccess(false);

    if (activeTab === 'services') {
      const updatedFeatures = typeof editingItem.features === 'string' ? editingItem.features.split(',').map(f => f.trim()) : editingItem.features;
      await updateService(editingItem.id, { ...editingItem, features: updatedFeatures });
    } else if (activeTab === 'portfolio') {
      await updatePortfolio(editingItem.id, editingItem);
    } else if (activeTab === 'reviews') {
      await updateReview(editingItem.id, editingItem);
    } else if (activeTab === 'blog') {
      await updateBlog(editingItem.id, editingItem);
    } else if (activeTab === 'courses') {
      await updateCourse(editingItem.id, editingItem);
    } else if (activeTab === 'careers') {
      await updateCareer(editingItem.id, editingItem);
    } else if (activeTab === 'recognitions') {
      await updateRecognition(editingItem.id, editingItem);
    }

    // 1.5 second loading animation
    await new Promise(res => setTimeout(res, 1500));
    setIsSaving(false);
    setSaveSuccess(true);
    // 0.8 second green tick mark
    await new Promise(res => setTimeout(res, 800));
    setSaveSuccess(false);
    setEditingItem(null);
  };

  // Notification state
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  // Mobile Sidebar Drawer State
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const closeSidebar = () => setIsMobileSidebarOpen(false);
  const handleNavTabClick = (tab) => {
    setActiveTab(tab);
    closeSidebar(); // auto-close drawer on mobile when nav item clicked
  };

  // Close notifications on outside click
  useEffect(() => {
    document.title = 'Digital ORRA | Admin Control Panel';
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.title = 'Digital ORRA | #1 Performance Marketing & Digital Growth Agency';
    };
  }, []);

  const latestNotifications = isBackendOnline ? leads.slice(0, 5) : [];
  const unreadCount = isBackendOnline ? leads.filter(l => l.status === 'New').length : 0;

  return (
    <div className="admin-dashboard-layout">
      
      {/* Mobile Sidebar Overlay Backdrop */}
      {isMobileSidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={closeSidebar} />
      )}

      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${isMobileSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="admin-brand">
          <span className="brand-dot"></span>
          <h2>Digital ORRA Admin</h2>
          {/* Close button inside sidebar (visible on mobile) */}
          <button className="sidebar-close-btn" onClick={closeSidebar} title="Close Menu">
            <X size={20} />
          </button>
        </div>

        <nav className="admin-nav">
          <button className={`admin-nav-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => handleNavTabClick('overview')}>
            <LayoutDashboard size={18} /> <span>Overview</span>
          </button>
          {/* <button className={`admin-nav-btn ${activeTab === 'services' ? 'active' : ''}`} onClick={() => handleNavTabClick('services')}>
            <Layers size={18} /> <span>Services ({services.length})</span>
          </button> */}
          <button className={`admin-nav-btn ${activeTab === 'portfolio' ? 'active' : ''}`} onClick={() => handleNavTabClick('portfolio')}>
            <ImageIcon size={18} /> <span>Portfolio ({isBackendOnline ? portfolio.length : 0})</span>
          </button>
          <button className={`admin-nav-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => handleNavTabClick('reviews')}>
            <MessageSquareQuote size={18} /> <span>Client Reviews ({isBackendOnline ? reviews.length : 0})</span>
          </button>
          <button className={`admin-nav-btn ${activeTab === 'blog' ? 'active' : ''}`} onClick={() => handleNavTabClick('blog')}>
            <FileText size={18} /> <span>Blog ({isBackendOnline ? blog.length : 0})</span>
          </button>
          <button className={`admin-nav-btn ${activeTab === 'recognitions' ? 'active' : ''}`} onClick={() => handleNavTabClick('recognitions')}>
            <Award size={18} /> <span>Awards & News ({isBackendOnline ? recognitions.length : 0})</span>
          </button>
          <button className={`admin-nav-btn ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => handleNavTabClick('courses')}>
            <GraduationCap size={18} /> <span>Courses ({courses.length})</span>
          </button>
          <button className={`admin-nav-btn ${activeTab === 'careers' ? 'active' : ''}`} onClick={() => handleNavTabClick('careers')}>
            <Briefcase size={18} /> <span>Careers ({isBackendOnline ? careers.length : 0})</span>
          </button>

          {/* DEDICATED FREE AUDIT MAILS TAB */}
          <button className={`admin-nav-btn ${activeTab === 'audits' ? 'active' : ''}`} onClick={() => handleNavTabClick('audits')}>
            <Sparkles size={18} /> <span>Free Audit Mails ({isBackendOnline ? auditLeads.length : 0})</span>
          </button>

          <button className={`admin-nav-btn ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => handleNavTabClick('leads')}>
            <Inbox size={18} /> <span>Contact Leads ({isBackendOnline ? contactLeads.length : 0})</span>
          </button>

          {/* SEO MANAGER TAB */}
          <button className={`admin-nav-btn ${activeTab === 'seo' ? 'active' : ''}`} onClick={() => handleNavTabClick('seo')}>
            <Search size={18} /> <span>SEO Manager</span>
          </button>

          {/* TRASH BIN TAB */}
          <button className={`admin-nav-btn ${activeTab === 'trash' ? 'active' : ''}`} onClick={() => handleNavTabClick('trash')}>
            <Trash2 size={18} /> <span>Trash Bin ({trash.length})</span>
          </button>

          {/* ADMIN SETTINGS TAB */}
          <button className={`admin-nav-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => handleNavTabClick('settings')}>
            <Settings size={18} /> <span>Admin Settings</span>
          </button>
        </nav>

        <button className="admin-logout-btn" onClick={onLogout}>
          <LogOut size={16} /> <span>Logout Admin</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-content">
        
        {/* Top Header */}
        <header className="admin-top-bar">
          <div className="admin-header-title-group">
            {/* Hamburger Menu Button (visible on mobile/tablet) */}
            <button
              className="btn-sidebar-toggle"
              onClick={() => setIsMobileSidebarOpen(true)}
              title="Open Menu"
            >
              <Menu size={22} />
            </button>
            <h1 className="admin-page-title">
              {TAB_TITLES[activeTab] || 'Management'}
            </h1>
            {!isBackendOnline && (
              <div className="server-status-pill offline">
                <span className="status-dot-pulse red-pulse"></span>
                <span>Offline</span>
              </div>
            )}
          </div>

          {/* TOP RIGHT ACTION ICONS: NOTIFICATION BELL & SETTINGS GEAR */}
          <div className="admin-top-actions">
            <div className="notif-wrapper" ref={notifRef}>
              <button 
                className={`btn-admin-notif ${showNotifications ? 'active' : ''}`} 
                onClick={() => setShowNotifications(!showNotifications)}
                title="View Latest Notifications"
              >
                <Bell size={20} />
                <span className="notif-badge">{unreadCount}</span>
              </button>

              {showNotifications && (
                <div className="notif-dropdown-card">
                  <div className="notif-card-header">
                    <div className="notif-header-title-box">
                      <h3>Notifications</h3>
                      <span className="notif-count-pill">{unreadCount} New</span>
                    </div>
                    {unreadCount > 0 && (
                      <button 
                        className="btn-mark-all-read"
                        onClick={(e) => {
                          e.stopPropagation();
                          leads.forEach(l => {
                            if (l.status === 'New') updateLeadStatus(l.id, 'Contacted');
                          });
                        }}
                      >
                        <CheckCircle2 size={13} /> Mark all read
                      </button>
                    )}
                  </div>

                  <div className="notif-card-list">
                    {isBackendOnline && latestNotifications.length > 0 ? (
                      latestNotifications.map(n => (
                        <div 
                          key={n.id} 
                          className={`notif-item-card ${n.status === 'New' ? 'unread' : ''}`}
                          onClick={() => {
                            setActiveTab(n.type === 'Audit Request' || n.platform ? 'audits' : 'leads');
                            setShowNotifications(false);
                          }}
                        >
                          <div className="notif-item-icon">
                            {n.type === 'Job Application' ? <Briefcase size={16} /> : n.type === 'Audit Request' || n.platform ? <Sparkles size={16} /> : <Inbox size={16} />}
                          </div>
                          <div className="notif-item-content">
                            <div className="notif-item-title-row">
                              <strong>{n.name || 'New Lead'}</strong>
                              <span className="notif-time">{n.date?.split(' ')[1] || 'Just now'}</span>
                            </div>
                            <p className="notif-item-sub">
                              {n.type === 'Job Application' ? `Applied: ${n.service || 'Job Candidate'}` : n.type === 'Audit Request' || n.platform ? `Requested ${n.platform || 'General'} Audit` : `Interested in ${n.service || 'Services'}`}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="notif-empty">
                        {!isBackendOnline ? 'Backend server offline - No notifications' : 'No new notifications'}
                      </div>
                    )}
                  </div>

                  <div className="notif-card-footer">
                    <button onClick={() => { setActiveTab('leads'); setShowNotifications(false); }}>
                      View All Activity & Leads
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* QUICK SETTINGS GEAR ICON BUTTON */}
            <button 
              className={`btn-admin-notif ${activeTab === 'settings' ? 'active' : ''}`} 
              onClick={() => setActiveTab('settings')}
              title="Admin Account & Security Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* SUB ACTION ROW FOR ADD NEW BUTTON BELOW TOP BAR */}
        {isBackendOnline && activeTab !== 'overview' && activeTab !== 'leads' && activeTab !== 'audits' && activeTab !== 'trash' && activeTab !== 'settings' && (
          <div className="admin-sub-action-row">
            <button className="btn-admin-add" onClick={() => setShowAddModal(true)}>
              <Plus size={14} /> <span>{ADD_BUTTON_LABELS[activeTab] || 'Add New Item'}</span>
            </button>
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="admin-overview-view">
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <Layers size={28} className="stat-icon pink" />
                <div>
                  <h3>{isBackendOnline ? services.length : services.length}</h3>
                  <p>Active Core Services (Live)</p>
                </div>
              </div>
              <div className="admin-stat-card">
                <ImageIcon size={28} className="stat-icon purple" />
                <div>
                  <h3>{isBackendOnline ? portfolio.length : 0}</h3>
                  <p>Portfolio Showcase Items</p>
                </div>
              </div>
              <div className="admin-stat-card">
                <Sparkles size={28} className="stat-icon pink" />
                <div>
                  <h3>{isBackendOnline ? auditLeads.length : 0}</h3>
                  <p>Free Audit Requests</p>
                </div>
              </div>
              <div className="admin-stat-card">
                <Inbox size={28} className="stat-icon green" />
                <div>
                  <h3>{isBackendOnline ? leads.length : 0}</h3>
                  <p>Total Client Submissions</p>
                </div>
              </div>
            </div>
            {!isBackendOnline && (
              <ServerErrorNotice 
                title="Backend API Server Offline"
                message="Live portfolio, reviews, blog, courses, careers, and lead submissions are hidden because the Express backend server is offline. Please start the backend server."
              />
            )}
          </div>
        )}

        {/* SERVICES MANAGEMENT (STATIC DATA - READ-ONLY WHEN BACKEND IS OFFLINE) */}
        {/* {activeTab === 'services' && (
          <div className="admin-table-wrapper">
            {!isBackendOnline && (
              <div style={{
                background: 'rgba(234, 179, 8, 0.1)',
                border: '1px solid rgba(234, 179, 8, 0.3)',
                color: '#FACC15',
                padding: '10px 16px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ShieldAlert size={16} />
                <span>Backend server is offline. Services are in <strong>Static Read-Only mode</strong> (Edit / Delete / Add options are disabled).</span>
              </div>
            )}
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Tag</th>
                  <th>Description</th>
                  {isBackendOnline && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {services.map(s => (
                  <tr key={s.id}>
                    <td><strong>{s.title}</strong></td>
                    <td><span className="badge-pill">{s.category}</span></td>
                    <td>{s.tag}</td>
                    <td className="truncate-text">{s.desc || s.shortDesc}</td>
                    {isBackendOnline && (
                      <td className="actions-cell">
                        <button className="btn-table-edit" onClick={() => setEditingItem({ ...s, features: Array.isArray(s.features) ? s.features.join(', ') : s.features })}>
                          <Edit3 size={14} /> Edit
                        </button>
                        {renderDeleteButton(s.id, deleteService)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )} */}

        {/* COURSES MANAGEMENT (STATIC DATA - READ-ONLY WHEN BACKEND IS OFFLINE) */}
        {activeTab === 'courses' && (
          <div className="admin-table-wrapper">
            {!isBackendOnline && (
              <div style={{
                background: 'rgba(234, 179, 8, 0.1)',
                border: '1px solid rgba(234, 179, 8, 0.3)',
                color: '#FACC15',
                padding: '10px 16px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ShieldAlert size={16} />
                <span>Backend server is offline. Courses are in <strong>Static Read-Only mode</strong> (Edit / Delete / Add options are disabled).</span>
              </div>
            )}
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Badge</th>
                  <th>Duration</th>
                  <th>Price</th>
                  {isBackendOnline && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {courses.map(c => (
                  <tr key={c.id}>
                    <td><strong>{c.title}</strong></td>
                    <td><span className="badge-pill pink">{c.badge}</span></td>
                    <td>{c.duration}</td>
                    <td><strong>{c.price}</strong></td>
                    {isBackendOnline && (
                      <td className="actions-cell">
                        <button className="btn-table-edit" onClick={() => setEditingItem(c)}>
                          <Edit3 size={14} /> Edit
                        </button>
                        {renderDeleteButton(c.id, deleteCourse)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* BACKEND-DEPENDENT TABS */}
        {activeTab !== 'overview' && activeTab !== 'services' && activeTab !== 'courses' && !isBackendOnline ? (
          <ServerErrorNotice 
            title="Backend Database Offline"
            message={`Unable to display ${activeTab} records because Express backend API server is offline. Please start the backend server.`}
          />
        ) : (
          <>

        {/* PORTFOLIO MANAGEMENT */}
        {activeTab === 'portfolio' && (
          <div className="admin-grid-manager">
            {portfolio.map(p => (
              <div key={p.id} className="admin-item-card">
                <img src={p.image || '/image1.webp'} alt={p.title} className="admin-card-img" />
                <div className="admin-card-info">
                  <span className="badge-pill">{p.category}</span>
                  <h4>{p.title}</h4>
                  <p>Client: {p.client}</p>
                  <div className="card-actions-row">
                    <button className="btn-table-edit" onClick={() => setEditingItem(p)}>
                      <Edit3 size={13} /> Edit
                    </button>
                    {renderDeleteButton(p.id, deletePortfolio)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


        {/* BLOG MANAGEMENT */}
        {activeTab === 'blog' && (
          <div className="admin-grid-manager">
            {[...blog].sort((a, b) => new Date(b.date) - new Date(a.date)).map(b => (
              <div key={b.id} className="admin-item-card">
                <img src={b.image || '/image1.webp'} alt={b.title} className="admin-card-img" />
                <div className="admin-card-info">
                  <span className="badge-pill">{b.category}</span>
                  <h4>{b.title}</h4>
                  <p>{b.readTime}</p>
                  <div className="card-actions-row">
                    <button className="btn-table-edit" onClick={() => setEditingItem(b)}>
                      <Edit3 size={13} /> Edit
                    </button>
                    {renderDeleteButton(b.id, deleteBlog)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


        {/* CLIENT REVIEWS MANAGEMENT */}
        {activeTab === 'recognitions' && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '100px' }}>Image</th>
                  <th style={{ width: '25%' }}>Category</th>
                  <th style={{ width: '25%' }}>Year / Date</th>
                  <th style={{ width: 'auto' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recognitions.map(r => (
                  <tr key={r.id}>
                    <td>
                      <div className="table-img-wrap">
                        <img src={r.image} alt={r.title || r.headline} />
                      </div>
                    </td>
                    <td><span className={`badge-pill ${r.category === 'news' ? 'badge-blue' : 'badge-gold'}`}>{r.category}</span></td>
                    <td>{r.year || r.date}</td>
                    <td className="actions-cell">
                      <button className="btn-table-edit" onClick={() => setEditingItem(r)}>
                        <Edit3 size={14} /> Edit
                      </button>
                      {renderDeleteButton(r.id, deleteRecognition)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Company / Role</th>
                  <th>Rating</th>
                  <th>Review Quote</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(r => (
                  <tr key={r.id || r._id}>
                    <td><strong>{r.clientName || r.name}</strong></td>
                    <td><span className="badge-pill">{r.company || r.role || 'Client'}</span></td>
                    <td>
                      <span style={{ color: '#FACC15', fontWeight: 800 }}>
                        {'★'.repeat(Number(r.rating) || 5)} ({r.rating || 5}/5)
                      </span>
                    </td>
                    <td className="truncate-text">{r.quote || r.review}</td>
                    <td className="actions-cell">
                      <button className="btn-table-edit" onClick={() => setEditingItem(r)}>
                        <Edit3 size={14} /> Edit
                      </button>
                      {renderDeleteButton(r.id || r._id, deleteReview)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CAREERS MANAGEMENT */}
        {activeTab === 'careers' && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Department</th>
                  <th>Experience</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {careers.map(cr => (
                  <tr key={cr.id}>
                    <td><strong>{cr.title}</strong></td>
                    <td><span className="badge-pill">{cr.department}</span></td>
                    <td>{cr.experience}</td>
                    <td>{cr.salary}</td>
                    <td className="actions-cell">
                      <button className="btn-table-edit" onClick={() => setEditingItem(cr)}>
                        <Edit3 size={14} /> Edit
                      </button>
                      {renderDeleteButton(cr.id, deleteCareer)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* DEDICATED FREE AUDIT MAILS SECTION */}
        {activeTab === 'audits' && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Client Name</th>
                  <th>Audited Platform</th>
                  <th>Client Profile URL</th>
                  <th>Mobile Number</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {auditLeads.length > 0 ? (
                  auditLeads.map(l => (
                    <tr key={l.id}>
                      <td>{l.date}</td>
                      <td><strong>{l.name || 'N/A'}</strong></td>
                      <td><span className="badge-pill pink">{l.platform || 'General'} Audit</span></td>
                      <td>
                        <a href={l.url} target="_blank" rel="noreferrer" className="table-url-link">
                          {l.url || 'View Link'} <ExternalLink size={12} />
                        </a>
                      </td>
                      <td><strong>{l.phone}</strong></td>
                      <td>
                        <span className={`status-pill ${l.status === 'Contacted' ? 'contacted' : 'new'}`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button className={`btn-table-status ${l.status === 'Contacted' ? 'read' : 'unread'}`} onClick={() => updateLeadStatus(l.id, l.status === 'Contacted' ? 'New' : 'Contacted')}>
                          <CheckCircle2 size={12} /> {l.status === 'Contacted' ? 'Mark Unread' : 'Mark Read'}
                        </button>
                        {renderDeleteButton(l.id, deleteLead)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', color: '#64748B', padding: '30px' }}>
                      No Free Audit requests received yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* CONTACT LEADS INBOX */}
        {activeTab === 'leads' && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service Interested</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contactLeads.map(l => (
                  <tr key={l.id}>
                    <td>{l.date ? l.date.split(',')[0] : ''}</td>
                    <td><strong>{l.name}</strong></td>
                    <td>{l.email}</td>
                    <td>{l.phone}</td>
                    <td><span className="badge-pill">{l.service || 'General Inquiry'}</span></td>
                    <td>
                      <span className={`status-pill ${l.status === 'Contacted' ? 'contacted' : 'new'}`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button className={`btn-table-status ${l.status === 'Contacted' ? 'read' : 'unread'}`} onClick={() => updateLeadStatus(l.id, l.status === 'Contacted' ? 'New' : 'Contacted')}>
                        <CheckCircle2 size={13} /> {l.status === 'Contacted' ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      {renderDeleteButton(l.id, deleteLead)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* RECYCLE BIN / TRASH MANAGEMENT */}
        {activeTab === 'trash' && (
          <div className="admin-trash-container">
            <div className="admin-trash-header-bar">
              <div className="trash-info-summary">
                <Trash2 size={24} className="trash-header-icon" />
                <div>
                  <h3>Recycle Bin & Deleted History</h3>
                  <p>All items deleted from Services, Portfolio, Blog, Reviews, Courses & Careers are archived here. You can restore them anytime or permanently delete them.</p>
                </div>
              </div>

              {trash.length > 0 && (
                <button className="btn-empty-trash" onClick={() => {
                  if (window.confirm('Are you sure you want to permanently clear all items in Trash Bin? This action cannot be undone.')) {
                    emptyTrash();
                  }
                }}>
                  <Trash2 size={15} /> Empty Trash Bin
                </button>
              )}
            </div>

            {trash.length === 0 ? (
              <div className="admin-empty-trash-box">
                <Trash2 size={48} className="empty-trash-icon" />
                <h4>Trash Bin is Empty</h4>
                <p>No deleted items found in your archive bin.</p>
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Deleted Item Name / Title</th>
                      <th>Original Section</th>
                      <th>Deleted Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trash.map((item) => (
                      <tr key={item.trashId}>
                        <td>
                          <div className="trash-item-title-cell">
                            {item.image || item.img ? (
                              <img src={item.image || item.img} alt={item.title || item.clientName} className="trash-thumb-img" />
                            ) : null}
                            <div>
                              <strong>{item.title || item.clientName || item.name || 'Unnamed Item'}</strong>
                              {item.category && <span className="trash-item-sub">{item.category}</span>}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge-pill ${item.originalCollection}`}>
                            {item.originalCollection ? item.originalCollection.toUpperCase() : 'DATA'}
                          </span>
                        </td>
                        <td>{item.deletedAt}</td>
                        <td className="actions-cell">
                          <button className="btn-table-restore" onClick={() => restoreFromTrash(item)} title="Restore Item Back to Live Website">
                            <RotateCcw size={14} /> Restore
                          </button>
                          <button className="btn-table-delete" onClick={() => permanentlyDeleteFromTrash(item.trashId)} title="Permanently Delete Item">
                            <Trash2 size={14} /> Delete Forever
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ADMIN ACCOUNT & SECURITY SETTINGS */}
        {activeTab === 'settings' && (
          <div className="admin-settings-container">
            <div className="settings-header-banner">
              <div className="settings-banner-info">
                <div className="admin-settings-avatar-circle">
                  <User size={28} />
                </div>
                <div>
                  <h2>Admin Profile & Security</h2>
                  <p>Manage your account credentials, login email, username, and security password. Changes are saved securely.</p>
                </div>
              </div>
            </div>

            {settingsMsg.text && (
              <div className={`settings-alert-box ${settingsMsg.type}`}>
                {settingsMsg.type === 'error' ? <ShieldAlert size={18} /> : <CheckCircle2 size={18} />}
                <span>{settingsMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleSettingsSave} className="admin-settings-form-grid">
              
              {/* Account Information Card */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-icon-badge pink">
                    <User size={18} />
                  </div>
                  <div>
                    <h3>Account Profile</h3>
                  </div>
                </div>
                <div className="settings-card-body">
                  <div className="admin-form-group">
                    <label>Admin Display Name</label>
                    <input 
                      type="text" 
                      value={adminDisplayName}
                      onChange={e => setAdminDisplayName(e.target.value)}
                      placeholder="e.g. Digital ORRA Admin"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Admin Username (Login ID)</label>
                    <input 
                      type="text" 
                      value={adminUsername}
                      onChange={e => setAdminUsername(e.target.value)}
                      placeholder="e.g. admin"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Official Admin Email Address</label>
                    <div className="email-verify-input-row">
                      <input 
                        type="email" 
                        value={adminEmail}
                        onChange={e => setAdminEmail(e.target.value)}
                        placeholder="admin@digitalorra.com"
                        required
                        className={emailVerified ? 'input-verified' : ''}
                      />
                      {emailChanged && !emailVerified && (
                        <button 
                          type="button" 
                          className="btn-send-otp"
                          onClick={handleSendOtp}
                          disabled={isSendingOtp || (otpSent && otpTimer > 0)}
                        >
                          {isSendingOtp ? (
                            <><Loader2 size={14} className="btn-spinner-icon" /> Sending...</>
                          ) : otpSent && otpTimer > 0 ? (
                            <><Mail size={14} /> Resend ({Math.floor(otpTimer / 60)}:{String(otpTimer % 60).padStart(2, '0')})</>
                          ) : (
                            <><Mail size={14} /> Send OTP</>
                          )}
                        </button>
                      )}
                      {emailVerified && (
                        <span className="email-verified-badge">
                          <CheckCircle2 size={14} /> Verified
                        </span>
                      )}
                      {!emailChanged && !emailVerified && (
                        <span className="email-current-badge">
                          <Shield size={14} /> Current
                        </span>
                      )}
                    </div>
                  </div>

                  {/* OTP Entry Section - appears after OTP is sent */}
                  {otpSent && !emailVerified && emailChanged && (
                    <div className="otp-verification-section">
                      <div className="otp-section-header">
                        <MailCheck size={18} />
                        <span>Enter 6-digit OTP sent to <strong>{adminEmail}</strong></span>
                      </div>
                      <div className="otp-input-row">
                        <input
                          type="text"
                          className="otp-input"
                          value={otpCode}
                          onChange={e => {
                            const v = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                            setOtpCode(v);
                          }}
                          placeholder="000000"
                          maxLength={6}
                          inputMode="numeric"
                          autoComplete="one-time-code"
                        />
                        <button
                          type="button"
                          className="btn-verify-otp"
                          onClick={handleVerifyOtp}
                          disabled={isVerifyingOtp || otpCode.length !== 6}
                        >
                          {isVerifyingOtp ? (
                            <><Loader2 size={14} className="btn-spinner-icon" /> Verifying...</>
                          ) : (
                            <><CheckCircle2 size={14} /> Verify OTP</>
                          )}
                        </button>
                      </div>
                      {otpMsg.text && (
                        <div className={`otp-feedback ${otpMsg.type}`}>
                          {otpMsg.text}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Password & Security Card */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-icon-badge purple">
                    <Key size={18} />
                  </div>
                  <div>
                    <h3>Change Password</h3>
                  </div>
                </div>
                <div className="settings-card-body">
                  <div className="admin-form-group">
                    <label>Current Password</label>
                    <div className="pass-input-relative">
                      <input 
                        type={showCurrentPass ? "text" : "password"}
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password (default: admin123)"
                      />
                      <button 
                        type="button" 
                        className="btn-toggle-pass" 
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        title={showCurrentPass ? "Hide password" : "Show password"}
                      >
                        {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>New Password</label>
                    <div className="pass-input-relative">
                      <input 
                        type={showNewPass ? "text" : "password"}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Enter new strong password"
                      />
                      <button 
                        type="button" 
                        className="btn-toggle-pass" 
                        onClick={() => setShowNewPass(!showNewPass)}
                        title={showNewPass ? "Hide password" : "Show password"}
                      >
                        {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Confirm New Password</label>
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button Bar */}
              <div className="settings-submit-bar">
                <button 
                  type="submit" 
                  className={`btn-settings-save ${settingsSavedSuccess ? 'success-state' : ''}`}
                  disabled={isSavingSettings}
                >
                  {isSavingSettings ? (
                    <>
                      <Loader2 size={16} className="btn-spinner-icon" /> <span>Updating Credentials...</span>
                    </>
                  ) : settingsSavedSuccess ? (
                    <>
                      <CheckCircle2 size={16} className="btn-success-icon" /> <span>✓ Settings Saved Online!</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} /> <span>Save Account Settings</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* SEO MANAGER TAB */}
        {activeTab === 'seo' && (
          <AdminSeoManager 
            seoPages={seoPages || []} 
            onSaveSeo={updateSeoPage} 
            services={services || []}
            portfolio={portfolio || []}
            blog={blog || []}
            courses={courses || []}
            careers={careers || []}
          />
        )}
          </>
        )}

      </main>

      {/* ADD NEW ITEM MODAL */}
      {showAddModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal-box" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="admin-modal-title">
                <Plus size={20} className="modal-header-icon" />
                <h3>{ADD_BUTTON_LABELS[activeTab] || 'Add New Item'}</h3>
              </div>
              <button className="admin-modal-close" onClick={() => setShowAddModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              {activeTab === 'services' && (
                <form onSubmit={handleServiceAdd} className="admin-form">
                  <div className="admin-form-group">
                    <label>Service Title</label>
                    <input type="text" placeholder="Service Title" value={newService.title} onChange={e => {
                      const titleVal = e.target.value;
                      const autoSlug = titleVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setNewService({...newService, title: titleVal, slug: newService._isSlugEdited ? newService.slug : autoSlug});
                    }} required />
                  </div>
                  <div className="admin-form-group">
                    <label>URL Slug (Optional)</label>
                    <input type="text" placeholder="URL Slug (e.g. best-seo-services)" value={newService.slug || ''} onChange={e => setNewService({...newService, slug: e.target.value, _isSlugEdited: true})} />
                    <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>Leave blank to auto-generate from title</p>
                  </div>
                  <div className="admin-form-grid-2">
                    <div className="admin-form-group">
                      <label>Category</label>
                      <select
                        value={newService._isCatOther ? 'Other' : newService.category}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'Other') {
                            setNewService({ ...newService, category: '', _isCatOther: true });
                          } else {
                            setNewService({ ...newService, category: val, _isCatOther: false });
                          }
                        }}
                      >
                        {STANDARD_SERVICES_CATS.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="Other">Other (Custom Category)</option>
                      </select>
                      {newService._isCatOther && (
                        <input
                          type="text"
                          placeholder="Type custom category name..."
                          style={{ marginTop: '8px' }}
                          value={newService.category}
                          onChange={(e) => setNewService({ ...newService, category: e.target.value, _isCatOther: true })}
                          required
                        />
                      )}
                    </div>
                    <div className="admin-form-group">
                      <label>Tag Pill</label>
                      <select
                        value={newService._isTagOther ? 'Other' : (STANDARD_SERVICE_TAGS.includes(newService.tag) ? newService.tag : 'Other')}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'Other') {
                            setNewService({ ...newService, tag: '', _isTagOther: true });
                          } else {
                            setNewService({ ...newService, tag: val, _isTagOther: false });
                          }
                        }}
                      >
                        {STANDARD_SERVICE_TAGS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                        <option value="Other">Other (Custom Tag Pill)</option>
                      </select>
                      {newService._isTagOther && (
                        <input
                          type="text"
                          placeholder="Type custom tag pill..."
                          style={{ marginTop: '8px' }}
                          value={newService.tag}
                          onChange={(e) => setNewService({ ...newService, tag: e.target.value, _isTagOther: true })}
                          required
                        />
                      )}
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label>Short Description</label>
                    <textarea placeholder="Short Description" value={newService.desc} onChange={e => setNewService({...newService, desc: e.target.value})} rows={3} required />
                  </div>
                  <div className="admin-form-group">
                    <label>Features (Comma separated)</label>
                    <input type="text" placeholder="Feature 1, Feature 2, Feature 3" value={newService.features} onChange={e => setNewService({...newService, features: e.target.value})} required />
                  </div>

                  <div className="admin-modal-footer">
                    <button type="button" className="btn-modal-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                    {renderSaveButton('Save Service')}
                  </div>
                </form>
              )}

              {activeTab === 'portfolio' && (
                <form onSubmit={handlePortfolioAdd} className="admin-form">
                  <div className="admin-form-group">
                    <label>Project Title</label>
                    <input type="text" placeholder="Project Title (e.g. Royal Sky Trips Portal)" value={newPortfolio.title} onChange={e => setNewPortfolio({...newPortfolio, title: e.target.value})} required />
                  </div>
                  <div className="admin-form-grid-2">
                    <div className="admin-form-group">
                      <label>Category</label>
                      <select
                        value={['Website Design', 'Digital Marketing', 'Google/Meta Ads', 'Logo Design', 'E-Commerce'].includes(newPortfolio.category) ? newPortfolio.category : 'Other'}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'Other') {
                            setNewPortfolio({ ...newPortfolio, category: '' });
                          } else {
                            setNewPortfolio({ ...newPortfolio, category: val });
                          }
                        }}
                      >
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Website Design">Website Design</option>
                        <option value="Google/Meta Ads">Google/Meta Ads</option>
                        <option value="Logo Design">Logo Design</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Other">Other (Custom Category)</option>
                      </select>
                      {!['Website Design', 'Digital Marketing', 'Google/Meta Ads', 'Logo Design', 'E-Commerce'].includes(newPortfolio.category) && (
                        <input
                          type="text"
                          placeholder="Type custom category..."
                          style={{ marginTop: '8px' }}
                          value={newPortfolio.category}
                          onChange={(e) => setNewPortfolio({ ...newPortfolio, category: e.target.value })}
                          required
                        />
                      )}
                    </div>
                    <div className="admin-form-group">
                      <label>Client Name / Brand</label>
                      <input type="text" placeholder="Client / Brand Name" value={newPortfolio.client} onChange={e => setNewPortfolio({...newPortfolio, client: e.target.value})} required />
                    </div>
                  </div>

                  {newPortfolio.category === 'Website Design' && (
                    <div className="admin-form-group">
                      <label>Project Live Website URL <span style={{ color: '#EC4899' }}>* (Required for Website Design)</span></label>
                      <input 
                        type="url" 
                        placeholder="https://example.com or https://clientwebsite.com" 
                        value={newPortfolio.link || ''} 
                        onChange={e => setNewPortfolio({...newPortfolio, link: e.target.value})} 
                        required 
                      />
                    </div>
                  )}
                  <AdminImagePicker
                    value={newPortfolio.image}
                    onChange={(val) => setNewPortfolio({...newPortfolio, image: val})}
                    label="Project Image Asset (URL or Upload File)"
                  />
                  
                  <div className="admin-modal-footer">
                    <button type="button" className="btn-modal-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                    {renderSaveButton('Save Portfolio')}
                  </div>
                </form>
              )}

              {activeTab === 'reviews' && (
                <form onSubmit={handleReviewAdd} className="admin-form">
                  <div className="admin-form-group">
                    <label>Client Name</label>
                    <input type="text" placeholder="Client Name (e.g. Rahul Sharma)" value={newReview.clientName} onChange={e => setNewReview({...newReview, clientName: e.target.value})} required />
                  </div>
                  <div className="admin-form-grid-2">
                    <div className="admin-form-group">
                      <label>Company / Niche</label>
                      <input type="text" placeholder="e.g. E-Com Brand" value={newReview.company} onChange={e => setNewReview({...newReview, company: e.target.value})} />
                    </div>
                    <div className="admin-form-group">
                      <label>Rating (1 - 5 Stars)</label>
                      <input type="number" min="1" max="5" placeholder="Rating (1-5)" value={newReview.rating} onChange={e => setNewReview({...newReview, rating: Number(e.target.value)})} required />
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label>Review Quote</label>
                    <textarea placeholder="Client Review Quote" value={newReview.quote} onChange={e => setNewReview({...newReview, quote: e.target.value})} rows={3} required />
                  </div>

                  <div className="admin-modal-footer">
                    <button type="button" className="btn-modal-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                    {renderSaveButton('Save Review')}
                  </div>
                </form>
              )}

              {activeTab === 'blog' && (
                <form onSubmit={handleBlogAdd} className="admin-form">
                  <div className="admin-form-group">
                    <label>Article Title</label>
                    <input 
                      type="text" 
                      placeholder="Article Title (e.g. Landing Page vs Homepage)" 
                      value={newBlog.title} 
                      onChange={e => {
                        const titleVal = e.target.value;
                        const autoSlug = titleVal.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        setNewBlog({ ...newBlog, title: titleVal, slug: newBlog._isSlugEdited ? newBlog.slug : autoSlug });
                      }} 
                      required 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Custom URL Slug <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>(e.g. /blog/<strong>custom-slug-here</strong>)</span></label>
                    <input 
                      type="text" 
                      placeholder="e.g. landing-page-vs-homepage" 
                      value={newBlog.slug} 
                      onChange={e => {
                        const slugVal = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                        setNewBlog({ ...newBlog, slug: slugVal, _isSlugEdited: true });
                      }} 
                    />
                  </div>
                  <div className="admin-form-grid-2">
                    <div className="admin-form-group">
                      <label>Category</label>
                      <select
                        value={newBlog._isCatOther ? 'Other' : newBlog.category}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'Other') {
                            setNewBlog({ ...newBlog, category: '', _isCatOther: true });
                          } else {
                            setNewBlog({ ...newBlog, category: val, _isCatOther: false });
                          }
                        }}
                        required
                      >
                        {STANDARD_BLOG_CATS.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="Other">Other (Custom Category)</option>
                      </select>
                      {newBlog._isCatOther && (
                        <input
                          type="text"
                          placeholder="Type custom category name..."
                          style={{ marginTop: '8px' }}
                          value={newBlog.category}
                          onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value, _isCatOther: true })}
                          required
                        />
                      )}
                    </div>
                    <div className="admin-form-group">
                      <label>Author Name</label>
                      <input type="text" placeholder="Author Name (e.g. Digital ORRA Team)" value={newBlog.author} onChange={e => setNewBlog({...newBlog, author: e.target.value})} required />
                    </div>
                  </div>

                  <div className="admin-form-grid-2">
                    <div className="admin-form-group">
                      <label>Date</label>
                      <input type="text" placeholder="Date (e.g. June 29, 2026)" value={newBlog.date} onChange={e => setNewBlog({...newBlog, date: e.target.value})} required />
                    </div>
                    <div className="admin-form-group">
                      <label>Read Time</label>
                      <input type="text" placeholder="Read Time (e.g. 5 min read)" value={newBlog.readTime} onChange={e => setNewBlog({...newBlog, readTime: e.target.value})} required />
                    </div>
                  </div>

                  <AdminImagePicker
                    value={newBlog.image}
                    onChange={(val) => setNewBlog({...newBlog, image: val})}
                    label="Blog Featured Image (URL or Upload File)"
                  />

                  <div className="admin-form-group">
                    <label>Short Summary / Excerpt</label>
                    <textarea placeholder="Short Summary / Excerpt" value={newBlog.excerpt} onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})} rows={3} required />
                  </div>

                  <div className="admin-form-group">
                    <label>Full Article Content (Rich Editor)</label>
                    <JoditRichEditor
                      value={newBlog.content}
                      onChange={html => setNewBlog({ ...newBlog, content: html })}
                      placeholder="Write or format full article content with Jodit rich text tools..."
                    />
                  </div>
                  
                  <div className="admin-form-checkbox-row">
                    <label className="admin-checkbox-label">
                      <input type="checkbox" checked={newBlog.isVideo} onChange={e => setNewBlog({...newBlog, isVideo: e.target.checked})} />
                      <span>Is Video Post?</span>
                    </label>
                  </div>

                  {newBlog.isVideo && (
                    <div className="admin-form-group">
                      <label>YouTube Video URL</label>
                      <input type="text" placeholder="YouTube Video URL (e.g. https://www.youtube.com/watch?v=8NPyv5Am6Mo)" value={newBlog.videoUrl} onChange={e => setNewBlog({...newBlog, videoUrl: e.target.value})} />
                    </div>
                  )}

                  <div className="admin-modal-footer">
                    <button type="button" className="btn-modal-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                    {renderSaveButton('Save Blog Article')}
                  </div>
                </form>
              )}

              {activeTab === 'courses' && (
                <form onSubmit={handleCourseAdd} className="admin-form">
                  <div className="admin-form-group">
                    <label>Course Title</label>
                    <input type="text" placeholder="Course Title (e.g. Advanced Digital Marketing)" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} required />
                  </div>

                  <div className="admin-form-grid-2">
                    <div className="admin-form-group">
                      <label>Category</label>
                      <select
                        value={newCourse._isCatOther ? 'Other' : newCourse.category}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'Other') {
                            setNewCourse({ ...newCourse, category: '', _isCatOther: true });
                          } else {
                            setNewCourse({ ...newCourse, category: val, _isCatOther: false });
                          }
                        }}
                        required
                      >
                        {STANDARD_COURSE_CATS.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="Other">Other (Custom Category)</option>
                      </select>
                      {newCourse._isCatOther && (
                        <input
                          type="text"
                          placeholder="Type custom category name..."
                          style={{ marginTop: '8px' }}
                          value={newCourse.category}
                          onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value, _isCatOther: true })}
                          required
                        />
                      )}
                    </div>
                    <div className="admin-form-group">
                      <label>Badge Tag</label>
                      <input type="text" placeholder="e.g. MOST POPULAR, HIGH ROAS, BEGINNER" value={newCourse.badge} onChange={e => setNewCourse({...newCourse, badge: e.target.value})} required />
                    </div>
                  </div>

                  <div className="admin-form-grid-2">
                    <div className="admin-form-group">
                      <label>Course Icon Type</label>
                      <select value={newCourse.iconName} onChange={e => setNewCourse({...newCourse, iconName: e.target.value})}>
                        {Object.keys(ICON_MAP).map(iconKey => (
                          <option key={iconKey} value={iconKey}>{iconKey}</option>
                        ))}
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label>Icon Color Theme</label>
                      <div className="course-theme-picker">
                        {Object.keys(COLOR_THEMES).map(themeKey => (
                          <button
                            key={themeKey}
                            type="button"
                            className={`color-swatch-btn ${newCourse.iconColor === themeKey ? 'active' : ''}`}
                            style={{ backgroundColor: COLOR_THEMES[themeKey].color }}
                            title={COLOR_THEMES[themeKey].label}
                            onClick={() => setNewCourse({...newCourse, iconColor: themeKey})}
                          />
                        ))}
                        <div className="color-preview-box">
                          <RenderColorfulCourseIcon iconName={newCourse.iconName} iconColor={newCourse.iconColor} size={20} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="admin-form-grid-2">
                    <div className="admin-form-group">
                      <label>Duration</label>
                      <input type="text" placeholder="e.g. 3 Months" value={newCourse.duration} onChange={e => setNewCourse({...newCourse, duration: e.target.value})} required />
                    </div>
                    <div className="admin-form-group">
                      <label>Offer Price</label>
                      <input type="text" placeholder="e.g. ₹45,000" value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: e.target.value})} required />
                    </div>
                  </div>

                  <div className="admin-form-grid-2">
                    <div className="admin-form-group">
                      <label>Original Price</label>
                      <input type="text" placeholder="e.g. ₹50,000" value={newCourse.originalPrice || ''} onChange={e => setNewCourse({...newCourse, originalPrice: e.target.value})} />
                    </div>
                    <div className="admin-form-group">
                      <label>Discount Tag</label>
                      <input type="text" placeholder="e.g. 10% OFF" value={newCourse.discount || ''} onChange={e => setNewCourse({...newCourse, discount: e.target.value})} />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Subtitle / Short Tagline</label>
                    <input type="text" placeholder="Short course description tagline" value={newCourse.subtitle || ''} onChange={e => setNewCourse({...newCourse, subtitle: e.target.value})} />
                  </div>

                  <div className="admin-form-group">
                    <label>Ideal For Target Audience</label>
                    <input type="text" placeholder="e.g. Beginners, Marketers & Career Professionals" value={newCourse.idealFor || ''} onChange={e => setNewCourse({...newCourse, idealFor: e.target.value})} />
                  </div>

                  <div className="admin-form-group">
                    <label>Syllabus Items (comma-separated)</label>
                    <textarea placeholder="Paid Ads (Meta, Google), Performance Marketing, Website Audit, SEO..." value={typeof newCourse.syllabus === 'string' ? newCourse.syllabus : (newCourse.syllabus || []).join(', ')} onChange={e => setNewCourse({...newCourse, syllabus: e.target.value})} rows={3} />
                  </div>

                  <div className="admin-form-group">
                    <label>Syllabus PDF URL (Optional)</label>
                    <input type="text" placeholder="https://..." value={newCourse.syllabusPdf || ''} onChange={e => setNewCourse({...newCourse, syllabusPdf: e.target.value})} />
                  </div>

                  <div className="admin-form-checkbox-row">
                    <label className="admin-checkbox-label">
                      <input type="checkbox" checked={!!newCourse.popular} onChange={e => setNewCourse({...newCourse, popular: e.target.checked})} />
                      <span>Highlight as Popular Ribbon?</span>
                    </label>
                    <label className="admin-checkbox-label">
                      <input type="checkbox" checked={!!newCourse.hasInternship} onChange={e => setNewCourse({...newCourse, hasInternship: e.target.checked})} />
                      <span>Includes Internship?</span>
                    </label>
                    <label className="admin-checkbox-label">
                      <input type="checkbox" checked={!!newCourse.placementAssistance} onChange={e => setNewCourse({...newCourse, placementAssistance: e.target.checked})} />
                      <span>Placement Assistance?</span>
                    </label>
                  </div>

                  <div className="admin-modal-footer">
                    <button type="button" className="btn-modal-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                    {renderSaveButton('Save Course')}
                  </div>
                </form>
              )}

              {activeTab === 'careers' && (
                <form onSubmit={handleCareerAdd} className="admin-form">
                  <div className="admin-form-group">
                    <label>Job Position Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Performance Marketer / Graphic Designer"
                      value={newCareer.title}
                      onChange={e => setNewCareer({ ...newCareer, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-grid-2">
                    <div className="admin-form-group">
                      <label>Department / Category</label>
                      <select
                        value={newCareer._isOther ? 'Other' : newCareer.department}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'Other') {
                            setNewCareer({ ...newCareer, department: '', _isOther: true });
                          } else {
                            setNewCareer({ ...newCareer, department: val, _isOther: false });
                          }
                        }}
                      >
                        {STANDARD_DEPTS.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                        <option value="Other">Other (Custom Department)</option>
                      </select>

                      {newCareer._isOther && (
                        <input
                          type="text"
                          placeholder="Type custom department name..."
                          style={{ marginTop: '8px' }}
                          value={newCareer.department}
                          onChange={(e) => setNewCareer({ ...newCareer, department: e.target.value, _isOther: true })}
                          required
                        />
                      )}
                    </div>
                    <div className="admin-form-group">
                      <label>Experience Required</label>
                      <input
                        type="text"
                        placeholder="e.g. Minimum 2 Years Exp"
                        value={newCareer.experience}
                        onChange={e => setNewCareer({ ...newCareer, experience: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="admin-form-grid-2">
                    <div className="admin-form-group">
                      <label>Job Type</label>
                      <select
                        value={newCareer.type}
                        onChange={e => setNewCareer({ ...newCareer, type: e.target.value })}
                      >
                        <option value="Full-time (In-Office)">Full-time (In-Office)</option>
                        <option value="Hybrid Role">Hybrid Role</option>
                        <option value="Remote Work">Remote Work</option>
                        <option value="Contractual / Freelance">Contractual / Freelance</option>
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label>Office Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Panchkula, HR / Mohali / Remote"
                        value={newCareer.location}
                        onChange={e => setNewCareer({ ...newCareer, location: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Salary Package</label>
                    <input
                      type="text"
                      placeholder="e.g. Best in Industry / ₹30,000 - ₹50,000"
                      value={newCareer.salary}
                      onChange={e => setNewCareer({ ...newCareer, salary: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Job Description & Responsibilities</label>
                    <textarea
                      placeholder="Describe key candidate responsibilities, skills required, and qualifications..."
                      value={newCareer.description}
                      onChange={e => setNewCareer({ ...newCareer, description: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="admin-modal-footer">
                    <button type="button" className="btn-modal-cancel" onClick={() => setShowAddModal(false)}>
                      Cancel
                    </button>
                    {renderSaveButton('Post Job Opening')}
                  </div>
                </form>
              )}

              {activeTab === 'recognitions' && (
                <form onSubmit={handleRecognitionAdd} className="admin-form">
                  <div className="admin-form-group">
                    <label>Category</label>
                    <select value={newRecognition.category} onChange={e => setNewRecognition({...newRecognition, category: e.target.value})}>
                      <option value="awards">Awards & Certificates</option>
                      <option value="news">Media News</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Year / Date</label>
                    <input type="text" placeholder="e.g. 2026 or Jan 2026" value={newRecognition.year} onChange={e => setNewRecognition({...newRecognition, year: e.target.value})} required />
                  </div>
                  <AdminImagePicker
                    value={newRecognition.image}
                    onChange={(val) => setNewRecognition({...newRecognition, image: val})}
                    label="Image Asset (URL or Upload)"
                  />
                  <div className="admin-form-group">
                    <label>Link (Optional)</label>
                    <input type="text" placeholder="https://..." value={newRecognition.link || ''} onChange={e => setNewRecognition({...newRecognition, link: e.target.value})} />
                  </div>
                  <div className="admin-modal-footer">
                    <button type="button" className="btn-modal-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                    {renderSaveButton('Save Item')}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT ITEM MODAL */}
      {editingItem && (
        <div className="admin-modal-backdrop" onClick={() => setEditingItem(null)}>
          <div className="admin-modal-box" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="admin-modal-title">
                <Edit3 size={20} className="modal-header-icon" />
                <h3>Edit {activeTab.slice(0, -1)} Item</h3>
              </div>
              <button className="admin-modal-close" onClick={() => setEditingItem(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              <form onSubmit={handleEditSave} className="admin-form">
                {activeTab === 'recognitions' ? (
                  <>
                    <div className="admin-form-group">
                      <label>Category</label>
                      <select value={editingItem.category || 'awards'} onChange={e => setEditingItem({...editingItem, category: e.target.value})}>
                        <option value="awards">Awards & Certificates</option>
                        <option value="news">Media News</option>
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label>Year / Date</label>
                      <input type="text" value={editingItem.year || editingItem.date || ''} onChange={e => setEditingItem({...editingItem, year: e.target.value, date: e.target.value})} required />
                    </div>
                    <AdminImagePicker
                      value={editingItem.image || ''}
                      onChange={(val) => setEditingItem({...editingItem, image: val})}
                      label="Image Asset (URL or Upload)"
                    />
                    <div className="admin-form-group">
                      <label>Link (Optional)</label>
                      <input type="text" value={editingItem.link || ''} onChange={e => setEditingItem({...editingItem, link: e.target.value})} />
                    </div>
                  </>
                ) : activeTab === 'blog' ? (
                  <>
                    <div className="admin-form-group">
                      <label>Article Title</label>
                      <input
                        type="text"
                        value={editingItem.title || ''}
                        onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Custom URL Slug <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>(e.g. /blog/<strong>custom-slug-here</strong>)</span></label>
                      <input
                        type="text"
                        placeholder="e.g. my-custom-blog-slug"
                        value={editingItem.slug || ''}
                        onChange={e => {
                          const slugVal = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                          setEditingItem({ ...editingItem, slug: slugVal });
                        }}
                      />
                    </div>

                    <div className="admin-form-grid-2">
                      <div className="admin-form-group">
                        <label>Category</label>
                        <select
                          value={editingItem._isCatOther ? 'Other' : (STANDARD_BLOG_CATS.includes(editingItem.category) ? editingItem.category : 'Other')}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === 'Other') {
                              setEditingItem({ ...editingItem, _isCatOther: true });
                            } else {
                              setEditingItem({ ...editingItem, category: val, _isCatOther: false });
                            }
                          }}
                          required
                        >
                          {STANDARD_BLOG_CATS.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                          <option value="Other">Other (Custom Category)</option>
                        </select>
                        {editingItem._isCatOther && (
                          <input
                            type="text"
                            placeholder="Type custom category name..."
                            style={{ marginTop: '8px' }}
                            value={editingItem.category === 'Other' ? '' : (editingItem.category || '')}
                            onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value, _isCatOther: true })}
                            required
                          />
                        )}
                      </div>

                      <div className="admin-form-group">
                        <label>Author Name</label>
                        <input
                          type="text"
                          value={editingItem.author || ''}
                          onChange={e => setEditingItem({ ...editingItem, author: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-form-grid-2">
                      <div className="admin-form-group">
                        <label>Date</label>
                        <input
                          type="text"
                          value={editingItem.date || ''}
                          onChange={e => setEditingItem({ ...editingItem, date: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Read Time</label>
                        <input
                          type="text"
                          value={editingItem.readTime || ''}
                          onChange={e => setEditingItem({ ...editingItem, readTime: e.target.value })}
                        />
                      </div>
                    </div>

                    <AdminImagePicker
                      value={editingItem.image || editingItem.img || ''}
                      onChange={(val) => setEditingItem({ ...editingItem, image: val, img: val })}
                      label="Item Image Asset (URL or Upload File)"
                    />

                    <div className="admin-form-group">
                      <label>Short Summary / Excerpt</label>
                      <textarea
                        value={editingItem.excerpt || ''}
                        onChange={e => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Full Article Content (Rich Editor)</label>
                      <JoditRichEditor
                        value={editingItem.content || ''}
                        onChange={html => setEditingItem({ ...editingItem, content: html })}
                        placeholder="Write or format full article content with Jodit rich text tools..."
                      />
                    </div>

                    <div className="admin-form-checkbox-row">
                      <label className="admin-checkbox-label">
                        <input
                          type="checkbox"
                          checked={!!editingItem.isVideo}
                          onChange={e => setEditingItem({ ...editingItem, isVideo: e.target.checked })}
                        />
                        <span>Is Video Post?</span>
                      </label>
                    </div>

                    {editingItem.isVideo && (
                      <div className="admin-form-group">
                        <label>YouTube Video URL</label>
                        <input
                          type="text"
                          value={editingItem.videoUrl || ''}
                          onChange={e => setEditingItem({ ...editingItem, videoUrl: e.target.value })}
                        />
                      </div>
                    )}
                  </>
                ) : editingItem.clientName !== undefined ? (
                  <>
                    <div className="admin-form-group">
                      <label>Client Name</label>
                      <input
                        type="text"
                        value={editingItem.clientName || ''}
                        onChange={e => setEditingItem({ ...editingItem, clientName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="admin-form-grid-2">
                      <div className="admin-form-group">
                        <label>Company / Niche</label>
                        <input
                          type="text"
                          value={editingItem.company || ''}
                          onChange={e => setEditingItem({ ...editingItem, company: e.target.value })}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Rating (1 to 5 Stars)</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={editingItem.rating || 5}
                          onChange={e => setEditingItem({ ...editingItem, rating: Number(e.target.value) })}
                          required
                        />
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label>Review Quote</label>
                      <textarea
                        value={editingItem.quote || ''}
                        onChange={e => setEditingItem({ ...editingItem, quote: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>
                  </>
                ) : activeTab === 'careers' || editingItem.department !== undefined ? (
                  <>
                    <div className="admin-form-group">
                      <label>Job Position Title</label>
                      <input
                        type="text"
                        value={editingItem.title || ''}
                        onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="admin-form-grid-2">
                      <div className="admin-form-group">
                        <label>Department / Category</label>
                        <select
                          value={editingItem._isOther ? 'Other' : (STANDARD_DEPTS.includes(editingItem.department) ? editingItem.department : 'Other')}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === 'Other') {
                              setEditingItem({ ...editingItem, _isOther: true });
                            } else {
                              setEditingItem({ ...editingItem, department: val, _isOther: false });
                            }
                          }}
                        >
                          {STANDARD_DEPTS.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                          <option value="Other">Other (Custom Department)</option>
                        </select>

                        {editingItem._isOther && (
                          <input
                            type="text"
                            placeholder="Type custom department name..."
                            style={{ marginTop: '8px' }}
                            value={editingItem.department === 'Other' ? '' : (editingItem.department || '')}
                            onChange={(e) => setEditingItem({ ...editingItem, department: e.target.value, _isOther: true })}
                            required
                          />
                        )}
                      </div>
                      <div className="admin-form-group">
                        <label>Experience Required</label>
                        <input
                          type="text"
                          value={editingItem.experience || ''}
                          onChange={e => setEditingItem({ ...editingItem, experience: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="admin-form-grid-2">
                      <div className="admin-form-group">
                        <label>Job Type</label>
                        <input
                          type="text"
                          value={editingItem.type || ''}
                          onChange={e => setEditingItem({ ...editingItem, type: e.target.value })}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Office Location</label>
                        <input
                          type="text"
                          value={editingItem.location || ''}
                          onChange={e => setEditingItem({ ...editingItem, location: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label>Salary Package</label>
                      <input
                        type="text"
                        value={editingItem.salary || ''}
                        onChange={e => setEditingItem({ ...editingItem, salary: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Job Description</label>
                      <textarea
                        value={editingItem.description || ''}
                        onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                        rows={4}
                      />
                    </div>
                  </>
                ) : activeTab === 'courses' || editingItem.duration !== undefined ? (
                  <>
                    <div className="admin-form-group">
                      <label>Course Title</label>
                      <input
                        type="text"
                        value={editingItem.title || ''}
                        onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="admin-form-grid-2">
                      <div className="admin-form-group">
                        <label>Category</label>
                        <select
                          value={editingItem._isCatOther ? 'Other' : (STANDARD_COURSE_CATS.includes(editingItem.category) ? editingItem.category : 'Other')}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === 'Other') {
                              setEditingItem({ ...editingItem, _isCatOther: true });
                            } else {
                              setEditingItem({ ...editingItem, category: val, _isCatOther: false });
                            }
                          }}
                          required
                        >
                          {STANDARD_COURSE_CATS.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                          <option value="Other">Other (Custom Category)</option>
                        </select>
                        {editingItem._isCatOther && (
                          <input
                            type="text"
                            placeholder="Type custom category name..."
                            style={{ marginTop: '8px' }}
                            value={editingItem.category === 'Other' ? '' : (editingItem.category || '')}
                            onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value, _isCatOther: true })}
                            required
                          />
                        )}
                      </div>

                      <div className="admin-form-group">
                        <label>Badge Tag</label>
                        <input
                          type="text"
                          value={editingItem.badge || ''}
                          onChange={e => setEditingItem({ ...editingItem, badge: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-form-grid-2">
                      <div className="admin-form-group">
                        <label>Course Icon Type</label>
                        <select
                          value={editingItem.iconName || 'TrendingUp'}
                          onChange={e => setEditingItem({ ...editingItem, iconName: e.target.value })}
                        >
                          {Object.keys(ICON_MAP).map(iconKey => (
                            <option key={iconKey} value={iconKey}>{iconKey}</option>
                          ))}
                        </select>
                      </div>

                      <div className="admin-form-group">
                        <label>Icon Color Theme</label>
                        <div className="course-theme-picker">
                          {Object.keys(COLOR_THEMES).map(themeKey => (
                            <button
                              key={themeKey}
                              type="button"
                              className={`color-swatch-btn ${editingItem.iconColor === themeKey ? 'active' : ''}`}
                              style={{ backgroundColor: COLOR_THEMES[themeKey].color }}
                              title={COLOR_THEMES[themeKey].label}
                              onClick={() => setEditingItem({ ...editingItem, iconColor: themeKey })}
                            />
                          ))}
                          <div className="color-preview-box">
                            <RenderColorfulCourseIcon iconName={editingItem.iconName || 'TrendingUp'} iconColor={editingItem.iconColor || 'pink'} size={20} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="admin-form-grid-2">
                      <div className="admin-form-group">
                        <label>Duration</label>
                        <input
                          type="text"
                          value={editingItem.duration || ''}
                          onChange={e => setEditingItem({ ...editingItem, duration: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Offer Price</label>
                        <input
                          type="text"
                          value={editingItem.price || ''}
                          onChange={e => setEditingItem({ ...editingItem, price: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-form-grid-2">
                      <div className="admin-form-group">
                        <label>Original Price</label>
                        <input
                          type="text"
                          value={editingItem.originalPrice || ''}
                          onChange={e => setEditingItem({ ...editingItem, originalPrice: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Discount Tag</label>
                        <input
                          type="text"
                          value={editingItem.discount || ''}
                          onChange={e => setEditingItem({ ...editingItem, discount: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label>Subtitle / Tagline</label>
                      <input
                        type="text"
                        value={editingItem.subtitle || ''}
                        onChange={e => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Ideal For Target Audience</label>
                      <input
                        type="text"
                        value={editingItem.idealFor || ''}
                        onChange={e => setEditingItem({ ...editingItem, idealFor: e.target.value })}
                        placeholder="e.g. Beginners, Marketers & Career Professionals"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Syllabus Items (comma-separated)</label>
                      <textarea
                        value={typeof editingItem.syllabus === 'string' ? editingItem.syllabus : (editingItem.syllabus || []).join(', ')}
                        onChange={e => setEditingItem({ ...editingItem, syllabus: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Syllabus PDF URL (Optional)</label>
                      <input
                        type="text"
                        value={editingItem.syllabusPdf || ''}
                        onChange={e => setEditingItem({ ...editingItem, syllabusPdf: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-checkbox-row">
                      <label className="admin-checkbox-label">
                        <input
                          type="checkbox"
                          checked={!!editingItem.popular}
                          onChange={e => setEditingItem({ ...editingItem, popular: e.target.checked })}
                        />
                        <span>Highlight as Popular Ribbon?</span>
                      </label>
                      <label className="admin-checkbox-label">
                        <input
                          type="checkbox"
                          checked={!!editingItem.hasInternship}
                          onChange={e => setEditingItem({ ...editingItem, hasInternship: e.target.checked })}
                        />
                        <span>Includes Internship?</span>
                      </label>
                      <label className="admin-checkbox-label">
                        <input
                          type="checkbox"
                          checked={!!editingItem.placementAssistance}
                          onChange={e => setEditingItem({ ...editingItem, placementAssistance: e.target.checked })}
                        />
                        <span>Placement Assistance?</span>
                      </label>
                    </div>
                  </>
                ) : activeTab === 'portfolio' || editingItem.client !== undefined ? (
                  <>
                    <div className="admin-form-group">
                      <label>Project Title</label>
                      <input
                        type="text"
                        value={editingItem.title || ''}
                        onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="admin-form-grid-2">
                      <div className="admin-form-group">
                        <label>Category</label>
                        <select
                          value={['Website Design', 'Digital Marketing', 'Google/Meta Ads', 'Logo Design', 'E-Commerce'].includes(editingItem.category) ? editingItem.category : 'Other'}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === 'Other') {
                              setEditingItem({ ...editingItem, category: '' });
                            } else {
                              setEditingItem({ ...editingItem, category: val });
                            }
                          }}
                        >
                          <option value="Digital Marketing">Digital Marketing</option>
                          <option value="Website Design">Website Design</option>
                          <option value="Google/Meta Ads">Google/Meta Ads</option>
                          <option value="Logo Design">Logo Design</option>
                          <option value="E-Commerce">E-Commerce</option>
                          <option value="Other">Other (Custom Category)</option>
                        </select>
                        {!['Website Design', 'Digital Marketing', 'Google/Meta Ads', 'Logo Design', 'E-Commerce'].includes(editingItem.category) && (
                          <input
                            type="text"
                            placeholder="Type custom category..."
                            style={{ marginTop: '8px' }}
                            value={editingItem.category || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                            required
                          />
                        )}
                      </div>
                      <div className="admin-form-group">
                        <label>Client Name / Brand</label>
                        <input
                          type="text"
                          placeholder="e.g. Property Surge / Tech Corp"
                          value={editingItem.client || ''}
                          onChange={e => setEditingItem({ ...editingItem, client: e.target.value })}
                        />
                      </div>
                    </div>

                    {editingItem.category === 'Website Design' && (
                      <div className="admin-form-group">
                        <label>Project Live Website URL <span style={{ color: '#EC4899' }}>* (Required for Website Design)</span></label>
                        <input 
                          type="url" 
                          placeholder="https://example.com or https://clientwebsite.com" 
                          value={editingItem.link || ''} 
                          onChange={e => setEditingItem({ ...editingItem, link: e.target.value })} 
                          required 
                        />
                      </div>
                    )}

                    <AdminImagePicker
                      value={editingItem.image || editingItem.img || ''}
                      onChange={(val) => setEditingItem({ ...editingItem, image: val, img: val })}
                      label="Project Image Asset (URL or Upload File from Device)"
                    />
                  </>
                ) : (
                  <>
                    <div className="admin-form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={editingItem.title || ''}
                        onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                        required
                      />
                    </div>
                    {editingItem.category !== undefined && (
                      <div className="admin-form-group">
                        <label>Category</label>
                        <select
                          value={editingItem._isCatOther ? 'Other' : (STANDARD_SERVICES_CATS.includes(editingItem.category) ? editingItem.category : 'Other')}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === 'Other') {
                              setEditingItem({ ...editingItem, _isCatOther: true });
                            } else {
                              setEditingItem({ ...editingItem, category: val, _isCatOther: false });
                            }
                          }}
                        >
                          {STANDARD_SERVICES_CATS.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                          <option value="Other">Other (Custom Category)</option>
                        </select>
                        {editingItem._isCatOther && (
                          <input
                            type="text"
                            placeholder="Type custom category name..."
                            style={{ marginTop: '8px' }}
                            value={editingItem.category === 'Other' ? '' : (editingItem.category || '')}
                            onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value, _isCatOther: true })}
                          />
                        )}
                      </div>
                    )}
                    {editingItem.tag !== undefined && (
                      <div className="admin-form-group">
                        <label>Tag Pill</label>
                        <select
                          value={editingItem._isTagOther ? 'Other' : (STANDARD_SERVICE_TAGS.includes(editingItem.tag) ? editingItem.tag : 'Other')}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === 'Other') {
                              setEditingItem({ ...editingItem, _isTagOther: true });
                            } else {
                              setEditingItem({ ...editingItem, tag: val, _isTagOther: false });
                            }
                          }}
                        >
                          {STANDARD_SERVICE_TAGS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                          <option value="Other">Other (Custom Tag Pill)</option>
                        </select>
                        {editingItem._isTagOther && (
                          <input
                            type="text"
                            placeholder="Type custom tag pill..."
                            style={{ marginTop: '8px' }}
                            value={editingItem.tag === 'Other' ? '' : (editingItem.tag || '')}
                            onChange={(e) => setEditingItem({ ...editingItem, tag: e.target.value, _isTagOther: true })}
                          />
                        )}
                      </div>
                    )}
                    {editingItem.desc !== undefined && (
                      <div className="admin-form-group">
                        <label>Description</label>
                        <textarea
                          value={editingItem.desc || ''}
                          onChange={e => setEditingItem({ ...editingItem, desc: e.target.value })}
                          rows={4}
                        />
                      </div>
                    )}
                    {editingItem.price !== undefined && (
                      <div className="admin-form-group">
                        <label>Price</label>
                        <input
                          type="text"
                          value={editingItem.price || ''}
                          onChange={e => setEditingItem({ ...editingItem, price: e.target.value })}
                        />
                      </div>
                    )}
                  </>
                )}

                <div className="admin-modal-footer">
                  <button type="button" className="btn-modal-cancel" onClick={() => setEditingItem(null)}>
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={`btn-modal-save ${saveSuccess ? 'success-state' : ''}`} 
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={16} className="btn-spinner-icon" /> <span>Saving Changes...</span>
                      </>
                    ) : saveSuccess ? (
                      <>
                        <CheckCircle2 size={16} className="btn-success-icon" /> <span>Updated Online!</span>
                      </>
                    ) : (
                      <>
                        <Check size={16} /> <span>Update Changes</span>
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
