import React, { useState } from 'react';
import { Gift, Sparkles, Utensils, Film, Crown, CheckCircle, Heart, Stamp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loveConfig } from '../data/loveData';

const iconMap = {
  Sparkles,
  Utensils,
  Film,
  Crown
};

export default function CouponsSection({ onSendKiss }) {
  const [usedCoupons, setUsedCoupons] = useState({});

  const handleUseCoupon = (coupon, e) => {
    const isAlreadyUsed = !!usedCoupons[coupon.id];
    
    if (!isAlreadyUsed) {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });

      setUsedCoupons(prev => ({
        ...prev,
        [coupon.id]: formattedDate
      }));

      // Confetti burst
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 40,
        spread: 70,
        origin: { x, y },
        colors: ['#f59e0b', '#ec4899', '#ff3366', '#10b981']
      });

      onSendKiss();
    } else {
      // Toggle back if needed
      setUsedCoupons(prev => {
        const next = { ...prev };
        delete next[coupon.id];
        return next;
      });
    }
  };

  return (
    <div style={{ padding: '8px 0 24px' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span className="romantic-badge" style={{ marginBottom: '8px' }}>
          <Gift size={13} color="#f59e0b" />
          <span>Privilèges & Chéquier d'Amour</span>
        </span>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.85rem',
          fontWeight: 700,
          color: '#2b1b22',
          lineHeight: 1.2
        }}>
          Tes Bons Cadeaux d'Amour 🎟️
        </h3>
        <p style={{
          fontSize: '0.85rem',
          color: '#6b505c',
          maxWidth: '420px',
          margin: '6px auto 0'
        }}>
          Bons valables pour l'éternité. Clique sur un bon quand tu souhaites que je l'exécute pour toi !
        </p>
      </div>

      {/* Coupons Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {loveConfig.coupons.map((coupon) => {
          const IconComponent = iconMap[coupon.icon] || Gift;
          const usedDate = usedCoupons[coupon.id];
          const isUsed = !!usedDate;

          return (
            <div
              key={coupon.id}
              className="glass-card"
              style={{
                padding: '20px 18px',
                position: 'relative',
                background: isUsed 
                  ? 'linear-gradient(135deg, rgba(240, 253, 244, 0.9), rgba(220, 252, 231, 0.85))'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 246, 248, 0.85))',
                border: isUsed ? '1.5px solid #86efac' : '1px solid rgba(254, 205, 219, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                overflow: 'hidden'
              }}
            >
              {/* Top Tag & Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: isUsed ? '#166534' : '#be123c',
                  background: isUsed ? '#dcfce7' : 'rgba(254, 205, 219, 0.6)',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {coupon.tag}
                </span>

                <span style={{ fontSize: '0.72rem', color: '#9d7888', fontStyle: 'italic' }}>
                  Sans date limite
                </span>
              </div>

              {/* Icon & Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: isUsed ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ff3366, #ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(244, 63, 94, 0.25)'
                }}>
                  <IconComponent size={22} />
                </div>
                <div>
                  <h4 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#2b1b22',
                    lineHeight: 1.2
                  }}>
                    {coupon.title}
                  </h4>
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '0.85rem',
                color: '#6b505c',
                lineHeight: 1.45,
                margin: 0
              }}>
                {coupon.description}
              </p>

              {/* Used Stamp Banner if activated */}
              {isUsed && (
                <div style={{
                  padding: '8px 12px',
                  borderRadius: '12px',
                  background: 'rgba(22, 163, 74, 0.1)',
                  border: '1px dashed #16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  color: '#15803d',
                  fontWeight: 600
                }}>
                  <CheckCircle size={15} color="#16a34a" />
                  <span>Validé le {usedDate} ! Promis & engagé ❤️</span>
                </div>
              )}

              {/* Interactive Button */}
              <button
                onClick={(e) => handleUseCoupon(coupon, e)}
                style={{
                  marginTop: 'auto',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: isUsed 
                    ? 'rgba(255, 255, 255, 0.9)' 
                    : 'linear-gradient(135deg, #ff3366, #ec4899)',
                  color: isUsed ? '#15803d' : '#ffffff',
                  border: isUsed ? '1px solid #86efac' : 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: isUsed ? 'none' : '0 4px 15px rgba(244, 63, 94, 0.3)',
                  transition: 'all 0.25s ease'
                }}
              >
                <Heart size={15} fill={isUsed ? '#16a34a' : '#ffffff'} color={isUsed ? '#16a34a' : '#ffffff'} />
                <span>{isUsed ? 'Bon activé (clique pour réinitialiser)' : 'Utiliser ce bon maintenant'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
