import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Laptop, 
  Target, 
  Search, 
  Palette, 
  Video, 
  Share2, 
  Globe, 
  Code, 
  Cpu, 
  Megaphone, 
  Zap, 
  Layers, 
  Sparkles,
  Brain
} from 'lucide-react';

export const ICON_MAP = {
  TrendingUp,
  Award,
  Laptop,
  Target,
  Search,
  Palette,
  Video,
  Share2,
  Globe,
  Code,
  Cpu,
  Megaphone,
  Zap,
  Layers,
  Sparkles,
  Brain
};

export const COLOR_THEMES = {
  pink: { label: 'Pink Glow', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.18)', border: 'rgba(236, 72, 153, 0.4)', glow: '0 0 16px rgba(236, 72, 153, 0.35)' },
  purple: { label: 'Purple Glow', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.18)', border: 'rgba(168, 85, 247, 0.4)', glow: '0 0 16px rgba(168, 85, 247, 0.35)' },
  cyan: { label: 'Cyan Glow', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.18)', border: 'rgba(6, 182, 212, 0.4)', glow: '0 0 16px rgba(6, 182, 212, 0.35)' },
  amber: { label: 'Amber Gold', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.18)', border: 'rgba(245, 158, 11, 0.4)', glow: '0 0 16px rgba(245, 158, 11, 0.35)' },
  emerald: { label: 'Emerald Green', color: '#10b981', bg: 'rgba(16, 185, 129, 0.18)', border: 'rgba(16, 185, 129, 0.4)', glow: '0 0 16px rgba(16, 185, 129, 0.35)' },
  blue: { label: 'Royal Blue', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.18)', border: 'rgba(59, 130, 246, 0.4)', glow: '0 0 16px rgba(59, 130, 246, 0.35)' },
  red: { label: 'Crimson Red', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.18)', border: 'rgba(239, 68, 68, 0.4)', glow: '0 0 16px rgba(239, 68, 68, 0.35)' }
};

export function RenderColorfulCourseIcon({ iconName = 'TrendingUp', iconColor = 'pink', size = 24 }) {
  const IconComponent = ICON_MAP[iconName] || TrendingUp;
  const theme = COLOR_THEMES[iconColor] || COLOR_THEMES.pink;

  return (
    <div 
      className="colorful-course-icon-badge"
      style={{ 
        backgroundColor: theme.bg, 
        borderColor: theme.border, 
        boxShadow: theme.glow,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        borderRadius: '12px',
        border: `1px solid ${theme.border}`,
        transition: 'all 0.3s ease'
      }}
    >
      <IconComponent size={size} color={theme.color} />
    </div>
  );
}
