import React from 'react';

interface WeekNavigationProps {
  weekStart: Date;
  setWeekStart: (date: Date) => void;
}

const WeekNavigation: React.FC<WeekNavigationProps> = ({ weekStart, setWeekStart }) => {
  const handlePreviousWeek = () => {
    const previousWeek = new Date(weekStart);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setWeekStart(previousWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(weekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setWeekStart(nextWeek);
  };

  const handleToday = () => {
    const today = new Date();
    // Set to the start of the current week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    setWeekStart(startOfWeek);
  };

  const formatWeekRange = (startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    const startMonth = startDate.toLocaleDateString('default', { month: 'short' });
    const endMonth = endDate.toLocaleDateString('default', { month: 'short' });
    const year = startDate.getFullYear();

    if (startMonth === endMonth) {
      return `${startMonth} ${startDate.getDate()} - ${endDate.getDate()}, ${year}`;
    } else {
      return `${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}, ${year}`;
    }
  };

  const isCurrentWeek = () => {
    const today = new Date();
    const startOfCurrentWeek = new Date(today);
    startOfCurrentWeek.setDate(today.getDate() - today.getDay());
    return weekStart.toDateString() === startOfCurrentWeek.toDateString();
  };

  return (
    <div className="
      flex flex-col sm:flex-row sm:items-center sm:justify-between 
      gap-4 sm:gap-2 
      bg-white/80 backdrop-blur-sm rounded-2xl p-4 
      shadow-lg border border-gray-200/60
      w-full
    ">
      {/* Top Row: Navigation Buttons */}
      <div className="flex items-center justify-between w-full sm:w-auto order-2 sm:order-1">
        {/* Previous Week Button */}
        <button
          onClick={handlePreviousWeek}
          className="
            flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl
            bg-gray-50 hover:bg-gray-100 active:bg-gray-200
            border border-gray-300/60 hover:border-gray-400
            text-gray-700 hover:text-gray-900
            font-medium text-xs sm:text-sm
            transition-all duration-200 ease-out
            hover:scale-105 active:scale-95
            shadow-sm hover:shadow-md
            flex-1 sm:flex-none justify-center
            max-w-[140px] sm:max-w-none
          "
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden xs:inline">Previous</span>
          <span className="xs:hidden">Prev</span>
        </button>

        {/* Spacer */}
        <div className="w-4 sm:hidden" />

        {/* Next Week Button */}
        <button
          onClick={handleNextWeek}
          className="
            flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl
            bg-gray-50 hover:bg-gray-100 active:bg-gray-200
            border border-gray-300/60 hover:border-gray-400
            text-gray-700 hover:text-gray-900
            font-medium text-xs sm:text-sm
            transition-all duration-200 ease-out
            hover:scale-105 active:scale-95
            shadow-sm hover:shadow-md
            flex-1 sm:flex-none justify-center
            max-w-[140px] sm:max-w-none
          "
        >
          <span className="hidden xs:inline">Next Week</span>
          <span className="xs:hidden">Next</span>
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom Row: Week Display */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto order-1 sm:order-2">
        {/* Today Button */}
        <button
          onClick={handleToday}
          className={`
            px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-sm 
            transition-all duration-200 whitespace-nowrap
            ${isCurrentWeek() 
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 shadow-sm'
            }
            hover:scale-105 active:scale-95
          `}
        >
          Today
        </button>

        {/* Week Range */}
        <div className="text-center min-w-0 flex-1 sm:flex-none">
          <div className="text-lg sm:text-2xl font-bold text-gray-800 truncate">
            {formatWeekRange(weekStart)}
          </div>
          <div className="text-xs sm:text-sm text-gray-500 font-medium mt-1 truncate">
            {weekStart.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekNavigation;