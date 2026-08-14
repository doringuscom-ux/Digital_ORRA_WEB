import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Download,
  Eye,
  FileText,
  Globe,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Megaphone,
  Palette,
  Code,
  Mail,
  Target,
  TrendingUp,
  MessageSquare,
  Video,
  Tv,
  Share2,
  ShieldCheck,
  Zap,
  BookOpen
} from 'lucide-react';
import './CompanyProfilePage.css';

export default function CompanyProfilePage() {
  const navigate = useNavigate();

  const services = [
    {
      id: 'branding',
      title: 'Branding',
      icon: <Megaphone className="service-icon-svg" size={26} />,
      desc: 'From creating your business branding concepts to designing the branding elements, our team creates unique brands that make your business stand out from your competitors.'
    },
    {
      id: 'logo',
      title: 'Logo',
      icon: <Palette className="service-icon-svg" size={26} />,
      desc: 'From conceptualizing your business branding to designing the branding elements, our team creates unique brands that make your business stand out from your competitors.'
    },
    {
      id: 'web-dev',
      title: 'Web Development',
      icon: <Code className="service-icon-svg" size={26} />,
      desc: 'Get a professional-looking, mobile responsive, and functional website that is designed to funnel business leads and drive sales for your business around the clock.'
    },
    {
      id: 'copy-writing',
      title: 'Copy Writing',
      icon: <FileText className="service-icon-svg" size={26} />,
      desc: 'With our service, the creation of professional content for your business list no longer hassles. We handle newsletters, SEO website content, blog posts, and much more.'
    },
    {
      id: 'email-marketing',
      title: 'Email Marketing',
      icon: <Mail className="service-icon-svg" size={26} />,
      desc: 'Our turnkey email marketing solution gives your company access to all digital assets required to set up, launch, and manage email marketing campaigns.'
    },
    {
      id: 'google-ads',
      title: 'Google Ads',
      icon: <Target className="service-icon-svg" size={26} />,
      desc: 'Our Google Ads service guarantee a steady stream of highly-targeted traffic to your websites, landing pages, and affiliate offers to acquire business leads and drive sales.'
    },
    {
      id: 'seo',
      title: 'SEO',
      icon: <TrendingUp className="service-icon-svg" size={26} />,
      desc: 'Outrank your competitors in the search engine result pages with our SEO services that cover content creation, on-page optimization, and creation of high-authority backlinks.'
    },
    {
      id: 'bulk-sms',
      title: 'Bulk SMS',
      icon: <MessageSquare className="service-icon-svg" size={26} />,
      desc: 'Our SMS marketing solution presents your business with a user-friendly platform for sending SMS marketing campaigns mobile numbers around the world.'
    },
    {
      id: 'media-planning',
      title: 'Media Planning',
      icon: <Video className="service-icon-svg" size={26} />,
      desc: 'Get access to experts that helps your company handle all media-related tasks, from planning to execution. We also monitor results to achieve the best possible ROI.'
    },
    {
      id: 'websites',
      title: 'Websites',
      icon: <Globe className="service-icon-svg" size={26} />,
      desc: 'We offer professional web design services at affordable rates to help your business attract more visitors and keep them on your site! More than beautiful design, we build websites with a complete strategy designed to turn your site visitors into customers.'
    },
    {
      id: 'signage',
      title: 'Signage',
      icon: <Tv className="service-icon-svg" size={26} />,
      desc: 'We have in-house talents that create stunning digital billboards, banners, animated video, documentaries, and much more. Whether you want to create a new brand or rebrand an existing one, our creative agency will help you achieve your objectives.'
    },
    {
      id: 'smm',
      title: 'SMM',
      icon: <Share2 className="service-icon-svg" size={26} />,
      desc: 'We help manage your corporate profile and post engaging content to build followership on social media platforms such as Facebook, Instagram, Snapchat, Twitter, and LinkedIn.'
    }
  ];

  const profilePdfUrl = "/company-profile/Digital-Orra-Company-Profile.pdf";

  return (
    <div className="company-profile-page">
      {/* Background Decorative Glow Orbs */}
      <div className="cp-glow-orb cp-glow-1"></div>
      <div className="cp-glow-orb cp-glow-2"></div>

      <div className="cp-container">

        {/* 1. HERO HEADER SECTION */}
        <section className="cp-hero-section">
          <div className="cp-pill-badge">
            <Building2 size={16} />
            <span>COMPANY PROFILE • DIGITAL ORRA</span>
          </div>

          <h1 className="cp-hero-title">
            Marketing & Advertising <span className="highlight-pink">Agency</span>
          </h1>

          <p className="cp-hero-description">
            “Digital ORRA” one of the best Digital Marketing Academy helps making you highly knowledgeable, confident, positive, and technically sound digital media professionals.
            <br /><br />
            To meet individual needs, we train them as per industry requirements and deliver the best possible results. Digital ORRA Academy has trained 500+ students for Digital Marketing Certification with proven global standards.
          </p>

          {/* Action Buttons: National & International Company's Profile */}
          <div className="cp-hero-actions">
            <a
              href={profilePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cp-btn-primary"
            >
              <Eye size={18} />
              <span>National Company's Profile</span>
            </a>

            <a
              href={profilePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cp-btn-secondary"
            >
              <Eye size={18} />
              <span>International Company's Profile</span>
            </a>
          </div>
        </section>

        {/* 2. INTRODUCTION SECTION */}
        <section className="cp-section cp-intro-grid">
          <div className="cp-visual-col">
            <div className="cp-image-card-wrapper">
              <div className="cp-frame-backdrop"></div>
              <div className="cp-image-box">
                <img
                  src="/about-office.png"
                  alt="Digital Orra Marketing Agency Introduction"
                  className="cp-intro-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
            </div>
          </div>

          <div className="cp-content-col">
            <div className="cp-section-eyebrow">
              <span className="eyebrow-dash"></span>
              <span>AGENCY OVERVIEW</span>
            </div>

            <h2 className="cp-section-title">Introduction</h2>

            <p className="cp-body-text">
              As a marketing agency, we utilize our resources of creativity in the specialization of ultimate branding, marketing strategies, planning and implementation, digital marketing and social media as well as designing and events creation and management.
            </p>

            <p className="cp-body-text">
              The world today is cluttered with advertising agencies trying to impress you and win you as a client.
            </p>
          </div>
        </section>

        {/* 3. WHO WE ARE SECTION */}
        <section className="cp-who-we-are-banner">
          <div className="who-we-are-card">
            <div className="card-badge">
              <ShieldCheck size={18} className="pink-icon" />
              <span>TOP PROFESSIONAL MARKETING COMPANY</span>
            </div>

            <h2 className="who-we-are-title">Who we are?</h2>

            <p className="who-we-are-desc">
              DIGITAL ORRA ranks top among the professional Marketing companies in India. We offer a comprehensive suite of services designed to cater the marketing needs of businesses. Our mission is to help companies increase their bottom line by maximizing ROI derivable from their marketing efforts.
            </p>
          </div>
        </section>

        {/* 4. WHAT WE BELIEVE SECTION */}
        <section className="cp-section cp-believe-grid">
          <div className="cp-content-col">
            <div className="cp-section-eyebrow">
              <span className="eyebrow-dash"></span>
              <span>OUR CORE PHILOSOPHY</span>
            </div>

            <h2 className="cp-section-title">
              What We <span className="highlight-pink">Believe?</span>
            </h2>

            <p className="cp-body-text">
              We believe in the power of ideas to drive innovative brand results. Our ideas are born out of powerful research-driven insight, and deep local understanding, resulting in unparalleled outcomes. Our practice is to develop brand strategies that allow you to capitalize on your unique market presence, while ensuring that your brand promise is increasingly represented. With guiding actions, both big and small, we’ll deliver on that brand promise.
            </p>

            <p className="cp-body-text">
              We believe our purpose is to help you, our client, build lasting brands that command consumer loyalty. We promise to create captivating ideas that make your promise consistent and true to your brand’s image and identity. We match our mission with corresponding actions that benefit you.
            </p>
          </div>

          <div className="cp-visual-col">
            <div className="cp-image-card-wrapper">
              <div className="cp-frame-backdrop backdrop-pink"></div>
              <div className="cp-image-box">
                <img
                  src="/about-founder-team.jpg"
                  alt="Digital Orra Strategic Innovation Team"
                  className="cp-intro-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. WHAT WE DO SECTION (12 SERVICE CARDS GRID) */}
        <section className="cp-services-section">
          <div className="cp-services-header">
            <div className="cp-section-eyebrow center-eyebrow">
              <span className="eyebrow-dash"></span>
              <span>COMPREHENSIVE SOLUTIONS</span>
              <span className="eyebrow-dash"></span>
            </div>

            <h2 className="cp-services-main-title">
              What We <span className="highlight-pink">Do</span>
            </h2>

            <p className="cp-services-intro-desc">
              DIGITAL ORRA offers a comprehensive suite of services designed to cater the marketing needs of businesses.
              We understand the importance of a brand’s social media presence. We get to know them and their target
              audiences intimately, then we create, develop and communicate brands and their messages in an impactful
              & engaging way on their social media platforms. The best way for us to tell you our story is through the
              projects that we deliver for our clients.
            </p>
          </div>

          {/* 12 Services Grid */}
          <div className="cp-services-grid">
            {services.map((srv) => (
              <div key={srv.id} className="cp-service-card">
                <div className="cp-service-card-top">
                  <div className="cp-service-icon-box">
                    {srv.icon}
                  </div>
                </div>

                <h3 className="cp-service-title">{srv.title}</h3>
                <p className="cp-service-desc">{srv.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Download CTA */}
          <div className="cp-bottom-cta">
            <a
              href={profilePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Digital-Orra-Company-Profile.pdf"
              className="cp-download-big-btn"
            >
              <Download size={20} />
              <span>Download Company’s Profile</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
