import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RulesModal from './RulesModal';

const FermiPokerGame = ({ questionSets, darkMode }) => {
  const navigate = useNavigate();
  const { "*": categoryPathParam } = useParams(); // Get the category path from URL
  
  // Parse the categoryPath from the URL
  const parsedCategoryPath = categoryPathParam ? categoryPathParam.split('/') : ['general'];
  
  const [currentCategoryPath, setCurrentCategoryPath] = useState(parsedCategoryPath);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealedHints, setRevealedHints] = useState([false, false]);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [flippingElements, setFlippingElements] = useState({
    hint0: false,
    hint1: false,
    answer: false
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showHintError, setShowHintError] = useState(false);
  const [showAnswerError, setShowAnswerError] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [skipConfirmation, setSkipConfirmation] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState({});
  
  // Rules modal state
  const [showRulesModal, setShowRulesModal] = useState(false);
  
  // Refs for dropdown handling
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const rulesButtonRef = useRef(null);

  // Function to collect questions from a category and all its subcategories
  const collectQuestionsFromCategory = (category) => {
    let questions = [];
    
    // Add direct questions from the category
    if (category.questions) {
      questions = [...questions, ...category.questions];
    }
    
    // Add questions from subcategories
    if (category.subcategories) {
      for (const subcat of category.subcategories) {
        questions = [...questions, ...collectQuestionsFromCategory(subcat)];
      }
    }
    
    return questions;
  };

  // Helper function to get current questions based on category path
  const getCurrentQuestions = () => {
    const categoryKey = currentCategoryPath.join('/');
    
    // If we have already shuffled questions for this category, use them
    if (shuffledQuestions[categoryKey]) {
      return shuffledQuestions[categoryKey];
    }
    
    // Otherwise, get the original questions
    let category = questionSets[currentCategoryPath[0]];
    
    if (currentCategoryPath.length > 1) {
      for (let i = 1; i < currentCategoryPath.length; i++) {
        if (category.subcategories) {
          category = category.subcategories.find(sub => sub.key === currentCategoryPath[i]);
        } else if (category.questions) {
          return category.questions;
        }
        
        // If category not found, return empty array
        if (!category) {
          return [];
        }
      }
    }
    
    // Collect questions from the category and all its subcategories
    return collectQuestionsFromCategory(category);
  };

  const currentQuestions = getCurrentQuestions();
  const currentQuestion = currentQuestions[currentQuestionIndex] || {};

  const toggleCategoryExpanded = (categoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const startFlip = (element) => {
    // Check if trying to reveal hint 2 before hint 1
    if (element === 'hint1' && !revealedHints[0]) {
      setShowHintError(true);
      
      // Hide the error message after 3 seconds
      setTimeout(() => {
        setShowHintError(false);
      }, 3000);
      
      return;
    }
    
    // Check if trying to reveal answer before both hints
    if (element === 'answer' && !revealedHints.every(h => h)) {
      setShowAnswerError(true);
      
      // Hide the error message after 3 seconds
      setTimeout(() => {
        setShowAnswerError(false);
      }, 3000);
      
      return;
    }
    
    if ((element.startsWith('hint') && revealedHints[parseInt(element.slice(-1))]) ||
        (element === 'answer' && answerRevealed)) {
      return;
    }
    
    setFlippingElements(prev => ({
      ...prev,
      [element]: true
    }));
    
    if (element.startsWith('hint')) {
      const hintIndex = parseInt(element.slice(-1));
      
      setTimeout(() => {
        const newRevealedHints = [...revealedHints];
        newRevealedHints[hintIndex] = true;
        setRevealedHints(newRevealedHints);
      }, 500); // Half-way through flip
    } else if (element === 'answer') {
      setTimeout(() => {
        setAnswerRevealed(true);
      }, 500); // Half-way through flip
    }
    
    // Reset flipping state after animation completes
    setTimeout(() => {
      setFlippingElements(prev => ({
        ...prev,
        [element]: false
      }));
    }, 1000);
  };

  const handleSkipClick = () => {
    if (skipConfirmation) {
      nextQuestion();
    } else {
      setShowSkipConfirm(true);
    }
  };
  
  const confirmSkip = (dontShowAgain) => {
    if (dontShowAgain) {
      setSkipConfirmation(true);
    }
    
    setShowSkipConfirm(false);
    nextQuestion();
  };
  
  const cancelSkip = () => {
    setShowSkipConfirm(false);
  };

  const nextQuestion = () => {
    const nextIndex = (currentQuestionIndex + 1) % currentQuestions.length;
    setCurrentQuestionIndex(nextIndex);
    setRevealedHints([false, false]);
    setAnswerRevealed(false);
  };

  const changeCategory = (categoryPath) => {
    // Get questions for new category
    let category = questionSets[categoryPath[0]];
    
    if (categoryPath.length > 1) {
      for (let i = 1; i < categoryPath.length; i++) {
        if (category.subcategories) {
          category = category.subcategories.find(sub => sub.key === categoryPath[i]);
        }
        
        if (i === categoryPath.length - 1 && category.subcategories) {
          const subCategory = category.subcategories.find(sub => sub.key === categoryPath[i]);
          if (subCategory && subCategory.questions) {
            category = subCategory;
          }
        }
      }
    }
    
    const categoryKey = categoryPath.join('/');
    
    // Shuffle questions if they haven't been shuffled yet
    if (!shuffledQuestions[categoryKey] && category.questions) {
      const shuffled = shuffleArray(category.questions);
      setShuffledQuestions(prev => ({
        ...prev,
        [categoryKey]: shuffled
      }));
    }
    
    // Update state
    setCurrentCategoryPath(categoryPath);
    setCurrentQuestionIndex(0);
    setRevealedHints([false, false]);
    setAnswerRevealed(false);
    setMenuOpen(false);
    
    // Update URL
    navigate(`/play/${categoryPath.join('/')}`);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Initialize shuffled questions for the first category
  useEffect(() => {
    const initialCategoryKey = currentCategoryPath.join('/');
    const initialQuestions = getCurrentQuestions();
    
    if (initialQuestions.length > 0 && !shuffledQuestions[initialCategoryKey]) {
      setShuffledQuestions({
        [initialCategoryKey]: shuffleArray(initialQuestions)
      });
    }
  }, []);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Return to categories page
  const returnToCategories = () => {
    navigate('/categories');
  };

  return (
    <>
      {/* Top navigation bar - combines category selector and help icon */}
      <div className="flex flex-wrap justify-between items-center border-b pb-3 mb-4 relative z-10">
        {/* Back to Categories button */}
        <div className="relative">
          <button 
            onClick={returnToCategories}
            className="px-3 py-1.5 bg-rich-brown text-warm-cream rounded-lg text-1rem font-medium hover:bg-dark-brown transition-all shadow-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to categories
          </button>
        </div>
        
        {/* Rules Icon Button */}
        <div>
          <button
            ref={rulesButtonRef}
            onClick={() => setShowRulesModal(true)}
            className="rules-button flex items-center justify-center w-9 h-9 rounded-full border border-rich-brown"
            aria-label="Show game rules"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 9a3 3 0 1 1 4 2.8 1 1 0 0 0-1 1V14"></path>
              <circle cx="12" cy="17" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Question section */}
      <div className="mb-4 relative z-10">
        <div className="absolute -left-4 top-0 h-full w-1 bg-golden-accent rounded-r"></div>
        <h2 className="text-xl sm:text-2xl font-display font-bold mb-1.5 leading-snug">
          {currentQuestion.question}
        </h2>
        <div className="text-1xs mb-3 font-medium italic">
          {currentQuestion.category}
        </div>
      </div>
      
      {/* Hint and Answer Container - always vertical for hints */}
      <div className="grid grid-cols-1 gap-3.5 sm:gap-4 relative z-10">
        {/* Hints (vertical layout) */}
        {currentQuestion.hints && currentQuestion.hints.map((hint, index) => (
          <div key={index} className="card-container">
            <div 
              className={`card ${revealedHints[index] || flippingElements[`hint${index}`] ? 'flipped' : ''}`}
              onClick={() => !revealedHints[index] && startFlip(`hint${index}`)}
            >
              <div className="card-front hint-front">
                <div className="text-center card-content-front">
                  <div className="hint-number-container">
                    <span className="hint-number">{index + 1}</span>
                  </div>
                  <div className="font-medium">Reveal hint</div>
                </div>
              </div>
              <div className="card-back hint-back">
                <div className="p-3 font-body text-base card-content-back">
                  <div className="font-medium mb-1 border-b border-hint-border pb-1.5 flex items-center">
                    <div className="hint-number-small mr-2">{index + 1}</div>
                    <span>Hint {index + 1}</span>
                  </div>
                  <div>
                    {hint}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Answer - same size as hints */}
        <div className="card-container">
          <div 
            className={`card ${answerRevealed || flippingElements.answer ? 'flipped' : ''}`}
            onClick={() => !answerRevealed && startFlip('answer')}
          >
            <div className="card-front answer-front">
              <div className="text-center card-content-front">
                <div className="answer-letter-container">
                  <span className="answer-letter">A</span>
                </div>
                <div className="font-medium">Reveal answer</div>
              </div>
            </div>
            <div className="card-back answer-back">
  <div className="p-3 font-body text-base card-content-back">
    <div className="font-medium mb-1 border-b border-answer-border pb-1.5 flex justify-between items-center">
      <div className="flex items-center">
        <div className="answer-letter-small mr-2">A</div>
        <span>Answer</span>
      </div>
      {currentQuestion.source && (
        <a 
          href={currentQuestion.source.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="source-link"
          onClick={(e) => e.stopPropagation()} // Prevent toggling card when clicking link
        >
          <span className="text-1xs font-medium">{currentQuestion.source.name}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
    <div>
      {currentQuestion.answer}
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-4 pt-2 border-t relative z-10">
        <div className="flex space-x-2">
          <button
            onClick={handleSkipClick}
            className="px-3.5 py-1.5 bg-rich-brown text-warm-cream rounded-lg text-1rem font-medium hover:bg-dark-brown transition-all shadow-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
            Skip/Next
          </button>
        </div>
        
        <div className="text-1xs font-medium flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-golden-accent" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Question {currentQuestionIndex + 1} of {currentQuestions.length}
        </div>
      </div>

      {/* Hint order error notification */}
       {showHintError && (
         <div className="fixed inset-x-0 top-4 mx-auto w-80 notification error-notification">
           <div className="flex items-center">
             <svg className="h-5 w-5 mr-2.5 notification-icon" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
             </svg>
             <p className="text-sm font-medium">Please reveal Hint 1 first!</p>
           </div>
         </div>
       )}
       
       {/* Answer error notification */}
       {showAnswerError && (
         <div className="fixed inset-x-0 top-4 mx-auto w-80 notification answer-notification">
           <div className="flex items-center">
             <svg className="h-5 w-5 mr-2.5 notification-icon" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
             </svg>
             <p className="text-sm font-medium">Explore both hints before revealing the answer!</p>
           </div>
         </div>
       )}

      {/* Skip confirmation modal */}
      {showSkipConfirm && (
        <div 
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="skip-modal rounded-xl shadow-xl p-4 max-w-sm w-full mx-4 border">
            <h3 className="text-lg font-display font-bold mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-golden-accent" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Skip this question?
            </h3>
            <p className="modal-text mb-4">Are you sure you want to skip to the next question?</p>
            
            <div className="mb-3">
              <label className="flex items-center cursor-pointer checkbox-label">
                <input 
                  type="checkbox" 
                  className="mr-2 h-4 w-4 accent-golden-accent"
                  onChange={(e) => setSkipConfirmation(e.target.checked)}
                />
                <span className="text-sm">Don't ask again</span>
              </label>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                onClick={cancelSkip}
                className="px-3 py-1.5 cancel-btn rounded-lg text-sm font-medium border"
              >
                Cancel
              </button>
              <button 
                onClick={() => confirmSkip(skipConfirmation)}
                className="px-3 py-1.5 confirm-btn rounded-lg text-sm font-medium"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Rules Modal Component */}
      <RulesModal isOpen={showRulesModal} onClose={() => setShowRulesModal(false)} />
    </>
  );
};

export default FermiPokerGame;
