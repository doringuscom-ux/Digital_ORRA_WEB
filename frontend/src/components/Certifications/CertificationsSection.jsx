import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import './CertificationsSection.css';

export default function CertificationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 10 Certification Items (5 original duplicated)
  const baseCertifications = [
    { id: 1, name: 'Government e-Marketplace (GeM)', badge: 'GeM Verified', image: '/certification/GEM.webp' },
    { id: 2, name: 'Google Certified Partner', badge: 'Google Partner', image: '/certification/google-partner.webp' },
    { id: 3, name: 'ISO Certified Agency', badge: 'ISO 9001:2015', image: '/certification/ISOO.webp' },
    { id: 4, name: 'Official Business Partner', badge: 'Verified Enterprise', image: '/certification/JJ.webp' },
    { id: 5, name: 'Meta Authorized Business Partner', badge: 'Meta Partner', image: '/certification/meta-business-partner.webp' },

    { id: 6, name: 'Government e-Marketplace (GeM)', badge: 'GeM Verified', image: '/certification/GEM.webp' },
    { id: 7, name: 'Google Certified Partner', badge: 'Google Partner', image: '/certification/google-partner.webp' },
    { id: 8, name: 'ISO Certified Agency', badge: 'ISO 9001:2015', image: '/certification/ISOO.webp' },
    { id: 9, name: 'Official Business Partner', badge: 'Verified Enterprise', image: '/certification/JJ.webp' },
    { id: 10, name: 'Meta Authorized Business Partner', badge: 'Meta Partner', image: '/certification/meta-business-partner.webp' }
  ];

  // Double list array for smooth 100% marquee infinite scroll
  const marqueeCertifications = [...baseCertifications, ...baseCertifications];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="certifications-section" ref={sectionRef}>
      <div className="cert-container">

        {/* Section Header */}
        <div className={`cert-header ${isVisible ? 'anim-in' : ''}`}>
          <h2 className="cert-title">
            CERTIFIED By <span className="cert-highlight">Global Leaders</span>
          </h2>
        </div>

        {/* Smooth Left-to-Right Continuous Moving Marquee Track */}
        <div className="cert-marquee-viewport">
          <div className="cert-marquee-track-right">
            {marqueeCertifications.map((cert, index) => (
              <div key={index} className="cert-marquee-card">
                <div className="cert-card-inner">
                  <div className="cert-image-wrapper">
                    <img 
                      src={cert.image} 
                      alt={cert.name} 
                      className={`cert-logo-img ${cert.image.includes('GEM') ? 'cert-logo-gem' : ''}`} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
