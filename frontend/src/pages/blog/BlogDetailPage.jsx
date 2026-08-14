import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Tag,
  Share2,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Target,
  PieChart,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import NotFoundPage from '../not-found/NotFoundPage';
import './BlogDetailPage.css';

export default function BlogDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug: paramSlug, articleId } = useParams();
  const { blog } = useData();

  // Extract slug from current path if param is missing
  const currentPathSlug = location.pathname.replace(/^\/|\/$/g, '').replace(/^blog\//, '');

  // Find matching article dynamically from backend/context data
  const article = blog.find(b => {
    const bSlug = b.slug || (b.title ? b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '');
    const bLinkClean = b.link ? b.link.replace(/^\/|\/$/g, '').replace(/^blog\//, '') : '';
    const cleanParamSlug = paramSlug ? paramSlug.replace(/^blog\//, '') : '';
    return String(b.id) === String(articleId) || bSlug === cleanParamSlug || bSlug === currentPathSlug || bLinkClean === currentPathSlug;
  }) || (currentPathSlug.includes('baddi') ? blog.find(b => b.slug === 'graphic-designing-company-in-baddi') : null);

  const title = article?.title || 'The Digital Marketing Budget Every Growing Business Should Plan in 2026';
  const category = article?.category || 'Digital Marketing';
  const author = article?.author || 'Media Buyers Team';
  const date = article?.date || 'June 29, 2026';
  const readTime = article?.readTime || '6 min read';
  const image = article?.image || '/Digital-Marketing-Budget.webp';
  const excerpt = article?.excerpt || 'A comprehensive guide on how to calculate, allocate, and scale your marketing budget across SEO, Meta Ads, Google PPC, and web optimization for peak ROAS.';
  const content = article?.content;

  // Get 4 most recent articles (excluding current viewing article)
  const recentArticles = useMemo(() => {
    const others = blog.filter(b => String(b.id) !== String(article?.id));
    const sorted = [...others].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sorted.slice(0, 4);
  }, [article?.id, blog]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${title} | Digital ORRA Blog`;
    return () => {
      document.title = 'Digital ORRA | #1 Performance Marketing & Digital Growth Agency';
    };
  }, [title]);

  // If blog data is loaded and slug does not exist, show 404 Not Found
  // MUST BE PLACED AFTER ALL HOOKS
  if (!article && blog.length > 0) {
    return <NotFoundPage />;
  }

  const budgetAllocations = [
    { channel: 'Search Engine Optimization (SEO)', percent: '25 – 35%', desc: 'Long-term organic search traffic, keyword ranking, and local search dominance.' },
    { channel: 'Google Ads (PPC)', percent: '20 – 30%', desc: 'High-intent search capture, instant leads, PMax, and keyword buyer targeting.' },
    { channel: 'Social Media Marketing (Meta)', percent: '15 – 20%', desc: 'Instagram Reels, Facebook Feed Ads, brand building, and community retargeting.' },
    { channel: 'Content Marketing & UGC', percent: '10 – 20%', desc: 'Authority blogs, video shoots, customer case studies, and lead magnets.' },
    { channel: 'Website & UX Improvements', percent: '10 – 15%', desc: 'Page speed tuning, landing page optimization, and conversion rate optimization.' },
    { channel: 'Email Marketing & CRM Automation', percent: '5 – 10%', desc: 'Automated lead nurturing, repeat buyer retention, and broadcast newsletters.' }
  ];

  return (
    <div className="blog-detail-wrapper">

      {/* Top Breadcrumb & Hero Header */}
      <div className="blog-detail-hero">
        <div className="blog-detail-container">

          <button onClick={() => navigate('/blog')} className="blog-back-btn">
            <ArrowLeft size={16} /> <span>Back to Blogs</span>
          </button>

          <div className="blog-detail-meta-top">
            <span className="blog-cat-badge">{category}</span>
            <span className="blog-meta-item"><Calendar size={14} /> {date}</span>
            <span className="blog-meta-item"><Clock size={14} /> {readTime}</span>
            <span className="blog-meta-item"><User size={14} /> {author}</span>
          </div>

          <h1 className="blog-detail-title">{title}</h1>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="blog-detail-container blog-content-grid">

        {/* Main Article Content */}
        <article className="blog-article-main">

          {/* Featured Image */}
          <div className="blog-featured-img-box">
            <img src={image} alt={title} className="blog-featured-img" />
          </div>

          {/* Excerpt (Moved below image) */}
          <p className="blog-detail-subtitle" style={{ marginTop: '20px', marginBottom: '30px', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            {excerpt}
          </p>

          {content ? (
            /* Render Dynamic Admin Content */
            <div className="blog-dynamic-content" dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            /* Clean Excerpt & Dynamic Paragraph Fallback */
            <div className="blog-dynamic-content">
              <p className="blog-p">{excerpt}</p>
            </div>
          )}

          {/* CTA Box */}
          <div className="blog-cta-box">
            <h3>Need Help Structuring Your Digital Marketing Strategy?</h3>
            <p>Our media buying specialists at Digital ORRA audit your unit economics and map out a custom ROAS growth blueprint for your business.</p>
            <Link to="/contact-us" className="blog-cta-btn">
              <span>GET FREE MARKETING AUDIT</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="blog-nav-footer">
            <Link to="/20-free-digital-marketing-tools" className="blog-nav-prev">
              <ArrowLeft size={16} />
              <div>
                <span className="nav-label">Previous Post</span>
                <span className="nav-title">Top 20 Free Digital Marketing Tools</span>
              </div>
            </Link>

            <Link to="/landing-page-vs-homepage" className="blog-nav-next">
              <div>
                <span className="nav-label">Next Post</span>
                <span className="nav-title">Landing Page vs Homepage Differences</span>
              </div>
              <ArrowRight size={16} />
            </Link>
          </div>

        </article>

        {/* Sidebar Widgets */}
        <aside className="blog-sidebar">

          {/* Recent Articles Widget */}
          <div className="sidebar-widget recent-widget">
            <h3>Recent Articles</h3>
            <div className="recent-posts-list">
              {recentArticles.map(post => {
                const pSlug = post.slug || (post.title ? post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '');
                const postUrl = (post.link && post.link.startsWith('/blog/'))
                  ? post.link.replace('/blog/', '/')
                  : `/${pSlug}`;
                return (
                  <div key={post.id} className="recent-post-item" onClick={() => navigate(postUrl)}>
                    <img src={post.image || '/image1.webp'} alt={post.title} className="recent-post-img" />
                    <div className="recent-post-info">
                      <span className="recent-post-date">{post.date}</span>
                      <h5 className="recent-post-title">{post.title}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Lead Consultation Box Widget */}
          <div className="sidebar-widget consultation-widget">
            <h3>Book Free Consultation</h3>
            <p>Speak directly with our performance growth specialist for a 1-on-1 strategy audit.</p>
            <Link to="/contact-us" className="sidebar-btn pink-gradient">
              <span>Book Audit Call</span> <ArrowRight size={14} />
            </Link>
          </div>

          {/* Categories Widget */}
          <div className="sidebar-widget categories-widget">
            <h3>Categories</h3>
            <ul className="sidebar-cat-list">
              {['Digital Marketing', 'Graphics Designing & Video Design', 'SEO', 'Social Media', 'Web Designing'].map(cat => (
                <li key={cat} onClick={() => navigate('/blog')}>
                  <span>{cat}</span>
                  <ArrowRight size={13} />
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Topics Tag Widget */}
          <div className="sidebar-widget tags-widget">
            <h3>Popular Topics</h3>
            <div className="sidebar-tags">
              <span className="stag">Performance Marketing</span>
              <span className="stag">Meta Ads</span>
              <span className="stag">Google PPC</span>
              <span className="stag">SEO 2026</span>
              <span className="stag">Web Development</span>
              <span className="stag">ROAS Scaling</span>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}
