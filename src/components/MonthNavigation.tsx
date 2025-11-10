import React from 'react';
import type { MonthNavigationProps } from './types/calendar';

const MonthNavigation: React.FC<MonthNavigationProps> = ({ 
  currentDate, 
  setCurrentDate 
}) => {
  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg border border-gray-200 px-6 py-4">
      {/* Previous Month Button */}
      <button 
        onClick={handlePreviousMonth}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all duration-200 border border-gray-200 hover:border-gray-300 active:scale-95"
        aria-label="Previous month"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Current Month Display */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {currentDate.toLocaleDateString('default', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {currentDate.toLocaleDateString('default', { weekday: 'long' })}
        </p>
      </div>

      {/* Next Month Button */}
      <button 
        onClick={handleNextMonth}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all duration-200 border border-gray-200 hover:border-gray-300 active:scale-95"
        aria-label="Next month"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default MonthNavigation;