import React from 'react';
import HeroSection from '../../components/Hero/HeroSection';
import CertificationsSection from '../../components/Certifications/CertificationsSection';
import WhatWeWorkSection from '../../components/WhatWeWork/WhatWeWorkSection';
import FeaturedVideoSection from '../../components/Video/FeaturedVideoSection';
import ProcessSection from '../../components/Process/ProcessSection';
import ServicesSection from '../../components/Services/ServicesSection';
import PortfolioSection from '../../components/Portfolio/PortfolioSection';
import TestimonialsSection from '../../components/Testimonials/TestimonialsSection';

export default function HomePage({ onOpenAuditModal }) {
  return (
    <div className="home-page-container">
      {/* 1. HERO SECTION */}
      <HeroSection onOpenAuditModal={onOpenAuditModal} />

      {/* 1.5. WE ARE CERTIFIED & TRUSTED LOGO SECTION */}
      <CertificationsSection />

      {/* 2. WHAT WE WORK ON SECTION */}
      <WhatWeWorkSection />

      {/* 3. FEATURED VIDEO SHOWCASE */}
      <FeaturedVideoSection />

      {/* 4. HOW WE WORK (PROCESS) SECTION */}
      <ProcessSection />

      {/* 5. OUR SERVICES GRID SECTION */}
      <ServicesSection />

      {/* 6. PORTFOLIO SECTION */}
      <PortfolioSection />

      {/* 7. TESTIMONIALS SECTION */}
      <TestimonialsSection />
    </div>
  );
}
