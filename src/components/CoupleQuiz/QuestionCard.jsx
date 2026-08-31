import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

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
        particleCount: 30,
        spread: 60,
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

  return (
    <div className="glass-card" style={{
      padding: '22px 18px',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 245, 248, 0.85))',
      border: '1px solid rgba(254, 205, 219, 0.9)'
    }}>
      {/* Progress Bar & Counter */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#be123c',
          marginBottom: '6px'
        }}>
          <span>Question {currentIdx + 1} sur {totalQuestions}</span>
          <span>{Math.round(progressPercent)}% complété</span>
        </div>

        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(254, 205, 219, 0.6)',
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
        fontSize: '1.4rem',
        fontWeight: 700,
        color: '#2b1b22',
        lineHeight: 1.3,
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        {questionData.question}
      </h3>

      {/* Options List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '18px'
      }}>
        {questionData.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          let btnStyle = {
            padding: '14px 16px',
            borderRadius: '16px',
            border: '1px solid rgba(254, 205, 219, 0.9)',
            background: 'rgba(255, 255, 255, 0.85)',
            color: '#2b1b22',
            fontSize: '0.9rem',
            fontWeight: 500,
            textAlign: 'left',
            cursor: hasAnswered ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            transition: 'all 0.25s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          };

          if (hasAnswered) {
            if (option.isCorrect) {
              btnStyle.background = 'linear-gradient(135deg, #ecfdf5, #d1fae5)';
              btnStyle.border = '1px solid #10b981';
              btnStyle.color = '#065f46';
              btnStyle.fontWeight = 600;
            } else if (isSelected && !option.isCorrect) {
              btnStyle.background = 'linear-gradient(135deg, #fff1f2, #ffe4e6)';
              btnStyle.border = '1px solid #f43f5e';
              btnStyle.color = '#9f1239';
            } else {
              btnStyle.opacity = 0.6;
            }
          }

          return (
            <button
              key={idx}
              onClick={(e) => handleSelectOption(option, e)}
              style={btnStyle}
              disabled={hasAnswered}
            >
              <span>{option.text}</span>
              {hasAnswered && (
                <span>
                  {option.isCorrect ? (
                    <CheckCircle2 size={18} color="#10b981" />
                  ) : isSelected ? (
                    <AlertCircle size={18} color="#f43f5e" />
                  ) : null}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Feedback message */}
      {hasAnswered && selectedOption && (
        <div style={{
          padding: '12px 14px',
          borderRadius: '14px',
          background: selectedOption.isCorrect 
            ? 'linear-gradient(135deg, rgba(236, 253, 245, 0.9), rgba(209, 250, 229, 0.9))' 
            : 'linear-gradient(135deg, rgba(255, 241, 242, 0.9), rgba(254, 226, 226, 0.9))',
          border: selectedOption.isCorrect ? '1px solid #a7f3d0' : '1px solid #fecdd3',
          marginBottom: '16px',
          fontSize: '0.85rem',
          color: selectedOption.isCorrect ? '#065f46' : '#9f1239',
          lineHeight: 1.4,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px'
        }}>
          <Sparkles size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{selectedOption.comment}</span>
        </div>
      )}

      {/* Next Button */}
      {hasAnswered && (
        <button
          onClick={handleNextClick}
          className="btn-romantic"
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '0.95rem'
          }}
        >
          <span>{currentIdx < totalQuestions - 1 ? 'Question suivante' : 'Découvrir mon résultat 🏆'}</span>
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}
