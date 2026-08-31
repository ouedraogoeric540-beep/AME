import React, { useEffect } from 'react';
import { Trophy, Heart, Gift, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loveConfig } from '../../data/loveData';

export default function QuizResult({ score, totalQuestions, onRestart, onGoToCoupons }) {
  const resultInfo = score >= 4 ? loveConfig.quiz.results.perfect : loveConfig.quiz.results.good;
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    // Grand celebration fireworks confetti
    const duration = 2.5 * 1000;
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
      padding: '28px 20px',
      textAlign: 'center',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 241, 245, 0.9))',
      border: '2px solid rgba(254, 205, 219, 0.9)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Trophy Icon */}
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #fef08a, #f59e0b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
        boxShadow: '0 10px 25px rgba(245, 158, 11, 0.35)'
      }}>
        <Trophy size={36} color="#78350f" className="animate-bounce-soft" />
      </div>

      {/* Badge */}
      <div style={{ marginBottom: '12px' }}>
        <span className="romantic-badge">
          <Sparkles size={13} color="#f59e0b" />
          <span>{resultInfo.badge}</span>
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '2rem',
        fontWeight: 700,
        color: '#2b1b22',
        marginBottom: '8px',
        lineHeight: 1.2
      }}>
        {resultInfo.title}
      </h3>

      <p style={{
        fontSize: '0.95rem',
        color: '#6b505c',
        maxWidth: '420px',
        margin: '0 auto 20px',
        lineHeight: 1.5
      }}>
        {resultInfo.message}
      </p>

      {/* Score details card */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.85)',
        border: '1px solid rgba(254, 205, 219, 0.8)',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#9d7888', textTransform: 'uppercase', fontWeight: 600 }}>
            Bonnes Réponses
          </div>
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.6rem',
            fontWeight: 700,
            color: '#ff3366'
          }}>
            {score} / {totalQuestions}
          </div>
        </div>

        <div style={{ width: '1px', height: '36px', background: 'rgba(254, 205, 219, 0.8)' }} />

        <div>
          <div style={{ fontSize: '0.75rem', color: '#9d7888', textTransform: 'uppercase', fontWeight: 600 }}>
            Complicité
          </div>
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.6rem',
            fontWeight: 700,
            color: '#10b981'
          }}>
            100% Amour
          </div>
        </div>
      </div>

      {/* Unlocked Reward Box */}
      <div style={{
        background: 'linear-gradient(135deg, #fff7ed, #fff1f2)',
        border: '1.5px dashed #f59e0b',
        borderRadius: '18px',
        padding: '18px 16px',
        marginBottom: '24px',
        textAlign: 'left'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#b45309', fontWeight: 700, fontSize: '0.9rem' }}>
          <Gift size={18} />
          <span>Récompense Débloquée : Ton Chéquier d'Amour !</span>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#78350f', lineHeight: 1.4, margin: 0 }}>
          Tes 4 bons cadeaux virtuels (massages, dîner de reine, soirée film...) sont désormais disponibles et utilisables quand tu veux !
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={onGoToCoupons}
          className="btn-romantic"
          style={{ padding: '14px', fontSize: '0.95rem' }}
        >
          <Gift size={18} />
          <span>Découvrir mes Bons Cadeaux 🎁</span>
        </button>

        <button
          onClick={onRestart}
          className="btn-secondary"
          style={{ padding: '12px', fontSize: '0.85rem' }}
        >
          <RotateCcw size={15} />
          <span>Rejouer le Quiz</span>
        </button>
      </div>
    </div>
  );
}
