import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', style }) => {
  return (
    <div 
      className={`
        bg-glass-bg
        border border-glass-border
        backdrop-blur-md
        rounded-radius-lg
        shadow-glass-shadow
        transition-all duration-300
        hover:shadow-lg
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  );
};