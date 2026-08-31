import React, { useState } from 'react';
import { HelpCircle, Sparkles, ArrowRight, HeartHandshake } from 'lucide-react';
import { loveConfig } from '../../data/loveData';
import initialQuestions from '../../data/questions.json';
import QuestionCard from './QuestionCard';
import QuizResult from './QuizResult';

export default function CoupleQuiz({ onGoToCoupons }) {
  const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'result'
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);

  const quizData = loveConfig.quiz;
  const activeQuestions = (initialQuestions || []).filter(q => q.active);

  const handleStart = () => {
    if (activeQuestions.length === 0) return;
    setGameState('playing');
    setCurrentIdx(0);
    setScore(0);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setGameState('result');
    }
  };

  const handleRestart = () => {
    setGameState('playing');
    setCurrentIdx(0);
    setScore(0);
  };

  return (
    <div style={{ padding: '8px 0 24px' }}>
      {/* Intro State */}
      {gameState === 'intro' && (
        <div className="glass-card" style={{
          padding: '32px 24px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 246, 248, 0.9))',
          border: '1px solid rgba(254, 205, 219, 0.9)',
          boxShadow: '0 16px 40px -10px rgba(244, 63, 94, 0.12)'
        }}>
          {/* Refined Monogram Icon */}
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #ff3366, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px',
            boxShadow: '0 8px 24px rgba(244, 63, 94, 0.25)',
            color: '#ffffff'
          }}>
            <HeartHandshake size={28} strokeWidth={2} />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <span className="romantic-badge">
              <Sparkles size={13} color="#d97706" />
              <span>Complicité & Souvenirs</span>
            </span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2rem',
            fontWeight: 700,
            color: '#2b1b22',
            marginBottom: '10px',
            lineHeight: 1.25
          }}>
            {quizData.title}
          </h3>

          <p style={{
            fontSize: '0.92rem',
            color: '#6b505c',
            maxWidth: '420px',
            margin: '0 auto 26px',
            lineHeight: 1.55
          }}>
            {quizData.subtitle}
          </p>

          {activeQuestions.length > 0 ? (
            <button
              onClick={handleStart}
              className="btn-romantic"
              style={{
                padding: '14px 36px',
                fontSize: '0.95rem',
                width: '100%',
                maxWidth: '280px',
                letterSpacing: '0.3px'
              }}
            >
              <span>Démarrer le questionnaire</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <div style={{
              padding: '12px 16px',
              borderRadius: '12px',
              background: 'rgba(255, 241, 242, 0.8)',
              border: '1px solid #fecdd3',
              color: '#9f1239',
              fontSize: '0.85rem'
            }}>
              Aucune question n'est active actuellement.
            </div>
          )}
        </div>
      )}

      {/* Playing State */}
      {gameState === 'playing' && activeQuestions.length > 0 && (
        <QuestionCard
          questionData={activeQuestions[currentIdx]}
          currentIdx={currentIdx}
          totalQuestions={activeQuestions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}

      {/* Result State */}
      {gameState === 'result' && activeQuestions.length > 0 && (
        <QuizResult
          score={score}
          totalQuestions={activeQuestions.length}
          onRestart={handleRestart}
          onGoToCoupons={onGoToCoupons}
        />
      )}
    </div>
  );
}
