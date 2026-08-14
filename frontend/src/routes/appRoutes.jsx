import React, { lazy } from 'react';

// Lazy loading page components from src/pages/
const HomePage = lazy(() => import('../pages/home/HomePage'));
const AboutUsPage = lazy(() => import('../pages/about/AboutUsPage'));
const ServiceDetailPage = lazy(() => import('../pages/services/ServiceDetailPage'));
const CoursesPage = lazy(() => import('../pages/courses/CoursesPage'));
const ContactUsPage = lazy(() => import('../pages/contact/ContactUsPage'));
const BlogPage = lazy(() => import('../pages/blog/BlogPage'));
const BlogDetailPage = lazy(() => import('../pages/blog/BlogDetailPage'));
const GalleryPage = lazy(() => import('../pages/gallery/GalleryPage'));
const CareerPage = lazy(() => import('../pages/career/CareerPage'));
const ServicesPage = lazy(() => import('../pages/services/ServicesPage'));
const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage'));
const ScanQrPage = lazy(() => import('../pages/scan-qr/ScanQrPage'));
const NotFoundPage = lazy(() => import('../pages/not-found/NotFoundPage'));
const FaqsPage = lazy(() => import('../pages/faqs/FaqsPage'));
const AcademyPage = lazy(() => import('../pages/academy/AcademyPage'));
const ItCompanyPage = lazy(() => import('../pages/it-company/ItCompanyPage'));
const OurTeamPage = lazy(() => import('../pages/our-team/OurTeamPage'));
const TestimonialPage = lazy(() => import('../pages/testimonials/TestimonialPage'));
const CompanyProfilePage = lazy(() => import('../pages/profile/CompanyProfilePage'));
const PortfolioSection = lazy(() => import('../components/Portfolio/PortfolioSection'));

export const getAppRoutes = (onOpenAuditModal) => [
  // Core App Pages
  { path: '/', element: <HomePage onOpenAuditModal={onOpenAuditModal} /> },
  { path: '/about-us', element: <AboutUsPage onOpenAuditModal={onOpenAuditModal} /> },
  { path: '/scan-qr', element: <ScanQrPage /> },
  { path: '/courses', element: <CoursesPage /> },
  { path: '/portfolio', element: <PortfolioSection /> },

  // Blog Routes (Handled Dynamically by Backend Slug)
  { path: '/blog', element: <BlogPage /> },
  { path: '/blog/page/*', element: <BlogPage /> },
  { path: '/:slug', element: <BlogDetailPage /> },

  // Gallery & Career
  { path: '/gallery', element: <GalleryPage /> },
  { path: '/join-our-team', element: <CareerPage /> },

  // Contact Pages
  { path: '/contact-us', element: <ContactUsPage /> },
  { path: '/contact', element: <ContactUsPage /> },

  // Services Routes (Handled Dynamically by Backend Service ID / Slug)
  { path: '/services', element: <ServicesPage /> },
  { path: '/service/:serviceId', element: <ServiceDetailPage /> },

  // Additional Company Info Pages
  { path: '/faqs', element: <FaqsPage /> },
  { path: '/academy', element: <AcademyPage /> },
  { path: '/it-company', element: <ItCompanyPage onOpenAuditModal={onOpenAuditModal} /> },
  { path: '/our-team', element: <OurTeamPage /> },
  { path: '/company-profile', element: <CompanyProfilePage /> },
  { path: '/testimonial', element: <TestimonialPage /> },

  // Admin Route
  { path: '/admin', element: <AdminLoginPage /> },

  // 404 Catch All
  { path: '*', element: <NotFoundPage /> }
];
