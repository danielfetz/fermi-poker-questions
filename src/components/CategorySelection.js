import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategorySelection = ({ questionSets }) => {
  const navigate = useNavigate();

  // Function to count total questions in a category including all subcategories
  const countTotalQuestions = (category) => {
    let count = 0;
    
    // Add direct questions from this category
    if (category.questions) {
      count += category.questions.length;
    }
    
    // Add questions from subcategories
    if (category.subcategories) {
      for (const subcat of category.subcategories) {
        count += countTotalQuestions(subcat);
      }
    }
    
    return count;
  };

  // Navigate to the game with the selected category
  const handleSelectCategory = (categoryKey) => {
    navigate(`/play/${categoryKey}`);
  };

  // Category images based on the screenshot provided
  const categoryImages = {
    general: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='68' height='68' viewBox='0 0 68 68'%3E%3Ccircle cx='34' cy='34' r='30' fill='none' stroke='%23d1d5db' stroke-width='2'/%3E%3C/svg%3E",
    logistics: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=150&h=150&fit=crop&crop=center",
    history: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=150&fit=crop&crop=center",
    science: "https://images.unsplash.com/photo-1507343712015-dc6c05dc8a3a?w=150&h=150&fit=crop&crop=center",
    economics: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=center",
    technology: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=150&h=150&fit=crop&crop=center"
  };

  // Get main categories (remove subcategories completely)
  const mainCategories = Object.entries(questionSets);

  return (
    <div className="category-selection p-1">
      {/* Header matching intro page */}
      <div className="mb-6">
        <h2 className="text-header-small sm:text-header font-display font-medium pb-2.5 border-b mt-0 mb-3">Select a Category</h2>
        <p className="leading-normal">
          Choose a category to start practicing with Fermi questions. Choose a category to start practicing with Fermi questions.
        </p>
      </div>
      
      {/* Categories Grid - 2 columns on mobile, 3 on desktop later */}
      <div className="grid grid-cols-2 gap-2 mx-auto mb-2">
        {mainCategories.map(([key, category]) => {
          return (
            <div
              key={key}
              onClick={() => handleSelectCategory(key)}
              className="category-card shadow-md transition-all duration-200 cursor-pointer text-center"
            >
              {/* Category Image - 68x68px */}
              <div className="category-image mx-auto mb-2 overflow-hidden">
                <img
                  src={categoryImages[key] || categoryImages.general}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='68' height='68' viewBox='0 0 68 68'%3E%3Crect width='68' height='68' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23374151' font-size='12'%3E%3F%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              
              {/* Category Name */}
              <h3 className="font-display">
                {category.name}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelection;
