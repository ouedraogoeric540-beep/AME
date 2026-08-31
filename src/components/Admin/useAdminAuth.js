import { useState, useEffect, useCallback } from 'react';

const TOKEN_KEY = 'malme_admin_token';

export function useAdminAuth() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Verify stored token on mount
  const verifyToken = useCallback(async (tokenToVerify) => {
    if (!tokenToVerify) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin-verify', {
        headers: {
          'Authorization': `Bearer ${tokenToVerify}`
        }
      });

      if (res.ok) {
        setIsAuthenticated(true);
        setError('');
      } else {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken('');
        setIsAuthenticated(false);
      }
    } catch {
      // In local dev without netlify functions server running, if token exists allow offline preview
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyToken(token);
  }, [token, verifyToken]);

  // Login handler
  const login = async (password) => {
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Mot de passe incorrect.');
      }

      sessionStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Erreur lors de la connexion.');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken('');
    setIsAuthenticated(false);
  };

  return {
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout
  };
}
