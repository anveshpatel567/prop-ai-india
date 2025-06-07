
import React, { useState, useMemo } from 'react';
import { ListingCategory } from '../../types';

interface DynamicCategorySelectorProps {
  categories: ListingCategory[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
  placeholder?: string;
  className?: string;
}

export const DynamicCategorySelector: React.FC<DynamicCategorySelectorProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  placeholder = "Select a category...",
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    return categories.filter(category =>
      category.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className={`relative ${className}`}>
      <div className="space-y-2">
        <label className="block text-sm font-rajdhani font-medium text-gray-700">
          Property Category
          <span className="text-fire-secondary ml-1">*</span>
        </label>
        
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl 
              glow-focus transition-all duration-200 font-inter text-left flex justify-between items-center"
          >
            <span className={selectedCategoryData ? 'text-gray-900' : 'text-gray-400'}>
              {selectedCategoryData ? selectedCategoryData.label : placeholder}
            </span>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute z-50 w-full mt-2 glass-card border border-white/30 max-h-64 overflow-hidden">
              <div className="p-3 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 font-inter text-sm"
                />
              </div>
              
              <div className="max-h-48 overflow-y-auto">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        onCategorySelect(category.id);
                        setIsOpen(false);
                        setSearchTerm('');
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors font-inter text-sm ${
                        selectedCategory === category.id ? 'bg-orange-100 text-fire-primary' : 'text-gray-700'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{category.label}</div>
                        <div className="text-xs text-gray-500">{category.slug}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-sm font-inter">
                    No categories found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
