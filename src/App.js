import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import FermiPokerIntro from './components/FermiPokerIntro';
import CategorySelection from './components/CategorySelection';
import FermiPokerGame from './components/FermiPokerGame';
import ScrollToTop from './components/ScrollToTop';
import { createQuestionSets } from './data/questionSets';
import './styles.css';

const App = () => {
  const questionSets = createQuestionSets();
  const [darkMode, setDarkMode] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Refs for handling clicks outside the settings menu
  const settingsMenuRef = useRef(null);
  const settingsButtonRef = useRef(null);

  // Handle clicks outside the settings menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        settingsMenuRef.current && 
        !settingsMenuRef.current.contains(event.target) &&
        settingsButtonRef.current && 
        !settingsButtonRef.current.contains(event.target)
      ) {
        setSettingsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // Update theme-color meta tag based on dark mode state
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        'content', 
        newDarkMode ? '#1F1A15' : '#F8F4EB'  // dark-bg or cream-tan
      );
    }
  };

  return (
    <Router>
      {/* This ScrollToTop component will scroll to top when route changes */}
      <ScrollToTop />
      
      <div className={`min-h-screen font-primary geometric-background ${darkMode ? 'dark' : 'light'}`}>
        {/* Geometric background patterns - enhanced with more shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="patterns">
            {/* Original patterns */}
            <div className="pattern-circle-3"></div>
            <div className="pattern-triangle-1"></div>
            <div className="pattern-triangle-2"></div>
            <div className="pattern-square-1"></div>
            <div className="pattern-square-2"></div>
            <div className="pattern-hexagon"></div>
            <div className="pattern-line-1"></div>
            <div className="pattern-line-2"></div>
            
            {/* New patterns for top left corner and below */}
            <div className="pattern-triangle-topleft"></div>
            <div className="pattern-rhombus"></div>
            <div className="pattern-pentagon"></div>
            <div className="pattern-small-circles"></div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto py-2 px-3 sm:px-4">
          {/* Settings button and dropdown */}
          <div className="absolute top-4 right-4 z-20 relative">
            <button 
              ref={settingsButtonRef}
              onClick={() => setSettingsOpen(!settingsOpen)} 
              className="settings-toggle"
              aria-label="Settings"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Settings dropdown menu */}
            {settingsOpen && (
              <div 
                ref={settingsMenuRef}
                className="settings-menu absolute right-0 top-full mt-2 rounded-lg shadow-xl z-50"
              >
                <div className="settings-menu-content p-3">
                  <h3 className="font-display font-bold text-lg mb-2 pb-2 border-b">Settings</h3>
                  
                  {/* Theme toggle option */}
                  <div className="flex justify-between items-center py-2">
                    <span>Theme</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent menu from closing
                        toggleDarkMode();
                      }}
                      className="settings-theme-toggle px-3 py-1 rounded-lg text-sm font-medium border transition-all"
                    >
                      {darkMode ? (
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                          </svg>
                          Dark
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                          </svg>
                          Light
                        </span>
                      )}
                    </button>
                  </div>
                  
                  {/* Future settings can be added here */}
                  {/* Example: Language selection
                  <div className="flex justify-between items-center py-2 border-t mt-1">
                    <span>Language</span>
                    <button className="settings-theme-toggle px-3 py-1 rounded-lg text-sm font-medium border transition-all">
                      <span className="flex items-center">English</span>
                    </button>
                  </div>
                  */}
                </div>
              </div>
            )}
          </div>
        
          {/* Header with Link for navigation */}
          <header className="text-center pt-28 pb-3 mb-4">
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
