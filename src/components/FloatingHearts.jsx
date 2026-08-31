import React, { useEffect, useState } from 'react';

export default function FloatingHearts() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // 8 lightweight ambient hearts with GPU acceleration
    const heartIcons = ['💖', '💕', '✨', '🌸', '💘', '🤍', '🌷', '💝'];
    const initialParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      icon: heartIcons[i % heartIcons.length],
      left: Math.random() * 90 + 5, // %
      size: Math.random() * 12 + 14, // px
      duration: Math.random() * 8 + 12, // seconds
      delay: Math.random() * 6, // seconds
      opacity: Math.random() * 0.35 + 0.15
    }));
    setParticles(initialParticles);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 1,
      overflow: 'hidden'
    }}>
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            bottom: '-30px',
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            willChange: 'transform, opacity',
            animation: `floatUpFast ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            userSelect: 'none'
          }}
        >
          {p.icon}
        </span>
      ))}

      <style>{`
        @keyframes floatUpFast {
          0% {
            transform: translate3d(0, 0, 0) scale(0.85);
            opacity: 0;
          }
          15% {
            opacity: 0.45;
          }
          85% {
            opacity: 0.45;
          }
          100% {
            transform: translate3d(0, -112vh, 0) scale(1.05);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
