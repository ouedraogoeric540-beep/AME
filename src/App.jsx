import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FloatingHearts from './components/FloatingHearts';
import HeroSection from './components/HeroSection';
import LoveCapsule from './components/LoveCapsule/LoveCapsule';
import CoupleQuiz from './components/CoupleQuiz/CoupleQuiz';
import CouponsSection from './components/CouponsSection';
import MobileNav from './components/MobileNav';
import SweetWordModal from './components/SweetWordModal';
import { loveConfig } from './data/loveData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [kissesCount, setKissesCount] = useState(0);
  const [showSweetModal, setShowSweetModal] = useState(false);
  const [currentSweetWord, setCurrentSweetWord] = useState('');

  const handleSendKiss = () => {
    setKissesCount(prev => prev + 1);
  };

  const handleOpenDose = () => {
    const randomIndex = Math.floor(Math.random() * loveConfig.sweetWords.length);
    setCurrentSweetWord(loveConfig.sweetWords[randomIndex]);
    setShowSweetModal(true);
    setKissesCount(prev => prev + 1);
  };

  const handleNextSweetWord = () => {
    const randomIndex = Math.floor(Math.random() * loveConfig.sweetWords.length);
    setCurrentSweetWord(loveConfig.sweetWords[randomIndex]);
  };

  const handleNavigate = (tabId) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-wrapper">
      {/* Dreamy Ambient Glow Orbs */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {/* Floating Particles and Hearts */}
      <FloatingHearts />

      {/* Top Navbar */}
      <Navbar
        onOpenDose={handleOpenDose}
        kissesCount={kissesCount}
      />

      {/* Main Content Area */}
      <main className="main-container">
        {currentTab === 'home' && (
          <>
            <HeroSection
              onNavigate={handleNavigate}
              onSendKiss={handleSendKiss}
            />
            <div style={{ marginTop: '16px' }}>
              <LoveCapsule onSendKiss={handleSendKiss} />
            </div>
            <div style={{ marginTop: '16px' }}>
              <CoupleQuiz onGoToCoupons={() => handleNavigate('coupons')} />
            </div>
            <div style={{ marginTop: '16px' }}>
              <CouponsSection onSendKiss={handleSendKiss} />
            </div>
          </>
        )}

        {currentTab === 'letters' && (
          <div style={{ paddingTop: '16px' }}>
            <LoveCapsule onSendKiss={handleSendKiss} />
          </div>
        )}

        {currentTab === 'quiz' && (
          <div style={{ paddingTop: '16px' }}>
            <CoupleQuiz onGoToCoupons={() => handleNavigate('coupons')} />
          </div>
        )}

        {currentTab === 'coupons' && (
          <div style={{ paddingTop: '16px' }}>
            <CouponsSection onSendKiss={handleSendKiss} />
          </div>
        )}

        {/* Footer Credit & Romantic Quote */}
        <footer style={{
          textAlign: 'center',
          padding: '28px 16px 12px',
          color: '#9d7888',
          fontSize: '0.8rem'
        }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1rem', color: '#6b505c', marginBottom: '6px' }}>
            « Aimer, ce n'est pas se regarder l'un l'autre, c'est regarder ensemble dans la même direction. »
          </p>
          <p style={{ fontWeight: 600 }}>
            Fait avec tout mon amour pour toi ❤️
          </p>
        </footer>
      </main>

      {/* Fixed Native-Style Bottom Navigation for Mobile */}
      <MobileNav
        currentTab={currentTab}
        onTabChange={handleNavigate}
      />

      {/* Sweet Word Popup Modal */}
      {showSweetModal && (
        <SweetWordModal
          word={currentSweetWord}
          onClose={() => setShowSweetModal(false)}
          onNewWord={handleNextSweetWord}
        />
      )}
    </div>
  );
}
