import React, { useState, useEffect, useCallback } from 'react';
import {
  Heart,
  Sparkles,
  Mail,
  Gift,
  HelpCircle,
  RefreshCw,
  LogOut,
  ArrowLeft,
  GitCommit,
  Save,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import CoupleInfoEditor from './CoupleInfoEditor';
import SweetWordsEditor from './SweetWordsEditor';
import CapsulesEditor from './CapsulesEditor';
import CouponsEditor from './CouponsEditor';
import QuizEditor from './QuizEditor';
import fallbackSiteData from '../../data/siteData.json';

const tabs = [
  { id: 'couple', label: 'Couple & Date', icon: Heart, badge: '💑' },
  { id: 'words', label: 'Mots Doux', icon: Sparkles, badge: '✨' },
  { id: 'capsules', label: 'Lettres d\'Amour', icon: Mail, badge: '💌' },
  { id: 'coupons', label: 'Privilèges & Cadeaux', icon: Gift, badge: '🎁' },
  { id: 'quiz', label: 'Questionnaire', icon: HelpCircle, badge: '❓' }
];

export default function AdminDashboard({ token, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('couple');
  const [siteData, setSiteData] = useState(fallbackSiteData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [dataSource, setDataSource] = useState('');

  // Fetch full site data from GitHub
  const fetchSiteData = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/site-data-get', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        throw new Error(`Erreur ${res.status}: Impossible de charger les données.`);
      }

      const data = await res.json();
      if (data.siteData) {
        setSiteData(data.siteData);
      }
      setDataSource(data.source || 'github');
      if (data.warning) {
        setNotice(data.warning);
      }
    } catch {
      // Offline / local fallback
      setSiteData(fallbackSiteData);
      setDataSource('local');
      setNotice('Mode local actif : modification des données du site.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSiteData();
  }, [fetchSiteData]);

  const showToast = (message) => {
    setNotice(message);
    setTimeout(() => setNotice(''), 4000);
  };

  // General save handler for sections
  const handleSaveSection = async (sectionName, updatedSectionData) => {
    setIsSaving(true);
    setError('');

    const newFullData = {
      ...siteData,
      [sectionName]: updatedSectionData
    };

    setSiteData(newFullData);

    try {
      const res = await fetch('/api/site-data-save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          siteData: newFullData,
          sectionName
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l\'enregistrement.');
      }

      showToast(`Section "${sectionName}" enregistrée et synchronisée avec GitHub !`);
    } catch (err) {
      showToast(`Enregistré localement (${err.message}).`);
    } finally {
      setIsSaving(false);
    }
  };

  // Specific handlers
  const handleSaveCouple = (coupleData) => handleSaveSection('couple', coupleData);
  const handleSaveWords = (wordsData) => handleSaveSection('sweetWords', wordsData);
  const handleSaveCapsules = (capsulesData) => handleSaveSection('capsules', capsulesData);
  const handleSaveCouponsAndScratch = ({ scratchSecret, coupons }) => {
    setIsSaving(true);
    const newFullData = { ...siteData, scratchSecret, coupons };
    setSiteData(newFullData);
    fetch('/api/site-data-save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ siteData: newFullData, sectionName: 'Privilèges & Carte à gratter' })
    })
      .then(() => showToast('Privilèges & Carte mystère enregistrés sur GitHub !'))
      .catch((err) => showToast(`Enregistré localement (${err.message}).`))
      .finally(() => setIsSaving(false));
  };

  // Quiz questions handlers
  const handleAddQuestion = (newQ) => {
    const currentQuestions = siteData.quiz?.questions || [];
    const updated = [...currentQuestions, newQ];
    const newQuiz = { ...(siteData.quiz || {}), questions: updated };
    handleSaveSection('quiz', newQuiz);
  };

  const handleUpdateQuestion = (updatedQ) => {
    const currentQuestions = siteData.quiz?.questions || [];
    const updated = currentQuestions.map(q => q.id === updatedQ.id ? updatedQ : q);
    const newQuiz = { ...(siteData.quiz || {}), questions: updated };
    handleSaveSection('quiz', newQuiz);
  };

  const handleToggleQuestion = (qId) => {
    const currentQuestions = siteData.quiz?.questions || [];
    const updated = currentQuestions.map(q => q.id === qId ? { ...q, active: !q.active } : q);
    const newQuiz = { ...(siteData.quiz || {}), questions: updated };
    handleSaveSection('quiz', newQuiz);
  };

  const handleDeleteQuestion = (qId) => {
    const currentQuestions = siteData.quiz?.questions || [];
    const updated = currentQuestions.filter(q => q.id !== qId);
    const newQuiz = { ...(siteData.quiz || {}), questions: updated };
    handleSaveSection('quiz', newQuiz);
  };

  return (
    <div style={{ padding: '20px 16px 60px', maxWidth: '820px', margin: '0 auto' }}>
      {/* Top Navbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(254, 205, 219, 0.6)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onBackToSite}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.8rem', gap: '6px' }}
          >
            <ArrowLeft size={15} />
            <span>Voir le site</span>
          </button>

          <div>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              fontWeight: 700,
              color: '#2b1b22',
              lineHeight: 1.1,
              margin: 0
            }}>
              MalMe • Administration Globale
            </h1>
            <span style={{ fontSize: '0.72rem', color: '#8a6877' }}>
              100% personnalisable • Zéro base de données
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={fetchSiteData}
            disabled={isLoading}
            className="btn-secondary"
            style={{ padding: '8px 12px', fontSize: '0.8rem' }}
            title="Rafraîchir depuis GitHub"
          >
            <RefreshCw size={15} className={isLoading ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={onLogout}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.8rem', color: '#be123c' }}
          >
            <LogOut size={15} />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Notice Toast */}
      {notice && (
        <div className="animate-fade-in" style={{
          padding: '12px 16px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(236, 253, 245, 0.95), rgba(240, 253, 244, 0.95))',
          border: '1px solid #a7f3d0',
          color: '#065f46',
          fontSize: '0.85rem',
          fontWeight: 500,
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.1)'
        }}>
          <Sparkles size={16} color="#059669" style={{ flexShrink: 0 }} />
          <span style={{ flex: 1 }}>{notice}</span>
        </div>
      )}

      {/* Navigation Tabs Bar */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '10px',
        marginBottom: '22px'
      }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '11px 18px',
                borderRadius: '16px',
                border: isActive ? '1.5px solid #ff3366' : '1px solid rgba(254, 205, 219, 0.7)',
                background: isActive ? 'linear-gradient(135deg, #ff3366, #ec4899)' : '#fff',
                color: isActive ? '#fff' : '#4a2c39',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 6px 18px rgba(244, 63, 94, 0.28)' : '0 2px 6px rgba(0,0,0,0.02)',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '50px 0', color: '#8a6877' }}>
          <RefreshCw size={30} className="animate-spin" style={{ margin: '0 auto 12px', color: '#ff3366' }} />
          <p style={{ fontSize: '0.9rem' }}>Chargement de l'ensemble des données...</p>
        </div>
      ) : (
        <>
          {activeTab === 'couple' && (
            <CoupleInfoEditor
              initialCouple={siteData.couple}
              onSave={handleSaveCouple}
              isSaving={isSaving}
            />
          )}

          {activeTab === 'words' && (
            <SweetWordsEditor
              initialWords={siteData.sweetWords}
              onSave={handleSaveWords}
              isSaving={isSaving}
            />
          )}

          {activeTab === 'capsules' && (
            <CapsulesEditor
              initialCapsules={siteData.capsules}
              onSave={handleSaveCapsules}
              isSaving={isSaving}
            />
          )}

          {activeTab === 'coupons' && (
            <CouponsEditor
              initialScratch={siteData.scratchSecret}
              initialCoupons={siteData.coupons}
              onSave={handleSaveCouponsAndScratch}
              isSaving={isSaving}
            />
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
  );
}
