import type { FC } from 'react';
import { useState } from 'react';

interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
  className?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const DatePicker: FC<DatePickerProps> = ({ 
  date, 
  setDate, 
  className = '',
  label,
  size = 'md'
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-4 py-4 text-lg'
  };

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

   // Use the function
   const today = new Date();
   console.log(formatDisplayDate(today)); 

  const getDaySuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const formatFancyDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    return (
      <div className="text-left">
        <div className="font-semibold text-gray-900">{weekday}</div>
        <div className="text-sm text-gray-600">
          {month} {day}<sup>{getDaySuffix(day)}</sup>, {year}
        </div>
      </div>
    );
  };

  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Custom Date Display */}
        <div 
          className={`
            flex items-center justify-between
            border-2 rounded-xl transition-all duration-200
            bg-white cursor-pointer
            ${sizeClasses[size]}
            ${isFocused 
              ? 'border-blue-500 ring-2 ring-blue-200 shadow-sm' 
              : 'border-gray-300 hover:border-gray-400'
            }
          `}
          onClick={() => document.getElementById('hidden-date-input')?.focus()}
        >
          {/* Calendar Icon and Date */}
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg 
                className="w-4 h-4 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </div>
            {formatFancyDate(date)}
          </div>

          {/* Chevron Icon */}
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isFocused ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </div>

        {/* Hidden Native Date Input */}
        <input
          id="hidden-date-input"
          type="date"
          value={date.toISOString().split('T')[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Quick Date Actions */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => {
            const yesterday = new Date(date);
            yesterday.setDate(yesterday.getDate() - 1);
            setDate(yesterday);
          }}
          className="flex-1 px-3 py-2 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
        >
          Yesterday
        </button>
        <button
          onClick={() => setDate(new Date())}
          className="flex-1 px-3 py-2 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 font-medium"
        >
          Today
        </button>
        <button
          onClick={() => {
            const tomorrow = new Date(date);
            tomorrow.setDate(tomorrow.getDate() + 1);
            setDate(tomorrow);
        }}
          className="flex-1 px-3 py-2 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
        >
          Tomorrow
        </button>
      </div>
    </div>
  );
};

export default DatePicker;