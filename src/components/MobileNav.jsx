import React from 'react';
import { Home, Mail, HelpCircle, Gift } from 'lucide-react';

export default function MobileNav({ currentTab, onTabChange }) {
  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'letters', label: 'Capsules', icon: Mail },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'coupons', label: 'Cadeaux', icon: Gift }
  ];

  return (
    <nav className="mobile-nav-bar" aria-label="Navigation Mobile">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            aria-label={item.label}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isActive ? 'linear-gradient(135deg, #ff3366, #ec4899)' : 'transparent',
              color: isActive ? '#ffffff' : '#6b505c',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: isActive ? '0 4px 12px rgba(244, 63, 94, 0.35)' : 'none',
              transform: isActive ? 'scale(1.08)' : 'scale(1)'
            }}>
              <Icon size={18} strokeWidth={isActive ? 2.4 : 1.9} />
            </div>
            <span
              className="mobile-nav-label"
              style={{
                color: isActive ? '#be123c' : '#8a6877',
                fontWeight: isActive ? 700 : 500
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
