import React, { useState } from 'react';
import { HelpCircle, Sparkles, Play, Award, Heart } from 'lucide-react';
import { loveConfig } from '../../data/loveData';
import QuestionCard from './QuestionCard';
import QuizResult from './QuizResult';

export default function CoupleQuiz({ onGoToCoupons }) {
  const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'result'
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);

  const quizData = loveConfig.quiz;
  const questions = quizData.questions;

  const handleStart = () => {
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
    if (currentIdx < questions.length - 1) {
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
          padding: '28px 20px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 243, 246, 0.9))',
          border: '1px solid rgba(254, 205, 219, 0.9)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff3366, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 20px rgba(244, 63, 94, 0.35)'
          }}>
            <HelpCircle size={32} color="#ffffff" className="animate-bounce-soft" />
          </div>

          <span className="romantic-badge" style={{ marginBottom: '10px' }}>
            <Sparkles size={13} color="#f59e0b" />
            <span>Mini-Jeu Complice</span>
          </span>

          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.85rem',
            fontWeight: 700,
            color: '#2b1b22',
            marginBottom: '8px',
            lineHeight: 1.2
          }}>
            {quizData.title}
          </h3>

          <p style={{
            fontSize: '0.9rem',
            color: '#6b505c',
            maxWidth: '400px',
            margin: '0 auto 24px',
            lineHeight: 1.5
          }}>
            {quizData.subtitle} Réponds à ces 5 petites questions complices pour tester notre connexion et débloquer tes récompenses !
          </p>

          <button
            onClick={handleStart}
            className="btn-romantic"
            style={{
              padding: '14px 32px',
              fontSize: '1rem',
              width: '100%',
              maxWidth: '280px'
            }}
          >
            <Play size={18} fill="#ffffff" />
            <span>Commencer le Quiz 💘</span>
          </button>
        </div>
      )}

      {/* Playing State */}
      {gameState === 'playing' && (
        <QuestionCard
          questionData={questions[currentIdx]}
          currentIdx={currentIdx}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}

      {/* Result State */}
      {gameState === 'result' && (
        <QuizResult
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
          onGoToCoupons={onGoToCoupons}
        />
      )}
    </div>
  );
}
