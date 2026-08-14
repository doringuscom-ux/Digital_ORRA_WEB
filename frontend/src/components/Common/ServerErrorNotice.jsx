import React, { useState } from 'react';
import { ServerOff, RefreshCw, AlertTriangle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import './ServerErrorNotice.css';

export default function ServerErrorNotice({ 
  title = "Backend Server Offline",
  message = "Unable to fetch live data because the backend server is currently offline or unreachable.",
  compact = false
}) {
  const { checkBackendHealth } = useData() || {};
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    if (checkBackendHealth) {
      await checkBackendHealth();
    }
    setTimeout(() => {
      setIsRetrying(false);
    }, 1000);
  };

  return (
    <div className={`server-error-notice ${compact ? 'is-compact' : ''}`}>
      <div className="server-error-icon-wrapper">
        <ServerOff className="server-error-icon" size={compact ? 32 : 48} />
        <div className="server-error-badge">
          <AlertTriangle size={14} />
        </div>
      </div>
      <div className="server-error-content">
        <h3 className="server-error-title">{title}</h3>
        <p className="server-error-desc">{message}</p>
      </div>
      <button 
        type="button" 
        className={`server-error-retry-btn ${isRetrying ? 'is-spinning' : ''}`}
        onClick={handleRetry}
        disabled={isRetrying}
      >
        <RefreshCw size={16} className="retry-icon" />
        <span>{isRetrying ? 'Checking Server...' : 'Retry Connection'}</span>
      </button>
    </div>
  );
}
