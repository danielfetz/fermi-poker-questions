import React from 'react';

const CategorySelection = ({ questionSets, selectCategory, returnToIntro }) => {
  // Extract all top-level categories from questionSets
  const categories = Object.entries(questionSets).map(([key, category]) => ({
    key,
    name: category.name,
    description: category.description,
    questionsCount: category.questions ? category.questions.length : 0,
    isParent: category.isParent
  }));

  return (
    <div className="category-selection mb-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">Select a Category</h2>
        <p className="text-medium-brown dark:text-golden-light">Choose a category to start practicing with Fermi questions</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map(category => (
          <div 
            key={category.key}
            className="category-card p-4 rounded-lg border cursor-pointer hover:bg-hover-light dark:hover:bg-dark-hover transition-all"
            onClick={() => selectCategory([category.key])}
          >
            <h3 className="font-display font-bold text-lg">{category.name}</h3>
            <p className="text-sm mb-2">{category.description}</p>
            <div className="text-xs font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-golden-accent" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              {category.questionsCount} questions
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button
          onClick={returnToIntro}
          className="px-3.5 py-1.5 bg-rich-brown text-warm-cream rounded-lg font-medium hover:bg-dark-brown transition-all shadow-md flex items-center mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Intro
        </button>
      </div>
    </div>
  );
};

export default CategorySelection;
