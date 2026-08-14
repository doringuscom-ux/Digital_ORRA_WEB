import React, { useState, useEffect } from 'react';
import { Lock, Mail, Shield, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import AdminDashboard from '../../components/Admin/AdminDashboard';
import '../../components/Admin/AdminDashboard.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:5000/api`;

export default function AdminLoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);
  
  const [view, setView] = useState('login'); // 'login', 'forgot', 'reset'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // On page load, verify existing auth cookie with backend
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(`${API_BASE}/admin/me`, {
          credentials: 'include'
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setAdminUser(data.user);
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        // Backend offline — can't verify, don't allow access
        setIsAuthenticated(false);
      }

      setIsVerifying(false);
    };

    verifyToken();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
        credentials: 'include'
      });
      
      const data = await res.json();

      if (res.ok && data.success && data.user) {
        setAdminUser(data.user);
        setIsAuthenticated(true);
      } else {
        setError(data.message || 'Invalid Username/Email or Password!');
      }
    } catch (err) {
      setError('⚠️ Backend server is offline! Admin login requires a running backend server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your admin email to reset password.');
      return;
    }
    setError('');
    setSuccessMsg('');
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${API_BASE}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg('OTP sent! Please check your email inbox.');
        setView('reset');
      } else {
        setError(data.message || data.error || 'Failed to send OTP.');
      }
    } catch (err) {
      setError('⚠️ Backend server is offline!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      setError('Please fill in both OTP and New Password.');
      return;
    }
    setError('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/admin/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg('Password reset successfully! You can now log in.');
        setView('login');
        setOtp('');
        setNewPassword('');
        setPassword('');
      } else {
        setError(data.message || data.error || 'Failed to reset password.');
      }
    } catch (err) {
      setError('⚠️ Backend server is offline!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/admin/logout`, { credentials: 'include' });
    } catch(err) {}
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  // Show loading while verifying token
  if (isVerifying) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card" style={{ textAlign: 'center', padding: '60px 40px' }}>
          <Loader2 size={36} className="spin-icon" style={{ animation: 'spin 1s linear infinite', color: '#E6007E' }} />
          <p style={{ color: '#94A3B8', marginTop: 16 }}>Verifying admin session...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && adminUser) {
    return <AdminDashboard onLogout={handleLogout} user={adminUser} />;
  }

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="login-header">
          <div className="login-shield-circle">
            {view === 'login' ? <Shield size={32} /> : <KeyRound size={32} />}
          </div>
          <h2 style={{ color: 'white' }}>
            {view === 'login' ? 'Digital ORRA Admin' : 'Reset Password'}
          </h2>
          <p>
            {view === 'login' 
              ? 'Login to access and manage website services, portfolio, blog, courses & incoming leads.'
              : 'Securely reset your admin password using email OTP verification.'}
          </p>
        </div>

        {error && <div className="login-error-alert">{error}</div>}
        {successMsg && <div className="login-success-alert" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.2)', marginBottom: '20px', fontSize: '13px' }}>{successMsg}</div>}

        {/* LOGIN VIEW */}
        {view === 'login' && (
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="login-field">
              <label>Admin Email</label>
              <div className="login-input-box">
                <Mail size={18} />
                <input
                  type="text"
                  placeholder="admin@digitalorra.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ margin: 0 }}>Password</label>
                <span 
                  onClick={() => { setView('forgot'); setError(''); setSuccessMsg(''); }} 
                  style={{ color: '#E6007E', fontSize: '12px', cursor: 'pointer' }}
                >
                  Forgot Password?
                </span>
              </div>
              <div className="login-input-box">
                <Lock size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-login-submit" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Authenticating...' : 'Enter Admin Dashboard'}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* FORGOT PASSWORD (REQUEST OTP) VIEW */}
        {view === 'forgot' && (
          <form onSubmit={handleSendOtp} className="admin-login-form">
            <div className="login-field">
              <label>Enter your Admin Email</label>
              <div className="login-input-box">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="admin@digitalorra.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn-login-submit" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Sending OTP...' : 'Send Verification OTP'}</span>
              <ArrowRight size={16} />
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <span onClick={() => { setView('login'); setError(''); setSuccessMsg(''); }} style={{ color: '#94A3B8', fontSize: '13px', cursor: 'pointer' }}>
                Back to Login
              </span>
            </div>
          </form>
        )}

        {/* RESET PASSWORD (VERIFY OTP & SET NEW) VIEW */}
        {view === 'reset' && (
          <form onSubmit={handleResetPassword} className="admin-login-form">
            <div className="login-field">
              <label>Enter 6-digit OTP (sent to {email})</label>
              <div className="login-input-box">
                <KeyRound size={18} />
                <input
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label>New Password</label>
              <div className="login-input-box">
                <Lock size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn-login-submit" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Resetting Password...' : 'Reset Password'}</span>
              <Lock size={16} />
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <span onClick={() => { setView('login'); setError(''); setSuccessMsg(''); setOtp(''); setNewPassword(''); }} style={{ color: '#94A3B8', fontSize: '13px', cursor: 'pointer' }}>
                Cancel and back to Login
              </span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
