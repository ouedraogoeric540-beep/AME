import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({ question, onConfirm, onCancel, isDeleting }) {
  if (!question) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div 
        className="letter-sheet"
        style={{
          maxWidth: '440px',
          padding: '28px 24px',
          textAlign: 'center',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          disabled={isDeleting}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: 'rgba(255, 230, 238, 0.7)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isDeleting ? 'not-allowed' : 'pointer',
            color: '#6b505c'
          }}
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        {/* Warning Icon */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #fee2e2, #fecdd3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          color: '#e11d48'
        }}>
          <Trash2 size={26} />
        </div>

        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.45rem',
          fontWeight: 700,
          color: '#2b1b22',
          marginBottom: '10px'
        }}>
          Supprimer cette question ?
        </h3>

        <p style={{
          fontSize: '0.9rem',
          color: '#6b505c',
          lineHeight: 1.45,
          marginBottom: '14px'
        }}>
          « <strong style={{ color: '#2b1b22' }}>{question.question}</strong> »
        </p>

        <div style={{
          padding: '10px 14px',
          borderRadius: '12px',
          background: 'rgba(254, 243, 199, 0.6)',
          border: '1px solid #fde68a',
          color: '#92400e',
          fontSize: '0.8rem',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textAlign: 'left'
        }}>
          <AlertTriangle size={16} style={{ flexShrink: 0 }} />
          <span>Cette action est définitive et créera un commit de suppression sur GitHub.</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="btn-secondary"
            style={{ flex: 1, padding: '12px 18px', fontSize: '0.9rem' }}
          >
            Annuler
          </button>

          <button
            onClick={() => onConfirm(question.id)}
            disabled={isDeleting}
            style={{
              flex: 1,
              padding: '12px 18px',
              fontSize: '0.9rem',
              fontWeight: 600,
              borderRadius: '14px',
              border: 'none',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              background: 'linear-gradient(135deg, #e11d48, #be123c)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(225, 29, 72, 0.3)',
              opacity: isDeleting ? 0.7 : 1
            }}
          >
            <Trash2 size={16} />
            <span>{isDeleting ? 'Suppression...' : 'Supprimer'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
