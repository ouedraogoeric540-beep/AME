import React, { useState } from 'react';
import { Mail, BookOpen, Plus, Trash2, Edit2, Save, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CapsulesEditor({ initialCapsules, onSave, isSaving }) {
  const [capsules, setCapsules] = useState(initialCapsules || []);
  const [activeCapsuleIdx, setActiveCapsuleIdx] = useState(0);

  const currentCapsule = capsules[activeCapsuleIdx] || capsules[0];

  const handleFieldChange = (field, value) => {
    setCapsules(prev => {
      const updated = [...prev];
      updated[activeCapsuleIdx] = {
        ...updated[activeCapsuleIdx],
        [field]: value
      };
      return updated;
    });
  };

  const handleLetterFieldChange = (field, value) => {
    setCapsules(prev => {
      const updated = [...prev];
      updated[activeCapsuleIdx] = {
        ...updated[activeCapsuleIdx],
        letter: {
          ...updated[activeCapsuleIdx].letter,
          [field]: value
        }
      };
      return updated;
    });
  };

  const handleParagraphChange = (pIdx, value) => {
    setCapsules(prev => {
      const updated = [...prev];
      const paragraphs = [...(updated[activeCapsuleIdx].letter.paragraphs || [])];
      paragraphs[pIdx] = value;
      updated[activeCapsuleIdx] = {
        ...updated[activeCapsuleIdx],
        letter: {
          ...updated[activeCapsuleIdx].letter,
          paragraphs
        }
      };
      return updated;
    });
  };

  const handleAddParagraph = () => {
    setCapsules(prev => {
      const updated = [...prev];
      const paragraphs = [...(updated[activeCapsuleIdx].letter.paragraphs || []), ''];
      updated[activeCapsuleIdx] = {
        ...updated[activeCapsuleIdx],
        letter: {
          ...updated[activeCapsuleIdx].letter,
          paragraphs
        }
      };
      return updated;
    });
  };

  const handleRemoveParagraph = (pIdx) => {
    setCapsules(prev => {
      const updated = [...prev];
      const paragraphs = (updated[activeCapsuleIdx].letter.paragraphs || []).filter((_, i) => i !== pIdx);
      updated[activeCapsuleIdx] = {
        ...updated[activeCapsuleIdx],
        letter: {
          ...updated[activeCapsuleIdx].letter,
          paragraphs
        }
      };
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ec4899', '#f59e0b']
    });
    onSave(capsules);
  };

  return (
    <div className="animate-fade-in">
      <div className="glass-card" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(255, 248, 250, 0.92))',
        border: '1px solid rgba(254, 205, 219, 0.9)',
        marginBottom: '20px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Mail size={22} />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: '#2b1b22', margin: 0 }}>
              Boîte à Lettres & Capsules ({capsules.length})
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#8a6877' }}>
              Modifiez le contenu, la salutation, les paragraphes et la signature de chaque lettre d'amour.
            </span>
          </div>
        </div>

        {/* Letters Selector Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '20px' }}>
          {capsules.map((cap, idx) => {
            const isActive = idx === activeCapsuleIdx;
            return (
              <button
                key={cap.id || idx}
                type="button"
                onClick={() => setActiveCapsuleIdx(idx)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '14px',
                  border: isActive ? '1.5px solid #ff3366' : '1px solid rgba(254, 205, 219, 0.8)',
                  background: isActive ? 'linear-gradient(135deg, #ff3366, #ec4899)' : '#fff',
                  color: isActive ? '#fff' : '#6b505c',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 14px rgba(244, 63, 94, 0.25)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                Lettre {idx + 1} : {cap.title?.slice(0, 20)}...
              </button>
            );
          })}
        </div>

        {/* Current Letter Editor */}
        {currentCapsule && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(254, 205, 219, 0.8)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#4a2c39', marginBottom: '4px' }}>
                  Titre de l'Enveloppe
                </label>
                <input
                  type="text"
                  value={currentCapsule.title || ''}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  disabled={isSaving}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(254, 205, 219, 0.8)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#4a2c39', marginBottom: '4px' }}>
                  Sous-titre / Thème
                </label>
                <input
                  type="text"
                  value={currentCapsule.subtitle || ''}
                  onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                  disabled={isSaving}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(254, 205, 219, 0.8)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#4a2c39', marginBottom: '4px' }}>
                  Catégorie (Badge)
                </label>
                <input
                  type="text"
                  value={currentCapsule.category || ''}
                  onChange={(e) => handleFieldChange('category', e.target.value)}
                  disabled={isSaving}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(254, 205, 219, 0.8)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>
            </div>

            {/* Letter Content Card */}
            <div style={{
              background: '#fffdfd',
              border: '1px solid rgba(254, 205, 219, 0.9)',
              borderRadius: '14px',
              padding: '18px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)'
            }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#be123c', textTransform: 'uppercase', marginBottom: '12px' }}>
                Papier à lettres intime
              </div>

              {/* Salutation */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#4a2c39', marginBottom: '4px' }}>
                  Formule d'accueil / Salutation
                </label>
                <input
                  type="text"
                  value={currentCapsule.letter?.salutation || ''}
                  onChange={(e) => handleLetterFieldChange('salutation', e.target.value)}
                  placeholder="Ex: Mon amour,"
                  disabled={isSaving}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(254, 205, 219, 0.8)',
                    fontSize: '0.92rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700
                  }}
                />
              </div>

              {/* Paragraphs */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4a2c39' }}>
                    Paragraphes de la lettre
                  </label>
                  <button
                    type="button"
                    onClick={handleAddParagraph}
                    disabled={isSaving}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#be123c',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Plus size={14} />
                    <span>Ajouter un paragraphe</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(currentCapsule.letter?.paragraphs || []).map((p, pIdx) => (
                    <div key={pIdx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <textarea
                        rows={3}
                        value={p}
                        onChange={(e) => handleParagraphChange(pIdx, e.target.value)}
                        placeholder={`Paragraphe #${pIdx + 1}...`}
                        disabled={isSaving}
                        style={{
                          flex: 1,
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px solid rgba(254, 205, 219, 0.7)',
                          fontSize: '0.88rem',
                          fontFamily: 'inherit',
                          lineHeight: 1.45,
                          resize: 'vertical'
                        }}
                      />
                      {(currentCapsule.letter?.paragraphs || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveParagraph(pIdx)}
                          disabled={isSaving}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#e11d48',
                            cursor: 'pointer',
                            padding: '6px',
                            marginTop: '4px'
                          }}
                          title="Supprimer ce paragraphe"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#4a2c39', marginBottom: '4px' }}>
                  Signature manuscrite
                </label>
                <input
                  type="text"
                  value={currentCapsule.letter?.signature || ''}
                  onChange={(e) => handleLetterFieldChange('signature', e.target.value)}
                  placeholder="Ex: À tes côtés, pour toujours."
                  disabled={isSaving}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(254, 205, 219, 0.8)',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-handwriting)',
                    color: '#be123c'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Global Save */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="btn-romantic"
            style={{ padding: '12px 26px', fontSize: '0.92rem', opacity: isSaving ? 0.7 : 1 }}
          >
            <Save size={16} />
            <span>{isSaving ? 'Enregistrement sur GitHub...' : 'Enregistrer toutes les lettres'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
