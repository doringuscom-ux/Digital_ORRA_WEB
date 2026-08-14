import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  TrendingUp,
  Target,
  Search,
  Share2,
  Bot,
  Code,
  Smartphone,
  Video,
  Palette,
  Database,
  Globe,
  Megaphone,
  Zap,
  Cpu,
  MousePointer,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
  Mail,
  ShoppingBag,
  Link,
  Layers,
  BarChart3,
  Send,
  Play,
  Repeat1,
  Cloud,
  Mic,
  Radio,
  FileText
} from 'lucide-react';
import './WhatWeWorkSection.css';

export default function WhatWeWorkSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [blinkingIndex, setBlinkingIndex] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [globeRotation, setGlobeRotation] = useState(0);

  // 28 Digital Marketing Capabilities for "All" tab
  const allCapabilities = [
    { id: 1, name: 'WhatsApp Integration', icon: <MessageSquare size={16} />, color: '#25D366' },
    { id: 2, name: 'Performance Marketing', icon: <TrendingUp size={16} />, color: '#E6007E' },
    { id: 3, name: 'Google Ads (PPC)', icon: <Target size={16} />, color: '#4285F4' },
    { id: 4, name: 'Meta Ads (FB & Insta)', icon: <Megaphone size={16} />, color: '#06B6D4' },
    { id: 5, name: 'Email Marketing', icon: <Mail size={16} />, color: '#EA4335' },
    { id: 6, name: 'SEO Optimization', icon: <Search size={16} />, color: '#10B981' },
    { id: 7, name: 'LinkedIn Ads', icon: <Share2 size={16} />, color: '#0A66C2' },
    { id: 8, name: 'AI Marketing Automation', icon: <Bot size={16} />, color: '#F59E0B' },
    { id: 9, name: 'Shopify E-Commerce', icon: <ShoppingBag size={16} />, color: '#96BF48' },
    { id: 10, name: 'Full Stack Web Dev', icon: <Code size={16} />, color: '#3B82F6' },
    { id: 11, name: 'Mobile App Development', icon: <Smartphone size={16} />, color: '#EC4899' },
    { id: 12, name: 'Viral Reels & UGC Video', icon: <Video size={16} />, color: '#EF4444' },
    { id: 13, name: 'CRM & ERP Integration', icon: <Database size={16} />, color: '#6366F1' },
    { id: 14, name: 'Graphic Design & Branding', icon: <Palette size={16} />, color: '#14B8A6' },
    { id: 15, name: 'Generative Search (GEO)', icon: <Cpu size={16} />, color: '#8B5CF6' },
    { id: 16, name: 'Answer Engine (AEO)', icon: <Zap size={16} />, color: '#F59E0B' },
    { id: 17, name: 'Influencer Marketing', icon: <Users size={16} />, color: '#E6007E' },
    { id: 18, name: 'Affiliate Marketing', icon: <Link size={16} />, color: '#10B981' },
    { id: 19, name: 'Search Experience (SXO)', icon: <MousePointer size={16} />, color: '#06B6D4' },
    { id: 20, name: 'Celebrity Endorsement', icon: <Award size={16} />, color: '#F59E0B' },
    { id: 21, name: 'YouTube Ads', icon: <Play size={16} />, color: '#FF0000' },
    { id: 22, name: 'Conversion Optimization (CRO)', icon: <BarChart3 size={16} />, color: '#3B82F6' },
    { id: 23, name: 'Retargeting Campaigns', icon: <Repeat1 size={16} />, color: '#EC4899' },
    { id: 24, name: 'Corporate Video Shoots', icon: <Video size={16} />, color: '#6366F1' },
    { id: 25, name: 'Broadcast Marketing', icon: <Send size={16} />, color: '#0088CC' },
    { id: 26, name: 'Brand Endorsement', icon: <Layers size={16} />, color: '#8B5CF6' },
    { id: 27, name: 'Digital Audit & Growth', icon: <Sparkles size={16} />, color: '#E6007E' },
    { id: 28, name: 'Analytics & Insights', icon: <Globe size={16} />, color: '#10B981' },
    { id: 29, name: 'Machine Learning & AI', icon: <Cpu size={16} />, color: '#8B5CF6' },
    { id: 30, name: 'LLM & Generative AI', icon: <Bot size={16} />, color: '#F59E0B' },
    { id: 31, name: 'CI/CD & DevOps Automation', icon: <Repeat1 size={16} />, color: '#14B8A6' },
    { id: 32, name: 'Docker & Kubernetes Cloud', icon: <Cloud size={16} />, color: '#326CE5' },
    { id: 33, name: 'ChatGPT & GPT-4o Integration', icon: <Bot size={16} />, color: '#10A37F' },
    { id: 34, name: 'Midjourney & Image Gen AI', icon: <Palette size={16} />, color: '#8B5CF6' }
  ];

  const categoryData = {
    'digital-marketing': [
      { id: 'dm1', name: 'SMM', icon: <Share2 size={16} />, color: '#0A66C2' },
      { id: 'dm2', name: 'SMO', icon: <Users size={16} />, color: '#E6007E' },
      { id: 'dm3', name: 'UGC', icon: <Sparkles size={16} />, color: '#F59E0B' },
      { id: 'dm4', name: 'Reels', icon: <Video size={16} />, color: '#EF4444' },
      { id: 'dm5', name: 'Shorts', icon: <Play size={16} />, color: '#FF0000' },
      { id: 'dm6', name: 'Influencers', icon: <Megaphone size={16} />, color: '#06B6D4' },
      { id: 'dm7', name: 'Creators', icon: <Palette size={16} />, color: '#EC4899' },
      { id: 'dm8', name: 'Copywriting', icon: <MessageSquare size={16} />, color: '#10B981' },
      { id: 'dm9', name: 'Videos', icon: <Video size={16} />, color: '#6366F1' },
      { id: 'dm10', name: 'Motion Graphics', icon: <Layers size={16} />, color: '#8B5CF6' },
      { id: 'dm11', name: 'SEO Optimization', icon: <Search size={16} />, color: '#10B981' },
      { id: 'dm12', name: 'Google Ads (PPC)', icon: <Target size={16} />, color: '#4285F4' },
      { id: 'dm13', name: 'Meta Ads', icon: <Megaphone size={16} />, color: '#06B6D4' },
      { id: 'dm14', name: 'Email Campaigns', icon: <Mail size={16} />, color: '#EA4335' },
      { id: 'dm15', name: 'Content Marketing', icon: <MessageSquare size={16} />, color: '#F59E0B' }
    ],
    'web-app-dev': [
      { id: 'wad1', name: 'Web Apps', icon: <Code size={16} />, color: '#06B6D4' },
      { id: 'wad2', name: 'Mobile Apps', icon: <Smartphone size={16} />, color: '#EC4899' },
      { id: 'wad3', name: 'WordPress', icon: <Globe size={16} />, color: '#21759B' },
      { id: 'wad4', name: 'Shopify', icon: <ShoppingBag size={16} />, color: '#96BF48' },
      { id: 'wad5', name: 'MERN', icon: <Database size={16} />, color: '#6366F1' },
      { id: 'wad6', name: 'UI/UX', icon: <Palette size={16} />, color: '#F59E0B' },
      { id: 'wad7', name: 'Full Stack', icon: <Layers size={16} />, color: '#3B82F6' },
      { id: 'wad8', name: 'Frontend', icon: <Globe size={16} />, color: '#10B981' },
      { id: 'wad9', name: 'Backend', icon: <Cpu size={16} />, color: '#8B5CF6' },
      { id: 'wad10', name: 'API Integration', icon: <Zap size={16} />, color: '#E6007E' },
      { id: 'wad11', name: 'Database', icon: <Database size={16} />, color: '#0A66C2' },
      { id: 'wad12', name: 'Cloud Services', icon: <Cloud size={16} />, color: '#0088CC' },
      { id: 'wad13', name: 'DevOps', icon: <Repeat1 size={16} />, color: '#14B8A6' },
      { id: 'wad14', name: 'CMS Solutions', icon: <Layers size={16} />, color: '#4285F4' },
      { id: 'wad15', name: 'React.js / Next.js', icon: <Code size={16} />, color: '#61DAFB' },
      { id: 'wad16', name: 'Node.js', icon: <Cpu size={16} />, color: '#339933' },
      { id: 'wad17', name: 'Flutter Apps', icon: <Smartphone size={16} />, color: '#02569B' },
      { id: 'wad18', name: 'PWA (Progressive Web)', icon: <Globe size={16} />, color: '#5A0FC8' }
    ],
    'growth-branding': [
      { id: 'gb1', name: 'Branding', icon: <Award size={16} />, color: '#E6007E' },
      { id: 'gb2', name: 'Graphics', icon: <Palette size={16} />, color: '#14B8A6' },
      { id: 'gb3', name: 'Logos', icon: <Sparkles size={16} />, color: '#8B5CF6' },
      { id: 'gb4', name: 'Analytics', icon: <BarChart3 size={16} />, color: '#10B981' },
      { id: 'gb5', name: 'GA4', icon: <TrendingUp size={16} />, color: '#F59E0B' },
      { id: 'gb6', name: 'Tracking', icon: <Target size={16} />, color: '#EF4444' },
      { id: 'gb7', name: 'Reports', icon: <BarChart3 size={16} />, color: '#4285F4' },
      { id: 'gb8', name: 'Dashboards', icon: <Layers size={16} />, color: '#06B6D4' },
      { id: 'gb9', name: 'Lead Generation', icon: <Zap size={16} />, color: '#25D366' },
      { id: 'gb10', name: 'Sales', icon: <TrendingUp size={16} />, color: '#10B981' },
      { id: 'gb11', name: 'Conversion', icon: <MousePointer size={16} />, color: '#EC4899' },
      { id: 'gb12', name: 'Business Growth', icon: <TrendingUp size={16} />, color: '#E6007E' },
      { id: 'gb13', name: 'Strategy', icon: <Cpu size={16} />, color: '#6366F1' },
      { id: 'gb14', name: 'Consulting', icon: <Users size={16} />, color: '#0A66C2' },
      { id: 'gb15', name: 'Performance Marketing', icon: <TrendingUp size={16} />, color: '#E6007E' },
      { id: 'gb16', name: 'CRO Optimization', icon: <BarChart3 size={16} />, color: '#3B82F6' },
      { id: 'gb17', name: 'Brand Identity', icon: <Award size={16} />, color: '#F59E0B' }
    ],
    'ai-ml': [
      { id: 'aiml1', name: 'Machine Learning', icon: <Cpu size={16} />, color: '#8B5CF6' },
      { id: 'aiml2', name: 'Deep Learning', icon: <Bot size={16} />, color: '#F59E0B' },
      { id: 'aiml3', name: 'Generative AI', icon: <Sparkles size={16} />, color: '#E6007E' },
      { id: 'aiml4', name: 'LLMs & Fine-Tuning', icon: <Code size={16} />, color: '#06B6D4' },
      { id: 'aiml5', name: 'Computer Vision', icon: <Search size={16} />, color: '#10B981' },
      { id: 'aiml6', name: 'NLP & Text Analytics', icon: <MessageSquare size={16} />, color: '#3B82F6' },
      { id: 'aiml7', name: 'AI Agents & Chatbots', icon: <Bot size={16} />, color: '#EC4899' },
      { id: 'aiml8', name: 'Neural Networks', icon: <Zap size={16} />, color: '#6366F1' },
      { id: 'aiml9', name: 'Predictive Analytics', icon: <BarChart3 size={16} />, color: '#14B8A6' },
      { id: 'aiml10', name: 'AI Voice & Speech', icon: <Mic size={16} />, color: '#EA4335' },
      { id: 'aiml11', name: 'Model Deployment', icon: <Send size={16} />, color: '#0A66C2' },
      { id: 'aiml12', name: 'PyTorch & TensorFlow', icon: <Layers size={16} />, color: '#FF6F00' },
      { id: 'aiml13', name: 'Recommendation Engines', icon: <Target size={16} />, color: '#25D366' },
      { id: 'aiml14', name: 'Data Mining & Science', icon: <Database size={16} />, color: '#0088CC' }
    ],
    'devops': [
      { id: 'dops1', name: 'CI/CD Pipelines', icon: <Repeat1 size={16} />, color: '#14B8A6' },
      { id: 'dops2', name: 'Docker Containers', icon: <Cloud size={16} />, color: '#2496ED' },
      { id: 'dops3', name: 'Kubernetes Orchestration', icon: <Layers size={16} />, color: '#326CE5' },
      { id: 'dops4', name: 'AWS Cloud Services', icon: <Cloud size={16} />, color: '#FF9900' },
      { id: 'dops5', name: 'Terraform & IaC', icon: <Code size={16} />, color: '#844FBA' },
      { id: 'dops6', name: 'GitHub Actions & GitLab', icon: <Zap size={16} />, color: '#F05032' },
      { id: 'dops7', name: 'Server Monitoring', icon: <TrendingUp size={16} />, color: '#EF4444' },
      { id: 'dops8', name: 'Nginx Load Balancer', icon: <Globe size={16} />, color: '#009639' },
      { id: 'dops9', name: 'Microservices Infra', icon: <Cpu size={16} />, color: '#8B5CF6' },
      { id: 'dops10', name: 'Cyber Security Hardening', icon: <CheckCircle2 size={16} />, color: '#10B981' },
      { id: 'dops11', name: 'Automated QA & Testing', icon: <Target size={16} />, color: '#E6007E' },
      { id: 'dops12', name: 'Database Sharding & Cluster', icon: <Database size={16} />, color: '#06B6D4' },
      { id: 'dops13', name: 'ELK Log Management', icon: <FileText size={16} />, color: '#005571' },
      { id: 'dops14', name: 'Cloud Cost Optimization', icon: <BarChart3 size={16} />, color: '#F59E0B' }
    ],
    'ai-search': [
      { id: 'ais1', name: 'AI Agents', icon: <Bot size={16} />, color: '#F59E0B' },
      { id: 'ais2', name: 'Automation', icon: <Zap size={16} />, color: '#8B5CF6' },
      { id: 'ais3', name: 'CRM', icon: <Database size={16} />, color: '#6366F1' },
      { id: 'ais4', name: 'ERP', icon: <Layers size={16} />, color: '#3B82F6' },
      { id: 'ais5', name: 'WhatsApp', icon: <MessageSquare size={16} />, color: '#25D366' },
      { id: 'ais6', name: 'Chatbots', icon: <Bot size={16} />, color: '#06B6D4' },
      { id: 'ais7', name: 'Email Automation', icon: <Mail size={16} />, color: '#EA4335' },
      { id: 'ais8', name: 'Funnels', icon: <Target size={16} />, color: '#E6007E' },
      { id: 'ais9', name: 'Generative AI (GEO)', icon: <Cpu size={16} />, color: '#8B5CF6' },
      { id: 'ais10', name: 'Answer Engine (AEO)', icon: <Zap size={16} />, color: '#F59E0B' },
      { id: 'ais11', name: 'Voice & Chat AI', icon: <Bot size={16} />, color: '#10B981' }
    ],
    'ai-tools': [
      { id: 'ait1', name: 'ChatGPT & GPT-4o', icon: <Bot size={16} />, color: '#10A37F' },
      { id: 'ait2', name: 'Claude 3.5 Sonnet', icon: <Sparkles size={16} />, color: '#D97706' },
      { id: 'ait3', name: 'Midjourney & DALL-E 3', icon: <Palette size={16} />, color: '#8B5CF6' },
      { id: 'ait4', name: 'Perplexity AI Search', icon: <Search size={16} />, color: '#06B6D4' },
      { id: 'ait5', name: 'Google Gemini Pro', icon: <Cpu size={16} />, color: '#4285F4' },
      { id: 'ait6', name: 'ElevenLabs Voice AI', icon: <Mic size={16} />, color: '#EA4335' },
      { id: 'ait7', name: 'Runway & Sora Video AI', icon: <Video size={16} />, color: '#EF4444' },
      { id: 'ait8', name: 'Make.com & Zapier AI', icon: <Zap size={16} />, color: '#FF6600' },
      { id: 'ait9', name: 'LangChain & LlamaIndex', icon: <Link size={16} />, color: '#3B82F6' },
      { id: 'ait10', name: 'Autonomous AI Agents', icon: <Bot size={16} />, color: '#E6007E' },
      { id: 'ait11', name: 'Pinecone Vector DB', icon: <Database size={16} />, color: '#6366F1' },
      { id: 'ait12', name: 'GitHub Copilot Coding', icon: <Code size={16} />, color: '#0A66C2' },
      { id: 'ait13', name: 'Whisper Speech-to-Text', icon: <Radio size={16} />, color: '#F59E0B' },
      { id: 'ait14', name: 'AI Image Upscaling', icon: <Sparkles size={16} />, color: '#25D366' }
    ],
    'social-media-content': [
      { id: 'smc1', name: 'SMM', icon: <Share2 size={16} />, color: '#0A66C2' },
      { id: 'smc2', name: 'SMO', icon: <Users size={16} />, color: '#E6007E' },
      { id: 'smc3', name: 'UGC', icon: <Sparkles size={16} />, color: '#F59E0B' },
      { id: 'smc4', name: 'Reels', icon: <Video size={16} />, color: '#EF4444' },
      { id: 'smc5', name: 'Shorts', icon: <Play size={16} />, color: '#FF0000' },
      { id: 'smc6', name: 'Influencers', icon: <Megaphone size={16} />, color: '#06B6D4' },
      { id: 'smc7', name: 'Creators', icon: <Palette size={16} />, color: '#EC4899' },
      { id: 'smc8', name: 'Copywriting', icon: <MessageSquare size={16} />, color: '#10B981' },
      { id: 'smc9', name: 'Videos', icon: <Video size={16} />, color: '#6366F1' },
      { id: 'smc10', name: 'Motion Graphics', icon: <Layers size={16} />, color: '#8B5CF6' },
      { id: 'smc11', name: 'Viral Content', icon: <Sparkles size={16} />, color: '#E6007E' },
      { id: 'smc12', name: 'Community Growth', icon: <Users size={16} />, color: '#10B981' }
    ]
  };

  const filterTabs = [
    { key: 'all', label: 'All' },
    { key: 'digital-marketing', label: 'Digital Marketing' },
    { key: 'web-app-dev', label: 'Development' },
    { key: 'growth-branding', label: 'Growth & Branding' },
    { key: 'ai-ml', label: 'AI / ML' },
    { key: 'ai-tools', label: 'AI Tools & Features' },
    { key: 'devops', label: 'DevOps' },
    { key: 'ai-search', label: 'AI & Search' },
    { key: 'social-media-content', label: 'Social Media & Content' }
  ];

  const currentCapabilities = activeTab === 'all' 
    ? allCapabilities 
    : (categoryData[activeTab] || []);

  // Mobile 5-card batch sequential animation state
  const [mobileBatchIndex, setMobileBatchIndex] = useState(0);
  const [mobileAnimStage, setMobileAnimStage] = useState('enter'); // 'enter' | 'blink' | 'exit'

  // Continuous globe rotation angle update for desktop isometric tilt
  useEffect(() => {
    let animId;
    let angle = 0;
    const rotate = () => {
      angle = (angle + 0.6) % 360;
      setGlobeRotation(angle);
      animId = requestAnimationFrame(rotate);
    };
    animId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Random blinking popup animation interval for Desktop
  useEffect(() => {
    if (currentCapabilities.length === 0) return;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * currentCapabilities.length);
      setBlinkingIndex(randomIndex);
    }, 700);

    return () => clearInterval(interval);
  }, [currentCapabilities.length, activeTab]);

  // Mobile 5-Card Batch Cycle: Enter (0.6s) -> Blink 2x (1.4s) -> Exit Left (0.6s) -> Next Batch
  useEffect(() => {
    if (currentCapabilities.length === 0) return;

    let timer1, timer2, timer3;

    // Reset to stage 1: Enter
    setMobileAnimStage('enter');

    // Stage 2: Blink 2x after enter animation completes (0.6s)
    timer1 = setTimeout(() => {
      setMobileAnimStage('blink');
    }, 600);

    // Stage 3: Exit left after 2 blinks (1.4s)
    timer2 = setTimeout(() => {
      setMobileAnimStage('exit');
    }, 2000);

    // Stage 4: Advance to next 5-card batch after exit (0.6s)
    timer3 = setTimeout(() => {
      setMobileBatchIndex((prev) => {
        const next = prev + 5;
        return next >= currentCapabilities.length ? 0 : next;
      });
      setMobileAnimStage('enter');
    }, 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [mobileBatchIndex, currentCapabilities.length, activeTab]);

  // Reset mobile batch index when active tab changes
  useEffect(() => {
    setMobileBatchIndex(0);
    setMobileAnimStage('enter');
  }, [activeTab]);

  // Cursor tracking 3D tilt calculation
  const handleMouseMove = (e) => {
    if (window.innerWidth <= 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 22;
    const rotateY = ((x - centerX) / centerX) * -22;

    setTiltStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(0deg)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    if (window.innerWidth <= 768) {
      setTiltStyle({});
      return;
    }
    setTiltStyle({
      transform: `rotateX(24deg) rotateY(-12deg) rotateZ(4deg)`,
      transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
    });
  };

  return (
    <section className="what-we-work-section" id="what-we-do">
      {/* Ambient Glow Orbs */}
      <div className="www-orb orb-1"></div>
      <div className="www-orb orb-2"></div>

      <div className="www-container">

        {/* Header */}
        <div className="www-header">
          <div className="www-pill">
            <span>OUR CORE CAPABILITIES</span>
          </div>
          <h2 className="www-title">
            WHAT <span className="highlight-pink">WE WORK ON</span>
          </h2>
        </div>

        {/* Filter Navigation Tabs Slider */}
        <div className="www-filter-slider-container">
          <div className="www-filter-tabs">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                className={`www-filter-btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.key);
                  setBlinkingIndex(null);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Interactive 3D Grid & Globe Sphere */}
        <div
          className="capabilities-all-grid"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={tiltStyle}
        >
          {/* Fixed 100% Perfect Round Core Sphere Ball (Mobile View Only) */}
          <div className="globe-core-ball"></div>

          {/* Inner 3D Sphere Globe World */}
          <div 
            className="globe-3d-world"
            style={{
              '--globe-rot': `${globeRotation}deg`
            }}
          >
            {/* Cards Attached Flat on Globe Surface (Desktop) & Sequential Wave Batches (Mobile) */}
            {currentCapabilities.map((item, idx) => {
              const isBlinking = blinkingIndex === idx;
              const isSelected = selectedId === item.id;
              const total = currentCapabilities.length;

              // Golden Ratio Fibonacci Spiral distribution for Desktop Isometric Grid
              const goldenRatio = (1 + Math.sqrt(5)) / 2;
              const yVal = 1 - (2 * idx + 1) / total;

              const theta = 2 * Math.PI * idx / goldenRatio;
              const phi = Math.asin(yVal); // Latitude angle -90 to +90 deg

              const rotY = (theta * (180 / Math.PI)) % 360;
              const rotX = phi * (180 / Math.PI);

              // Mobile batch 5-card check
              const mobileSlotIndex = idx - mobileBatchIndex;
              const isMobileActive = mobileSlotIndex >= 0 && mobileSlotIndex < 5;

              return (
                <div
                  key={item.id}
                  className={`compact-cap-card ${isBlinking ? 'is-blinking' : ''} ${isSelected ? 'is-selected' : ''} ${isMobileActive ? `mobile-active mobile-stage-${mobileAnimStage}` : ''}`}
                  onClick={() => setSelectedId(item.id === selectedId ? null : item.id)}
                  style={{
                    '--item-color': item.color,
                    '--rot-y': `${rotY}deg`,
                    '--rot-x': `${rotX}deg`,
                    '--slot-idx': mobileSlotIndex,
                    '--enter-from': mobileSlotIndex % 2 === 0 ? '-120px' : '120px'
                  }}
                >
                  <div className="compact-card-content">
                    <div
                      className="compact-icon-box"
                      style={{
                        color: item.color,
                        backgroundColor: `${item.color}15`,
                        borderColor: `${item.color}35`
                      }}
                    >
                      {item.icon}
                    </div>
                    <span className="compact-name-text">{item.name}</span>
                    <CheckCircle2 size={15} className="compact-check-icon" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
