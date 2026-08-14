import React from 'react';
import { User, LayoutDashboard, Key, Settings, LogOut, ShieldCheck, ChevronRight } from 'lucide-react';
import './Navbar.css';

export default function ProfileDropdown({ isOpen, user, onLogout }) {
  if (!isOpen) return null;

  return (
    <div className="profile-dropdown">
      <div className="profile-user-card">
        <div className="profile-avatar-large">
          <span>{user?.name?.slice(0, 2).toUpperCase() || 'SU'}</span>
          <span className="online-indicator"></span>
        </div>
        <div className="profile-user-info">
          <div className="profile-name-row">
            <span className="profile-name">{user?.name || 'Surbjeet Singh'}</span>
            <span className="role-badge"><ShieldCheck size={12} /> Admin</span>
          </div>
          <span className="profile-email">{user?.email || 'surbjeet@mern.dev'}</span>
        </div>
      </div>

      <div className="dropdown-divider"></div>

      <div className="profile-menu-links">
        <a href="#dashboard" className="profile-link-item">
          <LayoutDashboard size={16} />
          <span>MERN Dashboard</span>
          <ChevronRight size={14} className="link-arrow" />
        </a>
        <a href="#profile" className="profile-link-item">
          <User size={16} />
          <span>My Profile & Stats</span>
          <ChevronRight size={14} className="link-arrow" />
        </a>
        <a href="#api-keys" className="profile-link-item">
          <Key size={16} />
          <span>API Tokens & Secrets</span>
          <ChevronRight size={14} className="link-arrow" />
        </a>
        <a href="#settings" className="profile-link-item">
          <Settings size={16} />
          <span>Project Settings</span>
          <ChevronRight size={14} className="link-arrow" />
        </a>
      </div>

      <div className="dropdown-divider"></div>

      <button className="profile-logout-btn" onClick={onLogout}>
        <LogOut size={16} />
        <span>Sign Out</span>
      </button>
    </div>
  );
}
