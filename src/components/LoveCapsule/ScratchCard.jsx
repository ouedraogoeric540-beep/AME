import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Gift, CheckCircle, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loveConfig } from '../../data/loveData';

export default function ScratchCard() {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const scratchData = loveConfig.scratchSecret;

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Luxury Rose-Gold / Champagne Glitter gradient
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#e5a359');
    gradient.addColorStop(0.3, '#ffd699');
    gradient.addColorStop(0.5, '#f472b6');
    gradient.addColorStop(0.7, '#fb7185');
    gradient.addColorStop(1, '#d97706');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let x = 15; x < rect.width; x += 30) {
      for (let y = 15; y < rect.height; y += 30) {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.fillStyle = '#451a03';
    ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Glissez votre doigt ici pour révéler', rect.width / 2, rect.height / 2 - 8);
    
    ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#78350f';
    ctx.fillText('Un message confidentiel est masqué', rect.width / 2, rect.height / 2 + 14);
  };

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealed) initCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isRevealed]);

  const scratch = (clientX, clientY) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2, false);
    ctx.fill();

    checkScratchProgress();
  };

  const checkScratchProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let clearPixels = 0;
      const totalPixels = data.length / 4;
      const step = 32;

      for (let i = 3; i < data.length; i += step * 4) {
        if (data[i] === 0) {
          clearPixels += step;
        }
      }

      const percent = (clearPixels / totalPixels) * 100;
      if (percent > 38 && !isRevealed) {
        setIsRevealed(true);
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#f59e0b', '#ec4899', '#ff3366', '#ffd1dc']
        });
      }
    } catch {
      // Ignore
    }
  };

  const handleMouseDown = (e) => {
    isDrawingRef.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const handleTouchStart = (e) => {
    isDrawingRef.current = true;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDrawingRef.current) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(scratchData.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card" style={{
      padding: '20px 18px',
      margin: '20px 0',
      background: 'linear-gradient(135deg, rgba(255, 252, 248, 0.95), rgba(255, 244, 246, 0.9))',
      border: '1px solid rgba(245, 158, 11, 0.35)',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '14px'
      }}>
        <Sparkles size={16} color="#d97706" />
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.35rem',
          fontWeight: 700,
          color: '#854d0e',
          margin: 0
        }}>
          {scratchData.title}
        </h3>
      </div>

      {/* Scratch Box Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '150px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.04)',
        background: '#fffdfa',
        border: '1px solid rgba(254, 205, 219, 0.7)'
      }}>
        {/* Hidden Content Revealed Below Canvas */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#be123c',
            fontWeight: 700,
            fontSize: '0.82rem',
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.6px'
          }}>
            <Gift size={15} />
            <span>{scratchData.rewardTitle}</span>
          </div>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.15rem',
            color: '#2b1b22',
            fontWeight: 600,
            lineHeight: 1.4,
            marginBottom: '10px',
            maxWidth: '380px'
          }}>
            {scratchData.revealedMessage}
          </p>

          <button
            onClick={handleCopyCode}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: '20px',
              background: '#ffffff',
              border: '1px solid #fda4af',
              fontSize: '0.75rem',
              color: '#be123c',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {copied ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
            <span>Code : {scratchData.couponCode} {copied ? '(Copié)' : ''}</span>
          </button>
        </div>

        {/* Scratch Canvas Overlay */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              touchAction: 'none'
            }}
          />
        )}
      </div>

      <div style={{
        marginTop: '10px',
        textAlign: 'center',
        fontSize: '0.78rem',
        color: isRevealed ? '#15803d' : '#854d0e',
        fontWeight: 600
      }}>
        {isRevealed ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={14} color="#15803d" /> Message révélé avec succès
          </span>
        ) : (
          scratchData.instruction
        )}
      </div>
    </div>
  );
}
