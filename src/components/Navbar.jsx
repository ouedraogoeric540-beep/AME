import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

export default function Navbar({ onOpenDose, kissesCount }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      padding: 'calc(10px + var(--safe-top)) 16px 10px',
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(20px) saturate(160%)',
      WebkitBackdropFilter: 'blur(20px) saturate(160%)',
      borderBottom: '1px solid rgba(255, 220, 235, 0.6)',
      boxShadow: '0 4px 20px rgba(244, 63, 94, 0.05)'
    }}>
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px'
      }}>
        {/* Logo / Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ff3366, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(244, 63, 94, 0.3)'
          }}>
            <Heart size={18} color="#ffffff" fill="#ffffff" className="animate-heart-pulse" />
          </div>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.15rem',
              fontWeight: 700,
              letterSpacing: '-0.2px',
              color: '#2b1b22',
              lineHeight: 1.1
            }}>
              Love Capsule
            </h1>
            <span style={{ fontSize: '0.7rem', color: '#9d7888', fontWeight: 500 }}>
              {kissesCount > 0 ? `${kissesCount} bisous envoyés 💕` : "Pour mon amour"}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AudioPlayer />
          
          <button
            onClick={onOpenDose}
            className="btn-romantic"
            style={{
              padding: '6px 12px',
              fontSize: '0.78rem',
              gap: '5px',
              boxShadow: '0 4px 14px rgba(244, 63, 94, 0.3)'
            }}
          >
            <Sparkles size={13} />
            <span>Dose d'Amour</span>
          </button>
        </div>
      </div>
    </header>
  );
}
