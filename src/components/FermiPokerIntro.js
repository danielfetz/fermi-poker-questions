import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { introContent } from '../data/introContent';

const FermiPokerIntro = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    gameConcept: true,
    gameplay: true,
    multipleQuestions: true,
    metaGame: true,
    strategy: true
  });

  // Toggle expanded sections in intro
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const goToCategories = () => {
    navigate('/categories');
  };

  return (
    <div className="intro-section mb-20">
      <div className="intro-header text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">What is Fermi Poker?</h2>
        <p className="text-medium-brown dark:text-golden-light">Fermi Poker is like poker, but instead of cards, players make guesses about numerical questions.</p>
      </div>
      
      {/* Game concept dropdown */}
      <div className="intro-dropdown mb-3">
        <button 
          className="dropdown-header"
          onClick={() => toggleSection('gameConcept')}
        >
          <h3 className="font-display font-bold text-lg">{introContent.gameConcept.title}</h3>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${expandedSections.gameConcept ? 'transform rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {expandedSections.gameConcept && (
          <div className="dropdown-content">
            <p>{introContent.gameConcept.content}</p>
          </div>
        )}
      </div>
      
      {/* Gameplay dropdown */}
      <div className="intro-dropdown mb-3">
        <button 
          className="dropdown-header"
          onClick={() => toggleSection('gameplay')}
        >
          <h3 className="font-display font-bold text-lg">{introContent.gameplay.title}</h3>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${expandedSections.gameplay ? 'transform rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {expandedSections.gameplay && (
          <div className="dropdown-content">
            <ol className="list-decimal pl-5 space-y-1">
              {introContent.gameplay.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
      
      {/* Multiple Questions dropdown */}
      <div className="intro-dropdown mb-3">
        <button 
          className="dropdown-header"
          onClick={() => toggleSection('multipleQuestions')}
        >
          <h3 className="font-display font-bold text-lg">{introContent.multipleQuestions.title}</h3>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${expandedSections.multipleQuestions ? 'transform rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {expandedSections.multipleQuestions && (
          <div className="dropdown-content">
            <p>{introContent.multipleQuestions.content}</p>
          </div>
        )}
      </div>
      
      {/* Meta-Game dropdown */}
      <div className="intro-dropdown mb-3">
        <button 
          className="dropdown-header"
          onClick={() => toggleSection('metaGame')}
        >
          <h3 className="font-display font-bold text-lg">{introContent.metaGame.title}</h3>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${expandedSections.metaGame ? 'transform rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {expandedSections.metaGame && (
          <div className="dropdown-content">
            <p>{introContent.metaGame.content}</p>
          </div>
        )}
      </div>
      
      {/* Strategy Tips dropdown */}
      <div className="intro-dropdown mb-5">
        <button 
          className="dropdown-header"
          onClick={() => toggleSection('strategy')}
        >
          <h3 className="font-display font-bold text-lg">{introContent.strategy.title}</h3>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${expandedSections.strategy ? 'transform rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {expandedSections.strategy && (
          <div className="dropdown-content">
            <ul className="list-disc pl-5 space-y-1">
              {introContent.strategy.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Fixed Start Game Button */}
      <div className="fixed-start-button">
        <button 
          onClick={goToCategories}
          className="start-game-button"
        >
          <span className="mr-2">See questions</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FermiPokerIntro;
