// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Layers, 
//   ChevronDown, 
//   Search, 
//   Bell, 
//   Sun, 
//   Moon, 
//   Menu, 
//   X, 
//   User, 
//   LogIn, 
//   Code2, 
//   Database, 
//   Server, 
//   Cpu 
// } from 'lucide-react';
// import NavDropdown from './NavDropdown';
// import NotificationDropdown from './NotificationDropdown';
// import ProfileDropdown from './ProfileDropdown';
// import SearchModal from './SearchModal';
// import './Navbar.css';

// export default function Navbar({ theme, setTheme }) {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null); // 'features', 'notifications', 'profile', or null
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(true);

//   const dropdownRef = useRef(null);

//   // User state
//   const user = {
//     name: 'Surbjeet Singh',
//     email: 'surbjeet@mern.dev'
//   };

//   // Scroll handler for translucent glassmorphism stickiness
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Keyboard shortcut Ctrl+K / Cmd+K for search
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
//         e.preventDefault();
//         setIsSearchOpen((prev) => !prev);
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   // Click outside to close dropdowns
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setActiveDropdown(null);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const toggleDropdown = (name) => {
//     setActiveDropdown(prev => (prev === name ? null : name));
//   };

//   const toggleTheme = () => {
//     const newTheme = theme === 'dark' ? 'light' : 'dark';
//     setTheme(newTheme);
//   };

//   return (
//     <>
//       <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
//         <div className="navbar-container" ref={dropdownRef}>
          
//           {/* Logo & Brand Badge */}
//           <a href="#" className="navbar-brand">
//             <div className="brand-logo-icon">
//               <Layers size={22} className="logo-svg" />
//             </div>
//             <div className="brand-text">
//               <span className="brand-name">MERN<span className="gradient-text">Stack</span></span>
//               <span className="brand-subtitle">PRO DEV ENGINE</span>
//             </div>
//           </a>

//           {/* Desktop Nav Links */}
//           <nav className="navbar-links">
//             <a href="#home" className="nav-link active">Home</a>
            
//             {/* Features Mega Dropdown */}
//             <div className="nav-item-dropdown">
//               <button 
//                 className={`nav-link dropdown-trigger ${activeDropdown === 'features' ? 'open' : ''}`}
//                 onClick={() => toggleDropdown('features')}
//               >
//                 <span>Stack Components</span>
//                 <ChevronDown size={14} className={`chevron-icon ${activeDropdown === 'features' ? 'rotated' : ''}`} />
//               </button>
//               <NavDropdown isOpen={activeDropdown === 'features'} />
//             </div>

//             <a href="#architecture" className="nav-link">Architecture</a>
//             <a href="#api" className="nav-link">REST APIs</a>
//             <a href="#docs" className="nav-link">Docs</a>
//           </nav>

//           {/* Right Action Bar */}
//           <div className="navbar-actions">
            
//             {/* Search Trigger Button */}
//             <button 
//               className="action-search-btn" 
//               onClick={() => setIsSearchOpen(true)}
//               title="Search (Ctrl + K)"
//             >
//               <Search size={16} />
//               <span className="search-placeholder">Quick Search...</span>
//               <kbd className="search-shortcut">Ctrl K</kbd>
//             </button>

//             {/* Theme Toggle Button */}
//             <button 
//               className="action-icon-btn theme-toggle-btn" 
//               onClick={toggleTheme}
//               title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
//             >
//               {theme === 'dark' ? <Sun size={18} className="theme-icon sun" /> : <Moon size={18} className="theme-icon moon" />}
//             </button>

//             {/* Notification Bell */}
//             <div className="action-popover-wrap">
//               <button 
//                 className={`action-icon-btn notification-btn ${activeDropdown === 'notifications' ? 'active' : ''}`}
//                 onClick={() => toggleDropdown('notifications')}
//                 title="Notifications"
//               >
//                 <Bell size={18} />
//                 <span className="notification-dot"></span>
//               </button>
//               <NotificationDropdown 
//                 isOpen={activeDropdown === 'notifications'} 
//                 onClose={() => setActiveDropdown(null)} 
//               />
//             </div>

//             {/* Profile Avatar / Auth Buttons */}
//             {isLoggedIn ? (
//               <div className="action-popover-wrap">
//                 <button 
//                   className={`avatar-button ${activeDropdown === 'profile' ? 'active' : ''}`}
//                   onClick={() => toggleDropdown('profile')}
//                 >
//                   <div className="avatar-circle">
//                     <span>SU</span>
//                   </div>
//                   <span className="online-dot"></span>
//                 </button>
//                 <ProfileDropdown 
//                   isOpen={activeDropdown === 'profile'} 
//                   user={user} 
//                   onLogout={() => setIsLoggedIn(false)} 
//                 />
//               </div>
//             ) : (
//               <button className="btn-login-cta" onClick={() => setIsLoggedIn(true)}>
//                 <LogIn size={16} />
//                 <span>Sign In</span>
//               </button>
//             )}

//             {/* Mobile Hamburger Toggle Button */}
//             <button 
//               className="mobile-hamburger-btn"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               aria-label="Toggle Mobile Menu"
//             >
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>

//           </div>
//         </div>

//         {/* Mobile Menu Drawer */}
//         <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
//           <div className="mobile-menu-content">
            
//             <div className="mobile-search-bar" onClick={() => { setIsSearchOpen(true); setIsMobileMenuOpen(false); }}>
//               <Search size={16} />
//               <span>Search documentation & APIs...</span>
//             </div>

//             <div className="mobile-nav-section">
//               <span className="mobile-section-title">Navigation</span>
//               <a href="#home" className="mobile-nav-item active" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
//               <a href="#architecture" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>Architecture</a>
//               <a href="#api" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>REST APIs</a>
//               <a href="#docs" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>Documentation</a>
//             </div>

//             <div className="mobile-nav-section">
//               <span className="mobile-section-title">MERN Stack Tech</span>
//               <div className="mobile-grid">
//                 <a href="#mongodb" className="mobile-tech-badge tag-green" onClick={() => setIsMobileMenuOpen(false)}>
//                   <Database size={14} /> MongoDB
//                 </a>
//                 <a href="#express" className="mobile-tech-badge tag-amber" onClick={() => setIsMobileMenuOpen(false)}>
//                   <Server size={14} /> Express.js
//                 </a>
//                 <a href="#react" className="mobile-tech-badge tag-cyan" onClick={() => setIsMobileMenuOpen(false)}>
//                   <Code2 size={14} /> React
//                 </a>
//                 <a href="#node" className="mobile-tech-badge tag-purple" onClick={() => setIsMobileMenuOpen(false)}>
//                   <Cpu size={14} /> Node.js
//                 </a>
//               </div>
//             </div>

//             <div className="mobile-footer-actions">
//               <button className="mobile-theme-btn" onClick={toggleTheme}>
//                 {theme === 'dark' ? <><Sun size={18} /> Light Mode</> : <><Moon size={18} /> Dark Mode</>}
//               </button>
              
//               {isLoggedIn ? (
//                 <button className="mobile-logout-btn" onClick={() => setIsLoggedIn(false)}>
//                   Sign Out ({user.name})
//                 </button>
//               ) : (
//                 <button className="btn-login-cta w-full" onClick={() => setIsLoggedIn(true)}>
//                   <LogIn size={16} /> Sign In
//                 </button>
//               )}
//             </div>

//           </div>
//         </div>
//       </header>

//       {/* Global Search Modal */}
//       <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
//     </>
//   );
// }
