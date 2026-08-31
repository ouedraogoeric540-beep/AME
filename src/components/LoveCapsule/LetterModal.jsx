import React, { useState } from 'react';
import { X, Heart, Copy, Check, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LetterModal({ capsule, onClose, onSendLoveReaction }) {
  const [copied, setCopied] = useState(false);
  const [reacted, setReacted] = useState(false);

  if (!capsule) return null;
  const { letter } = capsule;

  const handleCopy = () => {
    const fullText = `${letter.salutation}\n\n${letter.paragraphs.join('\n\n')}\n\n${letter.signature}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReact = (e) => {
    setReacted(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x, y },
      colors: ['#ff3366', '#ec4899', '#f43f5e', '#ffd1dc']
    });

    onSendLoveReaction();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="letter-sheet"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Mobile drag handle bar */}
        <div style={{
          width: '40px',
          height: '4px',
          background: '#fda4af',
          borderRadius: '4px',
          margin: '0 auto 14px'
        }} />

        {/* Header with Date & Close */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '1px dashed #fecdd3'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={16} color="#be123c" />
            <span style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#8a6877',
              fontStyle: 'italic'
            }}>
              {letter.date}
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 228, 235, 0.8)',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#be123c'
            }}
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Letter Content */}
        <div style={{
          overflowY: 'auto',
          paddingRight: '6px',
          maxHeight: '60vh',
          marginBottom: '16px'
        }}>
          {/* Salutation */}
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#be123c',
            marginBottom: '14px',
            lineHeight: 1.25
          }}>
            {letter.salutation}
          </h3>

          {/* Paragraphs */}
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.15rem',
            lineHeight: '1.65',
            color: '#2b1b22',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            {letter.paragraphs.map((p, idx) => (
              <p key={idx} style={{ margin: 0, whiteSpace: 'pre-line' }}>
                {p}
              </p>
            ))}
          </div>

          {/* Signature */}
          <div style={{
            marginTop: '24px',
            textAlign: 'right',
            fontFamily: 'var(--font-hand)',
            fontSize: '1.75rem',
            color: '#ff3366',
            lineHeight: 1.2
          }}>
            {letter.signature}
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{
          display: 'flex',
          gap: '8px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(254, 205, 219, 0.8)',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={handleCopy}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.78rem', gap: '6px' }}
          >
            {copied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
            <span>{copied ? 'Copié' : 'Copier le texte'}</span>
          </button>

          <button
            onClick={handleReact}
            className="btn-romantic"
            style={{ padding: '8px 18px', fontSize: '0.85rem', gap: '6px' }}
          >
            <Heart size={16} fill={reacted ? '#ffffff' : 'none'} className={reacted ? "animate-heart-pulse" : ""} />
            <span>{reacted ? 'Attention envoyée' : 'Répondre avec amour'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
