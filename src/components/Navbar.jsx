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
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px) saturate(160%)',
      WebkitBackdropFilter: 'blur(20px) saturate(160%)',
      borderBottom: '1px solid rgba(254, 205, 219, 0.6)',
      boxShadow: '0 4px 20px rgba(244, 63, 94, 0.04)'
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ff3366, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(244, 63, 94, 0.25)',
            color: '#ffffff'
          }}>
            <Heart size={18} fill="#ffffff" stroke="none" className="animate-heart-pulse" />
          </div>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              fontWeight: 700,
              letterSpacing: '-0.2px',
              color: '#2b1b22',
              lineHeight: 1.1
            }}>
              Espace Intime
            </h1>
            <span style={{ fontSize: '0.72rem', color: '#8a6877', fontWeight: 500 }}>
              {kissesCount > 0 ? `${kissesCount} attentions envoyées` : "Dédié à mon amour"}
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
              padding: '7px 13px',
              fontSize: '0.8rem',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(244, 63, 94, 0.25)'
            }}
          >
            <Sparkles size={13} />
            <span>Pensée du Jour</span>
          </button>
        </div>
      </div>
    </header>
  );
}
