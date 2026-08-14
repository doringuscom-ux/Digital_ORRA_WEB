import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Course from './models/Course.js';

const FULL_COURSES_DATA = [
  {
    title: 'Basic Digital Marketing',
    category: 'Digital Marketing & Performance',
    badge: 'BEGINNER FRIENDLY',
    subtitle: 'Master the fundamentals of digital presence and organic marketing strategy.',
    description: 'Master the fundamentals of digital presence, search engine basics, social media strategy, and organic growth for modern business.',
    duration: '2 Months',
    price: '₹25,000',
    originalPrice: '₹30,000',
    discount: '16% OFF',
    idealFor: 'Beginners & Students',
    hasInternship: false,
    placementAssistance: true,
    syllabus: [
      'Social Media Marketing',
      'Basics of Google & Meta Ads',
      'SEO Fundamentals',
      'Content Strategy',
      'Reporting & Analytics'
    ]
  },
  {
    title: 'Advanced Digital Marketing',
    category: 'Digital Marketing & Performance',
    badge: 'MOST POPULAR',
    popular: true,
    subtitle: 'Full-stack performance marketing with live client ad budget management.',
    description: 'Comprehensive full-stack digital marketing program covering paid media, agency workflows, CRO, and live client ad account management.',
    duration: '3 Months',
    price: '₹45,000',
    originalPrice: '₹50,000',
    discount: '10% OFF',
    idealFor: 'Intermediate learners aiming for job-ready skills',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      'Paid Ads (Meta, Google)',
      'Performance Marketing',
      'Website Audit',
      'SEO (On-page & Off-page)',
      'Google Ads – Search, Display, and Video'
    ]
  },
  {
    title: 'Digital Marketing with AI',
    category: 'AI & Search (SEO/AEO/GEO)',
    badge: 'HOT & TRENDING',
    popular: true,
    subtitle: 'Next-gen AI marketing automation using ChatGPT, Perplexity, Gemini & DeepSeek.',
    description: 'Leap ahead with cutting-edge artificial intelligence tools. Automate ad copy, graphic design, SEO research, and predictive campaign scaling.',
    duration: '3.5 - 4 Months',
    price: '₹50,000',
    originalPrice: '₹60,000',
    discount: '17% OFF',
    idealFor: 'Marketers, Freelancers & Career Professionals',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      'Everything in Advanced Course',
      'AI Tools for Marketing Automation',
      'ChatGPT, Jasper, Canva AI, Copy.ai, DeepSeek, Gemini, Perplexity AI',
      'AI-Driven Ad Optimization',
      'Smart Campaign Planning'
    ]
  },
  {
    title: 'Performance Marketing Masterclass',
    category: 'Digital Marketing & Performance',
    badge: 'HIGH ROAS',
    subtitle: 'Full-funnel media buying, CAC reduction, and budget scaling algorithms.',
    description: 'Specialized media buying masterclass focused on ROI optimization, funnel testing, server-side tracking, and scaling e-commerce & lead gen ad spend.',
    duration: '3 Months',
    price: '₹45,000',
    originalPrice: '₹50,000',
    discount: '10% OFF',
    idealFor: 'Growth Marketers, E-commerce Founders & Media Buyers',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      'Multi-Channel Funnel Architecture',
      'Real-Time Budget Scaling Algorithms',
      'Audience Retargeting & Custom LALs',
      'Conversion Rate Optimization (CRO)',
      'Server-Side Tracking (CAPI & GTM)'
    ]
  },
  {
    title: 'Meta Ads & Paid Social Mastery',
    category: 'Digital Marketing & Performance',
    badge: 'PAID SOCIAL',
    subtitle: 'Precision Facebook & Instagram campaigns engineered for max ROAS.',
    description: 'Master Meta Business Manager, creative testing, Advantage+ campaigns, custom audiences, and high-converting Reels ad formats.',
    duration: '2.5 Months',
    price: '₹38,000',
    originalPrice: '₹45,000',
    discount: '15% OFF',
    idealFor: 'Social Media Managers, Agencies & Business Owners',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      'A/B Ad Creative Testing Frameworks',
      'Custom & Lookalike Audience Hacking',
      'Pixel & Meta Conversions API (CAPI)',
      'Feed, Stories & Reels Ad Strategies',
      'ROAS Scaling & Ad Copy Psychology'
    ]
  },
  {
    title: 'Google Ads (PPC) Specialist',
    category: 'Digital Marketing & Performance',
    badge: 'HIGH INTENT LEADS',
    subtitle: 'Google Search, Performance Max, Shopping Feeds & YouTube Video ads.',
    description: 'Become a certified Google Ads expert. Master high-intent search bidding, PMax automation, Merchant Center shopping feeds, and YouTube ads.',
    duration: '2.5 Months',
    price: '₹38,000',
    originalPrice: '₹45,000',
    discount: '15% OFF',
    idealFor: 'PPC Specialists, Job Seekers & Business Executives',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      'High-Intent Search Keyword Bidding',
      'Performance Max & Display Retargeting',
      'Google Merchant Center Shopping Feeds',
      'Quality Score & Click Fraud Defense',
      'Conversion & GA4 Analytics Setup'
    ]
  },
  {
    title: 'SEO, AEO, GEO & SXO Masterclass',
    category: 'AI & Search (SEO/AEO/GEO)',
    badge: 'SEARCH & AI',
    subtitle: 'Rank #1 on Google and get cited by ChatGPT, Perplexity & Claude.',
    description: 'Next-generation search engine optimization course covering traditional SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO).',
    duration: '3 Months',
    price: '₹42,000',
    originalPrice: '₹50,000',
    discount: '16% OFF',
    idealFor: 'SEO Specialists, Content Strategists & Webmasters',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      'Technical SEO & Core Web Vitals Audit',
      'AEO: Direct Answer Snippet Optimization',
      'GEO: LLM Brand Citation & Knowledge Graphs',
      'SXO: Search Experience & Conversion UX',
      'Authority Backlinking & Local Map Packs'
    ]
  },
  {
    title: 'AIO & AI Marketing Automation',
    category: 'AI & Search (SEO/AEO/GEO)',
    badge: 'AI AUTOMATION',
    subtitle: 'AI content modeling, predictive user intent, and algorithmic scaling.',
    description: 'Learn Artificial Intelligence Optimization (AIO) techniques to build automated content funnels, predictive user models, and AI workflow bots.',
    duration: '2.5 Months',
    price: '₹40,000',
    originalPrice: '₹48,000',
    discount: '17% OFF',
    idealFor: 'Digital Marketers, Tech Enthusiasts & Automation Consultants',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      'AI Content & Predictive Intent Modeling',
      'Algorithmic Rank & Search Tracking',
      'Dynamic Personalization Workflows',
      'Custom Prompt Engineering for Marketing',
      'Automated Analytics & Report Generators'
    ]
  },
  {
    title: 'Social Media Handling & Brand Growth',
    category: 'Social Media & Automation',
    badge: 'ORGANIC GROWTH',
    subtitle: 'Build loyal digital communities with scroll-stopping design & reels.',
    description: 'Learn end-to-end organic social media management across Instagram, LinkedIn, YouTube Shorts, and TikTok with viral content calendars.',
    duration: '2.5 Months',
    price: '₹35,000',
    originalPrice: '₹42,000',
    discount: '16% OFF',
    idealFor: 'Social Media Managers, Creators & Small Business Owners',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      'Instagram, LinkedIn & TikTok Content Strategy',
      'Viral Carousel & Reels Production',
      'Community Management & DM Automation',
      'Brand Aesthetics & Grid Planning',
      'Monthly Analytics & Audience Insights'
    ]
  },
  {
    title: 'WhatsApp Marketing & Chatbots',
    category: 'Social Media & Automation',
    badge: 'CHAT AUTOMATION',
    subtitle: 'WhatsApp Business API setup, broadcast campaigns & multi-branch AI chat.',
    description: 'Harness the power of WhatsApp Cloud API. Build multi-branch interactive chatbots, automated broadcasts, CRM integrations, and sales flows.',
    duration: '1.5 Months',
    price: '₹25,000',
    originalPrice: '₹32,000',
    discount: '22% OFF',
    idealFor: 'Sales Reps, E-Commerce Owners & Customer Support Leads',
    hasInternship: false,
    placementAssistance: true,
    syllabus: [
      'Official WhatsApp Business API Approval',
      'Automated Chatbot Flow Construction',
      'CRM Lead Sync & Instant Alerts',
      'Broadcast Campaign & Retargeting',
      'Catalog Integration & Payment Links'
    ]
  },
  {
    title: 'UGC Content & Viral Reels Creation',
    category: 'Creative, Video & Design',
    badge: 'VIRAL CONTENT',
    subtitle: 'Scripting, filming and editing high-converting vertical video ads.',
    description: 'Master User Generated Content (UGC) creation. Learn 3-second hook psychology, mobile cinematography, vertical video editing, and ad scripting.',
    duration: '2 Months',
    price: '₹32,000',
    originalPrice: '₹40,000',
    discount: '20% OFF',
    idealFor: 'UGC Creators, Video Editors & Social Media Marketers',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      'Psychology of 3-Second Video Hooks',
      'Native Creator Casting & Scripting',
      'Mobile Filming Techniques & Lighting',
      'CapCut, VN & Premiere Pro Mobile Edits',
      'Short-Form Video Ad Optimization'
    ]
  },
  {
    title: 'Influencer Marketing & Celebrity PR',
    category: 'Social Media & Automation',
    badge: 'BRAND ELEVATION',
    subtitle: 'Niche creator matchmaking, contract legalities & A-list endorsements.',
    description: 'Learn how to plan, negotiate, execute, and measure influencer campaigns and celebrity brand endorsements for high brand equity.',
    duration: '2 Months',
    price: '₹32,000',
    originalPrice: '₹40,000',
    discount: '20% OFF',
    idealFor: 'PR Executives, Brand Managers & Talent Agents',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      'Micro & Macro Influencer Vetting',
      'Contracting, Usage Rights & Payouts',
      'Celebrity Ambassador Matchmaking',
      'Campaign Outreaches & Promo Codes',
      'ROI & Brand Equity Measurement'
    ]
  },
  {
    title: 'Video Editing & Post-Production',
    category: 'Creative, Video & Design',
    badge: 'CREATIVE CAREER',
    subtitle: 'Master Premiere Pro, After Effects & mobile reels editing for viral reach.',
    description: 'Comprehensive industry video editing course. Master Adobe Premiere Pro, motion graphics in After Effects, color grading, and viral short-form video edits.',
    duration: '3 - 4 Months',
    price: '₹45,000',
    originalPrice: '₹50,000',
    discount: '10% OFF',
    idealFor: 'Aspiring Editors, Content Creators, Filmmakers, YouTubers',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      'Adobe Premiere Pro & After Effects',
      'CapCut & VN for Mobile Editing',
      'Color Grading & Audio Score Sync',
      'Instagram Reels & Shorts Export Workflows',
      'Creative Storytelling & Client Handover'
    ]
  },
  {
    title: 'Corporate Video Production & Shoots',
    category: 'Creative, Video & Design',
    badge: 'STUDIO & CINEMA',
    subtitle: 'On-location 4K cinema filming, lighting setup, audio & directing.',
    description: 'Practical hands-on cinematography and production course. Learn 4K camera gear operations, 3-point lighting setups, sound engineering, and directing.',
    duration: '3 Months',
    price: '₹45,000',
    originalPrice: '₹52,000',
    discount: '13% OFF',
    idealFor: 'Videographers, Filmmakers, Media Production Students',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      '4K Camera Operations & Cinema Lenses',
      '3-Point Studio & Location Lighting',
      'Multi-Channel Audio Recording & Mics',
      'Pre-Production Storyboarding & Scripts',
      'Directing Corporate Brand Commercials'
    ]
  },
  {
    title: 'Graphic Designing & Brand Identity',
    category: 'Creative, Video & Design',
    badge: 'HIGH DEMAND',
    subtitle: 'Professional visual branding, typography, print media & UI design basics.',
    description: 'Master commercial graphic design with Adobe Photoshop, Illustrator, and Canva. Build professional brand identity systems, marketing banners, and UI layouts.',
    duration: '3 - 4 Months',
    price: '₹45,000',
    originalPrice: '₹50,000',
    discount: '10% OFF',
    idealFor: 'Creative Individuals, Students, Freelancers, Business Owners',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      'Adobe Photoshop & Illustrator Mastery',
      'Canva Pro & Visual Branding Identity',
      'Typography, Color Theory & Layout Rules',
      'Print Media & Social Banner Creatives',
      'Figma UI/UX Basics & Portfolio Creation'
    ]
  },
  {
    title: 'Full Stack Web Development',
    category: 'Development & Tech',
    badge: 'FULL STACK',
    subtitle: 'Build modern responsive websites and web applications from scratch.',
    description: 'Complete MERN stack web development boot camp. Build responsive frontends with React.js and robust backend REST APIs with Node.js, Express & MongoDB.',
    duration: '3 - 4 Months',
    price: '₹45,000',
    originalPrice: '₹50,000',
    discount: '10% OFF',
    idealFor: 'Beginners to Intermediate Developers, Freelancers, Job Seekers',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      'HTML5, Modern CSS3 & JavaScript (ES6+)',
      'React.js Frontend Architecture & Router',
      'Node.js & Express.js REST API Backend',
      'MongoDB & Mongoose Database CRUD',
      'Full Stack App Deployment & GitHub'
    ]
  },
  {
    title: 'App Development (iOS & Android)',
    category: 'Development & Tech',
    badge: 'MOBILE APPS',
    subtitle: 'Cross-platform React Native & Flutter mobile app engineering.',
    description: 'Learn modern cross-platform mobile application development using React Native and Flutter. Build, test, and publish iOS & Android apps.',
    duration: '3.5 - 4 Months',
    price: '₹48,000',
    originalPrice: '₹58,000',
    discount: '17% OFF',
    idealFor: 'Mobile Developers, Software Engineers & Tech Entrepreneurs',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      'React Native & Expo Ecosystem',
      'Flutter & Dart Mobile Architecture',
      'Native UI Components & Navigation',
      'API Integration & Local Storage',
      'App Store & Google Play Publishing'
    ]
  },
  {
    title: 'CRM & ERP Solutions Integration',
    category: 'Development & Tech',
    badge: 'ENTERPRISE TOOLS',
    subtitle: 'Build custom enterprise sales pipelines and business automation systems.',
    description: 'Enterprise business systems course. Build and integrate custom CRM pipelines, ERP databases, automated lead routing, and business analytics dashboards.',
    duration: '3 - 4 Months',
    price: '₹48,000',
    originalPrice: '₹58,000',
    discount: '17% OFF',
    idealFor: 'Enterprise Developers, Systems Architects & IT Consultants',
    hasInternship: true,
    placementAssistance: true,
    syllabus: [
      'HubSpot, Zoho & Salesforce Integration',
      'Custom ERP Database Architecture',
      'Automated Lead Scoring Pipelines',
      'Webhook & API Middleware Connectors',
      'Enterprise Business Analytics Dashboards'
    ]
  }
];

async function updateCoursesData() {
  console.log('🚀 Connecting to MongoDB Atlas...');
  const isConnected = await connectDB();
  if (!isConnected) {
    console.error('❌ Could not connect to MongoDB Atlas.');
    process.exit(1);
  }

  console.log('🔄 Updating Courses in MongoDB Atlas with rich descriptions & subtitles...');
  await Course.deleteMany({});
  const inserted = await Course.insertMany(FULL_COURSES_DATA);
  console.log(`✅ Successfully re-seeded ${inserted.length} course documents in MongoDB Atlas!`);

  process.exit(0);
}

updateCoursesData();
