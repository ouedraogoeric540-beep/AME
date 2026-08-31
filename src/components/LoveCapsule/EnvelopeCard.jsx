import React, { useState } from 'react';
import { Mail, Heart, Sparkles, Sun, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

const iconMap = {
  Sun,
  Heart,
  Sparkles,
  Compass
};

export default function EnvelopeCard({ capsule, onOpen }) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconMap[capsule.icon] || Mail;

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 50,
      origin: { x, y },
      colors: ['#ff3366', '#ec4899', '#fbcfe8', '#ffd1dc']
    });

    onOpen(capsule);
  };

  return (
    <div
      onClick={handleClick}
      className="glass-card envelope-box"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '20px 18px',
        position: 'relative',
        cursor: 'pointer',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 246, 248, 0.88))',
        border: '1px solid rgba(254, 205, 219, 0.9)',
        boxShadow: isHovered 
          ? '0 16px 36px -8px rgba(244, 63, 94, 0.22)' 
          : '0 8px 24px -6px rgba(244, 63, 94, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}
    >
      {/* Top Tag & Category */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          color: '#be123c',
          background: 'rgba(254, 205, 219, 0.55)',
          padding: '4px 10px',
          borderRadius: '20px',
          textTransform: 'uppercase',
          letterSpacing: '0.6px'
        }}>
          {capsule.tag}
        </span>

        <span style={{
          fontSize: '0.75rem',
          color: '#8a6877',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          fontWeight: 500
        }}>
          <IconComponent size={13} strokeWidth={2} color={capsule.accentColor} />
          {capsule.category}
        </span>
      </div>

      {/* Main Envelope visual container */}
      <div style={{
        position: 'relative',
        height: '115px',
        background: 'linear-gradient(135deg, #fff0f3, #ffe4e9)',
        borderRadius: '16px',
        border: '1px solid rgba(253, 164, 175, 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.02)'
      }}>
        {/* Envelope flaps geometry */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '52px',
          background: 'linear-gradient(to bottom, #ffd5df, #ffccd8)',
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          transition: 'transform 0.3s ease',
          transformOrigin: 'top',
          transform: isHovered ? 'rotateX(25deg)' : 'rotateX(0deg)'
        }} />

        {/* Wax seal in center */}
        <div className="wax-seal animate-heart-pulse" style={{ zIndex: 2 }}>
          <Heart size={18} fill="#ffffff" stroke="none" />
        </div>

        {/* Minimalist postal mark in top right corner */}
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          padding: '2px 6px',
          border: '1px solid rgba(244, 63, 94, 0.4)',
          borderRadius: '4px',
          fontSize: '0.62rem',
          fontWeight: 700,
          background: 'rgba(255, 255, 255, 0.85)',
          color: '#be123c',
          letterSpacing: '0.5px'
        }}>
          SCELLÉ
        </div>
      </div>

      {/* Title and Subtitle */}
      <div>
        <h4 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.3rem',
          fontWeight: 700,
          color: '#2b1b22',
          lineHeight: 1.25,
          marginBottom: '4px'
        }}>
          {capsule.title}
        </h4>
        <p style={{
          fontSize: '0.85rem',
          color: '#6b505c',
          lineHeight: 1.4
        }}>
          {capsule.subtitle}
        </p>
      </div>

      {/* Action Prompt */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '8px',
        borderTop: '1px solid rgba(254, 205, 219, 0.5)',
        marginTop: 'auto'
      }}>
        <span style={{ fontSize: '0.74rem', color: '#8a6877', fontWeight: 500 }}>
          {capsule.audioVibe}
        </span>
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#ff3366',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          Toucher pour lire
        </span>
      </div>
    </div>
  );
}
