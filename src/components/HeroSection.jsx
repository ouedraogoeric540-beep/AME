import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Clock, Calendar, ArrowRight, BookOpen, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loveConfig } from '../data/loveData';

export default function HeroSection({ onNavigate, onSendKiss }) {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0
  });

  const [kissAnimation, setKissAnimation] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(loveConfig.startDate).getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, now - start);

      const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeTogether({
        days: totalDays,
        hours,
        minutes,
        seconds,
        totalDays
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerKiss = (e) => {
    setKissAnimation(true);
    setTimeout(() => setKissAnimation(false), 1200);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 65,
      origin: { x, y },
      colors: ['#ff3366', '#ff5e7e', '#ec4899', '#fbcfe8', '#f59e0b']
    });

    onSendKiss();
  };

  return (
    <section style={{
      padding: '24px 0 16px',
      textAlign: 'center'
    }}>
      {/* Top Welcome Badge */}
      <div style={{ marginBottom: '16px' }}>
        <span className="romantic-badge">
          <Sparkles size={13} color="#d97706" />
          <span>{loveConfig.welcomeBadge}</span>
        </span>
      </div>

      {/* Main Romantic Heading */}
      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '2.4rem',
        fontWeight: 700,
        color: '#2b1b22',
        lineHeight: 1.15,
        marginBottom: '10px',
        letterSpacing: '-0.5px'
      }}>
        Pour toi, <span style={{
          background: 'linear-gradient(135deg, #ff3366, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>{loveConfig.partnerName}</span>
      </h2>

      <p style={{
        fontSize: '0.95rem',
        color: '#6b505c',
        maxWidth: '460px',
        margin: '0 auto 24px',
        lineHeight: 1.55,
        padding: '0 10px'
      }}>
        {loveConfig.subtitle}
      </p>

      {/* Live Relationship Counter Box */}
      <div className="glass-card" style={{
        padding: '22px 18px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 246, 248, 0.85))',
        border: '1px solid rgba(254, 205, 219, 0.85)',
        boxShadow: '0 14px 36px -10px rgba(244, 63, 94, 0.12)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '16px',
          color: '#be123c',
          fontSize: '0.85rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.8px'
        }}>
          <Clock size={15} strokeWidth={2.2} />
          <span>Temps partagé à tes côtés</span>
        </div>

        {/* Counter Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          maxWidth: '460px',
          margin: '0 auto'
        }}>
          {[
            { label: 'Jours', value: timeTogether.days, color: '#ff3366' },
            { label: 'Heures', value: timeTogether.hours, color: '#ec4899' },
            { label: 'Minutes', value: timeTogether.minutes, color: '#d97706' },
            { label: 'Secondes', value: timeTogether.seconds, color: '#be123c' }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(254, 205, 219, 0.85)',
                borderRadius: '16px',
                padding: '14px 6px',
                boxShadow: '0 4px 14px rgba(244, 63, 94, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                fontWeight: 700,
                color: item.color,
                lineHeight: 1
              }}>
                {String(item.value).padStart(2, '0')}
              </span>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#8a6877',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                marginTop: '6px'
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '14px',
          fontSize: '0.8rem',
          color: '#8a6877',
          fontWeight: 500
        }}>
          Déjà <strong style={{ color: '#be123c', fontWeight: 700 }}>{timeTogether.totalDays} jours</strong> de bonheur partagé
        </div>
      </div>

      {/* Interactive Kiss Button & Quick Actions */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
      }}>
        <button
          onClick={triggerKiss}
          className="btn-romantic"
          style={{
            padding: '14px 28px',
            fontSize: '0.95rem',
            width: '100%',
            maxWidth: '320px',
            letterSpacing: '0.3px'
          }}
        >
          <Heart size={18} fill="#ffffff" stroke="none" className={kissAnimation ? "animate-heart-pulse" : ""} />
          <span>Envoyer une attention</span>
        </button>

        {/* Quick Tabs Jump on Mobile */}
        <div style={{
          display: 'flex',
          gap: '10px',
          width: '100%',
          maxWidth: '360px',
          justifyContent: 'center',
          marginTop: '4px'
        }}>
          <button
            onClick={() => onNavigate('letters')}
            className="btn-secondary"
            style={{ flex: 1, padding: '11px 14px', fontSize: '0.84rem', gap: '6px' }}
          >
            <BookOpen size={15} />
            <span>Les Lettres</span>
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className="btn-secondary"
            style={{ flex: 1, padding: '11px 14px', fontSize: '0.84rem', gap: '6px' }}
          >
            <HelpCircle size={15} />
            <span>Le Questionnaire</span>
          </button>
        </div>
      </div>
    </section>
  );
}
