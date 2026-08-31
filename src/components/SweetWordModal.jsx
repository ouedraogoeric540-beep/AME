import React from 'react';
import { Sparkles, Heart, X, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SweetWordModal({ word, onClose, onNewWord }) {
  const handleNextWord = () => {
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ec4899', '#f59e0b', '#ffd1dc']
    });
    onNewWord();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="letter-sheet"
        style={{ maxWidth: '420px', padding: '26px 20px', textAlign: 'center', position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: 'rgba(255, 230, 238, 0.7)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#6b505c'
          }}
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '52px',
          height: '52px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #ffe4e9, #ffd1dc)',
          margin: '0 auto 16px',
          boxShadow: '0 8px 20px rgba(255, 77, 121, 0.15)'
        }}>
          <Heart size={24} color="#ff3366" fill="#ff3366" className="animate-heart-pulse" />
        </div>

        <div style={{ marginBottom: '14px' }}>
          <span className="romantic-badge">
            <Sparkles size={13} color="#d97706" />
            <span>Pensée du Moment</span>
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.45rem',
          fontStyle: 'italic',
          color: '#2b1b22',
          lineHeight: '1.45',
          margin: '16px 0 24px',
          padding: '0 10px'
        }}>
          « {word} »
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button 
            className="btn-romantic"
            onClick={handleNextWord}
            style={{ padding: '10px 18px', fontSize: '0.88rem' }}
          >
            <RefreshCw size={14} />
            <span>Autre pensée</span>
          </button>
          <button 
            className="btn-secondary"
            onClick={onClose}
            style={{ padding: '10px 16px', fontSize: '0.88rem' }}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
