import React, { useState } from 'react';
import { introContent } from '../data/introContent';

const RulesModal = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    gameConcept: true,
    gameplay: true,
    multipleQuestions: true,
    metaGame: true,
    strategy: true
  });

  // Toggle expanded sections in rules modal
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="rules-modal rounded-xl shadow-xl p-4 max-w-md w-full mx-4 border max-h-90vh overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-display font-bold">Fermi Poker Rules</h3>
          <button 
            onClick={onClose}
            className="rules-close-btn rounded-full w-8 h-8 flex items-center justify-center hover:bg-soft-brown dark:hover:bg-dark-soft transition-colors"
            aria-label="Close rules"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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
        <div className="intro-dropdown mb-4">
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
        
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="px-3.5 py-1.5 bg-golden-accent text-warm-cream rounded-lg text-1rem font-medium hover:bg-golden-dark transition-all shadow-md"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;import React, { useState } from 'react';
import { introContent } from '../data/introContent';

const RulesModal = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    gameConcept: true,
    gameplay: true,
    multipleQuestions: true,
    metaGame: true,
    strategy: true
  });

  // Toggle expanded sections in rules modal
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="rules-modal rounded-xl shadow-xl p-4 max-w-md w-full mx-4 border max-h-90vh overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-display font-bold">Fermi Poker Rules</h3>
          <button 
            onClick={onClose}
            className="rules-close-btn rounded-full w-8 h-8 flex items-center justify-center hover:bg-soft-brown dark:hover:bg-dark-soft transition-colors"
            aria-label="Close rules"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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
        <div className="intro-dropdown mb-4">
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
        
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="px-3.5 py-1.5 bg-golden-accent text-warm-cream rounded-lg text-1rem font-medium hover:bg-golden-dark transition-all shadow-md"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
