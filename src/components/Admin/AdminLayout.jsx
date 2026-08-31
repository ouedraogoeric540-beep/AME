import React from 'react';
import { useAdminAuth } from './useAdminAuth';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { RefreshCw } from 'lucide-react';

export default function AdminLayout({ onBackToSite }) {
  const { token, isAuthenticated, isLoading, error, login, logout } = useAdminAuth();

  return (
    <div className="app-wrapper" style={{ minHeight: '100vh', background: 'var(--bg-warm)' }}>
      {/* Dreamy Ambient Glow Orbs */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {isLoading ? (
        <div style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          color: '#8a6877'
        }}>
          <RefreshCw size={32} className="animate-spin" color="#ff3366" />
          <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>Vérification de la session...</p>
        </div>
      ) : isAuthenticated ? (
        <AdminDashboard
          token={token}
          onLogout={logout}
          onBackToSite={onBackToSite}
        />
      ) : (
        <AdminLogin
          onLogin={login}
          error={error}
          isLoading={isLoading}
          onBackToSite={onBackToSite}
        />
      )}
    </div>
  );
}
