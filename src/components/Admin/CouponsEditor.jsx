import React, { useState } from 'react';
import { Gift, Sparkles, Award, Save } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CouponsEditor({ initialScratch, initialCoupons, onSave, isSaving }) {
  const [scratch, setScratch] = useState(initialScratch || {
    title: 'Message Privilège',
    instruction: 'Faites glisser votre doigt sur la surface pour révéler le message...',
    revealedMessage: "Un dîner d'exception dans le restaurant de ton choix, suivi d'un moment privilégié à deux.",
    rewardTitle: 'Privilège Accordé',
    couponCode: 'PRIVILEGE-2026'
  });

  const [coupons, setCoupons] = useState(initialCoupons || []);

  const handleScratchChange = (field, val) => {
    setScratch(prev => ({ ...prev, [field]: val }));
  };

  const handleCouponChange = (index, field, val) => {
    setCoupons(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ec4899', '#f59e0b']
    });
    onSave({ scratchSecret: scratch, coupons });
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <div className="glass-card" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(255, 248, 250, 0.92))',
        border: '1px solid rgba(254, 205, 219, 0.9)',
        marginBottom: '20px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Gift size={22} />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: '#2b1b22', margin: 0 }}>
              Carte à Gratter & Privilèges Débloquables
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#8a6877' }}>
              Personnalisez le cadeau secret à gratter au doigt et les 4 coupons exclusifs.
            </span>
          </div>
        </div>

        {/* Section 1: Carte à Gratter */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(254, 205, 219, 0.8)',
          borderRadius: '14px',
          padding: '18px',
          marginBottom: '22px'
        }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#be123c', textTransform: 'uppercase', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={15} />
            <span>1. Carte Mystère à Gratter</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#4a2c39', marginBottom: '4px' }}>
                Titre de la carte
              </label>
              <input
                type="text"
                value={scratch.title || ''}
                onChange={(e) => handleScratchChange('title', e.target.value)}
                disabled={isSaving}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(254, 205, 219, 0.8)',
                  fontSize: '0.88rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#4a2c39', marginBottom: '4px' }}>
                Code Privilège
              </label>
              <input
                type="text"
                value={scratch.couponCode || ''}
                onChange={(e) => handleScratchChange('couponCode', e.target.value)}
                placeholder="Ex: PRIVILEGE-2026"
                disabled={isSaving}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(254, 205, 219, 0.8)',
                  fontSize: '0.88rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#4a2c39', marginBottom: '4px' }}>
              Message Secret Révélé sous la surface à gratter <span style={{ color: '#e11d48' }}>*</span>
            </label>
            <textarea
              rows={2}
              value={scratch.revealedMessage || ''}
              onChange={(e) => handleScratchChange('revealedMessage', e.target.value)}
              placeholder="Ex: Un dîner aux chandelles dans le restaurant de ton choix..."
              required
              disabled={isSaving}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1.5px solid rgba(254, 205, 219, 0.9)',
                background: '#fff',
                fontSize: '0.9rem',
                color: '#2b1b22',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>

        {/* Section 2: Coupons Cadeaux */}
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#be123c', textTransform: 'uppercase', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={15} />
            <span>2. Chéquier de Privilèges ({coupons.length} coupons)</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '22px' }}>
            {coupons.map((coupon, idx) => (
              <div
                key={coupon.id || idx}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(254, 205, 219, 0.8)',
                  borderRadius: '12px',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '6px',
                    background: 'rgba(254, 205, 219, 0.5)',
                    color: '#be123c',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={coupon.title || ''}
                    onChange={(e) => handleCouponChange(idx, 'title', e.target.value)}
                    placeholder="Titre du coupon..."
                    disabled={isSaving}
                    style={{
                      flex: 1,
                      padding: '6px 10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(254, 205, 219, 0.7)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#2b1b22'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <textarea
                    rows={2}
                    value={coupon.description || ''}
                    onChange={(e) => handleCouponChange(idx, 'description', e.target.value)}
                    placeholder="Description du privilège..."
                    disabled={isSaving}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(254, 205, 219, 0.6)',
                      fontSize: '0.8rem',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={coupon.tag || ''}
                    onChange={(e) => handleCouponChange(idx, 'tag', e.target.value)}
                    placeholder="Tag / Catégorie (ex: Bien-être)"
                    disabled={isSaving}
                    style={{
                      width: '100%',
                      padding: '5px 10px',
                      borderRadius: '6px',
                      border: '1px solid rgba(254, 205, 219, 0.5)',
                      fontSize: '0.75rem',
                      color: '#8a6877'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Save */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={isSaving}
            className="btn-romantic"
            style={{ padding: '12px 26px', fontSize: '0.92rem', opacity: isSaving ? 0.7 : 1 }}
          >
            <Save size={16} />
            <span>{isSaving ? 'Enregistrement sur GitHub...' : 'Enregistrer les privilèges'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
