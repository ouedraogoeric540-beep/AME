import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Sparkles, Heart, ArrowLeft } from 'lucide-react';

export default function AdminLogin({ onLogin, error: serverError, isLoading, onBackToSite }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setLocalError('Veuillez entrer le mot de passe.');
      return;
    }
    setLocalError('');
    await onLogin(password);
  };

  const displayError = localError || serverError;

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 16px'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '420px',
        padding: '36px 28px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(255, 246, 248, 0.92))',
        border: '1px solid rgba(254, 205, 219, 0.9)',
        boxShadow: '0 20px 50px -10px rgba(244, 63, 94, 0.16)',
        position: 'relative'
      }}>
        {/* Return to Site Button */}
        <button
          onClick={onBackToSite}
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: 'none',
            border: 'none',
            color: '#8a6877',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '6px 8px',
            borderRadius: '8px',
            transition: 'color 0.2s'
          }}
          title="Retourner sur le site public"
        >
          <ArrowLeft size={16} />
          <span>Site</span>
        </button>

        {/* Lock Icon Monogram */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #ff3366, #ec4899)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: '0 10px 24px rgba(244, 63, 94, 0.25)',
          color: '#ffffff'
        }}>
          <Lock size={30} strokeWidth={2.2} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <span className="romantic-badge">
            <Heart size={13} fill="#ff3366" color="#ff3366" />
            <span>MalMe • Espace Privé</span>
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.85rem',
          fontWeight: 700,
          color: '#2b1b22',
          marginBottom: '8px'
        }}>
          Administration
        </h2>

        <p style={{
          fontSize: '0.86rem',
          color: '#6b505c',
          marginBottom: '26px',
          lineHeight: 1.45
        }}>
          Accès sécurisé pour gérer les questions et souvenirs du questionnaire.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <label style={{
            display: 'block',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: '#4a2c39',
            marginBottom: '8px'
          }}>
            Mot de passe administrateur
          </label>

          <div style={{ position: 'relative', marginBottom: '18px' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••"
              disabled={isLoading}
              autoFocus
              style={{
                width: '100%',
                padding: '13px 44px 13px 16px',
                borderRadius: '14px',
                border: displayError ? '1.5px solid #f43f5e' : '1.5px solid rgba(254, 205, 219, 0.9)',
                background: 'rgba(255, 255, 255, 0.95)',
                fontSize: '0.95rem',
                color: '#2b1b22',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#8a6877',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
              title={showPassword ? 'Masquer' : 'Afficher'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error Message */}
          {displayError && (
            <div style={{
              padding: '10px 14px',
              borderRadius: '12px',
              background: 'rgba(255, 241, 242, 0.95)',
              border: '1px solid #fecdd3',
              color: '#be123c',
              fontSize: '0.82rem',
              fontWeight: 500,
              marginBottom: '18px',
              lineHeight: 1.4
            }}>
              {displayError}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-romantic"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '0.95rem',
              letterSpacing: '0.3px',
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            <Sparkles size={16} />
            <span>{isLoading ? 'Connexion en cours...' : 'Se connecter'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
