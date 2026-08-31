import React, { useState, useEffect } from 'react';
import { Heart, Clock, Calendar, Sparkles, User, Save } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CoupleInfoEditor({ initialCouple, onSave, isSaving }) {
  const [couple, setCouple] = useState(initialCouple || {
    partnerName: 'Mon Amour',
    senderName: 'SNACKA',
    relationTitle: 'Notre Histoire',
    subtitle: 'Un espace intime et dédié pour célébrer chaque instant passé à tes côtés.',
    startDate: '2022-11-28T00:50:00',
    welcomeBadge: 'Espace Privé & Dédicacé'
  });

  // Preview live counter
  const [previewTime, setPreviewTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const start = new Date(couple.startDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, now - start);
      setPreviewTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [couple.startDate]);

  const handleChange = (field, val) => {
    setCouple(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ec4899', '#f59e0b', '#10b981']
    });
    onSave(couple);
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
            background: 'linear-gradient(135deg, #ff3366, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Heart size={22} fill="#fff" />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: '#2b1b22', margin: 0 }}>
              Informations du Couple & Compteur
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#8a6877' }}>
              Personnalisez vos prénoms, votre date clé et le message d'accueil.
            </span>
          </div>
        </div>

        {/* Inputs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '18px' }}>
          {/* Partner Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#4a2c39', marginBottom: '6px' }}>
              Prénom ou Surnom de ta Chérie <span style={{ color: '#e11d48' }}>*</span>
            </label>
            <input
              type="text"
              value={couple.partnerName}
              onChange={(e) => handleChange('partnerName', e.target.value)}
              placeholder="Ex: Mon Amour, Chérie..."
              required
              disabled={isSaving}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '12px',
                border: '1.5px solid rgba(254, 205, 219, 0.9)',
                background: '#fff',
                fontSize: '0.92rem',
                color: '#2b1b22',
                outline: 'none'
              }}
            />
          </div>

          {/* Sender Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#4a2c39', marginBottom: '6px' }}>
              Ton Prénom ou Surnom <span style={{ color: '#e11d48' }}>*</span>
            </label>
            <input
              type="text"
              value={couple.senderName}
              onChange={(e) => handleChange('senderName', e.target.value)}
              placeholder="Ex: SNACKA"
              required
              disabled={isSaving}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '12px',
                border: '1.5px solid rgba(254, 205, 219, 0.9)',
                background: '#fff',
                fontSize: '0.92rem',
                color: '#2b1b22',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Date Selector */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#4a2c39', marginBottom: '6px' }}>
            Date & Heure de Début de Relation <span style={{ color: '#e11d48' }}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="datetime-local"
              value={couple.startDate ? couple.startDate.slice(0, 16) : ''}
              onChange={(e) => handleChange('startDate', e.target.value)}
              required
              disabled={isSaving}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '12px',
                border: '1.5px solid rgba(254, 205, 219, 0.9)',
                background: '#fff',
                fontSize: '0.92rem',
                color: '#2b1b22',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Live Counter Preview Box */}
        <div style={{
          padding: '14px 16px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(255, 241, 245, 0.9), rgba(255, 235, 240, 0.9))',
          border: '1px solid rgba(254, 205, 219, 0.8)',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#be123c', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} />
            <span>Aperçu en temps réel du compteur</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', textAlign: 'center' }}>
            {[
              { label: 'Jours', val: previewTime.days, color: '#ff3366' },
              { label: 'Heures', val: previewTime.hours, color: '#ec4899' },
              { label: 'Min', val: previewTime.minutes, color: '#d97706' },
              { label: 'Sec', val: previewTime.seconds, color: '#be123c' }
            ].map((box, i) => (
              <div key={i} style={{ background: '#fff', padding: '8px 4px', borderRadius: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: box.color, lineHeight: 1 }}>
                  {String(box.val).padStart(2, '0')}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#8a6877', fontWeight: 600, marginTop: '2px' }}>
                  {box.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Title, Subtitle, Badge */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#4a2c39', marginBottom: '6px' }}>
              Titre du Site
            </label>
            <input
              type="text"
              value={couple.relationTitle}
              onChange={(e) => handleChange('relationTitle', e.target.value)}
              placeholder="Ex: Notre Histoire"
              disabled={isSaving}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1.5px solid rgba(254, 205, 219, 0.9)',
                background: '#fff',
                fontSize: '0.9rem',
                color: '#2b1b22',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#4a2c39', marginBottom: '6px' }}>
              Badge d'Accueil
            </label>
            <input
              type="text"
              value={couple.welcomeBadge}
              onChange={(e) => handleChange('welcomeBadge', e.target.value)}
              placeholder="Ex: Espace Privé & Dédicacé"
              disabled={isSaving}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1.5px solid rgba(254, 205, 219, 0.9)',
                background: '#fff',
                fontSize: '0.9rem',
                color: '#2b1b22',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#4a2c39', marginBottom: '6px' }}>
              Message d'Accueil (Sous-titre)
            </label>
            <textarea
              rows={2}
              value={couple.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              placeholder="Ex: Un espace intime et dédié pour célébrer chaque instant..."
              disabled={isSaving}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
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

        {/* Save Button */}
        <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={isSaving}
            className="btn-romantic"
            style={{ padding: '12px 26px', fontSize: '0.92rem', opacity: isSaving ? 0.7 : 1 }}
          >
            <Save size={16} />
            <span>{isSaving ? 'Enregistrement sur GitHub...' : 'Enregistrer les informations'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
