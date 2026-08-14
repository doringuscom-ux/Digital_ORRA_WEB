import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight, Tag, Search, ExternalLink, Eye, X, Play, Video, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollRowAnimateCard from './ScrollRowAnimateCard';
import ServerErrorNotice from './ServerErrorNotice';
import { useData } from '../../context/DataContext';
import './CardGridPage.css';

// Helper to interleave items round-robin across categories
const mixItemsByCategory = (itemList) => {
  if (!itemList || itemList.length === 0) return [];
  const groups = {};
  itemList.forEach(item => {
    const cat = item.category || item.categoryLabel || 'General';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  });
  const categoryKeys = Object.keys(groups);
  const mixed = [];
  let maxLen = 0;
  categoryKeys.forEach(k => {
    if (groups[k].length > maxLen) maxLen = groups[k].length;
  });
  for (let i = 0; i < maxLen; i++) {
    for (const key of categoryKeys) {
      if (groups[key][i]) mixed.push(groups[key][i]);
    }
  }
  return mixed;
};

/**
 * Universal Card Grid Component used for Blog, Gallery, and Portfolio pages.
 * Pass title, subtitle, badge, categories, and items as props to customize content.
 */
export default function CardGridPage({
  id,
  badge = 'MEDIA & INSIGHTS',
  title = 'Featured Content',
  subtitle = 'Explore our latest updates, insights, and media showcase.',
  type = 'blog', // 'blog' | 'gallery' | 'portfolio'
  categories = ['All'],
  items = [],
  showSearch = true
}) {
  const navigate = useNavigate();
  const { isBackendOnline } = useData() || {};
  const [selectedCategory, setSelectedCategory] = useState(categories && categories[0] ? categories[0] : 'All');
  const [searchTerm, setSearchTerm] = useState('');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Reset pagination count on category change or search term change
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory, searchTerm]);

  const handleCardClick = (item) => {
    if (item.link && (item.link.startsWith('http://') || item.link.startsWith('https://'))) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
      return;
    }
    if (type === 'gallery' || type === 'portfolio') {
      setLightboxItem(item);
    } else if (type === 'blog') {
      if (item.isVideo && item.videoUrl) {
        setActiveVideoUrl(item.videoUrl);
      } else {
        const path = (item.link && item.link.startsWith('/blog/')) 
          ? item.link.replace('/blog/', '/') 
          : (item.slug ? `/${item.slug}` : (item.link || (item.title ? `/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}` : '')));
        if (path) {
          navigate(path);
        }
      }
    }
  };
  // Filter items by category & search term
  const rawFilteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || selectedCategory === 'All Posts' || item.category === selectedCategory || item.categoryLabel === selectedCategory;
    const matchesSearch = !searchTerm ||
      (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.client && item.client.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredItems = (selectedCategory === 'All' || selectedCategory === 'All Posts') && !searchTerm
    ? mixItemsByCategory(rawFilteredItems)
    : rawFilteredItems;

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    if (!lightboxItem || filteredItems.length === 0) return;
    const currIdx = filteredItems.findIndex(i => (i.id && lightboxItem.id ? i.id === lightboxItem.id : (i.image || i.img) === (lightboxItem.image || lightboxItem.img)));
    const prevIdx = (currIdx - 1 + filteredItems.length) % filteredItems.length;
    setLightboxItem(filteredItems[prevIdx]);
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    if (!lightboxItem || filteredItems.length === 0) return;
    const currIdx = filteredItems.findIndex(i => (i.id && lightboxItem.id ? i.id === lightboxItem.id : (i.image || i.img) === (lightboxItem.image || lightboxItem.img)));
    const nextIdx = (currIdx + 1) % filteredItems.length;
    setLightboxItem(filteredItems[nextIdx]);
  };

  const displayedItems = filteredItems.slice(0, visibleCount);

  return (
    <div className={`card-grid-page page-type-${type}`} id={id}>
      {/* Hero Banner Section */}
      <section className="cg-hero">
        <div className="cg-hero-container">
          <span className="cg-pill-badge">{badge}</span>
          <h1 className="cg-hero-title">{title}</h1>
          <p className="cg-hero-sub">{subtitle}</p>

          {showSearch && (
            <div className="cg-search-box">
              <Search size={18} className="cg-search-icon" />
              <input
                type="text"
                placeholder={`Search ${type}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>
      </section>

      {/* Main Grid Content Section */}
      <section className="cg-content-section">
        <div className="cg-container">

          {!isBackendOnline ? (
            <ServerErrorNotice 
              title={`Server Error: ${type.toUpperCase()} Unavailable`}
              message={`Unable to load ${type} content because the backend server is offline. Please start the backend server.`}
            />
          ) : (
            <>
              {/* Category Filter Bar */}
              {categories && categories.length > 1 && (
                <div className="cg-categories-bar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`cg-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {/* Cards Grid */}
              <div className={`cg-cards-grid grid-${type}`}>
            {displayedItems.map((item, idx) => (
              <ScrollRowAnimateCard
                key={item.id}
                index={idx}
                itemsPerRow={3}
                className={`cg-card type-${type}`}
                onClick={() => handleCardClick(item)}
              >
                {/* Image Container */}
                <div className="cg-card-img-wrap">
                  <img 
                    src={item.image} 
                    alt={item.title || 'Portfolio Image'} 
                    className={`cg-card-img ${item.category === 'Logo Design' || (item.image && item.image.includes('port_logo')) ? 'is-logo-img' : ''}`} 
                  />

                  {/* Category Pill (Non-portfolio) */}
                  {type !== 'portfolio' && (
                    <span className="cg-card-cat-badge">
                      {item.categoryLabel || item.category}
                    </span>
                  )}

                  {/* Media Type Badge (Video vs Article) */}
                  {item.isVideo && (
                    <span className="cg-media-type-badge">
                      <Video size={12} /> Video
                    </span>
                  )}

                  {/* Play Button Overlay for Video Blogs */}
                  {item.isVideo && (
                    <div className="cg-card-overlay is-video-overlay" onClick={() => setActiveVideoUrl(item.videoUrl)}>
                      <div className="cg-play-icon-box">
                        <Play size={22} fill="currentColor" />
                      </div>
                    </div>
                  )}

                  {/* Overlay for Gallery / Portfolio */}
                  {type === 'gallery' && !item.isVideo && (
                    <div className="cg-card-overlay">
                      <div className="cg-overlay-icon">
                        <Eye size={24} />
                      </div>
                    </div>
                  )}

                  {type === 'portfolio' && item.link && (
                    <div className="cg-card-overlay">
                      <a href={item.link} className="cg-overlay-btn" aria-label="View Project" target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={22} />
                      </a>
                    </div>
                  )}
                </div>

                {/* Card Body - Rendered for Blog Only (Gallery & Portfolio are Pure Picture Cards) */}
                {type === 'blog' && (
                  <div className="cg-card-body">
                    {/* BLOG META ROW */}
                    {type === 'blog' && (
                      <div className="cg-meta-row">
                        {item.date && <span className="cg-meta-item"><Calendar size={13} /> {item.date}</span>}
                        {item.readTime && <span className="cg-meta-item"><Clock size={13} /> {item.readTime}</span>}
                      </div>
                    )}

                    {type === 'gallery' && item.date && (
                      <span className="cg-date-label">{item.date}</span>
                    )}

                    {/* Title */}
                    <h3 className="cg-card-title">{item.title}</h3>

                    {/* Excerpt / Description (Hidden as per user request) */}
                    {/* <p className="cg-card-desc">
                      {item.excerpt || item.description}
                    </p> */}

                    {/* BLOG FOOTER */}
                    {type === 'blog' && (
                      <div className="cg-card-footer">
                        {item.author && <span className="cg-author-label"><User size={13} /> {item.author}</span>}
                        <button className="cg-read-more-btn">
                          <span>Read More</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </ScrollRowAnimateCard>
            ))}
          </div>

          {/* View More Button (Adds 3 Cards Repeat) */}
          {visibleCount < filteredItems.length && (
            <div className="cg-view-more-wrap">
              <button
                type="button"
                className="cg-view-more-btn"
                onClick={() => setVisibleCount((prev) => prev + 3)}
              >
                <span>
                  {type === 'portfolio' ? 'VIEW MORE PROJECTS' : type === 'gallery' ? 'VIEW MORE PHOTOS' : 'VIEW MORE POSTS'}
                </span>
                <ChevronDown size={18} className="view-more-icon" />
              </button>
            </div>
          )}
            </>
          )}

        </div>
      </section>

      {/* IMAGE LIGHTBOX POPUP MODAL */}
      {lightboxItem && (
        <div className="cg-lightbox-backdrop" onClick={() => setLightboxItem(null)}>
          <div className="cg-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cg-lightbox-close" onClick={() => setLightboxItem(null)} title="Close">
              <X size={22} />
            </button>

            {filteredItems.length > 1 && (
              <>
                <button className="cg-lightbox-nav prev" onClick={handlePrevImage} title="Previous Image">
                  <ChevronLeft size={28} />
                </button>
                <button className="cg-lightbox-nav next" onClick={handleNextImage} title="Next Image">
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <div className="cg-lightbox-img-box">
              <img
                src={lightboxItem.image || lightboxItem.img}
                alt={lightboxItem.title || 'Full View'}
                className="cg-lightbox-img"
              />
            </div>
            {lightboxItem.title && (
              <div className="cg-lightbox-meta">
                <span className="cg-lightbox-cat">{lightboxItem.category || 'Media Showcase'}</span>
                <h3 className="cg-lightbox-title">{lightboxItem.title}</h3>
                {lightboxItem.description && <p className="cg-lightbox-desc">{lightboxItem.description}</p>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIDEO MODAL POPUP */}
      {activeVideoUrl && (
        <div className="cg-lightbox-backdrop" onClick={() => setActiveVideoUrl(null)}>
          <div className="cg-lightbox-modal video-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="cg-lightbox-close" onClick={() => setActiveVideoUrl(null)}>
              <X size={24} />
            </button>
            <div className="cg-video-embed-wrap">
              <iframe
                className="cg-video-iframe"
                src={activeVideoUrl.includes('embed') ? activeVideoUrl : `https://www.youtube.com/embed/${activeVideoUrl.split('v=')[1] || '8NPyv5Am6Mo'}?autoplay=1&rel=0`}
                title="Blog Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
