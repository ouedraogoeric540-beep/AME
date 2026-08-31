import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Romantic music box melody (Frequencies for soft chime/piano chords)
  // Progression: C major 7 -> A minor 7 -> F major 7 -> G sus4
  const notes = [
    261.63, 329.63, 392.00, 523.25, // C E G C
    440.00, 523.25, 659.25, 523.25, // A C E C
    349.23, 440.00, 523.25, 698.46, // F A C F
    392.00, 493.88, 587.33, 783.99  // G B D G
  ];

  const playChime = (freq, duration = 1.6) => {
    if (!audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Bell / music box envelope
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio context errors
    }
  };

  const startMusicLoop = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    let noteIdx = 0;
    isPlayingRef.current = true;

    const tick = () => {
      if (!isPlayingRef.current) return;
      playChime(notes[noteIdx % notes.length], 2.2);
      noteIdx++;
      timerRef.current = setTimeout(tick, 450);
    };

    tick();
  };

  const stopMusicLoop = () => {
    isPlayingRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusicLoop();
      setIsPlaying(false);
    } else {
      startMusicLoop();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopMusicLoop();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleMusic}
      className="romantic-badge"
      style={{
        cursor: 'pointer',
        padding: '6px 12px',
        fontSize: '0.78rem',
        border: isPlaying ? '1px solid #ff4d79' : '1px solid rgba(253, 164, 175, 0.7)',
        background: isPlaying ? 'linear-gradient(135deg, #fff0f5, #ffe4e9)' : 'rgba(255, 255, 255, 0.9)',
        transition: 'all 0.25s ease'
      }}
      title={isPlaying ? "Couper la douce mélodie" : "Lancer la douce mélodie"}
    >
      {isPlaying ? (
        <>
          <Volume2 size={15} color="#ff3366" className="animate-bounce-soft" />
          <span style={{ color: '#ff3366', fontWeight: 700 }}>Mélodie : On</span>
          <span style={{ display: 'inline-flex', gap: '2px', alignItems: 'center', height: '10px' }}>
            <span style={{ width: '2px', height: '8px', background: '#ff3366', animation: 'eqBar 0.6s infinite alternate' }} />
            <span style={{ width: '2px', height: '12px', background: '#ff3366', animation: 'eqBar 0.8s infinite alternate 0.2s' }} />
            <span style={{ width: '2px', height: '6px', background: '#ff3366', animation: 'eqBar 0.5s infinite alternate 0.4s' }} />
          </span>
        </>
      ) : (
        <>
          <Music size={14} color="#6b505c" />
          <span>Mélodie</span>
        </>
      )}

      <style>{`
        @keyframes eqBar {
          0% { height: 3px; }
          100% { height: 12px; }
        }
      `}</style>
    </button>
  );
}
