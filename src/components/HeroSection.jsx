import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Send, Clock, Flame, Calendar, Award } from 'lucide-react';
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

    // Realistic heart burst confetti
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 70,
      origin: { x, y },
      colors: ['#ff3366', '#ff5e7e', '#ec4899', '#fbcfe8', '#f59e0b'],
      shapes: ['circle']
    });

    onSendKiss();
  };

  return (
    <section style={{
      padding: '24px 0 16px',
      textAlign: 'center'
    }}>
      {/* Top Welcome Badge */}
      <div style={{ marginBottom: '14px' }}>
        <span className="romantic-badge animate-bounce-soft">
          <Sparkles size={13} color="#f59e0b" />
          <span>{loveConfig.welcomeBadge}</span>
        </span>
      </div>

      {/* Main Romantic Heading */}
      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '2.3rem',
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
        }}>{loveConfig.partnerName}</span> ❤️
      </h2>

      <p style={{
        fontSize: '0.95rem',
        color: '#6b505c',
        maxWidth: '440px',
        margin: '0 auto 22px',
        lineHeight: 1.5,
        padding: '0 10px'
      }}>
        {loveConfig.subtitle}
      </p>

      {/* Live Relationship Counter Box */}
      <div className="glass-card" style={{
        padding: '20px 16px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(255, 245, 247, 0.75))',
        border: '1px solid rgba(255, 200, 220, 0.7)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          marginBottom: '14px',
          color: '#be123c',
          fontSize: '0.85rem',
          fontWeight: 700
        }}>
          <Clock size={16} />
          <span>Nous deux, c'est de l'amour depuis :</span>
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
            { label: 'Minutes', value: timeTogether.minutes, color: '#f59e0b' },
            { label: 'Secondes', value: timeTogether.seconds, color: '#be123c' }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(254, 205, 219, 0.8)',
                borderRadius: '16px',
                padding: '12px 6px',
                boxShadow: '0 4px 14px rgba(244, 63, 94, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.65rem',
                fontWeight: 700,
                color: item.color,
                lineHeight: 1
              }}>
                {String(item.value).padStart(2, '0')}
              </span>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                color: '#6b505c',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginTop: '4px'
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Love streak milestone */}
        <div style={{
          marginTop: '14px',
          fontSize: '0.78rem',
          color: '#9d7888',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          <Flame size={14} color="#ff3366" />
          <span>Déjà <strong>{timeTogether.totalDays} jours</strong> de bonheur partagé !</span>
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
            fontSize: '1rem',
            width: '100%',
            maxWidth: '320px'
          }}
        >
          <Heart size={20} fill="#ffffff" className={kissAnimation ? "animate-heart-pulse" : ""} />
          <span>Envoyer un bisou d'amour 💕</span>
        </button>

        {/* Quick Tabs Jump on Mobile */}
        <div style={{
          display: 'flex',
          gap: '8px',
          width: '100%',
          maxWidth: '360px',
          justifyContent: 'center',
          marginTop: '4px'
        }}>
          <button
            onClick={() => onNavigate('letters')}
            className="btn-secondary"
            style={{ flex: 1, padding: '10px 12px', fontSize: '0.82rem' }}
          >
            💌 Ouvrir les Lettres
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className="btn-secondary"
            style={{ flex: 1, padding: '10px 12px', fontSize: '0.82rem' }}
          >
            🎯 Faire le Quiz
          </button>
        </div>
      </div>
    </section>
  );
}
