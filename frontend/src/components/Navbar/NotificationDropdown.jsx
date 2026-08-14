import React, { useState } from 'react';
import { Bell, CheckCheck, Database, ShieldAlert, Cpu, Zap } from 'lucide-react';
import './Navbar.css';

export default function NotificationDropdown({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'MongoDB Connected',
      desc: 'Database cluster atlas-01 is online.',
      time: '2m ago',
      icon: <Database className="text-emerald" size={16} />,
      unread: true
    },
    {
      id: 2,
      title: 'Express Server Alert',
      desc: 'API endpoint /api/users responding in 24ms.',
      time: '15m ago',
      icon: <Cpu className="text-cyan" size={16} />,
      unread: true
    },
    {
      id: 3,
      title: 'Security Scan Completed',
      desc: 'No vulnerabilities detected in dependencies.',
      time: '1h ago',
      icon: <ShieldAlert className="text-purple" size={16} />,
      unread: false
    }
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="notification-dropdown">
      <div className="notification-header">
        <div className="notification-title-group">
          <h3>Notifications</h3>
          <span className="unread-badge">
            {notifications.filter(n => n.unread).length}
          </span>
        </div>
        <button className="mark-read-btn" onClick={markAllRead}>
          <CheckCheck size={14} /> Mark all read
        </button>
      </div>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">No new notifications</div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className={`notification-item ${n.unread ? 'unread' : ''}`}>
              <div className="notification-icon">{n.icon}</div>
              <div className="notification-body">
                <div className="notification-top">
                  <span className="notification-item-title">{n.title}</span>
                  <span className="notification-time">{n.time}</span>
                </div>
                <p className="notification-item-desc">{n.desc}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="notification-footer">
        <a href="#activity" className="notification-footer-link">
          <Zap size={14} /> View All Activity Logs
        </a>
      </div>
    </div>
  );
}
