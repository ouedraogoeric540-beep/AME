import React, { useState, useEffect, useCallback } from 'react';
import {
  Heart,
  Sparkles,
  Mail,
  Gift,
  HelpCircle,
  RefreshCw,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import CoupleInfoEditor from './CoupleInfoEditor';
import SweetWordsEditor from './SweetWordsEditor';
import CapsulesEditor from './CapsulesEditor';
import CouponsEditor from './CouponsEditor';
import QuizEditor from './QuizEditor';
import fallbackSiteData from '../../data/siteData.json';

const tabs = [
  { id: 'couple',   label: 'Couple',     icon: Heart,       emoji: '💑' },
  { id: 'words',    label: 'Mots',       icon: Sparkles,    emoji: '✨' },
  { id: 'capsules', label: 'Lettres',    icon: Mail,        emoji: '💌' },
  { id: 'coupons',  label: 'Cadeaux',    icon: Gift,        emoji: '🎁' },
  { id: 'quiz',     label: 'Quiz',       icon: HelpCircle,  emoji: '❓' }
];

export default function AdminDashboard({ token, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('couple');
  const [siteData, setSiteData] = useState(fallbackSiteData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const fetchSiteData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/site-data-get', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.siteData) setSiteData(data.siteData);
      if (data.warning) setNotice(data.warning);
    } catch {
      setSiteData(fallbackSiteData);
      setNotice('Mode local actif.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchSiteData(); }, [fetchSiteData]);

  const showToast = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 4000);
  };

  const handleSaveSection = async (sectionName, sectionData) => {
    setIsSaving(true);
    const newFull = { ...siteData, [sectionName]: sectionData };
    setSiteData(newFull);
    try {
      const res = await fetch('/api/site-data-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ siteData: newFull, sectionName })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast('✅ Enregistré et synchronisé !');
    } catch (err) {
      showToast(`💾 Enregistré localement (${err.message}).`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveCouponsAndScratch = ({ scratchSecret, coupons }) => {
    setIsSaving(true);
    const newFull = { ...siteData, scratchSecret, coupons };
    setSiteData(newFull);
    fetch('/api/site-data-save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ siteData: newFull, sectionName: 'Privilèges' })
    })
      .then(() => showToast('🎁 Privilèges enregistrés !'))
      .catch((e) => showToast(`💾 ${e.message}`))
      .finally(() => setIsSaving(false));
  };

  const handleAddQuestion = (q) => {
    const qs = [...(siteData.quiz?.questions || []), q];
    handleSaveSection('quiz', { ...(siteData.quiz || {}), questions: qs });
  };
  const handleUpdateQuestion = (q) => {
    const qs = (siteData.quiz?.questions || []).map(x => x.id === q.id ? q : x);
    handleSaveSection('quiz', { ...(siteData.quiz || {}), questions: qs });
  };
  const handleToggleQuestion = (id) => {
    const qs = (siteData.quiz?.questions || []).map(q => q.id === id ? { ...q, active: !q.active } : q);
    handleSaveSection('quiz', { ...(siteData.quiz || {}), questions: qs });
  };
  const handleDeleteQuestion = (id) => {
    const qs = (siteData.quiz?.questions || []).filter(q => q.id !== id);
    handleSaveSection('quiz', { ...(siteData.quiz || {}), questions: qs });
  };

  return (
    <div style={{
      minHeight: '100dvh',
      maxWidth: '100vw',
      overflowX: 'hidden',
      padding: '0 0 80px 0',
      background: 'linear-gradient(135deg, #fff5f7 0%, #ffeef2 50%, #fdf2f8 100%)'
    }}>

      {/* ── TOP HEADER MOBILE ── */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(254, 205, 219, 0.7)',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px'
      }}>
        {/* Left: back + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
          <button
            onClick={onBackToSite}
            style={{
              width: '36px', height: '36px', borderRadius: '10px',
              border: '1px solid rgba(254, 205, 219, 0.8)',
              background: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, color: '#be123c'
            }}
          >
            <ArrowLeft size={17} />
          </button>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem', fontWeight: 700,
              color: '#2b1b22', lineHeight: 1.1,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
            }}>
              MalMe Admin
            </div>
            <div style={{ fontSize: '0.65rem', color: '#8a6877' }}>
              100% personnalisable
            </div>
          </div>
        </div>

        {/* Right: refresh + logout */}
        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
          <button
            onClick={fetchSiteData}
            disabled={isLoading}
            style={{
              width: '36px', height: '36px', borderRadius: '10px',
              border: '1px solid rgba(254, 205, 219, 0.8)',
              background: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#8a6877'
            }}
            title="Rafraîchir"
          >
            <RefreshCw size={15} className={isLoading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={onLogout}
            style={{
              height: '36px', padding: '0 12px', borderRadius: '10px',
              border: '1px solid rgba(254, 205, 219, 0.8)',
              background: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '5px',
              color: '#be123c', fontSize: '0.78rem', fontWeight: 600
            }}
          >
            <LogOut size={14} />
            <span>Sortir</span>
          </button>
        </div>
      </div>

      {/* ── TOAST NOTICE ── */}
      {notice && (
        <div className="animate-fade-in" style={{
          margin: '10px 14px 0',
          padding: '10px 14px',
          borderRadius: '12px',
          background: 'rgba(236, 253, 245, 0.95)',
          border: '1px solid #a7f3d0',
          color: '#065f46',
          fontSize: '0.82rem',
          fontWeight: 500,
          display: 'flex', alignItems: 'flex-start', gap: '8px'
        }}>
          <Sparkles size={14} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{notice}</span>
        </div>
      )}

      {/* ── TABS SCROLLABLE ── */}
      <div style={{
        overflowX: 'auto',
        overflowY: 'visible',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        display: 'flex',
        gap: '6px',
        padding: '12px 14px 4px',
        /* hide scrollbar Chrome */
      }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flexShrink: 0,
                padding: '8px 14px',
                borderRadius: '20px',
                border: isActive ? '1.5px solid #ff3366' : '1px solid rgba(254, 205, 219, 0.7)',
                background: isActive ? 'linear-gradient(135deg, #ff3366, #ec4899)' : '#fff',
                color: isActive ? '#fff' : '#4a2c39',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '5px',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 14px rgba(244, 63, 94, 0.3)' : '0 1px 4px rgba(0,0,0,0.04)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <span style={{ fontSize: '0.9rem' }}>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding: '12px 14px 0' }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#8a6877' }}>
            <RefreshCw size={28} className="animate-spin" style={{ margin: '0 auto 10px', color: '#ff3366' }} />
            <p style={{ fontSize: '0.85rem' }}>Chargement des données...</p>
          </div>
        ) : (
          <>
            {activeTab === 'couple' && (
              <CoupleInfoEditor initialCouple={siteData.couple} onSave={d => handleSaveSection('couple', d)} isSaving={isSaving} />
            )}
            {activeTab === 'words' && (
              <SweetWordsEditor initialWords={siteData.sweetWords} onSave={d => handleSaveSection('sweetWords', d)} isSaving={isSaving} />
            )}
            {activeTab === 'capsules' && (
              <CapsulesEditor initialCapsules={siteData.capsules} onSave={d => handleSaveSection('capsules', d)} isSaving={isSaving} />
            )}
            {activeTab === 'coupons' && (
              <CouponsEditor initialScratch={siteData.scratchSecret} initialCoupons={siteData.coupons} onSave={handleSaveCouponsAndScratch} isSaving={isSaving} />
            )}
            {activeTab === 'quiz' && (
              <QuizEditor
                questions={siteData.quiz?.questions || []}
                onAddQuestion={handleAddQuestion}
                onUpdateQuestion={handleUpdateQuestion}
                onToggleQuestion={handleToggleQuestion}
                onDeleteQuestion={handleDeleteQuestion}
                isSaving={isSaving}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
