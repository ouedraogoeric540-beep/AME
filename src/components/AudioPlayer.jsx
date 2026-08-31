import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, Music, Pause, Play, SkipForward, SkipBack } from 'lucide-react';

const tracks = [
  { title: 'Josey — Double Jeu', src: '/music/josey-double-jeu.mp3' },
  { title: 'LIL JAY — Sauce Graine', src: '/music/lil-jay-sauce-graine.mp3' },
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const audioRef = useRef(null);
  const progressTimerRef = useRef(null);
  const panelRef = useRef(null);

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = 0.7;
    audioRef.current = audio;

    audio.addEventListener('ended', () => {
      // Auto-advance to next track
      setCurrentTrack(prev => (prev + 1) % tracks.length);
    });

    audio.addEventListener('error', () => {
      setLoadError(true);
      setIsPlaying(false);
    });

    return () => {
      audio.pause();
      audio.src = '';
      clearInterval(progressTimerRef.current);
    };
  }, []);

  // Load track when currentTrack changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setLoadError(false);
    audio.src = tracks[currentTrack].src;

    if (isPlaying) {
      audio.play().catch(() => {
        setLoadError(true);
        setIsPlaying(false);
      });
    }
  }, [currentTrack]);

  // Progress bar updates
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        const audio = audioRef.current;
        if (audio && audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      }, 300);
    } else {
      clearInterval(progressTimerRef.current);
    }
    return () => clearInterval(progressTimerRef.current);
  }, [isPlaying]);

  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setShowPanel(false);
      }
    };
    if (showPanel) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showPanel]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setLoadError(false);
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setLoadError(true);
        setIsPlaying(false);
      });
    }
  }, [isPlaying]);

  const skipTrack = useCallback((direction) => {
    setCurrentTrack(prev => {
      const next = prev + direction;
      if (next < 0) return tracks.length - 1;
      return next % tracks.length;
    });
    if (!isPlaying) {
      setIsPlaying(true);
      // Audio will auto-play from the useEffect above
    }
  }, [isPlaying]);

  const handleSeek = useCallback((e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    audio.currentTime = pct * audio.duration;
    setProgress(pct * 100);
  }, []);

  const track = tracks[currentTrack];

  return (
    <div style={{ position: 'relative' }} ref={panelRef}>
      {/* Compact toggle button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="romantic-badge"
        style={{
          cursor: 'pointer',
          padding: '6px 12px',
          fontSize: '0.78rem',
          border: isPlaying ? '1px solid #ff4d79' : '1px solid rgba(253, 164, 175, 0.7)',
          background: isPlaying ? 'linear-gradient(135deg, #fff0f5, #ffe4e9)' : 'rgba(255, 255, 255, 0.9)',
          transition: 'all 0.25s ease'
        }}
        title={isPlaying ? 'Musique en cours' : 'Écouter la musique'}
      >
        {isPlaying ? (
          <>
            <Volume2 size={15} color="#ff3366" className="animate-bounce-soft" />
            <span style={{ color: '#ff3366', fontWeight: 700 }}>En cours</span>
            <span style={{ display: 'inline-flex', gap: '2px', alignItems: 'center', height: '10px' }}>
              <span style={{ width: '2px', height: '8px', background: '#ff3366', animation: 'eqBar 0.6s infinite alternate' }} />
              <span style={{ width: '2px', height: '12px', background: '#ff3366', animation: 'eqBar 0.8s infinite alternate 0.2s' }} />
              <span style={{ width: '2px', height: '6px', background: '#ff3366', animation: 'eqBar 0.5s infinite alternate 0.4s' }} />
            </span>
          </>
        ) : (
          <>
            <Music size={14} color="#6b505c" />
            <span>Musique</span>
          </>
        )}
      </button>

      {/* Expandable music panel */}
      {showPanel && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          width: '280px',
          background: 'rgba(255, 255, 255, 0.97)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderRadius: '16px',
          border: '1px solid rgba(254, 205, 219, 0.5)',
          boxShadow: '0 12px 40px rgba(244, 63, 94, 0.12), 0 4px 12px rgba(0,0,0,0.06)',
          padding: '16px',
          zIndex: 200,
          animation: 'fadeSlideDown 0.25s ease-out'
        }}>

          {/* Track title */}
          <div style={{
            textAlign: 'center',
            marginBottom: '12px'
          }}>
            <span style={{
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              color: '#9d7888',
              fontWeight: 600
            }}>
              Piste {currentTrack + 1} / {tracks.length}
            </span>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#2b1b22',
              margin: '4px 0 0',
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {track.title}
            </p>
          </div>

          {/* Progress bar */}
          <div
            onClick={handleSeek}
            onTouchStart={handleSeek}
            style={{
              width: '100%',
              height: '6px',
              borderRadius: '3px',
              background: 'rgba(253, 164, 175, 0.3)',
              cursor: 'pointer',
              marginBottom: '14px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              width: `${progress}%`,
              height: '100%',
              borderRadius: '3px',
              background: 'linear-gradient(90deg, #ff3366, #ec4899)',
              transition: 'width 0.3s linear'
            }} />
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <button
              onClick={() => skipTrack(-1)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6b505c',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s'
              }}
              aria-label="Piste précédente"
            >
              <SkipBack size={18} />
            </button>

            <button
              onClick={togglePlay}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #ff3366, #ec4899)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(244, 63, 94, 0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              aria-label={isPlaying ? 'Pause' : 'Lecture'}
            >
              {isPlaying ? <Pause size={20} fill="#fff" /> : <Play size={20} fill="#fff" style={{ marginLeft: '2px' }} />}
            </button>

            <button
              onClick={() => skipTrack(1)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6b505c',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s'
              }}
              aria-label="Piste suivante"
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Track list */}
          <div style={{ marginTop: '14px', borderTop: '1px solid rgba(253, 164, 175, 0.3)', paddingTop: '10px' }}>
            {tracks.map((t, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentTrack(idx);
                  if (!isPlaying) setIsPlaying(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '8px 10px',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  background: idx === currentTrack ? 'rgba(255, 51, 102, 0.08)' : 'transparent',
                  transition: 'background 0.2s',
                  textAlign: 'left'
                }}
              >
                <span style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: idx === currentTrack
                    ? 'linear-gradient(135deg, #ff3366, #ec4899)'
                    : 'rgba(253, 164, 175, 0.2)',
                  color: idx === currentTrack ? '#fff' : '#8a6877',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  flexShrink: 0
                }}>
                  {idx === currentTrack && isPlaying ? (
                    <Volume2 size={13} />
                  ) : (
                    idx + 1
                  )}
                </span>
                <span style={{
                  fontSize: '0.82rem',
                  fontWeight: idx === currentTrack ? 600 : 400,
                  color: idx === currentTrack ? '#be123c' : '#6b505c',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {t.title}
                </span>
              </button>
            ))}
          </div>

          {/* Error message */}
          {loadError && (
            <p style={{
              marginTop: '10px',
              fontSize: '0.72rem',
              color: '#d97706',
              textAlign: 'center',
              lineHeight: 1.4
            }}>
              Fichier non trouvé. Place tes MP3 dans le dossier <code style={{ background: 'rgba(253,164,175,0.2)', padding: '1px 5px', borderRadius: '4px', fontSize: '0.7rem' }}>public/music/</code>
            </p>
          )}
        </div>
      )}

      <style>{`
        @keyframes eqBar {
          0% { height: 3px; }
          100% { height: 12px; }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
