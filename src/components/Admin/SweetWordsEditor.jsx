import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, Edit3, Check, Save } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SweetWordsEditor({ initialWords, onSave, isSaving }) {
  const [words, setWords] = useState(initialWords || []);
  const [newWord, setNewWord] = useState('');
  const [editingIdx, setEditingIdx] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newWord.trim()) return;
    setWords(prev => [...prev, newWord.trim()]);
    setNewWord('');
  };

  const handleRemove = (index) => {
    setWords(prev => prev.filter((_, i) => i !== index));
    if (editingIdx === index) {
      setEditingIdx(null);
    }
  };

  const handleStartEdit = (index) => {
    setEditingIdx(index);
    setEditingText(words[index]);
  };

  const handleSaveEdit = (index) => {
    if (!editingText.trim()) return;
    setWords(prev => {
      const updated = [...prev];
      updated[index] = editingText.trim();
      return updated;
    });
    setEditingIdx(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 30,
      spread: 55,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ec4899', '#f59e0b']
    });
    onSave(words);
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
            background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Sparkles size={22} />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: '#2b1b22', margin: 0 }}>
              Pensées & Mots Doux ({words.length})
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#8a6877' }}>
              Phrases aléatoires qui apparaissent lorsqu'elle clique sur « Pensée du Jour ».
            </span>
          </div>
        </div>

        {/* Add New Word Input */}
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="Écris un nouveau mot doux pour elle..."
            disabled={isSaving}
            style={{
              flex: 1,
              padding: '12px 14px',
              borderRadius: '12px',
              border: '1.5px solid rgba(254, 205, 219, 0.9)',
              background: '#fff',
              fontSize: '0.9rem',
              color: '#2b1b22',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={!newWord.trim() || isSaving}
            className="btn-romantic"
            style={{ padding: '12px 18px', fontSize: '0.85rem', flexShrink: 0 }}
          >
            <Plus size={16} />
            <span>Ajouter</span>
          </button>
        </form>

        {/* List of Words */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {words.map((word, idx) => (
            <div
              key={idx}
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                background: '#fff',
                border: '1px solid rgba(254, 205, 219, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              {editingIdx === idx ? (
                <div style={{ display: 'flex', flex: 1, gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    autoFocus
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1.5px solid #ff3366',
                      fontSize: '0.88rem'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveEdit(idx)}
                    style={{
                      background: '#10b981',
                      border: 'none',
                      color: '#fff',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      cursor: 'pointer'
                    }}
                  >
                    <Check size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(254, 205, 219, 0.5)',
                      color: '#be123c',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1rem',
                      fontStyle: 'italic',
                      color: '#2b1b22',
                      lineHeight: 1.3
                    }}>
                      « {word} »
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={() => handleStartEdit(idx)}
                      disabled={isSaving}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#8a6877',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: '6px'
                      }}
                      title="Modifier"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(idx)}
                      disabled={isSaving}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#e11d48',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: '6px'
                      }}
                      title="Supprimer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

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
            <span>{isSaving ? 'Enregistrement sur GitHub...' : 'Enregistrer les mots doux'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
