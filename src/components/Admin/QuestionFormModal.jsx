import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

const optionLetters = ['A', 'B', 'C', 'D'];

export default function QuestionFormModal({ initialData, onSave, onCancel, isSaving }) {
  const isEditing = Boolean(initialData?.id);

  const [questionText, setQuestionText] = useState(initialData?.question || '');
  const [isActive, setIsActive] = useState(initialData?.active !== false);
  const [options, setOptions] = useState(() => {
    if (initialData?.options && initialData.options.length >= 2) {
      return initialData.options.map(opt => ({
        id: opt.id || `opt-${Math.random().toString(36).slice(2, 8)}`,
        text: opt.text || '',
        isCorrect: Boolean(opt.isCorrect),
        feedback: opt.feedback || ''
      }));
    }
    return [
      { id: 'opt-1', text: '', isCorrect: true, feedback: 'Exactement !' },
      { id: 'opt-2', text: '', isCorrect: false, feedback: 'Pas tout à fait !' },
      { id: 'opt-3', text: '', isCorrect: false, feedback: 'Presque !' }
    ];
  });

  const [validationError, setValidationError] = useState('');

  // Handle option changes
  const handleOptionTextChange = (index, value) => {
    setOptions(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], text: value };
      return updated;
    });
  };

  const handleOptionFeedbackChange = (index, value) => {
    setOptions(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], feedback: value };
      return updated;
    });
  };

  const handleSetCorrectOption = (index) => {
    setOptions(prev => prev.map((opt, i) => ({
      ...opt,
      isCorrect: i === index
    })));
  };

  const handleAddOption = () => {
    if (options.length >= 4) return;
    setOptions(prev => [
      ...prev,
      {
        id: `opt-${Math.random().toString(36).slice(2, 8)}`,
        text: '',
        isCorrect: false,
        feedback: ''
      }
    ]);
  };

  const handleRemoveOption = (index) => {
    if (options.length <= 2) return;
    const removedWasCorrect = options[index].isCorrect;
    const remaining = options.filter((_, i) => i !== index);
    // If removed was correct, set first remaining as correct
    if (removedWasCorrect && remaining.length > 0) {
      remaining[0].isCorrect = true;
    }
    setOptions(remaining);
  };

  // Submit validation & trigger save
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!questionText.trim()) {
      setValidationError('Veuillez renseigner le texte de la question.');
      return;
    }

    if (options.length < 2 || options.length > 4) {
      setValidationError('La question doit comporter entre 2 et 4 réponses.');
      return;
    }

    for (let i = 0; i < options.length; i++) {
      if (!options[i].text.trim()) {
        setValidationError(`La réponse #${i + 1} (${optionLetters[i]}) ne peut pas être vide.`);
        return;
      }
    }

    const hasCorrect = options.some(opt => opt.isCorrect);
    if (!hasCorrect) {
      setValidationError('Veuillez sélectionner au moins une bonne réponse.');
      return;
    }

    const payload = {
      id: initialData?.id || `q-${Math.random().toString(36).slice(2, 8)}`,
      question: questionText.trim(),
      active: isActive,
      options: options.map(opt => ({
        id: opt.id,
        text: opt.text.trim(),
        isCorrect: opt.isCorrect,
        feedback: opt.feedback.trim() || (opt.isCorrect ? 'Excellente réponse !' : 'Pas cette fois !')
      }))
    };

    onSave(payload);
  };

  return (
    <div className="modal-overlay" onClick={onCancel} style={{ zIndex: 1000 }}>
      <div
        className="letter-sheet"
        style={{
          maxWidth: '560px',
          width: '95%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px 24px',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <button
          onClick={onCancel}
          disabled={isSaving}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 230, 238, 0.7)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            color: '#6b505c'
          }}
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        <div style={{ marginBottom: '16px' }}>
          <span className="romantic-badge">
            <Sparkles size={13} color="#d97706" />
            <span>{isEditing ? 'Édition de question' : 'Nouvelle question'}</span>
          </span>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.6rem',
          fontWeight: 700,
          color: '#2b1b22',
          marginBottom: '20px'
        }}>
          {isEditing ? 'Modifier la question' : 'Créer une question'}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Question Text */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: '#4a2c39',
              marginBottom: '6px'
            }}>
              Intitulé de la question <span style={{ color: '#e11d48' }}>*</span>
            </label>
            <textarea
              rows={2}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Ex: Quel est notre rituel préféré lors d'une soirée à deux ?"
              disabled={isSaving}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1.5px solid rgba(254, 205, 219, 0.9)',
                background: 'rgba(255, 255, 255, 0.95)',
                fontSize: '0.92rem',
                color: '#2b1b22',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                lineHeight: 1.4
              }}
            />
          </div>

          {/* Active / Suspended switch */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderRadius: '14px',
            background: isActive ? 'rgba(236, 253, 245, 0.7)' : 'rgba(254, 242, 242, 0.7)',
            border: isActive ? '1px solid #a7f3d0' : '1px solid #fecdd3',
            marginBottom: '22px'
          }}>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: isActive ? '#065f46' : '#991b1b' }}>
                {isActive ? 'Question active' : 'Question suspendue'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b505c' }}>
                {isActive ? 'Visible dans le quiz public pour ta chérie' : 'Masquée du quiz public'}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              disabled={isSaving}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.78rem',
                background: isActive ? '#10b981' : '#e11d48',
                color: '#ffffff',
                transition: 'all 0.2s'
              }}
            >
              {isActive ? 'Active' : 'Suspendue'}
            </button>
          </div>

          {/* Options Section */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <label style={{
                fontSize: '0.84rem',
                fontWeight: 700,
                color: '#4a2c39'
              }}>
                Réponses possibles (entre 2 et 4) <span style={{ color: '#e11d48' }}>*</span>
              </label>

              {options.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddOption}
                  disabled={isSaving}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#be123c',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    borderRadius: '8px'
                  }}
                >
                  <Plus size={15} />
                  <span>Ajouter une réponse</span>
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {options.map((opt, idx) => (
                <div
                  key={opt.id || idx}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    border: opt.isCorrect ? '1.5px solid #10b981' : '1px solid rgba(254, 205, 219, 0.9)',
                    background: opt.isCorrect ? 'rgba(240, 253, 244, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    {/* Option Letter Badge */}
                    <span style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '8px',
                      background: opt.isCorrect ? '#10b981' : 'rgba(254, 205, 219, 0.6)',
                      color: opt.isCorrect ? '#ffffff' : '#be123c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {optionLetters[idx] || idx + 1}
                    </span>

                    {/* Radio / Correct Selector */}
                    <button
                      type="button"
                      onClick={() => handleSetCorrectOption(idx)}
                      disabled={isSaving}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: opt.isCorrect ? '#065f46' : '#8a6877'
                      }}
                    >
                      <CheckCircle2
                        size={18}
                        color={opt.isCorrect ? '#10b981' : '#cbd5e1'}
                        fill={opt.isCorrect ? '#d1fae5' : 'transparent'}
                      />
                      <span>{opt.isCorrect ? 'Bonne réponse' : 'Marquer comme bonne réponse'}</span>
                    </button>

                    {/* Delete Option Button */}
                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(idx)}
                        disabled={isSaving}
                        style={{
                          marginLeft: 'auto',
                          background: 'none',
                          border: 'none',
                          color: '#9d7888',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        title="Supprimer cette option"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>

                  {/* Option Text Input */}
                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => handleOptionTextChange(idx, e.target.value)}
                    placeholder={`Texte de la réponse ${optionLetters[idx]}...`}
                    disabled={isSaving}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(254, 205, 219, 0.8)',
                      background: '#ffffff',
                      fontSize: '0.88rem',
                      color: '#2b1b22',
                      outline: 'none',
                      marginBottom: '8px'
                    }}
                  />

                  {/* Option Feedback Input */}
                  <input
                    type="text"
                    value={opt.feedback}
                    onChange={(e) => handleOptionFeedbackChange(idx, e.target.value)}
                    placeholder="Feedback affiché après sélection (ex: Bravo mon amour !)"
                    disabled={isSaving}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(254, 205, 219, 0.5)',
                      background: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '0.8rem',
                      color: '#6b505c',
                      outline: 'none'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Validation Error */}
          {validationError && (
            <div style={{
              padding: '10px 14px',
              borderRadius: '12px',
              background: 'rgba(255, 241, 242, 0.95)',
              border: '1px solid #fecdd3',
              color: '#be123c',
              fontSize: '0.82rem',
              fontWeight: 500,
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{validationError}</span>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSaving}
              className="btn-secondary"
              style={{ padding: '12px 20px', fontSize: '0.9rem' }}
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="btn-romantic"
              style={{
                padding: '12px 24px',
                fontSize: '0.9rem',
                opacity: isSaving ? 0.7 : 1,
                cursor: isSaving ? 'not-allowed' : 'pointer'
              }}
            >
              <Sparkles size={16} />
              <span>{isSaving ? 'Enregistrement sur GitHub...' : 'Enregistrer la question'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
