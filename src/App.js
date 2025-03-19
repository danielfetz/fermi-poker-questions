import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import FermiPokerIntro from './components/FermiPokerIntro';
import CategorySelection from './components/CategorySelection';
import FermiPokerGame from './components/FermiPokerGame';
import { createQuestionSets } from './data/questionSets';
import './styles.css';

const App = () => {
  const questionSets = createQuestionSets();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // Update theme-color meta tag based on dark mode state
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        'content', 
        newDarkMode ? '#1F1A15' : '#F7E8D0'  // dark-bg or cream-tan
      );
    }
  };

  return (
    <Router>
      <div className={`min-h-screen font-primary py-2 geometric-background ${darkMode ? 'dark' : 'light'}`}>
        {/* Geometric background patterns - static designs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="patterns">
            <div className="pattern-circle-1"></div>
            <div className="pattern-circle-2"></div>
            <div className="pattern-circle-3"></div>
            <div className="pattern-triangle-1"></div>
            <div className="pattern-triangle-2"></div>
            <div className="pattern-square-1"></div>
            <div className="pattern-square-2"></div>
            <div className="pattern-hexagon"></div>
            <div className="pattern-dots-1"></div>
            <div className="pattern-dots-2"></div>
            <div className="pattern-line-1"></div>
            <div className="pattern-line-2"></div>
            <div className="pattern-wave"></div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4">
          {/* Dark mode toggle */}
          <div className="absolute top-2 right-4 z-20">
            <button 
              onClick={toggleDarkMode} 
              className="dark-mode-toggle"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        
          {/* Header with Link for navigation */}
          <header className="text-center py-3 mb-4">
            <Link 
              to="/"
              className="text-3xl sm:text-4xl font-display font-bold mb-1 cursor-pointer hover:text-golden-accent transition-colors"
            >
              fermi.poker
            </Link>
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-golden-accent rounded-full"></div>
            </div>
          </header>
          
          {/* Main content area */}
          <div className="main-bg rounded-xl shadow-xl p-4 sm:p-5 relative overflow-hidden">
            {/* Content background pattern */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden content-pattern-container">
              <div className="content-pattern-1"></div>
              <div className="content-pattern-2"></div>
            </div>
            
            <Routes>
              <Route 
                path="/" 
                element={<FermiPokerIntro />} 
              />
              <Route 
                path="/categories" 
                element={
                  <CategorySelection 
                    questionSets={questionSets} 
                  />
                } 
              />
              <Route 
                path="/play/*" 
                element={
                  <FermiPokerGame 
                    questionSets={questionSets} 
                    darkMode={darkMode} 
                  />
                } 
              />
              <Route 
                path="*" 
                element={<Navigate to="/" replace />} 
              />
            </Routes>
          </div>
          
          <footer className="text-center text-xs py-2 font-medium">
            Fermi Poker — <span className="italic">A tool for estimation practice</span>
          </footer>
        </div>
        
        {/* Import Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Newsreader:wght@400;500;600&display=swap" rel="stylesheet" />
      </div>
    </Router>
  );
};

export default App;
