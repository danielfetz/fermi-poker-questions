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
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [skipConfirmation, setSkipConfirmation] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState({});
  
  // Question overlay state
  const [overlayPhase, setOverlayPhase] = useState('guessing'); // 'guessing', 'betting', 'hint', 'betting2', 'hint2', 'betting3', 'answer', 'betting4', 'showdown'
  const [showBettingRules, setShowBettingRules] = useState(false);
  const [showHint1Dropdown, setShowHint1Dropdown] = useState(false);
  const [showHint2Dropdown, setShowHint2Dropdown] = useState(false);
  const [showAnswerDropdown, setShowAnswerDropdown] = useState(false);
  
  // Rules modal state
  const [showRulesModal, setShowRulesModal] = useState(false);
  
  // Refs for dropdown handling
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const rulesButtonRef = useRef(null);
  const stepperRef = useRef(null);

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
    // Show overlay for new question
    startQuestionOverlay();
  };

  // Question overlay functions
  const startQuestionOverlay = () => {
    setOverlayPhase('guessing');
  };

  // Function to scroll active step into view
  const scrollActiveStepIntoView = () => {
    if (!stepperRef.current) return;
    
    const stepperWrapper = stepperRef.current;
    const activeStep = stepperWrapper.querySelector('.stepper-step.active');
    
    if (activeStep) {
      const stepperRect = stepperWrapper.getBoundingClientRect();
      const activeStepRect = activeStep.getBoundingClientRect();
      
      // Calculate the position to center the active step
      const stepperCenter = stepperRect.width / 2;
      const activeStepCenter = activeStepRect.left - stepperRect.left + activeStepRect.width / 2;
      const scrollOffset = activeStepCenter - stepperCenter;
      
      stepperWrapper.scrollTo({
        left: stepperWrapper.scrollLeft + scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  const skipOverlayTimer = () => {
    if (overlayPhase === 'guessing') {
      // Move to betting phase
      setOverlayPhase('betting');
    } else if (overlayPhase === 'betting') {
      // Move to hint reveal phase
      setOverlayPhase('hint');
    } else if (overlayPhase === 'hint') {
      // Move to second betting phase
      setOverlayPhase('betting2');
    } else if (overlayPhase === 'betting2') {
      // Move to second hint reveal phase
      setOverlayPhase('hint2');
    } else if (overlayPhase === 'hint2') {
      // Move to third betting phase
      setOverlayPhase('betting3');
    } else if (overlayPhase === 'betting3') {
      // Move to answer reveal phase
      setOverlayPhase('answer');
    } else if (overlayPhase === 'answer') {
      // Move to fourth betting phase
      setOverlayPhase('betting4');
    } else if (overlayPhase === 'betting4') {
      // Move to showdown phase
      setOverlayPhase('showdown');
    } else {
      // From showdown phase, go directly to next question
      nextQuestion();
    }
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
    setMenuOpen(false);
    
    // Update URL
    navigate(`/play/${categoryPath.join('/')}`);
    
    // Show overlay for new category
    startQuestionOverlay();
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
      // Show overlay for initial question
      startQuestionOverlay();
    }
  }, []);

  // Scroll active step into view when overlay phase changes
  useEffect(() => {
    // Small delay to ensure DOM has updated
    setTimeout(scrollActiveStepIntoView, 100);
  }, [overlayPhase]);

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
            
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M9 9a3 3 0 0 1 6 0c0 2-3 3-3 3v2"></path>
  <circle cx="12" cy="18" r="0.5"></circle>
</svg>
          </button>
        </div>
      </div>
      
      {/* Question section */}
      {/* Question Overlay - Integrated within main content */}
      <div className="question-overlay-content relative z-10">
        <div className="text-left">
          {/* Large Question Display - Above Stepper */}
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-3 leading-snug question-overlay-title">
          {currentQuestion.question}
          </h1>
          
          {/* Progress Stepper */}
          <div className="progress-stepper">
            <div ref={stepperRef} className="stepper-wrapper overflow-x-auto">
              <div className="stepper-track">
                {/* Step 1: Guessing Phase */}
                <div className={`stepper-step ${overlayPhase === 'guessing' ? 'active' : 'completed'}`}>
                  <div className="stepper-circle">
                    {(overlayPhase === 'guessing' || overlayPhase !== 'guessing') ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className="stepper-label">Guesses</div>
                </div>
                
                {/* Connector Line 1 */}
                <div className={`stepper-line ${overlayPhase !== 'guessing' ? 'completed' : ''} ${overlayPhase === 'guessing' ? 'half-active' : ''}`}></div>
                
                {/* Step 2: First Betting Round */}
                <div className={`stepper-step ${overlayPhase === 'betting' ? 'active' : (overlayPhase === 'guessing' ? '' : 'completed')}`}>
                  <div className="stepper-circle">
                    {(overlayPhase === 'betting' || (overlayPhase !== 'guessing' && overlayPhase !== 'betting')) ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className="stepper-label">Betting round #1</div>
                </div>
                
                {/* Connector Line 2 */}
                <div className={`stepper-line ${(overlayPhase !== 'guessing' && overlayPhase !== 'betting') ? 'completed' : ''} ${overlayPhase === 'betting' ? 'half-active' : ''}`}></div>
                
                {/* Step 3: Reveal First Hint */}
                <div className={`stepper-step ${overlayPhase === 'hint' ? 'active' : (overlayPhase === 'betting2' || overlayPhase === 'hint2' || overlayPhase === 'betting3' || overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') ? 'completed' : ''}`}>
                  <div className="stepper-circle">
                    {(overlayPhase === 'hint' || overlayPhase === 'betting2' || overlayPhase === 'hint2' || overlayPhase === 'betting3' || overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className="stepper-label">Hint #1</div>
                </div>
                
                {/* Connector Line 3 */}
                <div className={`stepper-line ${(overlayPhase === 'betting2' || overlayPhase === 'hint2' || overlayPhase === 'betting3' || overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') ? 'completed' : ''} ${overlayPhase === 'hint' ? 'half-active' : ''}`}></div>
                
                {/* Step 4: Second Betting Round */}
                <div className={`stepper-step ${overlayPhase === 'betting2' ? 'active' : (overlayPhase === 'hint2' || overlayPhase === 'betting3' || overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') ? 'completed' : ''}`}>
                  <div className="stepper-circle">
                    {(overlayPhase === 'betting2' || overlayPhase === 'hint2' || overlayPhase === 'betting3' || overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className="stepper-label">Betting round #2</div>
                </div>
                
                {/* Connector Line 4 */}
                <div className={`stepper-line ${(overlayPhase === 'hint2' || overlayPhase === 'betting3' || overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') ? 'completed' : ''} ${overlayPhase === 'betting2' ? 'half-active' : ''}`}></div>
                
                {/* Step 5: Reveal Second Hint */}
                <div className={`stepper-step ${overlayPhase === 'hint2' ? 'active' : (overlayPhase === 'betting3' || overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') ? 'completed' : ''}`}>
                  <div className="stepper-circle">
                    {(overlayPhase === 'hint2' || overlayPhase === 'betting3' || overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className="stepper-label">Hint #2</div>
                </div>
                
                {/* Connector Line 5 */}
                <div className={`stepper-line ${(overlayPhase === 'betting3' || overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') ? 'completed' : ''} ${overlayPhase === 'hint2' ? 'half-active' : ''}`}></div>
                
                {/* Step 6: Third Betting Round */}
                <div className={`stepper-step ${overlayPhase === 'betting3' ? 'active' : (overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') ? 'completed' : ''}`}>
                  <div className="stepper-circle">
                    {(overlayPhase === 'betting3' || overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className="stepper-label">Betting round #3</div>
                </div>
                
                {/* Connector Line 6 */}
                <div className={`stepper-line ${(overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') ? 'completed' : ''} ${overlayPhase === 'betting3' ? 'half-active' : ''}`}></div>
                
                {/* Step 7: Answer Reveal */}
                <div className={`stepper-step ${overlayPhase === 'answer' ? 'active' : (overlayPhase === 'betting4' || overlayPhase === 'showdown') ? 'completed' : ''}`}>
                  <div className="stepper-circle">
                    {(overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className="stepper-label">Answer</div>
                </div>
                
                {/* Connector Line 7 */}
                <div className={`stepper-line ${(overlayPhase === 'betting4' || overlayPhase === 'showdown') ? 'completed' : ''} ${overlayPhase === 'answer' ? 'half-active' : ''}`}></div>
                
                {/* Step 8: Fourth Betting Round */}
                <div className={`stepper-step ${overlayPhase === 'betting4' ? 'active' : overlayPhase === 'showdown' ? 'completed' : ''}`}>
                  <div className="stepper-circle">
                    {(overlayPhase === 'betting4' || overlayPhase === 'showdown') ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className="stepper-label">Betting round #4</div>
                </div>
                
                {/* Connector Line 8 */}
                <div className={`stepper-line ${overlayPhase === 'showdown' ? 'completed' : ''} ${overlayPhase === 'betting4' ? 'half-active' : ''}`}></div>
                
                {/* Step 9: Showdown */}
                <div className={`stepper-step ${overlayPhase === 'showdown' ? 'active' : ''}`}>
                  <div className="stepper-circle">
                    {overlayPhase === 'showdown' ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className="stepper-label">Showdown</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Instructions */}
          <div className={`question-overlay-instructions rounded-xl px-4 mb-3`}>
            <h2 className="text-lg font-display font-bold mb-3">
              {overlayPhase === 'guessing' ? 'It\'s time to guess!' : 
               overlayPhase === 'betting' ? 'Instructions - First Betting Round' : 
               overlayPhase === 'hint' ? 'The first hint is...' :
               overlayPhase === 'betting2' ? 'Instructions - Second Betting Round' :
               overlayPhase === 'hint2' ? 'The second hint is...' :
               overlayPhase === 'betting3' ? 'Instructions - Third Betting Round' :
               overlayPhase === 'answer' ? 'The answer is...' :
               overlayPhase === 'betting4' ? 'Instructions - Final Betting Round' :
               'Instructions - Showdown'}
            </h2>
            {overlayPhase === 'guessing' ? (
              <p className="text-base leading-normal">
                Write down your secret guesses as a range (e.g., "10-100" or "1,000-10,000"). 
                When everyone has written their estimates, start with the first betting round.
              </p>
            ) : overlayPhase === 'betting' ? (
              <div className="text-base leading-normal">
                <p className="mb-3">
                  Now it's time for the first betting round! Each player can:
                </p>
                <ul className="list-disc text-left mx-auto inline-block mb-3">
                  <li><strong>Raise:</strong> Increase the bet if you're confident in your estimate</li>
                  <li><strong>Call:</strong> Match the current bet to stay in the round</li>
                  <li><strong>Fold:</strong> Give up this round if you're not confident</li>
                </ul>
                <p>
                  Betting moves clockwise around the table. Continue until all active players have called or folded.
                </p>
              </div>
            ) : overlayPhase === 'hint' ? (
              <div className="text-base leading-normal">
                <div className="bg-hint-back border border-hint-border rounded-lg p-4 mb-4">
                  <div className="text-base">
                    {currentQuestion.hints && currentQuestion.hints[0]}
                  </div>
                </div>
                <p className="mb-3">
                  Now that you have the first hint, consider how this new information affects the probability that your original guess was accurate:
                </p>
                <ul className="list-disc text-left mx-auto inline-block mb-3">
                  <li>Does this hint make your estimate seem too high or too low?</li>
                  <li>How confident are you now compared to your initial guess?</li>
                  <li>Should you adjust your betting strategy for the next round?</li>
                </ul>
                <p>
                  Use this information to guide your decisions in the second betting round.
                </p>
              </div>
            ) : overlayPhase === 'betting2' ? (
              <div className="text-base leading-normal">
                <p className="mb-3">
                  Time for the second betting round! Now that you've seen the first hint, you can make more informed decisions:
                </p>
                <ul className="list-disc text-left mx-auto inline-block mb-3">
                  <li><strong>Raise:</strong> Increase the bet if the hint supports your estimate</li>
                  <li><strong>Call:</strong> Match the current bet to stay in the round</li>
                  <li><strong>Fold:</strong> Give up if the hint suggests you're way off</li>
                </ul>
                <p>
                  Consider how the first hint changed your confidence level and bet accordingly.
                </p>
              </div>
            ) : overlayPhase === 'hint2' ? (
              <div className="text-base leading-normal">
                <div className="bg-hint-back border border-hint-border rounded-lg p-4 mb-4">
                  <div className="text-base">
                    {currentQuestion.hints && currentQuestion.hints[1]}
                  </div>
                </div>
                <p className="mb-3">
                  With both hints revealed, you now have much more information to evaluate your original estimate:
                </p>
                <ul className="list-disc text-left mx-auto inline-block mb-3">
                  <li>How do both hints together affect your confidence?</li>
                  <li>Do the hints point in the same direction or contradict each other?</li>
                  <li>Are you closer to the actual answer than you initially thought?</li>
                </ul>
                <p>
                  Prepare for the third betting round with this additional information.
                </p>
              </div>
            ) : overlayPhase === 'betting3' ? (
              <div className="text-base leading-normal">
                <p className="mb-3">
                  Third betting round! With both hints available, this is your most informed betting opportunity yet:
                </p>
                <ul className="list-disc text-left mx-auto inline-block mb-3">
                  <li><strong>Raise:</strong> Increase the bet if both hints support your range</li>
                  <li><strong>Call:</strong> Match the current bet to stay competitive</li>
                  <li><strong>Fold:</strong> Give up if the hints suggest you're significantly off</li>
                </ul>
                <p>
                  Use all available information to make your most strategic betting decision.
                </p>
              </div>
            ) : overlayPhase === 'answer' ? (
              <div className="text-base leading-normal">
                <div className="bg-answer-back border border-answer-border rounded-lg p-4 mb-4">
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
                      >
                        <span className="text-1xs font-medium">{currentQuestion.source.name}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <div className="text-base">
                    {currentQuestion.answer}
                  </div>
                </div>
                <p className="mb-3">
                  Now you know the correct answer! Consider how close your original estimate was:
                </p>
                <ul className="list-disc text-left mx-auto inline-block mb-3">
                  <li>Does the answer fall within your estimated range?</li>
                  <li>How narrow was your range compared to others?</li>
                  <li>Should you bluff or play conservatively in the final betting round?</li>
                </ul>
                <p>
                  Prepare for the final betting round with complete information.
                </p>
              </div>
            ) : overlayPhase === 'betting4' ? (
              <div className="text-base leading-normal">
                <p className="mb-3">
                  Final betting round! Everyone knows the answer now, so this is pure strategy:
                </p>
                <ul className="list-disc text-left mx-auto inline-block mb-3">
                  <li><strong>Raise:</strong> If you have a winning range, maximize the pot</li>
                  <li><strong>Call:</strong> Stay in if you think you might win or tie</li>
                  <li><strong>Fold:</strong> Cut your losses if your range clearly doesn't include the answer</li>
                </ul>
                <p>
                  Remember: if your range contains the answer, a narrower range beats a wider one!
                </p>
              </div>
            ) : (
              <div className="text-base leading-normal">
                <p className="mb-4 text-lg font-bold">
                  🎯 Showdown Time!
                </p>
                <p className="mb-3">
                  When the final betting round ends with two or more players still in, everyone left reveals their guess. The pot goes to the player with the narrowest range that contains the correct answer; if several ranges are equally narrow, those players split the pot. If no player has the correct answer inside their range, whoever's median of their range is closest to the answer wins.
                </p>
                <div className="mb-3">
                  <h3 className="font-bold mb-2">Winning Criteria (in order):</h3>
                  <ol className="list-decimal text-left mx-auto inline-block mb-3">
                    <li>Narrowest range containing the correct answer</li>
                    <li>If tied, players with equally narrow ranges split the pot</li>
                    <li>If no ranges contain the answer, closest median wins</li>
                  </ol>
                </div>
                <p>
                  Reveal your ranges and determine the winner!
                </p>
              </div>
            )}
          </div>

          {/* Skip Question Section - Only show during guessing phase */}
          {overlayPhase === 'guessing' && (
            <div className="grid grid-flow-col justify-between gap-4 items-center question-overlay-instructions rounded-xl p-4 mb-20">
              <div className="text-base">
                Already played this question before?
              </div>
              <div className="text-right">
                <button
                  onClick={handleSkipClick}
                  className="px-3.5 py-1.5 bg-rich-brown text-warm-cream rounded-lg text-1rem font-medium hover:bg-dark-brown transition-all flex items-center ml-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                  Skip/Next
                </button>
              </div>
            </div>
          )}
          
          {/* Betting Rules Dropdown - Only show during hint phase */}
          {overlayPhase === 'hint' && (
            <div className="question-overlay-instructions rounded-xl p-4 mb-20">
              <button
                onClick={() => setShowBettingRules(!showBettingRules)}
                className="w-full flex items-center justify-between text-lg font-display font-bold mb-0"
              >
                <span>Betting Rules</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${showBettingRules ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showBettingRules && (
                <div className="mt-3 pt-3 border-t text-base leading-normal">
                  <div className="mb-3">
                    <h3 className="font-bold mb-2">Basic Betting Actions:</h3>
                    <ul className="list-disc text-left mx-auto inline-block mb-3">
                      <li><strong>Fold:</strong> Give up and lose your current bet</li>
                      <li><strong>Call:</strong> Match the current highest bet</li>
                      <li><strong>Raise:</strong> Increase the bet amount</li>
                    </ul>
                  </div>
                  <div className="mb-3">
                    <h3 className="font-bold mb-2">Betting Order:</h3>
                    <ul className="list-disc text-left mx-auto inline-block mb-3">
                      <li>Betting goes clockwise around the table</li>
                      <li>Each player must call, raise, or fold</li>
                      <li>Round continues until all active players have called</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Strategy Tips:</h3>
                    <ul className="list-disc text-left mx-auto inline-block">
                      <li>Use hints to gauge your confidence level</li>
                      <li>Consider other players' betting patterns</li>
                      <li>Bluffing can be effective even with poor estimates</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Progressive Dropdowns - Show previous information */}
          
          {/* Answer Dropdown - Show after answer phase */}
          {(overlayPhase === 'betting4' || overlayPhase === 'showdown') && (
            <div className="question-overlay-instructions rounded-xl p-4 mb-3">
              <button
                onClick={() => setShowAnswerDropdown(!showAnswerDropdown)}
                className="w-full flex items-center justify-between text-lg font-display font-bold mb-0"
              >
                <span>Answer</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${showAnswerDropdown ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showAnswerDropdown && (
                <div className="mt-3 pt-3 border-t text-base leading-normal">
                  <div className="bg-answer-back border border-answer-border rounded-lg p-4">
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
        >
          <span className="text-1xs font-medium">{currentQuestion.source.name}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
                    <div className="text-base">
      {currentQuestion.answer}
    </div>
  </div>
</div>
              )}
            </div>
          )}

          {/* Hint #2 Dropdown - Show after hint2 phase */}
          {(overlayPhase === 'betting3' || overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') && (
            <div className="question-overlay-instructions rounded-xl p-4 mb-3">
              <button
                onClick={() => setShowHint2Dropdown(!showHint2Dropdown)}
                className="w-full flex items-center justify-between text-lg font-display font-bold mb-0"
              >
                <span>Hint #2</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${showHint2Dropdown ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showHint2Dropdown && (
                <div className="mt-3 pt-3 border-t text-base leading-normal">
                  <div className="bg-hint-back border border-hint-border rounded-lg p-4">
                    <div className="font-medium mb-2 flex items-center">
                      <div className="hint-number-small mr-2">2</div>
                      <span>Second Hint</span>
                    </div>
                    <div className="text-base">
                      {currentQuestion.hints && currentQuestion.hints[1]}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hint #1 Dropdown - Show after hint phase */}
          {(overlayPhase === 'betting2' || overlayPhase === 'hint2' || overlayPhase === 'betting3' || overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') && (
            <div className={`question-overlay-instructions rounded-xl p-4 ${(overlayPhase === 'betting2' || overlayPhase === 'hint2' || overlayPhase === 'betting3' || overlayPhase === 'answer' || overlayPhase === 'betting4' || overlayPhase === 'showdown') && overlayPhase !== 'hint' ? 'mb-20' : 'mb-3'}`}>
              <button
                onClick={() => setShowHint1Dropdown(!showHint1Dropdown)}
                className="w-full flex items-center justify-between text-lg font-display font-bold mb-0"
              >
                <span>Hint #1</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${showHint1Dropdown ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showHint1Dropdown && (
                <div className="mt-3 pt-3 border-t text-base leading-normal">
                  <div className="bg-hint-back border border-hint-border rounded-lg p-4">
                    <div className="font-medium mb-2 flex items-center">
                      <div className="hint-number-small mr-2">1</div>
                      <span>First Hint</span>
                    </div>
                    <div className="text-base">
                      {currentQuestion.hints && currentQuestion.hints[0]}
                    </div>
                  </div>
                </div>
              )}
          </div>
          )}
          
          {/* Fixed Skip Button at Bottom */}
          <button
            onClick={skipOverlayTimer}
            className="fixed left-1/2 transform -translate-x-1/2 px-3.5 py-1.5 rounded-lg text-1rem font-medium transition-all shadow-md flex items-center question-overlay-skip-btn z-50"
            style={{ bottom: '1rem' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
            {overlayPhase === 'guessing' 
              ? 'Go to the first betting round'
              : overlayPhase === 'betting' 
                ? 'Reveal the first hint'
                : overlayPhase === 'hint'
                  ? 'Continue'
                  : overlayPhase === 'betting2'
                    ? 'Reveal the second hint'
                    : overlayPhase === 'hint2'
                      ? 'Continue'
                      : overlayPhase === 'betting3'
                        ? 'Reveal the answer'
                        : overlayPhase === 'answer'
                          ? 'Continue'
                          : overlayPhase === 'betting4'
                            ? 'Go to showdown'
                            : 'Next question'
            }
          </button>
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-4 pt-2 border-t relative z-10">
        <div className="text-1xs font-medium flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-golden-accent" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Question {currentQuestionIndex + 1} of {currentQuestions.length}
        </div>
      </div>

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
