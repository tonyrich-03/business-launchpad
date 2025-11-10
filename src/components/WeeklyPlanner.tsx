// WeeklyPlanner.tsx
import React, { useState, useEffect } from 'react';
import { addDays } from 'date-fns';
import WeekNavigation from '../components/WeekNavigation';
import DayCard from '../components/DayCard';

const getStartOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

// Helper function to get localStorage key for a date
const getStorageKey = (date: Date): string => {
  return `planner-${date.toISOString().split('T')[0]}`;
};

// Load all week data from localStorage
const loadWeekData = (weekStart: Date): { [key: string]: string } => {
  const weekData: { [key: string]: string } = {};
  
  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(weekStart, i);
    const key = getStorageKey(currentDate);
    const savedData = localStorage.getItem(key);
    
    if (savedData) {
      weekData[key] = savedData;
    }
  }
  
  return weekData;
};

const WeeklyPlanner: React.FC = () => {
  const [weekStart, setWeekStart] = useState<Date>(getStartOfWeek(new Date()));
  const [weekData, setWeekData] = useState<{ [key: string]: string }>({});

  // Load data when component mounts or week changes
  useEffect(() => {
    const data = loadWeekData(weekStart);
    setWeekData(data);
  }, [weekStart]);

  // Save content to localStorage and update state
  const saveDayContent = (date: Date, content: string) => {
    const key = getStorageKey(date);
    
    // Save to localStorage
    if (content.trim()) {
      localStorage.setItem(key, content);
    } else {
      localStorage.removeItem(key);
    }
    
    // Update state
    setWeekData(prev => ({
      ...prev,
      [key]: content
    }));
  };

  // Get content for a specific date
  const getDayContent = (date: Date): string => {
    const key = getStorageKey(date);
    return weekData[key] || '';
  };

  // Clear all data for current week
  const clearWeekData = () => {
    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(weekStart, i);
      const key = getStorageKey(currentDate);
      localStorage.removeItem(key);
    }
    setWeekData({});
  };

  return (
     <div className="weekly-planner min-h-screen pb-20 lg:pb-0">
      {/* Header with responsive layout */}
      <div className="bg-white border-b border-gray-200 sticky top-0 lg:static z-30">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Week Navigation - takes full width on mobile */}
            <div className="flex-1 min-w-0">
              <WeekNavigation 
                weekStart={weekStart}
                setWeekStart={setWeekStart}
              />
            </div>
            
            {/* Clear Button - full width on mobile, auto on larger screens */}
            <button
              onClick={clearWeekData}
              className="w-full sm:w-auto px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors text-sm font-medium shadow-sm whitespace-nowrap"
            >
              Clear Week
            </button>
          </div>
        </div>
      </div>
      
      {/* Week Grid */}
      <div className="p-4 lg:p-6">
      <div className="week-grid">
        {[...Array(7)].map((_, i) => {
          const dayDate = addDays(weekStart, i);
          return (
            <DayCard 
              key={i}
              date={dayDate}
              content={getDayContent(dayDate)}
              onContentChange={(content) => saveDayContent(dayDate, content)}
            />
          );
        })}
      </div>
    </div>
   </div>
  );
};

export default WeeklyPlanner;