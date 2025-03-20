import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategorySelection = ({ questionSets }) => {
  const navigate = useNavigate();
  // State to track expanded categories
  const [expandedCategories, setExpandedCategories] = useState({});

  // Toggle expanded state for a category
  const toggleCategoryExpanded = (categoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  // Navigate to the game with the selected category
  const handleSelectCategory = (categoryPath) => {
    // Convert the path array to a URL path format
    const urlPath = categoryPath.join('/');
    navigate(`/play/${urlPath}`);
  };

  // Recursive function to render category with its subcategories
  const renderCategory = (category, categoryKey, path = [], depth = 0) => {
    const currentPath = [...path, categoryKey];
    const isExpanded = expandedCategories[categoryKey];
    
    // Modified to check only for the existence of subcategories, not requiring isParent flag
    const hasSubcategories = category.subcategories && category.subcategories.length > 0;
    
    return (
      <div 
        key={categoryKey}
        className={`category-card p-4 rounded-lg border ${depth > 0 ? 'ml-4 mt-2' : 'mb-4'}`}
      >
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h3 className="font-display font-bold text-lg">{category.name}</h3>
            <p className="text-sm mb-2 leading-normal">{category.description}</p>
            <div className="text-xs font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-golden-accent" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              {category.questions ? `${category.questions.length} questions` : hasSubcategories ? 'Has subcategories' : '0 questions'}
            </div>
          </div>
          
          <div className="flex space-x-2">
            {hasSubcategories && (
              <button
                onClick={() => toggleCategoryExpanded(categoryKey)}
                className="px-2 py-1 bg-rich-brown text-warm-cream rounded-lg text-sm font-medium hover:bg-dark-brown transition-all shadow-md"
              >
                {isExpanded ? 'Hide' : 'Show'} Subcategories
              </button>
            )}
            {(category.questions && category.questions.length > 0) && (
              <button
                onClick={() => handleSelectCategory(currentPath)}
                className="px-2 py-1 bg-golden-accent text-warm-cream rounded-lg text-sm font-medium hover:bg-golden-dark transition-all shadow-md"
              >
                Play
              </button>
            )}
          </div>
        </div>
        
        {/* Render subcategories if expanded */}
        {hasSubcategories && isExpanded && (
          <div className="subcategories mt-3">
            {category.subcategories.map(subcat => (
              renderCategory(subcat, subcat.key, currentPath, depth + 1)
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="category-selection mb-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">Select a Category</h2>
        <p className="text-medium-brown dark:text-golden-light">Choose a category to start practicing with Fermi questions</p>
      </div>
      
      <div className="categories-container">
        {Object.entries(questionSets).map(([key, category]) => (
          renderCategory(category, key)
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/')}
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
