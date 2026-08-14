import React, { useMemo } from 'react';
import CardGridPage from '../../components/Common/CardGridPage';

export const blogPosts = [
  {
    id: 1,
    title: 'Top Performance Marketing Strategies for D2C Brands in 2026',
    category: 'Performance Marketing',
    author: 'Digital ORRA Team',
    date: 'Aug 02, 2026',
    readTime: '5 min read',
    image: '/image1.webp',
    excerpt: 'Discover how top D2C brands scale revenue using multi-channel paid ads, hyper-targeted creative funnels, and data attribution.'
  },
  {
    id: 2,
    title: 'Featured Case Study: How Digital ORRA Scales Brands to 10x ROI',
    category: 'Video Breakdown',
    author: 'Agency Spotlight',
    date: 'Aug 01, 2026',
    readTime: '6 min watch',
    image: '/hero-model.jpg',
    excerpt: 'Watch our full video breakdown on how we engineer high-converting video campaigns and scale client revenues.',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=8NPyv5Am6Mo'
  },
  {
    id: 3,
    title: 'Generative Engine Optimization (GEO): The Future of AI Search',
    category: 'SEO & GEO',
    author: 'AI Growth Lab',
    date: 'Jul 28, 2026',
    readTime: '6 min read',
    image: '/IMG_1482-scaled.webp',
    excerpt: 'Learn how to optimize your digital content to rank on ChatGPT, SearchGPT, and Perplexity AI search results.'
  },
  {
    id: 4,
    title: 'How High-Converting Landing Pages Boost Ad Conversion by 300%',
    category: 'Web Development',
    author: 'Tech & Design Team',
    date: 'Jul 20, 2026',
    readTime: '4 min read',
    image: '/IMG_1485-scaled.webp',
    excerpt: 'Key UI/UX frameworks, speed optimization tactics, and psychological triggers that turn casual visitors into paying customers.'
  },
  {
    id: 5,
    title: 'Social Media Viral Hooks: Crafting Short-Form Reels That Convert',
    category: 'Social Media',
    author: 'Content Studio',
    date: 'Jul 15, 2026',
    readTime: '4 min read',
    image: '/IMG_1480-scaled.webp',
    excerpt: 'A complete breakdown of viral video script writing, hook timing, and UGC strategies for Instagram & YouTube Shorts.'
  },
  {
    id: 6,
    title: 'Video Ad Creatives Masterclass: Scripting & High ROAS Production',
    category: 'Video Marketing',
    author: 'Media Lab',
    date: 'Jul 10, 2026',
    readTime: '8 min watch',
    image: '/about-office.png',
    excerpt: 'Video masterclass detailing how to shoot, edit, and optimize performance ad videos for maximum CTR and lower CPA.',
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=8NPyv5Am6Mo'
  },
  {
    id: 7,
    title: 'Google PPC vs Meta Ads: Which Channel Offers Better ROAS?',
    category: 'Performance Marketing',
    author: 'Media Buyers Team',
    date: 'Jul 08, 2026',
    readTime: '7 min read',
    image: '/image2.webp',
    excerpt: 'Compare cost-per-click, buyer intent, and conversion rates to decide where to allocate your ad budget.'
  },
  {
    id: 8,
    title: '10 Essential SEO Audits to Outrank Competitors in 2026',
    category: 'SEO & GEO',
    author: 'SEO Team',
    date: 'Jun 30, 2026',
    readTime: '5 min read',
    image: '/image4.webp',
    excerpt: 'From Core Web Vitals to semantic keyword clusters — step-by-step audit tips for instant search traffic growth.'
  }
];

import { useData } from '../../context/DataContext';

export default function BlogPage() {
  const { blog } = useData();
  
  const categories = useMemo(() => {
    if (!blog || blog.length === 0) return ['All Posts'];
    const uniqueCategories = new Set(
      blog
        .map(item => item.category)
        .filter(cat => cat && typeof cat === 'string' && cat.trim() !== '')
    );
    return ['All Posts', ...Array.from(uniqueCategories).sort()];
  }, [blog]);

  return (
    <CardGridPage
      type="blog"
      badge="DIGITAL ORRA INSIGHTS"
      title="Latest Marketing & Growth Blogs"
      subtitle="Stay updated with actionable insights, AI marketing trends, video case studies, and performance strategies."
      categories={categories}
      items={[...blog].sort((a, b) => new Date(b.date) - new Date(a.date))}
      showSearch={true}
    />
  );
}
