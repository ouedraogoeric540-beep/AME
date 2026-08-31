import React, { useState } from 'react';
import { Mail, Heart, Sparkles, Sun, HeartHandshake, Compass, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

const iconMap = {
  Sun,
  HeartHandshake,
  Sparkles,
  Compass
};

export default function EnvelopeCard({ capsule, onOpen }) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconMap[capsule.icon] || Mail;

  const handleClick = (e) => {
    // Soft confetti burst from envelope
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
        padding: '18px 16px',
        position: 'relative',
        cursor: 'pointer',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 246, 248, 0.8))',
        border: '1px solid rgba(254, 205, 219, 0.85)',
        boxShadow: isHovered 
          ? '0 16px 36px -8px rgba(244, 63, 94, 0.25)' 
          : '0 8px 24px -6px rgba(244, 63, 94, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {/* Top Tag & Category */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          color: '#be123c',
          background: 'rgba(254, 205, 219, 0.5)',
          padding: '3px 10px',
          borderRadius: '20px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {capsule.tag}
        </span>

        <span style={{
          fontSize: '0.72rem',
          color: '#9d7888',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <IconComponent size={13} color={capsule.accentColor} />
          {capsule.category}
        </span>
      </div>

      {/* Main Envelope visual container */}
      <div style={{
        position: 'relative',
        height: '110px',
        background: 'linear-gradient(135deg, #fff0f3, #ffe4e9)',
        borderRadius: '16px',
        border: '1px solid rgba(253, 164, 175, 0.5)',
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
          height: '50px',
          background: 'linear-gradient(to bottom, #ffd5df, #ffccd8)',
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          transition: 'transform 0.3s ease',
          transformOrigin: 'top',
          transform: isHovered ? 'rotateX(25deg)' : 'rotateX(0deg)'
        }} />

        {/* Wax seal in center */}
        <div className="wax-seal animate-heart-pulse" style={{ zIndex: 2 }}>
          <Heart size={20} fill="#ffffff" stroke="none" />
        </div>

        {/* Stamp in top right corner */}
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '24px',
          height: '28px',
          border: '1px dashed #f43f5e',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.65rem',
          background: 'rgba(255, 255, 255, 0.8)',
          color: '#f43f5e'
        }}>
          💌
        </div>
      </div>

      {/* Title and Subtitle */}
      <div>
        <h4 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#2b1b22',
          lineHeight: 1.25,
          marginBottom: '4px'
        }}>
          {capsule.title}
        </h4>
        <p style={{
          fontSize: '0.82rem',
          color: '#6b505c',
          lineHeight: 1.35
        }}>
          {capsule.subtitle}
        </p>
      </div>

      {/* Action Prompt */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '6px',
        borderTop: '1px solid rgba(254, 205, 219, 0.4)',
        marginTop: 'auto'
      }}>
        <span style={{ fontSize: '0.72rem', color: '#be123c', fontWeight: 600 }}>
          {capsule.audioVibe}
        </span>
        <span style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#ff3366',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          Toucher pour ouvrir 💌
        </span>
      </div>
    </div>
  );
}
