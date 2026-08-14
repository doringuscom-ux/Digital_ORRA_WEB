import React, { useState, useEffect, useRef } from 'react';
import './ScrollRowAnimateCard.css';

/**
 * ScrollRowAnimateCard Component
 * Wraps cards and animates them as user scrolls into view.
 * Odd rows (0, 2, 4...) slide in from the RIGHT.
 * Even rows (1, 3, 5...) slide in from the LEFT.
 */
export default function ScrollRowAnimateCard({
  index = 0,
  itemsPerRow = 3,
  className = '',
  children,
  onClick,
  style = {},
  ...restProps
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  const rowIndex = Math.floor(index / itemsPerRow);
  const isRightSlide = rowIndex % 2 === 0; // Row 1, 3, 5... slide from right
  const colIndex = index % itemsPerRow;
  const staggerDelay = colIndex * 0.12; // 120ms cascade delay per column

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const slideClass = isRightSlide ? 'slide-from-right' : 'slide-from-left';
  const visibleClass = isVisible ? 'is-visible' : '';

  return (
    <div
      ref={cardRef}
      className={`scroll-row-card ${slideClass} ${visibleClass} ${className}`}
      onClick={onClick}
      style={{
        ...style,
        transitionDelay: isVisible ? `${staggerDelay}s` : '0s'
      }}
      {...restProps}
    >
      {children}
    </div>
  );
}
