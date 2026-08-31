import React, { useEffect } from 'react';
import { Award, Gift, RotateCcw, Sparkles, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loveConfig } from '../../data/loveData';

export default function QuizResult({ score, totalQuestions, onRestart, onGoToCoupons }) {
  const resultInfo = score >= 4 ? loveConfig.quiz.results.perfect : loveConfig.quiz.results.good;
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    // Grand celebration fireworks confetti
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#ff3366', '#ec4899', '#f59e0b', '#ffd1dc']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#ff3366', '#ec4899', '#f59e0b', '#ffd1dc']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="glass-card" style={{
      padding: '32px 24px',
      textAlign: 'center',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(255, 246, 248, 0.92))',
      border: '1px solid rgba(254, 205, 219, 0.9)',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 20px 48px -12px rgba(244, 63, 94, 0.15)'
    }}>
      {/* Luxury Award Seal */}
      <div style={{
        width: '68px',
        height: '68px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
        border: '1.5px solid #f59e0b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 18px',
        boxShadow: '0 10px 25px rgba(245, 158, 11, 0.25)',
        color: '#b45309'
      }}>
        <Award size={36} strokeWidth={1.8} />
      </div>

      {/* Badge */}
      <div style={{ marginBottom: '14px' }}>
        <span className="romantic-badge">
          <Sparkles size={13} color="#d97706" />
          <span>{resultInfo.badge}</span>
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '2.1rem',
        fontWeight: 700,
        color: '#2b1b22',
        marginBottom: '10px',
        lineHeight: 1.2
      }}>
        {resultInfo.title}
      </h3>

      <p style={{
        fontSize: '0.95rem',
        color: '#6b505c',
        maxWidth: '440px',
        margin: '0 auto 24px',
        lineHeight: 1.55
      }}>
        {resultInfo.message}
      </p>

      {/* Score Summary Metrics */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.85)',
        border: '1px solid rgba(254, 205, 219, 0.8)',
        borderRadius: '18px',
        padding: '18px 16px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#9d7888', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.6px' }}>
            Bonnes Réponses
          </div>
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#ff3366',
            lineHeight: 1.1,
            marginTop: '4px'
          }}>
            {score} / {totalQuestions}
          </div>
        </div>

        <div style={{ width: '1px', height: '36px', background: 'rgba(254, 205, 219, 0.8)' }} />

        <div>
          <div style={{ fontSize: '0.75rem', color: '#9d7888', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.6px' }}>
            Indice de Complicité
          </div>
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#059669',
            lineHeight: 1.1,
            marginTop: '4px'
          }}>
            {percentage}%
          </div>
        </div>
      </div>

      {/* Reward Unlock Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 251, 235, 0.9), rgba(255, 241, 242, 0.85))',
        border: '1.5px solid rgba(245, 158, 11, 0.35)',
        borderRadius: '18px',
        padding: '18px 20px',
        marginBottom: '24px',
        textAlign: 'left'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#92400e', fontWeight: 700, fontSize: '0.92rem' }}>
          <Gift size={18} strokeWidth={2} />
          <span>Privilèges Débloqués</span>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#78350f', lineHeight: 1.5, margin: 0 }}>
          Vos 4 bons privilèges exclusifs (massages, dîner à deux, soirée détente...) sont disponibles et utilisables à tout moment.
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={onGoToCoupons}
          className="btn-romantic"
          style={{ padding: '14px', fontSize: '0.95rem' }}
        >
          <Gift size={18} />
          <span>Accéder aux privilèges</span>
        </button>

        <button
          onClick={onRestart}
          className="btn-secondary"
          style={{ padding: '12px', fontSize: '0.85rem' }}
        >
          <RotateCcw size={15} />
          <span>Recommencer le questionnaire</span>
        </button>
      </div>
    </div>
  );
}
