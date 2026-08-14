import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { getAppRoutes } from './routes/appRoutes';

import { useData } from './context/DataContext';

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const { seoPages } = useData() || {};

  // Dynamic Document Title and Meta Description synchronization
  useEffect(() => {
    if (isAdminPage) {
      document.title = 'Digital ORRA | Admin Control Panel';
      return;
    }

    const currentPath = location.pathname;
    
    // First, remove leading slash to check for exact dynamic match in DB
    const exactSlug = currentPath.substring(1); 
    
    // Fallback base mapping
    let pageSlug = 'home';
    if (currentPath === '/' || currentPath === '') pageSlug = 'home';
    else if (currentPath.startsWith('/about')) pageSlug = 'about-us';
    else if (currentPath.startsWith('/scan-qr')) pageSlug = 'scan-qr';
    else if (currentPath.startsWith('/our-team')) pageSlug = 'our-team';
    else if (currentPath.startsWith('/faqs')) pageSlug = 'faqs';
    else if (currentPath.startsWith('/portfolio')) pageSlug = 'portfolio';
    else if (currentPath.startsWith('/academy')) pageSlug = 'academy';
    else if (currentPath.startsWith('/it-company')) pageSlug = 'it-company';
    else if (currentPath.startsWith('/company-profile')) pageSlug = 'company-profile';
    else if (currentPath.startsWith('/testimonial')) pageSlug = 'testimonial';
    else if (currentPath.startsWith('/service')) pageSlug = 'services';
    else if (currentPath.startsWith('/course')) pageSlug = 'courses';
    else if (currentPath.startsWith('/blog') || currentPath.startsWith('/post')) pageSlug = 'blog';
    else if (currentPath.startsWith('/gallery')) pageSlug = 'gallery';
    else if (currentPath.startsWith('/join-our-team') || currentPath.startsWith('/career')) pageSlug = 'career';
    else if (currentPath.startsWith('/contact')) pageSlug = 'contact-us';

    if (Array.isArray(seoPages) && seoPages.length > 0) {
      // 1. Try EXACT match first (e.g., 'service/seo-marketing')
      let match = seoPages.find(s => s.pageSlug === exactSlug);
      
      // 2. Try prefix match fallback (e.g., 'services')
      if (!match) {
         match = seoPages.find(s => s.pageSlug === pageSlug);
      }
      
      if (match) {
        if (match.metaTitle) document.title = match.metaTitle;
        if (match.metaDescription) {
          let descMeta = document.querySelector('meta[name="description"]');
          if (descMeta) {
            descMeta.setAttribute('content', match.metaDescription);
          }
        }
      }
    }
  }, [location.pathname, seoPages, isAdminPage]);

  // Background prefetch from src/pages for instant page transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      import('./pages/about/AboutUsPage');
      import('./pages/services/ServicesPage');
      import('./pages/services/ServiceDetailPage');
      import('./pages/courses/CoursesPage');
      import('./pages/contact/ContactUsPage');
      import('./pages/career/CareerPage');
      import('./pages/blog/BlogPage');
      import('./pages/blog/BlogDetailPage');
      import('./pages/gallery/GalleryPage');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const openAuditModal = () => setIsAuditModalOpen(true);
  const routesConfig = getAppRoutes(openAuditModal);

  return (
    <MainLayout
      isAdminPage={isAdminPage}
      isAuditModalOpen={isAuditModalOpen}
      setIsAuditModalOpen={setIsAuditModalOpen}
    >
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
        <Routes>
          {routesConfig.map((routeItem, index) => {
            const cleanPath = routeItem.path.endsWith('/') ? routeItem.path.slice(0, -1) : routeItem.path;
            if (cleanPath === '' || cleanPath === '/') {
              return <Route key={index} path="/" element={routeItem.element} />;
            }
            return (
              <React.Fragment key={index}>
                <Route path={cleanPath} element={routeItem.element} />
                <Route path={`${cleanPath}/`} element={routeItem.element} />
              </React.Fragment>
            );
          })}
        </Routes>
      </Suspense>
    </MainLayout>
  );
}
