import React from 'react';
import {
  Trophy,
  Zap,
  Award,
  ShieldCheck,
  Users,
  Briefcase,
  UserCheck,
  Lightbulb,
  Send,
  Flag,
  Target,
  Smile,
  TrendingUp,
  Globe
} from 'lucide-react';

export const recognitionItems = [
  {
    id: 'award-1',
    category: 'awards',
    year: '2025',
    issuer: 'Digital Growth Summit',
    title: 'Best Performance Marketing Agency',
    description: 'Awarded for delivering exceptional ROI, multi-channel media scaling, and 5x conversion rates for leading D2C brands.',
    icon: <Trophy size={32} className="award-gold-icon" />,
    image: '/image2.webp',
    badgeText: 'Official Award Trophy'
  },
  {
    id: 'award-2',
    category: 'awards',
    year: '2025',
    issuer: 'AI Marketing Excellence',
    title: 'Generative AI Marketing Pioneer',
    description: 'Honored for pioneering Generative Engine Optimization (GEO) & conversational AI sales automation in India.',
    icon: <Zap size={32} className="award-cyan-icon" />,
    image: '/image3.webp',
    badgeText: 'AI Innovation Award'
  },
  {
    id: 'award-3',
    category: 'awards',
    year: '2024',
    issuer: 'National Agency Leadership',
    title: 'Excellence in D2C & E-Commerce Scaling',
    description: 'Celebrated for high-converting brand storytelling, scroll-stopping ad copy, and scale-up performance strategies.',
    icon: <Award size={32} className="award-pink-icon" />,
    image: '/image4.webp',
    badgeText: 'E-Commerce Award'
  },
  {
    id: 'award-4',
    category: 'awards',
    year: '2024',
    issuer: 'Digital Excellence Council',
    title: 'Top Digital Growth Agency North India',
    description: 'Recognized for top client retention, transparent 24/7 analytics reporting, and outstanding agency leadership.',
    icon: <ShieldCheck size={32} className="award-purple-icon" />,
    image: '/image1.webp',
    badgeText: 'Agency Leadership Trophy'
  },
  {
    id: 'cert-1',
    category: 'awards',
    year: '2025',
    issuer: 'Google Partner Network',
    title: 'Google Premier Partner Accreditation',
    description: 'Official Premier Partner certificate recognizing top performance in Search, Video, Shopping & GA4 Analytics.',
    icon: <Award size={32} className="award-gold-icon" />,
    image: '/IMG_1480-scaled.webp',
    badgeText: 'Official Certificate'
  },
  {
    id: 'cert-2',
    category: 'awards',
    year: '2025',
    issuer: 'Meta Business Network',
    title: 'Meta Certified Business Partner',
    description: 'Accredited Media Buying Professional certification for full-funnel Facebook & Instagram performance ads.',
    icon: <ShieldCheck size={32} className="award-pink-icon" />,
    image: '/IMG_1482-scaled.webp',
    badgeText: 'Official Certificate'
  }
];

export const newsList = [
  {
    id: 1,
    publisher: 'The Economic Times',
    date: 'Jan 2025',
    headline: 'Digital ORRA Scaling Tier-2 & Tier-3 D2C Brands via ROI-Focused Performance Marketing',
    snippet: 'Special report detailing how Digital ORRA turned regional brands into national powerhouses using hyper-targeted Meta & Google ads.',
    image: '/IMG_1485-scaled.webp',
    link: 'https://digitalorra.com'
  },
  {
    id: 2,
    publisher: 'Business Standard',
    date: 'Nov 2024',
    headline: 'How Digital ORRA Pioneered Generative Engine Optimization (GEO) in India',
    snippet: 'Feature story on how AI search models like ChatGPT & Gemini are changing search habits, and how Digital ORRA leads LLM citations.',
    image: '/IMG_1484-scaled.webp',
    link: 'https://digitalorra.com'
  },
  {
    id: 3,
    publisher: 'Financial Express',
    date: 'Oct 2024',
    headline: "Bridging Skill Gap: Digital ORRA's 100% Practical Live Client Project Training Model",
    snippet: 'An overview of Digital ORRA Academy’s practical curriculum that trains job-ready digital marketing strategists.',
    image: '/IMG_1480-scaled.webp',
    link: 'https://digitalorra.com'
  }
];

export const processItems = [
  {
    id: 0,
    step: 'STEP 1',
    number: '01',
    theme: 'theme-pink',
    waveClass: 'pink-wave',
    bgClass: 'pink-bg',
    iconBgClass: 'pink-icon-bg',
    btnClass: 'pink-btn',
    dotClass: 'pink-dot',
    icon: <Users size={20} />,
    nodeIcon: <Send size={18} />,
    nodeClass: 'pink-node',
    title: 'Introduction',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
    desc: 'We utilize creative resources to deliver strategic branding, digital marketing, high-impact campaign planning, design, and end-to-end event management.'
  },
  {
    id: 1,
    step: 'STEP 2',
    number: '02',
    theme: 'theme-purple',
    waveClass: 'purple-wave',
    bgClass: 'purple-bg',
    iconBgClass: 'purple-icon-bg',
    btnClass: 'purple-btn',
    dotClass: 'purple-dot',
    icon: <Briefcase size={20} />,
    nodeIcon: <Flag size={18} />,
    nodeClass: 'purple-node',
    title: 'Working on live projects',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    desc: 'We focus on hands-on practical learning. Trainees work directly on live client projects to master real-world digital tools and execution strategies.'
  },
  {
    id: 2,
    step: 'STEP 3',
    number: '03',
    theme: 'theme-blue',
    waveClass: 'blue-wave',
    bgClass: 'blue-bg',
    iconBgClass: 'blue-icon-bg',
    btnClass: 'blue-btn',
    dotClass: 'blue-dot',
    icon: <UserCheck size={20} />,
    nodeIcon: <Flag size={18} />,
    nodeClass: 'blue-node',
    title: 'Providing Job placement',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    desc: 'Our live project experience builds complete professional confidence. We partner with top digital firms to provide 100% placement assistance.'
  },
  {
    id: 3,
    step: 'STEP 4',
    number: '04',
    theme: 'theme-emerald',
    waveClass: 'emerald-wave',
    bgClass: 'emerald-bg',
    iconBgClass: 'emerald-icon-bg',
    btnClass: 'emerald-btn',
    dotClass: 'emerald-dot',
    icon: <Lightbulb size={20} />,
    nodeIcon: <Lightbulb size={18} />,
    nodeClass: 'emerald-node',
    title: 'What We Believe?',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80',
    desc: 'We believe research-driven ideas power brand growth. We craft tailored digital strategies that help you dominate your unique market presence.'
  }
];

export const pillHighlights = [
  { title: 'Result Driven', icon: <Target size={16} /> },
  { title: 'Creative First', icon: <Lightbulb size={16} /> },
  { title: 'Client Focused', icon: <Users size={16} /> },
  { title: 'Growth Oriented', icon: <TrendingUp size={16} /> }
];

export const aboutValues = [
  {
    icon: <Target className="value-icon-svg" size={28} />,
    title: 'Data-Driven Strategy',
    description: 'We don’t rely on guesswork. Every strategy is built on deep market research, predictive analytics, and real user data to maximize your ROI.',
    tag: 'Precision'
  },
  {
    icon: <ShieldCheck className="value-icon-svg" size={28} />,
    title: 'Radical Transparency',
    description: 'No hidden fees or obscure jargon. Enjoy 24/7 access to live client dashboards and clear, honest monthly performance reporting.',
    tag: 'Integrity'
  },
  {
    icon: <Lightbulb className="value-icon-svg" size={28} />,
    title: 'Creative Innovation',
    description: 'Break through digital noise with scroll-stopping ad copy, stunning modern web design, and cutting-edge brand storytelling.',
    tag: 'Creativity'
  },
  {
    icon: <Zap className="value-icon-svg" size={28} />,
    title: 'Agile & Fast Execution',
    description: 'In the fast-moving digital realm, speed wins. We launch campaigns quickly and continuously iterate to keep you ahead of competitors.',
    tag: 'Agility'
  },
  {
    icon: <Users className="value-icon-svg" size={28} />,
    title: 'Client-Centric Growth',
    description: 'We view ourselves as an extension of your internal team. Your growth targets are our personal KPIs, and we win when you win.',
    tag: 'Partnership'
  },
  {
    icon: <Globe className="value-icon-svg" size={28} />,
    title: 'Global Scalability',
    description: 'Whether you are targeting local customers or expanding internationally, our multi-channel solutions scale seamlessly with your vision.',
    tag: 'Scale'
  }
];
