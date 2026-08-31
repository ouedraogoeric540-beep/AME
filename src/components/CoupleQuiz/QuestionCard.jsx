import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const optionLetters = ['A', 'B', 'C', 'D'];

export default function QuestionCard({
  questionData,
  currentIdx,
  totalQuestions,
  onAnswer,
  onNext
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelectOption = (option, e) => {
    if (hasAnswered) return;
    setSelectedOption(option);
    setHasAnswered(true);

    if (option.isCorrect) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 25,
        spread: 50,
        origin: { x, y },
        colors: ['#ff3366', '#f59e0b', '#10b981', '#fbcfe8']
      });
    }

    onAnswer(option.isCorrect);
  };

  const handleNextClick = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    onNext();
  };

  const progressPercent = ((currentIdx + 1) / totalQuestions) * 100;
  const feedbackText = selectedOption?.feedback || selectedOption?.comment;

  return (
    <div className="glass-card" style={{
      padding: '24px 20px',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 248, 250, 0.9))',
      border: '1px solid rgba(254, 205, 219, 0.9)',
      boxShadow: '0 16px 36px -10px rgba(244, 63, 94, 0.12)'
    }}>
      {/* Progress Bar & Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#9d7888',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: '8px'
        }}>
          <span>Question {currentIdx + 1} sur {totalQuestions}</span>
          <span style={{ color: '#be123c' }}>{Math.round(progressPercent)}%</span>
        </div>

        <div style={{
          width: '100%',
          height: '6px',
          background: 'rgba(254, 205, 219, 0.5)',
          borderRadius: '10px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #ff3366, #ec4899)',
            borderRadius: '10px',
            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }} />
        </div>
      </div>

      {/* Question Title */}
      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.45rem',
        fontWeight: 700,
        color: '#2b1b22',
        lineHeight: 1.35,
        marginBottom: '22px',
        textAlign: 'center',
        padding: '0 4px'
      }}>
        {questionData.question}
      </h3>

      {/* Options List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '20px'
      }}>
        {questionData.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const letter = optionLetters[idx] || String(idx + 1);

          let containerBg = 'rgba(255, 255, 255, 0.9)';
          let borderColor = 'rgba(254, 205, 219, 0.85)';
          let textColor = '#2b1b22';
          let letterBg = 'rgba(254, 205, 219, 0.5)';
          let letterColor = '#be123c';

          if (hasAnswered) {
            if (option.isCorrect) {
              containerBg = 'linear-gradient(135deg, #ecfdf5, #f0fdf4)';
              borderColor = '#10b981';
              textColor = '#065f46';
              letterBg = '#10b981';
              letterColor = '#ffffff';
            } else if (isSelected && !option.isCorrect) {
              containerBg = 'linear-gradient(135deg, #fff1f2, #fff5f5)';
              borderColor = '#f43f5e';
              textColor = '#9f1239';
              letterBg = '#f43f5e';
              letterColor = '#ffffff';
            } else {
              containerBg = 'rgba(255, 255, 255, 0.6)';
              borderColor = 'rgba(240, 240, 240, 0.6)';
              textColor = '#9d7888';
            }
          }

          return (
            <button
              key={option.id || idx}
              onClick={(e) => handleSelectOption(option, e)}
              disabled={hasAnswered}
              style={{
                padding: '14px 16px',
                borderRadius: '16px',
                border: `1.5px solid ${borderColor}`,
                background: containerBg,
                color: textColor,
                fontSize: '0.92rem',
                fontWeight: isSelected || (hasAnswered && option.isCorrect) ? 600 : 500,
                textAlign: 'left',
                cursor: hasAnswered ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isSelected ? '0 4px 14px rgba(244, 63, 94, 0.15)' : '0 2px 6px rgba(0,0,0,0.02)',
                transform: isSelected ? 'scale(1.01)' : 'scale(1)'
              }}
            >
              {/* Minimal Letter Badge */}
              <span style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: letterBg,
                color: letterColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.82rem',
                fontWeight: 700,
                flexShrink: 0,
                transition: 'all 0.2s ease'
              }}>
                {hasAnswered && option.isCorrect ? <Check size={16} strokeWidth={2.6} /> : letter}
              </span>

              <span style={{ flex: 1, lineHeight: 1.35 }}>
                {option.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Answer Feedback Box */}
      {hasAnswered && feedbackText && (
        <div style={{
          padding: '14px 16px',
          borderRadius: '14px',
          background: selectedOption?.isCorrect 
            ? 'linear-gradient(135deg, rgba(236, 253, 245, 0.95), rgba(240, 253, 244, 0.95))' 
            : 'linear-gradient(135deg, rgba(255, 241, 242, 0.95), rgba(255, 245, 245, 0.95))',
          border: selectedOption?.isCorrect ? '1px solid #a7f3d0' : '1px solid #fecdd3',
          marginBottom: '18px',
          fontSize: '0.88rem',
          color: selectedOption?.isCorrect ? '#065f46' : '#9f1239',
          lineHeight: 1.45,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px'
        }}>
          <Sparkles size={16} style={{ flexShrink: 0, marginTop: '2px', color: selectedOption?.isCorrect ? '#059669' : '#e11d48' }} />
          <span style={{ fontWeight: 500 }}>{feedbackText}</span>
        </div>
      )}

      {/* Next Question Button */}
      {hasAnswered && (
        <button
          onClick={handleNextClick}
          className="btn-romantic"
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '0.95rem',
            letterSpacing: '0.3px'
          }}
        >
          <span>{currentIdx < totalQuestions - 1 ? 'Question suivante' : 'Découvrir le résultat'}</span>
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}
