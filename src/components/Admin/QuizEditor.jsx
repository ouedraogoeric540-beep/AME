import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  Power,
  Check,
  Sparkles,
  Award
} from 'lucide-react';
import QuestionFormModal from './QuestionFormModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const optionLetters = ['A', 'B', 'C', 'D'];

export default function QuizEditor({
  questions,
  onAddQuestion,
  onUpdateQuestion,
  onToggleQuestion,
  onDeleteQuestion,
  isSaving
}) {
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingQuestion, setDeletingQuestion] = useState(null);

  const totalCount = questions.length;
  const activeCount = questions.filter(q => q.active).length;
  const suspendedCount = totalCount - activeCount;

  const handleSaveModal = (questionData) => {
    if (editingQuestion?.id) {
      onUpdateQuestion(questionData);
    } else {
      onAddQuestion(questionData);
    }
    setIsFormOpen(false);
    setEditingQuestion(null);
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
            background: 'linear-gradient(135deg, #ff3366, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <HelpCircle size={22} />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: '#2b1b22', margin: 0 }}>
              Questionnaire Complice ({totalCount})
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#8a6877' }}>
              Ajoutez, modifiez, suspendez ou supprimez les questions du quiz romantique.
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <div style={{ background: '#fff', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(254, 205, 219, 0.8)' }}>
            <div style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: '#2b1b22' }}>{totalCount}</div>
            <div style={{ fontSize: '0.7rem', color: '#8a6877', fontWeight: 600, textTransform: 'uppercase' }}>Total</div>
          </div>
          <div style={{ background: 'rgba(240, 253, 244, 0.9)', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid #bbf7d0' }}>
            <div style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: '#15803d' }}>{activeCount}</div>
            <div style={{ fontSize: '0.7rem', color: '#15803d', fontWeight: 700, textTransform: 'uppercase' }}>Actives</div>
          </div>
          <div style={{ background: suspendedCount > 0 ? 'rgba(254, 242, 242, 0.9)' : '#fff', padding: '12px', borderRadius: '12px', textAlign: 'center', border: suspendedCount > 0 ? '1px solid #fecdd3' : '1px solid rgba(254, 205, 219, 0.8)' }}>
            <div style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: suspendedCount > 0 ? '#b91c1c' : '#8a6877' }}>{suspendedCount}</div>
            <div style={{ fontSize: '0.7rem', color: suspendedCount > 0 ? '#b91c1c' : '#8a6877', fontWeight: 700, textTransform: 'uppercase' }}>Suspendues</div>
          </div>
        </div>

        {/* Action button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <button
            type="button"
            onClick={() => {
              setEditingQuestion(null);
              setIsFormOpen(true);
            }}
            disabled={isSaving}
            className="btn-romantic"
            style={{ padding: '10px 20px', fontSize: '0.85rem' }}
          >
            <Plus size={16} />
            <span>Nouvelle question</span>
          </button>
        </div>

        {/* Questions list */}
        {questions.length === 0 ? (
          <div style={{ padding: '30px 16px', textAlign: 'center', background: '#fff', borderRadius: '12px', border: '1px dashed rgba(254, 205, 219, 0.9)' }}>
            <p style={{ color: '#8a6877', fontSize: '0.9rem', margin: '0 0 12px' }}>Aucune question pour l'instant.</p>
            <button
              type="button"
              onClick={() => {
                setEditingQuestion(null);
                setIsFormOpen(true);
              }}
              className="btn-romantic"
              style={{ padding: '8px 18px', fontSize: '0.82rem' }}
            >
              <Plus size={15} />
              <span>Créer la première question</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {questions.map((q, idx) => (
              <div
                key={q.id || idx}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  background: q.active ? '#fff' : 'rgba(250, 250, 250, 0.9)',
                  border: q.active ? '1px solid rgba(254, 205, 219, 0.9)' : '1px solid rgba(220, 220, 220, 0.8)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        background: q.active ? '#dcfce7' : '#fee2e2',
                        color: q.active ? '#15803d' : '#b91c1c'
                      }}>
                        {q.active ? '● Active' : '● Suspendue'}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#8a6877' }}>
                        {q.options?.length || 0} réponses
                      </span>
                    </div>

                    <h4 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: q.active ? '#2b1b22' : '#6b505c',
                      margin: 0,
                      textDecoration: q.active ? 'none' : 'line-through'
                    }}>
                      {q.question}
                    </h4>
                  </div>
                </div>

                {/* Options preview */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '10px 0 12px' }}>
                  {q.options?.map((opt, oIdx) => (
                    <span
                      key={opt.id || oIdx}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        background: opt.isCorrect ? 'rgba(220, 252, 231, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                        border: opt.isCorrect ? '1px solid #86efac' : '1px solid rgba(254, 205, 219, 0.6)',
                        color: opt.isCorrect ? '#166534' : '#6b505c',
                        fontWeight: opt.isCorrect ? 600 : 400,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <strong>{optionLetters[oIdx]}</strong> {opt.text}
                      {opt.isCorrect && <Check size={12} color="#16a34a" />}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', borderTop: '1px solid rgba(254, 205, 219, 0.4)', paddingTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingQuestion(q);
                      setIsFormOpen(true);
                    }}
                    disabled={isSaving}
                    className="btn-secondary"
                    style={{ padding: '6px 10px', fontSize: '0.76rem', gap: '4px' }}
                  >
                    <Edit2 size={12} />
                    <span>Modifier</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleQuestion(q.id)}
                    disabled={isSaving}
                    style={{
                      padding: '6px 10px',
                      fontSize: '0.76rem',
                      borderRadius: '8px',
                      border: '1px solid',
                      background: q.active ? 'rgba(254, 242, 242, 0.9)' : 'rgba(240, 253, 244, 0.9)',
                      borderColor: q.active ? '#fecdd3' : '#bbf7d0',
                      color: q.active ? '#be123c' : '#15803d',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: 600
                    }}
                  >
                    <Power size={12} />
                    <span>{q.active ? 'Suspendre' : 'Activer'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletingQuestion(q)}
                    disabled={isSaving}
                    style={{
                      padding: '6px 10px',
                      fontSize: '0.76rem',
                      background: 'none',
                      border: 'none',
                      color: '#9d7888',
                      cursor: 'pointer'
                    }}
                    title="Supprimer"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <QuestionFormModal
          initialData={editingQuestion}
          onSave={handleSaveModal}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingQuestion(null);
          }}
          isSaving={isSaving}
        />
      )}

      {/* Delete Modal */}
      {deletingQuestion && (
        <DeleteConfirmModal
          question={deletingQuestion}
          onConfirm={(id) => {
            onDeleteQuestion(id);
            setDeletingQuestion(null);
          }}
          onCancel={() => setDeletingQuestion(null)}
          isDeleting={isSaving}
        />
      )}
    </div>
  );
}
