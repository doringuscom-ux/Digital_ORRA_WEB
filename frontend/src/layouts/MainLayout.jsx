import React from 'react';
import DigitalOrraNavbar from '../components/Navbar/DigitalOrraNavbar';
import FooterSection from '../components/Footer/FooterSection';
import ScrollToTop from '../components/Common/ScrollToTop';

export default function MainLayout({ children, isAdminPage, isAuditModalOpen, setIsAuditModalOpen }) {
  return (
    <div className="app-main-layout">
      {/* Auto Scroll to Top on Route Change */}
      <ScrollToTop />

      {/* Header Navigation */}
      {!isAdminPage && (
        <DigitalOrraNavbar
          isAuditModalOpen={isAuditModalOpen}
          setIsAuditModalOpen={setIsAuditModalOpen}
        />
      )}

      {/* Fixed Navbar Spacer */}
      {!isAdminPage && <div className="navbar-spacer" />}

      {/* Dynamic View Container */}
      <main>{children}</main>

      {/* Footer Section */}
      {!isAdminPage && <FooterSection />}
    </div>
  );
}
