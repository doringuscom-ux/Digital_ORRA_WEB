import React, { useState, useEffect } from 'react';
import { Search, X, Command, Code, Database, Server, Cpu, ArrowRight } from 'lucide-react';
import './Navbar.css';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mockResults = [
    { title: 'MongoDB Atlas Connection Setup', category: 'Database', icon: <Database size={16} /> },
    { title: 'Express Router Controllers', category: 'Backend', icon: <Server size={16} /> },
    { title: 'React Hooks & State Management', category: 'Frontend', icon: <Code size={16} /> },
    { title: 'Node.js Async Middleware & Error Handling', category: 'Runtime', icon: <Cpu size={16} /> },
  ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal-card" onClick={e => e.stopPropagation()}>
        <div className="search-input-header">
          <Search className="search-input-icon" size={20} />
          <input
            type="text"
            className="search-main-input"
            placeholder="Search MERN docs, APIs, schemas, components..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button className="search-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="search-modal-body">
          <div className="search-results-label">
            {query ? `Search results for "${query}"` : 'Quick Navigation Suggestions'}
          </div>

          <div className="search-results-list">
            {mockResults.length > 0 ? (
              mockResults.map((item, index) => (
                <div key={index} className="search-result-item" onClick={onClose}>
                  <div className="result-icon">{item.icon}</div>
                  <div className="result-text">
                    <span className="result-title">{item.title}</span>
                    <span className="result-category">{item.category}</span>
                  </div>
                  <ArrowRight size={16} className="result-arrow" />
                </div>
              ))
            ) : (
              <div className="search-no-results">
                No components or documentation matching "{query}"
              </div>
            )}
          </div>
        </div>

        <div className="search-modal-footer">
          <div className="shortcut-hint">
            <kbd><Command size={12} /> ESC</kbd> to exit search
          </div>
          <div className="shortcut-hint">
            <kbd>↵</kbd> to navigate
          </div>
        </div>
      </div>
    </div>
  );
}
