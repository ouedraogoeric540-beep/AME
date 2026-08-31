import React, { useState } from 'react';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { loveConfig } from '../../data/loveData';
import EnvelopeCard from './EnvelopeCard';
import LetterModal from './LetterModal';
import ScratchCard from './ScratchCard';

export default function LoveCapsule({ onSendKiss }) {
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Réconfort', 'Douceur', 'Déclaration', 'Promesse'];

  const filteredCapsules = activeCategory === 'All'
    ? loveConfig.capsules
    : loveConfig.capsules.filter(c => c.category === activeCategory);

  return (
    <div style={{ padding: '8px 0 24px' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '18px' }}>
        <span className="romantic-badge" style={{ marginBottom: '8px' }}>
          <Mail size={13} color="#be123c" />
          <span>Capsules Temporelles & Secrets</span>
        </span>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.85rem',
          fontWeight: 700,
          color: '#2b1b22',
          lineHeight: 1.2
        }}>
          La Boîte à Lettres Secrètes 💌
        </h3>
        <p style={{
          fontSize: '0.85rem',
          color: '#6b505c',
          maxWidth: '420px',
          margin: '6px auto 0'
        }}>
          Des mots doux écrits du fond du cœur à ouvrir selon ton humeur et tes envies.
        </p>
      </div>

      {/* Category Pills */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        padding: '4px 2px 14px',
        justifyContent: 'flex-start',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: isActive ? '1px solid #ff3366' : '1px solid rgba(254, 205, 219, 0.8)',
                background: isActive ? 'linear-gradient(135deg, #ff3366, #ec4899)' : 'rgba(255, 255, 255, 0.85)',
                color: isActive ? '#ffffff' : '#6b505c',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 12px rgba(244, 63, 94, 0.25)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {cat === 'All' ? '✨ Toutes les lettres' : cat}
            </button>
          );
        })}
      </div>

      {/* Interactive Scratch Card */}
      <ScratchCard />

      {/* Envelope Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
        marginTop: '16px'
      }}>
        {filteredCapsules.map((capsule) => (
          <EnvelopeCard
            key={capsule.id}
            capsule={capsule}
            onOpen={(c) => setSelectedCapsule(c)}
          />
        ))}
      </div>

      {/* Letter Reading Modal */}
      {selectedCapsule && (
        <LetterModal
          capsule={selectedCapsule}
          onClose={() => setSelectedCapsule(null)}
          onSendLoveReaction={onSendKiss}
        />
      )}
    </div>
  );
}
