import React from 'react';
import CardGridPage from '../../components/Common/CardGridPage';

export const galleryItems = [
  { id: 1, category: 'Team & Events', image: '/gallery/2025-01-25.webp' },
  { id: 2, category: 'Office Life', image: '/gallery/2025-09-03.webp' },
  { id: 3, category: 'Awards & Moments', image: '/gallery/IMG_7951-2048x1536.webp' },
  { id: 4, category: 'Workshops', image: '/gallery/IMG_8300-1-2048x1536.webp' },
  { id: 5, category: 'Projects', image: '/gallery/Image-1-2048x1536.webp' },
  { id: 6, category: 'Team & Events', image: '/gallery/WhatsApp-Image-2025-11-25-at-5.44.23-PM.webp' },
  { id: 7, category: 'Team & Events', image: '/about-founder-team.jpg' },
  { id: 8, category: 'Office Life', image: '/about-office.png' },
  { id: 9, category: 'Awards & Moments', image: '/image2.webp' },
  { id: 10, category: 'Workshops', image: '/IMG_1480-scaled.webp' },
  { id: 11, category: 'Projects', image: '/IMG_1485-scaled.webp' },
  { id: 12, category: 'Team & Events', image: '/IMG_1482-scaled.webp' },
  { id: 13, category: 'Office Life', image: '/image3.webp' },
  { id: 14, category: 'Projects', image: '/IMG_1484-scaled.webp' }
];

import { useData } from '../../context/DataContext';

export default function GalleryPage() {
  const { gallery, isBackendOnline } = useData();
  const displayItems = gallery && gallery.length > 0 ? gallery : galleryItems;
  const categories = ['All', 'Team & Events', 'Office Life', 'Awards & Moments', 'Projects', 'Workshops'];

  return (
    <CardGridPage
      type="gallery"
      badge="DIGITAL ORRA MEDIA"
      title={<>Our Brand Gallery & <br className="mobile-title-br" />Moments</>}
      subtitle="Behind the scenes, team events, client milestones, and agency life at Digital ORRA."
      categories={categories}
      items={displayItems}
      showSearch={false}
    />
  );
}
