import React from 'react';
import CardGridPage from '../Common/CardGridPage';

export const portfolioItems = [
  {
    id: 1,
    title: 'Real Estate Lead Generation Campaign',
    category: 'Lead Gen',
    client: 'Property Surge',
    image: '/portfolio/15.webp',
    description: 'Targeted high-intent Meta lead generation campaigns for real estate buyers.',
    tags: ['Meta Lead Ads', 'High Intent Leads'],
    link: '#'
  },
  {
    id: 2,
    title: 'Gym & Fitness Studio Growth Blueprint',
    category: 'Local Business',
    client: 'PowerFit Gym',
    image: '/portfolio/16.webp',
    description: 'Hyper-local ad campaigns and membership conversion funnels.',
    tags: ['Local Ads', 'Membership Sales'],
    link: '#'
  },
  {
    id: 3,
    title: 'Social Media Management & Creative Reel Design',
    category: 'Social Media',
    client: 'Digital ORRA Creative Studio',
    image: '/portfolio/6.webp',
    description: 'Scroll-stopping Instagram reels, carousels, and community engagement.',
    tags: ['Viral Reels', 'Brand Grid'],
    link: '#'
  },
  {
    id: 4,
    title: 'E-Commerce Fashion Store Revenue Scaling',
    category: 'E-Commerce',
    client: 'Aura Threads',
    image: '/portfolio/8.webp',
    description: 'Full-funnel D2C media buying achieving peak 5.8x ROAS.',
    tags: ['ROAS 5.8x', 'D2C Scaling'],
    link: '#'
  },
  {
    id: 5,
    title: 'Corporate Client Testimonial & Case Study Shoot',
    category: 'Branding',
    client: 'Tech Global',
    image: '/portfolio/15 (1).webp',
    description: '4K video production, client proof interviews, and corporate story films.',
    tags: ['Video Shoot', 'Client Proof'],
    link: '#'
  },
  {
    id: 6,
    title: 'Educational Academy Admissions & Lead Campaign',
    category: 'Education',
    client: 'Apex Coaching',
    image: '/portfolio/WhatsApp-Image-2026-01-20-at-4.59.58-PM.webp',
    description: 'Student admissions campaigns and high-converting Google Search ads.',
    tags: ['Google Search', 'Admissions'],
    link: '#'
  },
  {
    id: 7,
    title: 'Google PPC Search & Performance Max Campaign',
    category: 'Paid Ads',
    client: 'Fintech Surge',
    image: '/portfolio/WhatsApp-Image-2026-01-20-at-4.59.58-PM-1.webp',
    description: 'High-ROAS Google Ads search and PMax campaigns.',
    tags: ['Google Ads', 'PMax'],
    link: '#'
  },
  {
    id: 8,
    title: 'WhatsApp Business API & AI Automation Workflow',
    category: 'Automation',
    client: 'Enterprise Client',
    image: '/portfolio/WhatsApp-Image-2026-01-20-at-4.59.59-PM-1.webp',
    description: 'Automated broadcast messaging, AI chatbot triggers, and sales funnels.',
    tags: ['WhatsApp API', 'AI Chatbot'],
    link: '#'
  }
];

import { useData } from '../../context/DataContext';

export default function PortfolioSection() {
  const { portfolio } = useData();
  const categories = ['All', 'Digital Marketing', 'Website Design', 'Logo Design', 'Google/Meta Ads'];

  return (
    <CardGridPage
      id="portfolio"
      type="portfolio"
      badge="OUR PORTFOLIO"
      title="Featured Works & Success Stories"
      subtitle="Explore how we help ambitious brands transform their digital presence and achieve scalable, revenue-driven results."
      categories={categories}
      items={portfolio}
      showSearch={false}
    />
  );
}
